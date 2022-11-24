const router = require("express").Router();

//GET route
router.get("/user/:id", (req, res, next) => { 
    
});

//PUT route
router.put("/user/edit-profile/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//GET route
router.get("/user/favorites/:id", (req, res, next) => {});

//POST route
router.post("/user/create-favorite/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//DELETE
router.delete("/user/edit-favorites/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//GET route
router.get("/user/created-articles/:id", (req, res, next) => {});

module.exports = router;
