require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

app.listen(process.env.PORT, () => {
  console.log(`Listening to ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => console.log("Not Connected To DB--", error));
