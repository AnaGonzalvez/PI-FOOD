require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getApiRecipes = async () => {
 let recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`).data.results.map(e => {
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



const getRecipeDetail = async (req, res, next) => {
 try {
  
 } catch (error) {
  next(error);
 }
};

const createRecipe = async (req, res, next) => {
 try {
  
 } catch (error) {
  next(error);
 }
};

module.exports = {
 getAllRecipes,
 getRecipeDetail,
 createRecipe
}