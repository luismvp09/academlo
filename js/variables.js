//Espacio para las variables.

  
export let P_Container = document.querySelector(".products-content");
export let header = document.querySelector(".header");
export let showMenu = document.querySelector(".nav-toggle");
export let menu = document.querySelector(".nav-menu");
export let closeMenu = document.querySelector(".nav-close");
export let shopIcon = document.querySelector(".nav-shop")
export let cart = document.querySelector(".cart")
export let closeCart = document.querySelector("#cart-close");
export let cartContainer = document.querySelector(".cart-container");
export let cartItemsCount = document.querySelector("#items-count");
export let cartCount = document.querySelector("#cart-count");
export let cartPriceTotal = document.querySelector("#cart-total");
export let sellWear = document.querySelector(".cart-checkout");
export let objCartShop = {};
export let productShow = document.querySelector(".products-filters");

export let products = [
   { id: 1, name: "Hoodies", price: 14.00, image: "img/featured1.png",category: "hoodies",stock: 10,},
   { id: 2, name: "Shirts", price: 24.00, image: "img/featured2.png", category: "shirts", stock: 10,},
   {  id: 3, name: "Sweatshirts", price: 24.00, image: "img/featured3.png", category: "sweatshirts", stock: 20,},
 
];

export function printWears(){
   let html = "";
   products.forEach((product) => {
       html += `
       <article class="products-card ${product.category}">
           <div class="products-shape">
               <img src="${product.image}" alt="${product.category}" class="products-img">
           </div>
           <div class="products-data">
               <h2 class="products-price">$${product.price}.00 <span class="products-quantity">| Stock: ${product.stock}</span></h2>
               <h3 class="products-name">${product.name}</h3>
           
               <button class="button products-button">
                   <i class="bx bx-plus" data-id="${product.id}"></i>
               </button>
           </div>
       </article>
       `;
   });
   P_Container.innerHTML = html;
}

export function printWearsWithId(idWear){
   const currentWear = products.find((product) => product.id === idWear);
   let html = "";
       html += `
       <article class="products-card ${currentWear.category}">
           <div class="products-shape">
               <img src="${currentWear.image}" alt="${currentWear.category}" class="products-img">
           </div>
       
           <div class="products-data">
               <h2 class="products-price">$${currentWear.price}.00 <span class="products-quantity">| Stock: ${currentWear.stock}</span></h2>
               <h3 class="products-name">${currentWear.name}</h3>
           
               <button class="button products-button">
                   <i class="bx bx-plus" data-id="${currentWear.id}"></i>
               </button>
           </div>
       </article>
       `;
       P_Container.innerHTML = html;
}

export function scrollHead(){ 
   window.onscroll = function() {
       if(Number(window.scrollY) > 144.4){
           header.classList.add("scroll-header");
       }
       if(Number(window.scrollY) < 144.4){
           header.classList.remove("scroll-header");
       }
   };
}