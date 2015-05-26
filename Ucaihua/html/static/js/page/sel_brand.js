/**
 * Created by way on 15/4/7.
 *
 * 选择品牌
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_sel_brand = require('tpl/sel_brand.tpl'),
        tpl_head2 = require('head2'),
        scroll_sel = require('widget/scroll_sel'),
        form = require('form'),
        stepVal,
        $sel_brand_item,
        $root = $('#page-sel-brand')



    $root.on('click','.sel-brand-ok',brand_ok)
    function brand_ok(){
        var sel_index = form.getFormData($root).cate_name,sub_catids
        if ($sel_brand_item){
            sub_catids = $sel_brand_item.eq(sel_index).attr('catid')
        }else{
            sub_catids = 222;
        }
        common.set_sel_sf({
            sub_catids : sub_catids
        })
    }


    agent.on('sel_brand:init',function (){
        net.ajax({
            url : C.dir_app,
            data : {
                act : 'category',
                catid : common.get_sel_sf().catid
            },
            success : _success,
            error : _error
        })

        function _success(data){
            if (!data.categories || data.categories.length <= 0){
                common.alert('该类目暂时还没有品牌列表，请重新选择');
                location.hash = '#/sel_product?pageType=1' ;
                return;
            }
            //console.log(data)
            var _data = lang.extend(data,{head2:{
                title : '选择品牌',
                right : '<div data-href="#/sel_city?pageType=1" class="j-href sel-brand-ok">确定</div>'
            }})
            $root.html(tpl.render(tpl_head2+tpl_sel_brand,_data));
            $sel_brand_item = $root.find('.sel-brand-item');
            setTimeout(function(){
                form.ui($root);
                $root.find('.sel-brand-item').eq(0).trigger('click');
            },50)
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }

    })



    exports.show = function (p){
        stepVal = p.stepVal;
        $root.show();
        common.loadHide();
        agent.trigger('sel_brand:init');
    }

    exports.hide = function (){
        $root.hide();
        setTimeout(function(){
            $root.html('')
        },20)
    }


})