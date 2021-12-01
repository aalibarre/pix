// these are GET/POST routes for menu page
const e = require('express');
const express = require('express');
const router  = express.Router();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

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
    console.log('Quantity type', req.session.cart[name]);

    //if item doesnt exist in cart and user press qty = 0, then ignore
    //if item exists in cart and user press qty = 0, remove item from cart
    if (quantity === 0) {
      delete req.session.cart[name];
      console.log('delete >>>>>>>>>>>>>>>');
      console.log(' CART >>>>>>>', req.session.cart);
      res.status(200);
      res.send();
      return;
    }

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
          let price = result.rows[0].price;
          //let totalPrice = ( price / 100 ) * listOfOrders[order];
          console.log('TOTAL PRICE', price);
          let templateVars = {listOfOrders, price};
          res.render("checkout", templateVars);
        })
        .catch((err) => {
          console.log('###### Database Query Error ######');
          console.log(err.message);
        });

      }
    } else {
      //redirect to main (or show relevent error)
      return res.redirect("/");
    }
  });

  router.post("/checkout", (req, res) => {
    const name = req.body.fullname;
    const email = req.body.email;
    const mobile = req.body.mobile;
    //const total_price = req.body.totalPrice
    const cart_items = JSON.stringify(req.session.cart);
    // res.send('what is this?');
    //  when user confirms checkout add items to orders table and redirect to menu page
    //  db.query(`INSERT INTO orders (resturant_id, user_id, name, total_quantity, total_price) VALUES (1, 2, 'Grandma's Creamery', 10, 60) RETURNING*`)
    db.query(`INSERT INTO orders (restaurant_id , user_id, name, total_quantity, total_price, created_at, cart_items) VALUES (1, 2, 'name', 10, 60, NOW(), ${cart_items}) RETURNING*`)
    .then(data => {
      let orders = { checkout: data.rows };
      console.log('orders', orders)
      req.session.cart = null;

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
        console.log('######Error######');
        console.log(err.message);
    });
//sms to owner of new order
// client.messages
//          .create({body: 'A customer placed an order, please check your dashboard ', from: '+12284324910', to: '+16476496220'})
//          .then(message => console.log(message.sid));

    //once we get a reply from owner
    //save to order history
    //send sms to customer with order confirmation
    //redirect order history or menu
    return res.redirect(`/menu`);
   });

// order page that shows when a customer sucessfully placed an order
   router.get("/checkout/order", (req, res) => {

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
          let price = result.rows[0].price;
          //let totalPrice = ( price / 100 ) * listOfOrders[order];
          console.log('TOTAL PRICE', price);
          let templateVars = {listOfOrders, price};
          res.render("order", templateVars);
        })
        .catch((err) => {
          console.log('###### Database Query Error ######');
          console.log(err.message);
        });

      }
    } else {
      //redirect to main (or show relevent error)
      return res.redirect("/history");
    }
  });

   //get route for order history
   router.get("/history", (req, res) => {
     //query db for active and past orders
     db.query(`SELECT *
      FROM orders
      WHERE user_id = 2
      AND restaurant_id = 1
      AND pending = true
      ORDER BY created_at DESC;
      `)
      .then(data => {
        //active orders
        let activeOrders = data.rows;
        let activeItems = getItems(activeOrders);
        //past orders
        let pastOrders;
        db.query(`SELECT *
        FROM orders
        WHERE user_id = 2
        AND restaurant_id = 1
        AND pending = false
        ORDER BY created_at DESC;
        `)
        .then(data => {
          pastOrders = data.rows;
          let pastItems = getItems(pastOrders);
          console.log(pastOrders);
          /* console.log(activeOrders); */
          //send the query data into ejs for rendering
          let orders = { pastOrders, pastItems, activeOrders, activeItems };
          res.status(200);
          res.render('history', orders);
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
   });
   return router;
  }

function getPastOrders(past) {
  pastOrders = past;
};

function getItems(orders) {
  let items = [];
  for (const order of orders) {
    //parse JSON string
    let item = JSON.parse(order.cart_items);
    items.push(item);
  }
  return items;
};


