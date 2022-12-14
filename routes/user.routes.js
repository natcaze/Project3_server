const router = require("express").Router();
const User = require("../models/User.model");
const Cocktail = require("../models/Cocktail.model");
const Article = require("../models/Article.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

/* ________________________USER PROFILE_______________________________________ */
//GET route
router.get("/profile/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);

    res.status(200).json(getUser);
  } catch (error) {
    next(error);
  }
});

//PUT route
router.put("/edit-profile/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
});

/* ________________________USER FAVORITES_______________________________________ */
//POST route
router.put(
  "/create-favorite/:cocktailId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { cocktailId } = req.params;
      const userId = req.payload._id;
      const createdFavorite = await User.findByIdAndUpdate(userId, {
        $push: { favoriteCocktails: cocktailId },
      });

      res.status(200).json(createdFavorite);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE
router.put(
  "/edit-favorites/:cocktailId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { cocktailId } = req.params;
      const userId = req.payload._id;
      const createdFavorite = await User.findByIdAndUpdate(userId, {
        $pull: { favoriteCocktails: cocktailId },
      });

      res.status(200).json(createdFavorite);
    } catch (error) {
      next(error);
    }
  }
);

/* ________________________USER CREATED COCKTAILS_______________________________________ */
//POST route
router.post("/create-cocktail", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    const { cocktailName, description, ingredients, image } = req.body;

    let newCocktail;

    if (image) {
      newCocktail = await Cocktail.create({
        strDrink: cocktailName,
        strCategory: "",
        strAlcoholic: "",
        strGlass: "",
        strInstructions: description,
        strDrinkThumb: image,
        strIngredient: ingredients,
        strMeasure: "",
      });
    } else {
      newCocktail = await Cocktail.create({
        strDrink: cocktailName,
        strCategory: "",
        strAlcoholic: "",
        strGlass: "",
        strInstructions: description,
        strIngredient: ingredients,
        strMeasure: "",
      });
    }

    await User.findByIdAndUpdate(userId, {
      $push: { createdCocktails: newCocktail._id },
    });
    res.status(201).json(newCocktail);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//PUT route
router.put(
  "/edit-cocktail/:cocktailId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { cocktailId } = req.params;
      const { cocktailName, description, ingredients, image } = req.body;

      const updatedCocktail = await Cocktail.findByIdAndUpdate(
        cocktailId,
        {
          strDrink: cocktailName,
          strCategory: "",
          strAlcoholic: "",
          strGlass: "",
          strInstructions: description,
          strDrinkThumb: image,
          strIngredient: ingredients,
          strMeasure: "",
        },
        { new: true }
      );

      res.status(200).json(updatedCocktail);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE route
router.delete(
  "/edit-cocktail/:cocktailId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { cocktailId } = req.params;
      await Cocktail.findByIdAndRemove(cocktailId);
      res.status(200).json({
        message: `The cocktail with the id ${cocktailId} was deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
);

/* ________________________USER CREATIONS - COCKTAILS + ARTICLES_______________________________________ */

//GET route
router.get("/creations/:userId", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const createdCocktail = await User.findById(userId)
      .populate("createdCocktails")
      .populate("createdArticles")
      .populate("favoriteCocktails");

    res.status(200).json(createdCocktail);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/one-cocktail/:cocktailId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { cocktailId } = req.params;

      const foundCocktail = await Cocktail.findById(cocktailId);

      res.status(200).json(foundCocktail);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/one-article/:articleId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { articleId } = req.params;

      const foundArticle = await Article.findById(articleId);

      res.status(200).json(foundArticle);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
