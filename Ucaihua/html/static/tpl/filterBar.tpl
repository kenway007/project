
<%
    data.forEach(function(v,k){
%>
    <div class="filterBar-item">
        <div class="filterBar-title">
            <div class="filterBar-title-text"><%=v.name %></div>
            <div class="filterBar-title-icon"> > </div>
        </div>
        <div class="filterBar-content">

        </div>
    </div>
<%
    })
%>