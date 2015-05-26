

<div class="rank-main">
    <div class="rank-list">
        <%
        data.forEach(function(v,k){
        %>
        <div class="kw-li rank-li">
            <div class="kw-box-a-v rank-li-item rank-li-l"><%=k %></div>
            <div data-href="#/person?uid=<%=v.uid %>" class="j-href kw-box-a-v  rank-li-item rank-li-m">
                <img class="rank-li-m-img" src="<%=v.face %>">
            </div>
            <div class="kw-box-v rank-li-item rank-li-r">
                <div class="kw-txt-li">
                    <span class="rank-li-name"><%=v.realname %></span>
                    <span class="rank-li-fans">粉丝 <%=v.fans %></span>
                </div>
                <div class="kw-txt-li">
                    <span class="kw-text-over rank-li-pinpai"><%=v.pinpai %></span>
                </div>
            </div>
        </div>

        <%
        })
        %>
    </div>
</div>
