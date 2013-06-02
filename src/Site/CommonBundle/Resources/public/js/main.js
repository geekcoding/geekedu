var $mediaplayer = function(){$('audio,video').mediaelementplayer({
      success: function(player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
      }
    });
}
$(function() {
    $('.carousel').carousel({
        interval: 4000
    }).hover(function(){
        $(this).find('.carousel-control').show();
    },function(){
        $(this).find('.carousel-control').hide();
    });
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
    $mediaplayer.call();
    $(".pushstate").on('click',function(evt){
        evt.preventDefault();
        slidePush($(this),$(this).closest('.container'),$(this).closest('.span8').find('.pushslide'));
    });
});
function slidePush(obj, container, slide) {
    History.pushState(null, '', obj.attr('href'));
    slidePage(obj, container, slide);
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        
    });
}
function slidePage(obj, container, slide){
    var obj = obj;
    var href = obj.attr('href');
    var container = container;
    var slide = slide;
    var width = slide.css('width');
    var height = slide.css('height');
    var ajaxloader = $(".ajaxloader").clone(true).show();
    var nslide = slide.clone(true).html('').css({'height' : height}).prepend(ajaxloader).hide().insertAfter(slide);
    ajtop = (parseInt(ajaxloader.parent().css('height'))-parseInt(ajaxloader.css('height')))/2;
    ajaxloader.css('margin-top',ajtop);
    slide.parent().css({'overflow': 'hidden','position': 'relative' });
    slide.animate({
        'margin-left': '-' + width
    }, 'slow', function() {
        $.ajax({
            beforeSend: function() {
                nslide.show();
                slide.remove();
            },
            url: href,
            dataType: 'html',
            success: function(data, textStatus) {
                container.html(data);
                $(".pushstate").on('click', function(evt) {
                    evt.preventDefault();
                    slidePush($(this), $(this).closest('.container'), $(this).closest('.span8').find('.pushslide'));
                });
            }
        });
    });
}