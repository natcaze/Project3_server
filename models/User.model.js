const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userProfile: { type: Schema.Types.ObjectId, ref:'User' },
  createdCocktails: [ { type: Schema.Types.ObjectId, ref:'CreatedCocktails' } ],
  favoriteCocktails: [ { type: Schema.Types.ObjectId, ref:'FavoriteCocktails' } ],
  img:{ type: String,
    type: Schema.Types.ObjectId, ref:'FavoriteCocktails' } ,
},
  {   // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
