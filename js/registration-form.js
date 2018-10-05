"use strict";

(function ($) {
	$(function () {

		//Клик на открытие формы
		$('.select-the-continue-button').click(function () {
			$('.formWrapperScreen, .container-form').fadeIn( "slow" );
			window.onscroll = function () { window.scrollTo(0, 0); };
		});

		//Клик на закрытие формы
		$('.formWrapperScreen, .closing-cross').click(function(event) {
      console.log(event.target);
			if (event.target.className === "formWrapperScreen" || event.target.className === "closing-cross") {
				console.log(event.target.className);
				$('.formWrapperScreen, .container-form').fadeOut( "slow" );
				window.onscroll = function () {};
			}
		});


	});
})(jQuery);


/*
1) На сайте в форме обратной связи добавьте следующие поля:
	a) поле даты рождения;
b) ошибочные поля подсветить с помощью какого-нибудь эффекта (например, Bounce).
2) Все возвращаемые ошибки выводить с помощью виджета Dialog.
3) Создать карусель популярных товаров в шапке.
4) *C помощью jQuery UI добавить возможность перемещать товар прямо в корзину мышью.*/
