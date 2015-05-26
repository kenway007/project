/**
 * Created by way on 15/4/20.
 *
 *
 * 公司列表页
 */




define(function(require, exports, module){
    'use strict';

    var tpl_company_list = require('tpl/company_list.tpl'),
        tpl_company_item = require('tpl/company_item.tpl'),
        tpl_head2 = require('head2'),
        MLIST = require('mList'),
        mlist = {},
        mlist_page = 1,
        mlist_data = {},
        $company_list_main,
        DATA = require('data'),
        subject_list_data,
        $root = $('#page-company-list')


    mlist_data = new DATA('sid')

    agent.on('company_list',function (type,onEnd){
        var html_fn;
        if (type == 'update'){
            html_fn = 'prepend'
        }else if(type == 'loadmore'){
            html_fn = 'append'
        }
        else {
            html_fn = 'append'
        }
        net.ajax({
            url : C.api.subject_list,
            data : lang.extend(subject_list_data,{
                page : type == 'update' ? 0 :  mlist_page,
                page_count : 10
            }),
            isOnFront : 0,
            success : _success,
            error : _error
        })

        function _success(data){
            console.log('subject_list',data)
            if (data.status == 200){
                var newData = mlist_data.add(data.data);
                var _data = lang.extend(data,{
                    head2:{
                        title : '更多公司'
                    },
                    tpl_company_item : tpl_company_item
                })
                if (type == 'init'){
                    $root.html(tpl.render(tpl_head2+tpl_company_list,_data));
                    $company_list_main = $root.find('.company-list-main');
                    mlist = new MLIST('company-list-wp',{
                        vScrollbar : true,
                        id : 'company_list',
                        onUpdate : function (end){
                            mlist.end = end;
                            agent.trigger('company_list','update',end);
                        },
                        onLoadMore : function (end){
                            mlist.loadMore_end = end
                            mlist_page++;
                            agent.trigger('company_list','loadmore',end);
                        }
                    });
                }else{
                    if (newData.length > 0){
                        $company_list_main[html_fn](tpl.render(tpl_company_item,{companys:newData}));
                    }else{
                        common.alert(C.alert_noData);
                    }
                }
                mlist.iScroll.refresh()
            }else{
                _error()
            }
            onEnd ? onEnd() : '';
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })




    exports.show = function (p){
        subject_list_data = {
            catid : p.catid,
            sub_catids : p.sub_catids,
            typeid : p.typeid,
            aid : C.city.aid,
            amap_lat : p.amap_lat,
            amap_lng : p.amap_lng
        }
        mlist_page = 1;
        $root.show();
        agent.trigger('company_list','init');
        mlist_data.remove();
    }

    exports.hide = function (){
        $root.hide();
        common.clearHTML($root);
    }


})
