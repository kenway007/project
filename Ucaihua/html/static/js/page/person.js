/**
 * Created by way on 15/4/14.
 *
 * 用户中心
 */





define(function(require, exports, module){
    'use strict';

    var tpl_person = require('tpl/person.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        uid,
        is_show,
        cur_data,
        favorite = require('favorite'),
        $root = $('#page-person')




    agent.on('person:update',function (){
        net.ajax({
            url : C.api.get_userinfo,
            data : {
                uid : uid
            },
            success : _success,
            error : _error
        })

        function _success(data){
            if (data.status == 200){
                cur_data = data;
                var _data = lang.extend(data,{head2:{
                    title : '个人中心',
                    //right : '<div class="j-href" data-href="report">举报</div>'
                }})
                $root.html(tpl.render(tpl_head2+tpl_person,_data))
                $root.find('.j-favorite')[0].ajax_data ={
                    id : uid
                }
                agent.trigger('wx_set_share');
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })

    $doc.on('click','#page-person .isAgree-item',function (){
        var $this = $(this),
            opt
        if ($this.hasClass('isAgree-yes')){
            opt = {
                url : C.api.lianxiren_pl,
                isOnFront : 0,
                data : {
                    op : 'like',
                    uid : common.getUserInfo().uid,
                    userid : uid
                },
                $this : $this
            }
        }else{
            opt = {
                url : C.api.step,
                data : {
                    op : 'userstep',
                    id : uid
                },
                $this : $this
            }
        }
        isAgree(opt)
    })


    //赞或踩
    function isAgree(opt){
        var $this = opt.$this,isAction,$num,num_text;
        isAction = $this.hasClass('active');
        $num = $this.find('.num');
        num_text = $num.text()*1;


        function _hover(){
            if (isAction){
                $this.removeClass('active');
                num_text++;
            }else{
                $this.addClass('active');
                num_text--;
            }
            $num.text(num_text)
        }
        common.alert(C.alert_post)

        if ($this.data('lock')){
            return;
        }
        $this.data('lock',true);

        var def = {
            success : _success,
            isCache : 0,
            isOnFront : 0,
            error : _error
        }

        try{
            net.ajax(lang.extend(def,opt))
        }catch(e){
            _error();
        }


        function _success(data){
            $this.data('lock',false)
            //console.log('api_step',data);
            _hover();
            common.alert(data.error_msg);
        }

        function _error(){
            $this.data('lock',false)
            common.alert(C.aet);
            _hover();
        }
    }

    agent.on('wx_set_share',function (){
        if (!is_show){
            return;
        }
        var user = cur_data.userinfo
        common.wx_set_share({
            title : user.realname || user.username,
            desc : user.company_name + '\n' + user.address,
            link: location.href,
            imgUrl: user.icon || C.noface1
        })

    });


    exports.show = function (sta){
        uid = sta.uid;
        $root.show();
        is_show = 1
        agent.trigger('person:update');

    }

    exports.hide = function (){
        is_show = 0
        $root.hide();
        setTimeout(function(){
            $root.html('')
        },20)
    }


})