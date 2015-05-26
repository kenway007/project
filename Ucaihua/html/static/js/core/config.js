define(function(require, exports, module) {


    var dev={},online={},_config,host

    host = dev.host =  'http://'+location.host;

    online.icon = {
        _5851 : 'changjia',
        _5852 : 'zongdai',
        _5854 : 'fenxiao',
        _5855 : 'lingshou',
        _5857 : 'shouhou',
        _5856 : 'weixiu',
        _10276 : 'ershou'
    }

    online.icon_cn = {
        '厂家' : 'changjia',
        '总代' : 'zongdai',
        '分销' : 'fenxiao',
        '零售' : 'lingshou',
        '售后' : 'shouhou',
        '维修' : 'weixiu',
        '二手' : 'ershou'
    }
    dev.dir_app =  'app.php';

    /*if (host.indexOf('m.pccn.com.cn') == -1){
        _config = lang.extend(online,dev);
    }else{
        _config = lang.extend(dev,online);
    }*/


    _config = lang.extend(online,dev);

    //接口配置
    var api = _config.api = {};
    api.login = '?act=login';
    api.person_list = '?act=person_list';
    api.attention = '?act=attention';
    api.get_userinfo = '?act=get_userinfo';
    api.step = '?act=step';
    api.lianxiren_pl = '?act=lianxiren_pl';
    api.favorite = '?act=favorite';
    api.subject = '?act=subject';
    api.get_demand_list = '?act=get_demand_list';
    api.demand_comment = '?act=demand_comment';
    api.demand = '?act=demand';
    api.subject_list = '?act=subject_list';
    api.modify_mobile = '?act=modify_mobile';
    api.register = '?act=register';
    api.get_password = '?act=get_password';
    api.myproduct = '?act=myproduct';
    api.category = '?act=category';
    api.userinfo = '?act=userinfo';
    api.custom_made = '?act=custom_made';
    api.subject_brand = '?act=subject_brand';
    api.wxGetJsConfig = '?act=wx_get_js_config';
    api.edit_user_info = '?act=edit_user_info';
    api.get_adv = '?act=get_adv';
    api.fans_top = '?act=fans_top';
    api.demands = '?act=demands';
    ;(function (){
        var i
        for(i in api){
            api[i] = _config.dir_app + api[i];
        }
    }());


    //文案配置
    _config.noface1 = 'http://www.pccn.com.cn/static/images/noface1.png';
    _config.subject_default = 'http://www.pccn.com.cn/uploads/brand/subject_default.jpg';
    _config.alert_aet = '网络请求失败~请稍后再试';
    _config.alert_post = '提交中. . .';
    _config.alert_cs = '更改成功!';
    _config.alert_noData = '没有数据啦!';
    _config.alert_qxztp = '请选择图片!';
    _config.alert_mcbnwk = '名称不能为空!';
    _config.alert_zzhq = '正在获取, 请稍后. . .';
    _config.alert_zzhqdlwz = '正在获取地理位置, 请稍后. . .';
    _config.alert_dlwzcw = '获取地理位置错误,请检查您的设备!';
    _config.alert_qsrnr = '请输入内容. . .';
    _config.alert_tpzzclz = '图片正在处理中,请稍后...';
    _config.alert_bzcglx = '不支持该类型!';
    _config.alert_tjcg = '提交成功!';
    _config.mapKey = 'm4rpRNGws0FrqwUrAH9uo0Gh';



    _config.ls = localStorage;

    //console.log(_config)

    dev = {};
    online = {};
    

    module.exports =  _config;

});