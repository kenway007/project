/**
 * Created by way on 15/4/19.
 *
 *
 * 登陆页面
 */









define(function(require, exports, module){
    'use strict';

    var tpl_login = require('tpl/login.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        $body = $('body'),
        $login_box,
        form = require('form'),
        $root = $('#page-login')




    agent.on('login:init',function (){
        $root.append(tpl.render(tpl_head2+tpl_login,{
            head2 : {
                title : '登陆'
            }
        }))
        $login_box = $root.find('.login-box');
    })


    $doc.on('click','.login-btn',function (){
        var formData = form.getFormData($login_box);
        if (formData.username == ''){
            common.alert('请输入账号..');
            return;
        }
        if (formData.password == ''){
            common.alert('请输入密码..');
            return;
        }
        common.alert(C.alert_post);
        try{
            net.ajax({
                url : C.api.login,
                type: "post",
                data : formData,
                isCache : 0,
                isOnFront : 0,
                success : _success,
                error : _error
            })
        }catch(e){
            _error()
        }


        function _success(data){
            if (data && data.status == 200){
                common.setUserInfo({
                    username : formData.username,
                    password:formData.password,
                    aid : data.aid,
                    city : data.city,
                    area : data.area,
                    real_name : data.real_name,
                    error_msg : data.error_msg,
                    uid : data.uid
                });
                if (data.user_product == '0'){
                    location.hash = '#/sel_head' ;
                }else{
                    location.hash = '#/home' ;
                }
                location.reload();
            }
            common.alert(data.error_msg)
        }
        function _error(e){
            common.alert(C.alert_aet);
        }
    })



    agent.trigger('login:init');





    exports.show = function (params){
        $root.show();
        $body.addClass('login-bg-color');
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
        $body.removeClass('login-bg-color');
    }


})
