$(document).ready(function(){
        function addgrouptotable(data){
            $group = $("#grouptable").clone(true);
            var i = 0;
            $.each(data.group,function( index , item ) {
                $group.children("table").find("tr > td").eq(i).text(item);
                i++;
            });
            $group.children("table").find(".delgroup").gktip()
            .attr('id',"del"+data.group.id).siblings(".editgroup").gktip().attr("id","edit"+data.group.id);
            $group.children("table").find("tr").appendTo($("#grouplist > tbody"));
            return $group;
        }
        function editgrouptotable(data,options){
            var domtd = options.dom.closest('tr').children("td");
            domtd.eq(0).text(data.group.id).next().text(data.group.name)
            .next().text(0).next().text(data.group.roles);
        }
        function getId(hrefid,spstr){
            $hrefid = hrefid.split(spstr);
            $id = $hrefid[1]; 
            return $id;
        }
        function getEditForm(dom){
            $("#editcontent").remove();
            var content = '';
            $hrefid = dom.attr('id');
            if($hrefid != undefined){
                $id = getId($hrefid,'edit');
                url = Routing.generate('admin_user_groupedit',{id:$id});
                $.ajax({async:false,url:url,dataType:'json'}).done(function(data){
                    var editcontent = $("#addgroup").children(".content").clone(true);
                    editcontent.find("form").attr("action",url);
                    editcontent.find("#groupname").val(data.group.name);
                    $.each(data.group.roles,function(index,item){
                        $.each(editcontent.find("#roles option"),function(){
                            if($(this).val() == item){
                                $(this).attr("selected","selected");
                            }
                        });
                    });
                    $editwrap = $("<div id='editcontent' style='display:none;'></div>").appendTo(dom);
                    editcontent.appendTo($editwrap);
                    content = $("#editcontent").children(".content");
                });
            }
            return content;
        }
        $("#gaddbtn").gkhref({
            title: '添加用户组',
            buttons: [{id: 0, label: '保存', val: 'saveok', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
            data:$("#addgroup").children('.content'),
            type:'quickform',
            ajaxevent:{
                saveok:{
                    type:'post',
                    successafter:function(data,modal,options){
                        addgrouptotable(data,options);
                    },
                    failafter: function(data,modal,options){
                        modal.options.dom.closest('tr').remove();
                    },
                    successdialog:{
                        data:"<div style='text-align:center'>添加用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
                        autoclose:3000
                    },
                    faildialog:{
                        data:"<div style='text-align:center'>添加用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
                        autoclose:3000
                    } 
                }
            }
        });
        $(".editgroup").gkhref({
            type: 'quickform',
            buttons: [{id: 0, label: '保存', val: 'saveok', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
            data: function(options){ return getEditForm(options.dom);},
            ajaxevent: {
                saveok:{
                    type: 'post',
                    successafter:function(data,modal,options){
                        editgrouptotable(data,options);
                    },
                    failafter: function(data,modal,options){
                        modal.options.dom.closest('tr').remove();
                    },
                    successdialog:{
                        data:"<div style='text-align:center'>编辑用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
                        autoclose:3000
                    },
                    faildialog:{
                        data:"<div style='text-align:center'>编辑用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
                        autoclose:3000
                    } 
                }
            }
        });
        $(".delgroup").gkhref({
            buttons: [{id: 0, label: '确定', val: 'delok', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
            data:'是否确定删除此用户组?',
            type:'quickajax',
            ajaxevent:{
                delok:{
                    url: function(options){
                        return Routing.generate('admin_user_groupdel',{id:getId(options.dom.attr("id"),'del')});
                    },
                    successafter:function(data,modal,options){
                        modal.options.dom.closest('tr').remove();
                    },
                    failafter: function(data,modal,options){
                        modal.options.dom.closest('tr').remove();
                    },
                    successdialog:{
                        data:"<div style='text-align:center'>删除用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
                        autoclose:3000
                    },
                    faildialog:{
                        data:"<div style='text-align:center'>删除用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
                        autoclose:3000
                    }
                }
            }
        });
});