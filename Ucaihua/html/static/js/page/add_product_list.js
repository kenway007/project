/**
 * Created by way on 15/4/19.
 *
 *
 * 百度地图页面
 */



/**
 * Created by way on 15/4/14.
 *
 * 添加产品列表
 */





define(function(require, exports, module){
    'use strict';

    var tpl_add_product_list = require('tpl/add_product_list.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        root_id = '#page-add-product-list',
        $root = $(root_id)



    $doc.on('click',root_id+' .addPL-item',function (){
        var $this = $(this),
            qbox = common.query_box
        qbox.ok = function (){
            common.alert(C.alert_post);
            net.ajax({
                type : 'post',
                url : C.api.custom_made+'&op=del&uid='+ common.getUserInfo().uid,
                data : {
                    cid : $this.attr('cid')
                },
                isOnFront : 0,
                success : _success,
                error : _error
            })

            function _success(data){
                //console.log(data)
                if (data.status == 200){
                    $this.remove();
                    agent.trigger('home:filterBar:update');
                }else{
                    _error()
                }
                common.alert(data.error_msg);
            }

            function _error(data){
                common.alert(C.alert_aet)
            }

        }
        qbox.show('您确定要删除该项吗?');
    })

    agent.on('addProductList:update',function (){
        net.ajax({
            url : C.api.attention,
            success : _success,
            error : _error
        })

        function _success(data){
            //console.log(data)
            if (data.status == 200){
                var _data = lang.extend(data,{head2:{
                    title : '已关注的行业',
                    right : '<div data-href="#/sel_product"  class="j-href fa fa-plus addPL-add"></div>'
                }})
                $root.html('');
                $root.html(tpl.render(tpl_head2+tpl_add_product_list,_data));
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })

    agent.trigger('addProductList:update')

    exports.show = function (params){
        $root.show();
    }

    exports.hide = function (){
        $root.hide();
    }


})
