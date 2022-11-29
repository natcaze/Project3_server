const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const cocktailSchema = new Schema({
  strDrink: { type: String },
  strCategory: { type: String },
  strAlcoholic: { type: String },
  strGlass: { type: String },
  strInstructions: { type: String },
  strDrinkThumb: { 
    type: String,
    default: 'https://static.specsonline.com/wp-content/themes/Specs%20Theme/images/default_bar-mixers.png'
  
  },
  strIngredient: [{ type: String }],
  strMeasure: [{ type: String }],
});

const Cocktail = model("Cocktail", cocktailSchema);

module.exports = Cocktail;
