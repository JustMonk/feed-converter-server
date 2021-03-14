const db = require("../models");
const Feed = db.feed;

exports.getList = (req, res) => {
   Feed.find({ userId: req.userId }, '-_id -__v' , (err, feeds) => {
      res.status(200).send(feeds);
   });
};

exports.getOne = (req, res) => {
   res.status(200).send("Public Content.");
};

exports.create = (req, res) => {
   const feed = new Feed({
      userId: req.userId,
      name: req.body.name,
      url: req.body.url,
      removedDescription: req.body.removedDescription,
      stopWords: req.body.stopWords,
      addedCity: req.body.addedCity,
      textAfterDescription: req.body.textAfterDescription,
      removeLastImage: req.body.removeLastImage,
      excludeOutOfStockItems: req.body.excludeOutOfStockItems
   });
   feed.save(err => {
      if (err) {
         res.status(500).send({ message: err });
         return;
      }

      res.send({ message: "Feed created successfully!" });
   });
};

exports.edit = (req, res) => {
   res.status(200).send("Public Content.");
};

exports.delete = (req, res) => {
   res.status(200).send("Public Content.");
};