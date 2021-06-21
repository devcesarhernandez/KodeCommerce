const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

async function retreveProduct(id){
	let product = {};

	await database.ref().child('products').child(id).get()
		.then(result => {
			if(result.exists()){
				product = result.val();
			} else {
				Swal.fire({
					title: `Product ${id} not found`,
					showConfirmButton: false,
					icon: 'error',
					timer: 1500
				});
			}
		});

	return product;
}

async function showProductDetails(){
	let productData = await retreveProduct(productId);

	let cardImages = productData.imageUrl.map((img, idx) => {
		return `<div class="carousel-item ${ idx==0?'active':''}">
			<img src="${img}" class="d-block w-100" alt="...">
		</div>`
	}).join('\n')
	let productHTML = `
			<h1 class="fs-4" id="product-name">${productData.name}</h1>
			<div id="${productId}" class="carousel slide w-25 mx-auto col-12 col-md-6" data-bs-ride="carousel">
				<div class="carousel-inner">
					${cardImages}
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#${productId}" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Anterior</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#${productId}" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Siguiente</span>
				</button>
			</div>
			<div class="col-12 col-md-6">
				<p class="lead mt-3">${productData.description}</p>
				<p class="lead mt-3">${productData.price}</p>
				<button class="btn btn-success add-product-cart" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar al carrito" data-product-name="${productData.name}" data-product-id="${productId}"><i class="fas fa-cart-plus"></i> Añadir al carrito</button>
				<a href="/" class="btn btn-outline-primary">Regresar</a>
				<hr class="dropdown-divider">
				<a href="#" class="btn btn-danger mt-4" id="btn-delete">Eliminar producto</a>
			</div>
	`;

	let productDetails = document.querySelector('#productDetails');
	productDetails.innerHTML = productHTML;

	addProductCart = document.querySelectorAll('.add-product-cart');
	addProductCart.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const el = e.target
			badgeCart.innerText = cartAddProduct(el.dataset.productId);
		});
	});

	const btnDelete = document.querySelector('#btn-delete');
	btnDelete.addEventListener('click', () => {
		database.ref().child('products').child(productId).remove();

		window.location.href = '/';
	});
}

showProductDetails();