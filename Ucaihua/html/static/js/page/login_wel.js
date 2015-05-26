/**
 * Created by way on 15/4/17.
 *
 *
 * 登陆欢迎页
 */

define(function(require, exports, module){
    'use strict';

    var tpl_login_wel = require('tpl/login_wel.tpl'),
        Banner = require('banner'),
        banner,
        $root = $('#page-login-wel')

    agent.on('login_wel:init',function (){
        $root.append(tpl.render(tpl_login_wel));
        banner = new Banner('login-wel-wp',{
            autoTime : 3000,
            btns : '#page-login-wel .login-wel-focus'
        })
    })





    agent.trigger('login_wel:init')


    exports.show = function (sta){
        $root.show();
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
    }


})