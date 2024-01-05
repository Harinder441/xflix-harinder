const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

mongoose
  .connect(config.mongoose.url,config.mongoose.options )
  .then(() => {
    console.log("Connected to MongoDB");
    
   app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });