<div class="sel-sf">

    <div class="kw-box-center scroll-sel-root sel-sf-root ">
        <div class="scroll-sel-box sel-sf-box">
            <ul class="scroll-sel-list sel-sf-list">
                <%
                cities.forEach(function(v,k){
                %>
                <li province_id="<%=v.province_id %>"  class="scroll-sel-li sel-sf-list-item "><%=v.name %></li>
                <%
                })
                %>
            </ul>
        </div>

        <div class="scroll-sel-box sel-sf-box">
            <%
            cities.forEach(function(v,k){
            %>
            <ul class="<%if(k != 0){%>hide<%}%> scroll-sel-list sel-sf-list">
                <%
                v.city.forEach(function(v,k){
                %>
                <li aid="<%=v.aid %>"  class="kw-text-over scroll-sel-li sel-sf-list-item "><%=v.name %></li>
                <%
                })
                %>
            </ul>
            <%
            })
            %>
        </div>
    </div>
    <%
    if(pageType == '1'){
    %>
    <div  class=" btn-green kw-f-bottom head2-b-btn sel-city-ok pc-fixed">完成</div>
    <%
    }
    %>
</div>