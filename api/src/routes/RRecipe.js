const { Router } = require("express");

const router = Router();

router.get("/");

router.get("/:idReceta");

router.post("/");

module.exports = router;