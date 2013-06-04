var state = 1;
var urlstate = [];
var backto = [];
var current = 1;
var backoption = [];
var inithis = false;
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
		gkBackup: function(options) {
			var _this = this;
			backto[state-1] = function(newoptions) {
				options.href = window.location.href;
				var newoptions = $.extend(options, newoptions);
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
				newoptions.env = null;
				_this.gkSlide(newoptions);
			}
			backoption[state-1] = options;
		},
		gkInit:function(state){
			var _this = this;
			options = {
                url: window.location.href,
                title: $('title').text(),
                state:arguments[1] ? arguments[1] : state
			};
			_this.gkHistory(options);
			inithistory = true;
		},
		gkSlide: function(options) {
			var _this = this;
			default_options = {
				href: _this.attr('href'),
				move: 'right',
				container: $('body'),
				slide: '#main',
				env: null,
				speed: 200,
				loader: {
					width: '60px',
					height: '60px',
					left: 'auto',
					right: 'auto',
					top: 'window',
					icon: '../img/ajaxloader.gif'
				},
				history: true,
				push: {},
				init: function() {}
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
            } else if(options.loader.top == 'window'){
            	wheight = $(window).height();
            	ajax_loader.css('margin-top', (wheight / 2-parseInt(ajax_loader.css('height'))) + 'px');
            	ajax_loader.css('margin-bottom', (wheight / 2-parseInt(ajax_loader.css('height'))) + 'px');
            }else {
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
					if (options.history == true) {
						if (options.env != null) {
							state = state+1;
							options.push = {};
							options.push.href = options.href;
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
					if(options.env != null){
						newoptions = options;
						_this.gkBackup(newoptions);
					}
				};
				var init = function() {
					options.init.call();
				}
				_this.gkGetPage({
					before: function() {
						before.call();
					},
					url: options.href,
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
				data: {
					'slide':true
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
		var st = History.getState();
		if (e && st) {
			if(st.data.state == 0 && inithis == true){
				new Messi('<center style="color:#733">当前已是最后一页,无法再退了!</center>', {
					modal: true,
					autoclose:1000,
					center: false,
					viewport:{
						top:'150px',
						left:'300px'
					},
					callback:function(){}
				});
				History.forward();
			}
			if (current > st.data.state && backto[st.data.state] != undefined) {
				backto[st.data.state].call();
			} else if(current < st.data.state && backto[st.data.state - 1] != undefined){
				backto[st.data.state - 1].call(this,{href:st.url});
			}else if (backto.length == st.data.state) {
				if(backto[st.data.state - 1] != undefined){
					backto[st.data.state - 1].call(this, {href:st.url});
				}
			}
			current = st.data.state;
		}
		return false;
	});
	$('document').gkInit(0);
	$('document').gkInit();
	inithis = true;
})(jQuery);