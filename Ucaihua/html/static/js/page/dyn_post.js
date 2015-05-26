/**
 * Created by way on 15/4/19.
 *
 *
 * 注册页面
 */









define(function(require, exports, module){
    'use strict';

    var tpl_dyn_post = require('tpl/dyn_post.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        isload = false,
        form = require('form'),
        $dp_content,
        $dpp_popup,
        $dp_area_name,
        postData = {},
        baiduMap = require('widget/baiduMap'),
        map,
        upload,
        $dyn_post_img,
        $root = $('#page-dyn-post')


    var u = common.getUserInfo(),
        point = u.point || {}

    //如果没有坐标则自动获取
    if (!point){
        _pop_reget(postDateInit);
    }else{
        postDateInit();
    }

    //提交数据初始化
    function postDateInit(){
        postData = {
            aid : u.aid,
            map_lat : point.lat || '0.0',
            map_lng : point.lng || '0.0'
        }
    }




    agent.on('reg:init',function (){
        $root.append(tpl.render(tpl_head2+tpl_dyn_post,{
            head2 : {
                title : '发布需求'
            }
        }))
        $dp_content = $root.find('.dp-content');
        $dpp_popup = $root.find('.dpp-popup');
        $dp_area_name = $root.find('.dp-area-name');
        $dyn_post_img = $root.find('.dyn-post-img');
        isload = true;
        $dpp_popup.hide();
        setTimeout(function(){
            upload = new common.upload.init({
                $root : $root.find('.dp-content-box'),
                input : '#page-dyn-post .kw-upload-file',
                box : '#page-sel-head .kw-upload-img',
                maxNum : 3,
                onFront : function (){
                    $dyn_post_img.show()
                },
                imgCut : {
                    dw : 320,
                    dh : null
                }
            })

        },50)
    })


    var dpp_popup_out = 0;
    //关闭弹出框
    agent.on('dpp-popup:notClass',function (){
        common.maskHide();
        clearTimeout(dpp_popup_out);
        dpp_popup_out = setTimeout(function(){
            $dpp_popup.hide();
        },300)
        $dpp_popup.removeClass('active');
    })


    //文本框
    $doc.on('input','.dp-content',function (){
        var style = this.style
        style.height= 'auto'
        style.height=this.scrollHeight + 'px'
    })

    //定位按钮
    $doc.on('click','.dp-position',function (){
        common.maskShow();
        $dpp_popup.show();
        setTimeout(function(){
            $dpp_popup.addClass('active');
        },20)
    })




    //底部删除
    $doc.on('click','.dpp-popup-del',function (){
        lang.extend(postData,{
            aid : ''
        });
        $dp_area_name.text('未知');
        agent.trigger('dpp-popup:notClass');
    })

    //底部重新获取
    $doc.on('click','.dpp-popup-reget',_pop_reget)
    function _pop_reget(callback){
        common.alert_w.show({
            text : C.alert_zzhqdlwz
        });
        map = new baiduMap;
        map.init(function (){
            map.getGeo(function (data){
                var _data = data.data
                var _address = _data.address
                var p = _data.point

                lang.extend(postData,{
                    map_lat : p.lat,
                    map_lng : p.lng
                });

                common.setUserInfo({
                    city : _address.city,
                    point : _data.point,
                    area : _address.district,
                    street : _address.street,
                    street_number : _address.street_number
                })
                common.alert_w.hide();
                _reset();
            });
        });

        agent.trigger('dpp-popup:notClass');
        callback && !callback.currentTarget ? callback() : '';

        function _reset(){
            $dp_area_name.text(common.comp_address())
        }
    }

    //底部取消
    $doc.on('click','.dpp-popup-cancel',function (){
        agent.trigger('dpp-popup:notClass');
    })
    
    
    

    //发布按钮
    $doc.on('click','.dyn-post-ok',function (){
        var formData = form.getFormData($root.find('.dp-content-box'))
        formData[''] = undefined;
        lang.extend(postData,formData,{
            d_address : $dp_area_name.text()
        });
        var up_rst = upload.rst
        if (up_rst && up_rst.length > 0){
            up_rst.forEach(function (v,k){
                postData['demand_img'+k] = v
            })
        }
        //console.log(postData['demand_img0'])
        if (!postData.content){
            common.alert(C.alert_qsrnr);
            return;
        }


        common.alert(C.alert_post);
        try{
            net.ajax({
                url : C.api.demand+'&op=add',
                type: "post",
                data : postData,
                isCache : 0,
                isOnFront : 0,
                success : _success,
                error : _error
            })
        }catch(e){
            _error()
        }


        function _success(data){
            if (data && data.status == 200){
                location.hash= '#/dyn';
                agent.trigger('dyn','update');
            }
            common.alert(data.error_msg || C.alert_aet)
        }
        function _error(e){
            common.alert(C.alert_aet);
        }
    })





    agent.trigger('reg:init');


    exports.show = function (params){
        $root.show();
        if (isload){
            common.loadHide();
        }
    }

    exports.hide = function (){
        $root.hide();
    }


})
