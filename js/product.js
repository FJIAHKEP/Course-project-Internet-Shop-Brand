// "use strict";
//
//
// // Отрисовка продуктов
// function Product(productData) {
//
// 	this.id = productData.id; // id продукта
// 	this.image = productData.image; // Картинка продукта
// 	this.productHref = productData.productHref; // Ссылка на страницу этого продукта
// 	this.brandProduct = productData.brandProduct; // Название бренда продукта
// 	this.nameProduct = productData.nameProduct; // Имя этого продукта
// 	this.categodyProduct = productData.categoryProduct; // Категория этого продукта
// 	this.priceProduct = productData.priceProduct; // Цена этого продукта
//
// 	var settings = {
// 		button_text: 'Add to Cart', // Текст кнопки при наведении
// 		div_container_class: 'items', // Класс Основного контейнера карточки товара
// 		div_button_wrapper_class: 'img-style', // Класс Обертки для кнопки
// 		div_wrapper_text_class: 'items-place-text-style', // Класс Обертки для текста
// 		wrapper_button_components_class: 'img-style-border', // Класс Обертки Кнопки Контейнер для тэгов i и div
// 		i_button_class: 'fas fa-cart-arrow-down', // Класс для тэга i в кнопке (иконка корзины)
// 		div_button_class: 'add-to-cart' // Класс для тэга div в кнопке (отвечает как выглядит текст в кнопке)
// 	};
//
// 	//TODO Сделать отдельный рендер метод, блок с товарами должен стать массивом что бы товары добавлялись в массив
// 	// из базы тянет нужные атрибуты (src картинки, название, цену). И так проходит по всей базе или по куску
// 	// базы в json-файле, если кусок задан в url с помощью slice. И на странице рисует полную структуру
//
// 	var div_container = document.createElement('div'); // Контейнер карточки - контейнер
// 	var div_wrapper_img = document.createElement('div'); // Обертка для изоброжения - контейнер
// 	var div_wrapper_text = document.createElement('div'); // Обертка для текста - контейнер
// 	var button_wrapper = document.createElement('a'); // Обертка для кнопки - контейнер ссылка
//
// 	// Добавление DATA атрибутов главному контейнеру
// 	div_container.dataset.price = this.priceProduct;
//
//
//
// 	div_container.appendChild(div_wrapper_img); // Картинка
// 	div_container.appendChild(button_wrapper); // Эффект + кнопка
// 	div_container.appendChild(div_wrapper_text); // Текст
//
// 	div_container.classList.add(settings.div_container_class);
// 	button_wrapper.classList.add(settings.div_button_wrapper_class);
// 	div_wrapper_text.classList.add(settings.div_wrapper_text_class);
//
// 	button_wrapper.href = this.productHref; // ссылка по фону картинки
//
// 	// Картинка товара
// 	var img = new Image;
// 	img.src = this.image;
//
// 	// Изоброжение положить в контейнер для изоброжения
// 	div_wrapper_img.appendChild(img);
// 	///////////////////////////////////////////////
//
// 	// Кнопка появляющаяся при наведении
// 	var wrapper_button_components = document.createElement('div'); // Контейнер для тэгов i и div
// 	wrapper_button_components.classList.add(settings.wrapper_button_components_class);
//
// 	var i = document.createElement('i');
// 	i.className = settings.i_button_class;
//
// 	var div = document.createElement('div');
// 	div.classList.add(settings.div_button_class);
// 	div.textContent = settings.button_text; // Текст кнопки
//
// 	button_wrapper.appendChild(wrapper_button_components);
// 	wrapper_button_components.appendChild(i);
// 	wrapper_button_components.appendChild(div);
//
// 	// Собития добавления в корзину
// 	wrapper_button_components.addEventListener('click', function (event) {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open('POST', 'http://localhost:3000/cart');
// 		xhr.setRequestHeader("Content-Type", "application/json");
// 		xhr.send(JSON.stringify({
// 			id: productData.id, // id продукта
// 			quantity: 1, // Количество
// 			image: productData.image, // Картинка продукта
// 			productHref: productData.productHref, // Ссылка на страницу этого продукта
// 			brandProduct: productData.brandProduct, // Название бренда продукта
// 			nameProduct: productData.nameProduct, // Имя этого продукта
// 			categodyProduct: productData.categoryProduct, // Категория этого продукта
// 			priceProduct: productData.priceProduct // Цена этого продукта
// 		}));
//
// 		event.preventDefault();
// 	});
//
//
// 	// Текст карточки товара
// 	var brand = document.createElement('a');
// 	var name_product = document.createElement('a');
// 	var category = document.createElement('a');
// 	var price = document.createElement('span');
// 	var h3_container = document.createElement('h3');
//
//
// 	// this.brandProduct = productData.brandProduct; // Название бренда продукта
// 	// this.nameProduct = productData.nameProduct; // Имя этого продукта
// 	// this.categodyProduct = productData.categoryProduct; // Категория этого продукта
// 	// this.priceProduct = productData.priceProduct; // Цена этого продукта
//
//
// 	brand.href = '#'; // Ссылка на бренд
// 	name_product.href = '#'; // Ссылка на продукты
// 	category.href = '#'; // Ссылка на категорию
//
// 	brand.textContent = this.brandProduct; // Название бренда
// 	name_product.textContent = this.nameProduct; // Имя продукта
// 	category.textContent = this.categodyProduct; // Категория товара
// 	price.textContent = '$'+this.priceProduct; // Цена товара
//
// 	div_wrapper_text.appendChild(h3_container);
// 	h3_container.appendChild(brand);
// 	h3_container.appendChild(name_product);
// 	h3_container.appendChild(category);
// 	div_wrapper_text.appendChild(price);
// 	////////////////////////////////////////////////
//
// document.querySelector('.items-place').appendChild(div_container);
//
// }
//
//
//
//
//
//
//
//
