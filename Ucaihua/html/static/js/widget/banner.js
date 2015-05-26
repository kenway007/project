/**
 * Created by way on 15/4/16.
 *
 * 广告图组件
 * @iscroll
 * @zepto
 * @lang
 * @sys
 */



define(function(require, exports, module){
    'use strict';
    var iScroll = require('iScroll')


    function banner(root,opt){
        setTimeout(function(){
            var def = {
                    snap: true,
                    momentum: false,
                    vScroll : false,
                    hScrollbar: false
                },
                _opt = opt || {},
                $root,
                loop,
                $content,
                event = {},
                autoTime = _opt.autoTime || 1500,
                $content_item,
                $btns,
                $btn,
                btn_tpl = '<div class="banner-btn"></div>',
                btn_html = '',
                currPageX = _opt.curPageX || 0,
                autoPlay = _opt.autoPlay == undefined ? true : _opt.autoPlay,
                clientWidth,
                _iScroll


            $root = this.$root = $('#'+root);
            clientWidth = _opt.clientWidth || $root.width()
            $content = $root.find('.banner-content');
            $content_item = $content.find('.banner-content-item');

            $content_item.each(function (k,v){
                $content_item.eq(k).css('width',clientWidth);
                btn_html = btn_html + btn_tpl;
            })
            $content.css('width',$content_item.size()*clientWidth);
            $btns = $root.find('.banner-btns');
            if ($btns.size() <= 0 && _opt.btns){
                $btns = $(_opt.btns)
            }
            if ($btns.size() >0){
                $btns.append(btn_html);
                $btn = $btns.find('.banner-btn');
            }
            if ($root.css('position') == 'static'){
                $root.css('position','relative')
            }


            event.onScrollStart = _opt.onScrollStart;
            event.onScrollEnd = _opt.onScrollEnd;
            event.onPageChange = _opt.onPageChange;

            _opt.onScrollStart = function (e){
                //console.log(_iScroll);
                //currPageX = _iScroll.currPageX;
                //debugger
                loop ? loop.stop() : '';
                event.onScrollStart ? event.onScrollStart(e) : '';
            }

            _opt.onScrollEnd = function (e){
                //console.log(_iScroll)
                currPageX = _iScroll.currPageX
                loop ? loop.start() : '';
                btn(currPageX);
                event.onScrollEnd ? event.onScrollEnd(e) : '';
            }
            _opt.onPageChange = function (e){
                btn(currPageX);
                event.onPageChange ? event.onPageChange(e) : '';
            }

            _iScroll = this.iScroll = new iScroll.iScroll(root,lang.extend(def,_opt));
            _iScroll.scrollToPage(currPageX);



            if (autoPlay &&  $btn && $btn.size() > 0){
                loop = new lang.loop(function (){
                    currPageX++;
                    if (currPageX> loop.maxPageX){
                        currPageX= 0
                    }
                    _iScroll.scrollToPage(currPageX);

                },autoTime);
                loop.maxPageX = $content_item.size() - 1;
                loop.start();
            }
            btn(currPageX);


            function btn(index){
                if (!$btn){
                    return;
                }
                if ($btn.size() > 0){
                    $btn.removeClass('active');
                    $btn.eq(index).addClass('active');
                }
            }
        },50)
    }


    module.exports = banner
})

