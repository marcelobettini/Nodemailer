"use strict";
const express = require("express");
const { process_params } = require("express/lib/router");
const router = express.Router();
const nodemailer = require("nodemailer");

/*GET*/
router.get("/", (req, res) => {
  res.render("index");
});

/*POST*/
router.post("/index", (req, res) => {
  const emailMsg = {
    to: "atencioncliente@empresa.com",
    from: req.body.email,
    subject: "Mensaje desde formulario de contacto",
    html: `${req.body.name} ${req.body.lastName} envió el siguiente mensaje: ${req.body.message}`,
  };

  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  transport.sendMail(emailMsg);
  res.render("index", {
    message: "mensaje enviado",
  });
});
module.exports = router;
