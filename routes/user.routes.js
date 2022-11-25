const router = require("express").Router();
const User = require("../models/User.model");
const Cocktail = require("../models/Cocktail.model")
const {isAuthenticated} = require("../middleware/jwt.middleware")


/* ________________________USER PROFILE_______________________________________ */
//GET route
router.get("/profile/:id",isAuthenticated, async (req, res, next) => { 
    try {
      const {id} = req.params
      const getUser = await User.findById(id)
      
      res.status(200).json(getUser)
    } catch (error) {
      next(error)
    }
});

//PUT route
router.put("/edit-profile/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        name,
        password,
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
router.get("/create-favorite/:cocktailId",isAuthenticated, async (req, res, next) => {
  try {
    const {cocktailId} = req.params
    const userId = req.payload._id
    const createdFavorite = await User.findByIdAndUpdate(userId, {$push: {favoriteCocktails: cocktailId}})


    res.status(200).json(createdFavorite)
  } catch (error) {
    next(error)
  }
});

//GET route
router.get("/favorites/:userId",isAuthenticated, async (req, res, next) => {
try {
  const {userId} = req.params
  const userFavorites = await User.findById(userId).populate("favoriteCocktails")

  res.status(200).json(userFavorites)
} catch (error) {
  next(error)
}
});

//DELETE
 router.delete("/edit-favorites/:cocktailId",isAuthenticated, async (req, res, next) => {
  try {
    const {cocktailId} = req.params
    const userId = req.payload._id

    await User.findByIdAndRemove(cocktailId, {userId})


    res.status(200).json({
      message: `The cocktail with the id ${cocktailId} was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
}); 


/* ________________________USER CREATED COCKTAILS_______________________________________ */
//POST route
router.post("/create-cocktail",isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id
   
    const { strDrink,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strDrinkThumb,
    strIngredient,
    strMeasure} = req.body;

    const newCocktail = await Cocktail.create( {
      strDrink,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strDrinkThumb,
      strIngredient,
      strMeasure});

      await User.findByIdAndUpdate(userId, {$push: {createdCocktails: newCocktail._id}})
    res.status(201).json(newCocktail);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//PUT route
router.put("/edit-cocktail/:cocktailId",isAuthenticated, async (req, res, next) => {
  try {
    const { cocktailId } = req.params;
    const { 
      strDrink,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strDrinkThumb,
      strIngredient,
      strMeasure } = req.body;

    const updatedCocktail = await Cocktail.findByIdAndUpdate(
      cocktailId,
      {
        strDrink,
        strCategory,
        strAlcoholic,
        strGlass,
        strInstructions,
        strDrinkThumb,
        strIngredient,
        strMeasure,
      },
      { new: true }
    );

    res.status(200).json(updatedCocktail);
  } catch (error) {
    next(error);
  }
});

//DELETE route
router.delete("/edit-cocktail/:cocktailId",isAuthenticated, async (req, res, next) => {
  try {
    const { cocktailId } = req.params;
    await Cocktail.findByIdAndRemove(cocktailId);
    res.status(200).json({
      message: `The cocktail with the id ${cocktailId} was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

//GET route
router.get("/created-cocktails",isAuthenticated, async (req, res, next) => {
  try {
    const allCreatedCocktails = await User.find();
    res.status(200).json(allCreatedCocktails);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
