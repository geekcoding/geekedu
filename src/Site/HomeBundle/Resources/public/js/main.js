var $mediaplayer = function(){$('audio,video').mediaelementplayer({
      success: function(player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
      }
    });
}
$mediaplayer.call();
$(function() {
    $('.carousel').carousel({
        interval: 5000
    });
    $('.play-btn').fancymodal({
        padding: 10
    });
    $(document).on('click','.no-link',function(evt){
        evt.preventDefault();
        return false;
    });
    $('.navbar-login').usercheckmodal();
    $('.user-login').usercheckmodal({
        logincheck:{referer:true}
    });
    $(".to_login").loginmodal();
    $(".to_registration").registermodal();
    // $.register_handle({tooltip_placement:'right'});
    $.login_handle();
});