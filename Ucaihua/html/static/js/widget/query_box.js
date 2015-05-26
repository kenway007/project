/**
 * Created by way on 15/4/24.
 *
 * 询问框组件
 *
 * @ui.js
 *
 */


define(function(require, exports, module){
    'use strict';


    var ui = require('ui')



    function query_box(sel,$mask){
        var $query_box,_$mask,that,$doc

        $doc = $(document)
        that = this;
        this.$obj = $(sel)
        $query_box = this.$obj
        _$mask = $mask || $('#common-mask');
        var root_sel = '#'+this.$obj.attr('id')

        //询问框-确定按钮
        $doc.on('click',root_sel+' .confirm',_confirm)
        $doc.on('click',root_sel+' .cancle',_cancle)
        /*$query_box.find('.confirm').click(_confirm);
        //询问框-取消按钮
        $query_box.find('.cancle').click(_cancle);*/


        /*
        this.query_box_confirm = _confirm
        this.query_box_cancle = _cancle

        $doc.keyup(function (e){
            var code = e.keyCode
            switch (code){
                case(13): that.query_box_confirm() ;break;
                case(27): that.query_box_cancle ;break;
            }
        });*/

        this.show = query_box_show
        this.hide = query_box_hide

        //确认
        function _confirm(){
            that.ok ?  that.ok() : 0;
            query_box_hide();
        }
        //取消
        function _cancle(){
            that.cancle ?  that.cancle() : 0;
            query_box_hide();
        }
        //显示
        function query_box_show(content){
            var _text = content || '您确定执行该操作?';
            $query_box.find('.query-box-content').html(_text);
            $query_box.show();
            ui.center($query_box,{
                position : 'fixed'
            });
            that.onShow ? that.onShow() : '';
        }
        //隐藏
        function query_box_hide(){
            $query_box.hide();
            that.onHide ? that.onHide() : '';
        }
        return this;
    }


    module.exports = query_box;
})
