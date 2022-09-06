"use strict";
const express = require("express");
const path = require("path");
require("dotenv").config();
const PORT = 3000;
const routeIndex = require("./routes/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));
hbs.registerHelper("errName", (arrWarnings, name) => {
  if (name) {
    return name
  } else {
    const nameErr = arrWarnings.filter(el => el.param === 'name')
    return nameErr[0].msg
  }
})

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "hbs");

app.use("/", routeIndex);

app.listen(PORT, () => {
  console.warn(`Servidor corriendo en http://localhost:${PORT}`);
});
