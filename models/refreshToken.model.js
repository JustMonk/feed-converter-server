const mongoose = require("mongoose");

const RefreshToken = mongoose.model(
   "RefreshToken",
   new mongoose.Schema({
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      refreshToken: String
   })
);

module.exports = RefreshToken;