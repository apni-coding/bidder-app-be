const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const app = express();

app.use(express.json());
app.use(cors());

// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log("App is running on 30001");
    // db connection
    await sequelize.authenticate();
    console.log('Db Connection has been established successfully.');
  } catch (error) {
    console.log("Error", error.message);
  }
});
