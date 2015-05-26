
/**
 * 应用入口类 app.js
 */
define( function(require, exports) {
    "use strict";
    /*jshint -W074 */
    window.$ = require("core/selector.js");
    window.lang = require("core/lang.js");
    window.sys = lang.sys();
    window.net = require("core/net.js");
    window.tpl = require("core/tpl.js");

    var page = require("core/page.js");
    window.common = {}


    var $doc = $(document);
    //模拟A标签
    $doc.on('click','.j-href',function (){
        var $this = $(this);
        location.hash = $this.attr('data-href')
    })


    // 应用初始化
    exports.start = function() {
        if ( sys.platform != 'pc'){

        }else{
            location.href = 'http://app.ucaihua.cn/mobile/index.php';
            return
        }
        //禁用UC浏览器手势
        if (navigator.control && navigator.control.gesture) {
            navigator.control.gesture(false);
        }

        if (document.body.scrollWidth > 1004){
            $('#ibody').css('min-height',document.body.scrollHeight)
        }
        page.start('download');
    };

    common.is_weixn = is_weixn;
    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    if (common.is_weixn()){
        require('widget/jweixin-1.0.0');
        require('widget/wx');
    }




    var $mask = $('#globle-mask');
    $doc.on('click',function (){
        $mask.hide();
        $('.download-tip').hide();
    })
















});