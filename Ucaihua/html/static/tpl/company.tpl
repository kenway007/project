<%
    if(stores.album_list.length > 0){
%>
<div class="company-ad" id="company-ad">
    <div class="banner-content">
        <%
            stores.album_list.forEach(function(v,k){
        %>
            <div class="company-ad-imgs banner-content-item company-ad-imgs box-center" style="background-image: url('<%=v.filename %>')"></div>
        <%
            })
        %>
        
    </div>
    <div class="banner-btns company-ad-btns">
    </div>
</div>
<%
    }
%>


<div class="company-m kw-box-v">
    <div class="company-m-item kw-box-a-v company-m-info">
        <div class="company-mi-l kw-box-a-v kw-flex1">
            <div class="company-mi-item kw-box-a-v company-mi-view">
                <div class="fa fa-eye company-mi-icon company-mi-view-icon"></div>
                <div class="ompany-mi-num company-mi-view-num"><%=stores.pageviews %></div>
            </div>

            <div class="company-mi-item kw-box-a-v kw-box company-mi-tel">
                <div class="fa fa-phone-square company-mi-icon company-mi-tel-icon"></div>
                <div class="ompany-mi-num company-mi-tel-num"><%=stores.callcount %></div>
            </div>

            <div class="company-mi-item kw-box company-mi-like">
                <div class="fa fa-thumbs-o-up company-mi-icon company-mi-like-icon"></div>
                <div class="ompany-mi-num company-mi-like-num"><%=stores.likes_num %></div>
            </div>

            <div class="company-mi-item kw-box company-mi-comm">
                <div class="fa fa-comment company-mi-icon company-mi-comm-icon"></div>
                <div class="ompany-mi-num company-mi-comm-num"><%=stores.reviews %></div>
            </div>
        </div>

        <div class="company-mi-item kw-box company-mi-r">
            <div class="ompany-mi-num company-mi-sort-num"><%=stores.sort1 %></div>
        </div>
    </div>
    <div class="company-m-item kw-box-a-v  ccompany-m-address">
        <div class="company-ma-item kw-box company-ma-l kw-flex1"><%=stores.c_address %></div>
        <div data-href="#/map?map_lat=<%=stores.map_lat %>!!map_lng=<%=stores.map_lng %>!!sid=<%=stores.sid %>" class="j-href company-ma-item kw-box company-ma-r">
            <div  class="btn-green">地图</div>
        </div>
    </div>
</div>

<%
var link_user = stores.link_user;
if(link_user.length > 0){
    link_user.forEach(function(v,k){
%>
    <div class="kw-wp j-href company-user kw-box" data-href="#/person?uid=<%=v.uid %>">
        <div class="cuser-item kw-box-a-v company-user-l">
            <img class="cuser-l-face" src="<%=v.face %>">
        </div>
        <div class="cuser-item kw-box-v company-user-m kw-flex1">
            <div class="kw-box kw-txt-li">
                <div class="cmli1-item cuser-m-name"><%-v.realname || v.username %></div>
                <div class="cmli1-item cuser-m-leve daren"><%=v.grade %>级达人</div>
                <div class="cmli1-item cuser-m-fans">粉丝 <%=v.fans %></div>
            </div>
            <div class="kw-box kw-txt-li">
                <div class="cuser-m-pinpai"><%=v.pinpai %></div>
            </div>
        </div>
        <div class="cuser-item kw-box-a-v company-user-r">
            <div class="fa fa-chevron-right "></div>
        </div>
    </div>
<%
    })}
%>

<%
    var brands = stores.brands;
    if(brands && brands.length > 0 ){
        
%>

<div class="company-pro">
    <div class="kw-box-a-v kw-wp company-pro-head">
        <div class="cpro-head-l kw-flex1">经营产品</div>
        <div class="cpro-head-r">
            <div class="fa fa-chevron-right "></div>
        </div>
    </div>

    <div class="company-pro-box">
        <% 
            brands.forEach(function(v,k){
        %>
        <div class="kw-box cpro-line">
           <%
                for(var i = 0,len=3; i< len ; i++){
                if(v.brand_all.length > 0 && v.brand_all[i]){
                    var cur = v.brand_all[i];
           %>
            <div class="kw-box-v kw-wp cpro-item">
                <img src="<%=C.noface1 %>" class="cpro-img">
                <div class="kw-box-center cpro-text">
                    <div class="kw-text-over kw-flex1 cpro-text-ms"><%=cur.goods_name %></div>
                    <div class="kw-flex1 cpro-text-price">￥<%-Math.floor(cur.peer_price) %></div>
                </div>
            </div>
            <% 
                }}
            %>
        </div>
        
        <%
            })
        %>
    </div>
</div>

<%
    }
%>

<div class="kw-f-bottom pc-fixed kw-box-center company-tel">
    <div class="fa fa-phone company-tel-icon"></div>
    <div class="company-tel-text">打电话</div>
</div>




