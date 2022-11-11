
//variables
import { P_Container,header,showMenu,menu,closeMenu,shopIcon,cart,closeCart,
    cartContainer,cartItemsCount,cartCount,cartPriceTotal,sellWear,objCartShop,productShow,products} from "./variables.js";

import {printWears,printWearsWithId,scrollHead} from "./variables.js";
//pintamos a los productos en el body



printWears();


scrollHead();

//muestra el menu
showMenu.addEventListener("click", function(){
    menu.classList.toggle("show-menu");
});

// cerraremos el carrito

closeMenu.addEventListener("click", function(){
    menu.classList.remove("show-menu");
    menu.classList.add("nav-menu");
});

//muestra el carrito de compras
shopIcon.addEventListener("click", function(){
    cart.classList.toggle("show-cart");
});

//ocultamos el carrito de compras
closeCart.addEventListener("click", function(){
    cart.classList.remove("show-cart");
    cart.classList.add("cart");
});

//Mostrar los productos de acuerdo a los botones de productos, show all, etc

productShow.addEventListener("click", (e) => {
    
    if(e.target.classList.contains("products-title") || e.target.classList.contains("products-stock")){
        productContainer.innerHTML = "";
        const showWhat = e.target.getAttribute("data-filter");
        if(showWhat === "all"){
            productContainer.innerHTML = "";
            console.log("Hola goo0");
            printWears();
        }

        if(showWhat === ".hoodies"){
            productContainer.innerHTML = "";
            console.log("Hola goo1");
            printWearsWithId(1);
        }

        if(showWhat === ".shirts"){
            productContainer.innerHTML = "";
            console.log("Hola goo2");
            printWearsWithId(2);
        }

        if(showWhat === ".sweatshirts"){
            productContainer.innerHTML = "";
            console.log("Hola goo3");
            printWearsWithId(3);
        }
    }

})

//agrega productos al carrito 

//crearé la función para pintar el carrito de compras.

function printWearInCart() {
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, image, stock, amount, subTotal }) => {
        subTotal = amount * price;
        html += `
        <div class="cart__card">
            <div class="box">
                <img src="${image}" alt="${name}" class="cart-img">
            </div>
            <div class="cart-details">
                <h3 class="cart-title">${name}</h3>
                <span class="cart-details">
                    Stock: ${stock} | 
                    <span class="cart-price"> $${price}.00</span>
                </span>
                <span class="cart-subtotal"> Subtotal: $${subTotal}.00</span>
                <div class="cart-amount">
                    <div class="cart-amount-content">
                        <span class="cart-amount-box minus" >
                            <i class="bx bx-minus" data-id="${id}">
                            </i>
                        </span>
                        <span class="cart-amount-number">${amount} units</span>
                        <span class="cart-amount-box plus" >
                            <i class="bx bx-plus" data-id="${id}">
                            </i>
                        </span>
                    </div>
                    <i class="bx bx-trash-alt cart-amount" data-id="${id}">
                    </i>
                </div>
            </div>
        </div>
    `;
    });

    cartContainer.innerHTML = html;

    countProduct();
    printTotal();
}

//Ahora agregaré al carrito.

function pintarCarta(e){
    if(e.target.classList.contains("bx-plus")) {
        const idWear = parseInt(e.target.getAttribute("data-id"));

        const currentWear = products.find((product) => product.id === idWear);
        if(!currentWear.stock){
            return alert("Sorry, we are out of stock");
        }

        if(objCartShop[currentWear.id]){
            addWear(idWear);
        }else {
            objCartShop[currentWear.id] = {...currentWear};
            objCartShop[currentWear.id].amount = 1;
        }

        printWearInCart();
    }
}

P_Container.addEventListener("click", pintarCarta);

//crearemos las funciones para añadir y eliminar desde el mismo carro

function addWear(idWear){
    const currentWear = products.find((product) => product.id === idWear);

    if(!currentWear.stock){
        return alert("Sorry, we are out of stock");
    }

    if(currentWear.stock === objCartShop[idWear].amount){
        return alert("Sorry, we are out of stock");
    }
    objCartShop[currentWear.id].amount++;
}

function deletefood(idWear){
    delete objCartShop[idWear];
}


//añade resta y eliminaremos desde el carrito

cartContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("bx-minus")){
        const idWear = Number(e.target.getAttribute("data-id"));
        if(objCartShop[idWear].amount === 1){
            deletefood(idWear);
        }else{
            objCartShop[idWear].amount--;
        }
        
    }

    if(e.target.classList.contains("bx-plus")){
        const idWear = Number(e.target.getAttribute("data-id"));
        addWear(idWear);
    }

    if(e.target.classList.contains("bx-trash-alt")){
        const idWear = Number(e.target.getAttribute("data-id"));
        deletefood(idWear);
        
    }

    printWearInCart();
});

//cuenta producto en el carrito.

function countProduct(){
    const arrayCartShop = Object.values(objCartShop);

    let total = arrayCartShop.reduce((acum, curr) => {
        acum += curr.amount;
        return acum;
    }, 0);

    cartItemsCount.textContent = total;
    cartCount.textContent = total;
  
}

//si esta vacio muestra la clase carrito vacio

function printTotal(){
    const arrayCartShop = Object.values(objCartShop);

    if(!arrayCartShop.length){
        return (cartContainer.innerHTML = `
        <div class="cart-empty">
            <img src="./assets/img/empty-cart.png" alt="empty cart">
            <h2>Your cart is empty</h2>
            <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
        </div>
        `);
    }

    let montoTotal = arrayCartShop.reduce((acum, curr) => {
        acum += curr.price * curr.amount;
        return acum;
    }, 0);

    cartPriceTotal.textContent = `$${montoTotal}.00`;

  
}

//btn vender producto

sellWear.addEventListener("click", (e) => {
    if(e.target.classList.contains("cart__btn")){
        products = products.map((product) => {
            if(objCartShop[product.id]?.id === product.id){
                cartPriceTotal.textContent = `$0.00`;
                return{
                    ...product,
                    stock: (product.stock - objCartShop[product.id].amount),
                };
            }else{
                return product;
            }
        });

        objCartShop = {};
        printWears();
        printWearInCart();
    }
});

printWears();
printTotal();