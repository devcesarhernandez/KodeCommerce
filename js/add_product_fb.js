async function addProductFb(name, desc, imgs, price, fav){
	return await database.ref().child('products').push({
		name: name,
		description: desc,
		imageUrl: imgs,
		price: price,
		fav: fav
	});
}

function getDataProduct(){
	let name = document.querySelector('#name_product').value;
	let desc = document.querySelector('#desc_product').value;
	let imgs = document.querySelector('#image_product').value;
	let price = document.querySelector('#price_product').value;

	let imgsArr = imgs.split(',');

	return {
		name: name,
		description: desc,
		imageUrl: imgsArr,
		price: price
	}
}

function validateDataProduct(data){
	for ( const property in data ){
		if( data[property] == '' ){
			console.log(data);
			return false;
		}
	}
	return true;
}

let btnSave = document.querySelector('#save_product');

btnSave.addEventListener('click', async () => {
	let product_data = getDataProduct();
	
	if(validateDataProduct(product_data)){
		let res = await addProductFb(
			product_data.name,
			product_data.description,
			product_data.imageUrl,
			product_data.price,
			false
		);

		Swal.fire({
			title: "¡Producto agregado a la base de datos con exito!",
			showConfirmButton: false,
			icon: 'success',
			timer: 1500
		});

		window.location.href = '/';
	} else {
		Swal.fire({
			title: "Revisa el formulario, faltan datos.",
			showConfirmButton: false,
			icon: 'error',
			timer: 1500
		});
	}
})