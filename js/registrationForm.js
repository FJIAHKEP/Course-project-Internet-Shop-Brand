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

	// Кнопка закрытия
	var $close = $('<div />', {
		text: 'x',
		id: 'close-form-btn'
	});

	$close.css({
		position: 'absolute',
		right: '18px',
		top: '16px',
		cursor: 'pointer'
	});

	$($wrapperForm,$close).on('click', function (event) {
		if (event.target.id === 'wrapper-form' || event.target.id === 'close-form-btn'){
			$wrapperForm.remove();
		}
	});


	// Имя
	var $name = $('<div />');
	$name.append(
		$('<label />', {
			text: 'Имя',
			id: 'user-name-label',
			for: 'name'
		}),
		$('<input />', {
			'data-get': 'false',
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
			'data-get': 'false',
			type: 'email',
			name: 'email',
			id: 'user-email',
			class: 'check-valid'
		}));

	// Телефон
	var $phone = $('<div />');
	$phone.append(
		$('<label />', {
			text: 'Телефон',
			id: 'user-phone-label'
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
			text: 'Город'
		}),
		$('<select />', {
			type: 'text',
			name: 'city',
			id: 'user-city'
		}));

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/cities',
		success: function (city) {
			$.each(city, function (item) {
				$('#user-city').append($('<option />', {
					text: city[item]
				}));
			})
		}
	});


	// Пароль
	var $password = $('<div />');
	$password.append(
		$('<label />', {
			text: 'Придумайте пароль',
			id: 'user-password-label'
		}),
		$('<input />', {
			'data-get': 'false',
			id: 'user-password',
			type: 'password',
			name: 'user-password',
			class: 'check-valid'
		}),
		$('<label />', {
			text: 'Повторите пароль',
			id: 'user-password-return-label'
		}),
		$('<input />', {
			'data-get': 'false',
			id: 'user-password-return',
			type: 'password',
			name: 'user-password-return',
			class: 'check-valid'
		}));

	// Кнопка Отправить
	var $button = $('<button />', {
		id: 'send-form-btn',
		text: 'Отправить',
		type: 'submit'
	});


	// Итог render
	$wrapperForm.append($form);
	$form.append($close, $name, $gender, $email, $phone, $country, $password, $button);
	$('body').append($wrapperForm);

	$("#user-phone").inputmask("+7(999)999-99-99");
}

function validateRegForm() {

	// Имя пользователя
	var $name = $('#user-name');
	var $nameLabel = $('#user-name-label');
	$name.blur(function () {
		if ($name.val().toString() === "" || undefined || null) {
			$name.attr('data-valid', 'false');
			$nameLabel.text('Введите Имя');
			$nameLabel.addClass('required-fields');
			$name.addClass('error-form');
			$name.css({
				border: '2px solid red'
			});
		} else if (!/^[а-яА-ЯЁa-zA-Z0-9]{3,20}$/.test($name.val())) {
			$name.attr('data-valid', 'false');
			$nameLabel.text('Минимальная длина имени 3 символа');
			$nameLabel.removeClass('required-fields');
			$name.addClass('error-form');
			$name.css({
				border: '2px solid red'
			});
		} else {
			$name.removeAttr('data-valid data-get').attr('data-valid', 'true');
			$nameLabel.text('Ваше Имя');
			$name.css({
				border: '2px solid green'
			});
		}
	});

	// почта
	var $email = $('#user-email');
	var $emailLabel = $('#user-email-label');
	$email.blur(function () {
		if ($email.val().toString() === "" || undefined || null) {
			$email.attr('data-valid', 'false');
			$emailLabel.text('Введите E-mail');
			$emailLabel.addClass('required-fields');
			$email.css({
				border: '2px solid red'
			});
		} else if (!/^[a-zA-Z0-9-.]+@[a-z]+\.[a-z]{2,3}$/.test($email.val())) {
			$email.attr('data-valid', 'false');
			$emailLabel.text('Указан некорректный E-mail');
			$emailLabel.removeClass('required-fields');
			$email.css({
				border: '2px solid red'
			});
		} else {
			$email.removeAttr('data-valid data-get').attr('data-valid', 'true');
			$emailLabel.text('Ваш E-mail');
			$email.css({
				border: '2px solid green'
			});
		}
	});

	// телефон
	var $phone = $('#user-phone');
	var $phoneLabel = $('#user-phone-label');
	$phone.blur(function () {
		if (!/^\+\d{1}\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test($phone.val())) {
		} else {
			$phoneLabel.text('Ваш Телефон');
			$phone.css({
				border: '2px solid green'
			})
		}
	});

	// пароль
	var $password1 = $('#user-password');
	var $password2 = $('#user-password-return');
	var $passwordLabel1 = $('#user-password-label');
	var $passwordLabel2 = $('#user-password-return-label');

	var v_pass1 = $password1.val() ? false : true;
	var v_pass2 = $password2.val() ? false : true;

	$password1.blur(function () {
		if ($password1.val().toString() === "" || undefined || null) {
			$password1.attr('data-valid', 'false');
			$passwordLabel1.addClass('required-fields');
			$passwordLabel2.addClass('required-fields');
			$passwordLabel1.text('Придумайте пароль');
			$password1.css({
				border: '2px solid red'
			});
			$password2.css({
				border: '2px solid red'
			})
		} else if (!/^[а-яА-ЯЁa-zA-Z0-9]{6,20}$/.test($password1.val())) {
			$password1.attr('data-valid', 'false');
			$passwordLabel1.text('Минимальная длина пароля 6 символов');
			$passwordLabel1.removeClass('required-fields');
			$password1.css({
				border: '2px solid red'
			})
		} else {
			$password1.removeAttr('data-valid data-get').attr('data-valid', 'true');
			$passwordLabel1.text('Ваш пароль');
			$password1.css({
				border: '2px solid green'
			});
		}
	});

	$password2.blur(function () {
		if (!/^[а-яА-ЯЁa-zA-Z0-9]{6,20}$/.test($password2.val())) {
			$password2.attr('data-valid', 'false');
			$passwordLabel1.text('Минимальная длина пароля 6 символов');
			$passwordLabel1.removeClass('required-fields');
			$password2.css({
				border: '2px solid red'
			})
		} else if ($password1.val() !== $password2.val() || $password2.val().toString() === "") {
			$password2.attr('data-valid', 'false');
			$passwordLabel2.text('Пароли не совпадают!');
			$password1.css({border: '2px solid red'});
			$password2.css({border: '2px solid red'});
		} else {
			$password2.removeAttr('data-valid data-get').attr('data-valid', 'true');
			$passwordLabel2.text('Пароли совпадают');
			$password1.css({
				border: '2px solid green'
			});
			$password2.css({
				border: '2px solid green'
			})
		}
	});
}

(function ($) {
	$(function () {
		$('#goods').on('click', function () {
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
							userPassword: $('#user-password[name]').val()
						}),
						success: function () {
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
		});
	})
})(jQuery);