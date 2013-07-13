var $mediaplayer = function(){$('audio,video').mediaelementplayer({
      success: function(player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
      }
    });
}
$mediaplayer.call();
$(function() {
    $('.carousel').carousel({
        interval: false
    });
    $('.play-btn').fancybox({
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
    $.gkSpeed({
        selector: '.menupush',
        container: $("#main"),
        move: 'left',
        slide: "#slide",
        callback: function() {
            $mediaplayer.call();
        },
        loader: {
            icon: '/bundles/sitecommon/img/ajaxloader2.gif'
        }
    });
    $.gkSpeed({
        selector: '.security',
        container: $("#main"),
        slide: '#userslide',
        move: 'up',
        callback: function() {
            $mediaplayer.call();
        },
        loader: {
            top: 'slide',
            icon: '/bundles/sitecommon/img/ajaxloader2.gif'
        }
    });
    $.gkHistoryInit();
});