const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model");
const drinks = require("../seeds/drinks.seeds");

//GET routes
router.get("/generated-cocktail", async (req, res, next) => {
  try {
    const {
      ingredient1,
      ingredient2,
    } = req.query;

    const generatedCocktail = await Cocktail.findOne({  strIngredient: { $all :[ingredient1, ingredient2]}
    });
    res.status(200).json(generatedCocktail);
  } catch (error) {
    next(error);
  }
});

router.get("/cocktail-details/:id", (req, res, next) => {});

module.exports = router;
