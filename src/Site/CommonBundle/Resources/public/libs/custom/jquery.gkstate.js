var state = 1;
var urlstate = [];
var backto = [];;
(function($) {
	$.fn.extend({
		gkHistory: function(options) {
			default_options = {
				href: '',
				title: ''
			};
			var options = $.extend(default_options, options);
			window.History.pushState({
				state: options.state
			}, options.title, options.url);
		},
		gkSlide: function(options) {
			var _this = this;
			default_options = {
				href: _this.attr('href'),
				move: 'right',
				container: $('body'),
				slide: $('body'),
				env: null,
				speed: 200,
				loader: {
					width: '60px',
					height: '60px',
					left: 'auto',
					right: 'auto',
					top: null,
					icon: 'ajaxloader'
				},
				history: true,
				push: {},
				init: function() {}
			};
			var options = $.extend(default_options, options);
			var slide = options.slide;
			var container = options.container;
			var sparent = options.slide.parent();
			//获取ajax_loader加载中对象
			var ajax_loader = this.gkGetLoader(options.loader);
			//创建一个新的滑块并加入ajaxloader对象用于正在加载时所显示
			var nslide = slide.clone(true).html('').prepend(ajax_loader).hide();
			//获取ajax_loader顶部距离
			if (options.loader.top == null) {
				ajax_loader.css('margin-top', (parseInt(slide.parent().css('height')) - parseInt(ajax_loader.css('height'))) / 2 + 'px');
				ajax_loader.css('margin-bottom', (parseInt(slide.parent().css('height')) - parseInt(ajax_loader.css('height'))) / 2 + 'px');
			} else {
				ajax_loader.css('margin-top', options.loader.top);
			}
			//改变顶级滑块为容器,设置其为相对布局样式,防止滑动时溢出
			slide.parent().css({
				'overflow': 'hidden',
				'position': 'relative'
			});
			//选择滑动方向,使用jquery对象实现
			switch (options.move) {
				case 'left':
					slide.css('float', 'left');
					nslide.insertAfter(slide);
					var animate = {
						'margin-left': '-' + slide.parent().css('width')
					};
					break;
				case 'right':
					slide.css('float', 'right');
					nslide.insertBefore(slide);
					var animate = {
						'margin-right': '-' + slide.parent().css('width')
					};
					break;
				case 'up':
					nslide.insertAfter(slide);
					var animate = {
						'margin-top': '-' + slide.parent().css('height'),
						'margin-bottom': '+' + slide.parent().css('height')
					};
					break;
				case 'down':
					var mdown = slide.parent().css('height');
					nslide.insertBefore(slide);
					var animate = {
						'margin-bottom': '-' + slide.parent().css('height'),
						'margin-top': '+' + slide.parent().css('height')
					};
					break;
				default:
					slide.css('float', 'left');
					nslide.insertAfter(slide);
					var animate = {
						'margin-left': '-' + slide.parent().css('width')
					};
					break;
			}
			if (options.env == null) {
				console.log(slide.html());
				console.log(slide.css('width'));
			}
			slide.animate(animate, options.speed, function() {
				var before = function() {
					nslide.show();
					if (options.history == true) {
						backto[state] = function(nstate) {
							var newoptions = options;
							switch (options.move) {
								case 'left':
									newoptions.move = 'right';
									break;
								case 'right':
									newoptions.move = 'left';
									break;
								case 'up':
									newoptions.move = 'down';
									break;
								case 'down':
									newoptions.move = 'up';
									break;
								default:
									newoptions.move = 'right';
									break;
							}
							newoptions.url = urlstate[nstate];
							newoptions.env = null;
							// console.log(slide.html());
							newoptions.slide = $(slide.outerHTML()).css(slide.gkCss());
							sparent.html('').append(newoptions.slide);
							// newoptions.slide.parent().html('').append(newoptions.slide);
							_this.gkSlide(newoptions);
						}
						if (options.env != null) {
							options.push = {};
							options.push.href = options.href;
							state = state + 1;
							options.push.state = state;
							urlstate[state] = options.push.url = options.href;
							options.push.title = $("title").text();
							_this.gkHistory(options.push);
						}
					}
					slide.remove();
				};
				var success = function(data) {
					container.html('').append($(data));
				};
				var init = function() {
					options.init.call();
				}
				_this.gkGetPage({
					before: function() {
						before.call();
					},
					url: _this.attr('href'),
					success: function(data, textStatus) {
						success.call(this, data);
						init.call();
					}
				});
			});
		},
		gkGetPage: function(options) {
			default_options = {
				container: $("body"),
				before: function() {
					var ajax_loader = this.gkGetLoader();
					ajax_loader.appendTo(container);
				},
				url: $(this).attr('href'),
				dataType: 'html',
				success: function(data, textStatus) {
					ajax_loader.remove();
					options.container.html('').append($(data));
				}
			};
			options = $.extend(default_options, options);
			$.ajax({
				beforeSend: function() {
					options.before.call();
				},
				url: options.url,
				dataType: 'html',
				success: function(data, textStatus) {
					options.success(data, textStatus);
				}
			});
		},
		gkGetLoader: function(options) {
			default_options = {
				width: '60px',
				height: '60px',
				left: 'auto',
				right: 'auto',
				top: '0',
				bottom: '0',
				icon: '../img/ajaxloader.gif'
			};
			options = $.extend(default_options, options);
			return $("<div></div>").css({
				'width': options.width,
				'height': options.height,
				'margin-left': options.left,
				'margin-right': options.right,
				'margin-top': options.top,
				'margin-bottom': options.bottom,
				'background': "url('" + options.icon + "') no-repeat center",
				'background-size': 'cover'
			});
		},
		gkRmLoader: function(ajaxloader) {
			ajaxloader.remove();
		}
	});
	$(window).bind("statechange", function(e) {
		var st = History.getState();
		if (e && st) {
			if (backto[st.data.state] != undefined) {
				backto[st.data.state].call(this, st.data.state);
			}
		}
		return false;
	});
})(jQuery);

(function ($) {
    'use strict';
    var ns = 'outerHTML';
    if (!$.fn[ns]) {
        $.fn[ns] = function outerHTML(replacement) {
            var $this = $(this),
                content;
            if (replacement) {
                content = $this.replaceWith(replacement);
            } else if (typeof $this[0].outerHTML !== 'undefined') {
                content = $this[0].outerHTML;
            } else {
                content = $this.wrap('<div>').parent().html();
                $this.unwrap();
            }
            return content;
        };
    }
    $.fn.gkCss = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            }
            style = window.getComputedStyle(dom, null);
            for(var i=0;i<style.length;i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            }
            return returns;
        }
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        return this.css();
    }
}(jQuery));