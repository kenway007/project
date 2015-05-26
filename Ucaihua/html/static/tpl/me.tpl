

<% 
    var u = userinfo;
%>
<div class="me">
    <div class="kw-box kw-wp me-person">
        <div class="me-ps-l">
            <div class="me-ps-head">
                <img src="<%=u.icon %>" class="mps-head-img">
            </div>
        </div>
        <div class="me-ps-r">
            <div class="kw-txt-li">
                <div class="me-ps-name"><%-u.realname || u.username  %></div>
                <span class="daren"><%=u.grade %>级达人</span>
            </div>
            <div class="kw-txt-li">
               <div class="me-ps-uch">油菜号: <%=u.username %></div>
            </div>
            <div class="kw-txt-li">
                <div class="me-ps-follow">关注: <%=u.follow %></div>
                <div class="me-ps-face">粉丝: <%=u.fans %></div>
            </div>
            <div class="kw-txt-li">
                <div class="me-cat-name"><%=u.cat_name %></div>
            </div>
        </div>
    </div>

    <div class="me-gd">
        <div data-href="#/person_dyn?uid=<%=C.userInfo.uid %>" class="j-href fa fa-user kw-li me-li me-dyn">我的动态</div>
        <div class="fa fa-comments kw-li me-li me-rev">我的点评</div>
        <div data-href="#/rank" class="j-href fa fa-trophy kw-li me-li me-rev">排行榜</div>
        <div class="fa fa-users kw-li me-li me-rev">全部访客</div>
        <div class="fa fa-star kw-li me-li me-rev">我的关注</div>
        <div class="fa fa-heart kw-li me-li me-rev">我的粉丝</div>
    </div>

    <div class="me-gd">
        <div class="fa fa-home kw-li me-li me-dyn">我的店铺</div>
    </div>

    <div class="me-gd">
        <div class="fa fa-qrcode kw-li me-li me-dyn">扫一扫</div>
        <div class="fa fa-cog kw-li me-li me-dyn">设置</div>
    </div>

</div>