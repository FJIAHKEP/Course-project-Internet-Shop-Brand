"use strict";

function ready() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/tShirts');
	xhr.send();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			var items = JSON.parse(xhr.responseText);

			items = items.map(function (item) {
				return new Product(item.id, item.image, item.productHref, item.brandProduct, item.nameProduct, item.categoryProduct, item.priceProduct);
			})
		}
	}


}

document.addEventListener("DOMContentLoaded", ready);