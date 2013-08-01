(function($) {
	$.fn.extend({
		fancymodal: function(options) {
			var _this = this;
			default_options = {
				padding: 0,
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
			};
			var options = $.extend(true,default_options, options);
			$(_this).fancybox(options);
		},
		loginmodal: function(options) {
			var _this = this;
			default_options = {};
			var options = $.extend(true,default_options, options);
			$(document).on('click',this.selector,function(evt){
				evt.preventDefault();
				$.fancybox.showLoading();
				$.fancybox.helpers.overlay.open({parent:$('body'),closeClick: false});
				$.openloginmodal();
				return false;
			});
		},
		registermodal: function(options){
			var _this = this;
			default_options = {};
			var options = $.extend(true,default_options, options);
			$(document).on('click',this.selector,function(evt){
				evt.preventDefault();
				$.fancybox.showLoading();
				$.fancybox.helpers.overlay.open({parent:$('body'),closeClick: false});
				$.openregistermodal();
				return false;
			});
		},
		usercheckmodal: function(options){
			var _this = this;
			default_options = {
				type:['logincheck'],
				func:'jump',
				logincheck: {
					location: _this.attr('href'),
				    referer: false
				}
			};
			var options = $.extend(true,default_options, options);
			$(document).on('click',this.selector,function(evt){
				evt.preventDefault();
				var checksuccess = true;
				$.fancybox.showLoading();
				$.fancybox.helpers.overlay.open({parent:$('body'),closeClick: false});
				for(var i=0;i<options.type.length;i++){
					if(options.type[i] == 'logincheck'){
						checksuccess = $.openlogincheckmodal(options.logincheck);
					}
				}
				if(options.func == 'jump' && checksuccess == true){
					window.location.href = options.localtion;
				}
				if(options.func == 'cancel' && checksuccess == true){
					$.fancybox.cancel();
					$.fancybox.hideLoading();
					$.fancybox.helpers.overlay.close();
				}
				return false;
			});
		}
	});
	$.extend({
		openfancymodal: function(options) {
			default_options = {
				padding: 0,
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
			};
			var options = $.extend(true,default_options, options);
			$.fancybox.open(options);
		},
		openregistermodal: function(options){
			default_options = {
				maxWidth: 540,
				href: Routing.generate('fos_user_registration_register'),
				form:".fos_user_registration_register",
				tooltip_placement: 'top',
				equal: 0,
				clearform:true,
				beforeShow: function(){
					$('.fancybox-wrap').addClass('modal-fancybox');
				},
				afterShow:function(){
					$.register_handle({form:options.form,clearform:options.clearform,tooltip_placement:options.tooltip_placement,equal:options.equal});
				},
				afterClose: function(){
					$.register_handle({form:options.form,clearform:options.clearform,tooltip_placement:'right',equal:0});
				}
			};
			var options = $.extend(true,default_options, options);
			if($(options.form).length > 0){
				options.equal = options.equal + 1;
			}
			$.openfancymodal(options);
		},
		openloginmodal: function(options) {
			default_options = {
				maxWidth: 540,
				href: Routing.generate('fos_user_security_login'),
				form:".login_form",
				equal: 0,
				beforeShow: function(){
					$('.fancybox-wrap').addClass('modal-fancybox');
				},
				afterShow:function(){
					$.login_handle({form:options.form,equal:options.equal});
				},
				afterClose: function(){
					$.login_handle({form:options.form,equal:0});
				}
			}
			var options = $.extend(true,default_options, options);
			if($(options.form).length > 0){
				options.equal = options.equal + 1;
			}
			$.openfancymodal(options);
		},
		openlogincheckmodal: function(options){
			var login_check = true;
			default_options = {
				url: Routing.generate('site_user_restful_checklogin'),
            	dataType: 'json',
            	type:'post',
            	async: false,
            	data:{
            		referer:false
            	},
            	success: function(data, textStatus){
            		login_check = data.result;
            		if(data.result != true){
            			$.openloginmodal();
            		}
            	}
			}
			var options = $.extend(true,default_options, options);
			if(options.referer == true){
				options.data = {
					url:options.location,
					referer: true
				}
			}
			$.ajax(options);
			return login_check;
		}
    });
})(jQuery);