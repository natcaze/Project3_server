const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  recipe: { type: String, required: true },
  img: { type: String },
});

const Article = model("Article", articleSchema);

module.exports = Article;
