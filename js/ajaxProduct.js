// "use strict";
//
//
// function ready() {
//
// 	// T-SHIRTS
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'http://localhost:3000/goods');
// 	xhr.send();
//
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState === XMLHttpRequest.DONE) {
// 			var items = JSON.parse(xhr.responseText);
// 			items.map(function (item) {
// 				return new Product(item);
// 			})
// 		}
// 	}
//
//
// }
// document.addEventListener("DOMContentLoaded", ready);