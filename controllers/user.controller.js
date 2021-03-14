const db = require("../models");
const User = db.user;

exports.getUserInfo = (req, res) => {
   User.findOne({ _id: req.userId }).populate("roles", "-__v")
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err });
            return;
         }
         if (!user) {
            res.status(400).send({ message: 'Wrong user id' });
            return;
         }

         var authorities = [];
         for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
         }

         res.status(200).send({
            id: user._id,
            email: user.email,
            roles: authorities,
         });
      });
};

exports.allAccess = (req, res) => {
   res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
   res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
   res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
   res.status(200).send("Moderator Content.");
};