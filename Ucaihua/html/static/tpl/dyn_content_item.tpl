<%
if(rows.length > 0){
rows.forEach(function(v,k){
var d_time = time.format(v.d_time*1);
var dlike = v.demands_like;
%>
    <div class="dyn-item" did="<%=v.did %>">

    <div class="pson-rep-top">
        <div class="kw-wp kw-box-a-v pson-rep-per">
            <div data-href="#/person?uid=<%=v.uid %>" class="j-href prpt-l">
                <img class="prpt-l-head" src="<%=v.icon %>">
            </div>
            <div class="prpt-m kw-flex1 kw-text-over">
                <div class="kw-txt-li kw-box-a-v ">
                    <div class="prpt-m-name"><%=v.realname %></div>
                    <div class="prpt-m-tname"><%=v.all_type_name || '' %></div>
                </div>
                <div class="kw-txt-li kw-box-a-v ">
                    <%
                    var cname = v.subject.name;
                    if(cname && pageType == 'person_reply'){
                    %>
                    <div data-href="#/company?sid=<%=v.subject.sid %>" class="j-href prpt-m-cname"><%=cname %></div>
                    <%
                    }
                    %>
                </div>
                <div class="kw-txt-li kw-box-a-v ">
                    <div class="prpt-m-address"><%=v.d_address %></div>
                    <div class="prpt-m-time"><%=d_time%></div>
                </div>
            </div>
            <%
                if(pageType == 'person_reply'){
            %>
            <div class="prpt-r">
                <div class="btn-green prpt-r-atten j-favorite" follow=<%if(v.follow_flag == 1){ %> "1" <%}else{%> "0" <% }%> ><%-v.follow_flag == 1 ?'已关注':'关注' %></div>
            </div>
            <%
                }
            %>
        </div>
    </div>




    <%
    if(v.pictures && v.pictures.length <= 0){
        v.pictures = [C.subject_default];
    }
    %>

    <div class="prp-imgs-wp">
        <div data-href="#/person_reply?uid=<%=v.uid %>!!did=<%=v.did %>" class="<% if(pageType =='dyn' || pageType =='person_dyn'){%>j-href<%}%> prp-imgs-box" <%if(pageType=='person_reply'){%>id="prp-imgs-box"<%}%>>
            <div class="banner-content  prp-imgs-scroll">
                <%
                var pictures;
                if(v.pictures === ''){
                    pictures = [C.subject_default]
                }else{
                    pictures = v.pictures
                }
                pictures.forEach(function(v,k){
                    if(pageType == 'dyn' && k>0){
                        return;
                    }
                %>
                <div class="banner-content-item prp-imgs-item" style="background-image:url('<%=v %>')"></div>
                <%
                })
                %>
            </div>
        <div class="banner-btns company-ad-btns"></div>

        </div>

        <div did="<%=v.did %>" class="j-dyn-like kw-box-center prp-like <%if(dlike.like == 1){%>active<%}%> ">
            <div class="fa fa-heart prp-like-header"></div>
        </div>
    </div>

<div class="prp-info">
    <div class="kw-box kw-wp prp-info-btn">
        <div class="kw-box prp-btn-item prp-btn-like">
            <div class="fa fa-heart prp-btn-icon prpb-like-icon"></div>
            <div class="prpb-like-num"><%=dlike.nums %></div>
        </div>
        <div class="kw-box prp-btn-item prp-btn-comm">
            <div class="fa fa-comment prp-btn-icon prpb-comm-icon"></div>
            <div class="prpb-comm-num"><%=v.comment_num %></div>
        </div>
        <div class="kw-box prp-btn-item prp-btn-comm">
            <div class="fa fa-eye prp-btn-icon prpb-view-icon"></div>
            <div class="prpb-view-num"><%=v.pageviews %></div>
        </div>
    </div>
    <div data-href="#/person_reply?uid=<%=v.uid %>!!did=<%=v.did %>" class="<%if(pageType=='dyn' || pageType == 'person_dyn'){%>j-href<%}%> kw-wp prp-content"><%=v.content %></div>
    <%
    if(dlike.all.length > 0){
    %>
    <div class="kw-box prp-comm-per">
        <div class="kw-box prp-comm-head kw-flex1">
            <%
            var prpch_head = {};
            dlike.all.forEach(function(v,k){
            %>
            <div data-href="#/person?uid=<%=v.uid %>" class="j-href prpch-img-box">
                <img class="prpch-img" src="<%=v.icon %>">
            </div>
            <%
            })
            %>
        </div>
        <div class="prp-comm-per-num"><%=dlike.nums%></div>
    </div>


</div>
<%
}
%>
</div>
</div>




<%
})}else{
%>
<div class="dyn-content-none">没有动态!</div>
<%
}
%>