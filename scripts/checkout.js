
function updateProductHTML () {
    let productHTML="";
    let productItem;
    cart.forEach((cartItem ) => {
        products.forEach((product) => {
            if(cartItem.productId===product.id){
                productItem=product;
            }
        })
        console.log(cartItem.date);
        const freeDel = (dayjs(cartItem.date).add(4, 'days')).format('dddd, MMMM D');
        const midDel = (dayjs(cartItem.date).add(3, 'days')).format('dddd, MMMM D');
        const goodDel = (dayjs(cartItem.date).add(2, 'days')).format('dddd, MMMM D');
        productHTML+=`
                    <div class="cart-item-container">

                        <div class="delivery-date">
                            Delivery date: Tuesday, June 21
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

                                <div class="delivery-option">
                                    <input type="radio" checked 
                                        class="delivery-option-input" name="delivery-option-${productItem.id}">
                                    <div>
                                        <div class="delivery-option-date">${freeDel}</div>

                                        <div class="delivery-option-price">FREE Shipping</div>
                                    </div>
                                </div>

                                <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input" name="delivery-option-${productItem.id}">
                                    <div>
                                        <div class="delivery-option-date">${midDel}</div>

                                        <div class="delivery-option-price">$4.99 - Shipping</div>
                                    </div>
                                </div>

                                <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input" name="delivery-option-${productItem.id}">
                                    <div>
                                        <div class="delivery-option-date">${goodDel}</div>

                                        <div class="delivery-option-price">$9.99 - Shipping</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        
    });
    document.querySelector(".order-summary")
            .innerHTML=productHTML;
    deleteButton();
}

function deleteButton () {
    document.querySelectorAll(".delete-quantity-link")
        .forEach((button) => {

            button.addEventListener('click', () => {
                //console.log("clicked");
                let matchingItem;
                cart.forEach((item) => {
                    //console.log("cws");
                    if(button.dataset.productId===item.productId){
                        //console.log(item.productId);
                        matchingItem=item;
                    }
                });
                if(matchingItem) removeItem(matchingItem.productId);
                
                saveCart();
                updateQuantity();
                
                updateProductHTML();
            });
        });
}
window.addEventListener('load', () => {
    
    updateProductHTML();

    deleteButton();
    updateButton();
});

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
                /*let matchingItem;
                cart.forEach((item) => {
                    //console.log("cws");
                    if(button.dataset.productId===item.productId){
                        //console.log(item.productId);
                        matchingItem=item;
                    }
                });
                if(matchingItem) removeItem(matchingItem.productId);
                
                saveCart();
                updateQuantity();
                
                updateProductHTML();*/
            });
        });
    
}
