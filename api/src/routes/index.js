const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RDiet = require('./RDiet');
const RRecipe = require('./RRecipe');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', RRecipe);
router.use('/diets', RDiet);

module.exports = router;
