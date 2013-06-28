$(function(){
        $(document).on('click',"#login_btn",function(evt){
        evt.preventDefault();
        $("#login_form").siblings(".alert-error").remove();
        $.ajax({
            beforeSend: function() {
                $(".loader-mask").fadeIn();
            },
            data: {
                _username:$('#username').val(),
                _password:$('#password').val(),
                _remember_me:$('#remember_me').val(),
                _csrf_token:$(":input[name='_csrf_token']").val()
            },
            type: 'post',
            dataType: 'json',
            url: Routing.generate('fos_user_security_check'),
            success: function(data, textStatus) {
                if(data.result == false){
                    var errorshow = function(){
                            $(".loader-mask").hide(0,function(){
                            $("#login_form").before("<div class='alert alert-error'>"+data.error+"</div>");
                        });
                    }
                    errorshow.call();
                }else if(data.result == true){
                    window.location.href = data.url;
                }
            }
        });
    });
});