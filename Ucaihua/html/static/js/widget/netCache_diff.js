/**
 * Created by way on 15/5/19.
 *
 * 数据对比
 *
 */



(function (){

    var num = 0;


    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }

    var isObject = isType("Object")
    var isArray = Array.isArray || isType("Array")


    onmessage = function (e){
        var data = e.data,
            cache  = data.cache,
            old = cache.data,
            ig = cache.options.auto_update_ig,
            news = data.news
        postMessage(diff(old,news,ig));
    }

    function diff(old,news,ig){
        var rst = {
            status:0,
            path : {}
        }

        function _run(old,news){
            var key;
            if (rst.status === 1){
                return
            }

            for(key in news){
                if (ig && ig.indexOf(key) != -1){
                    continue;
                }
                var co = old[key];
                var cn = news[key];
                if (isObject(co) || isObject(cn) || isArray(cn) || isArray(co)){
                    _run(co,cn);
                    continue;
                }
                if (co != cn){
                    rst.path[key] = cn;
                    rst.status = 1;
                }
            }
        }
        _run(old,news);
        rst.num = ++num;
        return rst;
    }
}())