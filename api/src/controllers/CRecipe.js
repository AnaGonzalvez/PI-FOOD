//require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY, API_KEY1, API_KEY2 } = process.env;

const getApiRecipes = async () => {
 const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=2`);
 
 const recipes = await recipesApi.data.results.map(e => {
  return {
    id: e.id,
    name: e.title,
    image: e.image,
    summary: e.summary,
    health_score: e.healthScore,
    steps: e.analyzedInstructions[0]? e.analyzedInstructions[0].steps.map(el => {
     return {
      number: el.number,
      step: el.step,
     }
    })
    : 'No instructions',
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
 const detail = await Recipe.findByPk(id, {
  include:{
    model: Diet,
    attributes: ['name'],
    through: {
     attributes: [],
    }
   }
  });

 if(detail) return detail;
 else return "Recipe not found";
};

const detailApi = async (id) =>{
 const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}`);

 if(recipeDetails.data){
  return {
    id: recipeDetails.data.id,
    name: recipeDetails.data.title,
    image: recipeDetails.data.image,
    summary: recipeDetails.data.summary,
    health_score: recipeDetails.data.healthScore,
    steps: e.analyzedInstructions[0]? 
    e.analyzedInstructions[0].steps.map(el => {
     return {
      number: el.number,
      step: el.step,
     }
    })
    : 'No instructions',
    diets: recipeDetails.data.diets,
    dish_types: recipeDetails.data.dishTypes,
    cuisines: recipeDetails.data.cuisines,
  };
 }else{
  return 'Recipe not found';
 }
};

const getRecipeDetail = async (req, res, next) => {
 try {
  const idReceta = req.params.idReceta;  

  if(idReceta.length > 6){
   const detailsDb = await detailDb(idReceta);
   res.status(200).json(detailsDb);   
  }else{
   const detailsApi = await detailApi(idReceta);
   res.status(200).json(detailsApi); 
  }

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

  let diet = await Diet.findAll({
    where:{
     name: diets,
    }
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