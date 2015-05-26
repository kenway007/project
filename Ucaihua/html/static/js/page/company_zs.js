/**
 * Created by way on 15/4/16.
 *
 * 授权证书详情
 */




define(function(require, exports, module){
    'use strict';

    var tpl_company_zs = require('tpl/company_zs.tpl'),
        tpl_head2 = require('head2'),
        Banner = require('widget/banner'),
        banner,
        sid,
        catid,
        stores,
        $root = $('#page-company-zs')




    agent.on('company_zs:init',function (){
        net.ajax({
            url : C.api.subject_brand+'&op=get',
            type : 'post',
            data : {
                sid : sid,
                catid : catid
            },
            success : _success,
            error : _error
        })

        function _success(data){

            if (data.status == 200){
                var _data = lang.extend(data,{head2:{
                    title : '授权详情'
                }})
                $root.html(tpl.render(tpl_head2+tpl_company_zs,_data));
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })




    exports.show = function (p){
        sid = p.sid;
        catid = p.catid;
        $root.show();
        agent.trigger('company_zs:init');

    }

    exports.hide = function (){
        $root.hide();
        common.clearHTML($root);
    }


})
