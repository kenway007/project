/**
 * Created by way on 15/4/7.
 *
 * 排行榜
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_rank = require('tpl/rank.tpl'),
        $root = $('#page-rank'),
        tpl_head2 = require('head2')




    agent.on('rank:init',function (){
        net.ajax({
            url : C.api.fans_top,
            success : _success,
            error : _error
        })

        function _success(data){

            if (data.status == 200){
                $root.append(tpl.render(tpl_head2+tpl_rank,lang.extend(
                    data,{
                        head2 : {
                            title : 'TOP 50'
                        }
                    }
                )))
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })

    agent.trigger('rank:init')


    exports.show = function (){
        $root.show();
    }

    exports.hide = function (){
        $root.hide();
    }


})