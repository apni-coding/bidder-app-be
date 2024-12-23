const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const indexRouter = require("./src/routes");
const { tableSync } = require("./src/utils/commonMethod");
require('./src/associations');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', indexRouter)

// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log(`App is running on ${PORT}`);
    // db connection
    await sequelize.authenticate();
    console.log('Db Connection has been established successfully.');
    await tableSync()
  } catch (error) {
    console.log("Error", error.message);
  }
});

