require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getApiRecipes = async () => {
 let recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`).data.results.map(e => {
  return {
    id: e.id,
    name: e.title,
    image: e.image,
    summary: e.summary,
    health_score: e.healthScore,
    steps: e.analyzedInstructions.steps.map(e => {
     return {
      number: e.number,
      step: e.step,
     }
    }),
  }; 
 });

 return recipes;
};

const getDbRecipes = async () => {
 let recipes = await Recipe.findAll({
  include:{
   model: Diet,
   attributes: ['name'],
   through: {
    attributes:[],
   }
  }});

 return recipes;
};

const allRecipes = async () => {
 const apiRecipes = await getApiRecipes();
 const dbRecipes = await getDbRecipes();
 
 return apiRecipes.concat(dbRecipes);
};

const getAllRecipes = async (req, res, next) => {
 try {
  const name = req.query.name;
  let recipes = await allRecipes();

  if(name){
   let recipesName = await recipes.filter(e => { e.name.toLowerCase().includes(name.toLowerCase())});
   if(recipesName.length > 0){
    res.status(200).send(recipesName);
   }else{
    res.status(404).send('Recipe not found');
   }
  }else{
   res.status(200).send(recipes);
  }

 } catch (error) {
  next(error);
 }
};

const detailDb = async (id) =>{
 const recipes = await getDbRecipes();
 const detail = recipes.filter(e => { e.id.toString() === id.toString()});

 if(detail) return detail;
 else return "Recipe not found";
};

const detailApi = async (id) =>{
 const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`).data;

 if(recipeDetails){
  return {
   id: recipeDetails.id,
   name: recipeDetails.title,
   image: recipeDetails.image,
   summary: recipeDetails.summary,
   health_score: recipeDetails.healthScore,
   steps: recipeDetails.analyzedInstructions.steps.map((e) => {
     return {
       number: e.number,
       step: e.step,
     };
   }),
   diets: recipeDetails.diets,
   dish_types: recipeDetails.dishTypes,
   cuisines: recipeDetails.cuisines,
 };
 }else{
  return 'Recipe not found';
 }
};

const getRecipeDetail = async (req, res, next) => {
 try {
  const idReceta = req.params.idReceta;
  let detail;

  if(idReceta.length > 6){
   detail = detailDb(idReceta);   
  }else{
   detail = detailApi(idReceta);
  }

  res.status(200).send(detail);

 } catch (error) {
  next(error);
 }
};

const createRecipe = async (req, res, next) => {
 try {
  const { name, image, summary, health_score, steps, diets } = req.body;

  let recipe = await Recipe.create({
    name,
    image,
    summary,
    health_score,
    steps
  });

  let diet = await diets.map(e => {
    Diet.findAll({
    where:{
     name: e,
    }
   })
  });
  
  recipe.addDiet(diet);

  res.status(200).send('Recipe created successfully');
  
 } catch (error) {
  next(error);
 }
};

module.exports = {
 getAllRecipes,
 getRecipeDetail,
 createRecipe
}