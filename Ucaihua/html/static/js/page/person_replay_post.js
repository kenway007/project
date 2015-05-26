/**
 * Created by way on 15/4/14.
 *
 * 个人评论提交页
 */





define(function(require, exports, module){
    'use strict';

    var tpl_person = require('tpl/person_reply_post.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        uid,
        did,
        $post_content,
        posting = false,
        $root = $('#page-person-reply-post')



    agent.on('prp:update',function (){
        var _data = {head2:{
            title : '发送评论',
            right : '<div class="prp-post" >确定</div>'
        }}
        $root.html(tpl.render(tpl_head2+tpl_person,_data));
        $post_content = $root.find('.prp-main-intext')
    })


    $doc.on('click','.prp-post',function (){
        var val = $post_content.val()
        if (!val){
            common.alert(C.alert_qsrnr);
            return;
        }
        common.alert(C.alert_post);
        if (posting){
            return
        }
        posting =true;
        net.ajax({
            url : C.api.demand_comment+'&op=add',
            type : 'post',
            data : {
                uid : common.getUserInfo().uid,
                did : did,
                comment_type : '0',
                demand_id: did,
                content : val
            },
            isOnFront : 0,
            isCache : 0,
            success : _success,
            error : common.error
        })

        function _success(data){
            if (data.status == 200){
                posting =false;
                common.alert(data.error_msg);
                history.back();
                agent.trigger('person_reply:comm')
            }else{
                common.alert(data.error_msg)
            }
        }


    })





    exports.show = function (params){
        did = params.did;
        $root.show();
        agent.trigger('prp:update');

    }

    exports.hide = function (){
        $root.hide();
        setTimeout(function(){
            $root.html('')
        },20)
    }


})