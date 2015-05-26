


define(function(require, exports, module){
    'use strict';


    function init($root,data,def_index){
        var tpl_filterBar = require('tpl/filterBar.tpl'),
            tpl_filterBar_content = require('tpl/filterBar_content.tpl'),
            $filterBar_title,
            $filterBar_title_icon,
            that = this,
            $filterBar_content

        this.$root = $root;

        //console.log(data)

        function _reset(){
            that.rst = [];
            data.forEach(function (v,k){
                that.rst.push(v.sub[0].catid)
            })
        }
        _reset();
        this.data = data;

        $root.html(tpl.render(tpl_filterBar,{data:data}));


        $filterBar_content =  $root.find('.filterBar-content');
        $filterBar_title =  $root.find('.filterBar-title');
        $filterBar_title_icon = $filterBar_title.find('.filterBar-title-icon');


        //初始化内容区
        setTimeout(function(){
            $filterBar_content.eq(0).append(tpl.render(tpl_filterBar_content,{data:data[0].sub}))
            $filterBar_content.eq(2).append(tpl.render(tpl_filterBar_content,{data:data[2].sub}))

            $filterBar_content.each(function (k,v){
                var $cur = $filterBar_content.eq(k);
                //console.log($cur.css('height'))
                $cur.data({
                    'height' : $cur.css('height'),
                    act : true
                }).css('height',0)
            })
            //自触发按钮
            setTimeout(function(){
                item_click($root.find('.filterBar-content-item').eq(def_index));
            },10)
        },20)






        //$root = $root.find('.filterBar');
        if (!$root.data('hasLock')){
            $root.bind('touchstart',function (){
                document.lock['filterBar:hide'] = true;
            })
            $root.bind('touchend',function (){
                document.lock['filterBar:hide'] = false;
            })
            $root.data('hasLock',true);
        }
        $root.off('click');
        $root.on('click','.filterBar-title',function (){
            var $this = $(this),
                $cur_icon,
                $cur_content = $this.closest('.filterBar-item').find('.filterBar-content');
            $filterBar_title.removeClass('active');
            $filterBar_title_icon.removeClass('active');
            $cur_icon = $this.find('.filterBar-title-icon');
            var act = $cur_content.data('act');
            if (act){
                _hide();
                $this.addClass('active');
                $cur_icon.addClass('active');
                setTimeout(function(){
                    $cur_content.css('height',$cur_content.data('height')).data('act',false);
                    common.maskShow({top:85});
                },320)

            }else{
                $this.removeClass('active');
                $cur_icon.removeClass('active');
                _hide()
            }

        })


        $root.on('click',' .filterBar-content-item',function (e){
            item_click($(this));
        })

        function item_click($this){
            var $cur_title,
                $cur_title_text,
                $cur_item
            $cur_item = $this.closest('.filterBar-item');
            $cur_title = $cur_item.find('.filterBar-title');
            $cur_title_text = $cur_title.find('.filterBar-title-text');
            $cur_title_text.text($this.text());
            _hide();


            var cur_item_index = $cur_item.index();
            if (cur_item_index === 0){
                _reset();
                var _data = data[0].sub[$this.index()].sub_categories
                $filterBar_content.eq(1).
                    html(tpl.render(tpl_filterBar_content,{data:_data}))
                    .css('height','auto')
                    .data('height' , $filterBar_content.eq(1).css('height'))
                    .css('height',0)
                $filterBar_title.eq(1).find('.filterBar-title-text').text(_data[0].name);
            }
            that.rst[cur_item_index] = $this.attr('catid');
            //agent.trigger('home:c:e');
            agent.trigger('home:expert:update',{
                reset : true,
                page : 1,
                clearData : true
            })
        }

        agent.off('filterBar:hide',_hide)
        agent.on('filterBar:hide',_hide)


        function _hide(){
            $filterBar_title.find('.filterBar-title-icon').removeClass('active');
            $filterBar_title.removeClass('active');
            setTimeout(function(){
                $filterBar_content.css('height',0).data('act',true);
                common.maskHide();
            },10)
        }
    }



    init.prototype.update = function (){

    }

    module.exports = init;
})
