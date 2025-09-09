$(document).ready(function(){
    console.log('1111111')


    $('.box').on('mouseenter', function(){
        console.log('오버함')
        $('.box').addClass('on')
    })//mouseenter
    $('.box').on('mouseleave', function(){
        console.log('내려감')
        $('.box').removeClass('on')
    })

})//$(document).ready

console.log('연결되었습니다.')