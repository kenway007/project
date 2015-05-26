<div class="sel-sf">

    <div class="kw-box-center scroll-sel-root sel-sf-root ">
        <div class="scroll-sel-box sel-sf-box">
            <ul class="scroll-sel-list sel-sf-list">
                <%
                c_type.forEach(function(v,k){
                %>
                <li typeid="<%=v.typeid %>" class="scroll-sel-li sel-sf-list-item <%if(k==0){%> active <%}%>>"><%=v.typename %></li>
                <%
                    })
                %>
            </ul>
        </div>
    </div>

    <div class="kw-wp sel-sf-company">

        <div class=" kw-input01">
            <div class="kw-input01-b kw-input01-l"></div>
            <input type="text" class="kw-input sel-sf-cp-input" name="company_name" placeholder="请输入公司名称"/>
            <div class="kw-input01-b kw-input01-r"></div>
        </div>

        <div class=" kw-input01">
            <div class="kw-input01-b kw-input01-l"></div>
            <input type="text" class="kw-input sel-sf-cp-input" name="company_addr" placeholder="请输入公司地址"/>
            <div class="kw-input01-b kw-input01-r"></div>
        </div>
    </div>

    <div  class="btn-green kw-f-bottom sel-sf-next pc-fixed">下一步</div>
</div>