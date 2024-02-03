import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions, products} from "/data/products.js";

export let cart=JSON.parse(localStorage.getItem('precart'));
if(!cart) cart=[];
console.log(cart);
export let quantity;
export function updateQuantity() {

    quantity=0;

    if(cart.length!=0){
        cart.forEach((item) => {
            quantity+=item.quantity;
        });
    }
    if(document.querySelector(".cart-quantity")) document.querySelector(".cart-quantity").innerHTML=`${quantity}`;
    else if(document.querySelector(".checkout-cart-quantity")) document.querySelector(".checkout-cart-quantity").innerHTML=`${quantity} items`;
    //console.log(quantity+"a");
}
export function saveCart() {
    let precart=JSON.stringify(cart);
    localStorage.setItem('precart', precart);
}

export function removeItem(productId) {

    cart=cart.filter((value, index) => {

        if(value.productId === productId){
            console.log("dw");
            return false;
        } 
        else return true;

    })

    console.log(cart);
    saveCart();
    updateQuantity();
}

const today=dayjs();

export function insertIntoCart(productId, productQuantity) {

    let matchingItem;

    cart.forEach((item) => {
        if(item.productId===productId) matchingItem=item;
    });

    if(matchingItem) matchingItem.quantity+=productQuantity;

    else{
        cart.push({
            productId: productId,
            quantity:productQuantity, 
            date: today,
            deliveryOptionId: '1'
        });
    }

    console.log(cart);
    updateQuantity();
    saveCart();
}

export function updateDeliveryDate(cartItem) {

    let deliveryDate="";
    
    deliveryOptions.forEach((option) => {

        if(option.id===cartItem.deliveryOptionId) {
            deliveryDate=(dayjs(cartItem.date).add(option.deliveryDays, 'days')).format('dddd, MMMM D');
        }
    });

    document.querySelector(`.delivery-date-${cartItem.productId}`)
        .innerHTML =`Delivery Date: ${deliveryDate}`;
}

export let payment;
export let shippingPayment;

export function updateShippingPayment() {
    shippingPayment=0;
    cart.forEach((item) => {
        deliveryOptions.forEach((option) => {
            if(item.deliveryOptionId === option.id){
                shippingPayment += option.priceCents;
            }
        });
    });
}
export function updatePayment() {
    payment=0;
    cart.forEach((item) => {
        products.forEach((product) => {
            if(item.productId === product.id){
                payment += product.priceCents*item.quantity;
            }
        });
    });
}