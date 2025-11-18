$(document).ready(function () {

    // ----------------------------------------------------------------------
    // ① Visual Swiper (메인 배너) 설정 및 자동 재생 동기화
    // ----------------------------------------------------------------------

    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true, // 루프 활성화
        effect: "fade", // 페이드 효과 사용
        autoplay: {
            delay: 4000, // 슬라이드당 딜레이 (4초)
            disableOnInteraction: false, // 사용자 조작 후에도 자동 재생 유지
        },
    });

    // ② 진행바 관련 변수
    let visual_delay = 4000; // 슬라이드 시간 (ms)
    let progress_time = visual_delay; // 진행바 애니메이션 시간 (4000ms로 통일)
    let progress = $(".visual .ctrl_btn .bar span"); // 진행바 요소

    // ③ 진행바 애니메이션 함수
    function resetProgress() {
        // 기존 애니메이션을 즉시 종료하고(true, true), 너비를 0으로 초기화
        progress.stop(true, true).css({ width: 0 });
        // progress_time (4000ms) 동안 너비를 100%로 선형 애니메이션 실행
        progress.animate({ width: "100%" }, progress_time, "linear");
    }

    // ④ 슬라이드 바뀔 때 진행바 리셋
    // Swiper 전환 시작 시 진행바를 리셋하여 4초 주기를 다시 맞춤
    visual_swiper.on("slideChangeTransitionStart", resetProgress);

    // ⑤ 첫 실행 시 진행바 시작
    resetProgress();

    // ⑥ stop 버튼
    $(".visual .ctrl_btn .stop").on("click", function () {
        visual_swiper.autoplay.stop(); // Swiper 자동 재생 정지
        $(this).hide();
        $(".visual .ctrl_btn .play").css("display", "flex");
        
        // 현재 진행 중이던 애니메이션을 그 자리에서 멈춥니다 (false, false).
        progress.stop(false, false); 
    });

    // ⑦ play 버튼 (시작 속도 불일치 해결 로직)
    $(".visual .ctrl_btn .play").on("click", function () {
        // 1. Swiper Autoplay를 다시 시작합니다. (4000ms 카운트다운 재시작)
        visual_swiper.autoplay.start();
        
        // 2. 진행바를 처음부터 다시 시작하여 Swiper 타이머와 완벽하게 동기화합니다.
        // 정지 지점에서 재개하지 않고 0%에서 다시 시작하여 속도 문제를 해결합니다.
        resetProgress();
        
        // 3. 버튼 상태를 변경합니다.
        $(this).hide();
        $(".visual .ctrl_btn .stop").css("display", "flex");
    });

    // program swiper
    const program_swiper = new Swiper('.program .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            500: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,

            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 34,

            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 53,
            },
        },
        loop: true,
        centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
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