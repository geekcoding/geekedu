function addGroup(){
            var $dom = $($(this).attr('href'));
            var $formop = {
                success:    function(data,statusText,xhr){
                    if(statusText == 'success' && xhr.readyState == 4){
                        if(data.result == true){
                            $group = $("#grouptable").clone(true);
                            $.each(data.group,function( i , item ) {
                                $group.children("table").find("tr > td").eq(i).text(item);
                            });
                            after = function(){
                                $group.children("table").find("tr").appendTo($("#grouplist > tbody"));
                            }
                            $messi.hide(function(){new Messi(
                                "<div style='text-align:center'>添加用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
                                {autoclose:3000,after:function(){after.call();}}
                            )});
                        }else{
                            $messi.hide(function(){new Messi(
                                "<div style='text-align:center'>添加用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
                                {autoclose:3000}
                            )});
                        }
                    }
                },
                type:      'post',
                dataType:  'json',
            }; 
            var $messi = new Messi($dom,
                {
                    title: $(this).attr('title'),
                    closeButton: false,
                    buttons: [{id: 0, label: '保存', val: 'submit', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
                    hook:[{
                        submit: function(){ 
                            $dom.find("form").submit(function(){
                                    $(this).ajaxSubmit($formop);
                                    return false; 
                                }
                            ); 
                            $dom.find("form").submit();
                            return false;
                        }
                     }],
                }
            );
}
function delGroup(){
	new Messi('是否确定删除此用户组?', 
            {
                title: $(this).attr('title'), 
                closeButton: false,
                buttons: [{id: 0, label: '确定', val: 'Y'}, {id: 1, label: '取消', val: 'N'}]
            });
}