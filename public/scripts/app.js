// Client facing scripts here
$(document).ready(function() {
  //increment/decrement qty counter
  $('.button-minus').on('click', function(e) {
    //get the qty counter elm
    const qtyCounter = $(this).parent().find('span');
    let qty = Number(qtyCounter.text());
    //decrement counter only if counter is not 0
    if (qty > 0) {
      console.log(qty);
      qty -= 1;
      qtyCounter.text(qty);
    }
  });

  $('.button-plus').on('click', function(e) {
    //get the qty counter elm
    const qtyCounter = $(this).parent().find('span');
    let qty = Number(qtyCounter.text());
    //increment counter until 10. 10 is max qty to order
    if (qty < 10) {
      console.log(qty);
      qty += 1;
      qtyCounter.text(qty);
    }
  });
});
