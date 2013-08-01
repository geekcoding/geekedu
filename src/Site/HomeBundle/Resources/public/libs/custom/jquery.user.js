jQuery.validator.addMethod("alnum", function(value, element) {  
        return this.optional(element) || /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value);  
    }, "必须包括英文字母和数字!"); 
(function($) {
	$.extend({
		before_handle: function(options){
			default_options = {
				form:$(".fos_user_registration_register"),
				equal:0
			};
			var options = $.extend(true,default_options, options);
			options.form.eq(options.equal).find('input').prop("disabled", true).parent()
                .find('a').css({'text-decoration':'none'}).addClass('no-link').parent()
                .closest('.box').find('.title > i').show();
            $(".button-list").find('a').addClass('disabled').addClass('no-link');
		},
		after_handle: function(options){
	        default_options = {
				form:$(".fos_user_registration_register"),
				equal:0
			};
			var options = $.extend(true,default_options, options);
			options.form.eq(options.equal).find('input').prop("disabled", false).parent()
	            .find('a').css({'text-decoration':'underline'}).removeClass('no-link').parent()
	            .closest('.box').find('.title > i').hide();
	        $(".button-list").find('a').removeClass('disabled').removeClass('no-link');
        },
        login_handle: function(options){
        	var _this = this;
        	default_options = {
		        form:".login_form",
		        equal: 0
			};
			var options = $.extend(true,default_options, options);
			$login_form = $(options.form).eq(options.equal);
        	$login_form.submit(function(){
		        var options={
		            url: Routing.generate('fos_user_security_check'),
		            type: 'post',
		            dataType: 'json',
		            beforeSubmit:  function(formData, jqForm, options) {
		            	$login_form.siblings(".alert-error").remove();
		                _this.before_handle({form:$login_form,equal:options.equal});
		            },
		            success: function(data, statusText, xhr, $form)  {
		                if(data.result == false){
		                    var errorshow = function(){
		                        $login_form.before("<div class='alert alert-error'>"+data.error+"!</div>");
		                        _this.after_handle({form:$login_form,equal:options.equal});
		                    }
		                    errorshow.call();
		                }else if(data.result == true){
		                    window.location.href = data.url;
		                }
		            }
	        	};
		        $(this).ajaxSubmit(options);
		        return false;
	        });
        },
        register_handle: function(options){
        	var _this = this;
        	default_options = {
		        form:".fos_user_registration_register",
		        tooltip_placement: 'top',
		        equal: 0,
		        clearform:false
			};
			var options = $.extend(true,default_options, options);
			$register_form = $(options.form).eq(options.equal);
			if(options.clearform == false){
				// $register_form.clearForm();
			}
		    $register_form.validate({
				focusInvalid: true,
				rules: {
					"fos_user_registration_form[username]":{
						required: true,
						rangelength:[5,15],
						remote:{  
		                    url: Routing.generate('site_user_restful_checkunique'),     
		                    type: "post",                 
		                    dataType: "json",             
		                    data: {                      
		                        name:function(){ return $register_form.find("input[name='fos_user_registration_form[username]']").val(); }
		                    }
		                }  
					},
					"fos_user_registration_form[email]":{
						required: true,
		                email: true,
		                remote:{  
		                    url: Routing.generate('site_user_restful_checkunique'),     
		                    type: "post",                 
		                    dataType: "json",             
		                    data: {                      
		                        email:function(){ return $register_form.find("input[name='fos_user_registration_form[email]']").val(); }
		                    }  
		                }  
					},
					"fos_user_registration_form[plainPassword][first]":{
						required: true,
						minlength: 7,
						alnum:true
					},
					"fos_user_registration_form[plainPassword][second]":{
						required: true,
						equalTo: $register_form.find("input[name='fos_user_registration_form[plainPassword][first]']")
					}
				},
				messages:{
					"fos_user_registration_form[username]":{
						required: '用户名不能为空!',
						rangelength:$.format("用户名必须在{0}-{1}个字符之间!"),
						remote:'用户名已经被注册!'
					},
					"fos_user_registration_form[email]":{
						required: '邮箱地址不能为空!',
						email:'邮箱格式不正确!',
						remote:'该邮箱已经被注册!'
					},
					"fos_user_registration_form[plainPassword][first]":{
						required: '密码不能为空!',
						minlength:$.format('密码长度不能少于{0}个字符!'),
		                alnum:'密码必须包括英文字母和数字!'
					},
					"fos_user_registration_form[plainPassword][second]":{
						required: '两次输入密码不一致!',
						equalTo: '两次输入密码不一致!'
					}
				},
		        submitHandler: function(form) {
		        	var options={
					    url: Routing.generate('fos_user_registration_register'),
			            type: 'post',
			            dataType: 'json',
			            beforeSubmit:  function(formData, jqForm, options) {
			                _this.before_handle({form:$register_form,equal:options.equal});
		            	},
			            success: function(data, statusText, xhr, $form)  {
		            	    if(data.result == true){
		            	    	window.location.href = data.url;
		            	    }else{
		            	    	_this.after_handle({form:$register_form,equal:options.equal});
		            	    }
		                }
				    };
		        	$(form).ajaxSubmit(options);
		            return false;
		        },
		        onkeyup: function(element){
		        	$(element).valid();
		        },
		        onfocusout: function(element){
		        	$(element).valid();
		        },
		        errorPlacement: function(error, element) {
		        	$(element).tooltip('destroy');
		        	$(element).tooltip({
						title:error.text(),
						placement: options.tooltip_placement,
						trigger:'manual'
					});
					$(element).tooltip('show');
		        },
		        highlight: function(element, errorClass) { 
		            $(element).closest('.control-group').addClass('error');
		        },
		        unhighlight: function(element, errorClass){
		        	$(element).tooltip('destroy');
		        	$(element).closest('.control-group').removeClass('error');
		        }
		    });
		}
	});
})(jQuery);