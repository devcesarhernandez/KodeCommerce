function cartAddProduct(id){
	productsCart = JSON.parse(localStorage.getItem("ProductsCart"));

	const result = productsCart.find( product => product.id === id );

	if( result ){
		result.cantidad += 1;
	} else {
		productsCart.push({
			id: id,
			cantidad: 1
		});
	}

	localStorage.setItem("ProductsCart", JSON.stringify(productsCart));
	Swal.fire({
		title: "¡Producto agregado al carrito con exito!",
		// confirmButtonText: "Aceptar",
		showConfirmButton: false,
		icon: 'success',
		timer: 1500
	});
	console.log(productsCart);
	return productsCart.length
}