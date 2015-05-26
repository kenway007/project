/**
 * Created by way on 15/4/17.
 *
 *
 * 个人动态页
 */

define(function(require, exports, module){
    'use strict';

    var tpl_person_dyn = require('tpl/person_dyn.tpl'),
        tpl_head2 = require('head2'),
        uid,
        mlist_page = 1,
        $root = $('#page-person-dyn'),
        MLIST = require('mList'),
        mlist = {},
        mlist_data = {},
        $dyn_content,
        DATA = require('data'),
        tpl_dci = require('tpl/dyn_content_item.tpl')


    mlist_data = new DATA('did')


    agent.on('person_dyn',function (type,onEnd){

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
            url : C.api.get_demand_list,
            data : {
                uid : uid,
                page : type == 'update' ? 0 : mlist_page,
                page_count : '10',
                aid : C.city.aid
            },
            isOnFront : 0,
            success : _success,
            error : _error
        })

        function _success(data){
            //console.log('个人动态',data)
            if (data.status == 200){
                var newData = mlist_data.add(data.rows);
                if (!data.realname){
                    data.realname = data.username
                }
                var _data = lang.extend(data,{
                    head2:{
                        title : '个人动态'
                    },
                    tpl_dci : tpl_dci
                })
                _data.pageType = 'person_dyn';

                if (type == 'init'){

                    $root.html(tpl.render(tpl_head2+tpl_person_dyn,_data));
                    $dyn_content = $root.find('.dyn-content');
                    mlist = new MLIST('persondyn-wp',{
                        vScrollbar : true,
                        id : 'person_dyn',
                        onUpdate : function (end){
                            mlist.end = end;
                            agent.trigger('person_dyn','update',end);
                        },
                        onLoadMore : function (end){
                            mlist.loadMore_end = end
                            mlist_page++;
                            agent.trigger('person_dyn','loadmore',end);
                        }
                    });
                }else{
                    if (newData.length > 0){
                        $dyn_content[html_fn](tpl.render(tpl_dci,data));
                    }else{
                        common.alert(C.alert_noData);
                    }
                }
                mlist.iScroll.refresh()
            }else{
                _error()
            }
            onEnd ? onEnd() : '';
        }

        function _error(){
            common.alert(C.aet);
            onEnd ? onEnd() : '';
        }


    })


    /*$root.on('click','.dyn-content-item',function (){
        var $this = $(this),
            attr = $this.attr('data-href');
        $this.attr('data-href',attr+'!!uid='+uid+'!!page='+page+'!!aid='+ C.aid+'!!page_count=10');
    })*/





    exports.show = function (sta){
        uid = sta.uid;
        mlist_page = 1;
        mlist_data.remove();
        agent.trigger('person_dyn','init');
        $root.show();

    }

    exports.hide = function (){
        $root.hide();
        common.clearHTML($root)
    }


})