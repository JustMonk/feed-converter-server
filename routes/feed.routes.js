const { authJwt } = require("../middlewares");
const controller = require("../controllers/feed.controller");
var router = require("express").Router();

module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });

   router.get("/", [authJwt.verifyToken], controller.getList);
   router.get("/:id", [authJwt.verifyToken], controller.getOne);
   router.post("/", [authJwt.verifyToken], controller.create);
   router.put("/:id", [authJwt.verifyToken], controller.edit);
   router.delete("/", [authJwt.verifyToken], controller.delete);

   app.use('/api/feed', router);
};