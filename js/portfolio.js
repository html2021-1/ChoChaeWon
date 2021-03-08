$(document).ready(function () {
    var timer = 0;
    $('.wavebtn').on('click', function () {
        $(this).hide(0, function () {
            console.log($(this).css('display'));
        });

        if ($(this).is('#wavebtn1')) {
            /* 애니메이션 무한 작동 */
            timer = animationRepeat(8, '#castle img#magic', 'svg/2castle/Magic castle_', 145)
        } else {
            clearTimeout(timer);
        }

        /* 애니메이션 한번 작동 */
        animation(7, '#go img', 'svg/1go/door_', 130)
        animation(9, '#self #poster', 'svg/4self/poster_', 150)

        /* 다음 화면으로 넘어가기 */
        var tgId = $(this).closest('.scene').attr('id');
        transform('#'+tgId, 1500);
    });

    /* 애니메이션 무한 작동 */
    // animationRepeat(8, '#castle img#magic', 'svg/2castle/Magic castle_', 145)

    /* 애니메이션 한번 작동 */
    function animation(maxNum, tg, src, duration) {
        var current = 1; //현재 화면에 보여지는 이미지의 숫자

        var go = setInterval(function () {
            //2) 이전 사진보다 1씩 증가시키기
            current++;
            console.log(current);

            //3) 사진이 7이 되면 setInterval를 멈추기
            if (current === maxNum) clearInterval(go);

            //4) attr() 메서드로 화면에 일러스트 이미지 변경
            $(tg).attr('src', src + current + '.svg');
        }, duration);
    }

    /* 애니메이션 무한 작동 */
    function animationRepeat(maxNum, tg, src, duration) {
        var current = 1;

        setInterval(function () {
            //2) 이전 사진보다 1씩 증가시키기
            current++;
            //console.log(current);

            //3) 사진이 88이 되면 다시 처음으로 되돌리기
            if (current === maxNum) current = 1;

            //4) attr() 메서드로 회면에 배너 이미지 변경
            $(tg).attr('src', src + current + '.svg');
        }, duration);
    }

    var open = false;
    $('.wave2').click(function () {
        $(this).find('.letter').fadeOut();
        
        if (!open) {
            console.log(open);
            open = true;
            $('.one').css({
                "opacity": 1,
                "transform": "translate(750px,360px)",
            });
            open = true;
            $('.one2').css({
                "opacity": 1,
                "transform": "translate(-760px,360px)",
            });
            setTimeout(function () {
                $('.two').css({
                    "opacity": 1,
                    "transform": "translate(520px,200px)",
                });
            }, 1000);
            setTimeout(function () {
                $('.two2').css({
                    "opacity": 1,
                    "transform": "translate(-530px,200px)",
                });
            }, 1000);
            setTimeout(function () {
                $('.three').css({
                    "opacity": 1,
                    "transform": "translate(280px,80px)",
                });
            }, 2000);
            setTimeout(function () {
                $('.three2').css({
                    "opacity": 1,
                    "transform": "translate(-290px,80px)",
                });
            }, 2000);
        }

        $("#heart , #wavebtn3").css("opacity", 1);


    });

    $('#wavebtn4').click(function () {
        $(this).prev('#speech').fadeOut(800);
    });

    /* 다음 화면으로 넘어가기 */
    function transform(tg, duration) {
        setTimeout(function () {
            $(tg).stop().fadeOut(700)
        }, duration);
    }

    // #gnb 홈 a 클릭하는 경우만 깃발 펄럭이는 함수 호출
    $('#gnb ul li').children().on('click', function (e) {
        e.preventDefault();
        if ($(this).parent().index() === 0) {
            timer = animationRepeat(8, '#castle img#magic', 'svg/2castle/Magic castle_', 145)
        } else {
            clearTimeout(timer);
        }
    });
});
