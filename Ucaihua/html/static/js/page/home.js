/**
 * Created by way on 15/4/7.
 *
 * 主页
 *
 */



define(function(require, exports, module){
    'use strict';

    var tpl_home = require('tpl/home.tpl'),
        FilterBar = require('widget/filterBar.js'),
        tpl_home_ad = require('tpl/home_ad.tpl'),
        filterBar,
        Data = require('data'),
        $home_expert_main,
        $home_expert_wrap,
        $home_company,
        Banner = require('banner'),
        banner_ad,
        $home_company_main,
        $doc = $(document),
        def_index,
        filter_rst,
        $root = $('#page-home');


    $root.append(tpl.render(tpl_home));

    $home_expert_main = $root.find('#home-expert-main');
    $home_expert_wrap = $home_expert_main.find('#home-expert-wrap');
    $home_company = $root.find('.content-item-company');
    $home_company_main = $root.find('.home-company-main');


    //筛选栏
    filter_bar_init();
    function filter_bar_init(){
        try{
            net.ajax({
                url : C.api.attention,
                data : {
                    page : 'home'
                },
                success : _success,
                error : _error
            })
        }catch(e){
            _error()
        }

        function _success(data){
            if (data.status == 200){
                var _data = [],def_id
                _data.push({
                    name : '产品',
                    sub : data.my_attention
                })
                _data.push({
                    name : '品牌',
                    sub : data.my_attention[0].sub_categories
                })
                _data.push({
                    name : '类型',
                    sub : data.my_c_type
                })
                _data[2].sub.forEach(function (v,k){
                    v.name = v.typename;
                    v.catid = v.typeid
                })
                //_data[2].sub[0].catid = 0;
                def_id = data.my_category.catid
                data.my_attention.forEach(function (v,k){
                    if (def_id === v.catid){
                        def_index = k;
                    }
                })
                    //console.log(_data)
                filterBar = new FilterBar($('#home-filterBar'),_data,def_index);
            }else{
                _error();
            }
        }
        function _error(data){
            common.alert(C.alert_aet)
            //filter_bar_init();
        }

    }




    //广告图
    ad_init();

    function ad_init(){
        net.ajax({
            url : C.api.get_adv,
            data :{
                width : 640,
                type : 0
            },
            success : _success,
            error : _error

        })
        function _success(data){
            //console.log(C.api.person_list,data);
            if (data.status == 200){
                //$root.html(JSON.stringify(data))
                $home_company.prepend(tpl.render(tpl_home_ad,data));
                var $img = $('#home-ad img').eq(0);
                $img.on('load',function (){
                    iScroll_refresh();
                    $img.off('load');
                })
                banner_ad = new Banner('home-ad',{
                    snapThreshold : 50
                })
            }else{
                _error();
            }
        }
        function _error(data){
            common.alert(C.alert_aet);
        }
    }




    var mlist = require('mList');
    var mlist_expert;

    mlist_expert = new mlist('home-content',{
        vScrollbar : true,
        id : 'home_expert',
        onScrollMove : function (){
          //console.log(mlist_expert.iScroll)
        },
        onUpdate : function (end){
            mlist_expert.end = end;
            agent.trigger('home:expert:update',{
                render_fn : 'prepend',
                page : 0
            },end)
        },
        onLoadMore : function (end){
            mlist_expert.loadMore_end = end
            expert_page++;
            agent.trigger('home:expert:update',{},end)
        }
    });
    mlist_expert.data = new Data('profile.uid')
    mlist_expert.company_data = new Data('sid')

    //行家更新
    var tpl_expert = require('tpl/home_expert.tpl');
    var tpl_company = require('tpl/company_item.tpl');
    var expert_page = 1;
    agent.on('home:expert:update',function (opt,callback){
        var _opt = opt || {},
            render_fn = _opt.render_fn || 'append';
        filter_rst = filterBar.rst
        if (_opt.clearData){
            mlist_expert.data.remove();
            mlist_expert.company_data.remove();
            expert_page = 1;
        }
        var def = {
            url : C.api.person_list,
            data : {
                catid : filter_rst[0],
                sub_catids : filter_rst[1],
                typeid : filter_rst[2],
                aid : C.city.aid,
                amap_lat : '0.0',
                amap_lng : '0.0',
                page : expert_page,
                page_count : 10
            },
            isOnFront :0,
            type: "get",
            success : _success,
            error : _error
        }



        try{
            net.ajax(lang.extend(def,_opt))
        }catch(e){
            _error()
        }

        function _success(data){
            //console.log(C.api.person_list,data);
            if (data.status == 200){

                if (_opt.reset){
                    $home_expert_wrap.html('');
                    mlist_expert.iScroll.scrollTo(0,0);
                    //mlist_expert.data.remove();
                }
                var newData =  mlist_expert.data.add(data.data.person);
                var newCompanyData =  mlist_expert.company_data.add(data.data.company);
                if (newCompanyData.length > 0){
                    newCompanyData.forEach(function (v,k){
                        var cur = newCompanyData[k];
                        newCompanyData[k] = cur.data;
                    })
                    $home_company_main.html('').append(tpl.render(tpl_company,{companys:newCompanyData}))
                }
                if (newData.length > 0 ){
                    $home_expert_wrap[render_fn](tpl.render(tpl_expert,{data:newData}));
                }else{
                    common.alert('没有新数据!');
                }
                iScroll_refresh();
                //console.log(mlist_expert.data)
                callback ? callback() : '';
            }else{
                _error();
            }
        }
        function _error(data){
            common.alert(C.alert_aet);
            mlist_expert.end ? mlist_expert.end() : '';
            mlist_expert.loadMore_end ? mlist_expert.loadMore_end() : '';
            //agent.trigger('home:u:e')
        }
    })

    function iScroll_refresh(){
        setTimeout(function(){
            mlist_expert.iScroll.refresh();
        },500)
    }


    //更多公司
    $root.on('click','.content-company-title',function (){
        var $this = $(this),
            fr = filterBar.rst,
            href = $this.attr('data-href')
        if (!fr){
            return;
        }
        $this.attr('data-href',href+'?catid='+fr[0]+'!!sub_catids='+fr[1]+'!!typeid='+fr[2]+'!!aid=1!!amap_lat=0.0!!amap_lng=0.0');
        setTimeout(function(){
            $this.attr('data-href',href)
        },20)
    })


    //filterBar 更新
    agent.on('home:filterBar:update',function (){
        /*var $fbar = $('#home-filterBar')
        $fbar.html('');*/
        filter_bar_init();
    })





    //退出
    $doc.on('click','.home-logout',function (){
        agent.trigger('logout');
    })

    agent.on('logout',function (){
        common.alert(C.alert_post);
        net.ajax({
            url : C.api.login+'&op=logout',
            type : 'post',
            isCache : 0,
            success : _success,
            error : _error
        })

        function _success(data){
            if (data.status == 200){
                common.alert(data.error_msg);
                location.hash = '#/login_wel';
                netCache.clear();
                common.clearUserInfo();
                location.reload();
            }else{
                _error()
            }
            //console.log('userinfo',data)
        }

        function _error(){
            common.alert(C.aet)
        }
    })



    exports.show = function (){
        $root.show();
        setTimeout(function(){
            $home_expert_wrap.show();
            iScroll_refresh();
        },50)
        common.navAct(1)
    }

    exports.hide = function (){
        $root.hide();
        document.lock['filterBar:hide'] = true;
        common.navHide();
        setTimeout(function(){
            $home_expert_wrap.hide();
        },50)
    }
    

})