/**
 * Created by way on 15/4/7.
 *
 * 选择城市
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_sel_city = require('tpl/sel_city.tpl'),
        tpl_head2 = require('head2'),
        scroll_sel = require('widget/scroll_sel'),
        ui = require('ui'),
        form = require('form'),
        stepVal,
        isLoad = false,
        selList,
        pageType,
        $scroll_sel_root,
        $scroll_sel_box ,
        $root = $('#page-sel-city')


    //完成按钮
    $root.on('click','.sel-city-ok',function (){
        var rst = selList.rst;
        var sel_data = common.get_sel_sf();
        var reqData = {
            c_type : sel_data.c_type,
            catid :sel_data.catid,
            sub_catids :sel_data.sub_catids,
            aid : $scroll_sel_box.eq(1).find('.scroll-sel-list').eq(rst[0]).find('.scroll-sel-li').eq(rst[1]).attr('aid')
        }

        common.alert(C.alert_post);
        net.ajax({
            url : C.api.userinfo+'&op=save',
            isCache : 0,
            data : reqData,
            success : _success,
            error : _error
        })

        function _success(data){
            if (data.status == 200){
                setTimeout(function(){
                    location.hash = '#/home';
                    location.reload();
                },100)
            }
            common.alert(data.error_msg);
        }

        function _error(){
            common.alert(C.alert_aet);
        }
    });


    //确定按钮
    $root.on('click','.sel-city-tr-ok',function (){
        var rst = selList.rst,
            $li = $scroll_sel_box.eq(1).find('.scroll-sel-list').eq(rst[0]).find('.scroll-sel-li').eq(rst[1]),
            json  = {
                aid : $li.attr('aid'),
                name : $li.text()
            }
        common.setCity(json);
        location.hash = '#/home';
        location.reload();
    })





    agent.on('sel_city:init',function (){
        net.ajax({
            url : C.dir_app,
            isCache : 1,
            data : {
                act : 'get_city_list1'
            },
            success : _success,
            error : _error
        })

        function _success(data){
            var tpl_right = ''
            isLoad = true;
            if (pageType == 2){
                tpl_right = '<div class="sel-city-tr-ok">确定</div>'
            }
            var _data = lang.extend(data,{
                head2:{
                    title : '选择城市',
                    right : tpl_right
                },
                pageType : pageType
            })
            $root.html(tpl.render(tpl_head2+tpl_sel_city,_data));
            $scroll_sel_box = $root.find('.scroll-sel-box');
            selList = new scroll_sel($root.find('.scroll-sel-root'));
            $scroll_sel_root = $root.find('.scroll-sel-root');
            ui.center($scroll_sel_root);
        }

        function _error(){
            common.alert(C.aet)
        }

    })


    agent.trigger('sel_city:init');

    exports.show = function (p){
        stepVal = p.stepVal;
        pageType = p.pageType || 2

        $root.show();
        if (isLoad){
        }
        common.loadHide();
    }

    exports.hide = function (){
        $root.hide();
    }


})