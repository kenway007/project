<%
    data.forEach(function(v,k){
%>
    <div class="filterBar-content-item" catid="<%=v.catid %>"><%=v.name %></div>
<%
    })
%>