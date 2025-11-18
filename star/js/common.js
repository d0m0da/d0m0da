$(document).ready(function(){
    let mobile_size = 1024 // 모바일 메뉴 시작 사이즈
    let window_w // 브라우저 넓이
    let device_status // 현재 pc인지 mobile인지 구분하는 값
    const topBtn = document.getElementById("top");

    function device_chk(){
        window_w = $(window).outerWidth()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        // console.log(device_status)
    }

    device_chk() // 문서가 로딩되었을때 1번 실행
    $(window).resize(function(){
        device_chk() // 브라우저가 리사이즈 할때마다 1번씩 실행
    })

    /* pc 버전 메뉴 오버 */
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        if(device_status == 'pc'){ // pc일때만 동작
            // console.log('오버함')
            $('header').addClass('menu_pc')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').hide()
            $(this).addClass('over')
            $(this).find('.depth2').slideDown()
        }   
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('focusin', function(){
        if(device_status == 'pc'){ // pc일때만 동작
            // console.log('오버함')
            $('header').addClass('menu_pc')
            $(this).addClass('over')
            $(this).find('.depth2').slideDown()
        }   
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        if(device_status == 'pc'){ // pc일때만 동작
            $(this).removeClass('over')
            $(this).find('.depth2').hide()
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2 > li:last-child').on('focusout', function(){
        if(device_status == 'pc'){ // pc일때만 동작
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').hide()
        }
    })
    $('header').on('mouseleave', function(){
        $(this).removeClass('menu_pc')
    })

    $('header .util .search .sh_open').on('focusin', function(){
        $('header').removeClass('menu_pc')
    })


    let gnb_open
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		if(device_status == 'mobile'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            gnb_open = $(this).parent().hasClass('open')
            // console.log(gnb_open)
            if(gnb_open == true){ // 열려있다면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
        }
	});


    
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close, header .gnb .gnb_bg').on('click', function(){
        $('header').removeClass('menu_mo')
    })

   

    // 스크롤을 내리면 header에 fixed 클래스 추가
    let scrolling = $(window).scrollTop() // 현재 스크롤 된 값
    let prev_scroll // 이전에 스크롤 된 값
    let diff_scroll // 차이값
    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if(diff_scroll < 0){ // 아래로 스크롤
            $('header').addClass('up')
            // console.log('if?')
        }else{ // 위로 스크롤
            $('header').removeClass('up')
            // console.log('eles?')
        }
        if(scrolling > 0){ // 스크롤 내림
            $('header').addClass('fixed')
        }else{ // 0이거나 0보다 작은경우
            $('header').removeClass('fixed')
        }
    }
    scroll_chk() // 문서가 로딩되었을때 1번 실행
    $(window).scroll(function(){
        scroll_chk() // 스크롤 할 때마다 실행
    })

    /*
        footer .f_util .family_site .family_open 열기 클릭하면
        footer .f_util .family_site 에 open 클래스 추가
        footer .f_util .family_site .family_close 닫기 클릭하면 삭제
    */
    $('footer .f_util .family_site .family_open').on('click', function(){
        $('footer .f_util .family_site').addClass('open')
        $('footer .f_util .family_site.open .family_wrap').slideDown()
    })
    $('footer .f_util .family_site .family_close').on('click', function(){
        $('footer .f_util .family_site').removeClass('open')
        $('footer .f_util .family_site .family_wrap').slideUp()
    })

    // family_site 연 후 영역 밖을 아무곳이나 클릭하면 닫기 - gpt
    $(document).on('click', function(e){
        const $familySite = $('footer .f_util .family_site');
        
        // family_site 영역 밖을 클릭한 경우 닫기
        if ($familySite.hasClass('open') && !$familySite.is(e.target) && $familySite.has(e.target).length === 0) {
            $familySite.removeClass('open');
            $familySite.find('.family_wrap').slideUp();
        }
    });
    $('footer .f_util .family_site .family_open').on('click', function(e){
        e.stopPropagation(); // 문서 클릭 이벤트로 전파 방지
        const $target = $('footer .f_util .family_site');
        $target.addClass('open');
        $target.find('.family_wrap').slideDown();
    });

    
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
          topBtn.classList.add("show");
        } else {
          topBtn.classList.remove("show");
        }
    });
      
    topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* top 버튼 클릭 시 상단으로 이동 */
    $('.fixed_btns .top_btn').on('click', function(){
        $('html, body').animate({
            scrollTop : 0
        }, 500)
    })

})// 맨끝