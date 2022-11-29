const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  recipe: { type: String, required: true },
  img: {
    type: String,
    default:
      "https://i.pinimg.com/564x/70/d3/04/70d30462c7a20ea294e8b216095a76e6.jpg",
  },
});

const Article = model("Article", articleSchema);

module.exports = Article;
