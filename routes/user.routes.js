const router = require("express").Router();
const User = require("../models/User.model");


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


//GET route
router.get("/favorites/:id", (req, res, next) => {});

//POST route
router.post("/create-favorite/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//DELETE
router.delete("/edit-favorites/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//GET route
router.get("/created-articles/:id", (req, res, next) => {});

module.exports = router;
