
let cart=JSON.parse(localStorage.getItem('precart'));
if(!cart) cart=[];
console.log(cart);
let quantity=0;
cart.forEach(item => {
    quantity+=item.quantity;
});
window.addEventListener('load', function () {
    console.log(quantity);
    if(document.querySelector(".cart-quantity")) document.querySelector(".cart-quantity").innerHTML=`${quantity}`;
    else if(document.querySelector(".checkout-cart-quantity")) document.querySelector(".checkout-cart-quantity").innerHTML=`${quantity} items`;
});