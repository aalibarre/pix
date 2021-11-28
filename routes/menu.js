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
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
          console.log('######Error######');
          console.log(e.message);
      });
  });

  router.post("/", (req, res) => {
    //when adding to db

   // res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {
    //if button is pressed then go to checkout page

    //if the user is not logged in then they cannot checkout
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      console.log('Error user_id is not correct', userId);
      return;
    } else {
      res.render("/checkout")
    }
    //res.send('hmmm...');
  });

  router.post("/checkout", (req, res) => {
   // res.send('what is this?');
    //when user confirms checkout add items to orders table and redirect to menu page
  });
  return router;
};
