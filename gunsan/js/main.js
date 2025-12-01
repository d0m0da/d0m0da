$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 3000,
            disableOnInteraction: true,
        },

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

    const quickBtn = document.querySelector('.quick_btn');
    const visualSection = document.querySelector('.visual'); // visual 구간

    function checkQuickBtn() {
        const scrollY = window.scrollY;
        const visualTop = visualSection.offsetTop;
        const visualBottom = visualTop + visualSection.offsetHeight;

        if(window.innerWidth > 768){
            // PC일 때 visual 구간 안이면 숨기고, visual 구간 안이면 보여줌
            if(scrollY >= visualTop && scrollY < visualBottom){
                quickBtn.style.display = 'flex';
            } else {
                quickBtn.style.display = 'none';
            }
        } else {
            // 모바일일 때는 항상 보여줌
            quickBtn.style.display = 'flex';
        }
    }

    // 초기 체크
    checkQuickBtn();

    // 스크롤 시 체크
    window.addEventListener('scroll', checkQuickBtn);

    // 화면 크기 변경 시 체크
    window.addEventListener('resize', checkQuickBtn);

    const concerts_swiper = new Swiper('.concerts .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* css에서 slide의 넓이ㅓ 지정 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 768px 이상일때 적용 */
                spaceBetween: 28,
            },
            1025: {    /* 768px 이상일때 적용 */
                spaceBetween: 40,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        // autoplay: {  /* 팝업 자동 실행 */
        // 	delay: 2500,
        // 	disableOnInteraction: true,
        // },
        navigation: {
            nextEl: '.concerts .btn_next',
            prevEl: '.concerts .btn_prev',
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
    // ================= Progress Bar =================
    const $progress = $('.concerts .progressbar span');
    const totalSlides = concerts_swiper.slides.length - concerts_swiper.loopedSlides * 2; // 실제 슬라이드 수

    function updateProgressBar(swiper) {
        const realIndex = swiper.realIndex;
        const progressPercent = ((realIndex + 1) / totalSlides) * 100;

        // 마지막 → 처음 jump 처리 (loop 모드)
        if (swiper.previousIndex === totalSlides - 1 && realIndex === 0) {
            $progress.css('transition', 'none');  // transition 제거
            $progress.css('width', '0%');         // 즉시 초기화

            // 다음 슬라이드부터 부드럽게 증가
            setTimeout(() => {
                $progress.css('transition', 'width 0.3s ease');
                $progress.css('width', progressPercent + '%');
            }, 20); // 작은 딜레이
        } else {
            // 일반 슬라이드 이동
            $progress.css('transition', 'width 0.3s ease');
            $progress.css('width', progressPercent + '%');
        }
    }

    // 초기 상태 업데이트
    updateProgressBar(concerts_swiper);

    // 슬라이드 변경 시 bar 업데이트
    concerts_swiper.on('slideChange', function() {
        updateProgressBar(this);
    });


    // 🗓 1. 이벤트 데이터 정의 (JS 코드 시작 부분)
    const eventData = [
        // 현재 날짜 11월 27일 (목)을 기준으로 예시 데이터 설정
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 초대작가전</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 공모전</span></div>',
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 초대작가전</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 공모전</span></div><div class="detail_item"><strong>소공연장</strong><span>[기획] 연희 줄타는 아이와 아프리카 도마뱀</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 리얼공룡쇼 &lt;포켓다이노&gt;</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 초대작가전</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 공모전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[대관] 피노키오</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 월산(고)최관수명창 12주기 추모공연</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 군산누드크로키전</span></div>',
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 초대작가전</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 공모전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 바비의 호두까기 인형</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 초대작가전</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 제35회 대한민국새만금서예문인화대전 공모전</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 대형라이브가족뮤지컬 "리틀캣"</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 제20회 자원봉사자의날</span></div>'
        ,
        '<div class="detail_item"><strong>소공연장</strong><span>[대관] 군산청년회의소 60주년 기념행사</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 바비의 호두까기 인형</span></div>'
        ,
        '<div class="detail_item"><strong>소공연장</strong><span>[대관] 이음 영재 음악콘서트</span></div><div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 고군산군도 선유도령 & 장자아씨</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 김창옥 토크콘서트 시즌5</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 2025 꿈의무용단 정기공연</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 버나드와 비앙카의 구출 대모험</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 2025년 군산지역아동센터협의회 꿈키움 성장 발표회</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 조향순 개인전시회</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 버나드와 비앙카의 구출 대모험</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 재롱잔치</span></div>'
        ,
        '<div class="detail_item"><strong>대공연장</strong><span>[기획] 홀리데이 나이트 (Holiday Night)</span></div>'
        ,
        '<div class="detail_item"><strong>소공연장</strong><span>[대관] 전통한국음악예술원 제4회 예술담꼬 발표회</span></div>'
        ,
        '<div class="detail_item"><strong>어린이공연장</strong><span>[기획] 톰과 제리의 요술반지</span></div>'
        ,
        '<div class="detail_item"><strong>대공연장</strong><span>[상주단체] 군산시립예술단합동공연 송년음악회 (교향악단주최)</span></div><div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 톰과 제리의 요술반지</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 전설의 황금똥</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 박 속에 숨은 보물</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 새로움의 본질</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>제1전시실</strong><span>[대관] 제13회 군산여류화가회 정기전 및 영·호남 교류전</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>제1전시실</strong><span>[대관] 제13회 군산여류화가회 정기전 및 영·호남 교류전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 니코 : 산타 비행단의 모험</span></div>'
        ,
        '<div class="detail_item"><strong>전시실 2,3</strong><span>[대관] 소묵회 회원전</span></div><div class="detail_item"><strong>제1전시실</strong><span>[대관] 제13회 군산여류화가회 정기전 및 영·호남 교류전</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제13회 군산여류화가회 정기전 및 영·호남 교류전</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 스노우버블쇼</span></div>'
        ,
        '<div class="detail_item"><strong>제1전시실</strong><span>[대관] 제13회 군산여류화가회 정기전 및 영·호남 교류전</span></div><div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div>'
        ,
        '<div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div><div class="detail_item"><strong>대공연장</strong><span>[대관] 사단법인 군산시민오케스트라 제10회 정기연주회</span></div>'
        ,
        '<div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] Gunsan Youth Orchestra & 10th YSM STRING CONCERT</span></div>'
        ,
        '<div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div>'
        ,
        '<div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div><div class="detail_item"><strong>어린이공연장</strong><span>[기획] 원더랜드</span></div>'
        ,
        '<div class="detail_item"><strong>제3전시실</strong><span>[대관] 잠녀로 살아</span></div><div class="detail_item"><strong>제2전시실</strong><span>[대관] 군산누드크로키전</span></div><div class="detail_item"><strong>소공연장</strong><span>[대관] 울림뮤직스튜디오 제1회 정기공연</span></div>'
        // ... 더 많은 데이터를 여기에 추가하세요.
    ];


    // calendar_bar
    initializeCalendar();

    function initializeCalendar() {
        // 언더바('_') 클래스 선택자 유지
        const $list = $('.date_list'); 
        const $monthYearDisplay = $('#currentMonthYear');
        const today = new Date();
        
        // 1. 현재 월/년도 업데이트 및 영어 약어 표시 로직 추가
        const currentYear = today.getFullYear();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        // 표시 형식: "2025.Nov"
        $monthYearDisplay.text(`${currentYear}.${monthNames[today.getMonth()]}`);
    
        // 2. 날짜 데이터 생성 (오늘(i=0)부터 시작하여 총 15일치 생성)
        const dates = [];
        // ★★★ 수정: 오늘부터 시작 (i=0) ★★★
        for (let i = 0; i <= 17; i++) { 
            const d = new Date(today);
            d.setDate(today.getDate() + i); 
            dates.push(d);
        }
        
        // 3. HTML 요소 생성 및 삽입
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let count = 0
        const dateItemsHtml = dates.map(d => {
            // ★★★ 추가: YYYY-MM-DD 형식의 날짜 문자열을 생성합니다. ★★★
            const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const isToday = d.toDateString() === today.toDateString();
            const day = dayNames[d.getDay()];
            const num = String(d.getDate()).padStart(2, '0');
            
            return `
                <div class="date_item" data-date="${fullDate}"> 
                    <span class="day">${day}</span>
                    <span class="num">${num}</span>
                    <div class="detail">
                        ${eventData[count]}
                    </div>
                </div>                
            `;
            count++
        }).join('');
    
        $list.html(dateItemsHtml);
    
        // 4. 오늘 날짜로 자동 스크롤
        // 언더바('_') 클래스 선택자 유지
        const $activeItem = $('.date_item.active');
        const $container = $('.date_scroll_container'); 
        
        if ($activeItem.length && $container.length) {
            const itemPosition = $activeItem.position().left;
            const centerOffset = $container.width() / 2;
            const itemWidth = $activeItem.outerWidth() / 2;
            
            const scrollPosition = itemPosition - centerOffset + itemWidth;
            
            $container.animate({
                scrollLeft: scrollPosition
            }, 500);
        }
    }
    

    // 💬 2. 일정 데이터를 HTML 문자열로 반환하는 함수
    function getEventsHtml(dateKey) {
        // data-date 키가 eventData에 없으면 빈 배열 또는 메시지 반환
        const events = eventData[dateKey] || ['예정된 일정이 없습니다.']; 
        // 표시할 날짜 형식
        const displayDate = new Date(dateKey).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

        let html = `
            <div class="date_event_bubble">
                <span class="bubble_title">${displayDate} 공연 일정</span>
                <ul class="bubble_list">
        `;
        
        events.forEach(event => {
            // 일정이 없을 때를 대비하여 <p> 태그를 넣어 스타일을 유지합니다.
            html += `<li><p>${event}</p></li>`; 
        });
        
        html += `
                </ul>
            </div>
        `;
        return html;
    }

    $(document).ready(function() {
        const $todayItem = $('.date_item.active'); // 오늘 날짜 아이템
        const $more = $('.calendar_bar .date_scroll_container .date_more');
    
        // 오늘 날짜만 상세 내용 표시
        if ($todayItem.length) {
            const todayContent = $todayItem.find('.detail').html();
            $more.html(todayContent).show();
        }
    
        // 모바일에서는 다른 날짜 클릭 막기
        if ($(window).width() <= 768) {
            $('.date_item:not(.active)').off('click'); // 다른 날짜 클릭 이벤트 제거
        }
    });


    // 5. 초기 로드 시 오늘 날짜 자동 클릭 (일정 바로 표시)
    const $todayItem = $('.date_item.active');
    if ($todayItem.length) {
        $todayItem.trigger('click');
    }

    // $('.calendar_bar .date_scroll_container .date_list .date_item').on('click', function(){
    //     $(this).toggleClass('show')
    // })

    // ⭐ 최종 통합 클릭 이벤트 핸들러 (위치 계산 제거)
    $(document).on('click', '.date_item', function() {
        
        const $clickedItem = $(this);
        
        // 현재 show 클래스 상태 확인
        const wasShown = $clickedItem.hasClass('show'); 

        // 1. 모든 항목 초기화: ARIA 닫기, show 클래스 제거
        $('.date_item').removeClass('show').attr('aria-expanded', 'false'); 
        $('.calendar_bar .date_scroll_container .date_more').hide()
        
        // 2. 닫혀 있던 것을 클릭했을 때만 열고 보여줍니다.
        if (!wasShown) { 
            let more_left = $(this).position().left
            let more_cont = $(this).find('.detail').html()
            
            $('.calendar_bar .date_scroll_container .date_more').html(more_cont)
            $('.calendar_bar .date_scroll_container .date_more').css('left', more_left)
            $('.calendar_bar .date_scroll_container .date_more').show()
            
            // 열기 상태 설정 (show 클래스가 CSS에 의해 중앙 말풍선을 보이게 합니다)
            $clickedItem.addClass('show').attr('aria-expanded', 'true'); 
        }
    });

    // ⭐ 외부 클릭 시 모두 닫기 핸들러 (유지)
    $(document).on('click', function(e) {
        // 클릭된 요소나 그 조상 중에 .date_item이 없으면
        if (!$(e.target).closest('.date_item').length) {
            
            // 모든 .date_item의 'show' 클래스 및 ARIA 상태 제거
            $('.date_item').attr('aria-expanded', 'false').removeClass('show');
            $('.date_more').css('display', 'none');
        }
    });


    // news
    let tab_name

    $('.news .tit .tap_list ul li').on('click', function(){
        // 클릭한 li에만 active 클래스를 부여
        $('.news .tit .tap_list ul li').removeClass('active')
        $(this).addClass('active')

        // 클릭한 li의 button에 선택됨이라고 글자쓰기
        $('.news tit .tap_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        // 클릭한 li와 관련된 tab_contents tab_item 에 active 클래스 부여
        tab_name = $(this).attr('data-tab')
        // console.log(tab_name)
        $('.news .tap_contents .tab_item').removeClass('active')
        // find로 찾을때 클래스명이면 .이 추가되어있어야함, 내가 가져온 이름에 .이 없을때
        $('.news .tap_contents').find('.' + tab_name).addClass('active')

        // 선택된 .tab_item의 title에만 '선택됨'이라고 써주기
        $('.news .tap_contents .tab_item').attr('title', '')
        $('.news .tap_contents').find('.' + tab_name).attr('title', '선택됨')
    })

    //gallery
    const gallery_swiper = new Swiper('.gallery .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
    });

    $('.gallery .tit .tap_list ul li').on('click', function(){
        // 클릭한 li에만 active 클래스를 부여
        $('.gallery .tit .tap_list ul li').removeClass('active')
        $(this).addClass('active')

        // 클릭한 li의 button에 선택됨이라고 글자쓰기
        $('.gallery tit .tap_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        // 클릭한 li와 관련된 tab_contents tab_item 에 active 클래스 부여
        tab_name = $(this).attr('data-tab')
        // console.log(tab_name)
        $('.gallery .tap_contents .tab_item').removeClass('active')
        // find로 찾을때 클래스명이면 .이 추가되어있어야함, 내가 가져온 이름에 .이 없을때
        $('.gallery .tap_contents').find('.' + tab_name).addClass('active')

        // 선택된 .tab_item의 title에만 '선택됨'이라고 써주기
        $('.gallery .tap_contents .tab_item').attr('title', '')
        $('.gallery .tap_contents').find('.' + tab_name).attr('title', '선택됨')
    })

    
}) // 맨끝

