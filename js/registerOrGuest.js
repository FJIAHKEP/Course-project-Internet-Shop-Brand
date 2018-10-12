"use strict";

function registerOrGuest() {
	if ($("input:radio:checked").val() === "register-me") {
		console.log('true');
		buildRegForm();
		validateRegForm();
		var $name = $('#user-name');
		var $email = $('#user-email');
		var $password1 = $('#user-password');
		var $password2 = $('#user-password-return');

		$('#form').on('submit', function (event) {
			event.preventDefault();
			if ($name.attr('data-valid') === 'true' &&
				$email.attr('data-valid') === 'true' &&
				$password1.attr('data-valid') === 'true' &&
				$password2.attr('data-valid') === 'true') {
				$.ajax({
					url: 'http://localhost:3000/users',
					type: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					data: JSON.stringify({
						name: $('#user-name[name]').val(),
						sex: $('#gender>label>input[name = "sex"]:checked').val(),
						email: $('#user-email[name]').val(),
						phone: $('#user-phone[name]').val(),
						city: $('#user-city[name]').val(),
						userPassword: $('#user-password[name]').val(),
						cart: []
					}),
					success: function () {
						$('body').removeClass('stop-scrolling');
						alert("Регистрация прошла успешно!");
						$('#wrapper-form').remove();
					}
				})
			} else if ($name.attr('data-valid') === 'false' || $name.attr('data-valid') === undefined &&
				$email.attr('data-valid') === 'false' || $email.attr('data-valid') === undefined &&
				$password1.attr('data-valid') === 'false' || $password1.attr('data-valid') === undefined &&
				$password2.attr('data-valid') === 'false' || $password2.attr('data-valid') === undefined) {
				$('[data-get]').css({
					border: '2px solid red'
				});
			}
		});
	} else if ($("input:radio:checked").val() === "i-am-a-guest") {
		console.log('false');
	}
}
