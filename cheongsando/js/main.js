
$(document).ready(function(){
     // console.log('연결')
     /*
          .tour .list ul li에
          마우스를 올리면 마우스를 올린 li에만
          on클래스를 추가
          -> 마우스를 오버하면 모든 li에 있는 on 클래스를 지움
          (없는애는 가만히 있고 있는애만 지움)
          누가 on클래스를 가지고 있는지 모르기 때문
     */
     $('.tour .list ul li').on('mouseenter', function(){
          // console.log('오버함')
          $('.tour .list ul li').removeClass('on')
          $(this).addClass('on')
     })

     $('footer .right_area .family_site button.open').on('click', function(){
          // console.log('여는버튼클릭')
          $('footer .right_area .family_site').addClass('open')
     })
     $('footer .right_area .family_site button.close').on('click', function(){
          // console.log('닫는버튼클릭')
          $('footer .right_area .family_site').removeClass('open')
     })

     /*   
          footer .right_area .top를 클릭하면
          브라우저가 상단으로 스크롤이 됨
     */
     $('footer .right_area .top').on('click', function(){
          // console.log('top버튼클릭')
          let scrolling = $(window).scrollTop()
          console.log(scrolling)
          // $(window).scrollTop(0)
          $('html, body').animate({
               scrollTop : 0
          }, 500)
     })
    

})//$(document).ready 무조건 맨 아래
