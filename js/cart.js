"use strict";

function buildCart() {
	$.ajax({
		url: 'http://localhost:3000/cart',
		dataType: 'json',
		success: function (cart) {
			var $ul = $('<ul />');

			cart.forEach(function (item) {
				var $li = $('<li />', {
					text: item.name,

				});
				var $button = $('<button />', {
					text: 'x',
					className: 'delete',
					'date-id': item.id,
					'data-quantity': item.quantity,
				});

				$li.append($button);
				$ul.append($li);
			});
			$('#cart').append($ul);
		}

	});
}
function buildGoodsList() {
	$.ajax({
		url: 'http://localhost:3000/goods',
		dataType: 'json',
		success: function (cart) {
			var $ul = $('<ul />');

			cart.forEach(function (item) {
				var $li = $('<li />', {
					text: item.name + '('+ item.price + ')',

				});
				var $button = $('<button />', {
					text: 'buy',
					className: 'buy',
					'date-id': item.id,
					'data-name': item.name,
					'data-price': item.price
				});

				$li.append($button);
				$ul.append($li);
			});
			$('#goods').append($ul);
		}

	});
}

(function ($) {
	$(function () {
		buildCart();
		buildGoodsList();

		$('goods').on('click', '.buy', function () {
			var id = $(this).attr('data-id');
			var entity = $('#cart [data-id="' + id + '"]');
			if(entity.length) {

			} else {
				$.ajax({
					url: 'http://localhost:3000/cart',
					type: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					data: JSON.stringify({
						id: id,
						quantity: 1,
						name: $(this).attr('data-id'),
						price: $(this).attr('data-price')

					})
				})
			}
		})
	});
})(jQuery);