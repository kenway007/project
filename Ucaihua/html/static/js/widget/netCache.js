/**
 * Created by way on 14/4/16.
 * 作者:刘嘉威
 * 邮箱:425530758@qq.com
 * @lang
 *
 */



define(function(require, exports, module){
    'use strict';
    var nc = netCache;
    var worker;
    var worker_path = location.host.indexOf('m.pccn.com.cn') == -1 ? 'js/widget' : 'js'


    if (Worker){
        worker = new Worker(worker_path+'/netCache_diff.js');
    }



    nc.extend = lang.extend;
    nc.type = lang.type;

    //默认设置
    nc.setDef ={
        time_exp : 1200,
        autoUpdate : 1,
        isCache : 0,
        maxReSendNum : 3,
        isSuccess : 1,
        maxSendNum : 1,
        isPack : 1,
        maxCap : 20,
        isOnReject : 1,
        isOnSuccessBefores : 1,
        isOnSuccessAfters : 1,
        isOnFronts : 1,
        isOnSuccessBefore : 1,
        isOnSuccessAfter : 1,
        isOnFront : 1,
        isOnUpdates : 1,
        isOnUpdate : 1
    }


    nc._ajax = net.ajax;

    nc._stop = false;


    //解析url
    nc.getURL = function getURl(url){
        return url.match(/[^?#]*/)[0]
    }

    //合并参数
    nc.merger_param = function (url,data){
        var i,_url=''
        var url = url ? url[0] : '?'
        var cur
        if (data){
            for(i in data){
                cur = data[i];
                _url += '&'+i+'='+cur
            }
            _url = url+_url;
        }else{
            _url = url;
        }
        return _url;
    }

    //获取URL参数
    nc.getParam = function (url){
        return url.match(/\?.*/)
    }

    //检查是否过期
    nc.checkTimeout = function (curNc,data){
        var nowTime = nc.getTime(),
            time_exp = data.time_exp
        if (nowTime - time_exp > 0){
            curNc.isCache = 0
        }else{
            curNc.isCache = 1;
        }
    }

    //获取当前时间
    nc.getTime = function (){
        return  new Date().getTime();
    }


    //打包数据
    nc.unpack_data = function (data,opt){
        var _data = {},
            ls = localStorage
        _data.time_exp = opt.time_exp;
        opt.cache[opt.abs_url].data = data
        _data.data = data;
        /*for (var i = 0, len = 9999; i < len; i++){
            ls[opt.abs_url+i] = JSON.stringify(_data);
        }*/
        ls[opt.abs_url] = JSON.stringify(_data);
        return _data;
    }


    nc.indexListName = '_netCache_index_list';
    nc.ls = localStorage;

    //获取索引表
    nc.getIndexList = function (){
        var ls = nc.ls,
            name = nc.indexListName,
            list = ls[name]
        if (list){
            return JSON.parse(list);
        }else{
            return ls[name] = [];
        }
    }

    //设置索引表
    nc.setIndexList = function (id){
        var list = nc.getIndexList()
        if (!nc.ls[id]){
            list.push(id);
            nc.reSetIndexList(list);
        }
    }

    //重置索引表
    nc.reSetIndexList = function (list){
        nc.ls[nc.indexListName] = JSON.stringify(list);
    }




    function netCache(opt){
        var _ajax = netCache._ajax,
            item_opt = opt,
            ls = localStorage,
            that = this,
            cache = {}


        net.ajax = function (cur_opt){
            var url,
                param,
                res_data,
                ls_data,
                copy={},
                abs_url,
                other_opt= {},
                time_exp
            if (cur_opt.type && cur_opt.type.toLowerCase() == 'post'){
                other_opt.isCache = 0;
            }
            //基础信息
            var _opt = nc.extend({},nc.setDef,item_opt,other_opt,cur_opt);
            url = nc.getURL(_opt.url);
            param = nc.merger_param(nc.getParam(_opt.url),_opt.data);
            abs_url = '_netCache_'+url + param;
            if (!cache[abs_url]){
                cache[abs_url] = {}
            }
            var curNc;
            curNc = cache[abs_url];
            curNc.id = abs_url;
            curNc.options = _opt;

            nc.setIndexList(abs_url);


            //最大并发数
            if (_opt.maxSendNum > 0){
                !curNc.sendNum ? curNc.sendNum = 1 : '';
            }
            //最大重发数
            if (_opt.maxReSendNum > 0){
                !curNc.reSendNum ?  curNc.reSendNum = 1 : '';
            }

            curNc.isPack = _opt.isPack;
            //全局onFronts事件
            if (_opt.onFronts && _opt.isOnFronts){
                _opt.onFronts(curNc)
            }
            //单个onFront事件
            if (_opt.onFront && _opt.isOnFront){
                _opt.onFront(curNc)
            }

            if (curNc.sendNum > _opt.maxSendNum){
                if (_opt.onReject && _opt.isOnReject){
                    _opt.onReject(curNc)
                }
                return;
            }
            curNc.sendNum++;

            //备份
            curNc.isCache = _opt.isCache;
            copy.success = _opt.success;
            copy.error = _opt.error;
            _opt.success = _success;
            _opt.error = _error;

            //如果不使用缓存则到此为止
            if (!_opt.isCache){
                _ajax(_opt)
                return curNc;
            }
            time_exp = nc.getTime() + (_opt.time_exp * 1000);

            if (curNc.data){
                res_data = curNc.data;
                curNc.dataFrom = 'cache';
            }else if(ls_data = ls[abs_url]){
                ls_data = JSON.parse(ls_data)
                res_data = ls_data.data;
                curNc.data = ls_data;
                curNc.dataFrom = 'ls';
            }
            //检查是否过期
            if (res_data){
                nc.checkTimeout(curNc,res_data);
            }

            setTimeout(function(){
                try{
                    if (res_data){
                        _success(res_data);
                    }else{
                        _ajax(_opt);
                    }
                }catch(e){
                    _error(e)
                }
            },11)





            function _success(data){
                curNc.sendNum--;
                var _data
                //成功前事件
                if (_opt.isOnSuccessBefores){
                    _opt.onSuccessBefores ? _opt.onSuccessBefores(data,cache[abs_url]) : '';

                }
                if (_opt.isOnSuccessBefore){
                    _opt.onSuccessBefore ? _opt.onSuccessBefore(data,cache[abs_url]) : '';

                }
                function _unpack_data(data){
                    _data = nc.unpack_data(data,{
                        cache : cache,
                        time_exp : time_exp,
                        abs_url : abs_url
                    }).data;
                }
                if (curNc.isCache && curNc.isPack){
                    _unpack_data(data);
                }else{
                    _data = data;
                }
                //成功时事件
                if (_opt.isSuccess){
                    copy.success ? copy.success(_data,curNc) : '';
                }
                //成功后事件
                if (_opt.isOnSuccessAfters){
                    _opt.onSuccessAfters ? _opt.onSuccessAfters(data,cache[abs_url]) : '';
                }
                if (_opt.isOnSuccessAfter){
                    _opt.onSuccessAfter ? _opt.onSuccessAfter(data,cache[abs_url]) : '';
                }
                //自动更新
                if (curNc.isCache && _opt.autoUpdate && curNc.dataFrom){
                    var _cache
                    _opt.isCache = 0;
                    _opt.isOnFronts = 0;
                    _opt.isOnSuccessAfters = 0;
                    _opt.isOnSuccessBefores= 0;
                    _opt.isOnFront = 0;
                    _opt.isOnSuccessAfter = 0;
                    _opt.isOnSuccessBefore = 0;
                    _opt.success = function (data){
                        if (worker){
                            worker.postMessage({
                                news : data,
                                cache : _cache
                            });
                            worker.onmessage = function (e){
                                var _data = e.data;
                                if (_data.status == 1){
                                    _unpack_data(data);
                                    if (_opt.isOnUpdates){
                                        _opt.onUpdates ?  _opt.onUpdates(data,_cache) : ''
                                    }
                                    if (_opt.isOnUpdate){
                                        _opt.onUpdate ?  _opt.onUpdate(data,_cache) : ''
                                    }

                                }
                                //console.log('对比结果', e.data);
                                //worker.terminate();
                                //worker = null;
                            }
                        }
                    }
                    _opt.error = function (){

                    }
                    _opt.error = null;
                    var cache_opt
                    _cache = net.ajax(_opt);
                    cache_opt = JSON.stringify(_cache.options);
                    _cache.options = JSON.parse(cache_opt);
                    //old = JSON.parse(ls[old['id']]);
                }
                //自动清理缓存
                setTimeout(function(){
                    if ( Math.round((JSON.stringify(ls).length / 5e6).toFixed(2)*10)/10 >= _opt.maxCap){
                        var list = nc.getIndexList().slice(0,1)
                        list.forEach(function (v,k){
                            nc.clear(v);
                        })
                    }
                },111)
            }
            function _error(e){
                setTimeout(function(){
                    curNc.sendNum--;
                    if (_opt.maxReSendNum > 0 && curNc.reSendNum < _opt.maxReSendNum){
                        _ajax(_opt);
                        curNc.reSendNum++;
                    }
                    copy.error ? copy.error(curNc) : '';
                },10)
            }
            return curNc;
        }


    }




    netCache.config = function (obj){
        nc.extend(nc.setDef,obj)
    }

    netCache.stop = function (obj){
        netCache._stop = true;
    }

    netCache.start = function (obj){
        netCache._stop = false;
    }


    netCache.clear = function (obj){
        var ls = localStorage,key,
            rs,
            del_num = 0,
            pf = '_netCache_',
            type = nc.type
        if (type(obj) == 'string'){
            rs = '^'+pf+'.*'+filt(obj.replace(pf,''));
        }else if(type(obj) == 'object' && obj.id){
            rs = filt(obj.id)
        }else{
            rs = pf;
        }
        function filt(rs){
            return rs.replace(/\?|\&|\(|\)|\.|\*|\+|\:|\[|\]|\^|\$/g,function (key){
                return '\\'+key;
            });
        }
        var reg = new RegExp(rs,'i');
        var indexList = nc.getIndexList();
        for(key in ls){
            if (reg.test(key)){
                delete ls[key];
                indexList.forEach(function (v,k){
                    if (v == key){
                        indexList.splice(v,1);
                    }
                })
                del_num++;
            }
        }
        nc.reSetIndexList(indexList);
        return del_num;
    }




    module.exports = netCache




})