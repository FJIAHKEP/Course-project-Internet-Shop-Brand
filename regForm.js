// элементы логина
var login = document.getElementById('login');
var loginLabel = document.getElementById('loginLabel');
var loginPlaceholder = document.querySelector('[login-placeholder]');
loginPlaceholder.placeholder = "введите ваше имя";

var bounceThis = $('.bounce-this-label');


login.onblur = function () {
	loginLabel.innerText = "Имя ";
	if (/^[а-яА-ЯЁa-zA-Z0-9]{3,20}$/.test(login.value)) {
		console.log(login)
		console.log(login.value);
		login.style.borderColor = "green";
		bounceThis.removeClass('.bounce-this-label-true');
	} else {
		bounceThis.addClass('.bounce-this-label-true');
		login.style.borderColor = "red";
		loginLabel.innerText = "неверный ввод имени ";
	}
};

login.onfocus = function () {
	loginLabel.innerText = "Имя: от 3 до 20 знаков";
	if (login.style.borderColor = "red") {
		login.style.borderColor = "";
	}
};

// элементы почты
var email = document.getElementById('email');
var emailLabel = document.getElementById('emailLabel');
var emailPlaceholder = document.querySelector('[email-placeholder]');
emailPlaceholder.placeholder = "введите почту";

// проверка почты
email.onblur = function () {
	emailLabel.innerText = "email ";
	if (/^[a-zA-Z0-9-.]+@[a-z]+\.[a-z]{2,3}$/.test(email.value)) {
		email.style.borderColor = "green";
		bounceThis.removeClass('.bounce-this-label-true');
	} else {
		bounceThis.addClass('.bounce-this-label-true');
		email.style.borderColor = "red";
		emailLabel.innerText = "неверный ввод почты ";
	}
};

email.onfocus = function () {
	emailLabel.innerText = "Формат: e-mail12@mail.ru";
	if (email.style.borderColor === "red") {
		email.value = "";
		email.placeholder = "проверьте написание";
		email.style.borderColor = "";
	}
};
//
// элементы телефона
var phone = document.getElementById('phone');
var phoneLabel = document.getElementById('phoneLabel');
var phonePlaceholder = document.querySelector('[phone-placeholder]');
phonePlaceholder.placeholder = "Формат: +7(000)000-000";
phone.addEventListener('focus', function () {
	phone.value = "+7";
});

// проверка телефона
phone.onblur = function () {
	phoneLabel.innerText = "номер телефона ";
	if (/^\+\d{1}\(\d{3}\)\d{3}\-\d{3}$/.test(phone.value)) {
		phone.style.borderColor = "green";
		bounceThis.removeClass('.bounce-this-label-true');
	} else {
		bounceThis.addClass('.bounce-this-label-true');
		phone.style.borderColor = "red";
		phoneLabel.innerText = "неверный ввод телефона ";
	}
};

phone.onfocus = function () {
	phoneLabel.innerText = "Формат: +7(000)000-000";
	if (phone.style.borderColor === "red") {
		phone.style.borderColor = "";
	}
};

if (bounceThis.hasClass('.bounce-this-label-true')) {
	$('.bounce-this-label-true').effect( "bounce", "slow" );
}

function validate() {
	var validate = document.forms[0];
	var input = document.getElementsByClassName('input-class');
	var label = document.getElementsByClassName('lable-form-class');
	var isEmpty = false;


	for (var i = 0; i < input.length; i++) {
		if (input[i].type === "text") {
			if (input[i].value === "" || input[i].style.borderColor === "red") {
				input[i].style.borderColor = "red";
				isEmpty = true;
				label[i].innerText = "неверный ввод " + input[i].name;
			} else {
				input[i].style.borderColor = "";
			}
		}
	}

	if (isEmpty) {
	}
	else {
		validate.submit();
		alert('форма отправлена!')
	}
}

jqueryUI

$('#date').datepicker({
	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	firstDay: 1 });

//////////////////////////////////




$(function () {
	$.ajax({
		type: 'GET',
		url: 'json/cities.json',
		success: function (newOptions) {
			var $select = $('#cityList');
			if ($select.prop) {
				var options = $select.prop('options');
			} else {
				var options = $select.attr('options');
			}
			$.each(newOptions, function (key, value) {
				options[options.length] = new Option(value.cities);
			});
		},
		dataType: 'json',
		error: function (error) {
			console.log(error);
		}
	});
});
