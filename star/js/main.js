$(document).ready(function () {

    // ① visual_swiper 기본 설정
    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true,
        effect: "fade",
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // ② 진행바 관련 변수
    let visual_delay = 4000; // 한 슬라이드당 시간 (ms)
    let progress_time = visual_delay - 100; // 진행바 애니메이션 시간
    let progress = $(".visual .ctrl_btn .bar span");

    // ③ 진행바 애니메이션 함수
    function resetProgress() {
        progress.stop(true, true).css({ width: 0 });
        progress.animate({ width: "100%" }, progress_time, "linear");
    }

    // ④ 슬라이드 바뀔 때 진행바 리셋
    visual_swiper.on("slideChangeTransitionStart", resetProgress);

    // ⑤ 첫 실행 시 진행바 시작
    resetProgress();

    // ⑥ stop 버튼
    $(".visual .ctrl_btn .stop").on("click", function () {
        visual_swiper.autoplay.stop();
        $(this).hide();
        $(".visual .ctrl_btn .play").css("display", "flex");
        progress.stop(); // animate 종료
    });

    // ⑦ play 버튼
    $(".visual .ctrl_btn .play").on("click", function () {
        visual_swiper.autoplay.start();
        $(this).hide();
        $(".visual .ctrl_btn .stop").css("display", "flex");
        resetProgress();
    });


    // program swiper
    const program_swiper = new Swiper('.program .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 34,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 53,
            },
        },
        centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        speed: 2000,
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2000,
            disableOnInteraction: false,
        },
    });

    // 마우스를 올리면 정지
    $('.program .swiper-slide').on('mouseenter', function () {
        program_swiper.autoplay.stop();
    });

    // 마우스를 떼면 다시 재생
    $('.program .swiper-slide').on('mouseleave', function () {
        program_swiper.autoplay.start();
    });

});