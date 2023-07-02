// Requiring modules
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// Creating express object
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
 
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to test application." });
  });
 
require("./app/routes/test.routes")(app);


// Port Number
const PORT = process.env.PORT || 3000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));