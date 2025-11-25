$(document).ready(function(){
    let mobile_size = 1024;
    let device_status; // pc / mobile

    function device_chk() {
        device_status = ($(window).outerWidth() > mobile_size) ? 'pc' : 'mobile';
    }

    device_chk(); // 최초 체크
    $(window).on("resize", device_chk); // 리사이즈 시 체크

    // depth2 있는 li에 aria 속성 추가
    $('header .gnb .gnb_wrap ul.depth1 > li').has('ul.depth2')
        .children('a')
        .attr('aria-haspopup', 'true')
        .attr('aria-expanded', 'false');

    // PC 메뉴 hover/focus
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function() {
        if (device_status !== 'pc') return;
        $('header').addClass('menu_pc');
        $(this).children('a').attr('aria-expanded', 'true');
    });

    // 마우스 벗어나면 메뉴 닫기
    $('header').on('mouseleave', function() {
        if (device_status !== 'pc') return;
        $('header').removeClass('menu_pc');
        $('header .gnb .gnb_wrap ul.depth1 > li > a').attr('aria-expanded', 'false');
    });

    // 키보드 focusout → 메뉴 닫기
    $('header .gnb').on('focusout', function(e) {
        if (device_status !== 'pc') return;
        if (!$(this).has(e.relatedTarget).length) {
            $('header').removeClass('menu_pc');
            $('header .gnb .gnb_wrap ul.depth1 > li > a').attr('aria-expanded', 'false');
        }
    });

    // 언어 선택 focus → 메뉴 닫기
    $('header .util .lang').on('focusin', function() {
        $('header').removeClass('menu_pc');
        $('header .gnb .gnb_wrap ul.depth1 > li > a').attr('aria-expanded', 'false');
    });

    // ESC 키 → 메뉴 닫기
    $(document).on('keyup', function(e) {
        if (e.key === "Escape") {
            $('header').removeClass('menu_pc menu_mo');
            $('header .gnb .gnb_wrap ul.depth1 > li > a').attr('aria-expanded', 'false');
            $('header .gnb .depth1 > li > ul.depth2').slideUp();
        }
    });

    // 모바일 메뉴 열기/닫기
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo');
    });
    $('header .gnb .gnb_wrap .gnb_close, header .gnb .gnb_bg').on('click', function(){
        $('header').removeClass('menu_mo');
        $('header .gnb .depth1 > li > ul.depth2').slideUp();
        $('header .gnb .depth1 > li').removeClass('open');
        $('header .gnb .depth1 > li > a').attr('aria-expanded', 'false');
    });

    // 모바일 1차 메뉴 클릭 → 2차 메뉴 슬라이드
    $('header .gnb .depth1 > li > a').on('click', function(e){
        if(device_status !== 'mobile') return;
        e.preventDefault();

        var $parentLi = $(this).parent('li');
        var $subMenu = $parentLi.children('ul.depth2');

        // 다른 열려있는 메뉴 닫기
        $('header .gnb .depth1 > li').not($parentLi).removeClass('open').children('ul.depth2:visible').slideUp().prev('a').attr('aria-expanded','false');

        // 클릭한 메뉴 열기/닫기
        if($subMenu.is(':visible')){
            $subMenu.slideUp();
            $parentLi.removeClass('open');
            $(this).attr('aria-expanded','false');
        } else {
            $subMenu.slideDown();
            $parentLi.addClass('open');
            $(this).attr('aria-expanded','true');
        }
    });

    // 브라우저 리사이즈 → 모바일/PC 전환 시 2차 메뉴 초기화
    $(window).on('resize', function(){
        if(device_status !== 'mobile'){
            $('header .gnb .depth1 > li').removeClass('open').children('ul.depth2').removeAttr('style');
            $('header .gnb .depth1 > li > a').attr('aria-expanded','false');
        }
    });

}); // 맨끝