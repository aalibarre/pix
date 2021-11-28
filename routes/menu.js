// these are GET/POST routes for menu page
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /menu routes
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM meals WHERE restaurant_id = 1;`)
      .then(data => {
        const meals = data.rows;
        res.send({ meals });
      });
  });

  router.post("/", (req, res) => {
    res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {
    res.send('hmmm...');
  });

  router.post("/checkout", (req, res) => {
    res.send('what is this?');
  });
  return router;
};
