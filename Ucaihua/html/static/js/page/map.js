/**
 * Created by way on 15/4/19.
 *
 *
 * 百度地图页面
 */



/**
 * Created by way on 15/4/14.
 *
 * 用户中心
 */





define(function(require, exports, module){
    'use strict';

    var tpl_map = require('tpl/map.tpl'),
        tpl_head2 = require('head2'),
        $doc = $(document),
        sid,
        lat,
        lng,
        map,
        $map_main,

        isLoad = false,
        $root = $('#page-map')




    $root.html(tpl.render(tpl_head2+tpl_map,{head2:{
        title : '公司位置'
    }}));

    function loadJScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ C.mapKey +"&callback=map_init";
        document.body.appendChild(script);
    }
    function init() {
        agent.trigger('map:update');
        isLoad = true;
    }

    window.map_init = init;
    loadJScript();


    agent.on('map:update',function (){
        $map_main = $root.find('.map-main');
        $map_main.css('height',document.body.scrollHeight-45);
        var point = new BMap.Point(lng,lat); // 创建点坐标
        var marker = new BMap.Marker(point);
        map = new BMap.Map("map-main");            // 创建Map实例
        map.addOverlay(marker);
        map.centerAndZoom(point,15);
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    })






    exports.show = function (params){
        lat = params.map_lat*1;
        lng = params.map_lng*1;
        $root.show();
        if (isLoad){
            agent.trigger('map:update');
        }
    }

    exports.hide = function (){
        $root.hide();
        setTimeout(function(){
            $map_main.html('')
        },20)
    }


})
