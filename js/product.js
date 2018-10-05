"use strict";

// Настройки
var settings = {
	// Имя класса обертки изображения
	imageWrapperClass: "image-wrapper",
	// Имя класса обертки контейнера с брендом,названием,категорией,ценой
	productInfoWrapperClass: "items-place-text-style"
};

function Goods(className, id, productBrand, productName, productCategory, priceProduct, image, productInfo) {

  // Класс для контейнера
	this.className = className;

	this.image = image;
	this.productInfo = productInfo;

	// Атрибуты для контейнера
	this.id = id;
	this.productBrand = productBrand;
	this.productName = productName;
	this.productCategory = productCategory;
	this.priceProduct = priceProduct;

}

Goods.prototype.render = function () {
	// Объявление переменных
	var container = document.createElement('div');
	var wrapperImg = document.createElement('div');
	var productInfoWrapper = document.createElement('div');

	container.className = this.className;
	wrapperImg.className = settings.imageWrapperClass;
	productInfoWrapper.className = settings.productInfoWrapperClass;

	// Добавление data атрибутов
	container.setAttribute("data-id", this.id);
	container.setAttribute("data-name", this.productName);
	container.setAttribute("data-category", this.productCategory);
	container.setAttribute("data-brand", this.productBrand);
	container.setAttribute("data-price", this.priceProduct);

	// Добавление внутрь основного контейнера
	container.appendChild(wrapperImg);
	container.appendChild(productInfoWrapper);

	// Добавление внутрь WrapperImg изображения
	wrapperImg.appendChild(this.image);
  // Добавление внутрь ProductInfoWrapper информационного поля
	productInfoWrapper.appendChild(this.productInfo);

	return container;
};

function ImageProduct(src) {
	this.src = src;
}

ImageProduct.prototype = Object.create(Goods.prototype);
ImageProduct.prototype.render = function () {
	var img = document.createElement('img');
	img.src = this.src;

	return img;
};



function ProductInfoWrapper(className, id, productBrand, productName, productCategory, priceProduct) {
	Goods.call(this, "", "", productBrand, productName, productCategory, priceProduct);

	this.className = className;
	this.id = id;
}

ProductInfoWrapper.prototype = Object.create(Goods.prototype);
ProductInfoWrapper.prototype.render = function () {

	var div = document.createElement('div');
	var divWrapper = document.createElement('div');
	var divBrand = document.createElement('div');
	var divGoodsName = document.createElement('div');
	var divCategory = document.createElement('div');
	var divPrice = document.createElement('div');
	var span = document.createElement('span');

	div.appendChild(divWrapper);
	divWrapper.appendChild(divBrand);
	divWrapper.appendChild(divGoodsName);
	divWrapper.appendChild(divCategory);
	div.appendChild(span);
	span.appendChild(divPrice);

	divBrand.textContent = this.productBrand;
	divGoodsName.textContent = this.productName;
	divCategory.textContent = this.productCategory;
	divPrice.textContent = this.priceProduct;

	return div;
};