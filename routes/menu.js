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
    //add to cart, server side
    //ajax request for button press
   // res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {
    //check if cart is empty
    //receive localstorage/session
    //if button is pressed then go to checkout page

    //if the user is not logged in then they cannot checkout
    const userId = 1;
    req.session.userId = 1;
    if (!req.session.userId) {
      res.error("💩");
      console.log('Error user_id is not correct', userId);
      return;
    } else {
      res.render("./checkout");
    }
    //res.send('hmmm...');
  });

  router.post("/checkout", (req, res) => {
   // res.send('what is this?');
    //when user confirms checkout add items to orders table and redirect to menu page
  });
  return router;
};
