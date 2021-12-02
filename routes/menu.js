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
    //req.session.price = {apple: '$1', orange: '$5'};
    //console.log(req.session.price);
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
      req.session.price = {};
    }
    const data = req.body;
    console.log(data);
    //if data key already exists
    let itemQty = data.itemQty;
    let itemPrice = data.itemPrice;
    let name = Object.keys(itemQty)[0];
    //name = name.pop();
    //get qty and price
    let quantity = parseInt(itemQty[name]);
    let price = itemPrice[name];
    console.log('CART Before >>>>>>>>>>>>', req.session.cart);
    console.log('CART Before >>>>>>>>>>>>', req.session.price);
    console.log('Name >>>>>>>>>>>>', name);
   // console.log('Quantity type', req.session.cart[name]);

    //if item doesnt exist in cart and user press qty = 0, then ignore
    //if item exists in cart and user press qty = 0, remove item from cart
    if (quantity === 0) {
      delete req.session.cart[name];
      delete req.session.price[name];
      console.log('delete >>>>>>>>>>>>>>>');
      console.log(' CART >>>>>>>', req.session.cart);
      console.log(' CART >>>>>>>', req.session.price);
      res.status(200);
      res.send();
      return;
    }

    req.session.cart[name] = quantity;
    req.session.price[name] = price;
    res.status(200);
    res.send();
    console.log('Temp Data ---------> ', data);
    console.log('CART >>>>>>>>>>>>', req.session.cart);
    console.log('CART >>>>>>>>>>>>', req.session.price);

    //if data is zero

    //when adding to db
    //add to cart, server side
    //ajax request for button press
   // res.send('goodbye world!');
  });

  // /menu/checkout routes
  router.get("/checkout", (req, res) => {

    if(!req.session.cart) {
      req.session.cart = {};
      req.session.price = {};
    }
    const listOfOrders = req.session.cart;
    console.log('List of Orders', listOfOrders);
    console.log('Length of listOfOrders', Object.keys(listOfOrders).length);

    //console.log('Order List ===>', orderList);
    //console.log(typeof orderList);


    if(listOfOrders) { //!Add check for user id
      //loop through all cart
      //query for price of food item
      //add to cart obj
      //Start promise
      let priceObj = {};

      console.log('Outside Promise', listOfOrders);
      const myPromise = new Promise((resolve, reject) => {
        console.log('Entered Promise', listOfOrders);
        let queryCounter = 0;
        let loopCounter = 0;
        // for(let i = 0; i <= 10; i ++) {
        //   console.log(i);
        // }
        let index = 0;
        let listLength = Object.keys(listOfOrders).length;
         for (let order in listOfOrders ) {
          console.log('loop');
          db.query(`SELECT price FROM meals WHERE name = $1`, [order])
          .then((result) => {
            let price = result.rows[0].price;
            //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Result', result);
            //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Result rows', result.rows);
            //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Result rows at index 0', result.rows[0]);

            priceObj[order] = price;
            //priceArr.push(price);
            //console.log('TemplateVars', templateVars);
            //res.status(200);
            //resolve(priceArr);
            //queryCounter++;
            //loopCounter = index;
            index++;
            //console.log('Query Counter', queryCounter);
            //console.log('Loop Counter', loopCounter);
            console.log('Index', index);
            console.log('List Length', listLength);
            if(index === listLength) {
              return resolve(priceObj);
            }

           })
          .catch((err) => {
            console.log('###### Database Query Error ######');
            console.log(err.message);
            reject(err);
          });
         }
        //reject('ErroRRRR');
      });

      myPromise
      .then((price)=>{

        let templateVars = {listOfOrders, price};
        console.log('TemplateVars', templateVars);
        //console.log('Price Array', price);
        return res.render("checkout", templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
    } else {
      console.log('Redirect error');
      //redirect to main (or show relevent error)
      return res.redirect("/");
    }

  });

  router.post("/checkout", (req, res) => {
    const name = req.body.fullname;
    const email = req.body.email;
    const mobile = req.body.mobile;
    //const total_price = req.body.totalPrice
    const cart_qty = JSON.stringify(req.session.cart);
    const cart_price = JSON.stringify(req.session.price);
    // res.send('what is this?');
    //  when user confirms checkout add items to orders table and redirect to menu page
    //  db.query(`INSERT INTO orders (resturant_id, user_id, name, total_quantity, total_price) VALUES (1, 2, 'Grandma's Creamery', 10, 60) RETURNING*`)
    console.log('Cart Items', cart_qty);
    console.log(typeof cart_qty);
    console.log('Before DB query');
    db.query(`INSERT INTO orders (restaurant_id , user_id, name, total_quantity, total_price, pending, created_at, cart_qty, cart_price) VALUES (1, 2, 'name', 10, 60, true, NOW(), $1, $2) RETURNING *;`,[cart_qty, cart_price])
    .then(data => {
      console.log('After DB query');
      let orders = { checkout: data.rows };
      console.log('orders', orders);
      res.status(200);
      res.send();
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


    //sms to owner of new order
    //once we get a reply from owner
    //save to order history
    //send sms to customer with order confirmation
    //redirect order history or menu
    return res.redirect(`/menu/ordersuccess`);
   });

// order page that shows when a customer sucessfully placed an order
   router.get("/ordersuccess", (req, res) => {

    const listOfOrders = req.session.cart;
    req.session.cart = null;
    req.session.price = null;
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
          res.render("ordersuccess", templateVars);
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
     //console.log(req.session.price);
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
        console.log('Active Orders', activeOrders);
        let activeItemQty = getItems(activeOrders)[0];
        let activeItemPrice = getItems(activeOrders)[1];
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
          console.log('Past Orders', pastOrders);
          let pastItemQty = getItems(pastOrders)[0];
          let pastItemPrice = getItems(pastOrders)[1];
          //console.log(pastOrders);
          /* console.log(activeOrders); */
          //send the query data into ejs for rendering
          let orders = { pastOrders, pastItemQty, pastItemPrice, activeOrders, activeItemQty, activeItemPrice };
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
  //items store both qty and price obj
  let items = [[], []];
  for (const order of orders) {
    //parse JSON string
    let qty = JSON.parse(order.cart_qty);
    let price = JSON.parse(order.cart_price);
    console.log('Cart Items  Object', qty);
    items[0].push(qty);
    items[1].push(price);
  }
  return items;
};


