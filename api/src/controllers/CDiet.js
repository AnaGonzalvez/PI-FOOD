const { Diet } = require("../db");

const dietTypes = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "lacto ovo vegetarian",
  "vegan",
  "pescetarian",
  'paleolithic',
  "dairy free",
  "primal",
  "low FODMAP",
  "whole 30",
];

const getAllDiets = async (req,res,next) => {
 try {
  
  dietTypes.forEach(e => {
   Diet.findOrCreate({
    where: {
     name: e
    }
   })
  })

  const diets = await Diet.findAll();
  return res.status(200).send(diets);
  
 } catch (error) {
  next(error);
 }
};

module.exports = {
 getAllDiets
}