const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch(e => {
    console.log("error in db connection");
  });
