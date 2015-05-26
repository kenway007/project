
<%
    var title = head2.title || '';
    var right = head2.right || '';
%>
<div class="head2 pc-fixed">
    <div class="fa fa-chevron-left head2-item box-center head2-icon j-back"></div>
    <div class="head2-item box-center head2-title"><%=title %></div>
    <div class="head2-item box-center head2-right"><%if(right)  {%> <%-right %> <%}%></div>
</div>