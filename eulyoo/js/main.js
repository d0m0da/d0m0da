
$(document).ready(function(){
    // console.log('연결')

    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 4000,
            disableOnInteraction: true,
        },

        // effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },


        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_prev',  
        },

    });

    // visual_swiper.autoplay.start();  /* 재생 기능 */
    $('.visual .ctrl_btn .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .btn_play').show()
        // console.log('정지버튼')
    })
    $('.visual .ctrl_btn .btn_play').on('click', function(){
        visual_swiper.autoplay.start();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual .ctrl_btn .btn_stop').show()
        // console.log('재생버튼')
    })

    /* 브라우저가 스크롤 되면 header에 fixed 클래스 추가
        1. 조금이라도 스크롤 되면 header fixed 클래스 추가
        2. 다시 맨위로 올라가면 header fixed 클래스 삭제
        3. 스크롤되어있을때 새로고침 시 위의 헤더가 그대로 그자리에 있어야 함
        --> 브라우저를 스크롤 할 때도 체크해야하고
           처음에 로딩했을 때도 체크해야함
        --> 동일한 체크를 두번 실행 ==> 함수로 처리 */

     let scrolling
     function scroll_chk(){ // 함수를 정의한다
        scrolling = $(window).scrollTop()
        // console.log(scrolling)
        if(scrolling > 0){
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }
     }
     // 문서가 로딩되었을 때 단 1번 함수 실행
     scroll_chk()
     // 브라우저가 스크롤 할 때마다 1번씩 함수 실행
     $(window).scroll(function(){
        scroll_chk()
     })

})// 맨끝