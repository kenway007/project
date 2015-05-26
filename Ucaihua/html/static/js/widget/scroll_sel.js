/**
 * Created by way on 15/4/22.
 *
 *
 * @iscroll
 * 滚动选择组件
 *
 *
 * @完善点：
 * 1、宽度不会跳
 * 2、每级切换，往下的子级都会换,并且获取焦点
 * 3、在移动中切换
 *
 */



define(function(require, exports, module){
    'use strict';

    var iScroll = require('iScroll');

    function sel(root,opt){
        var def = {
                snap: true,
                def_page: 0,
                vScroll : true,
                vScrollbar : false,
                bouncelock : true,
                //checkDOMChanges: 1,
                snapThreshold : 1,
                hScrollbar: false
            },
            that = this,
            $root ,
            _opt = opt || {},
            copy = {},
            $scroll_sel_box;

        this.$root = $root = $(root);
        this.$scroll_sel_box = $scroll_sel_box = $root.find('.scroll-sel-box');
        this.iScrolls = [];
        this.scrollers = [];
        this.rst = [];

        copy.onScrollStart = _opt.onScrollStart || false;
        copy.onScrollMove = _opt.onScrollMove || false;
        copy.onScrollEnd = _opt.onScrollEnd || false;

        _opt.onScrollStart = function (e){
            this.scrollerItemH = this.scrollerH / this.scroller.children.length
            this.sel_dval = 32;
            copy.onScrollStart ? copy.onScrollStart.call(this,e)  : '';
        }

        _opt.onScrollMove = function (e){
            var page_dval = Math.floor(this.y / this.sel_dval);
            var _selPageY = this.selPageY +  page_dval;
            if (_selPageY){
                
            }
            //console.log(this.scrollerItemH - this.options.snapThreshold)
            copy.onScrollMove ? copy.onScrollMove.call(this,e): '';
        }

        _opt.onScrollEnd = function (e){
            var $sel_li = $(this.scroller).find('.scroll-sel-li'),
                currPageY = this.currPageY,
                index = this.index;
            that.rst[index] = currPageY;
            $sel_li.removeClass('active');
            $sel_li.eq(this.currPageY).addClass('active');
            //console.log('end......')
            var next_iScroll = that.iScrolls[index+1]
            //如果有下级
            if (next_iScroll){
                var nextEl = next_iScroll.wrapper;
                var $nextEl = $(nextEl);
                var $next = $nextEl.find('.scroll-sel-list');
                var $cur_next = $next.eq(currPageY);
                $next.addClass('hide');
                $cur_next.removeClass('hide');
                _opt.scroller = $cur_next[0];
                var iscroll = new iScroll.iScroll(nextEl,lang.extend(def,_opt));
                iscroll.index = index+1;
                $nextEl.css('overflow','visible');
                iscroll.scrollToElement(iscroll.scroller.children[0]);
                //next_iScroll.scroller = $cur_next[0];
                //next_iScroll.refresh();

            }

            copy.onScrollEnd ? copy.onScrollEnd.call(this,e) : '';
        }


        //初始化
        $scroll_sel_box.each(function (k,v){
            var $cur = $scroll_sel_box.eq(k);
            var iscroll = new iScroll.iScroll($cur[0],lang.extend(def,_opt));
            iscroll.index = k;
            iscroll.selPageY = 0;
            iscroll.scrollerChildren = iscroll.scroller.children;
            that.iScrolls.push(iscroll);
            that.scrollers.push($(that.iScrolls[k].scroller));
            $cur.css('overflow','visible');
            var def_el = iscroll.scrollerChildren[def.def_page];
            iscroll.scrollToElement(def_el);
            iscroll.currPageY = def.def_page;
            that.rst.push(iscroll.currPageY);
            (function (k){
                /*setTimeout(function(){

                },10+k+2);*/
            }(k));
        })




    }

    module.exports = sel
})
