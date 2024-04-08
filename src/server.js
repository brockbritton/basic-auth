"use strict";

const express = require("express");
const authRouter = require("./auth/router.js");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);

module.exports = {
  start: (port) =>
    app.listen(port, () => {
      console.log("Running on PORT", port);
    }),
  app,
};
