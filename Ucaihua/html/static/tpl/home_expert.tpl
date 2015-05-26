


<%
    data.forEach(function(v,k){
        var v = v.data;
%>

<div data-href="#/person?uid=<%=v.user_info.uid %>" class="content-item-item content-item-box j-href">
    <div class="cib-item cib-left">
        <img class="cib-left-img" src="<%=v.face %>">
    </div>
    <div class="cib-item cib-right">
        <div class="cib-right-item text-over cib-right-ms">
            <div class="item text-over name"><%-v.profile.realname || v.user_info.username %></div>
            <div class="item text-over level">
                <% 
                    v.member.c_type.split(',').forEach(function(v,k){
                %>
                <span class="icon icon-level icon-t-<%=C.icon['_'+v] %>"></span>
                <%
                    })
                %>
                <span class="daren"><%=v.user_info.grade %>级达人</span>
            </div>
        </div>
        <div class="cib-right-item text-over cib-keyword"><%=v.member.pinpai %></div>
        <div class="cib-right-item text-over cib-company"><%=v.member.company_name %></div>
        <div class="cib-right-item text-over cib-group">
            <div class="cib-group-position"><%=v.member.juli || '未知距离' %></div>
            <div class="cib-group-fans">粉丝数 : <span class="num"><%=v.user_info.fans%></span></div>
        </div>
    </div>
</div>

<% 
    })
%>