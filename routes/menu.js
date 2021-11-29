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
          console.log(err.message);
      });
  });

  router.post("/", (req, res) => {

  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {

    const user_id = req.session.user_id;
    const orderList = req.session.cart;
    console.log('Order List ===>', orderList);
    console.log(typeof orderList);
    if(orderList) {
      const cart = orderList;
      //query for price
      //save variable
      //add to cart obj

      cartObj = {
        name: "tomato",
        quantity: 10,
        price: 20
      }
      let totalPrice = 10;
      //let totalPrice = cartObj.quantity * cart; Put in loop
      // for (let item of cart) {
      //   totalPrice += (cart[item].price * cart[item].qty);
      // }

      let templateVars = {orders:cart, totalPrice};
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
