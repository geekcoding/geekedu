;(function($){
	$.fn.extend({
		    gkclick: function(options,dialog){
		    	options.data = this.gkdata(options);
		    	switch(options.type){
		    		case 'dialog':
		    		    return dialog.gkdialog(options);
		    		    break;
		    		case 'ajax':
		    		    return dialog.gkajax(options);
		    		    break;
		    		case 'quickajax':
		    		    return dialog.gkquickajax(options);
		    		    break;
		    		case 'quickform':
		    		    return dialog.gkquickform(options);
		    		    break;
		    		default: 
		    		    return $.gkmodal(options);
		    		    break;
		    	}
		    },
		    gkajaxdata: function(options,ajaxdata){
		    	$.each(ajaxdata,function(index,item){
		    		if(jQuery.isFunction(item)){
		    			ajaxdata[index] = item(options);
		    		}else{
		    			ajaxdata[index] = item;
		    		}
		    	});
		    	return ajaxdata;
		    },
		    gkajaxurl: function(options,citem){
		    	if(jQuery.isFunction(citem.url)){
		    		$url = citem.url(options);
		    		return $url;
		    	}else{
		    		if(options.kind == 'quickajax'){
	            	    dataajax = (options.dom.attr('ajaxurl') != null) ? options.dom.attr('ajaxurl') : null;
	            	    $dataajax = (typeof(citem.url) == "undefined") ? dataajax : citem.url;
	            	    return $dataajax;
	                }else if(options.kind == 'quickform'){
	            	    if(typeof(citem.url) != "undefined"){
	            		    return citem.url;
	            	    }else{
	            	    	return null;
	            	    }
	                }
		    	}
		    },
		    gkdata: function(options){
		    	if(jQuery.isFunction(options.data)){
		    		return options.data(options);
		    	}else{
		    		return options.data;
		    	}
		    },
		    gkhref: function(options,event){
		    	var _this = this;
		    	_this.options = {};
		    	var event = (typeof(event) == "undefined") ? 'click':event;
		    	$(this).off('click');
		        var defaults = {
		        	title: null,
		        	type: 'dialog',
		        	evented: event
		        };
		        if(this.length <= 0) return false;
		        if($(this).attr('title') != undefined) defaults.title =  $(this).attr('title');
		        modallength = $($(this).attr('href')).length;
		        if($(this).attr('href') != undefined && modallength > 0){
		        	$($(this).attr('href')).hide();
		        	dialog = $($(this).attr('href'));
		        }else{
		        	dialog = $("<div></div>").appendTo($("body").after("<div style='display:none;'></div>"));
		        }
		        $(this).on(event,function(){
		        	this.options = {};
		    		this.options = $.extend(defaults,options);
		        	this.options.dom = $(this);
		        	this.options.odata = this.options.data;
		        	_this.gkclick(this.options,dialog);
		        	if(dialog instanceof jQuery) dialog.remove();
		    	});
		        return false;
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
		    					after = function(data,modal,options){
		    					    $quickoptions.successafter(data,modal,options);
		    				    }
		    				    gkmodal_defaults = {data:null,after: function(){
		    				    	after(data,modal,options);
		    				    }};
		    				    gkmodal_options = $.extend(gkmodal_defaults,$quickoptions.successdialog);
		    				}else{
		    					after = function(data,modal,options){
		    					    $quickoptions.failafter(data,modal,options);
		    				    }
		    				    gkmodal_defaults = {data:null,after: function(){after(data,modal,options)}};
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
		    	var _this = this;
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
	            			
	            			$ajaxoptions = $.extend($ajaxoptions,citem);
	            			$ajaxdata = (typeof(citem.data) == 'undefined') ? {} : citem.data;
	            			$ajaxoptions.data = _this.gkajaxdata(options,$ajaxdata);
	            			if(_this.gkajaxurl(options,citem) != null) $ajaxoptions.url = _this.gkajaxurl(options,citem);
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
		    	var _this = this;
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
				options = $.extend(defaults,options);
				if(defaults.data instanceof jQuery){
					defaults.form = defaults.data.find("form");
				}
				options = $.extend(defaults,options);
				var modal = $gkmodal;
				var $gkmodal = $.gkmodal(options);
				if($gkmodal.ndata instanceof jQuery && !jQuery.isFunction(options.odata)){
					options.dom.off(options.evented);
					options.dom.on(options.evented,function(){
					    options.data = $gkmodal.ndata;
		        	    dialog = $(options.dom.attr('href'));
		        	    return _this.gkclick(options,dialog);
				    });
				}
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