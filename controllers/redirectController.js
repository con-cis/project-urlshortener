const Url = require("../models/Url");
const { validationResult } = require("express-validator");
const { idValidationChain } = require("../utilities/validationChains");

const redirectToOriginalUrl = async (req, res) => {
  try {
    await validateRedirectParameter(req, res);

    const id = req.params.id;
    
    const url = await Url.findOne({ short_url: id });
    if (!url) {
      res.status(404).send("Short URL not found");
      return;
    }
    res.redirect(decodeURIComponent(url.original_url));
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const validateRedirectParameter = async (req, res) => {
  const validationChain = idValidationChain();
  await validationChain.run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("An error occurred:", errors.array());
    res.status(500).send("invalid short url");
    throw new Error("invalid url");
  }
};

module.exports = {
  redirectToOriginalUrl,
};
