/**
 * Created by way on 15/4/13.
 *
 *
 * 列表组件
 * @FontAwesome
 * @iScroll
 * @zepto
 * @time
 *
 *
 */



define(function(require, exports, module){
    'use strict';

    var iScroll = require('iScroll'),
        tpl_update = require('tpl/mlist_update.tpl')

    function mlist(el,opt){
        var that = this,
            event = {},
            update_h,
            update_hx2,
            $update,
            $update_text,
            update_text = '',
            $scroller,
            update_end,
            $update_last_time,
            $update_arrow,
            last_time_id,
            $wrapper,
            $loadMore,
            update_opc = 0,
            ls = localStorage,
            _iScroll


        var opt = lang.extend({
            scrollbarClass : 'mlist-scrollBar',
            vScrollbar : true,
        },opt)


        var update_sta = opt.update_sta || {
                start : '下拉刷新',
                loading : '正在加载数据...',
                end : '松开刷新'
        }

        var loadMore_sta = opt.loadMore_sta || {
                start : '上拉刷新',
                loading : '正在加载数据...',
                end : '松开加载'
            }

        this.id = '_mList_'+opt.id;
        last_time_id  = that.id + '_last_time'

        event.onScrollStart = opt.onScrollStart;
        event.onScrollMove = opt.onScrollMove;
        event.onScrollEnd = opt.onScrollEnd;
        event.onBeforeScrollEnd = opt.onBeforeScrollEnd;
        event.onUpdate = opt.onUpdate ;
        event.onLoadMore = opt.onLoadMore ;


        opt.onScrollStart = function (e){
            if (!that.loading){
                event.onScrollStart ? event.onScrollStart(e) : '';
                update_opc = 1;
                $update.addClass('onstart');
                //$update.css('opacity',update_opc);
                update_time();
            }
            event.onScrollStart ? event.onScrollStart(e) : '';
        }

        opt.onScrollMove = function (e){
            /*if (_iScroll.y < -80 && update_opc != '0'){
                update_opc = 0
                $update.css('opacity',update_opc)
            }
            if (_iScroll.y > -80 && update_opc!= 1){
                update_opc = 1;
                $update.css('opacity',update_opc)
            }*/
            if (!that.loading){
                var y = _iScroll.y,
                    hasAct = $update_arrow.hasClass('active')
                if (y >= update_hx2 && !hasAct){
                    update_text = update_sta.end;
                    updateTextFn(update_text);
                    setTimeout(function(){
                        $update_arrow.addClass('active');
                    },10)
                }
                if (y <= update_h + 20 && hasAct){
                    reset();
                }
            }
            //console.log(-_iScroll.y)

            if (-_iScroll.y >= -_iScroll.maxScrollY + 50 && _iScroll.dirY === 1){
                that.loadMore = false;
            }
            //console.log(_iScroll.y)
            event.onScrollMove ? event.onScrollMove(e) : '';
        }

        this.loading = false
        this.loadMore = true

        opt.onBeforeScrollEnd = function (e){
            event.onBeforeScrollEnd ? event.onBeforeScrollEnd(e) : '';
            if ($update_arrow.hasClass('active') && !that.loading){
                that.loading = true;
                updateTextFn(update_sta.loading);
                $update_arrow.addClass('fa-refresh fa-spin');
                //$scroller.css('top',update_h+1);
                $update.addClass('onloading')
                event.onUpdate ? event.onUpdate(update_end,e) : '';
                _iScroll.refresh();
                return
            }
            //console.log(_iScroll)
            if (!that.loadMore){
                $loadMore.css('display','-webkit-box');
                that.loadMore = true;
                $scroller.css('top',-50);
                event.onLoadMore ? event.onLoadMore(onLoadMore_end,e) : '';
                return
            }
            if (!that.loading){
                reset();
            }
        }

        _iScroll = this.iScroll = new iScroll.iScroll(el,opt);
        $scroller = $(this.iScroll.scroller);
        //console.log(_iScroll)

        //render
        $wrapper = $(that.iScroll.wrapper)
        setTimeout(function(){
            $update = $(tpl.render(tpl_update)).prependTo($wrapper);
            update_h = $update.css('height').replace('px','')*1;
            update_hx2 = update_h*1.5;
            $update_text = $update.find('.mlist-update-text');
            $update_arrow = $update.find('.arrow');
            $update_last_time = $update.find('.last-time');
            update_time();

            var tpl_loadMore =
                '<div class="mlist-loadMore">' +
                    '<i class="fa fa-lg fa-spin fa-refresh"></i>' +
                    '<div>'+loadMore_sta.loading+'</div>'+
                '</div>'
            $loadMore = $(tpl.render(tpl_loadMore)).appendTo($wrapper);
        },100)

        //更新状态文本
        function updateTextFn(text){
            $update_text.text(text)
        }


        //更新状态结束
        function update_end(){
            _iScroll.options.topOffset = 0;
            //$scroller.css('top',0);
            //$update.css('opacity',0)
            _iScroll.refresh();
            update_time();
            ls[last_time_id] = new Date().getTime();
            reset();
            that.loading = false;
        }

        //加载更多结束
        function onLoadMore_end(){
            $scroller.css('top',0);
            $loadMore.hide();
            _iScroll.refresh();
        }



        //更新时间
        function update_time(){
            var now,
                last_time
            now = new Date().getTime();
            if (ls[last_time_id]){
                last_time = ls[last_time_id];
                $update_last_time.text(time.diff(last_time));
            }else{
                ls[last_time_id] = now
            }
        }

        //状态重置
        function reset(){
            setTimeout(function(){
                $update_arrow.removeClass('active fa-refresh fa-spin');
                updateTextFn( update_sta.start);
                update_opc = 0;
                $update.removeClass('onstart onloading');
            },300)

        }
    }




    module.exports = mlist;


})


