"use strict";

function buildRegForm() {

	// Обертка
	var $wrapperForm = $('<div />', {
		id: 'wrapper-form'
	});

	// Форма
	var $form = $('<form />', {
		id: 'form'
	});

	$form.empty();

	// Имя
	var $name = $('<div />');
	$name.append(
		$('<label />', {
			text: 'Имя',
			id: 'user-name-label',
			for: 'name'
		}),
		$('<input />', {
			type: 'text',
			name: 'name',
			id: 'user-name'
		}));

	// Пол
	var $gender = $('<div />', {
		id: 'gender'
	});
	$gender.append(
		$('<span />', {
			text: 'Пол'
		}),
		$('<label />').append(
			$('<span>мужской</span>'),
			$('<input />', {
				type: 'radio',
				name: 'sex',
				value: 'мужской'
			}),
			$('<div />', {
				class: 'radio-control male'
			})),

		$('<label />').append(
			$('<span>женский</span>'),
			$('<input />', {
				type: 'radio',
				name: 'sex',
				value: 'женский',
			}),
			$('<div />', {
				class: 'radio-control female'
			})
		));

	// Почта
	var $email = $('<div />');
	$email.append(
		$('<label />', {
			text: 'E-mail',
			id: 'user-email-label'
		}),
		$('<input />', {
			type: 'email',
			name: 'email',
			id: 'user-email',
		}));

	// Телефон
	var $phone = $('<div />');
	$phone.append(
		$('<label />', {
			text: 'Телефон'
		}),
		$('<input />', {
			type: 'text',
			name: 'phone',
			id: 'user-phone'
		}));

	// Страна
	var $country = $('<div />');
	$country.append(
		$('<label />', {
			text: 'Страна'
		}),
		$('<input />', {
			type: 'text',
			name: 'country',
			id: 'user-country'
		}));

	// Пароль
	var $password = $('<div />');
	$password.append(
		$('<label />', {
			text: 'Придумайте пароль'
		}),
		$('<input />', {
			id: 'user-password',
			type: 'password',
			name: 'user-password',
		}),
		$('<label />', {
			text: 'Подтвердитe пароль'
		}),
		$('<input />', {
			id: 'user-password-return',
			type: 'password',
			name: 'return-user-password'
		}));

	// Кнопка Отправить
	var $button = $('<button />', {
		id: 'send-form-btn',
		text: 'Отправить',
		type: 'submit'
	});


	// Итог render
	$wrapperForm.append($form);
	$form.append($name, $gender, $email, $phone, $country, $password, $button);
	$('body').append($wrapperForm);
}

function validateRegForm() {

	// Имя пользователя
	var $name = $('#user-name');
	var $nameLabel = $('#user-name-label');
	$name.blur(function () {
		if (/^[а-яА-ЯЁa-zA-Z0-9]{3,20}$/.test($name.val())) {
			console.log('valid name');
			$name.css({
				border: '5px solid green'
			})
		} else {
			console.log('error name');
			$name.css({
				border: '5px solid red'
			})
		}
	});

	// почта
	var $email = $('#user-email');
	var $emailLabel = $('user-email-label');
	$email.blur(function () {
		if (/^[a-zA-Z0-9-.]+@[a-z]+\.[a-z]{2,3}$/.test($email.val())) {
			console.log('valid email')
		} else {
			console.log('error email')
		}
	});


	// телефон
	var $phone = $('#user-phone');
	var $phoneLabel = $('#user-phone-label');
	$phone.blur(function () {
		// if (/^\+\d{1}\(\d{3}\)\d{3}\-\d{3}$/.test($phone.val())) {
		// 	console.log('valid phone');
		// 	return true;
		// } else {
		// 	console.log('error phone');
		// 	return false;
		// }
	});

	// пароль
	var $passwordUser = $('#user-password');
	var $passwordLabel = $('#user-password-label');
	$passwordUser.blur(function () {
		if (/^[а-яА-ЯЁa-zA-Z0-9]{6,20}$/.test($passwordUser.val())) {
			console.log('valid password');
			$passwordUser.css({
				border: '5px solid green'
			})
		} else {
			console.log('error password');
			$passwordUser.css({
				border: '5px solid red'
			})
		}
	});

}

(function ($) {
	$(function () {
		buildRegForm();
		validateRegForm();

		$('#send-form-btn').on('click', function () {
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
					country: $('#user-country[name]').val(),
				}),
				success: function (data) {
					console.log(data);
				}
			})
		});
	})
})(jQuery);