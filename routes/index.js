"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

/*GET*/
router.get("/", (req, res) => {
  res.render("index");
});

/*POST*/
/*Las validaciones se aplican a través de un middleware que provee express-validator*/
router.post(
  "/",
  [
    body("name", "Debe ingresar su nombre").exists().isLength({ min: 2 }),
    body("lastName", "Debe ingresar su apellido").exists().isLength({ min: 2 }),
    body("email", "Debe ingresar un email válido").exists().isEmail(),
    body("message", "Mensaje debe contener entre 10 y 300 caracteres")
      .exists()
      .trim()
      .isLength({ min: 10, max: 300 }),
  ],

  /*terminado el middleware, comienza el callback con los params req y res */
  (req, res) => {
    /* Encontramos los errores de validación en la request y los envolvemos en un objeto con
    funciones muy útiles que también provee express-validator*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formData = req.body;
      console.log(formData);
      const arrWarnings = errors.array();
      res.render("index", { formData, arrWarnings });

      //aquí sigue el código de nuestro controlador POST
    } else {
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
    }
  }
);
module.exports = router;
