const router = require("express").Router();
const Article = require("../models/Article.model");

//GET route
router.get("/all-articles", (req, res, next) => {});

//POST route
router.post("/create-article", async (req, res, next) => {
  try {
    const { title, description, recipe, img } = req.body;
    const newArticle = await Article.create({
      title,
      description,
      recipe,
      img,
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.log("test", error);
    next(error);
  }
});

//PUT route
router.put("/edit-article/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

//DELETE
router.delete("/edit-article/:id", (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = router;
