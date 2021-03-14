$(document).ready(function () {
    var timer = 0;

    // 기초 설정 : 모든 .scene을 숨기고 로딩후 #go만 보여지게 함
    $('#go').css({visibility: 'visible', opacity: 1});

    $('.wavebtn').on('click', function () {
        /* 애니메이션 무한 작동 */
        if ($(this).is('#wavebtn1')) {
            timer = animationRepeat(8, '#castle img#magic', 'svg/2castle/MagicCastle_', 145);
        } else {
            clearTimeout(timer);
        }

        /* 애니메이션 한번 작동 */
        if ($(this).is('#wavebtn1')) {
            animation(7, '#go img', 'svg/1go/door_', 130);
            // animationRepeat(8, '#castle img#magic', 'svg/2castle/MagicCastle_', 145); 라인9에서 호출하여 삭제
            $('#cosmic').addClass('on');
        } else if ($(this).is('#wavebtn2')) {
            $('#skill .other-circle').removeAttr('style');
            $('.wave2 .letter').show();
        } else if ($(this).is('#wavebtn3')) {
            $('#self .area').addClass('in');
            transitionDelay();
            open = false;  // 다시 skill 클릭할수 있도록 변수값 초기화
        } else if ($(this).is('#wavebtn4')) {
            animation(9, '#self #poster', 'svg/4self/poster_', 150);
            $('#wavebtn4').prev('#speech').fadeOut(800);
            $('#main .area').addClass('in');
            transitionDelay();
        } else if ($(this).is('#wavebtn5')) {
            animation(13, '#main #window', 'svg/5mainpage/window_', 135);
            $('#detail .area').addClass('in');
            transitionDelay();
        } else if ($(this).is('#wavebtn6')) {
            $('#product .area').addClass('in');
            transitionDelay();
        } else if ($(this).is('#wavebtn7')) {
            $('#acter7').addClass('move');
            setTimeout(function () {
                $('#event .area').addClass('in');
                transitionDelay();
            }, 1000);
        } else if ($(this).is('#wavebtn8')) {
            animation(12, '#event #pump', 'svg/8event/pumpkin_', 130);
            $('#goal .area').addClass('in');
            transitionDelay();
        } else if ($(this).is('#wavebtn9')) {
            animation(15, '#goal #acter9', 'svg/9goal/character9_', 130);
            $('#end .area').addClass('in');
            transitionDelay();
        }

        /* 다음 화면으로 넘어가기 */
        var current = $(this).closest('.scene').attr('id');  //현재 .scene의 id명
        var next = $('#' + current).next().attr('id');    //다음에 보여질 .scene의 id명
        // console.log(current, next);
        transform(current, next, 1250);
    });

    /* 애니메이션 한번 작동 */
    function animation(maxNum, tg, src, duration) {
        var current = 1; //현재 화면에 보여지는 이미지의 숫자

        var go = setInterval(function () {
            //2) 이전 사진보다 1씩 증가시키기
            current++;
            //console.log(current);

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

    // fadein effect : transition-delay각각 지정하기
    function transitionDelay() {
        $('.fade.in .effect').each(function () {
            var orderNum = $(this).data('order');
            var delay = (orderNum * 0.6) + 2.7;
            $(this).css('transitionDelay', delay + 's');
        });
    }

    /* 스킬페이지 버튼효과 */
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
            $('.one2').css({
                "opacity": 1,
                "transform": "translate(-760px,360px)",
            });
            setTimeout(function () {
                $('.two').css({
                    "opacity": 1,
                    "transform": "translate(520px,200px)",
                });
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
                $('.three2').css({
                    "opacity": 1,
                    "transform": "translate(-290px,80px)",
                });
            }, 2000);
        }

        $("#heart , #wavebtn3").css("opacity", 1);
    });

    /* 다음 화면으로 넘어가기 */
    function transform(currentScene, nextScene, duration) {
        // 현재 보여지는 .scene을 위로 올리기 (다음에 보여질 .scene 보다 위에 있도록 함)
        $('#' + currentScene).addClass('z-up').siblings('.scene').removeClass('z-up');
        // 다음에 보여질 .scene을 초기화
        $('#' + nextScene).css({visibility: 'visible', opacity : 1});
        setTimeout(function () {
            // console.log($('#' + currentScene));
            // console.log($('#' + nextScene));
            $('#' + currentScene).stop().animate({opacity: 0}, 700, function () {
                $(this).css('visibility', 'hidden').find('.fade').removeClass('in').find('.effect').removeAttr('style');
                $('body').attr('data-view', nextScene);
            });
        }, duration);
    }

    // #gnb 홈 a 클릭하는 경우만 깃발 펄럭이는 함수 호출
    $('.gnb ul li').children().on('click', function (e) {
        e.preventDefault();

        var current = $('body').attr('data-view');
        var next = $(this).attr('href');

        if (current === next) return false;
        
        // if ($(this).parent().index() === 0) timer = animationRepeat(8, '#castle img#magic', 'svg/2castle/Magic castle_', 145)
        // else clearTimeout(timer);
        
        // console.log(current, next);
        transform(current, next, 1250);

        var tgNum = $(this).parent().index();
        if (tgNum === 0) {  // home => #castle
            $('#cosmic').addClass('on');
        } else if (tgNum === 1) {  // about => #self
            $('#self .area').addClass('in');
            transitionDelay();
        } else if (tgNum === 2) { // skill => #space
            // 다시 스킬을 클릭할수 있도록 초기화
            $('#skill .other-circle').removeAttr('style');
            $('.wave2 .letter').show();
            open = false;  // 다시 skill 클릭할수 있도록 변수값 초기화
        } else if (tgNum === 3) { // portfolio => #main
            $('#main .area').addClass('in');
            transitionDelay();
        } else if (tgNum === 4) { // goal => #goal
            $('#goal .area').addClass('in');
            transitionDelay();
        }


    });

    /* 모달 */
    $('.mdopen_btn').on('click', function () {
        // 1) 변수 선언
        var _openBtn = $(this); //닫기버튼을 클릭하면 열기버튼으로 강제 포커스 이동
        var _mdCnt = $($(this).data('href')); //열려질 상세 모달
        var _closeBtn = _mdCnt.find('.mdclose_btn'); //열려진 모달의 닫기 버튼
        var _first = _mdCnt.find('.first'); //포커스 제어
        var _last = _mdCnt.find('.last'); //포커스 제어
        var timerResize = 0; //resize 이벤트가 누적되어 성능이 느려지는 것을 제어
        // console.log(_mdCnt, typeof _mdCnt); //#modal1 string, #modal2 string

        // 2) 모달 스크롤 제어
        var wrapHei = $('#wrap').height(); // 현재 문서의 높이
        var scrollY = $(window).scrollTop(); // 현재 스크롤바가 움직인 거리를 저장
        //console.log(wrapHei, scrollY);

        // html, body의 높이를 강제로 변경해서 고정 -> 스크롤을 현재 위치로 추가 제어
        $('html, body').css({
            height: wrapHei,
            overflow: 'hidden'
        });
        $(window).scrollTop(scrollY); //변수에 담긴 스크롤위치로 강제 지정

        // 3) 열려진 모달을 제외하면 스크린리더가 접근하지 못하도록 제어
        // inert 현재 지원브라우저는 제한적이다, 비활성, 불활성 상태를 의미
        _mdCnt.siblings().attr({
            'aria-hidden': true,
            inert: ''
        });

        // 4) #dim 동적 생성 : 열려진 상세모달창 바로 앞에 검정불투명마스크(dim) 생성
        _mdCnt.before('<div id="dim"></div>');
        var _dim = $('#dim');

        // 5) resize 이벤트로 모달창의 위치 제어 - 동일한 사이즈로 스타일에서 처리

        // 6) 위치 제어가 끝나면 #dim,  상세 모달을 보여지게 처리 -> .first에 포커스 강제 이동
        _dim.stop().fadeIn().next().css('visibility', 'visible');
        _first.focus();

        // 7-1) 포커스 접근성 추가 => keydown 이벤트
        // .first에서 shift+tab을 누르면 .last 되돌리기 => e.shiftKey
        _first.on('keydown', function (e) {
            console.log(e.keyCode); //9
            if (e.shiftKey && e.keyCode === 9) {
                e.preventDefault(); //다음 포커스로 이동하지 못하도록 기본기능 제한
                _last.focus();
            }
        });

        // 7-2) 포커스 접근성 추가 => keydown 이벤트
        // .last에서 shift(X)+tab을 누르면 .first 되돌리기 => !e.shiftKey
        _last.on('keydown', function (e) {
            if (!e.shiftKey && e.keyCode === 9) {
                e.preventDefault();
                _first.focus();
            }
        });

        // 모달 닫기 클릭이벤트 : #dim, esc 키보드를 누른 경우도 닫기
        _closeBtn.on('click', function () {
            // 1) 모달 스크롤 제어 삭제하기 => html, body 태그의 style 속성 제거
            $('html, body').removeAttr('style');

            // 2) #dim 숨기기(fadeOut()) -> 완료함수 제거 remove()
            _dim.stop().fadeOut(function () {
                $(this).remove();
            });

            // 3) 상세 모달을 숨기기(visibility: hidden), 열려진 모달을 제외하면(나머지 형제들은) 스크린리더가 접근할수 있도록 2가지 속성 제거(aria-hidden, inert)
            _mdCnt.css('visibility', 'hidden').siblings().removeAttr('aria-hidden inert');

            // 4) 열기버튼으로 포커스 강제 이동
            _openBtn.focus();
        });

        // #dim을 클릭하면 모달 닫기기
        _dim.on('click', function () {
            _closeBtn.click();
        });

        // esc 키보드를 누른 경우도 닫기
        $(window).on('keydown', function (e) {
            //console.log(e.keyCode); //27
            if (e.keyCode === 27) _closeBtn.click();
        });
    });
});
