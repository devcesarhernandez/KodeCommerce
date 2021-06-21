let addProductCart = [];
const badgeCart = document.querySelector('#countProductsCart');
let productsCart = [];
if(!localStorage.getItem("ProductsCart")){
	localStorage.setItem("ProductsCart", JSON.stringify(productsCart));
} else {
	productsCart = JSON.parse(localStorage.getItem("ProductsCart"));
	badgeCart.innerText = productsCart.length;
}