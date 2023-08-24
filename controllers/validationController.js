const { body, param, validationResult } = require('express-validator');

const urlValidationChain = () => body('url').trim().notEmpty().withMessage('Field cannot be empty!').isURL({ allow_query_component: false }).withMessage('Invalid URL');
const idValidationChain = () => param('id').trim().escape().notEmpty().withMessage('Field cannot be empty!').isInt().withMessage('Invalid ID');

module.exports = {
  urlValidationChain,
  idValidationChain,
  validationResult
};