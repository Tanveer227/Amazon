
let cart=JSON.parse(localStorage.getItem('precart'));
if(!cart) cart=[];
console.log(cart);
let quantity;
function updateQuantity() {
    //console.log("tav");
    //console.log(quantity);
    quantity=0;
    //console.log(cart.length);
    if(cart.length!=0){
        cart.forEach((item) => {
            quantity+=item.quantity;
            //console.log("dwsw");
        });
    
    }
    if(document.querySelector(".cart-quantity")) document.querySelector(".cart-quantity").innerHTML=`${quantity}`;
    else if(document.querySelector(".checkout-cart-quantity")) document.querySelector(".checkout-cart-quantity").innerHTML=`${quantity} items`;
    //console.log(quantity+"a");
}
function saveCart() {
    let precart=JSON.stringify(cart);
    localStorage.setItem('precart', precart);
}
window.addEventListener('load', function () {
    console.log(quantity);
    updateQuantity();

});

function removeItem(productId) {
    cart=cart.filter((value, index) => {
        console.log(value.productId);
        if(value.productId === productId){
            console.log("dw");
            return false;
        } 
        else return true;
    })
    console.log(cart);
    

}
const today=dayjs();
function insertIntoCart(productId, productQuantity) {
    cart.push({
        productId: productId,
        quantity:productQuantity, 
        date: today
    });
}