/**
 * Created by way on 15/4/19.
 *
 *
 * 个人回复页
 */




define(function(require, exports, module){
    'use strict';
    var tpl_person_reply = require('tpl/person_reply.tpl'),
        tpl_head2 = require('head2'),
        tpl_dyn_item = require('tpl/dyn_content_item.tpl'),
        $doc = $(document),
        Banner = require('banner'),
        banner,
        uid,
        did,
        key,
        cur_data,
        is_show = false,
        $prp_comm_per,
        favorite = require('favorite'),
        ui = require('ui'),
        $root = $('#page-person-reply')



    agent.on('person_reply:update',function (){
        net.ajax({
            url : C.api.demand_comment,
            data : {
                uid : uid,
                did : did
            },
            success : _success,
            error : _error,
            onUpdate : function (){
                agent.trigger('person_reply:update');
            }
        })

        function _success(data){
            //console.log('demand_comment',data)
            if (data.status == 200){
                cur_data = data
                var _data = lang.extend(data,{head2:{
                    title : 'IT达人分享',
                    right : '<div class="fa fa-ellipsis-h pson-rep-more"></div>'
                },
                    did:did,
                    tpl_dyn_item : tpl_dyn_item
                })
                $root.html(tpl.render(tpl_head2+tpl_person_reply,_data));

                $root.find('.j-favorite')[0].ajax_data = {
                    id : data.comment.uid
                }
                $prep_more_pl = $root.find('.prep-more-pl');
                $prp_comm_per = $root.find('.prp-comm-per');
                head_box_init();
                agent.trigger('wx_set_share');
                if (data.comment.pictures){
                    banner = new Banner('prp-imgs-box',function (){
                        snapThreshold : 50
                    });
                }
                setTimeout(function(){
                    ui.center($root.find('#prp-imgs-box .company-ad-btns'),{
                        top:'88%'
                    });
                },100)

            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })


    function head_box_init(){
        setTimeout(function(){
            var box_w = $prp_comm_per.width(),
                $img_box = $prp_comm_per.find('.prpch-img-box'),
                item_w = $img_box.width()+10,
                gt = Math.floor(box_w / item_w);
            $img_box = $img_box.slice(gt-1);
            $img_box.remove();
        },100)
    }
    
    var $prep_more_pl;
    var unlock = document.unlock;
    var lockName = 'person_reply:hide'
    $doc.on('click','.pson-rep-more',function (){

        unlock[lockName] = true;
        $prep_more_pl.show();
    })

    agent.on('person_reply:hide',function (){
        $prep_more_pl.hide();
        unlock[lockName] = false;
    })

    $root.on('click','.prep-more-del',function (){
        common.alert(C.alert_post);
        net.ajax({
            url : C.api.demand+'&op=del',
            data : {
                uid : uid,
                did : did
            },
            isOnFront : 0,
            success : _success,
            error : _error

        })

        function _success(data){
            //console.log('demand_comment',data)
            if (data.status == 200){
                common.alert(data.error_msg);
                location.hash = '#/dyn';
                agent.trigger('dyn_item:del',did)
            }else{
                _error(data)
            }
            //console.log('userinfo',data)
        }

        function _error(data){
            common.alert(data.error_msg);
        }
    })


    agent.on('wx_set_share',function (){
        if (!is_show){
            return;
        }
        var comment = cur_data.comment;
        common.wx_set_share({
            title : comment.realname,
            desc : comment.content,
            link: location.href,
            imgUrl: comment.pictures[0] || comment.icon
        })
    })




    agent.on('person_reply:comm',function (type){
        if (!type){
            var $like_num = $root.find('.prpb-like-num'),
                num = $like_num.text()*1;
            $like_num.text(num++);
        }
    })









    exports.show = function (sta){
        uid = sta.uid;
        did = sta.did;
        key = sta.k;
        is_show = true;
        $root.show();
        agent.trigger('person_reply:update');
    }

    exports.hide = function (){
        is_show =false;
        $root.hide();
        common.clearHTML($root);
    }


})