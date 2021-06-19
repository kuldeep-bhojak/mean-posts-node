const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://kuldeep:YLBzVzxQ7wQBe4ER@cluster0.bovkp.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("== mongodb Connected ==");
  })
  .catch(() => {
    console.log("Failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
