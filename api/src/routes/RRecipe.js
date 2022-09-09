const { Router } = require("express");
const { getAllRecipes, getRecipeDetail, createRecipe } = require('../controllers/CRecipe');

const router = Router();

router.get("/", getAllRecipes);

router.get("/:idReceta", getRecipeDetail);

router.post("/", createRecipe);

module.exports = router;