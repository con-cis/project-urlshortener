const Url = require("../models/Url");
const { idValidationChain, validationResult } = require('./validationController');

const redirectToOriginalUrl = async (req, res) => {
  try {
    idValidationChain().run(req);
    validationResult(req).throw();

    const id = req.params.id;
    const url = await Url.findOne({ short_url: id });
    if (!url) {
      res.status(404).send('Short URL not found');
      return;
    }
    res.redirect(decodeURIComponent(url.original_url));
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(400).send({ error: 'Invalid ID' });
  }
};

module.exports = {
  redirectToOriginalUrl
};