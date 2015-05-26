
/**
 * 应用入口类 app.js
 */
define( function(require, exports) {
    "use strict";
    window.$ = require("core/selector.js");
    window.lang = require("core/lang.js");
    window.sys = lang.sys();
    window.tpl = require("core/tpl.js");
    window.C = require("core/config.js");
    window.common = require("widget/common.js");
    window.agent = require("core/agent.js");
    window.net = require("core/net.js");
    window.cookie = require("core/cookie.js");
    window.netCache = require('widget/netCache');
    require('core/time');

    var fastclick = require("core/fastclick.js");
    var net = require("net");
    new fastclick(document.body);
    var page = require("core/page.js");




    netCache.config({
        onFronts : function (){
            common.loadShow();
        },
        onSuccessBefores : function (data,ajax){
            if (!data ||  data.status != '200' ){
                ajax.isPack = false;
                netCache.clear();
            }
            if (data.status != '200' &&  data.error_msg == '请先登录'){
                location.hash = '#/login_wel';
                netCache.clear();
            }
        },
        onSuccessAfters : function (data,ajax){
            common.loadHide();
        },
        auto_update_ig : 'pageviews,icon,face,reply_icon'
    });

    netCache();


    page.onHide(function (){
        common.loadHide();
    })

    page.onChange(function (){
        setTimeout(function(){
            common.wx_set_share({})
        },60)
    })

    


    // 应用初始化
    exports.start = function() {
        //禁用UC浏览器手势
        if (navigator.control && navigator.control.gesture) {
            navigator.control.gesture(false);
        }
        //common.getUserInfo() = common.getUserInfo();
        C.city = common.getCity()
        page.start("dyn");
        if (document.body.scrollWidth > 1004){
            $('#ibody').css('min-height',document.body.scrollHeight)
        }
        if (common.is_weixn()){
            window.my_wx  = seajs.use('widget/wx').cache['./js/widget/wx.js'].exports
        }
    };

});