const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model");

//GET routes
router.get("/generated-cocktail", async (req, res, next) => {
  try {
    const { ingredients } = req.query;

    let generatedCocktail;

    if (typeof ingredients === "object") {
      generatedCocktail = await Cocktail.findOne({
        strIngredient: { $all: [...ingredients] },
      });
    } else {
      generatedCocktail = await Cocktail.findOne({
        strIngredient: { $in: ingredients },
      });
    }

    res.status(200).json(generatedCocktail);
  } catch (error) {
    next(error);
  }
});

router.get("/cocktail-details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const detailsCocktail = await Cocktail.findById(id);
    res.status(200).json(detailsCocktail);
  } catch (error) {
    next(error);
  }
});

router.get("/random", async (req, res, next) => {
  try {
    const cocktailCount = await Cocktail.count({});
    console.log(cocktailCount);
    const randomNumber = Math.floor(Math.random() * cocktailCount);
    const randomCocktail = await Cocktail.find()
      .skip(randomNumber)
      .limit(- 1);
    res.status(200).json(randomCocktail);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
