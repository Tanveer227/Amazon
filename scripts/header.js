import {quantity, updateQuantity} from "/data/cart.js";

updateQuantity();

document.querySelector(".js-header")
    .innerHTML=`
                <div id="navbar">

                    <a class="navlogo border" href="New.html">
                        <img src="images/amazon-logo-white.png" class="amazon-logo">
                        <img src="images/amazon-mobile-logo-white.png" class="amazon-mobile-logo">
                    </a>

                    <div class="border navloc">
                        <p class="navtext1" id="deliver">Deliver to</p>
                        <div class="icon">
                            <i class="fa-solid fa-location-dot"></i>
                            <p id="Country" class="navtext2">India</p>
                        </div>
                    </div>

                    <div id="navsearch">
                        <select class="cat">
                            <option>All</option>
                        </select>
                        <input class="searchbar" placeholder="Search Amazon">
                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div id="navlang" class="border">
                        <div id="flag"></div>
                        <div id="lang">
                            <p>EN<i class="fa-solid fa-caret-down dropdown"></i></p>
                        </div>
                    </div>

                    <div class="border" id="Account">
                        <div>
                            <p class="navtext1" id="hello">Hello, sign in</p>
                            <p class="navtext2">
                                Account & Lists
                                <i class="fa-solid fa-caret-down dropdown"></i>
                            </p>
                        </div>
                    </div>

                    <div class="border" id="orders">
                        <div>
                            <p class="navtext1" id="hello">Returns</p>
                            <p class="navtext2">& Orders</p>
                        </div>
                    </div>

                    <a id="navcart" class="border" href="checkout.html">
                        <img class="cartlogo" src="images/cart-icon.png">
                        <div class="cart-quantity">${quantity}</div>
                        <div class="navtext2 cart">Cart</div>
                        <div class="cart-text"></div>
                    </a>
                </div>

                <div id="panel">
                    <div id="menu" class="border">
                        <i class="fa-solid fa-bars"></i>
                        <p class="pantext1">All</p>
                    </div>

                    <div id="panop">
                        <div class="border box">
                            <p class="pantext2">Today's Deals</p>
                        </div>
                        <div class="border box">
                            <p class="pantext2">Costumer Service</p>
                        </div>
                        <div class="border box">
                            <p class="pantext2">Registry</p>
                        </div>
                        <div class="border box">
                            <p class="pantext2">Gift Cards</p>
                        </div>
                        <div class="border box">
                            <p class="pantext2">Sell</p>
                        </div>
                    </div>
                </div>`;