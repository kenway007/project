<div id="persondyn-wp">
    <div class="persondyn-box">
        <div class="persondyn-head">
            <div class="persondyn-head-box">
                <div class="persondyn-head-imgs">
                    <img src="<%=icon %>" class="persondyn-head-img">
                </div>
                <div class="persondyn-head-name"><%=realname %></div>
            </div>

        </div>


        <div class="persondyn-main">
            <div class="dyn-content">
                <%-tpl.render(tpl_dci,{rows : rows,pageType:pageType}) %>
            </div>
        </div>
    </div>
</div>


