<div class="sel-brand">
    <ul class="sel-brand-list">
        <%
        categories.forEach(function(v,k){
        %>
        <li catid="<%=v.catid %>" class="kw-li kw-box-a-v sel-brand-item">
            <div class="kw-flex1 sel-brand-name"><%=v.name %></div>
            <input ui_label=".sel-brand-item" class="sel-brand-icon" name="cate_name" type="radio" value=""/>
        </li>
        <%
        })
        %>
    </ul>
</div>