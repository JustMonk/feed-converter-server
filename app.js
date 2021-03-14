const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const dbConfig = require("./config/db.config.js");

const app = express();

var corsOptions = {
   origin: "http://localhost:8081"
};
/*для прода
app.use(helmet());
*/

const port = 1337;

var corsOptions = {
   origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
db.mongoose
   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
   })
   .catch(err => {
      console.error("Connection error", err);
      process.exit();
   });

function initial() {
   Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
         new Role({
            name: "user"
         }).save(err => {
            if (err) {
               console.log("error", err);
            }

            console.log("added 'user' to roles collection");
         });

         new Role({
            name: "moderator"
         }).save(err => {
            if (err) {
               console.log("error", err);
            }

            console.log("added 'moderator' to roles collection");
         });

         new Role({
            name: "admin"
         }).save(err => {
            if (err) {
               console.log("error", err);
            }

            console.log("added 'admin' to roles collection");
         });
      }
   });
}

//swagger
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
   res.json({ message: "Welcome to bezkoder application." });
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})