/**
 * Created by way on 15/4/17.
 *
 *
 * APP下载页
 */

define(function(require, exports, module){
    'use strict';

    var tpl_login_wel = require('tpl/download.tpl'),
        Banner = require('banner'),
        banner,
        $root = $('#page-download')




    $root.append(tpl.render(tpl_login_wel));
    banner = new Banner('login-wel-wp',{
        autoTime : 3000,
        btns : '#page-download .login-wel-focus'
    })






    exports.show = function (sta){
        $root.show();

    }

    exports.hide = function (){
        $root.hide();
    }


})