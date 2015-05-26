/**
 * Created by way on 15/4/7.
 *
 * 动态页
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_recent = require('tpl/dyn.tpl'),
        $doc = $(document),
        $dyn_main,
        MLIST = require('mList'),
        DATA = require('data'),
        $dyn_head_tab,
        $dyn_list,
        has_search = false,
        tpl_dci = require('tpl/dyn_content_item.tpl'),
        $root = $('#page-dyn')


    common.loadShow();
    $root.append(tpl.render(tpl_recent));
    $dyn_main = $root.find('.dyn-main');
    $dyn_head_tab = $root.find('.dyn-head-tab');
    $dyn_list = $dyn_main.find('.dyn-list');


    $dyn_list.each(function (k,v){
        var $cur = $dyn_list.eq(k);
        $cur.data('page',1);
        $cur[0].datas = new DATA('did')
    })


    var active;

    //头部tab点击
    $doc.on('click','#page-dyn .dyn-head-tab',function (){
        agent.trigger('head-tab:click',$(this).index())
    })

    var keyup_out = 0
    $doc.on('keyup','#page-dyn .dyn-sh-input',function (e){
        //e.stopPropagation();
        //e.preventDefault();
        //console.log(1111)
        clearTimeout(keyup_out);
        keyup_out = setTimeout(function(){
            agent.trigger('dyn:sh:check');
        },100)
    })


    agent.on('dyn:sh:check',function (){
        var $this = $root.find('.dyn-sh-input'),
            val =  $this.val(),
            datas,
            rst
        if (!val && !has_search){
            return
        }
        datas = active.$root[0].datas
        rst = []
        datas.list.forEach(function (v,k){
            var data = v.data;
            var check = data.all_type_name + '\n'+ data.content+ '\n'+ data.realname;
            var reg = new RegExp(val,'g');
            if (reg.test(check)){
                rst.push(data);
            }
        })
        if (val){
            has_search = true;
        }else{
            has_search = false;
        }
        active.$root.find('.dyn-main-scroll').html(tpl.render(tpl_dci,{rows:rst}));
        list_refresh();
    })

    //当前列表刷新
    function list_refresh(){
        setTimeout(function(){
            active.$root[0].mlist.iScroll.refresh();
        },700)
    }
    
    

    agent.on('head-tab:click',function (index){
        $dyn_head_tab.removeClass('active');
        $dyn_head_tab.eq(index).addClass('active');
        //配置

        var catid,mid
        if (index == 0 ){
            catid = '';
            mid =  'dyn_all'
        }else{
            catid = 222;
            mid =  'dyn_my'
        }
        active = {
            $root : $dyn_list.eq(index),
            catid : catid,
            index : index,
            mid : mid
        }
        $dyn_list.removeClass('active');
        $dyn_list.eq(index).addClass('active');
        if (!active.$root.data('init')){
            agent.trigger('dyn');
        }
    })

    agent.trigger('head-tab:click',0);


    //列表更新
    agent.on('dyn',function (type,onEnd){
        var html_fn;
        if (type == 'update'){
            html_fn = 'prepend'
        }
        else {
            html_fn = 'append'
        }
        var _$root = active.$root;
        net.ajax({
            url : C.api.get_demand_list,
            data : {
                page : type == 'update' ? 0 : _$root.data('page'),
                page_count : '10',
                aid : C.city.aid,
                catid : active.catid
            },
            isOnFront : 0,
            success : _success,
            error : _error
            
        })

        function _success(data){
            //console.log('个人动态',data)
            if (data.status == 200){
                var newData = _$root[0].datas.add(data.rows);
                if (!data.realname){
                    data.realname = data.username
                }

                var $content = _$root.find('.dyn-main-scroll');
                var rows = [];
                newData.forEach(function (v,k){
                    rows.push(v.data);
                })
                var $new_item = $(tpl.render(tpl_dci,{
                    rows:rows,
                    pageType : 'dyn'
                }));
                if (!_$root.data('init')){
                    $content.html($new_item);
                    common.loadHide();
                    if (data.rows.length > 0){
                        _$root[0].mlist = new MLIST(_$root[0],{
                            id : 'dyn',
                            onUpdate : function (end){
                                _$root[0].mlist.end = end;
                                agent.trigger('dyn','update',end);
                            },
                            onLoadMore : function (end){
                                _$root[0].mlist.loadMore_end = end
                                var page =_$root.data('page');
                                _$root.data('page',++page);
                                agent.trigger('dyn','loadmore',end);
                            }
                        });
                        _$root.data('init','1');
                    }

                }
                if (type){
                    if (newData.length > 0){
                        if (has_search){
                            $content.html('');
                            has_search = false;
                        }
                        $content[html_fn]($new_item);
                    }else{
                        common.alert(C.alert_noData);
                    }
                }
                if (_$root[0].mlist){
                    $new_item.find('.dyn-content-r img').last().load(function (){
                        _$root[0].mlist.iScroll.refresh()
                    })
                }
                setTimeout(function(){
                    agent.trigger('dyn:sh:check');
                },20)

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
    agent.trigger('dyn');


    //子项删除
    agent.on('dyn_item:del',function (did){
        $root.find('.dyn-item[did="'+did+'"]').remove();
        list_refresh();
    })



    exports.show = function (){
        $root.show();
        common.navAct(0);
        setTimeout(function(){
            $dyn_main.show();
            list_refresh();
        },20)
    }

    exports.hide = function (){
        $root.hide();
        setTimeout(function(){
            $dyn_main.hide();
        },20)
        common.navHide();
    }


})