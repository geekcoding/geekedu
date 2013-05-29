$(document).ready(function(){
        function addgrouptotable(data){
            $group = $("#grouptable").clone(true);
            var i = 0;
            $.each(data.group,function( index , item ) {
                $group.children("table").find("tr > td").eq(i).text(item);
                i++;
            });
            $group.children("table").find(".delgroup").gktip()
            .attr('data-ajax',Routing.generate('site_admin_user_groupdel', { id: data.group.id })).
            siblings(".editgroup").gktip();
            $group.children("table").find("tr").appendTo($("#grouplist > tbody"));
            return $group;
        }
        function editgrouptable(data){

        }
        function getEditForm(){
            for (var i = 0; i < $('.editgroup').length; i++) {
                $hrefid = $('.editgroup').eq(i).attr('id');
                if($hrefid != undefined){
                    $hrefid = $hrefid.split('edit');
                    $id = $hrefid[1];
                }
            };
        }
        getEditForm();
        $("#gaddbtn").gkhref({
            // title: '添加用户组',
            // buttons: [{id: 0, label: '确定', val: 'saveok', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
            data:$("#addgroup").children('.content'),
            type:'quickform',
            ajaxevent:{
                saveok:{
                    type:'post',
                    successafter:function(modal,data){
                        addgrouptotable(data);
                    },
                    failafter: function(modal,data){
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
        $(".delgroup").gkhref({
            type:'quickajax',
            ajaxevent:{
                delok:{
                    successafter:function(modal,data){
                        modal.options.dom.closest('tr').remove();
                    },
                    failafter: function(modal,data){
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
        // $(".editgroup").gkhref({
        //     type:'quickform',
        //     ajaxevent:{
        //         saveok:{
        //             type:'post',
        //             successafter:function(modal,data){
        //                 editgrouptotable(data);
        //             },
        //             failafter: function(modal,data){
        //                 // modal.options.dom.closest('tr').remove();
        //             },
        //             successdialog:{
        //                 data:"<div style='text-align:center'>添加用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
        //                 autoclose:3000
        //             },
        //             faildialog:{
        //                 data:"<div style='text-align:center'>添加用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
        //                 autoclose:3000
        //             } 
        //         }
        //     }
        // });
        // $("#gaddbtn").click(function(){
        //     var $dom = $($(this).attr('href'));
        //     var $formop = {
        //         success:    function(data,statusText,xhr){
        //             if(statusText == 'success' && xhr.readyState == 4){
        //                 if(data.result == true){
        //                     $group = $("#grouptable").clone(true);
        //                     var i = 0;
        //                     $.each(data.group,function( index , item ) {
        //                         $group.children("table").find("tr > td").eq(i).text(item);
        //                         i++;
        //                     });
        //                     $group.children("table").find(".delgroup").gktip()
        //                     .attr('data-ajax',Routing.generate('site_admin_user_groupdel', { id: data.group.id })).
        //                     siblings(".editgroup").gktip();
        //                     after = function(){
        //                         $group.children("table").find("tr").appendTo($("#grouplist > tbody"));
        //                     }
        //                     $messi.hide(function(){new Messi(
        //                         "<div style='text-align:center'>添加用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
        //                         {autoclose:3000,after:function(){after.call();}}
        //                     )});
        //                 }else{
        //                     $messi.hide(function(){new Messi(
        //                         "<div style='text-align:center'>添加用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
        //                         {autoclose:3000}
        //                     )});
        //                 }
        //             }
        //         },
        //         type:      'post',
        //         dataType:  'json',
        //     }; 
        //     var $messi = new Messi($dom,
        //         {
        //             title: $(this).attr('title'),
        //             closeButton: false,
        //             buttons: [{id: 0, label: '保存', val: 'submit', class: 'mbtn-success'},{id: 2, label: '取消', val: 'cancel'}],
        //             hooks:{
        //                 submit:{
        //                     click: function(){
        //                         $dom.find("form").ajaxForm($formop).submit();
        //                         return false;
        //                     }
        //                 }
        //             },
        //         }
        //     );
        // });
        // $(".delgroup").gkhref({
        //     closeButton: false,
        //     type: 'ajax',
        //     ajax: {
        //         delok:{
        //             click:{
        //                 type: 'post',
        //                 dataType: 'json',
        //                 success: function(data,statusText,xhr){
        //                     if(statusText == 'success' && xhr.readyState == 4){
        //                         var modal = this.modal;
        //                         after = function(options){
        //                            options.dom.closest('tr').remove();
        //                         };
        //                         modal.hide(function(){
        //                             $.gkmodal({
        //                                 data:"<div style='text-align:center'>添加用户组成功!本窗口3秒后自动关闭,可以点击右边按钮关闭.</div>",
        //                                 autoclose:3000,
        //                                 after:function(){after(modal.options);}
        //                             }
        //                         )});
        //                     }else{
        //                         this.modal.hide(function(){
        //                             $.gkmodal(
        //                                 "<div style='text-align:center'>删除用户组失败!请尝试重新添加或查看数据库以及网络原因.</div>",
        //                                 {autoclose:3000}
        //                             );
        //                         });
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
// //top tooltip
//     $('.tip').qtip('destroy').live('hover',function(){
//         // $(this).qtip({
//         //     content: false,
//         //     position: {
//         //         my: 'bottom center',
//         //         at: 'top center',
//         //         viewport: $(window)
//         //     },
//         //     style: {
//         //         classes: 'ui-tooltip-tipsy'
//         //     }
//         // });
//     });

//     //tooltip in right
//     $('.tipR').qtip({
//         content: false,
//         position: {
//             my: 'left center',
//             at: 'right center',
//             viewport: $(window)
//         },
//         style: {
//             classes: 'ui-tooltip-tipsy'
//         }
//     });

//     //tooltip in bottom
//     $('.tipB').qtip({
//         content: false,
//         position: {
//             my: 'top center',
//             at: 'bottom center',
//             viewport: $(window)
//         },
//         style: {
//             classes: 'ui-tooltip-tipsy'
//         }
//     });

//     //tooltip in left
//     $('.tipL').qtip({
//         content: false,
//         position: {
//             my: 'right center',
//             at: 'left center',
//             viewport: $(window)
//         },
//         style: {
//             classes: 'ui-tooltip-tipsy'
//         }
//     });
});