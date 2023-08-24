// urlController.js

const dns = require('dns');
const mongoose = require("mongoose");
const Url = require("../models/Url");
const Counter = require("../models/Counter");
const { validationResult } = require('express-validator');
const { urlValidationChain } = require('./validationController');

const createShortUrl = async (req, res) => {
  res.locals.disableButton = true;

  try {
    await validateUrl(req, res);

    const session = await mongoose.startSession();
    session.startTransaction();

    const originalUrl = req.body.url;
    const parsedUrl = new URL(originalUrl);
    await dnsLookup(parsedUrl.hostname);

    const decodedUrl = encodeURIComponent(originalUrl);
    const url = new Url({ original_url: decodedUrl });

    const seqValue = await getCounterValue(session);

    if (seqValue !== null) {
      await url.save({ session });
      await session.commitTransaction();
      console.info("Entry generated: ", { [seqValue]: url });
      res.locals.disableButton = false;
      res.json({ original_url: decodeURIComponent(url.original_url), short_url: seqValue });
    } else {
      console.log("Counter entry not found");
    }

    session.endSession();
  } catch (error) {
    console.error('An error occurred:', error);
    res.locals.disableButton = false;
    res.status(400).send({ error: 'invalid url' });
  }
};

const validateUrl = async (req, res) => {
  const validationChain = urlValidationChain();
  await validationChain.run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: 'invalid url' });
    throw new Error('invalid url');
  }
};

const dnsLookup = (hostname) => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err) => {
      if (err) {
        console.error('DNS lookup error:', err);
        reject(new Error('invalid url'));
      } else {
        resolve();
      }
    });
  });
};

const getCounterValue = async (session) => {
  try {
    const counterEntry = await Counter.findOne({ _id: { db: "test", coll: "urls" } }).session(session);
    return counterEntry ? counterEntry.seq_value : null;
  } catch (error) {
    console.error("Error retrieving counter entry:", error);
    throw new Error('Error retrieving counter entry');
  }
};

module.exports = {
  createShortUrl
};