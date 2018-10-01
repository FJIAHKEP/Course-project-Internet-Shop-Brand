"use strict";

// Отрисовка товара в корзине
function buildCart() {
	$('#cart').empty();
	$.ajax({
		url: 'http://localhost:3000/cart',
		dataType: 'json',
		success: function (cart) {
			var $ul = $('<ul />');

			// Переменная для хранения стоимости товаров в корзине
			var amount = 0;
			var goods = 0;

			cart.forEach(function (item) {
				var $li = $('<li />', {
					class: 'delete-product'
				});
				var $divContainer = $('<div />', {
					class: 'product-in-cart'
				});

				var $divPhotoAndData = $('<div />', {
					class: 'photo-cart-and-text-cart'
				});

				var $wrapperImg = $('<a />', {
					href: item.productHref
				});

				var $img = $('<img />', {
					src: item.image,
					width: 72,
					height: 85
				});

				var $wrapperTextData = $('<div />');

				var $wrapperProductName = $('<h3 />');

				var $wrapperNameProduct = $('<a />', {
					text: item.nameProduct,
					href: item.productHref
				});

				var $wrapperPriceAndCount = $('<div />');

				var $priceCount = $('<span />', {
					text: item.quantity+" x "+"$"+item.priceProduct
				});

				amount += item.quantity * item.priceProduct;
				goods += item.quantity;

				var $button = $('<div />', {
					class: 'close-boll',
					'data-id': item.id,
					'data-quantity': item.quantity
				});

				var $closeBtn = $('<span />', {
					class: 'close'
				});

				$li.append($divContainer.append(
					$divPhotoAndData.append(
						$wrapperImg.append($img),
						$wrapperTextData.append(
							$wrapperProductName.append($wrapperNameProduct),
							$wrapperPriceAndCount.append($priceCount))),
					$button.append($closeBtn)));
				$ul.append($li);

			});

			$('#cart').append($ul);
			$('#renderPrice').empty().append('$'+amount.toFixed(2));
			$('#ballWithACounter').empty().append(goods);
		}
	});
}

// Отрисовка Товара на странице
function buildGoodsList() {
	$.ajax({
		url: 'http://localhost:3000/goods',
		dataType: 'json',
		success: function (cart) {
			var $containerGoods = $('<div />', {
				class: 'items-place'
			});

			cart.forEach(function (item) {
				var $divContainer = $('<div />', {
					'data-price': item.priceProduct,
					class: 'items',
				});
				var $divWrapperImg = $('<div />', {});
				var $divWrapperText = $('<div />', {
					class: 'items-place-text-style',
				});
				var $buttonWrapper = $('<a />', {
					class: 'img-style',
					href: item.productHref,
				});
				var $img = $('<img />', {
					src: item.image,
				});
				var $wrapperButtonComponents = $('<div />', {
					class: 'img-style-border',
					'data-id': item.id,
					'data-image': item.image,
					'data-href': item.productHref,
					'data-brand': item.brandProduct,
					'data-name': item.nameProduct,
					'data-category': item.categodyProduct,
					'data-price': item.priceProduct,
				});

				$($wrapperButtonComponents).on('click', function (event) {
					event.preventDefault();
				});

				var $i = $('<i />', {
					class: 'fas fa-cart-arrow-down',
				});
				var $div = $('<div />', {
					class: 'add-to-cart',
					text: 'Add to Cart',
				});
				var $brand = $('<a />', {
					href: '#',
					text: item.brandProduct,
				});
				var $nameProduct = $('<a />', {
					href: '#',
					text: item.nameProduct,
				});
				var $category = $('<a />', {
					href: '#',
					text: item.categodyProduct,
				});
				var $price = $('<span />', {
					text: '$'+item.priceProduct,
				});
				var $h3Container = $('<h3 />');

				$divContainer.append($divWrapperImg, $buttonWrapper, $divWrapperText);
				$divWrapperImg.append($img);
				$buttonWrapper.append($wrapperButtonComponents.append($i, $div));
				$divWrapperText.append($h3Container.append($brand,$nameProduct,$category),$price);
				$containerGoods.append($divContainer);
			});
			$('#goods').append($containerGoods);
		}
	});
}


(function ($) {
	$(function () {
		buildCart();
		buildGoodsList();

		// Удаление товара из корзины
		$('#cart').on('click', '.close-boll', function () {
			var id = $(this).attr('data-id');
			var count = $(this).attr('data-quantity');
			var entity = $('#cart').find('[data-id="'+id+'"]');
			var quantity = $('#cart').find('[data-quantity="'+count+'"]');

			if (parseInt(count) === 1) {
				$.ajax({
					url: 'http://localhost:3000/cart/'+id,
					type: 'DELETE',
					success: function () {
						buildCart();
					}
				})
			} else {
				$.ajax({
					url: 'http://localhost:3000/cart/'+id,
					type: 'PATCH',
					headers: {
						'content-type': 'application/json'
					},
					data: JSON.stringify({
						quantity: +$(entity).attr('data-quantity') - 1,
					}),
					success: function () {
						buildCart();
					}
				})
			}
		});

		// Добавление товара в корзину
		$('#goods').on('click', '.img-style-border', function () {
			var id = $(this).attr('data-id');
			var entity = $('#cart').find('[data-id="'+id+'"]');
			if (entity.length) {
				$.ajax({
					url: 'http://localhost:3000/cart/' + id,
					type: 'PATCH',
					headers: {
						'content-type': 'application/json',
					},
					data: JSON.stringify({
						quantity: +$(entity).attr('data-quantity') + 1,
					}),
					success: function() {
						// Перестраиваем корзину
						buildCart();
					}
				})
			} else {
				$.ajax({
					url: 'http://localhost:3000/cart',
					type: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					data: JSON.stringify({
						id: $(this).attr('data-id'),
						quantity: 1,
						image: $(this).attr('data-image'),
						productHref: $(this).attr('data-href'),
						brandProduct: $(this).attr('data-brand'),
						nameProduct: $(this).attr('data-name'),
						categodyProduct: $(this).attr('data-category'),
						priceProduct: $(this).attr('data-price')
					}),
					success: function () {
						buildCart();
					}
				})
			}
		})
	});
})(jQuery);