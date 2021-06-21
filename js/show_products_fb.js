function addNewCard(id, title, price, images, fav){
	let cardImages = images.map((img, idx) => {
		return `<div class="carousel-item ${ idx==0?'active':''}">
			<img src="${img}" class="d-block w-100" alt="...">
		</div>`
	}).join('\n')
	let cardHTML = `<div class="col mb-4">
		<div class="card h-100">
			<div id="${id}" class="carousel slide card-img-top" data-bs-ride="carousel">
				<div class="carousel-inner">
					${cardImages}
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Anterior</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Siguiente</span>
				</button>
			</div>
			<!--<div class="position-absolute mt-2 ms-2">
				<a href=""><span class="badge bg-success p-2">Nuevo</span></a>
			</div>-->
			<div class="card-body">
				<h5 class="card-title text-white">${title}</h5>
				<p class="card-text text-white-50">${price}</p>
				<a href="product.html?id=${id}" class="card-link btn btn-info text-white">Ver producto</a>
			</div>
			<div class="card-footer d-flex justify-content-between">
				<button class="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar a favoritos"><i class="fas fa-heart text-${ fav ? 'danger' : 'secondary'}"></i></button>
				<button class="btn btn-success add-product-cart" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar al carrito" data-product-name="${title}" data-product-id="${id}"><i class="fas fa-cart-plus"></i> Añadir al carrito</button>
			</div>
		</div>
	</div>`

	return cardHTML;
}

async function getAllProducts(){
	let products = {};

	await database.ref().child('products').get().then(result => {
		if(result.exists()){
			products = result.val();
		} else {
			console.log('Items not found');
		}
	});

	return products;
}

async function showProducts(){
	let containerProducts = document.querySelector('#containerProducts');
	let allProducts = await getAllProducts();
	let listOfId = Object.keys(allProducts);
	let cards = ''

	listOfId.forEach(el => {
		let product = allProducts[el];

		cards += addNewCard(el, product.name, product.price, product.imageUrl, product.fav);
	});

	containerProducts.innerHTML = cards;
	addProductCart = document.querySelectorAll('.add-product-cart');
	addProductCart.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const el = e.target
			badgeCart.innerText = cartAddProduct(el.dataset.productId);
		});
	});
}

showProducts();