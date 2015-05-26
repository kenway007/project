/**
 * Created by way on 15/5/15.
 * 关注操作
 */


define(function(require, exports, module){
    'use strict';


    var extend = lang.extend,
        $doc = $(document)
    //关注按钮
    $doc.on('click','.j-favorite',function (){
        var ajax_opt,$this
        $this = $(this);
        common.alert(C.alert_post);
        ajax_opt = {
            url : C.api.favorite,
            isOnFront : 0,
            type : 'post',
            isCache : 0,
            data : {},
            success : _success,
            error : _error
        }
        var data = {
            data : this.ajax_data
        }
        ajax_opt = extend(ajax_opt,data);
        ajax_opt.data.idtype = 'member';
        net.ajax(ajax_opt);



        function _success(data){
            var isFollow = $this.attr('follow');
            common.alert(data.error_msg);
            if (isFollow == 1){
                $this.attr('follow',0);
                $this.text('关注');
            }else{
                $this.attr('follow',1);
                $this.text('已关注');
            }
            //console.log('关注',data)
        }
        function _error(){
            common.alert(C.aet);
        }

    })
})
