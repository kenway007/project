/**
 * Created by way on 15/4/7.
 *
 * 我的设置
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_me = require('tpl/me.tpl'),
        $doc = $(document),
        $root = $('#page-me')



    agent.on('me:init',function (){
        net.ajax({
            url : C.api.get_userinfo,
            data : {
                uid : common.getUserInfo().uid
            },
            success : _success,
            error : _error
        })

        function _success(data){

            if (data.status == 200){
               $root.html(tpl.render(tpl_me,data))
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })

    agent.trigger('me:init')


    exports.show = function (){
        $root.show();
        common.navAct(3)
    }

    exports.hide = function (){
        $root.hide();
        common.navHide();
    }


})