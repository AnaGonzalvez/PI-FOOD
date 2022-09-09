const { Router } = require('express');
const { getAllDiets } = require('../controllers/CDiet');

const router = Router();

router.get('/', getAllDiets);

module.exports = router;

