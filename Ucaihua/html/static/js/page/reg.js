/**
 * Created by way on 15/4/19.
 *
 *
 * 注册页面
 */









define(function(require, exports, module){
    'use strict';

    var tpl_reg = require('tpl/reg.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        $reg_main,
        isload = false,
        form = require('form'),
        $root = $('#page-reg')




    agent.on('reg:init',function (){
        $root.append(tpl.render(tpl_head2+tpl_reg,{
            head2 : {
                title : '免费注册'
            }
        }))
        isload = true,
        $reg_main = $root.find('.reg-main');
    })


    $doc.on('click','.reg-confirm',function (){
        var formData = form.getFormData($reg_main);
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
                url : C.api.register,
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

    $doc.on('click','.reg-phone-getCode',function (){
        var formData = form.getFormData($reg_main);
        common.alert(C.alert_post);
        try{
            net.ajax({
                url : C.api.register+'&op=check_mobile',
                type : 'post',
                data : {
                    mobile : formData['mobile']
                },
                isCache : 0,
                isOnFronts : 0,
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






    agent.trigger('reg:init');


    exports.show = function (params){
        $root.show();
        if (isload){
            common.loadHide();
        }
    }

    exports.hide = function (){
        $root.hide();
    }


})
