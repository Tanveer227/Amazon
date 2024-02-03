import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {cart, removeItem, updateQuantity, updateDeliveryDate, saveCart, payment, updatePayment, updateShippingPayment, shippingPayment, quantity} from "/data/cart.js";
import {products, deliveryOptions} from "/data/products.js";

updateQuantity();
updatePayment();
updateShippingPayment();
console.log(shippingPayment);
function updateProductHTML () {

    let productHTML="";
    let productItem;

    cart.forEach((cartItem ) => {
        products.forEach((product) => {
            if(cartItem.productId===product.id){
                productItem=product;
            }
        });

        productHTML+=`
                    <div class="cart-item-container">

                        <div class="delivery-date-${productItem.id}">
                            Delivery date:  
                        </div>

                        <div class="cart-item-details-grid">

                            <img class="product-image"
                                src="${productItem.image}">

                            <div class="cart-item-details">
                                <div class="product-name">${productItem.name}</div>

                                <div class="product-price">
                                    $${(productItem.priceCents/100).toFixed(2)}
                                </div>

                                <div class="product-quantity">
                                    <span>
                                        Quantity: 
                                        <span class="quantity-label">${cartItem.quantity}</span>
                                    </span>

                                    <span class="update-quantity-link link-primary" data-product-id="${productItem.id}">
                                        Update
                                    </span>
                                    
                                    <span class="updated-quantity-${productItem.id}"></span>
                                    <span class="delete-quantity-link link-primary" data-product-id="${productItem.id}">
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div class="delivery-options">
                                <div class="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                ${updateDeliveryHTML(productItem, cartItem)}
                            </div>
                        </div>
                    </div>`
        
    });

    document.querySelector(".order-summary")
            .innerHTML=productHTML;
    
    cart.forEach((cartItem ) => {
        updateDeliveryDate(cartItem);
    });
    deleteButton();
    radioButtons();
    updateButton();
}

let today=dayjs();

function updateDeliveryHTML(productItem, cartItem) {
    let deliveryHTML = "";
    
    deliveryOptions.forEach((option) => {

        let delDate = today.add(option.deliveryDays, 'days').format('dddd, MMMM D');

        let defaultSelect = "";
        if(option.id===cartItem.deliveryOptionId) {
            defaultSelect += "checked";
        }
        let price = "";
        if(option.priceCents) price+=`$${(option.priceCents/100).toFixed(2)} - `;
        else price+="FREE";

        deliveryHTML += `
                        <div class="delivery-option" data-product-id="${cartItem.productId}" data-delivery-id="${option.id}">
                            <input type="radio" ${defaultSelect} 
                                class="delivery-option-input" name="delivery-option-${productItem.id}">
                            <div>
                                <div class="delivery-option-date">${delDate}</div>

                                <div class="delivery-option-price">${price} Shipping</div>
                            </div>
                        </div>`;
    });

    return deliveryHTML;
}

function deleteButton () {

    document.querySelectorAll(".delete-quantity-link")
        .forEach((button) => {

            button.addEventListener('click', () => {

                removeItem(button.dataset.productId);
                updateProductHTML();
            });
        });
        updatePayment();
        updateShippingPayment();
        updatePaymentHTML();
}

function updatePaymentHTML() {
    let beforeTax = payment+shippingPayment;
    let tax = ((beforeTax*18)/100);

    let paymentHTML = `<div class="payment-summary-title">
                            Order Summary
                        </div>

                        <div class="payment-summary-row">
                            <div>Items (${quantity}):</div>
                            <div class="payment-summary-money">$${(payment/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">$${(shippingPayment/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">$${(beforeTax/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">$${((beforeTax+tax)/100).toFixed(2)}</div>
                        </div>

                        <button class="place-order-button button-primary">Place your order</button>
                    `;
    cart.forEach
    document.querySelector(".payment-summary")
        .innerHTML = paymentHTML;
}

updateProductHTML();
updatePaymentHTML();
deleteButton();
updateButton();

function updateButton () {

    document.querySelectorAll(".update-quantity-link")
        .forEach((button) => {
            let id=button.dataset.productId;
            button.addEventListener('click', () => {
                console.log("cks");
                let saveButton=document.querySelector(`.updated-quantity-${id}`);

                saveButton.innerHTML=`
                                <input class="quantity-input">
                                <span class="save-quantity link-primary">Save</span>`;
                button.innerHTML="";
                
                 document.querySelector(".save-quantity")
                    .addEventListener('click',  () => {
                        let quantity = Number(document.querySelector(".quantity-input").value);
                        console.log("cdc");
                        cart.forEach((cartItem) => {
                            if(cartItem.productId===id){
                                console.log(quantity);
                                cartItem.quantity=quantity;
                                console.log(cart);
                            } 
                        })
                        saveCart();
                        updateQuantity();
                        updateProductHTML();
                        updateButton();
                    });
            });
        });
        updatePayment();
        updateShippingPayment();
        updatePaymentHTML();
}

function radioButtons() {
    document.querySelectorAll(".delivery-option")
        .forEach((element) => {
            element.addEventListener('click', () => {
                cart.forEach((cartItem) => {
                    if(cartItem.productId===element.dataset.productId){

                        cartItem.deliveryOptionId=element.dataset.deliveryId;
                        saveCart();
                        updateDeliveryDate(cartItem);
                        updatePayment();
        updateShippingPayment();
        updatePaymentHTML();
                    } 
                });
                
            });
        });
}