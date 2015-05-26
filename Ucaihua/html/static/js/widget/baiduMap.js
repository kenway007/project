/**
 * Created by way on 15/5/11.
 * 百度地图SDK
 * @lang
 */


define(function(require, exports, module){
    'use strict';


    var extend = lang.extend;

    function map(){
        this.config ={

        }
        map.loadNum = 0;
    }


    map.prototype.init = function (callback){
        var that = this
        if (!map.isLoad){
            loadJScript(_init);
        }

        function _init(){
            map.isLoad = false;
            that.init = true;
            callback ? callback() : '';
        }

    }

    map.prototype.getGeo = function (callback){
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            var rst = {
                status : 200,
                msg : '请求成功'
            }
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                extend(rst,{
                    data : r
                })
            }
            else {
                extend(rst,{
                    status : 400,
                    msg : '请求失败'
                })
            }
            callback ? callback(rst) : '';
        },{enableHighAccuracy: true})
    }



    function loadJScript(callback) {
        var script = document.createElement("script");
        var init = 'baiduMap_'+(new Date().getTime());
        window[init] = callback;
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ C.mapKey +"&callback="+init;
        document.body.appendChild(script);
    }


    module.exports = map;

})
