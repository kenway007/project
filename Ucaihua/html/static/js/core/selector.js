/**
 * selector.js 
 * jquery精简类，只实现基本的选择器功能
 */
/* Zepto 1.1.2 - zepto event fx data selector - zeptojs.com/license */
var Zepto = function() {
    function G(a) {
        return a == null ? String(a) : z[A.call(a)] || "object";
    }
    function H(a) {
        return G(a) == "function";
    }
    function I(a) {
        return a != null && a == a.window;
    }
    function J(a) {
        return a != null && a.nodeType == a.DOCUMENT_NODE;
    }
    function K(a) {
        return G(a) == "object";
    }
    function L(a) {
        return K(a) && !I(a) && Object.getPrototypeOf(a) == Object.prototype;
    }
    function M(a) {
        return a instanceof Array;
    }
    function N(a) {
        return typeof a.length == "number";
    }
    function O(a) {
        return g.call(a, function(a) {
            return a != null;
        });
    }
    function P(a) {
        return a.length > 0 ? c.fn.concat.apply([], a) : a;
    }
    function Q(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }
    function R(a) {
        return a in j ? j[a] : j[a] = new RegExp("(^|\\s)" + a + "(\\s|$)");
    }
    function S(a, b) {
        return typeof b == "number" && !k[Q(a)] ? b + "px" : b;
    }
    function T(a) {
        var b, c;
        return i[a] || (b = h.createElement(a), h.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), 
        b.parentNode.removeChild(b), c == "none" && (c = "block"), i[a] = c), i[a];
    }
    function U(a) {
        return "children" in a ? f.call(a.children) : c.map(a.childNodes, function(a) {
            if (a.nodeType == 1) return a;
        });
    }
    function V(c, d, e) {
        for (b in d) e && (L(d[b]) || M(d[b])) ? (L(d[b]) && !L(c[b]) && (c[b] = {}), M(d[b]) && !M(c[b]) && (c[b] = []), 
        V(c[b], d[b], e)) : d[b] !== a && (c[b] = d[b]);
    }
    function W(a, b) {
        return b == null ? c(a) : c(a).filter(b);
    }
    function X(a, b, c, d) {
        return H(b) ? b.call(a, c, d) : b;
    }
    function Y(a, b, c) {
        c == null ? a.removeAttribute(b) : a.setAttribute(b, c);
    }
    function Z(b, c) {
        var d = b.className, e = d && d.baseVal !== a;
        if (c === a) return e ? d.baseVal : d;
        e ? d.baseVal = c : b.className = c;
    }
    function $(a) {
        var b;
        try {
            return a ? a == "true" || (a == "false" ? !1 : a == "null" ? null : !/^0/.test(a) && !isNaN(b = Number(a)) ? b : /^[\[\{]/.test(a) ? c.parseJSON(a) : a) : a;
        } catch (d) {
            return a;
        }
    }
    function _(a, b) {
        b(a);
        for (var c in a.childNodes) _(a.childNodes[c], b);
    }
    var a, b, c, d, e = [], f = e.slice, g = e.filter, h = window.document, i = {}, j = {}, k = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, l = /^\s*<(\w+|!)[^>]*>/, m = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, n = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, o = /^(?:body|html)$/i, p = /([A-Z])/g, q = [ "val", "css", "html", "text", "data", "width", "height", "offset" ], r = [ "after", "prepend", "before", "append" ], s = h.createElement("table"), t = h.createElement("tr"), u = {
        tr: h.createElement("tbody"),
        tbody: s,
        thead: s,
        tfoot: s,
        td: t,
        th: t,
        "*": h.createElement("div")
    }, v = /complete|loaded|interactive/, w = /^\.([\w-]+)$/, x = /^#([\w-]*)$/, y = /^[\w-]*$/, z = {}, A = z.toString, B = {}, C, D, E = h.createElement("div"), F = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    };
    return B.matches = function(a, b) {
        if (!b || !a || a.nodeType !== 1) return !1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c) return c.call(a, b);
        var d, e = a.parentNode, f = !e;
        return f && (e = E).appendChild(a), d = ~B.qsa(e, b).indexOf(a), f && E.removeChild(a), 
        d;
    }, C = function(a) {
        return a.replace(/-+(.)?/g, function(a, b) {
            return b ? b.toUpperCase() : "";
        });
    }, D = function(a) {
        return g.call(a, function(b, c) {
            return a.indexOf(b) == c;
        });
    }, B.fragment = function(b, d, e) {
        var g, i, j;
        return m.test(b) && (g = c(h.createElement(RegExp.$1))), g || (b.replace && (b = b.replace(n, "<$1></$2>")), 
        d === a && (d = l.test(b) && RegExp.$1), d in u || (d = "*"), j = u[d], j.innerHTML = "" + b, 
        g = c.each(f.call(j.childNodes), function() {
            j.removeChild(this);
        })), L(e) && (i = c(g), c.each(e, function(a, b) {
            q.indexOf(a) > -1 ? i[a](b) : i.attr(a, b);
        })), g;
    }, B.Z = function(a, b) {
        return a = a || [], a.__proto__ = c.fn, a.selector = b || "", a;
    }, B.isZ = function(a) {
        return a instanceof B.Z;
    }, B.init = function(b, d) {
        var e;
        if (!b) return B.Z();
        if (typeof b == "string") {
            b = b.trim();
            if (b[0] == "<" && l.test(b)) e = B.fragment(b, RegExp.$1, d), b = null; else {
                if (d !== a) return c(d).find(b);
                e = B.qsa(h, b);
            }
        } else {
            if (H(b)) return c(h).ready(b);
            if (B.isZ(b)) return b;
            if (M(b)) e = O(b); else if (K(b)) e = [ b ], b = null; else if (l.test(b)) e = B.fragment(b.trim(), RegExp.$1, d), 
            b = null; else {
                if (d !== a) return c(d).find(b);
                e = B.qsa(h, b);
            }
        }
        return B.Z(e, b);
    }, c = function(a, b) {
        return B.init(a, b);
    }, c.extend = function(a) {
        var b, c = f.call(arguments, 1);
        return typeof a == "boolean" && (b = a, a = c.shift()), c.forEach(function(c) {
            V(a, c, b);
        }), a;
    }, B.qsa = function(a, b) {
        var c, d = b[0] == "#", e = !d && b[0] == ".", g = d || e ? b.slice(1) : b, h = y.test(g);
        return J(a) && h && d ? (c = a.getElementById(g)) ? [ c ] : [] : a.nodeType !== 1 && a.nodeType !== 9 ? [] : f.call(h && !d ? e ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b));
    }, c.contains = function(a, b) {
        return a !== b && a.contains(b);
    }, c.type = G, c.isFunction = H, c.isWindow = I, c.isArray = M, c.isPlainObject = L, 
    c.isEmptyObject = function(a) {
        var b;
        for (b in a) return !1;
        return !0;
    }, c.inArray = function(a, b, c) {
        return e.indexOf.call(b, a, c);
    }, c.camelCase = C, c.trim = function(a) {
        return a == null ? "" : String.prototype.trim.call(a);
    }, c.uuid = 0, c.support = {}, c.expr = {}, c.map = function(a, b) {
        var c, d = [], e, f;
        if (N(a)) for (e = 0; e < a.length; e++) c = b(a[e], e), c != null && d.push(c); else for (f in a) c = b(a[f], f), 
        c != null && d.push(c);
        return P(d);
    }, c.each = function(a, b) {
        var c, d;
        if (N(a)) {
            for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a;
        } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
        return a;
    }, c.grep = function(a, b) {
        return g.call(a, b);
    }, window.JSON && (c.parseJSON = JSON.parse), c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        z["[object " + b + "]"] = b.toLowerCase();
    }), c.fn = {
        forEach: e.forEach,
        reduce: e.reduce,
        push: e.push,
        sort: e.sort,
        indexOf: e.indexOf,
        concat: e.concat,
        map: function(a) {
            return c(c.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return c(f.apply(this, arguments));
        },
        ready: function(a) {
            return v.test(h.readyState) && h.body ? a(c) : h.addEventListener("DOMContentLoaded", function() {
                a(c);
            }, !1), this;
        },
        get: function(b) {
            return b === a ? f.call(this) : this[b >= 0 ? b : b + this.length];
        },
        toArray: function() {
            return this.get();
        },
        size: function() {
            return this.length;
        },
        remove: function() {
            return this.each(function() {
                this.parentNode != null && this.parentNode.removeChild(this);
            });
        },
        each: function(a) {
            return e.every.call(this, function(b, c) {
                return a.call(b, c, b) !== !1;
            }), this;
        },
        filter: function(a) {
            return H(a) ? this.not(this.not(a)) : c(g.call(this, function(b) {
                return B.matches(b, a);
            }));
        },
        add: function(a, b) {
            return c(D(this.concat(c(a, b))));
        },
        is: function(a) {
            return this.length > 0 && B.matches(this[0], a);
        },
        not: function(b) {
            var d = [];
            if (H(b) && b.call !== a) this.each(function(a) {
                b.call(this, a) || d.push(this);
            }); else {
                var e = typeof b == "string" ? this.filter(b) : N(b) && H(b.item) ? f.call(b) : c(b);
                this.forEach(function(a) {
                    e.indexOf(a) < 0 && d.push(a);
                });
            }
            return c(d);
        },
        has: function(a) {
            return this.filter(function() {
                return K(a) ? c.contains(this, a) : c(this).find(a).size();
            });
        },
        eq: function(a) {
            return a === -1 ? this.slice(a) : this.slice(a, +a + 1);
        },
        first: function() {
            var a = this[0];
            return a && !K(a) ? a : c(a);
        },
        last: function() {
            var a = this[this.length - 1];
            return a && !K(a) ? a : c(a);
        },
        find: function(a) {
            var b, d = this;
            return typeof a == "object" ? b = c(a).filter(function() {
                var a = this;
                return e.some.call(d, function(b) {
                    return c.contains(b, a);
                });
            }) : this.length == 1 ? b = c(B.qsa(this[0], a)) : b = this.map(function() {
                return B.qsa(this, a);
            }), b;
        },
        closest: function(a, b) {
            var d = this[0], e = !1;
            typeof a == "object" && (e = c(a));
            while (d && !(e ? e.indexOf(d) >= 0 : B.matches(d, a))) d = d !== b && !J(d) && d.parentNode;
            return c(d);
        },
        parents: function(a) {
            var b = [], d = this;
            while (d.length > 0) d = c.map(d, function(a) {
                if ((a = a.parentNode) && !J(a) && b.indexOf(a) < 0) return b.push(a), a;
            });
            return W(b, a);
        },
        parent: function(a) {
            return W(D(this.pluck("parentNode")), a);
        },
        children: function(a) {
            return W(this.map(function() {
                return U(this);
            }), a);
        },
        contents: function() {
            return this.map(function() {
                return f.call(this.childNodes);
            });
        },
        siblings: function(a) {
            return W(this.map(function(a, b) {
                return g.call(U(b.parentNode), function(a) {
                    return a !== b;
                });
            }), a);
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = "";
            });
        },
        pluck: function(a) {
            return c.map(this, function(b) {
                return b[a];
            });
        },
        show: function() {
            return this.each(function() {
                this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = T(this.nodeName));
            });
        },
        replaceWith: function(a) {
            return this.before(a).remove();
        },
        wrap: function(a) {
            var b = H(a);
            if (this[0] && !b) var d = c(a).get(0), e = d.parentNode || this.length > 1;
            return this.each(function(f) {
                c(this).wrapAll(b ? a.call(this, f) : e ? d.cloneNode(!0) : d);
            });
        },
        wrapAll: function(a) {
            if (this[0]) {
                c(this[0]).before(a = c(a));
                var b;
                while ((b = a.children()).length) a = b.first();
                c(a).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            var b = H(a);
            return this.each(function(d) {
                var e = c(this), f = e.contents(), g = b ? a.call(this, d) : a;
                f.length ? f.wrapAll(g) : e.append(g);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                c(this).replaceWith(c(this).children());
            }), this;
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0);
            });
        },
        hide: function() {
            return this.css("display", "none");
        },
        toggle: function(b) {
            return this.each(function() {
                var d = c(this);
                (b === a ? d.css("display") == "none" : b) ? d.show() : d.hide();
            });
        },
        prev: function(a) {
            return c(this.pluck("previousElementSibling")).filter(a || "*");
        },
        next: function(a) {
            return c(this.pluck("nextElementSibling")).filter(a || "*");
        },
        html: function(a) {
            return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function(b) {
                var d = this.innerHTML;
                c(this).empty().append(X(this, a, b, d));
            });
        },
        text: function(b) {
            return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                this.textContent = b === a ? "" : "" + b;
            });
        },
        attr: function(c, d) {
            var e;
            return typeof c == "string" && d === a ? this.length == 0 || this[0].nodeType !== 1 ? a : c == "value" && this[0].nodeName == "INPUT" ? this.val() : !(e = this[0].getAttribute(c)) && c in this[0] ? this[0][c] : e : this.each(function(a) {
                if (this.nodeType !== 1) return;
                if (K(c)) for (b in c) Y(this, b, c[b]); else Y(this, c, X(this, d, a, this.getAttribute(c)));
            });
        },
        removeAttr: function(a) {
            return this.each(function() {
                this.nodeType === 1 && Y(this, a);
            });
        },
        prop: function(b, c) {
            return b = F[b] || b, c === a ? this[0] && this[0][b] : this.each(function(a) {
                this[b] = X(this, c, a, this[b]);
            });
        },
        data: function(b, c) {
            var d = this.attr("data-" + b.replace(p, "-$1").toLowerCase(), c);
            return d !== null ? $(d) : a;
        },
        val: function(a) {
            return arguments.length === 0 ? this[0] && (this[0].multiple ? c(this[0]).find("option").filter(function() {
                return this.selected;
            }).pluck("value") : this[0].value) : this.each(function(b) {
                this.value = X(this, a, b, this.value);
            });
        },
        offset: function(a) {
            if (a) return this.each(function(b) {
                var d = c(this), e = X(this, a, b, d.offset()), f = d.offsetParent().offset(), g = {
                    top: e.top - f.top,
                    left: e.left - f.left
                };
                d.css("position") == "static" && (g.position = "relative"), d.css(g);
            });
            if (this.length == 0) return null;
            var b = this[0].getBoundingClientRect();
            return {
                left: b.left + window.pageXOffset,
                top: b.top + window.pageYOffset,
                width: Math.round(b.width),
                height: Math.round(b.height)
            };
        },
        css: function(a, d) {
            if (arguments.length < 2) {
                var e = this[0], f = getComputedStyle(e, "");
                if (!e) return;
                if (typeof a == "string") return e.style[C(a)] || f.getPropertyValue(a);
                if (M(a)) {
                    var g = {};
                    return c.each(M(a) ? a : [ a ], function(a, b) {
                        g[b] = e.style[C(b)] || f.getPropertyValue(b);
                    }), g;
                }
            }
            var h = "";
            if (G(a) == "string") !d && d !== 0 ? this.each(function() {
                this.style.removeProperty(Q(a));
            }) : h = Q(a) + ":" + S(a, d); else for (b in a) !a[b] && a[b] !== 0 ? this.each(function() {
                this.style.removeProperty(Q(b));
            }) : h += Q(b) + ":" + S(b, a[b]) + ";";
            return this.each(function() {
                this.style.cssText += ";" + h;
            });
        },
        index: function(a) {
            return a ? this.indexOf(c(a)[0]) : this.parent().children().indexOf(this[0]);
        },
        hasClass: function(a) {
            return a ? e.some.call(this, function(a) {
                return this.test(Z(a));
            }, R(a)) : !1;
        },
        addClass: function(a) {
            return a ? this.each(function(b) {
                d = [];
                var e = Z(this), f = X(this, a, b, e);
                f.split(/\s+/g).forEach(function(a) {
                    c(this).hasClass(a) || d.push(a);
                }, this), d.length && Z(this, e + (e ? " " : "") + d.join(" "));
            }) : this;
        },
        removeClass: function(b) {
            return this.each(function(c) {
                if (b === a) return Z(this, "");
                d = Z(this), X(this, b, c, d).split(/\s+/g).forEach(function(a) {
                    d = d.replace(R(a), " ");
                }), Z(this, d.trim());
            });
        },
        toggleClass: function(b, d) {
            return b ? this.each(function(e) {
                var f = c(this), g = X(this, b, e, Z(this));
                g.split(/\s+/g).forEach(function(b) {
                    (d === a ? !f.hasClass(b) : d) ? f.addClass(b) : f.removeClass(b);
                });
            }) : this;
        },
        scrollTop: function(b) {
            if (!this.length) return;
            var c = "scrollTop" in this[0];
            return b === a ? c ? this[0].scrollTop : this[0].pageYOffset : this.each(c ? function() {
                this.scrollTop = b;
            } : function() {
                this.scrollTo(this.scrollX, b);
            });
        },
        scrollLeft: function(b) {
            if (!this.length) return;
            var c = "scrollLeft" in this[0];
            return b === a ? c ? this[0].scrollLeft : this[0].pageXOffset : this.each(c ? function() {
                this.scrollLeft = b;
            } : function() {
                this.scrollTo(b, this.scrollY);
            });
        },
        position: function() {
            if (!this.length) return;
            var a = this[0], b = this.offsetParent(), d = this.offset(), e = o.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return d.top -= parseFloat(c(a).css("margin-top")) || 0, d.left -= parseFloat(c(a).css("margin-left")) || 0, 
            e.top += parseFloat(c(b[0]).css("border-top-width")) || 0, e.left += parseFloat(c(b[0]).css("border-left-width")) || 0, 
            {
                top: d.top - e.top,
                left: d.left - e.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || h.body;
                while (a && !o.test(a.nodeName) && c(a).css("position") == "static") a = a.offsetParent;
                return a;
            });
        }
    }, c.fn.detach = c.fn.remove, [ "width", "height" ].forEach(function(b) {
        var d = b.replace(/./, function(a) {
            return a[0].toUpperCase();
        });
        c.fn[b] = function(e) {
            var f, g = this[0];
            return e === a ? I(g) ? g["inner" + d] : J(g) ? g.documentElement["scroll" + d] : (f = this.offset()) && f[b] : this.each(function(a) {
                g = c(this), g.css(b, X(this, e, a, g[b]()));
            });
        };
    }), r.forEach(function(a, b) {
        var d = b % 2;
        c.fn[a] = function() {
            var a, e = c.map(arguments, function(b) {
                return a = G(b), a == "object" || a == "array" || b == null ? b : B.fragment(b);
            }), f, g = this.length > 1;
            return e.length < 1 ? this : this.each(function(a, h) {
                f = d ? h : h.parentNode, h = b == 0 ? h.nextSibling : b == 1 ? h.firstChild : b == 2 ? h : null, 
                e.forEach(function(a) {
                    if (g) a = a.cloneNode(!0); else if (!f) return c(a).remove();
                    _(f.insertBefore(a, h), function(a) {
                        a.nodeName != null && a.nodeName.toUpperCase() === "SCRIPT" && (!a.type || a.type === "text/javascript") && !a.src && window.eval.call(window, a.innerHTML);
                    });
                });
            });
        }, c.fn[d ? a + "To" : "insert" + (b ? "Before" : "After")] = function(b) {
            return c(b)[a](this), this;
        };
    }), B.Z.prototype = c.fn, B.uniq = D, B.deserializeValue = $, c.zepto = B, c;
}();

window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto), function(a) {
    function m(a) {
        return a._zid || (a._zid = c++);
    }
    function n(a, b, c, d) {
        b = o(b);
        if (b.ns) var e = p(b.ns);
        return (h[m(a)] || []).filter(function(a) {
            return a && (!b.e || a.e == b.e) && (!b.ns || e.test(a.ns)) && (!c || m(a.fn) === m(c)) && (!d || a.sel == d);
        });
    }
    function o(a) {
        var b = ("" + a).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        };
    }
    function p(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)");
    }
    function q(a, b) {
        return a.del && !j && a.e in k || !!b;
    }
    function r(a) {
        return l[a] || j && k[a] || a;
    }
    function s(b, c, e, f, g, i, j) {
        var k = m(b), n = h[k] || (h[k] = []);
        c.split(/\s/).forEach(function(c) {
            if (c == "ready") return a(document).ready(e);
            var h = o(c);
            h.fn = e, h.sel = g, h.e in l && (e = function(b) {
                var c = b.relatedTarget;
                if (!c || c !== this && !a.contains(this, c)) return h.fn.apply(this, arguments);
            }), h.del = i;
            var k = i || e;
            h.proxy = function(a) {
                a = y(a);
                if (a.isImmediatePropagationStopped()) return;
                a.data = f;
                var c = k.apply(b, a._args == d ? [ a ] : [ a ].concat(a._args));
                return c === !1 && (a.preventDefault(), a.stopPropagation()), c;
            }, h.i = n.length, n.push(h), "addEventListener" in b && b.addEventListener(r(h.e), h.proxy, q(h, j));
        });
    }
    function t(a, b, c, d, e) {
        var f = m(a);
        (b || "").split(/\s/).forEach(function(b) {
            n(a, b, c, d).forEach(function(b) {
                delete h[f][b.i], "removeEventListener" in a && a.removeEventListener(r(b.e), b.proxy, q(b, e));
            });
        });
    }
    function y(b, c) {
        if (c || !b.isDefaultPrevented) {
            c || (c = b), a.each(x, function(a, d) {
                var e = c[a];
                b[a] = function() {
                    return this[d] = u, e && e.apply(c, arguments);
                }, b[d] = v;
            });
            if (c.defaultPrevented !== d ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) b.isDefaultPrevented = u;
        }
        return b;
    }
    function z(a) {
        var b, c = {
            originalEvent: a
        };
        for (b in a) !w.test(b) && a[b] !== d && (c[b] = a[b]);
        return y(c, a);
    }
    var b = a.zepto.qsa, c = 1, d, e = Array.prototype.slice, f = a.isFunction, g = function(a) {
        return typeof a == "string";
    }, h = {}, i = {}, j = "onfocusin" in window, k = {
        focus: "focusin",
        blur: "focusout"
    }, l = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    i.click = i.mousedown = i.mouseup = i.mousemove = "MouseEvents", a.event = {
        add: s,
        remove: t
    }, a.proxy = function(b, c) {
        if (f(b)) {
            var d = function() {
                return b.apply(c, arguments);
            };
            return d._zid = m(b), d;
        }
        if (g(c)) return a.proxy(b[c], b);
        throw new TypeError("expected function");
    }, a.fn.bind = function(a, b, c) {
        return this.on(a, b, c);
    }, a.fn.unbind = function(a, b) {
        return this.off(a, b);
    }, a.fn.one = function(a, b, c, d) {
        return this.on(a, b, c, d, 1);
    };
    var u = function() {
        return !0;
    }, v = function() {
        return !1;
    }, w = /^([A-Z]|returnValue$|layer[XY]$)/, x = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    a.fn.delegate = function(a, b, c) {
        return this.on(b, a, c);
    }, a.fn.undelegate = function(a, b, c) {
        return this.off(b, a, c);
    }, a.fn.live = function(b, c) {
        return a(document.body).delegate(this.selector, b, c), this;
    }, a.fn.die = function(b, c) {
        return a(document.body).undelegate(this.selector, b, c), this;
    }, a.fn.on = function(b, c, h, i, j) {
        var k, l, m = this;
        if (b && !g(b)) return a.each(b, function(a, b) {
            m.on(a, c, h, b, j);
        }), m;
        !g(c) && !f(i) && i !== !1 && (i = h, h = c, c = d);
        if (f(h) || h === !1) i = h, h = d;
        return i === !1 && (i = v), m.each(function(d, f) {
            j && (k = function(a) {
                return t(f, a.type, i), i.apply(this, arguments);
            }), c && (l = function(b) {
                var d, g = a(b.target).closest(c, f).get(0);
                if (g && g !== f) return d = a.extend(z(b), {
                    currentTarget: g,
                    liveFired: f
                }), (k || i).apply(g, [ d ].concat(e.call(arguments, 1)));
            }), s(f, b, i, h, c, l || k);
        });
    }, a.fn.off = function(b, c, e) {
        var h = this;
        return b && !g(b) ? (a.each(b, function(a, b) {
            h.off(a, c, b);
        }), h) : (!g(c) && !f(e) && e !== !1 && (e = c, c = d), e === !1 && (e = v), h.each(function() {
            t(this, b, e, c);
        }));
    }, a.fn.trigger = function(b, c) {
        return b = g(b) || a.isPlainObject(b) ? a.Event(b) : y(b), b._args = c, this.each(function() {
            "dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c);
        });
    }, a.fn.triggerHandler = function(b, c) {
        var d, e;
        return this.each(function(f, h) {
            d = z(g(b) ? a.Event(b) : b), d._args = c, d.target = h, a.each(n(h, b.type || b), function(a, b) {
                e = b.proxy(d);
                if (d.isImmediatePropagationStopped()) return !1;
            });
        }), e;
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.trigger(b);
        };
    }), [ "focus", "blur" ].forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.each(function() {
                try {
                    this[b]();
                } catch (a) {}
            }), this;
        };
    }), a.Event = function(a, b) {
        g(a) || (b = a, a = b.type);
        var c = document.createEvent(i[a] || "Events"), d = !0;
        if (b) for (var e in b) e == "bubbles" ? d = !!b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0), y(c);
    };
}(Zepto), function(a, b) {
    function u(a) {
        return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase();
    }
    function v(a) {
        return d ? d + a : a.toLowerCase();
    }
    var c = "", d, e, f, g = {
        Webkit: "webkit",
        Moz: "",
        O: "o"
    }, h = window.document, i = h.createElement("div"), j = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, k, l, m, n, o, p, q, r, s, t = {};
    a.each(g, function(a, e) {
        if (i.style[a + "TransitionProperty"] !== b) return c = "-" + a.toLowerCase() + "-", 
        d = e, !1;
    }), k = c + "transform", t[l = c + "transition-property"] = t[m = c + "transition-duration"] = t[o = c + "transition-delay"] = t[n = c + "transition-timing-function"] = t[p = c + "animation-name"] = t[q = c + "animation-duration"] = t[s = c + "animation-delay"] = t[r = c + "animation-timing-function"] = "", 
    a.fx = {
        off: d === b && i.style.transitionProperty === b,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: c,
        transitionEnd: v("TransitionEnd"),
        animationEnd: v("AnimationEnd")
    }, a.fn.animate = function(c, d, e, f, g) {
        return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), 
        a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), 
        d && (d = (typeof d == "number" ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), 
        g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g);
    }, a.fn.anim = function(c, d, e, f, g) {
        var h, i = {}, v, w = "", x = this, y, z = a.fx.transitionEnd, A = !1;
        d === b && (d = a.fx.speeds._default / 1e3), g === b && (g = 0), a.fx.off && (d = 0);
        if (typeof c == "string") i[p] = c, i[q] = d + "s", i[s] = g + "s", i[r] = e || "linear", 
        z = a.fx.animationEnd; else {
            v = [];
            for (h in c) j.test(h) ? w += h + "(" + c[h] + ") " : (i[h] = c[h], v.push(u(h)));
            w && (i[k] = w, v.push(k)), d > 0 && typeof c == "object" && (i[l] = v.join(", "), 
            i[m] = d + "s", i[o] = g + "s", i[n] = e || "linear");
        }
        return y = function(b) {
            if (typeof b != "undefined") {
                if (b.target !== b.currentTarget) return;
                a(b.target).unbind(z, y);
            } else a(this).unbind(z, y);
            A = !0, a(this).css(t), f && f.call(this);
        }, d > 0 && (this.bind(z, y), setTimeout(function() {
            if (A) return;
            y.call(x);
        }, d * 1e3 + 25)), this.size() && this.get(0).clientLeft, this.css(i), d <= 0 && setTimeout(function() {
            x.each(function() {
                y.call(this);
            });
        }, 0), this;
    }, i = null;
}(Zepto), function(a) {
    function g(f, g) {
        var i = f[e], j = i && b[i];
        if (g === undefined) return j || h(f);
        if (j) {
            if (g in j) return j[g];
            var k = d(g);
            if (k in j) return j[k];
        }
        return c.call(a(f), g);
    }
    function h(c, f, g) {
        var h = c[e] || (c[e] = ++a.uuid), j = b[h] || (b[h] = i(c));
        return f !== undefined && (j[d(f)] = g), j;
    }
    function i(b) {
        var c = {};
        return a.each(b.attributes || f, function(b, e) {
            e.name.indexOf("data-") == 0 && (c[d(e.name.replace("data-", ""))] = a.zepto.deserializeValue(e.value));
        }), c;
    }
    var b = {}, c = a.fn.data, d = a.camelCase, e = a.expando = "Zepto" + +new Date(), f = [];
    a.fn.data = function(b, c) {
        return c === undefined ? a.isPlainObject(b) ? this.each(function(c, d) {
            a.each(b, function(a, b) {
                h(d, a, b);
            });
        }) : this.length == 0 ? undefined : g(this[0], b) : this.each(function() {
            h(this, b, c);
        });
    }, a.fn.removeData = function(c) {
        return typeof c == "string" && (c = c.split(/\s+/)), this.each(function() {
            var f = this[e], g = f && b[f];
            g && a.each(c || g, function(a) {
                delete g[c ? d(this) : a];
            });
        });
    }, [ "remove", "empty" ].forEach(function(b) {
        var c = a.fn[b];
        a.fn[b] = function() {
            var a = this.find("*");
            return b === "remove" && (a = a.add(this)), a.removeData(), c.call(this);
        };
    });
}(Zepto), function(a) {
    function e(b) {
        return b = a(b), (!!b.width() || !!b.height()) && b.css("display") !== "none";
    }
    function j(a, b) {
        a = a.replace(/=#\]/g, '="#"]');
        var c, d, e = g.exec(a);
        if (e && e[2] in f) {
            c = f[e[2]], d = e[3], a = e[1];
            if (d) {
                var h = Number(d);
                isNaN(h) ? d = d.replace(/^["']|["']$/g, "") : d = h;
            }
        }
        return b(a, c, d);
    }
    var b = a.zepto, c = b.qsa, d = b.matches, f = a.expr[":"] = {
        visible: function() {
            if (e(this)) return this;
        },
        hidden: function() {
            if (!e(this)) return this;
        },
        selected: function() {
            if (this.selected) return this;
        },
        checked: function() {
            if (this.checked) return this;
        },
        parent: function() {
            return this.parentNode;
        },
        first: function(a) {
            if (a === 0) return this;
        },
        last: function(a, b) {
            if (a === b.length - 1) return this;
        },
        eq: function(a, b, c) {
            if (a === c) return this;
        },
        contains: function(b, c, d) {
            if (a(this).text().indexOf(d) > -1) return this;
        },
        has: function(a, c, d) {
            if (b.qsa(this, d).length) return this;
        }
    }, g = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), h = /^\s*>/, i = "Zepto" + +new Date();
    b.qsa = function(d, e) {
        return j(e, function(f, g, j) {
            try {
                var k;
                !f && g ? f = "*" : h.test(f) && (k = a(d).addClass(i), f = "." + i + " " + f);
                var l = c(d, f);
            } catch (m) {
                throw console.error("error performing selector: %o", e), m;
            } finally {
                k && k.removeClass(i);
            }
            return g ? b.uniq(a.map(l, function(a, b) {
                return g.call(a, b, l, j);
            })) : l;
        });
    }, b.matches = function(a, b) {
        return j(b, function(b, c, e) {
            return (!b || d(a, b)) && (!c || c.call(a, null, e) === a);
        });
    };
}(Zepto);

define("core/selector", [], function(require, exports, module) {
    "use strict";
    module.exports = Zepto;
});