// Client facing scripts here
$(document).ready(function() {
  //increment/decrement qty counter
  $('.button-minus').on('click', function(e) {
    //get the qty counter elm
    const qtyCounter = $(this).parent().find('span');
    const name = $(this).closest('article').find('h2');
    let qty = Number(qtyCounter.text());
    //decrement counter only if counter is not 0
    if (qty !== 0) {
      console.log(name.text());
      qty -= 1;
      console.log(qty);
      qtyCounter.text(qty);
      //increment cart icon
      cartCounter($(this), 0);
    }
  });

  $('.button-plus').on('click', function(e) {
    //get the qty counter elm
    const qtyCounter = $(this).parent().find('span');
    const name = $(this).closest('article').find('h2');
    let qty = Number(qtyCounter.text());
    //increment counter until 10. 10 is max qty to order
    if (qty !== 10) {
      console.log(name.text());
      qty += 1;
      console.log(qty);
      qtyCounter.text(qty);
      //increment cart icon
      cartCounter($(this), 1);
    }
  });

  $('.add-cart-btn').on('click', function(e) {
     //get the name, qty, price of item
    // const name = $(this).closest('article').find('h2').text().trim();
    // const qty = $(this).closest('div').find('span').text();
    // const price = $(this).closest('article').find('h3').text().trim();

    const name = e.target.parentElement.parentElement.parentElement.firstElementChild.children[1].innerText;
    const qty = e.target.parentElement.parentElement.firstElementChild.children[1].innerText;
    const price = e.target.parentElement.parentElement.parentElement.firstElementChild.children[0].innerText;



    //package into an object
    let itemQty = {};
    itemQty[name] = qty;
    let itemPrice = {};
    itemPrice[name] = price;
    //send object to server over ajax
    let data = {itemQty, itemPrice};
    //data = JSON.stringify(data);
    console.log(data);
    $.ajax('/menu/', { method: 'POST', data: data, success: function(data) {
      console.log(data);
    }});
  });

  $('.cart-btn').on('click', function (e) {
    console.log('Carttttttttttt');
  })




  $('.cart-item-remove').on('click', function(e) {
    //get value of which remove button div was pressed
    //send that value to backend to delete

   const name = e.target.parentElement.firstElementChild.innerText;
    $.ajax('/menu/removed', { method: 'POST', data: {name}, success: function(data) {
      console.log('Success', data);
      //document.location.reload();
      //refresh page with javascript document.location.reload();
    }});
  });


});

