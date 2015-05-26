
<%
    var info = userinfo,keyword = [];
    linksubject.forEach(function(v1,k1){
        var word  = '';
        word += v1.cat_name + ' ';
        v1.brands.forEach(function(v2,k2){
            word += v2.name + ' ';
        })
        word += v1.str_c_type;
        keyword[k1] = word;
    })
%>
<div class="person-main">
    <div class="person-main-item">
        <div class="main-item person-ms ">
            <div class="person-head">
                <img class="person-head-img" src="<%=info.icon %>">
            </div>
            <div class="person-ms-box">
                <div class="person-msbox-item ">
                    <div class="person-ms-name text-over"><%=info.realname || info.username %></div>
                    <div class="person-ms-isAgree">
                        <div class=" isAgree-item  isAgree-yes <%if(info.likes_flag =='0'){%> active <%}%>">
                            <span class="fa fa-thumbs-o-up"></span><span class="num"><%=info.likes_num %></span></div>
                        <div class="isAgree-item isAgree-no <%if(info.step_flag == '0'){ %> active <% }%>">
                            <span class="fa fa-thumbs-o-down"></span><span class="num"><%=info.step_num %></span></div>
                    </div>

                </div>
                <div class="person-msbox-item">
                    <div class="person-atten text-over">关注: <%=info.follow %></div>
                    <div class="person-fans text-over">粉丝: <%=info.fans %></div>
                </div>
                <div class="person-msbox-item" style="margin-bottom: 10px;">
                    <div class="person-keyword text-over"><%=keyword[0] %></div>
                </div>
                <div class="person-msbox-item">
                    <div class="person-level box-center">
                        <%
                            info.str_c_type.split(' ').forEach(function(v,k){
                        %>
                        <span class="icon icon-level icon-t-<%=C.icon_cn[v] %>"></span>
                        <%
                            })
                        %>

                        <span class="daren"><%=info.grade %>级达人</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-item">
            <div class="person-identity text-over"><%=info.company_name %></div>
        </div>
        <div class="main-item main-item03 ">
            <div class="person-address"><%=info.address %></div>
            <div class="person-attenBtn ">
                <div class="btn-green person-attenBtn-btn j-favorite" follow=<%if(info.follow_flag == 1){ %> "1" <%}else{%> "0" <% }%> ><%-info.follow_flag == 1 ?'已关注':'关注' %></div>
            </div>
        </div>
    </div>

    <%
        linksubject.forEach(function(v,k){
    %>
        <div data-href="#/company?sid=<%=v.sid %>" class="person-main-item person-zs j-href">
            <div class="person-zs-imgs">
                <img class="person-zs-img" src="<%-v.thumb ? v.thumb : C.noface1 %>">
            </div>
            <div class="person-zs-ms">
                <div class="person-zs-ms-item">
                    <div class="person-zs-name"><%=v.name %></div>
                </div>
                <div class="person-zs-ms-item person-zs-addup">
                    <div class="person-zs-addup-item person-zs-browse">浏览 <span class="browse-num"><%=v.pageviews %></span></div>
                    <div class="person-zs-addup-item person-zs-comment">评论 <span class="comment-num"><%=v.reviews %></span></div>
                    <div class="person-zs-addup-item person-zs-distance">距离 <span class="distance-num"><%=v.juli %></span></div>
                </div>
                <div class="person-zs-ms-item">
                    <div class="person-zs-des"><%=keyword[k] %></div>
                </div>
            </div>
        </div>
    <%
        })
    %>




    <div data-href="#/person_dyn?uid=<%=info.uid %>" class="j-href person-main-item person-dyn">
        <div class="person-dyn-item person-dyn-num ">个人动态 <span class="num text-over"><%=moving.demand_count %></span>条</div>
        <div class="person-dyn-item person-dyn-imgs">
            <%
                moving.pictures.forEach(function(v,k){
            %>
                <div class="person-dyn-img">
                    <img class="pdyn-img" src="<%=v%>">
                </div>
            <%
                })
            %>
        </div>
        <div class="fa fa-chevron-right person-dyn-item person-dyn-icon"></div>
    </div>


    <div class="person-main-item person-other">
        <div class="person-other-item">城市: <%=info.area %></div>
        <div class="person-other-item">签名: <%=info.signature %></div>
    </div>
</div>


<div class="box-center person-bottom pc-fixed">
    <div class="person-bottom-btn box-center person-bottom-talk">对话</div>
    <a class="person-bottom-btn box-center person-bottom-phone" href="tel:<%=info.mobile %>">电话</a>
</div>
