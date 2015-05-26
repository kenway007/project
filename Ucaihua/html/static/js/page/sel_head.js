/**
 * Created by way on 15/4/7.
 *
 * 选择头像
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_sel_head = require('tpl/sel_head.tpl'),
        tpl_head2 = require('head2'),
        form = require('form'),
        stepVal,
        pageType,
        $form,
        file,
        upload,
        $root = $('#page-sel-head'),
        $face_img


    //下一步按钮
    $root.on('click','.sel-head-next',function (){
        var formDate = form.getFormData($root),
            face = formDate['face'],
            realname = formDate['realname']
        if (!upload.rst || !upload.rst[0]){
            common.alert(C.alert_qxztp);
            return;
        }
        if (!realname){
            common.alert(C.alert_mcbnwk);
            return;
        }

        common.alert(C.alert_post);
        net.ajax({
            type : 'post',
            dataType : 'json',
            url : C.api.edit_user_info+'&profile[realname]='+realname,
            data : {
                face : upload.rst[0]
            },
            isOnFront : 0,
            success : _success,
            error : _error
        });

        function _success(data){
            if (data.status == 200){
                location.hash = '#/sel_product?pageType=1'
            }
        }
        function _error(){
            common.alert(C.alert_aet);
        }
    })




    agent.on('sel_head:init',function (){
        var tpl_right = '<div class="sel-head-next">下一步</div>',
            data = {}

        data.head2 = {
            title : '完善个人资料',
            right : tpl_right
        }

        $root.html(tpl.render(tpl_head2+tpl_sel_head,data));
        $face_img =$root.find('.sel-head-face-img');
        $form = $root.find('.sel-head');
        upload = common.upload.init({
            $root : $root.find('.sel-head'),
            input : '#page-sel-head .kw-upload-file',
            box : '#page-sel-head  .kw-upload-box',
            imgType : 1
        });
    })

    agent.trigger('sel_head:init');
    


    exports.show = function (p){
        stepVal = p.stepVal;
        pageType = p.pageType || 2

        $root.show();
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
    }


})