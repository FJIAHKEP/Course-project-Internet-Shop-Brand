"use strict";

(function ($) {
	$(function () {
		$('#logout').on('click', function () {
			event.preventDefault();
			var $login = 'voin@yandex.ru';
			var id = 2;

			$.ajax({
				url: 'http://localhost:3000/authorization?email=' + $login,
				type: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				dataType: 'json',
				success: function () {
					$.ajax({
						url: 'http://localhost:3000/authorization/'+id,
						type: 'DELETE',
						success: function () {
							alert('Вы успешно вышли');
						}
					})
				}
			})

		});
	})
})(jQuery);