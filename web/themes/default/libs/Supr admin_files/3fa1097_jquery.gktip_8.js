;(function($){
	$.fn.extend({
		gktip: function(){
			    this.qtip({
                content: false,
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    viewport: $(window)
                },
                style: {
                    classes: 'ui-tooltip-tipsy'
                }
            });
			return this;
		}
	});
})(jQuery);