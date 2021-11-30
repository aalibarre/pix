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
    if(!req.session.cart) {
      req.session.cart = {};
    }
    const data = req.body;
    //if data key already exists
    let name = Object.keys(data)[0];
    //name = name.pop();
    let quantity = parseInt(data[name]);
    console.log('CART Before >>>>>>>>>>>>', req.session.cart);
    console.log('Name >>>>>>>>>>>>', name);
    console.log('Quantity type', typeof quantity);

    req.session.cart[name] = quantity;
    res.status(200);
    res.send();
    console.log('Temp Data ---------> ', data);
    console.log('CART >>>>>>>>>>>>', req.session.cart);

    //if data is zero

    //when adding to db
    //add to cart, server side
    //ajax request for button press
   // res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {

    const listOfOrders = req.session.cart;
    console.log(listOfOrders);
    //console.log('Order List ===>', orderList);
    //console.log(typeof orderList);
    if(listOfOrders) { //!Add check for user id
      //loop through all cart
      //query for price of food item
      //add to cart obj
      for (let order in listOfOrders) {

        db.query(`SELECT price FROM meals WHERE name = $1`, [order])
        .then((result) => {
          console.log(result);
          return;
        })
        .catch((err) => {
          console.log('###### Database Query Error ######');
          console.log(err.message);
        });

      }
      let quantity = Object.values(req.session.cart);
      quantity = parseInt(quantity.pop());
      console.log('Quantity >>>>> ', quantity);
      console.log(typeof quantity);
      totalPrice = 10 * quantity;
      //let totalPrice = cartObj.quantity * cart; Put in loop
      // for (let item of cart) {
      //   totalPrice += (cart[item].price * cart[item].qty);
      // }

      let templateVars = {listOfOrders, totalPrice};
      res.render("checkout", templateVars);
      //template
      //res.render

    } else {
      res.redirect("/");
      //redirect to main (or show relevent error)
    }

    // db.query(`SELECT total_price, total_quantity FROM orders WHERE user_id = 2 AND orders.id = 1;`)
    // .then(data => {
    //   let orders = data.rows;
    //   console.log(orders);
    //   res.render('checkout', {orders});
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    //     console.log('######Error######');
    //     console.log(err.message);
    // });
  });

  router.post("/checkout", (req, res) => {
    // res.send('what is this?');
    //  when user confirms checkout add items to orders table and redirect to menu page
    //  db.query(`INSERT INTO orders (resturant_id, user_id, name, total_quantity, total_price) VALUES (1, 2, 'Grandma's Creamery', 10, 60) RETURNING*`)



    //sms to owner of new order
    //once we get a reply from owner
    //save to order history
    //send sms to customer with order confirmation
    //redirect order history or menu
    return res.redirect(`/menu`);
   });
   return router;
  }


