<div class="sel-sf">

    <div class="kw-box-center scroll-sel-root sel-sf-root ">
        <div class="scroll-sel-box sel-sf-box">
            <ul class="scroll-sel-list sel-sf-list">
                <%
                categories.forEach(function(v,k){
                %>
                <li catid="<%=v.catid %>"  class="scroll-sel-li sel-sf-list-item "><%=v.name %></li>
                <%
                    })
                %>
            </ul>
        </div>

        <div class="scroll-sel-box sel-sf-box">
            <%
            categories.forEach(function(v,k){
            %>
            <ul class="<%if(k != 0){%>hide<%}%> scroll-sel-list sel-sf-list">
                <%
                v.sub_categories.forEach(function(v,k){
                %>
                <li catid="<%=v.catid %>"  class="kw-text-over scroll-sel-li sel-sf-list-item "><%=v.name %></li>
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
    <div data-href="#/sel_brand" class="btn-green kw-f-bottom sel-sf-next pc-fixed">下一步</div>
    <% 
        }
    %>
</div>