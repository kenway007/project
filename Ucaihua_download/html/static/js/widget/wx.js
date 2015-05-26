/*
*
* 微信组件
* @net
* @jweixin-1.0.0
* */

define(function(require, exports, module){
    var wx = require('widget/jweixin-1.0.0');

    //console.log('微信对象',wx);
    /*try{
        var cookie = require('cookie')
        alert(cookie('wx_access_token'))
        alert(cookie('wx_jsapi_ticket'))
    }catch(e){
        alert(e)
    }*/


    //初始化
    ;(function (){
        net.ajax({
            url : 'app.php?act=wx_get_js_config',
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

    wx.ready(function (){
        var share = {
            title : '油菜IT',
            desc : "'油菜IT'行业社交软件，拓展行业人脉，让商机主动找上门！",
            link: 'http://app.ucaihua.cn/',
            imgUrl: 'http://kenwaylau.com/ucaihua/img/logo_50.png',
            type: ''
        }
        wx.onMenuShareAppMessage(share);
        wx.onMenuShareTimeline(lang.extend({},share,{
            title : share.desc
        }));
    })
})


