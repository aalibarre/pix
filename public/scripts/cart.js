// Client facing scripts here
const cart = {
  name: [0, 0],
};

//add to cart
//remove from cart
//clear cart
//change cart
addtocart () {
  let name =
}
function getCart()
function clearCart() {
  sessionStorage.removeItem("mycart");
}
myStorage = window.sessionStorage;
$(document).ready(() => {
  //console.log("hi");
  $('.add-cart').click((event) => {
    cart.name = [1,2];
    sessionStorage.setItem('key', cart);
    console.log(sessionStorage);
    //alert("ADDED TO CART");
    event.preventDefault();
  });
});
