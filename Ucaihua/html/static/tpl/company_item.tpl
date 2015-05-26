
<%
    companys.forEach(function(v,k){
        var v = v.data || v;
%>
<div data-href="#/company?sid=<%=v.sid %>" class="j-href content-item-item content-item-box">
    <div class="cib-item cib-left">
        <img class="cib-left-img" src="<%-v.thumb == '' ? C.noface1 : v.thumb %>">
    </div>
    <div class="cib-item cib-right">
        <div class="cib-right-item text-over cib-right-name"><%=v.name %></div>
        <div class="cib-right-item text-over  cib-right-ms">
            <div class="item browse">浏览<%=v.pageviews %></div>
            <div class="item reviews">点评<%=v.reviews %></div>
            <div class="item distance"><%-v.juli == ''? '未知':v.juli %></div>
        </div>
        <div class="cib-right-item text-over end cib-keyword"><%=v.pinpai %></div>
    </div>
</div>
<%
})
%>