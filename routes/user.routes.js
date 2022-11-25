const router = require("express").Router();
const User = require("../models/User.model");
const Cocktail = require("../models/Cocktail.model")
const {isAuthenticated} = require("../middleware/jwt.middleware")


//GET route
router.get("/profile/:id", async (req, res, next) => { 
    try {
      const {id} = req.params
      const getUser = await User.findById(id)
      
      res.status(200).json(getUser)
    } catch (error) {
      next(error)
    }
});

//PUT route
router.put("/edit-profile/:id", async (req, res, next) => {
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
router.get("/favorites/:userId", async (req, res, next) => {
try {
  const {userId} = req.params
  const userFavorites = await User.findById(userId).populate("favoriteCocktails")

  res.status(200).json(userFavorites)
} catch (error) {
  next(error)
}
});

//DELETE
/* router.delete("/edit-favorites/:cocktailId",isAuthenticated, async (req, res, next) => {
  try {
    const cocktailId = req.payload._id
    await User.findByIdAndRemove(cocktailId);
    res.status(200).json({
      message: `The article with the id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
}); */

//GET route
router.get("/created-articles/:id", (req, res, next) => {});

module.exports = router;
