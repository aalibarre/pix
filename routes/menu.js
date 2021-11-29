// these are GET/POST routes for menu page
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /menu routes
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM meals WHERE restaurant_id = 1;`)
      .then(data => {
        let meals = { menu: data.rows };
        //send a rendered page with all menu items
        console.log(meals);
        console.log(req.session.cart);
        req.session.cart = { apple: 1, orange: 10 };
        res.render('menu', meals);
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
    // const userId = 1;
    // req.session.userId = 1;
    // if (!req.session.userId) {
    //   res.error("💩");
    //   console.log('Error user_id is not correct', userId);
    //   return;
    // }

    db.query(`SELECT total_price, total_quantity FROM orders WHERE user_id = 2 AND orders.id = 1;`)
    .then(data => {
      let orders = data.rows;
      console.log(orders);
      res.render('checkout', {orders});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
        console.log('######Error######');
        console.log(e.message);
    });
  });

  router.post("/checkout", (req, res) => {
   // res.send('what is this?');
    //when user confirms checkout add items to orders table and redirect to menu page
  });
  return router;
};
