<div class="login-wel-main pc-fixed" >


    <div class="login-wel-wp pc-fixed" id="login-wel-wp">
        <div class="login-wel-box banner-content">
            <% 
                for(var i=1,len=5; i <len; i++){
            %>
            <div class="banner-content-item kw-box-center login-wel-item login-wel-item0<%=i %>">
                <img class="lwel-img" src="img/login-wel-item0<%=i %>.png">
            </div>
            <%
                }
            %>
        </div>
    </div>


    <div class="kw-box-center kw-f-bottom login-wel-bottom pc-fixed">
        <div class="kw-box-a-v login-wel-focus">
        </div>
        <div class="kw-box login-wel-b-box">
            <div data-href="#/reg" class="j-href kw-flex1 login-wel-b-item  login-wel-reg">注册</div>
            <div data-href="#/login" class="j-href kw-flex1 login-wel-b-item login-wel-login">登陆</div>
        </div>
    </div>

</div>