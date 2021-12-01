//cart container
//render cart data
//render new cart data, append
//update cart
//checkout
//delete cart item
//add quantity





//Helper Functions
const cartCounter = function(obj, state) {
  const cart = obj.closest('body').find('.cart-icon');
  //get current cart value
  let cartValue = Number(cart.text());
  console.log(cartValue);
  //increment cart value
  state ? cartValue += 1 : cartValue -= 1;
  //update the cart value
  cart.text(cartValue);
};

const toJSONObject = function(str) {
  let obj = JSON.parse(str);
  return obj;
};

const toJSONString = function(obj) {
  let str = JSON.stringify(obj);
  return str;
};
