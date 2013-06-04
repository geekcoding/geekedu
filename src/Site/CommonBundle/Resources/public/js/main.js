var $mediaplayer = function(){$('audio,video').mediaelementplayer({
      success: function(player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
      }
    });
}
$mediaplayer.call();
$(function() {
    $('.carousel').carousel({
        interval: 4000
    });
    $(document).on({
        mouseenter: function() 
        {
            $(this).find('.carousel-control').show();
        },
        mouseleave: function()
        {
            $(this).find('.carousel-control').hide();
        }
    },'.carousel');
    $('.carousel-control').hide();
    $('.newvideo').fancybox({
        padding: 10,
        scrolling: false,
        closeBtn: true,
        type: 'ajax',
        keys: {
            close: []
        },
        ajax: {
            dataType: 'html',
            headers: {'X-fancyBox': true}
        },
        helpers: {
            overlay: {
                closeClick: false,
            }
        }
    });
    $(document).on('click',".security",function(evt){
        evt.preventDefault();
        $(this).gkSlide({
            env: 'click',
            container:$(this).closest('.container'),
            slide:$(this).closest('.span8').find('.pushslide'),
            init:function(){$mediaplayer.call();},
            loader: {
                icon: '/bundles/sitecommon/img/ajaxloader2.gif'
            }
        });
    });
    $(document).on('click','.menupush',function(evt){
        evt.preventDefault();
        $(this).gkSlide({
            env: 'click',
            container:$("#main"),
            slide:$("#main > .container"),
            move:'down',
            init:function(){$mediaplayer.call();},
            loader: {
                icon: '/bundles/sitecommon/img/ajaxloader2.gif'
            }
        });
    });
});