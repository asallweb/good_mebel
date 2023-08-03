import Swiper, { Navigation, EffectFade, Pagination, Lazy, Thumbs} from 'swiper';
import "../../scss/base/swiper.scss";
function initSliders() {
	if (document.querySelector('.slider-main__slider')) {
		new Swiper('.slider-main__slider', { 
			modules: [Navigation, EffectFade, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			effect: 'fade',
			autoHeight: false,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				prevEl: '.slider-main__slider .swiper-button-prev',
				nextEl: '.slider-main__slider .swiper-button-next',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.mebel-zakaz__slider')) {
		new Swiper('.mebel-zakaz__slider', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			autoHeight: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.mebel-zakaz .swiper-button-prev',
				nextEl: '.mebel-zakaz .swiper-button-next',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.products-slider__slider-1')) {
		new Swiper('.products-slider__slider-1', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.swiper-button-prev-slider-1',
				nextEl: '.swiper-button-next-slider-1',
			},
			pagination: {
				el: '.pagination-slider-1',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.products-slider__slider-2')) {
		new Swiper('.products-slider__slider-2', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.swiper-button-prev-slider-2',
				nextEl: '.swiper-button-next-slider-2',
			},
			pagination: {
				el: '.pagination-slider-2',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.products-slider__slider-3')) {
		new Swiper('.products-slider__slider-3', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.swiper-button-prev-slider-3',
				nextEl: '.swiper-button-next-slider-3',
			},
			pagination: {
				el: '.pagination-slider-3',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.products-slider__slider-7')) {
		new Swiper('.products-slider__slider-7', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.swiper-button-prev-slider-7',
				nextEl: '.swiper-button-next-slider-7',
			},
			pagination: {
				el: '.pagination-slider-7',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.categories__slider')) {
		var init = false;
		var swiper = false;
		function swiperCard() {
			if (window.innerWidth <= 1180) {
				if (!init) {
					init = true;
					swiper = new Swiper('.categories__slider', {
						modules: [Navigation, Pagination, Lazy],
						observer: true,
						observeParents: true,
						slidesPerView: 'auto',
						spaceBetween: 20,
						autoHeight: true,
						preloadImages: false,
						lazy: {
							loadPrevNext: true,
							loadPrevNextAmount: 1,
						},
					});
				}
			} else if (init) {
				swiper.destroy();
				init = false;
			}
		}
		swiperCard();
		window.addEventListener("resize", swiperCard);
	}
	if (document.querySelector('.category-list__slider')) {
		new Swiper('.category-list__slider', {
			modules: [Navigation],
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.category-list__slider-next-button',
			},
		});
	}
	if (document.querySelector('.filter-list__slider')) {
		swiper = new Swiper('.filter-list__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			centerInsufficientSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 10,
			navigation: {
				nextEl: '.filter-list__next-button',
			},
		});
	}
	if (document.querySelector('.product-swiper__slider')) {
		const productSwiper = new Swiper('.product-swiper__slider', { 
			modules: [EffectFade, Pagination, Lazy],
			effect: 'fade',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
		
		function sliderMouseSlideInit() {
			document.addEventListener("mousemove", function(e) {
				const targetElement = e.target;
				if (targetElement.closest('[data-mousemove-swipe]')) {
					const sliderElement = targetElement.closest('[data-mousemove-swipe]');
					const idAttr = sliderElement.getAttribute('data-mousemove-swipe');
					const sliderItem = productSwiper[idAttr];
	
					const parentElement = targetElement.closest('.product__image');
					const sliderLength = sliderItem ? sliderItem.slides.length : 0; // Добавлено условие проверки наличия sliderItem
					if (sliderLength > 1) {
						const sliderWidth = sliderItem.width;
						const sliderPath = Math.round(sliderWidth / sliderLength);
	
						const sliderMousePos = e.clientX - parentElement.offsetLeft;
						const sliderSlide = Math.floor(sliderMousePos / sliderPath);
	
						sliderItem.slideTo(sliderSlide);
					}
				}
			})
		}
		
		if (document.querySelector("[data-mousemove-swipe]")) {
			sliderMouseSlideInit();
		}
	}
	if (document.querySelector('.promotions__slider')) {
		new Swiper('.promotions__slider', { 
			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 10,
			pagination: {
				el: '.promotions__slider-pagination',
				clickable: true,
			},
			breakpoints: {
				0: { 
					slidesPerView: 1
				},
				400: {
					slidesPerView: 'auto'
				}
			}
		});
	}
	if (document.querySelector('.kit__slider')) {
		new Swiper('.kit__slider', { 
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			spaceBetween: 12,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.kit-button-prev',
				nextEl: '.kit-button-next',
			},
			pagination: {
				el: '.kit-pagination',
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
					spaceBetween: 1
				},
				1280: {
					slidesPerView: 3
				}
			}
		});
	}
	if (document.querySelector('.feedback-slider__slider')) {
		new Swiper('.feedback-slider__slider', { 
			modules: [Pagination, Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 12,
			autoHeight: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.feedback-slider-prev',
				nextEl: '.feedback-slider-next',
			},
			pagination: {
				el: '.feedback-slider-pagination',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.photo-slider__slider')) {
		new Swiper('.photo-slider__slider', { 
			modules: [Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 34,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.photo-slider-button-prev',
				nextEl: '.photo-slider-button-next',
			},
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				768: {
					spaceBetween: 34
				}
			}
		});
	}
	if (document.querySelector('.product-slider')) {
		const sliderThumbs = new Swiper('.product-slider__thumbs .swiper-container', {
			modules: [Navigation, Thumbs, Lazy],
			direction: 'vertical', 
			slidesPerView: 6,
			spaceBetween: 20,
			preloadImages: false,
			freeMode: true,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: { 
				nextEl: '.product-slider__next', 
				prevEl: '.product-slider__prev' 
			}
		});
		const sliderImages = new Swiper('.product-slider__images .swiper-container', {
			modules: [Navigation, Pagination, Thumbs, Lazy],
			direction: 'vertical',
			slidesPerView: 1,
			spaceBetween: 32,
			mousewheel: true,
			preloadImages: false,
			grabCursor: true,
			thumbs: {
				swiper: sliderThumbs
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: { 
				nextEl: '.product-slider__next', 
				prevEl: '.product-slider__prev' 
			},
			pagination: {
				el: '.product-slider__pagination',
				clickable: true,
			},
			breakpoints: {
				0: {
					direction: 'horizontal', 
				},
				768: {
					direction: 'vertical',
				}
			}
		});
	}
	if (document.querySelector('.zakaz-mebel__slider')) {
		let init = false;
		let swiper = false;
		function swiperCard() {
			if (window.innerWidth > 768) {
				if (!init) {
					init = true;
					swiper = new Swiper('.zakaz-mebel__slider', {
						modules: [Navigation, Pagination, Lazy],
						observer: true,
						observeParents: true,
						slidesPerView: 1,
						spaceBetween: 20,
						preloadImages: false,
						lazy: {
							loadPrevNext: true,
							loadPrevNextAmount: 1,
						},
						navigation: {
							prevEl: '.zakaz-mebel-prev',
							nextEl: '.zakaz-mebel-next',
						},
						pagination: {
							el: '.zakaz-mebel-pagination',
						}
					});
				}
			} else if (swiper) {
				swiper.destroy(true, true);
				init = false;
			}
		}
		swiperCard();
		window.addEventListener("resize", swiperCard);
	}
	if (document.querySelector('.projects__slider')) {
		new Swiper('.projects__slider', { 
			modules: [Pagination, Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.projects-prev',
				nextEl: '.projects-next',
			},
			pagination: {
				el: '.projects-pagination',
			}
		});
	}
	if (document.querySelector('.manufacturing__slider')) {
		new Swiper('.manufacturing__slider', { 
			modules: [Pagination, Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.manufacturing-prev',
				nextEl: '.manufacturing-next',
			},
			pagination: {
				el: '.manufacturing-pagination',
			}
		});
	}
	if (document.querySelector('.compare__slider')) {
		const compareThumbs = new Swiper('.compare-hf__slider', {
			modules: [Navigation, Thumbs, Lazy],
			spaceBetween: 0,
			preloadImages: false,
			freeMode: true,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: { 
				nextEl: '.compare-hf__next'
			},
			breakpoints: {
				0: { 
					slidesPerView: 1
				},
				1080: {
					slidesPerView: 2
				},
				1440: {
					slidesPerView: 3
				},
				1800: {
					slidesPerView: 4
				}
			}
		});
		const compareSlider = new Swiper('.compare__slider', { 
			modules: [Pagination, Navigation, Lazy],
			observer: true,
			observeParents: true,
			spaceBetween: 0,
			preloadImages: false,
			thumbs: {
				swiper: compareThumbs
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				nextEl: '.compare-hf__next'
			},
			pagination: {
				el: '.compare__slider-pagination',
			},
			breakpoints: {
				0: { 
					slidesPerView: 1
				},
				1080: {
					slidesPerView: 2
				},
				1440: {
					slidesPerView: 3
				},
				1800: {
					slidesPerView: 4
				}
			}
		});
		compareThumbs.on('slideChange', function () {
			compareSlider.slideTo(compareThumbs.activeIndex);
		});
		compareSlider.on('slideChange', function () {
			compareThumbs.slideTo(compareSlider.activeIndex);
		});
		window.addEventListener('scroll', function() {
			var scrollPosition = window.scrollY;
			var compareHfElement = document.querySelector('.compare-hf');
	
			if (scrollPosition >= 400) {
					compareHfElement.classList.add('_show');
			} else {
					compareHfElement.classList.remove('_show');
			}
		});
	}
	if (document.querySelector('.compare-mobile-hf')) {
		if (document.querySelector('._compare-mobile-1')) {
			const compareThumbs = new Swiper('.compare-mobile-hf-1', {
				modules: [Pagination, Thumbs, Lazy],
				spaceBetween: 0,
				preloadImages: false,
				freeMode: true,
				slidesPerView: 1,
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 1,
				},
				pagination: {
					el: '._compare-mobile-hf-1-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + ' из ' + this.slides.length + '</span>'; 
					}
				},
			});
			const compareSlider = new Swiper('._compare-mobile-1', { 
				modules: [Pagination, Lazy],
				observer: true,
				observeParents: true,
				spaceBetween: 0,
				preloadImages: false,
				slidesPerView: 1,
				thumbs: {
					swiper: compareThumbs
				},
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 1,
				},
				pagination: {
					el: '._compare-mobile-1-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + ' из ' + this.slides.length + '</span>'; 
					}
				},
			});
			compareThumbs.on('slideChange', function () {
				compareSlider.slideTo(compareThumbs.activeIndex);
			});
			compareSlider.on('slideChange', function () {
				compareThumbs.slideTo(compareSlider.activeIndex);
			});
		}
		if (document.querySelector('._compare-mobile-2')) {
			const compareThumbs = new Swiper('.compare-mobile-hf-2', {
				modules: [Pagination, Thumbs, Lazy],
				spaceBetween: 0,
				preloadImages: false,
				freeMode: true,
				slidesPerView: 1,
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 1,
				},
				pagination: {
					el: '._compare-mobile-hf-2-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + ' из ' + this.slides.length + '</span>'; 
					}
				},
			});
			const compareSlider = new Swiper('._compare-mobile-2', { 
				modules: [Pagination, Lazy],
				observer: true,
				observeParents: true,
				spaceBetween: 0,
				preloadImages: false,
				slidesPerView: 1,
				thumbs: {
					swiper: compareThumbs
				},
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 1,
				},
				pagination: {
					el: '._compare-mobile-2-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + ' из ' + this.slides.length + '</span>'; 
					}
				},
			});
			compareThumbs.on('slideChange', function () {
				compareSlider.slideTo(compareThumbs.activeIndex);
			});
			compareSlider.on('slideChange', function () {
				compareThumbs.slideTo(compareSlider.activeIndex);
			});
		}
		window.addEventListener('scroll', function() {
			var scrollPosition = window.scrollY;
			var compareHfElement = document.querySelector('.compare-mobile-hf');
	
			if (scrollPosition >= 270) {
					compareHfElement.classList.add('_show');
			} else {
					compareHfElement.classList.remove('_show');
			}
		});
	}
	if (document.querySelector('.collection-gallery__slider')) {
		let init = false;
		let swiper = false;
		function swiperCard() {
			if (window.innerWidth >= 1080) {
				if (!init) {
					init = true;
					swiper = new Swiper('.collection-gallery__slider', {
						modules: [Navigation, Pagination, Lazy],
						observer: true,
						observeParents: true,
						slidesPerView: 'auto',
						spaceBetween: 15,
						preloadImages: false,
						lazy: {
							loadPrevNext: true,
							loadPrevNextAmount: 1,
						},
						navigation: {
							prevEl: '.collection-gallery-prev',
							nextEl: '.collection-gallery-next',
						},
						pagination: {
							el: '.collection-gallery__slider-pagination',
							clickable: true,
						}
					});
				}
			} else if (swiper) {
				swiper.destroy(true, true);
				init = false;
			}
		}
		swiperCard();
		window.addEventListener("resize", swiperCard);
	}
	if (document.querySelector('.similar-posts__slider')) {
		new Swiper('.similar-posts__slider', { 
			modules: [Pagination, Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				prevEl: '.similar-posts-prev',
				nextEl: '.similar-posts-next',
			},
			pagination: {
				el: '.similar-posts-pagination',
			}
		});
	}
}
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	initSliders();
});