define(function(require, exports, module) {
    "use strict";
    var $doc = $(document),
        exp = exports,
        Alert = require('widget/alert'),
        net =  require('net'),
        QueryBox = require('widget/query_box'),
        ui = require('widget/ui'),
        change,
        click,
        mousedown








    //事件转换
    exports.eventChange = function(type) {
        if (sys.platform != "pc") {
            switch (type) {
              case "click":
                type = "click";
                break;

              case "mousedown":
                type = "touchstart";
                break;

              case "mouseup":
                type = "touchend";
                break;

              case "mousemove":
                type = "touchmove";
                break;
            }
        }
        return type;
    };

    change = exports.eventChange;
    click = change("click");
    mousedown = change("mousedown");


    //模拟A标签
    $doc.on(click,'.j-href',function (){
        var $this = $(this);
        location.hash = $this.attr('data-href')
    })

    var goBack = {}
    //回退按钮
    $doc.on(click,'.j-back',function (e){
        history.back();
        goBack.timeout = setTimeout(function(){
            location.hash = '#/dyn'
        },500)
    })


    window.addEventListener("hashchange", function (){
        clearTimeout(goBack.timeout);
    }, false);



    $doc.on('focus','.kw-input01',function (){
        var  $this = $(this);
        $this.addClass('active');
    })
    $doc.on('blur','.kw-input01',function (){
        var  $this = $(this);
        $this.removeClass('active');
    })



    var $nav = $('#bottom-nav');
    var $nav_item = $nav.find('.nav-item');
    //底部按钮
    exports.navAct = function (index){
        var $cur = $nav_item.eq(index);
        $nav_item.removeClass('active');
        $cur.addClass('active');
        $nav.css('display','-webkit-box');
    }

    exports.navHide = function (){
        $nav.hide();
    }


    //全局触摸
    document.unlock = {}
    document.lock = {};
    $doc.on('click',function (e){
        if (!document.lock['filterBar:hide']){
            agent.trigger('filterBar:hide');
        }
        if (document.unlock['person_reply:hide']){
            agent.trigger('person_reply:hide');
        }
        //$mask.hide();

    })


    //alert
    var _ALERT = new Alert('#common-alert')
    exports.alert = function (){
        var arg = Array.prototype.slice.call(arguments);
        !arg[0] ? arg[0] = C.alert_aet : '';
        _ALERT.apply(this,arg)
    };


    exports.clearHTML = function ($root){
        setTimeout(function(){
            $root.html('')
        },20)
    }

    //全局loading
    var $loading = $('#loading')
    exports.loadShow = function (){
        $loading.css('display','-webkit-box');
    }
    exports.loadHide = function (){
        $loading.hide();
    }



    exports.error = function (){
        exports.alert(C.aet)
    }
    



    //设置用户信息
    exports.setUserInfo = function (obj){
        cookie('_pccn_userinfo',JSON.stringify(lang.extend(C.userInfo,obj)),{
            expires : 7
        });
    }


    //获取用户信息
    exports.getUserInfo = function (){
        if (!cookie('_pccn_userinfo')){
            location.hash = '#/login_wel';
            return false;
        }
        return C.userInfo = JSON.parse(cookie('_pccn_userinfo'));
    }

    //删除用户信息
    exports.clearUserInfo = function (){
        cookie('_pccn_userinfo',null)
    }



    //检查用户类型
    exports.userCheck = function ($obj){
        net.ajax({
            url : C.api.login,
            type: "post",
            data : {

            },
            isCache : 0,
            success : _success,
            error : _error
        })
    }

    //全局遮罩
    var $mask = $('#globle-mask');
    exports.maskShow = function (opt){
        exports.maskSet(opt);
        $mask.show();
    }
    exports.maskHide = function (opt){
        exports.maskSet(opt);
        $mask.hide();
    }
    exports.maskSet = function (opt){
        var _opt = opt || {},
            top = _opt.top || 0
        $mask.css({
            top : top
        })
    }

    exports.maskClick = function (){
        setTimeout(function(){
            $mask.trigger('click')
        },30)
    }

    $doc.on('click','#globle-mask',function (){
        exports.query_box.hide();
        agent.trigger('dpp-popup:notClass');
    })

    //全局询问框
    var qbox = exports.query_box = new QueryBox('#globle-query-box',$mask);
    qbox.onShow = function (){
        exports.maskShow();
    }
    qbox.onHide = function (){
        exports.maskHide();
    }


    //获取城市
    exports.getCity = function (){
        var ls = localStorage,
            key = '_pccn_view_city',
            rst,
            view_city = ls[key]
        if (view_city){
            rst = JSON.parse(view_city);
        }else{
            rst = {
                aid : 1,
                name : '广州'
            }
            ls[key] = JSON.stringify(rst);
        }
        return rst;
    }
    //设置城市
    exports.setCity = function (json){
        var ls = localStorage,
            key = '_pccn_view_city'
        ls[key] = JSON.stringify(json);
    }



    //获取选择身份
    exports.get_sel_sf = function (json){
        var s = sessionStorage,
            copy = s['_pccn_sel_sf'];
        if (!copy){
            location.hash ='#/sel_sel_identity'
            return false
        }else{
            return JSON.parse(copy);
        }

    }

    //设置选择身份
    exports.set_sel_sf = function (json){
        var s = sessionStorage,
            copy = s['_pccn_sel_sf'];
        if (copy){
            copy = JSON.parse(copy);
        }else{
            copy = {}
        }
        s['_pccn_sel_sf'] = JSON.stringify(lang.extend(copy,json))
    }

    exports.is_weixn = function (){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    };
    

    //提取完整地址信息
    exports.comp_address = function (){
        var u = common.getUserInfo()
        return (u.city || '') + (u.area || '') + (u.street || '') + (u.street_number || '').replace('/号*/i','号');
    }




    //永久性alert
    var $alert_w = $('#alert-white');
    var $mask_w = $('#mask-white');
    var alert_w_out = 0
    function alert_w(opt){
        alert_w.show(alert_w.config(opt));
    }

    alert_w.config = function (opt){
        var _opt = {
            text : opt.text || '正在处理,请稍后..',
            time : opt.time || 'none'
        }
        return lang.extend(_opt,opt);
    }

    alert_w.show = function (opt){
        var _opt = alert_w.config(opt)
        _opt.onShow ? _opt.onShow() : '';
        $mask_w.show();
        clearTimeout(alert_w_out);
        $alert_w.find('.alert-text').text(_opt.text);
        $alert_w.show();
        ui.center($alert_w);
        if (!_opt.time == 'none'){
            clearTimeout(alert_w_out);
            alert_w_out = setTimeout(function(){
                alert_w.hide(_opt);
            },_opt.time)
        }
    }

    alert_w.hide = function (opt){
        var _opt = opt || {}
        $mask_w.hide();
        _opt.onHide ? _opt.onHide() : '';
        $alert_w.hide();
    }
    exports.alert_w = alert_w


    var UPLOAD = require('widget/upload');
    var upload = new UPLOAD();
    upload.config({
        onFronts : function (){
            common.alert_w.show({text : C.alert_tpzzclz})
        },
        onCompletes : function (){
            common.alert_w.hide();
        },
        onNotypes : function (){
            common.alert(C.alert_bzcglx);
        }
    })
    exp.upload = upload;


    exports.fixALert = function (msg){
        //var arg = Array.prototype.slice.call(arguments);
        exports.alert(msg || C.alert_aet)
    }



    //动态点赞
    $doc.on('click','.j-dyn-like',function (){
        var $this =$(this);
        var user = common.getUserInfo();
        if (!user){
            return;
        }
        common.alert(C.alert_post);
        net.ajax({
            url : C.api.demands,
            data : {
                uid : user.uid,
                did : $this.attr('did')
            },
            isCache : 0,
            isOnFront : 0,
            success : _success,
            error : _error
        })

        function _success(data){
            //console.log('demand_comment',data)
            if ($this.hasClass('active')){
                $this.removeClass('active')
            }else{
                $this.addClass('active')
            }
            if (data.status == 200){
                $this.closest('.dyn-item').find('.prpb-like-num').text(data.data.nums);
                common.alert(data.error_msg);
            }else{
                _error(data)
            }
            //console.log('userinfo',data)
        }

        function _error(data){
            common.alert(data.error_msg);
        }
    })


    exports.wx_set_share = function (opt){
        if (window.my_wx){
            my_wx.setShare(opt);
        }
    }

    setTimeout(function(){
        $doc.on('click','#download-tip .dltr-close',function (){
            $('#download-tip').hide();
        })
    },100)



});