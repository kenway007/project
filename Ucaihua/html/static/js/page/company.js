/**
 * Created by way on 15/4/16.
 */




define(function(require, exports, module){
    'use strict';

    var tpl_company = require('tpl/company.tpl'),
        tpl_head2 = require('head2'),
        Banner = require('banner'),
        banner,
        $doc = $(document),
        sid,
        stores,
        init_data,
        is_show,
        cur_data,
        $root = $('#page-company')


    $doc.on('click','.company-tel',function (){
        var qbox = common.query_box;
        var $tpl = $('<div class="company-tel-list"></div>');
        var tpl_li = ''
        init_data._tel.forEach(function(v,k){
            tpl_li += '<a href="tel:'+ v+'" class="company-tel-li">电话: '+v+'</a>'
        })
        qbox.ok = function (){}
        qbox.show($tpl.append(tpl_li)[0].outerHTML);
    })

    agent.on('company:update',function (){
        net.ajax({
            url : C.api.subject,
            data : {
                sid : sid
            },
            success : _success,
            error : _error
        })

        function _success(data){
            //console.log('comp',data)
            stores = data.stores;
            init_data = data;
            init_data._tel = [];
            if (data.stores.c_mobile){
                init_data._tel.push( data.stores.c_mobile);
            }
            if (data.stores.c_telephone){
                init_data._tel.push( data.stores.c_telephone);
            }
            if (data.status == 200){
                cur_data = data;
                var _data = lang.extend(data,{head2:{
                    title : stores.name
                }})
                $root.html(tpl.render(tpl_head2+tpl_company,_data));

                if (stores.album_list.length > 0){
                    setTimeout(function(){
                        var clientWidth = document.body.clientWidth > 1004 ? $('#ibody').width() : false
                        if (document.body.clientWidth > 1004){

                        }
                        banner = new Banner('company-ad',{
                            clientWidth : clientWidth
                        });
                    },100)
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


    agent.on('wx_set_share',function (){
        if (!is_show){
            return;
        }
        var stores = cur_data.stores;
        common.wx_set_share({
            title : stores.name,
            desc : stores.c_address,
            link: location.href,
            imgUrl: stores.album_list[0].filename || C.noface1
        })

    });

    exports.show = function (sta){
        sid = sta.sid;
        $root.show();
        is_show = true;
        agent.trigger('company:update');

    }

    exports.hide = function (){
        $root.hide();
        is_show = false;
        common.clearHTML($root);
    }


})
