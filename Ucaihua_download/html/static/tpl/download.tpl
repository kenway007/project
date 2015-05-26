<div class="login-wel-main pc-fixed" >
    <% 
        if(common.is_weixn()){
            $('#globle-mask').show();
    %>
        <div class="download-tip pc-fixed">
            <img class="download-tip-content" src="img/wx_tip.png">
        </div>
    <%
        }
    %>

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
        <div class="kw-box-a-v login-wel-focus"></div>
        <div class="kw-box login-wel-b-box">
            <a href="itms-services://?action=download-manifest&url=https://dn-servers-three.qbox.me/ucaihua-iphone.plist"  class="kw-flex1 login-wel-b-item  login-wel-reg">iPhone下载</a>
            <a href="http://www.pccn.com.cn/app/pccn.apk" class="kw-flex1 login-wel-b-item login-wel-login">安卓下载</a>
        </div>
    </div>



</div>