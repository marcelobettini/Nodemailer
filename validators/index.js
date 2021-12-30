const { body } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  body("name", "Debe ingresar su nombre").exists().isLength({ min: 2 }),
  body("lastName", "Debe ingresar su apellido").exists().isLength({ min: 2 }),
  body("email", "Debe ingresar un email válido").exists().isEmail(),
  body("message", "Mensaje debe contener entre 10 y 300 caracteres")
    .exists()
    .trim()
    .isLength({ min: 10, max: 300 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateCreate };
