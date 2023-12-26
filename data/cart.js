
let cart=JSON.parse(localStorage.getItem('precart'));
if(!cart) cart=[];
console.log(cart);
let quantity=0;
cart.forEach(item => {
    quantity+=item.quantity;
});

window.addEventListener('load', function () {
    console.log(quantity);
    document.querySelector(".cart-quantity")
        .innerHTML=`${quantity}`;
});