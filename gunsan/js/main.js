$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 3000,
        //     disableOnInteraction: true,
        // },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            // type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '"></span>';
            },
        },
    });

    // const concerts_swiper = new Swiper('.concerts .swiper', {
    //     slidesPerView: 'auto',
    //     spaceBetween: 16,
    //     breakpoints: {
    //         768: {    
    //             spaceBetween: 40,
    //         },
    //     },
    //     loop: true,
    //     navigation: {
    //         nextEl: '.control .btn_next',
    //         prevEl: '.control .btn_prev',
    //     },
    //     on: {
    //         init: function () {
    //             updateProgress(this);
    //         },
    //         slideChange: function() {
    //             const activeSlide = this.slides[this.activeIndex];
    //             const activeSlideWidth = activeSlide.offsetWidth;
    
    //             const prevSlide = this.slides[this.previousIndex];
    //             const prevSlideWidth = prevSlide.offsetWidth;
    
    //             const slideWidthDifference = activeSlideWidth - prevSlideWidth;
    //             this.setTranslate(this.translate - slideWidthDifference);
    
    //             updateProgress(this);
    //         },
    //         slideChangeTransitionEnd: function() {
    //             setTimeout(() => {
    //                 this.update();
    //             }, 10);
    //         }
    //     },
    // });
    
    // function updateProgress(swiper) {
    //     const total = swiper.slides.length - (swiper.loopedSlides * 2);
    //     const current = swiper.realIndex + 1;
    //     const percent = (current / total) * 100;
    
    //     document.querySelector('.progressbar span').style.width = percent + '%';
    // }
    const concerts_swiper = new Swiper('.concerts .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            768: { spaceBetween: 40 },
        },
        loop: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: true,
        // },
        navigation: {
            nextEl: '.concerts .btn_next',
            prevEl: '.concerts .btn_prev',
        },
        on: {
            init: function() {
                updateProgress(this);
            },
            slideChange: function() {
                updateProgress(this);
            },
        },
    });
    
    // progress bar 함수
    function updateProgress(swiper) {
        const totalSlides = swiper.slides.length - swiper.loopedSlides * 2; // 실제 슬라이드 개수
        const currentSlide = swiper.realIndex + 1; // realIndex는 0부터 시작
        const percent = (currentSlide / totalSlides) * 100;
        document.querySelector('.progressbar span').style.width = percent + '%';
    }
})