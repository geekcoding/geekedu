var state = 1;
var urlstate;
var backto = [];
var current = 1;
var backoptions = [];
var inithis = false;
var starthis = false;
var hisstart = true;
var options_array = [];
var id = 1;
(function($) {
	$.fn.extend({
		gkHistory: function(options) {
			default_options = {
				url: '',
				title: '',
				state: state
			};
			var options = $.extend(default_options, options);
			window.History.pushState({
				state: options.state
			}, options.title, options.url);
		},
		gkBackup: function(boptions,step) {
			var _this = this;
			if(!arguments[1]) step = state - 1;
			backto[step] = function(newoptions) {
				boptions.href = window.location.href;
				var newoptions = $.extend(boptions, newoptions);
				switch (boptions.move) {
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
				newoptions.isenv = false;
				_this.gkSlide(newoptions);
			}
		},
		gkInit: function(state) {
			var _this = this;
			options = {
				url: window.location.href,
				title: $('title').text(),
				state: arguments[1] ? arguments[1] : state
			};
			_this.gkHistory(options);
		},
		gkSlide: function(options) {
			var _this = this;
			default_options = {
				href: _this.attr('href'),
				move: 'right',
				container: $('body'),
				slide: '#main',
				speed: 300,
				before:function(){},
				loader: {
					width: '60px',
					height: '60px',
					left: 'auto',
					right: 'auto',
					top: 'window',
					icon: '../img/ajaxloader.gif'
				},
				history: inithis,
				push: {},
				callback: function() {}
			};
			options.loader = $.extend(default_options.loader, options.loader);
			var options = $.extend(default_options, options);
			var container = options.container;
			var slide = container.find(options.slide);
			//获取ajax_loader加载中对象
			var ajax_loader = this.gkGetLoader(options.loader);
			//创建一个新的滑块并加入ajaxloader对象用于正在加载时所显示
			var nslide = slide.clone(true).html('').prepend(ajax_loader).hide();
			//获取ajax_loader顶部距离
			if (options.loader.top == 'slide') {
				ajax_loader.css('margin-top', (parseInt(slide.css('height')) - parseInt(ajax_loader.css('height'))) / 2 + 'px');
				ajax_loader.css('margin-bottom', (parseInt(slide.css('height')) - parseInt(ajax_loader.css('height'))) / 2 + 'px');
			} else if (options.loader.top == 'window') {
				wheight = $(window).height();
				ajax_loader.css('margin-top', (wheight / 2 - parseInt(ajax_loader.css('height'))) + 'px');
				ajax_loader.css('margin-bottom', (wheight / 2 - parseInt(ajax_loader.css('height'))) + 'px');
			} else {
				ajax_loader.css('margin-top', options.loader.top);
				ajax_loader.css('margin-bottom', options.loader.top);
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
			slide.animate(animate, options.speed, function() {
				var newslide = slide;
				var before = function() {
					nslide.show();
					if (options.history == true && options.isenv == true) {
						state = state + 1;
						$.session.set('state', state);
						options.push = {};
						options.push.href = options.href;
						options.push.state = state;
						current = state;
						options.push.url = options.href;
						options.push.title = $("title").text();
						_this.gkHistory(options.push);
					}
					slide.remove();
					options.before.call();
				};
				var success = function(data) {
					container.html('').append($(data));
					if (options.history == true && options.isenv == true) {
						backoptions.push(options.id);
						$(document).sessionStorage('backoptions',backoptions);
						_this.gkBackup(options);
					}
				};
				var callback = function() {
					options.callback.call();
				}
				_this.gkGetPage({
					before: function() {
						before.call();
					},
					url: options.href,
					success: function(data, textStatus) {
						success.call(this, data);
						callback.call();
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
				data: {
					'slide': true
				},
				type: 'post',
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
		if (inithis == true) {
			var st = History.getState();
			if (e && st) {
				if (st.data.state == 2 && current == 1 && hisstart == false) {
					backto[1].call();
					current = 2;
				} else if (st.data.state == undefined && current == 2) {
					backto[1].call();
					current = 1;
				} else if (st.data.state == 2 && current == 2 && hisstart == true) {
					hisstart = false;
				} else if (current > st.data.state && backto[st.data.state] != undefined && hisstart == false) {
					backto[st.data.state].call();
					current = st.data.state;
				} else if (current < st.data.state && backto[st.data.state - 1] != undefined && hisstart == false) {
					backto[st.data.state - 1].call(this, {
						href: st.url
					});
					current = st.data.state;
				} else if (backto.length == st.data.state && hisstart == false && backto[st.data.state - 1]	 != undefined) {
					backto[st.data.state - 1].call(this, {
						href: st.url
					});
				}
				$.session.set('current', current);
			}
			return false;
		}
	});
	$.extend({
		gkHistoryInit: function(options) {
			var _this = this;
			inithis = true;
			if ($.session.get('current') != undefined && $.session.get('state') != undefined) {
				current = parseInt($.session.get('current'));
				state = parseInt($.session.get('state'));
				backoptions = $(document).sessionStorage('backoptions');
				hisstart = false;
				if(backoptions != undefined){
					for (var i = 1; i < backoptions.length+1; i++) {
						var boptions = options_array[backoptions[i-1]];
						$(document).gkBackup(boptions,i);
					}
				}else{
					backoptions = [];
				}
			}
		},
		gkSpeed: function(options) {
			default_options = {
				selector: 'a',
				event: 'click',
				global: false
			};
			var options = $.extend(default_options, options);
			options.id = id;
			options_array[id] = options;
			id++;
			$(document).on(options.event, options.selector, function(evt) {
				evt.preventDefault();
				options.href = $(this).attr('href');
				options.isenv = true;
				$(this).gkSlide(options);
			});
		},
	});
})(jQuery);