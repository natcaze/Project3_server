const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model");
const 
//GET routes
router.get("/generated-cocktail", async (req, res, next) => {
  try {
    const generatedCocktail = await Cocktail.findOne();
    res.status(200).json(generatedCocktail);
  } catch (error) {
    next(error);
  }
});

router.get("/cocktail-details/:id", (req, res, next) => {});

module.exports = router;
