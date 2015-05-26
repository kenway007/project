/**
 * Created by way on 15/4/7.
 *
 * 选择我的身份
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_sel_identity = require('tpl/sel_identity.tpl'),
        tpl_head2 = require('head2'),
        scroll_sel = require('widget/scroll_sel'),
        form = require('form'),
        ui = require('ui'),
        selList,
        $scroll_sel_root,
        $selList_li,
        isLoad =false,
        $root = $('#page-sel-identity')



    $root.on('click','.sel-sf-next',function (){
        var formData = form.getFormData($root);
        var company_name = formData.company_name;
        var company_addr = formData.company_addr;
        if (!company_name){
            common.alert('请输入公司名称!');
            return
        }
        if (!company_addr){
            common.alert('请输入公司地址!');
            return
        }
        var json = {
            c_type : $selList_li.eq(selList.rst[0]).attr('typeid'),
            company_name : company_name,
            company_addr : company_addr
        }
        common.set_sel_sf(json);
        location.hash = '#/sel_product?pageType=1'
    })





    agent.on('sel_identity:init',function (){
        net.ajax({
            url : C.dir_app,
            data : {
                act : 'c_type'
            },
            success : _success,
            error : _error
        })

        function _success(data){
            if (data.status == 200){
                isLoad = true;
                var _data = lang.extend(data,{head2:{
                    title : '选择您的身份'
                }})
                $root.html(tpl.render(tpl_head2+tpl_sel_identity,_data));
                selList = new scroll_sel($root.find('.scroll-sel-root'));
                $scroll_sel_root = $root.find('.scroll-sel-root');
                $selList_li = $root.find('.scroll-sel-li');
                //ui.center($scroll_sel_root);
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })




    agent.trigger('sel_identity:init');

    exports.show = function (){
        $root.show();
        if (isLoad){
        }
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
    }


})