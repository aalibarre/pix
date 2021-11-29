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
        req.session.cart = { apple: 1, orange: 20 };
        res.render('menu', meals);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
          console.log('######Error######');
          console.log(err.message);
      });
  });

  router.post("/", (req, res) => {
    req.session.cart = req.body;
    //check if exists
    //check if name matches

  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {

    const user_id = req.session.user_id;
    const listOfOrders = req.session.cart;
    //console.log('Order List ===>', orderList);
    //console.log(typeof orderList);
    if(listOfOrders) {
      //loop through all cart
      //query for price of food item
      //add to cart obj
      // for (let order of listOfOrders) {

      //   db.query(`SELECT price FROM menu WHERE name = $1`, [order.name])
      //   .then((result) => {
      //     console.log(result);
      //     return;
      //   })
      //   .catch((err) => {
      //     console.log('###### Database Query Error ######');
      //     console.log(err.message);
      //   });

      // }
      totalPrice = 10;
      //let totalPrice = cartObj.quantity * cart; Put in loop
      // for (let item of cart) {
      //   totalPrice += (cart[item].price * cart[item].qty);
      // }

      let templateVars = {orders:listOfOrders, totalPrice};
      res.render("checkout", templateVars);
      //template
      //res.render

    } else {
      res.redirect("/");
      //redirect to main (or show relevent error)
    }









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
        console.log(err.message);
    });
  });

  router.post("/checkout", (req, res) => {
   // res.send('what is this?');
    //when user confirms checkout add items to orders table and redirect to menu page



    //send sms
    //redirect to home
  });
  return router;
};
