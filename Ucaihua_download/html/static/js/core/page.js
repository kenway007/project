/**
 * page.js
 * 2015/04/15
 * 1、添加onPageShow、onPageHide、onPageChange事件
/**/

define("core/page", [], function(require, exports) {
    "use strict";
    var running = false,
        hasHashChangeEvent = "onhashchange" in window,
        hasAddEventListener = "addEventListener" in window,
        showDefaultPage,
        lastPage;
    /**
     * 启动路由
     * @param  {string} defaultPage 默认页面
     * @return {null}
     */
    exports.start = function(defaultPage) {
        if (!running) {
            if (hasAddEventListener) {
                window.addEventListener("hashchange", onhashchange, false);
            } else if (hasHashChangeEvent) {
                window.onhashchange = onhashchange;
            }
            running = true;
            if (typeof defaultPage === "string") {
                showDefaultPage = function() {
                    //changePage(defaultPage);
                    location.replace("#/" + defaultPage);
                };
            }
            onhashchange({
                newURL: window.location.href
            });
        }
    };

    //页面跳转
    function onhashchange(e) {
        if (!running) return;
        var oldCtx = parseURL(e.oldURL);
        var newCtx = parseURL(e.newURL);
        if (lastPage && oldCtx.page === newCtx.page) {
            lastPage.show(newCtx.state);
            return;
        }
        if (!lastPage && oldCtx.page) {
            var oldPage = document.getElementById("page-" + oldCtx.page);
            if (oldPage) {
                oldPage.style["display"] = "none";
            }
        }
        changePage(newCtx.page, newCtx.state);
    }
    /**
     * 将URL解析成page和state
     * @param  {string} url 原始url地址
     * @return {object}    解析后的上下文，包括url、page、state三个属性
     */
    function parseURL(url) {
        url = url || "";
        var decode = window.decodeURIComponent;
        var hashIndex = url.indexOf("#/"), hash = hashIndex >= 0 ? url.slice(hashIndex + 2) : "";
        var searchIndex = hash.indexOf("?"), search = searchIndex >= 0 ? hash.slice(searchIndex + 1) : "";
        var page = searchIndex >= 0 ? hash.slice(0, searchIndex) : hash;
        // Fragment shouldn't contain `&`, use `!!` instead
        // http://tools.ietf.org/html/rfc3986
        // @example #!/wallpaper?super=beauty!!sub=nude
        var pairs = search.split("!!"), state = {};
        for (var j = 0; j < pairs.length; j++) {
            var pair = pairs[j].replace(/\+/g, "%20"), i = pair.indexOf("="), key = ~i ? pair.slice(0, i) : pair, value = ~i ? pair.slice(i + 1) : "";
            try {
                key = decode(key);
                value = decode(value);
            } catch (e) {
                console.log(e);
            }
            state[key] = value;
        }
        return {
            url: url,
            page: page,
            state: state
        };
    }
    /**
     * 切换页面
     * @param {string} page  页面名称
     * @param {object} state 状态兑对象
     */
    function changePage(page, state) {
        exports.onPageChange ?  exports.onPageChange(state) : '';
        if (page === "") {
            showDefaultPage();
            return;
        }
        // todo: 过场?
        seajs.use("page/" + page, function(newPage) {
            if (newPage) {
                if (lastPage && lastPage.hide) {
                    exports.onPageHide ?  exports.onPageHide(state) : '';
                    lastPage.hide();
                }
                if (newPage.show) {
                    exports.onPageShow ?  exports.onPageShow(state) : '';
                    newPage.show(state);
                }
                lastPage = newPage;
            } else {
                showDefaultPage();
            }
        });
    }



});