const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userProfile: { type: Schema.Types.ObjectId, ref:'User' },
  createdArticles: [ { type: Schema.Types.ObjectId, ref:'Article' } ],
  createdCocktails: [ { type: Schema.Types.ObjectId, ref:'Cocktail' } ],
  favoriteCocktails: [ { type: Schema.Types.ObjectId, ref:'Cocktail' } ],
  img:{ type: String,
    type: Schema.Types.ObjectId, ref:'FavoriteCocktails' } ,
},
  {   // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
