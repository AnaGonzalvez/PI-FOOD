const axios = require("axios");
const { Diet } = require("../db");

const dietTypes = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
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

  let diets = await Diet.findAll();
  res.status(200).send(diets);
  
 } catch (error) {
  next(error);
 }
};

module.exports = {
 getAllDiets
}