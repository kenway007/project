
<div class="kw-pop-panel prep-more-pl">
    <div class="fa fa-caret-up kw-opt-panel-arrow"></div>
    <div class="kw-opt-panel-list">
        <div class="kw-pop-panel-item prep-more-del">删除</div>
    </div>

</div>

<%-tpl.render(tpl_dyn_item,{'rows':[comment],'pageType':'person_reply'}) %>

<div class="pson-rep-main">
    <div class="kw-title pson-rep-title">评论<span class="prp-s-title">(共有<%-list.length%>条评论)</span></div>
    <div class="pson-rep-box">
        <%
        list.forEach(function(v,k){
        %>
        <div class="kw-box kw-wp pson-rep-item">
            <div data-href="#/person?uid=<%=v.uid %>" class="j-href kw-box-center pson-rep-item-l">
                <img src="<%=v.icon %>" class="prep-item-head">
            </div>
            <div class="kw-box-v pson-rep-item-r">
                <div class="kw-txt-li kw-text-over prep-comm-name"><%=v.username %></div>
                <div class="kw-txt-li prep-content"><%=v.content %></div>
                <div class="kw-txt-li prep-comm-time"><%-time.diff(v.posttime) %></div>
            </div>
        </div>
        <%
        })
        %>
    </div>
</div>









<div class="f-bottom kw-box pson-rep-bootom pc-fixed">
    <div data-href="#/person_replay_post?did=<%=did %>" class="j-href kw-box-center prep-bottom-item prep-bottom-rev">
        <div class="fa fa-comment-o prep-bottom-icon"></div>
        <div class="prep-bottom-texst">评论</div>
    </div>
    <div class="kw-box-center prep-bottom-item" style="display: none;">
        <div class="prep-bottom-icon"></div>
        <div class="prep-bottom-texst">对话</div>
    </div>
</div>
