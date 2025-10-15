$(document).ready(function(){
    /*************************** visual swiper **************************/
    let visual_time = 3000
    const visual_swiper = new Swiper('.visual .swiper', { 
        autoplay: { 
            delay: visual_time,
            disableOnInteraction: true 
        },
        // effect: "fade",
        loop: true
    });
    
    $('.visual .ctrl_btn .stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .play').css('display', 'flex')
        $('.visual .ctrl_btn .paging .bar span').stop() //animate 종료
    })
    $('.visual .ctrl_btn .play').on('click', function(){
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .stop').css('display', 'flex')
        updateCurrent()
    })

    // Swiper 초기화 후에 나머지 코드 작성
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
    $('.visual .paging .total').text(totalSlides);

    function updateCurrent() {
        let realIndex = visual_swiper.realIndex + 1;
        $('.visual .paging .current').text(realIndex);
        //슬라이드가 교체되면 제일 먼저 넓이를 0으로 초기화
        $('.visual .ctrl_btn .paging .bar span').stop() //animate 종료
        $('.visual .ctrl_btn .paging .bar span').width(0)
        $('.visual .ctrl_btn .paging .bar span').animate({
            width : '100%'
        }, visual_time)
    }

    updateCurrent();

    visual_swiper.on('slideChange', function () {
        updateCurrent();
    });
    /*************************** visual swiper **************************/
});//맨끝