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
        
        const dateItemsHtml = dates.map(d => {
            // ★★★ 추가: YYYY-MM-DD 형식의 날짜 문자열을 생성합니다. ★★★
            const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const isToday = d.toDateString() === today.toDateString();
            const day = dayNames[d.getDay()];
            const num = String(d.getDate()).padStart(2, '0');
            
            return `
                <div class="date_item${isToday ? ' active' : ''}" data-date="${fullDate}"> 
                    <span class="day">${day}</span>
                    <span class="num">${num}</span>
                </div>
            `;
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
    // 🗓 1. 이벤트 데이터 정의 (JS 코드 시작 부분)
    const eventData = {
        // 현재 날짜 11월 27일 (목)을 기준으로 예시 데이터 설정
        '2025-11-27': ['대공연장 [상주단체]군산축구영웅 채금석', '어린이공연장 [기획]레이디와 트램프2'],
        '2025-11-28': ['[C홀] 개인 약속 (18:00)', '[C홀] 리포트 검토'],
        '2025-12-03': ['[D홀] 기술 세미나 참석', '[D홀] 보고서 제출'],
        // ... 더 많은 데이터를 여기에 추가하세요.
    };

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

    // 📅 3. 달력 초기화 함수 (data-date 속성 추가 버전)
    function initializeCalendar() {
        const $list = $('.date_list'); 
        const $monthYearDisplay = $('#currentMonthYear');
        const today = new Date();
        
        const currentYear = today.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $monthYearDisplay.text(`${currentYear}.${monthNames[today.getMonth()]}`);

        const dates = [];
        for (let i = 0; i <= 17; i++) { 
            const d = new Date(today);
            d.setDate(today.getDate() + i); 
            dates.push(d);
        }
        
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        
        const dateItemsHtml = dates.map(d => {
            // ★★★ data-date 속성을 위한 키 생성 (YYYY-MM-DD) ★★★
            const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            
            const isToday = d.toDateString() === today.toDateString();
            const day = dayNames[d.getDay()];
            const num = String(d.getDate()).padStart(2, '0');
            
            return `
                <div class="date_item${isToday ? ' active' : ''}" data-date="${fullDate}"> 
                    <span class="day">${day}</span>
                    <span class="num">${num}</span>
                </div>
            `;
        }).join('');

        $list.html(dateItemsHtml);
        
        // (이전 스크롤 로직 유지)
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


    // ⭐ 4. 문서 준비 후 실행 로직 (main logic)
    // (앞으로 이 내용이 $(document).ready(function() {}); 안에 들어갑니다.)
    // ----------------------------------------------------------------------
    initializeCalendar(); // 달력 생성 및 초기 설정 실행
    
    // ★★★ 클릭 이벤트 핸들러: date_item 내부에 말풍선 삽입 ★★★
    $(document).on('click', '.date_item', function() {
        
        const $clickedItem = $(this);
        const selectedDateKey = $clickedItem.data('date'); 

        // 1. 기존 말풍선 제거 및 active 클래스 초기화
        // date_item 내부에 삽입된 모든 말풍선 제거
        $('.date_event_bubble').remove(); 
        
        // 클릭된 요소가 이미 활성화된 상태라면 (두 번 클릭) 말풍선을 닫고 종료
        if ($clickedItem.hasClass('active')) {
            $clickedItem.removeClass('active');
            return;
        }

        // 2. active 클래스 변경
        $('.date_item').removeClass('active');
        $clickedItem.addClass('active');

        // 3. 내용 HTML 생성 및 삽입
        const bubbleHtml = getEventsHtml(selectedDateKey);
        // 생성된 말풍선 HTML을 클릭된 date_item 내부에 삽입
        $clickedItem.append(bubbleHtml); 
    });
    
    // 4. 외부 클릭 시 말풍선 닫기
    $(document).on('click', function(e) {
        // 클릭된 요소가 date_item이나 그 내부가 아니면 모두 닫기
        if (!$(e.target).closest('.date_item').length) {
            $('.date_event_bubble').remove();
            $('.date_item.active').removeClass('active');
        }
    });

    // 5. 초기 로드 시 오늘 날짜 자동 클릭 (일정 바로 표시)
    const $todayItem = $('.date_item.active');
    if ($todayItem.length) {
        $todayItem.trigger('click');
    }
    
}) // 맨끝

