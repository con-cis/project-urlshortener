const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

// Middleware
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.disableButton = false;
  next();
});

// Controllers
const urlController = require('./controllers/urlController');
const redirectController = require('./controllers/redirectController');

// Routes
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', urlController.createShortUrl);
app.get('/api/shorturl/:id', redirectController.redirectToOriginalUrl);

// Connect to MongoDB and start server
const port = process.env.PORT || 3000;
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
