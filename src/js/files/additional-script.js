// Тут будут скрипты после 12.07.2023

document.addEventListener('DOMContentLoaded', function() {
	const cookieBlock = document.querySelector('.cookie');
	const hideButton = document.querySelector('.cookie__btn');

	hideButton.addEventListener('click', function() {
		cookieBlock.style.display = 'none';
	});
});