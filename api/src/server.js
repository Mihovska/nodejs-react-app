const express = require('express');
const app = express();
const connectDb = require('./models/dbconnection');
const cors = require('cors');
const routes = require("./routes/ships.routes");

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
connectDb()
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();

});

app.use("/api/starShips", routes);
app.use(cors());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
