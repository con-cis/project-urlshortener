const { body, param } = require("express-validator");

const urlValidationChain = () =>
  body("url")
    .trim()
    .notEmpty()
    .withMessage("URL cannot be empty!")
    .isURL({ allow_query_component: false })
    .withMessage(-3003);
const idValidationChain = () =>
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("ID cannot be empty!")
    .isInt()
    .withMessage("Invalid ID");

module.exports = {
  urlValidationChain,
  idValidationChain,
};
