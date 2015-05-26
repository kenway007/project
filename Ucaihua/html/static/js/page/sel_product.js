/**
 * Created by way on 15/4/7.
 *
 * 选择我的产品
 *
 *
 * pagetype :
 * 1、新建产品
 * 2、添加产品
 */



define(function(require, exports, module){
    'use strict';

    var tpl_sel_product = require('tpl/sel_product.tpl'),
        tpl_head2 = require('head2'),
        scroll_sel = require('widget/scroll_sel'),
        selList,
        ui = require('ui'),
        $scroll_sel_root,
        stepVal,
        pageType,
        pageData = {},
        $root = $('#page-sel-product')


    function getSelListVal(index){
        var $box = $root.find('.scroll-sel-box');
        var rst = selList.rst;
        var setp2 = $box.last().find('.scroll-sel-list').eq(rst[0]).find('.scroll-sel-li').eq(selList.rst[1]).attr('catid');
        return setp2
    }

    //下一步按钮
    $root.on('click','.sel-sf-next',function (){
        _post();
    })

    function _post(){
        common.alert(C.alert_post);
        net.ajax({
            type : 'post',
            url : C.api.custom_made+'&op=save&uid='+ common.getUserInfo().uid,
            data : {
                batch_product : JSON.stringify([{
                    catid : getSelListVal()
                }])
            },
            success : _success,
            error : _error
        })
        function _success(data){
            if (data.status == 200){
                common.alert(data.error_msg);
                if (data.error_msg == '提交成功'){
                    agent.trigger('addProductList:update');
                    agent.trigger('home:filterBar:update');
                    location.hash = '#/home';
                    if (pageType == 2){
                        setTimeout(function(){
                            location.hash = '#/add_product_list';
                        },50)
                    }
                }
            }else{
                _error()
            }
        }

        function _error(){
            common.alert(C.aet)
        }
    }

    //确定按钮
    $root.on('click','.sel-product-ok',function (){
        _post();
    })

    agent.on('sel_product:init',function (){
        net.ajax({
            url : C.dir_app,
            data : {
                act : 'category_new',
                catid : 'all'
            },
            success : _success,
            error : _error
        })

        function _success(data){

            if (data.status == 200){
                var tpl_right
                if (pageType == 2){
                    tpl_right = '<div class="sel-product-ok">确定</div>'
                }
                var _data = lang.extend(data,{
                    head2:{
                        title : pageData.head2Title,
                        right : tpl_right
                    },
                    pageType : pageType
                })
                console.log(data);
                $root.html(tpl.render(tpl_head2+tpl_sel_product,_data));
                selList = new scroll_sel($root.find('.scroll-sel-root'));
                $scroll_sel_root = $root.find('.scroll-sel-root');
                ui.center($scroll_sel_root);
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
        pageType = p.pageType || 2
        if (pageType == 1){
            stepVal = p.stepVal;
            pageData.head2Title = '选择您的产品'
        }else{
            pageData.head2Title = '已关注的行业'
        }

        $root.show();
        agent.trigger('sel_product:init');
    }

    exports.hide = function (){
        $root.hide();
        setTimeout(function(){
           $root.html('')
        },50)
    }


})