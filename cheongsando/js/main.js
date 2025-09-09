
$(document).ready(function(){
    //console.log('연결')
    /*
        .tour .list ul li에
        마우스를 올리면 마우스를 올린 li에만
        on클래스를 추가
        -> 마우스를 오버하면 모든 li에 있는 on 클래스를 지움
          (없는애는 가만히 있고 있는애만 지움)
          누가 on클래스를 가지고 있는지 모르기 때문
    */
   $('.tour .list ul li').on('mouseenter', function(){
        //console.log('오버함')
        $('.tour .list ul li').removeClass('on')
        $(this).addClass('on')
   })

   $('footer .right_area .family_site button.open').on('click', function(){
        console.log('클릭')
        $('footer .right_area .family_site').addClass('open')
   })
})