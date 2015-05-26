/**
 * Created by way on 15/4/7.
 *
 * 聊天页
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_recent = require('tpl/recent.tpl'),
        $root = $('#page-msg')

    $root.append(tpl.render(tpl_recent))


    exports.show = function (){
        $root.show();
        common.navAct(2)
    }

    exports.hide = function (){
        $root.hide();
        common.navHide();
    }


})