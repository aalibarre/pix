
//Initializations
//prefixes ("name, quantity, total, etc..")
/* this.storage = sessionStorage;
const cart = {
  name: "Strawberry",
  quantity: 1,
  price: 10
};


 createCart = () => {
  if(this.storage.getItem( this.cartName ) == null) {
      let cart = {};
      cart.items = [];
      this.storage.setItem(this.cartName, this.toJSONString( cart ));
      this.storage.setItem(this.quantity, "0");
      this.storage.setItem(this.price, "0");
  //} */
//};
//save food item
//add to cart
//loop through add to cart buttons class,
//add event listener on click
//on click store values into session

//addToCart = () => {
  //cap on items in storage

//}
//remove from cart

//clear cart
//change cart



///ON MENU PAGE
/*
add to cart, change quantity, update price?
save to sessionstorage
*/


//myStorage = window.sessionStorage;
/* $(document).ready(() => {
  //console.log("hi");

  $('.add-cart-btn').click((event) => {
    sessionStorage.setItem('item', cart);
    console.log(sessionStorage.getItem('item'));
    //alert("ADDED TO CART");
    event.preventDefault();
  });
}); */



///ON CHECKOUT PAGE
/*
on load get data in sessionstorage
store in variables
set values in cart table to those variables

Can, remove, change quantity, update price, cancel order, make purchase


*/


//Helper Functions
const toJSONObject = function(str) {
  let obj = JSON.parse(str);
  return obj;
};

const toJSONString = function(obj) {
  let str = JSON.stringify(obj);
  return str;
};
