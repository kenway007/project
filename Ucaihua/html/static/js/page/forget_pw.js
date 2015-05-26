/**
 * Created by way on 15/4/21.
 *
 * 忘记密码
 */







define(function(require, exports, module){
    'use strict';

    var tpl_forget_password = require('tpl/forget_pw.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        $forget_main,
        form = require('form'),
        $root = $('#page-forget-password')




    agent.on('forget_pw:init',function (){
        $root.append(tpl.render(tpl_head2+tpl_forget_password,{
            head2 : {
                title : '找回密码'
            }
        }))
        $forget_main = $root.find('.forget-pw-main');
    })


    $doc.on('click','.forget-pw-confirm',function (){
        var formData = form.getFormData($forget_main);
        if (formData.mobile == ''){
            common.alert('请输入手机号码..');
            return;
        }
        if (formData.password == ''){
            common.alert('请输入密码..');
            return;
        }
        if (formData.serial == ''){
            common.alert('请输入验证码..');
            return;
        }
        common.alert(C.alert_post);
        try{
            net.ajax({
                url : C.api.get_password+'&op=update_password',
                type: "post",
                data : formData,
                isCache : 0,
                success : _success,
                error : _error
            })
        }catch(e){
            _error()
        }


        function _success(data){
            if (data && data.status == 200){
                common.setUserInfo({
                    password:formData.password
                })
                location.hash = '#/login' ;
            }
            common.alert(data.error_msg)
        }
        function _error(e){
            common.alert(C.alert_aet);
        }
    })

    $doc.on('click','.forget-pw-getCode',function (){
        var formData = form.getFormData($forget_main);
        common.alert(C.alert_post);
        try{
            net.ajax({
                url : C.api.get_password+'&op=send_verify',
                type : 'post',
                data : {
                    mobile : formData['mobile']
                },
                noCache : 1,
                success : _success,
                error : _error
            })
        }catch(e){
            _error()
        }


        function _success(data){
            //console.log('获取验证码',data)

            if (data && data.status == 200){
            }
            common.alert(data.error_msg)
        }
        function _error(e){
            common.alert(C.alert_aet);
        }
    })

    agent.trigger('forget_pw:init');


    exports.show = function (params){
        $root.show();
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
    }


})
