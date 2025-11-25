$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 3000,
        //     disableOnInteraction: true,
        // },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            // type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '"></span>';
            },
        },
    });

    const concerts_swiper = new Swiper('.concerts .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* css에서 slide의 넓이ㅓ 지정 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            768: {    /* 768px 이상일때 적용 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
        },
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex]
                const activeSlideWidth = activeSlide.offsetWidth
                const otherSlides = this.slides[this.previousIndex]
                const otherSlideWidth = otherSlides.offsetWidth			
                const slideWidthDifference = activeSlideWidth - otherSlideWidth;
                this.setTranslate(this.translate - slideWidthDifference);
            },
            slideChangeTransitionEnd: function() {
                // 전환이 끝나면 Swiper를 다시 업데이트
                setTimeout(() => {
                    this.update();
                }, 100);  // 잠시 딜레이를 주고 업데이트
            }
        },
    });
})