$(function () {

    $('.site_link>a').click(function () {
        $('.site_link>ul').slideToggle();
    }); //end site_link>a click


    $('.gnb_mbtn').click(function () {
        $(this).toggleClass('active')
        $('#accordion_navi').toggleClass('show');
    }); //

    /*accordion navi*/
    $('#accordion_navi > div > ul').hide();

    $('#accordion_navi h3').click(function () {
        $(this).toggleClass('selected');

        $('+div > ul', this).css('border-bottom', '1px solid #dbdbdb');

        //닫아줌
        $('#accordion_navi > div > ul').slideUp('fast');

        //selected 적용참, 아님 거짓
        if ($(this).hasClass('selected')) {
            $('+div > ul', this).slideDown('fast');

            $('#accordion_navi > h3').removeClass('selected');
            $(this).addClass('selected');
        }
    }); //end accordion navi


    $('.search-container.mb button').click(function () {
        $('.search-container.mb input').toggleClass('ck');
    }); //end search button





    window.ga = function () {
        ga.q.push(arguments)
    };
    ga.q = [];
    ga.l = +new Date;
    ga('create', 'UA-58739927-7', 'auto');
    ga('send', 'pageview')

}); //end jquery
