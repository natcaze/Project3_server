const router = require("express").Router();
const Cocktail = require("../models/Cocktail.model");

//GET routes
router.get("/generated-cocktail", async (req, res, next) => {
  try {
    const { ingredient1, ingredient2 } = req.query;

    const generatedCocktail = await Cocktail.findOne({
      strIngredient: { $all: [ingredient1, ingredient2] },
    });
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

module.exports = router;
