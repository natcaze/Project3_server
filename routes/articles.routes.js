const router = require("express").Router();
const Article = require("../models/Article.model");
const {isAuthenticated} = require("../middleware/jwt.middleware")

//GET route
router.get("/all-articles", async (req, res, next) => {
  try {
    const allArticles = await Article.find();
    res.status(200).json(allArticles);
  } catch (error) {
    next(error);
  }
});

//POST route
router.post("/create-article",isAuthenticated, async (req, res, next) => {
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
    console.log(error);
    next(error);
  }
});

//PUT route
router.put("/edit-article/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, recipe, img } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        description,
        recipe,
        img,
      },
      { new: true }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete("/edit-article/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndRemove(id);
    res.status(200).json({
      message: `The article with the id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
