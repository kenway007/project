<%
    var userInfo = C.userInfo || {};
    var username = userInfo['username'] || ''
%>
<div class="kw-wp login-main">
    <div class="kw-wp login-box">
        <div class="kw-input01">
            <div class="kw-input01-b kw-input01-l"></div>
            <input class="kw-input01-val login-input login-username" placeholder="用户名" name="username" type="text" value="<%=username %>" />
            <div class="kw-input01-b kw-input01-r"></div>
        </div>

        <div class="kw-input01">
            <div class="kw-input01-b kw-input01-l"></div>
            <input class="kw-input01-val login-input login-password" placeholder="密码" name="password" type="password" />
            <div class="kw-input01-b kw-input01-r"></div>
        </div>
    </div>

    <div class="btn-green login-btn">登陆</div>


    <div class="login-other">
        <div data-href="#/forget_pw" class="j-href login-other-item login-other-r">忘记密码?</div>
        <div data-href="#/reg" class="j-href login-other-l">免费注册</div>
    </div>

</div>