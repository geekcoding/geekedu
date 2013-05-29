;(function($){
	$.fn.extend({
		    gkhref: function(options,event){
		    	var event = (typeof(event) == "undefined") ? 'click':event;
		    	$(this).unbind('click');
		        var defaults = {
		        	title: null,
		        	type: 'dialog'
		        };
		        if(this.length <= 0) return false;
		        if($(this).attr('title') != undefined) defaults.title =  $(this).attr('title');
		        options = $.extend(defaults,options);
		        if($(this).attr('href') != undefined && $($(this).attr('href')) && options.type == 'dialog'){
		        	$($(this).attr('href')).hide();
		        	$(this).live(event,function(){
		        		options.dom = $(this);
		        		return $($(this).attr('href')).gkdialog(options);
		        	});
		        }else if($(this).attr('href') != undefined && $($(this).attr('href')) && options.type == 'ajax'){
		        	$($(this).attr('href')).hide();
		        	$(this).live(event,function(){
		        		options.dom = $(this);
		        		return $($(this).attr('href')).gkajax(options);
		        	});
		        }else if($(this).attr('href') != undefined && $($(this).attr('href')) && options.type == 'quickajax'){
		        	$($(this).attr('href')).hide();
		        	$(this).live(event,function(){
		        		options.dom = $(this);
		        		return $($(this).attr('href')).gkquickajax(options);
		        	});
		        }else if($(this).attr('href') != undefined && $($(this).attr('href')) && options.type == 'quickform'){
		        	$($(this).attr('href')).hide();
		        	$(this).live(event,function(){
		        		options.dom = $(this);
		        		return $($(this).attr('href')).gkquickform(options);
		        	});
		        }else{
		        	if($(this).html() != undefined) defaults.data =  $(this).html();
		        	$(this).live(event,function(){
		        		options.dom = $(this);
		        		return $.gkmodal(options);
		        	});
		        }
		    },
		    gkquickform: function(options){
		    	var defaults = {
		    		kind: 'quickform'
		    	};
		    	options = $.extend(defaults,options);
		    	var $quickajax = this.gkquickajax(options);
		    	return $quickajax;
		    },
		    gkquickajax: function(options){
		    	var defaults = {
		    		closeButton: false,
		    		ajaxevent: {},
		    		ajax:  {},
		            hooks: {},
		            kind: 'quickajax'
		    	};
		    	options = $.extend(defaults,options);
		    	$.each(options.ajaxevent,function(index,item){
		    		$quickdefaults = {
		    			successafter:function(modal,data){},
		    			failafter:function(modal,data){},
		    			successdialog:{},
		    			faildialog:{}
		    		};
		    		$quickoptions = $.extend($quickdefaults,item);
		    		options.ajax[index] = {};
		    		options.ajax[index]['click'] = item;
		    		options.ajax[index]['click']['dataType'] = 'json';
		    		options.ajax[index]['click']['success'] = function(data,statusText,xhr){
		    			modal = $ajax;
		    			if(statusText == 'success' && xhr.readyState == 4){
		    				if(data.result == true){
		    					after = function(modal,data){
		    					    $quickoptions.successafter(modal,data);
		    				    }
		    				    gkmodal_defaults = {data:null,after: function(){
		    				    	after(modal,data);
		    				    }};
		    				    gkmodal_options = $.extend(gkmodal_defaults,$quickoptions.successdialog);
		    				}else{
		    					after = function(modal,data){
		    					    $quickoptions.failafter(modal,data);
		    				    }
		    				    gkmodal_defaults = {data:null,after: function(){after(modal,data)}};
		    				    gkmodal_options = $.extend(gkmodal_defaults,$quickoptions.faildialog);
		    				}
		    				gkmodal = function(){
		    					$.gkmodal(gkmodal_options);
		    				}
		    			    (gkmodal_options.data != null)? modal.hide(gkmodal) : modal.hide();
		    			}
		    		}
		    	});
		    	var $ajax = this.gkajax(options);
		    	return $ajax;
		    },
		    gkajax: function(options){
				var defaults = {
		            ajax:  {},
		            hooks: {},
		            kind: 'quickajax'
	            };
	            options = $.extend(defaults,options);
	            ajax = (options.ajax == undefined) ? defaults.ajax : options.ajax;
	            $.each(ajax,function(index,item){
	            	options.hooks[index] = {}
	            	$.each(item,function(cindex,citem){
	            		options.hooks[index][cindex] = function(btn){
	            			var modal = $dialog;
	            			$ajaxoptions = {
	            				type: 'get',
	            				dataType: 'html',
	            				modal: modal,
	            				success: function(data,statusText,xhr){}
	            			};
	            			if(options.kind == 'quickajax'){
	            				var dataajax = (options.dom.attr('data-ajax') != null) ? options.dom.attr('data-ajax') : null;
	            			    $ajaxoptions.url = (typeof(citem.url) == "undefined") ? dataajax : citem.url;
	            			}else if(options.kind == 'quickform'){
	            				if(typeof(citem.url) != "undefined"){
	            					$ajaxoptions.url = citem.url;
	            				}
	            			}
	            			$ajaxoptions = $.extend($ajaxoptions,citem);
	            		    if(options.kind == 'quickajax') {
	            		    	$.ajax($ajaxoptions);
	            		    }else if(options.kind == 'quickform' && modal.options.form != null ){
	            		    	modal.options.form.ajaxForm($ajaxoptions).submit();
	            		    } 
	            		}
	            	});
	            });
	            var $dialog = this.gkdialog(options);
	            return $dialog;
			},
		    gkdialog: function(options){
		    	$(this).hide();
				var defaults = {
					title: '',
					data: '',
					form: null,
					buttons: [{id: 0, label: '关闭', val: 'close'}],
					hooks:{}
				}
				if($(this).children('.title')){
					defaults.title = $(this).children('.title').html();
				}
				if($(this).children('.content')){
					defaults.data = $(this).children('.content');
				}
				if($(this).children('.footer') && $(this).children('.footer').find('.button')){
					if($(this).children('.footer').find('.button').length > 0){
						var buttons = $(this).children('.footer').find('.button');
						for (var i = 0; i < buttons.length; i++) {
							defaults.buttons[i] = {};
							defaults.buttons[i]['id'] = i;
							defaults.buttons[i]['label'] = buttons.eq(i).text();
							defaults.buttons[i]['val'] = (buttons.eq(i).attr("id") == undefined) ? 'close' : buttons.eq(i).attr("id");
							defaults.buttons[i]["class"] = (buttons.eq(i).attr("class") == undefined) ? '' : buttons.eq(i).attr("class");
						};
					}
				}
				var modal = $gkmodal;
				if($(this).children('.content').find("form")){
					defaults.form = $(this).children('.content').find("form");
				}
				options = $.extend(defaults,options);
				var $gkmodal = $.gkmodal(options);
				return $gkmodal;
			}
	});
	$.extend({
		gkmodal: function(options){
			var defaults = {data:''};
			options = $.extend(defaults,options);
			return new Messi(options.data,options);
		}
	});
})(jQuery);
for (var i = 0; i < $('.gkmodal').length; i++) {
	$('.gkmodal').eq(i).gkhref();
};