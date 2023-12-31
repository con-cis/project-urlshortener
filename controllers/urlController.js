const dns = require("node:dns");
const Url = require("../models/Url");
const Counter = require("../models/Counter");
const { validationResult } = require("express-validator");
const { urlValidationChain } = require("../utilities/validationChains");

const createShortUrl = async (req, res) => {
  if (res.locals !== undefined) {
    res.locals.disableButton = true;
  }
  try {
    await validateUrl(req, res);

    const originalUrl = req.body.url;
    const parsedUrl = new URL(originalUrl);

    await dnsLookup(parsedUrl.hostname, res);

    const decodedUrl = encodeURIComponent(originalUrl);

    const counterEntry = await Counter.findOne();

    const seqValue = counterEntry?.$inc("seq_value", 1).seq_value ?? 1;

    const url = new Url({ original_url: decodedUrl, short_url: seqValue });

    if (seqValue !== null) {
      await url.save();
      console.info("Entry generated: ", url);
      if (res.locals !== undefined) {
        res.locals.disableButton = false;
      }
      res.json({
        original_url: decodeURIComponent(url.original_url),
        short_url: seqValue,
      });
    }
  } catch (error) {
    if (res.locals !== undefined) {
      res.locals.disableButton = false;
    }
    console.error("An error occurred:", error);

    if (Array.isArray(error.errors)) {
      error.valErr = error.errors[0].msg;
    }

    switch (error.errno || error.code || error.valErr) {
      case -3008:
        res.status(500).send("url not found");
        break;
      case -3003:
        // res.status(500).send("no valid url");
        // status 200 because a code challenge test condition
        res.status(200).json({ error: 'invalid url' });
        break;
      case 11000:
        res.status(500).send("Counter not synchronized");
        break;
      default:
        res.status(500).send("internal error: unknown error");
        break;
    }
  }
};

const validateUrl = async (req, res) => {
  const validationChain = urlValidationChain();
  await validationChain.run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw errors;
  }
};

const dnsLookup = (hostname, res) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  createShortUrl,
};
