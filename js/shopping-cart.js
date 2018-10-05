"use strict";

// Отрисовка товара в корзине
function buildShoppingCart() {
	$('#shopping-cart').empty();
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
				//////////////////////////////////////
				var $divContainer = $('<div />', {
					class: 'selected-products'
				});

				var $divPhotoAndData = $('<div />', {
					class: 'photo-and-description'
				});

				var $wrapperImg = $('<a />', {
					href: item.productHref
				});

				var $img = $('<img />', {
					src: item.image,
					width: 100,
					height: 115
				});

				var $wrapperTextData = $('<div />', {
					class: 'photo-and-description-color-size-together'
				});

				var $wrapperProductName = $('<h2 />');

				var $wrapperNameProduct = $('<a />', {
					text: item.nameProduct,
					href: item.productHref
				});

				var $colorSizeWrapper = $('<div />', {
					class: 'photo-and-description-color-size'
				});

				var $choiceColorWrapper = $('<div />', {
					class: 'photo-and-description-color-size-box'
				}).append($('<h2 />').text('Color:'),$('<h3 />').text('Red'));

				var $choiceSizeWrapper = $('<div />', {
					class: 'photo-and-description-color-size-box'
				}).append($('<h2 />').text('Size:'),$('<h3 />').text('XLL'));

				var $priceWrapper = $('<div />', {
					class: 'selected-products-unite-price'
				}).append($('<div />').append($('<h2 />').text('$'+item.priceProduct)));

				var $quantityWrapper = $('<div />', {
					class: 'selected-products-quantity'
				}).append($('<input />', {type:'text'}).val(item.quantity));

				var $shippingWrapper = $('<div />', {
					class: 'selected-products-shipping',
					text: 'FREE'
				});

				amount += item.quantity * item.priceProduct;
				goods += item.quantity;

				var $totalPriceWrapper = $('<div />', {
					class: 'selected-products-subtotal'
				}).append($('<div />').append($('<h2 />').text(amount.toFixed(2))));

				var $closeBtnWrapper = $('<div />', {
					class: 'selected-products-action'
				});

				var $button = $('<div />', {
					class: 'close-boll',
					'data-id': item.id,
					'data-quantity': item.quantity
				}).append($('<span />',{class: 'close'}));

				$closeBtnWrapper.append($button);


				$li.append($divContainer);
				$divContainer.append(
					$divPhotoAndData, $priceWrapper,
					$quantityWrapper, $shippingWrapper,
					$totalPriceWrapper, $closeBtnWrapper);

				$divPhotoAndData.append($wrapperImg.append($img));
				$divPhotoAndData.append($wrapperTextData);

				$wrapperTextData.append($wrapperProductName.append($wrapperNameProduct));
				$wrapperTextData.append($colorSizeWrapper);

				$colorSizeWrapper.append($choiceColorWrapper);
				$colorSizeWrapper.append($choiceSizeWrapper);

				$ul.append($li);

				$('#sub-total').empty().text('$'+amount.toFixed(2));
				$('#grand-total').empty().text('$'+amount.toFixed(2));

			});

			$('#shopping-cart').append($ul);
			$('#renderPrice').empty().append('$'+amount.toFixed(2));
			$('#sub-total').empty().append('$'+amount.toFixed(2));
			$('#grand-total').empty().append('$'+amount.toFixed(2));
			$('#ballWithACounter').empty().append(goods);

		}
	});
}

// Функция запуска
(function ($) {
	$(function () {
		buildShoppingCart();

		// Удаление товара из корзины
		$('#shopping-cart').on('click', '.close-boll', function () {
			var id = $(this).attr('data-id');
			var count = $(this).attr('data-quantity');
			var entity = $('#shopping-cart').find('[data-id="'+id+'"]');
			var quantity = $('#shopping-cart').find('[data-quantity="'+count+'"]');

			if (parseInt(count) === 1) {
				$.ajax({
					url: 'http://localhost:3000/cart/'+id,
					type: 'DELETE',
					success: function () {
						buildShoppingCart();
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
						buildShoppingCart();
						buildCart();
					}
				})
			}
		});

		// Добавление товара в корзину
		$('#goods').on('click', '.img-style-border', function () {
			var id = $(this).attr('data-id');
			var entity = $('#shopping-cart').find('[data-id="'+id+'"]');
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