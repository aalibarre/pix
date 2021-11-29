// these are GET/POST routes for menu page
const e = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /menu routes
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM meals WHERE restaurant_id = 1;`)
      .then(data => {
        let meals = { menu: data.rows };
        //send a rendered page with all menu items
        //console.log(meals);
        console.log('Get Route session', req.session.cart);
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
    //the data sent by ajax in emu.ejs is stored in req.body
    /* everything below is for debugging */
    //console.log(req.body);
    if(!req.session.cart) {
      req.session.cart = {};
    }
    const data = req.body;
    //console.log('NAME: ', data);
    //if data key already exists
    let name = Object.keys(data)[0];
    //name = name.pop();
    let quantity = parseInt(data[name]);
    //console.log(typeof name,typeof quantity);
    //console.log(name, quantity);
    console.log('CART Before >>>>>>>>>>>>', req.session);
    console.log('Name >>>>>>>>>>>>', name);
    if(req.session.cart[name]) {
      req.session.cart[name] += quantity;
    } else {
      req.session.cart[name] = quantity;
    }
    console.log('Temp Data ---------> ', data);
    console.log('CART >>>>>>>>>>>>', req.session);

    //if data is zero
    //console.log('Data in cookie session: ', req.session.cart);
    //console.log(Object.keys(data));

    //res.send({ data });
    //when adding to db
    //add to cart, server side
    //ajax request for button press
   // res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {
    const user_id = 1;
    req.session.user_id = user_id;
    if (!req.session.userId) {
      res.error("💩");
      console.log('Error user_id is not correct', user_id);
      return;
    }
    const listOfOrders = req.session.cart;
    //console.log('Order List ===>', orderList);
    //console.log(typeof orderList);
    if(listOfOrders) { //!Add check for user id
      //loop through all cart
      //query for price of food item
      //add to cart obj
      for (let order of listOfOrders) {

        db.query(`SELECT price FROM menu WHERE name = $1`, [order.name])
        .then((result) => {
          console.log(result);
          return;
        })
        .catch((err) => {
          console.log('###### Database Query Error ######');
          console.log(err.message);
        });

      }
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
  });
  return router;
};
