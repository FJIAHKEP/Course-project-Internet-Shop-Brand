"use strict";

// Отрисовка товаров в корзине
function ProductBasket(productData) {
	// this.id = productData.id; // id продукта
	this.image = productData.image; // Картинка продукта
	this.productHref = productData.productHref; // Ссылка на страницу этого продукта
	// this.brandProduct = productData.brandProduct; // Название бренда продукта
	this.nameProduct = productData.nameProduct; // Имя этого продукта
	// this.categodyProduct = productData.categoryProduct; // Категория этого продукта
	this.priceProduct = productData.priceProduct; // Цена этого продукта

	var settings = {
		divContainerClass: 'product-in-cart', // Класс Основного контейнера карточки товара

		divPhotoText: 'photo-cart-and-text-cart', // Класс блока картинка и текст

		divCloseBoll: 'close-boll', // Класс крестика
			spanClose: 'close'
	};

	// Основной контейнер
	var divContainer = document.createElement('div');
	divContainer.classList.add(settings.divContainerClass);

	// Контейнер картинка + текст
	var divPhotoAndData = document.createElement('div');
	divPhotoAndData.classList.add(settings.divPhotoText);
	divContainer.appendChild(divPhotoAndData);

	// Обертка для картинки тэг <a>
	var wrapperImg = document.createElement('a');
	divPhotoAndData.appendChild(wrapperImg);
	wrapperImg.href = productData.productHref;

	// Картинка товара
	var img = new Image();
	wrapperImg.appendChild(img);
	img.src = productData.image;
	img.width = 72;
	img.height = 85;

	// Текст товара цена и прочие данные все тут
	var wrapperTextData = document.createElement('div');
	divPhotoAndData.appendChild(wrapperTextData);

	// h3 Заголовок для имени товара
	var wrapperProductName = document.createElement('h3');
	wrapperTextData.appendChild(wrapperProductName);

	// Имя товара ссылкой
	var wrapperNameProduct = document.createElement('a');
	wrapperProductName.appendChild(wrapperNameProduct);
	wrapperNameProduct.textContent = productData.nameProduct;
	wrapperNameProduct.href = productData.productHref;

	// Отоброжение цены и каличество товаров
	var wrapperPriceAndCount = document.createElement('div');
	wrapperTextData.appendChild(wrapperPriceAndCount);
	var priceCount = document.createElement('span');
	wrapperPriceAndCount.appendChild(priceCount);
	priceCount.textContent = "1"+" x "+"$"+productData.priceProduct;

	// Контейнер крестик
	var closeButton = document.createElement('div');
	closeButton.classList.add(settings.divCloseBoll);
	divContainer.appendChild(closeButton);

	// Отрисовка крестика
	var closeBtn = document.createElement('span');
	closeBtn.classList.add(settings.spanClose);
	closeButton.appendChild(closeBtn);

	document.querySelector('.cart-box-items').insertBefore(divContainer, document.querySelector('.total-cart-product'));

}

