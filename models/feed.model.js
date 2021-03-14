const mongoose = require("mongoose");

const Feed = mongoose.model(
   "Feed",
   new mongoose.Schema({
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      name: String,
      url: String,
      removedDescription: String,
      stopWords: [String],
      addedCity: String,
      textAfterDescription: String,
      removeLastImage: Boolean,
      excludeOutOfStockItems: Boolean
   })
);

module.exports = Feed;