$(function(){
	jQuery.validator.addMethod("alnum", function(value, element) {  
        return this.optional(element) || /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value);  
    }, "必须包括英文字母和数字!"); 
	// $("#register_form").submit(function(){
	// 	var options={
	// 		url: Routing.generate('fos_user_registration_register'),
	//         type: 'post',
	//         dataType: 'json',
	// 		beforeSubmit:  function(formData, jqForm, options) {
	// 			// $(".loader-mask").fadeIn();
	// 		},
 //            success: function(data, statusText, xhr, $form)  {
 //            	$(".loader-mask").fadeOut();
 //            	console.log(data);
 //            }
	// 	};
	// 	$(this).ajaxSubmit(options);
	// 	return false;
	// });
	$("#register_form").validate({
		focusInvalid: true,
		rules: {
			"fos_user_registration_form[username]":{
				required: true,
				rangelength:[5,15],
				remote:{  
                    url: Routing.generate('user_unique_check'),     
                    type: "post",                 
                    dataType: "json",             
                    data: {                      
                        name:function(){ return $("#fos_user_registration_form_username").val(); }
                    }
                }  
			},
			"fos_user_registration_form[email]":{
				required: true,
                email: true,
                remote:{  
                    url: Routing.generate('user_unique_check'),     
                    type: "post",                 
                    dataType: "json",             
                    data: {                      
                        email:function(){ return $("#fos_user_registration_form_email").val(); }
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
				equalTo: '#fos_user_registration_form_plainPassword_first'
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
	            success: function(data, statusText, xhr, $form)  {
            	    $(".loader-mask").fadeOut();
            	    // console.log(data);
            	    var url = data.url;
            	    var height = parseInt($('#userslide').css('height'));
            	    $(document).gkSlide({
				        container: $("#main"),
				        move: 'left',
				        slide: "#userslide",
				        href:url,
				        isenv:true,
				        callback: function() {
				        	margin = (height-parseInt($('#userslide').find(".emsg").css('height')))/2+'px';
				        	$('#userslide').css({'background-color':'','background':''}).find(".emsg").css({'margin-top':margin,'margin-bottom':margin});
				            // $mediaplayer.call();
				        },
				        loader: {
				        	top: 'slide',
				            icon: '/bundles/sitecommon/img/ajaxloader2.gif'
				        }
   					});
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
        	if(element.closest('.controls').find('.help-inline').length > 0){
        		element.closest('.controls').find('.help-inline').html(error.text());
        	}else{
        		$("<span></span>").addClass('help-inline').html(error.text()).appendTo(element.closest('.controls'));
        	}
        },
        highlight: function(element, errorClass) { 
            $(element).closest('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass){
        	$(element).closest('.control-group').removeClass('error');
        	$(element).closest('.controls').find('.help-inline').remove();
        }
    });
});