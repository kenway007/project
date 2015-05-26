/*
*
* 微信组件
* @net
* @jweixin-1.0.0
* */

define(function(require, exports, module){
    var wx = require('widget/jweixin-1.0.0.js');
    var extend = lang.extend;
    var def_share =  {
            title : '油菜IT',
            desc : "'油菜IT'行业社交软件，拓展行业人脉，让商机主动找上门！",
            link: location.href,
            imgUrl: 'http://kenwaylau.com/ucaihua/img/logo_50.png',
            type: ''
        }
    var share;

    //初始化
    ;(function (){
        net.ajax({
            url : C.api.wxGetJsConfig,
            data : {
                cur_href : location.href.replace(/#.*/g,'')
            },
            success : _success
        })  
        function _success(data){
            //console.log('js-配置',data);
            wx.config({
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false,
                // 必填，公众号的唯一标识
                appId: data.appId,
                // 必填，生成签名的时间戳
                timestamp: data.timestamp,
                // 必填，生成签名的随机串
                nonceStr: data.nonceStr,
                // 必填，签名，见附录1
                signature: data.signature,
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
            });
        }
    }())


    wx.error(function(res){
    });

    wx.ready(function (api){
        exports.setShare({});
        agent.trigger('wx_set_share');
    })

    exports.setShare = function (opt){
        share = extend({},def_share,{
            link : location.href
        },opt);
        setMenu();
    }

    function setMenu(){
        wx.onMenuShareAppMessage(share);
        wx.onMenuShareTimeline(lang.extend({},share,{
            title : share.desc
        }));
        wx.onMenuShareQQ(share);
    }
})


