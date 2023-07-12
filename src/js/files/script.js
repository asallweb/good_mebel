import { isMobile, bodyLockToggle, menuClose, bodyLockStatus} from "./functions.js";
// import { flsModules } from "./modules.js";
import noUiSlider from 'nouislider';

// Показ popup фильтра
const buttons = document.querySelectorAll('.filter__btn');
const popups = document.querySelectorAll('.filter__popup');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const popupId = button.dataset.popupid;
    const popupToShow = document.getElementById(popupId);

    // если блок уже открыт, то скрываем его и убираем класс активности
    if (popupToShow.style.display === 'block') {
      popupToShow.style.display = 'none';
      button.classList.remove('_active');
    } else {
      // скрываем все открытые блоки
      popups.forEach((popup) => {
        if (popup.style.display === 'block') {
          popup.style.display = 'none';
        }
      });

			//Функция определения места положения всплытия фильтра
			function filterPopupPosition() {
				if (window.innerWidth >= 768) {
					const btnRect = button.getBoundingClientRect();

					//определяю границу экрана и выставляю left что бы попап не прятался за экран
					const screenWidth = window.innerWidth;
					const blockWidth = 390;
					let left = btnRect.left;
					if (left + blockWidth > screenWidth) {
						left = screenWidth - blockWidth - 10;
					}

					popupToShow.style.top = btnRect.bottom+10 + 'px';
					popupToShow.style.left = left + 'px';
				} else{
					popupToShow.style.top = 'auto';
					popupToShow.style.left = 0;
				}
			}
			filterPopupPosition();
			window.addEventListener("resize", filterPopupPosition);
			
      // показываем блок с нужным ID
      popupToShow.style.display = 'block';

      // добавляем активный класс кнопке, по которой был клик
      buttons.forEach((b) => {
        b.classList.remove('_active');
      });
      button.classList.add('_active');


      // Добавляем обработчик клика на блок, который предотвращает удаление класса активности у кнопки
      popupToShow.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
  });
});

popups.forEach((popup) => {
  // скрываем попап при клике на крестик или за его пределами
  const closeBtn = popup.querySelector('.filter__popup-close');

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
		const activeButton = document.querySelector('.filter__btn._active');
    if (activeButton) {
      activeButton.classList.remove('_active');
    }
  });
	
	document.addEventListener('click', (e) => {
    // скрываем попап при клике за его пределами
    const clickedOnButton = Array.from(buttons).some((btn) =>
      btn.contains(e.target)
    );
    if (!popup.contains(e.target) && !clickedOnButton) {
      popup.style.display = 'none';
			const activeButton = document.querySelector('.filter__btn._active');
      if (activeButton) {
        activeButton.classList.remove('_active');
      }
    }
  });
});
// Конец скрипта popup фильтра


// Переключатель 1-2 колонок товаров на мобайл
const toggleViewProduct = function(e) {
	const attribute = this.getAttribute("data-view");
	let toggleBtn = document.querySelectorAll('[data-view]');

	for (var i = 0; i < toggleBtn.length; i++) {
		toggleBtn[i].classList.remove("_active");
	}
	this.classList.toggle("_active");

	document.documentElement.classList.remove('view-items-1', 'view-items-2');
	document.documentElement.classList.add('view-items-' + attribute);

	sessionStorage.setItem('view-items', attribute);

};

let countItems = sessionStorage.getItem('view-items');
if(countItems){
	document.documentElement.classList.add('view-items-' + countItems);
}

let toggleBtn = document.querySelectorAll('[data-view]');
for (var i = 0; i < toggleBtn.length; i++) {
	toggleBtn[i].addEventListener('click', toggleViewProduct, false);
	if(countItems){
		if(toggleBtn[i].getAttribute("data-view") == countItems){
			toggleBtn[i].classList.add("_active");
		}else{
			toggleBtn[i].classList.remove("_active");
		}
	}
}
// Конец переключатель 1-2 колонок товаров на мобайл


// Вызов попапа по клику на тэг 2 акции
const tagButtons = document.querySelectorAll('.tag-list__item._havePopup');
const tagPopups = document.querySelectorAll('.tag__popup');

tagButtons.forEach((tagButton) => {
  tagButton.addEventListener('click', () => {
    const popupId = tagButton.dataset.tagpopup;
    const popupToShow = document.getElementById(popupId);
    // если блок уже открыт, то скрываем его и убираем класс активности
    if (popupToShow.style.display === 'none') {
      popupToShow.style.display = 'block';
    }
  });
});

tagPopups.forEach((popup) => {
  // скрываем попап при клике на крестик или за его пределами
  const closeBtn = popup.querySelector('.tag__popup-close');

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
	
	document.addEventListener('click', (e) => {
    // скрываем попап при клике за его пределами
    const clickedOnButton = Array.from(tagButtons).some((btn) =>
      btn.contains(e.target)
    );
    if (!popup.contains(e.target) && !clickedOnButton) {
      popup.style.display = 'none';
			const activeButton = document.querySelector('.filter__btn._active');
      if (activeButton) {
        activeButton.classList.remove('_active');
      }
    }
  });
});
// Конец вызова попапа по клику на тэг 2 акции

// Раскрытие елементов фильтра на мобиле
	const filterItems = document.querySelectorAll('.mobile-filter__item');

	filterItems.forEach(filterItem => {
		const filterItemHead = filterItem.querySelector('.mobile-filter__item-head');
		filterItemHead.addEventListener('click', () => {
			// Добавляем класс '_active' к текущему заголовку
			filterItem.classList.toggle('_opened');
		});
	});
// Конец раскрытия елементов фильтра на мобиле


// Скрипт диапазона цен в фильтре
	// Получаем элементы input и div, к которым мы будем добавлять ползунки
	const priceFromInput = document.querySelector('.price-from');
	const priceToInput = document.querySelector('.price-to');
	const priceSliderDiv = document.querySelector('.price-slider');

	if(priceFromInput && priceToInput && priceSliderDiv){
		// Устанавливаем начальные значения для input
		priceFromInput.value = 999;
		priceToInput.value = 999999;
	
		// Инициализируем ползунки с помощью библиотеки noUiSlider
		noUiSlider.create(priceSliderDiv, {
				start: [999, 999999],
				connect: true,
				range: {
						'min': 999,
						'max': 999999
				}
		});
	
		// Обновляем значения input при изменении ползунков
		priceSliderDiv.noUiSlider.on('update', function (values, handle) {
				if (handle === 0) {
						priceFromInput.value = Math.round(values[0]);
				}
				if (handle === 1) {
						priceToInput.value = Math.round(values[1]);
				}
		});
	
		// Обновляем положение ползунков при изменении input
		priceFromInput.addEventListener('change', function () {
				priceSliderDiv.noUiSlider.set([this.value, null]);
		});
	
		priceToInput.addEventListener('change', function () {
				priceSliderDiv.noUiSlider.set([null, this.value]);
		});
	}
// Конец скрипта диапазона цен в фильтре


// Скрипт диапазона Длинны в фильтре
	// Получаем элементы input и div, к которым мы будем добавлять ползунки
	const lengthFromInput = document.querySelector('.length-from');
	const lengthToInput = document.querySelector('.length-to');
	const lengthSliderDiv = document.querySelector('.length-slider');

	if(lengthFromInput && lengthToInput && lengthSliderDiv){
		// Устанавливаем начальные значения для input
		lengthFromInput.value = 60;
		lengthToInput.value = 500;

		// Инициализируем ползунки с помощью библиотеки noUiSlider
		noUiSlider.create(lengthSliderDiv, {
				start: [60, 500],
				connect: true,
				range: {
						'min': 60,
						'max': 500
				}
		});

		// Обновляем значения input при изменении ползунков
		lengthSliderDiv.noUiSlider.on('update', function (values, handle) {
				if (handle === 0) {
						lengthFromInput.value = Math.round(values[0]);
				}
				if (handle === 1) {
						lengthToInput.value = Math.round(values[1]);
				}
		});

		// Обновляем положение ползунков при изменении input
		lengthFromInput.addEventListener('change', function () {
				lengthSliderDiv.noUiSlider.set([this.value, null]);
		});

		lengthToInput.addEventListener('change', function () {
				lengthSliderDiv.noUiSlider.set([null, this.value]);
		});
	}
// Конец скрипта диапазона Длинны в фильтре

// Скрипт диапазона Ширины в фильтре
	// Получаем элементы input и div, к которым мы будем добавлять ползунки
	const widthFromInput = document.querySelector('.width-from');
	const widthToInput = document.querySelector('.width-to');
	const widthSliderDiv = document.querySelector('.width-slider');

	if(widthFromInput && widthToInput && widthSliderDiv){
		// Устанавливаем начальные значения для input
		widthFromInput.value = 60;
		widthToInput.value = 500;
	
		// Инициализируем ползунки с помощью библиотеки noUiSlider
		noUiSlider.create(widthSliderDiv, {
				start: [60, 500],
				connect: true,
				range: {
						'min': 60,
						'max': 500
				}
		});
	
		// Обновляем значения input при изменении ползунков
		widthSliderDiv.noUiSlider.on('update', function (values, handle) {
				if (handle === 0) {
						widthFromInput.value = Math.round(values[0]);
				}
				if (handle === 1) {
						widthToInput.value = Math.round(values[1]);
				}
		});
	
		// Обновляем положение ползунков при изменении input
		widthFromInput.addEventListener('change', function () {
				widthSliderDiv.noUiSlider.set([this.value, null]);
		});
	
		widthToInput.addEventListener('change', function () {
				widthSliderDiv.noUiSlider.set([null, this.value]);
		});
	}
// Конец скрипта диапазона Ширины в фильтре


// Скрипт поиска брендов по введенным в интуп значениям 
const searchInput = document.querySelector('.mobile-filter__search-brand-input');
const brandsFilter = document.querySelector('.mobile-filter__brands-filter');
const moreBrandsBtn = document.querySelector('._more-brands');

if(searchInput && brandsFilter){
	searchInput.addEventListener('input', () => {
		const searchValue = searchInput.value.toLowerCase();
		const brandLinks = brandsFilter.querySelectorAll('a');
		const visibleBrandLinks = [];
	
		brandLinks.forEach((link) => {
			const brandName = link.textContent.toLowerCase();
			if (brandName.includes(searchValue)) {
				link.style.display = 'flex';
				visibleBrandLinks.push(link);
			} else {
				link.style.display = 'none';
			}
		});
	
		if (visibleBrandLinks.length <= 5) {
			moreBrandsBtn.style.display = 'none';
		} else {
			moreBrandsBtn.style.display = 'block';
		}
	});
}
// Конец скрипта поиска брендов по введенным в интуп значениям 


// Показ мобильного фильтра
const filterBtn = document.querySelector('.filter__main-btn');
const mobileFilter = document.querySelector('.mobile-filter');
const closeBtn = document.querySelector('.mobile-filter__close-btn');

if(filterBtn && mobileFilter && closeBtn){
	filterBtn.addEventListener('click', () => {
		mobileFilter.classList.toggle('_active'); // добавляем/удаляем класс "active" для показа/скрытия блока
		document.body.style.overflow = 'hidden';
	});
	closeBtn.addEventListener('click', () => {
		mobileFilter.classList.remove('_active'); // удаляем класс "active" для скрытия блока
		document.body.style.overflow = 'visible';
	});
	document.addEventListener('click', (event) => {
		const isClickInside = mobileFilter.contains(event.target) || filterBtn === event.target;
		if (!isClickInside) {
			mobileFilter.classList.remove('_active');
			document.body.style.overflow = 'visible';
		}
	});
}
// Конец показа мобильного фильтра


// Таймер обратного отсчета 
// выбираем все блоки с классом 'promotion-timer'
var timers = document.querySelectorAll('.promotion-timer');

if(timers){
	// проходимся циклом по каждому блоку
	timers.forEach(function(timer) {
		// получаем дату из атрибута 'data-date'
		var date = timer.dataset.date;
		// преобразуем строку в объект даты
		date = new Date(date);
		
		// получаем элементы таймера
		var days = timer.querySelector('._days');
		var hours = timer.querySelector('._hours');
		var minutes = timer.querySelector('._minutes');
		// var seconds = timer.querySelector('._seconds');
		
		// вызываем функцию обновления таймера
		updateTimer();
		
		// обновляем таймер каждую минуту
		setInterval(updateTimer, 60000); //Для секунд значение 1000
		
		// функция обновления таймера
		function updateTimer() {
			// получаем текущую дату
			var now = new Date();
			
			// вычисляем оставшееся время в миллисекундах
			var timeLeft = date - now;
			
			// вычисляем оставшиеся дни, часы и минуты
			var daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			var hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
			var minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
			// var secondsLeft = Math.floor((timeLeft / 1000) % 60);
			if(daysLeft < 10) {
				daysLeft = '0'+daysLeft;
			}
			if(hoursLeft < 10) {
				hoursLeft = '0'+hoursLeft;
			}
			if(minutesLeft < 10) {
				minutesLeft = '0'+minutesLeft;
			}
			
			// обновляем значения элементов таймера
			days.innerHTML = daysLeft;
			hours.innerHTML = hoursLeft;
			minutes.innerHTML = minutesLeft;
			// seconds.innerHTML = secondsLeft;
		}
	});
}
// КОНЕЦ таймера обратного отсчета 


// Показ хар-к комплектного товара на мобиле
const complectProducts = document.querySelectorAll('.complect-table__product');
if(complectProducts){
	complectProducts.forEach(function(complectProduct) {
		const complectProductBtn = complectProduct.querySelector('.complect-table__product-toggle');
		complectProductBtn.addEventListener('click', (event) => {
			complectProduct.classList.toggle("_opened");
		});
	})
}
// Конец показа хар-к комплектного товара на мобиле


// Переключение вида конфигуратора
const configuratorTypeSwitcher = document.querySelector('.configurator__type-switcher');
if (configuratorTypeSwitcher) {
	const configuratorTypeSwitcherButton = configuratorTypeSwitcher.querySelector('.configurator__type-button');
	configuratorTypeSwitcherButton.addEventListener('click', (event) => {
		configuratorTypeSwitcher.classList.toggle("_detail");
		configuratorTypeSwitcher.classList.toggle("_simple");
	});
}
// Конец переключение вида конфигуратора


// Всплывающее изображение материала в конфигураторе
const spareImages = document.querySelectorAll('.configurator__spare-image');
if(spareImages){
	spareImages.forEach((spareImage) => {
		spareImage.addEventListener('mouseover', () => {
			const bigImageSrc = spareImage.getAttribute('data-srcbig');
			const bigImage = document.createElement('img');
			bigImage.src = bigImageSrc;
			bigImage.classList.add('configurator__spare-image-big'); 
			const spareContainer = spareImage.parentNode;
			spareContainer.insertBefore(bigImage, spareImage.nextSibling);
			const spareImageRect = spareImage.getBoundingClientRect();
			const bigImageRect = bigImage.getBoundingClientRect();
			const spareImageRight = spareImageRect.right + 10;
			const windowWidth = window.innerWidth;
			bigImage.style.opacity = '1';
	
			if (spareImageRight + bigImageRect.width <= windowWidth) {
				bigImage.style.left = 'calc(100% + 10px)';
			} else {
				bigImage.style.left = 'auto';
				bigImage.style.right = 'calc(100% + 10px)';
			}
		});
		spareImage.addEventListener('mouseout', () => {
			const bigImage = document.querySelector('.configurator__spare-image-big');
			if (bigImage) {
				bigImage.parentNode.removeChild(bigImage);
			}
		});
	});
}
// Конец всплывающее изображение материала в конфигураторе


// Попап форма поиска городов показ крестика при введенных данных
const popupSearchInputCity = document.querySelector('.popup__search-input');
const popupSearchSubmit = document.querySelector('.popup__search-submit');
const popupSearchClear = document.querySelector('.popup__search-clear');
const popupSearchCityList = document.querySelector('.popup__city-list');
const popupSearchNoResults = document.querySelector('.popup__search-noresults');
const popupSearchExample = document.querySelector('.popup__search-example');

popupSearchClear.style.display = 'none';
popupSearchNoResults.style.display = 'none';

if(popupSearchInputCity){
	popupSearchInputCity.addEventListener('input', function() {
		const searchTerm = popupSearchInputCity.value.trim().toLowerCase();
		const cityLinks = popupSearchCityList.getElementsByTagName('a');
	
		popupSearchExample.style.display = searchTerm ? 'none' : 'block';
		popupSearchSubmit.style.display = searchTerm ? 'none' : 'block';
		popupSearchClear.style.display = searchTerm ? 'block' : 'none';
	
		let hasResults = false;
		for (let i = 0; i < cityLinks.length; i++) {
			const cityLink = cityLinks[i];
			const cityName = cityLink.innerText.toLowerCase();
	
			if (cityName.includes(searchTerm)) {
				cityLink.style.display = 'block';
				hasResults = true;
			} else {
				cityLink.style.display = 'none';
			}
		}
	
		if (hasResults) {
			popupSearchNoResults.style.display = 'none';
		} else {
			popupSearchNoResults.style.display = searchTerm ? 'block' : 'none';
		}
	});
}
if(popupSearchClear){
	popupSearchClear.addEventListener('click', function() {
		popupSearchInputCity.value = '';
		popupSearchSubmit.style.display = 'block';
		popupSearchExample.style.display = 'block';
		popupSearchClear.style.display = 'none';
	
		const cityLinks = popupSearchCityList.getElementsByTagName('a');
		for (let i = 0; i < cityLinks.length; i++) {
			cityLinks[i].style.display = 'block';
		}
		popupSearchNoResults.style.display = 'none';
	});
}
// Конец попап форма поиска городов показ крестика при введенных данных


// Валидация телефонного номера 
const phoneInputs = document.querySelectorAll('.phone-validation');
if (phoneInputs) {
	phoneInputs.forEach(input => {
		input.addEventListener('input', () => {
			let phoneNumber = input.value;
			phoneNumber = phoneNumber.replace(/\D/g, '');
			input.value = phoneNumber;
		});
	});
}
// Конец валидации телефонного номера



// По клику на header-top__city-popup-yes закрывать попап 
const headerTopCityPopup = document.querySelector('.header-top__city-popup');
if(headerTopCityPopup){
	const headerTopCityPopupYes = document.querySelector('.header-top__city-popup-yes');
	if (headerTopCityPopupYes) {
		headerTopCityPopupYes.addEventListener('click', () => {
			headerTopCityPopup.classList.toggle('_active');
		});
	}
}
// Конец по клику на header-top__city-popup-yes закрывать попап 


// Показать/скрыть выпадающий список комнат в КАТАЛОГЕ
const dropdownMenu = document.querySelector('.catalog__primary-dropdown');
const dropdownMenuBtn = document.querySelector('._toggle-dropdown');
if(dropdownMenuBtn && dropdownMenu){
	dropdownMenuBtn.addEventListener('click', function(event) {
		if (window.innerWidth > 768) {
			event.preventDefault();
			dropdownMenu.classList.toggle('_opened');
		}
	});
}
// КОНЕЦ показать/скрыть выпадающий список комнат в КАТАЛОГЕ


// Функциии работы с меню-каталогом
const menuLinks = document.querySelectorAll('[data-showMenuId]');
if(menuLinks){
	menuLinks.forEach((link) => {
		if (window.innerWidth > 768) {
			if (!link.classList.contains('_toggle-dropdown')) {
				link.addEventListener('mouseover', showMenu);
			}
		} else {
			link.addEventListener('click', showMobileMenu);
		}
	});
}

function showMenu(event) {
	menuLinks.forEach((link) => {
		link.classList.remove('_active');
	});
	event.target.classList.add('_active');
  // Получаем значение атрибута data-showMenuId для текущей ссылки
  const showMenuId = event.target.dataset.showmenuid;
  const menuBlocks = document.querySelectorAll('.catalog__secondary-inner');

  // Удаляем класс _active со всех блоков
  menuBlocks.forEach((block) => {
    block.classList.remove('_active');
  });

  // Проходимся по каждому блоку и проверяем значение атрибута data-catalogID
  menuBlocks.forEach((block) => {
    const catalogId = block.dataset.catalogid;

    if (catalogId === showMenuId) {
      // Если data-catalogID совпадает с data-showMenuId, добавляем класс _active
      block.classList.add('_active');
    }
  });
}

function showMobileMenu(event) {
	event.preventDefault();
  const showMenuId = event.target.dataset.showmenuid;
  const menu = document.querySelector('.catalog__secondary');
  const menuInner = document.querySelectorAll('.catalog__secondary-inner');
	// menu.style.display = 'block';
	menu.classList.add('_active');
  menuInner.forEach((block) => {
    block.classList.remove('_active');
		menuInner.forEach((block) => {
			const catalogId = block.dataset.catalogid;
	
			if (catalogId === showMenuId) {
				block.classList.add('_active');
			}
		});
  });
}

const backButtonList = document.querySelectorAll('.catalog__secondary-back_btn');
const menu = document.querySelector('.catalog__secondary');
if(backButtonList && menu){
	backButtonList.forEach((button) => {
		button.addEventListener('click', () => {
			const parent = button.closest('.catalog__secondary-inner');
			parent.classList.remove('_active');
			// menu.style.display = 'none';
			menu.classList.remove('_active');
		});
	});
}

document.addEventListener('DOMContentLoaded', function() {
	// Выключаем активные классы для мобилы
  if (window.innerWidth < 768) {
		const menuLinks = document.querySelectorAll('.catalog__primary-link');
		const catalogMenuInner = document.querySelectorAll('.catalog__secondary-inner');
		menuLinks.forEach((linkitem) => {
			linkitem.classList.remove('_active');
		});
		catalogMenuInner.forEach((link) => {
			link.classList.remove('_active');
		});
  }
	// Конец выключаем активные классы для мобилы

  let showBtn = document.querySelector('.show-catalog-btn');
  let closeBtn = document.querySelector('.close-catalog-btn');
	if (showBtn) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.show-catalog-btn')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
				showBtn.classList.toggle("_active");
			}
		});
	};
	if (closeBtn) {
		closeBtn.addEventListener('click', function() {
			showBtn.classList.toggle('_active');
			menuClose()
			bodyLockToggle();
		});
	}

});
// КОНЕЦ Функциии работы с меню-каталогом


// Youtube lazy load
document.addEventListener('DOMContentLoaded', function() {
	var youtubeLazyElements = document.querySelectorAll('.youtube-lazy');

	youtubeLazyElements.forEach(function(element) {
		element.addEventListener('click', function() {
			var iframeOuter = this.querySelector('.youtube-lazy-content');
			var iframe = this.querySelector('iframe');
			var preview = this.querySelector('.youtube-lazy-preview');

			// Load the iframe source only if it hasn't been loaded before
			if (iframe.getAttribute('data-src')) {
				iframe.setAttribute('src', iframe.getAttribute('data-src'));
				iframe.removeAttribute('data-src');
			}

			// Show the iframe and hide the preview image
			iframeOuter.style.display = 'block';
			iframe.style.display = 'block';
			preview.style.display = 'none';
		});
	});
});
// Конец Youtube lazy load