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
    }
  });

  $('.add-cart-btn').on('click', function(e) {
    //get the name and qty of item
    const name = $(this).closest('article').find('h2').text().trim();
    const qty = $(this).closest('div').find('span').text();
    //package into an object
    let item = {};
    item[name] = qty;
    //send object to server over ajax
    $.ajax('/menu/', { method: 'POST', data: item, success: function(data) {
      console.log(data);
    }});
  });
});
