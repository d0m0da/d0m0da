$(document).ready(function(){
    let mobile_size = 1024;
    let window_w;
    let device_status;

    function device_chk(){
        window_w = $(window).outerWidth();
        if(window_w > mobile_size){
            device_status = 'pc';
        }else{
            device_status = 'mobile';
            $('header').removeClass('menu_pc'); 
        }
    }
    
    device_chk();
    $(window).resize(function(){
        device_chk();
    });

    /* --- [PC 메뉴 동작] --- */

    // 1. 메뉴 열기 (마우스 진입 또는 키보드 탭 진입)
    $('.gnb .depth1 > li').on('mouseenter focusin', function(){
        if(device_status == 'pc'){
            $('header').addClass('menu_pc');
        }
    });

    // 2. 메뉴 닫기 (마우스가 헤더 밖으로 나감)
    $('header').on('mouseleave', function(){
        if(device_status == 'pc'){
            $('header').removeClass('menu_pc');
        }
    });

    // 3. 메뉴 닫기 (키보드: GNB를 완전히 벗어나 검색 버튼으로 이동했을 때)
    // -> 이 부분이 요청하신 내용입니다.
    $('.sch_open').on('focusin', function(){
        if(device_status == 'pc'){
            $('header').removeClass('menu_pc');
        }
    });
    
    // 4. (보완) 혹시 Shift+Tab으로 뒤로가서 헤더 로고 이전을 벗어날 경우 대비
    $('h1.logo a').on('focusout', function(e){
        // 로고에서 Shift+Tab을 눌러서 헤더 밖(이전 요소)으로 나가는 경우인지 체크
        // activeElement가 헤더 안에 없다면 닫기
        if(device_status == 'pc'){
             setTimeout(function(){
                if($(document.activeElement).closest('header').length === 0){
                    $('header').removeClass('menu_pc');
                }
            }, 0);
        }
    });

    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('header').removeClass('menu_mo')
    })

});