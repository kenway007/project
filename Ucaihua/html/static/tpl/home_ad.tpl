<div class="home-ad" id="home-ad">
    <div class="banner-content home-ad-scroll">
        <%
            adv_list.forEach(function(v,k){
        %>
        <div class="banner-content-item">
            <img data-href="#/company?sid=<%=v.img_sid %>" src="<%=v.img_src%>" class="j-href kw-img home-scroll">
        </div>
        <%
            })
        %>
    </div>
    <div class="banner-btns company-ad-btns"></div>
</div>