var $win = $(window),
    $body = $('body'),
    $nav = $('.subnav'),
    navHeight = $('.navbar').first().height(),
    subnavHeight = $('.subnav').first().height(),
    subnavTop = $('.subnav').length && $('.subnav').offset().top - navHeight,
    marginTop = parseInt($body.css('margin-top'), 10);
    isFixed = 0;
function processScroll() {
    var i, scrollTop = $win.scrollTop();

    if (scrollTop >= subnavTop && !isFixed) {
        isFixed = 1;
        $nav.addClass('subnav-fixed');
        $body.css('margin-top', marginTop + subnavHeight + 'px');
    } else if (scrollTop <= subnavTop && isFixed) {
        isFixed = 0;
        $nav.removeClass('subnav-fixed');
        $body.css('margin-top', marginTop + 'px');
    }
}
$(function(){
    processScroll();
    $(document).on('scroll',$win,processScroll);
	$.gkSpeed({
        selector: '.subtype, .pagein',
        container: $("#lessonblock"),
        move: 'none',
        data: {'content':'home'},
        slide: "#lessonlist",
        callback: function(data) {
            $.ajax({
                beforeSend:function(){
                    $("#lessonpage").find('ul').html("").append("<li><a href='#'>正在计算页数</a></li>");
                },
                url:Routing.generate('site_lesson_pagination',{
                        page:data.current_page,
                        page_count:data.page_count,
                        lesson_route:data.lesson_route,
                        index:data.lesson_index
                    }),
                dataType:'html',
                success: function(data, textStatus) {
                    $("#lessonpage").html(data);
                }
            });
            $mediaplayer.call();
            processScroll();
            $(document).on('scroll',$win,processScroll);
        },
        loader: {
            icon: '/bundles/sitecommon/img/ajaxloader2.gif'
        }
    });
});