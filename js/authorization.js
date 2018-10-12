"use strict";

"use strict";

(function ($) {
	$(function () {
		$('#enter-account').on('click', function () {
			event.preventDefault();
			var $login = $('#login').val();
			var $password = $('#password').val();

			$.ajax({
				url: 'http://localhost:3000/users?email=' + $login + '&userPassword=' + $password,
				type: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				dataType: 'json',
				success: function (item) {
					console.log(item);
					if (item.length === 0) {
						alert('Вы ввели неверные данные');
					} else if ($login === item[0].email && $password === item[0].userPassword) {
						console.log(item[0].email,item[0].userPassword);
						alert('Вы успешно вошли!');
						$.ajax({
							url: 'http://localhost:3000/authorization',
							type: 'POST',
							headers: {
								'content-type': 'application/json'
							},
							data: JSON.stringify({
								status: 'online',
								id: item[0].id,
								email: item[0].email
							})
						})
					}

				}
			})

		});
	})
})(jQuery);