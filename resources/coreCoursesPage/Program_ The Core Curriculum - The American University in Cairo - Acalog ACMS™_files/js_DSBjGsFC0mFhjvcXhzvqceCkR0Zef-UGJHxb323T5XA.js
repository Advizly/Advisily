/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */




! function(e, t) {
    typeof module != "undefined" ? module.exports = t() : typeof define == "function" && typeof define.amd == "object" ? define(t) : this[e] = t()
}("domready", function() {
    var e = [],
        t, n = document,
        r = n.documentElement.doScroll,
        i = "DOMContentLoaded",
        s = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
    return s || n.addEventListener(i, t = function() {
            n.removeEventListener(i, t), s = 1;
            while (t = e.shift()) t()
        }),
        function(t) {
            s ? setTimeout(t, 0) : e.push(t)
        }
});
/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function(r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r),
                a = (o || r).length,
                c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function(t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t)) return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function(e, u, i) {
            var o = 0,
                a = O(e);
            if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u) return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length,
            e = n.constructor,
            u = m.isFunction(e) && e.prototype || a,
            i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this,
        i = u._,
        o = Array.prototype,
        a = Object.prototype,
        c = Function.prototype,
        f = o.push,
        l = o.slice,
        s = a.toString,
        p = a.hasOwnProperty,
        h = Array.isArray,
        v = Object.keys,
        g = c.bind,
        y = Object.create,
        d = function() {},
        m = function(n) {
            return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function(n, t, r) {
            if (t === void 0) return n;
            switch (null == r ? 3 : r) {
                case 1:
                    return function(r) {
                        return n.call(t, r)
                    };
                case 2:
                    return function(r, e) {
                        return n.call(t, r, e)
                    };
                case 3:
                    return function(r, e, u) {
                        return n.call(t, r, e, u)
                    };
                case 4:
                    return function(r, e, u, i) {
                        return n.call(t, r, e, u, i)
                    }
            }
            return function() {
                return n.apply(t, arguments)
            }
        },
        x = function(n, t, r) {
            return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
        };
    m.iteratee = function(n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function(n, t) {
            return function(r) {
                var e = arguments.length;
                if (2 > e || null == r) return r;
                for (var u = 1; e > u; u++)
                    for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                        var f = o[c];
                        t && r[f] !== void 0 || (r[f] = i[f])
                    }
                return r
            }
        },
        j = function(n) {
            if (!m.isObject(n)) return {};
            if (y) return y(n);
            d.prototype = n;
            var t = new d;
            return d.prototype = null, t
        },
        w = function(n) {
            return function(t) {
                return null == t ? void 0 : t[n]
            }
        },
        A = Math.pow(2, 53) - 1,
        O = w("length"),
        k = function(n) {
            var t = O(n);
            return "number" == typeof t && t >= 0 && A >= t
        };
    m.each = m.forEach = function(n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0, u = n.length; u > e; e++) t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function(n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
    }, m.filter = m.select = function(n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function(n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1
        }
        return !0
    }, m.some = m.any = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function(n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function(n, t) {
        var r = l.call(arguments, 2),
            e = m.isFunction(t);
        return m.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function(n, t) {
        return m.map(n, m.property(t))
    }, m.where = function(n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function(n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, m.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
        });
        return i
    }, m.shuffle = function(n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function(n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function(n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function(n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function(n, t, r) {
        n[r] = t
    }), m.countBy = F(function(n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function(n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function(n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function(n, t, r) {
        t = x(t, r);
        var e = [],
            u = [];
        return m.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function(n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function(n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function(n) {
        return m.filter(n, m.identity)
    };
    var S = function(n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0,
                    l = c.length;
                for (u.length += l; l > f;) u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function(n, t) {
        return S(n, t, !1)
    }, m.without = function(n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function(n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o],
                f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function() {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function(n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function(n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function(n) {
            return !m.contains(t, n)
        })
    }, m.zip = function() {
        return m.unzip(arguments)
    }, m.unzip = function(n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
        return r
    }, m.object = function(n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function(n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function(n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var E = function(n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = j(n.prototype),
            o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function(n, t) {
        if (g && n.bind === g) return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2),
            e = function() {
                return E(n, e, t, this, r.concat(l.call(arguments)))
            };
        return e
    }, m.partial = function(n) {
        var t = l.call(arguments, 1),
            r = function() {
                for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
                for (; e < arguments.length;) i.push(arguments[e++]);
                return E(n, r, this, this, i)
            };
        return r
    }, m.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache,
                i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function(n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(n, t, r) {
        var e, u, i, o = null,
            a = 0;
        r || (r = {});
        var c = function() {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function() {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function() {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function() {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function(n, t) {
        return m.partial(t, n)
    }, m.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }, m.compose = function() {
        var n = arguments,
            t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, m.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(n) {
        if (!m.isObject(n)) return [];
        if (v) return v(n);
        var t = [];
        for (var r in n) m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function(n) {
        if (!m.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return M && e(n, t), t
    }, m.values = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, m.mapObject = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function(n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function(n) {
        var t = [];
        for (var r in n) m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i], t(n[e], e, n)) return e
    }, m.pick = function(n, t, r) {
        var e, u, i = {},
            o = n;
        if (null == o) return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function(n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a],
                l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function(n, t, r) {
        if (m.isFunction(t)) t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function(n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function(n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function(n, t) {
        return t(n), n
    }, m.isMatch = function(n, t) {
        var r = m.keys(t),
            e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    };
    var N = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t)) return !1;
        switch (u) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + t;
            case "[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t) return !1;
            var o = n.constructor,
                a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;)
            if (r[c] === n) return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length) return !1;
            for (; c--;)
                if (!N(n[c], t[c], r, e)) return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c) return !1;
            for (; c--;)
                if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function(n, t) {
        return N(n, t)
    }, m.isEmpty = function(n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, m.isArray = h || function(n) {
        return "[object Array]" === s.call(n)
    }, m.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        m["is" + n] = function(t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function(n) {
        return m.has(n, "callee")
    }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
        return "function" == typeof n || !1
    }), m.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function(n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function(n) {
        return null === n
    }, m.isUndefined = function(n) {
        return n === void 0
    }, m.has = function(n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function() {
        return u._ = i, this
    }, m.identity = function(n) {
        return n
    }, m.constant = function(n) {
        return function() {
            return n
        }
    }, m.noop = function() {}, m.property = w, m.propertyOf = function(n) {
        return null == n ? function() {} : function(t) {
            return n[t]
        }
    }, m.matcher = m.matches = function(n) {
        return n = m.extendOwn({}, n),
            function(t) {
                return m.isMatch(t, n)
            }
    }, m.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e
    }, m.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function() {
        return (new Date).getTime()
    };
    var B = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        T = m.invert(B),
        R = function(n) {
            var t = function(t) {
                    return n[t]
                },
                r = "(?:" + m.keys(n).join("|") + ")",
                e = RegExp(r),
                u = RegExp(r, "g");
            return function(n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    m.escape = R(B), m.unescape = R(T), m.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function(n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/,
        z = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        D = /\\|'|\r|\n|\u2028|\u2029/g,
        L = function(n) {
            return "\\" + z[n]
        };
    m.template = function(n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
            u = 0,
            i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function(n) {
                return o.call(this, n, m)
            },
            f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function(n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function(n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function(n) {
        m.each(m.functions(n), function(t) {
            var r = m[t] = n[t];
            m.prototype[t] = function() {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function() {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return m
    })
}).call(this);

/*!
 * jQuery Once v2.2.0 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e) {
    "use strict";
    if (typeof exports === "object") {
        e(require("jquery"))
    } else if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function(e) {
    "use strict";
    var n = function(e) {
        e = e || "once";
        if (typeof e !== "string") {
            throw new TypeError("The jQuery Once id parameter must be a string")
        }
        return e
    };
    e.fn.once = function(t) {
        var r = "jquery-once-" + n(t);
        return this.filter(function() {
            return e(this).data(r) !== true
        }).data(r, true)
    };
    e.fn.removeOnce = function(e) {
        return this.findOnce(e).removeData("jquery-once-" + n(e))
    };
    e.fn.findOnce = function(t) {
        var r = "jquery-once-" + n(t);
        return this.filter(function() {
            return e(this).data(r) === true
        })
    }
});

/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function() {
    var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');

    window.drupalSettings = {};

    if (settingsElement !== null) {
        window.drupalSettings = JSON.parse(settingsElement.textContent);
    }
})();;
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

window.Drupal = {
    behaviors: {},
    locale: {}
};

(function(Drupal, drupalSettings, drupalTranslations) {
    Drupal.throwError = function(error) {
        setTimeout(function() {
            throw error;
        }, 0);
    };

    Drupal.attachBehaviors = function(context, settings) {
        context = context || document;
        settings = settings || drupalSettings;
        var behaviors = Drupal.behaviors;

        Object.keys(behaviors || {}).forEach(function(i) {
            if (typeof behaviors[i].attach === 'function') {
                try {
                    behaviors[i].attach(context, settings);
                } catch (e) {
                    Drupal.throwError(e);
                }
            }
        });
    };

    Drupal.detachBehaviors = function(context, settings, trigger) {
        context = context || document;
        settings = settings || drupalSettings;
        trigger = trigger || 'unload';
        var behaviors = Drupal.behaviors;

        Object.keys(behaviors || {}).forEach(function(i) {
            if (typeof behaviors[i].detach === 'function') {
                try {
                    behaviors[i].detach(context, settings, trigger);
                } catch (e) {
                    Drupal.throwError(e);
                }
            }
        });
    };

    Drupal.checkPlain = function(str) {
        str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return str;
    };

    Drupal.formatString = function(str, args) {
        var processedArgs = {};

        Object.keys(args || {}).forEach(function(key) {
            switch (key.charAt(0)) {
                case '@':
                    processedArgs[key] = Drupal.checkPlain(args[key]);
                    break;

                case '!':
                    processedArgs[key] = args[key];
                    break;

                default:
                    processedArgs[key] = Drupal.theme('placeholder', args[key]);
                    break;
            }
        });

        return Drupal.stringReplace(str, processedArgs, null);
    };

    Drupal.stringReplace = function(str, args, keys) {
        if (str.length === 0) {
            return str;
        }

        if (!Array.isArray(keys)) {
            keys = Object.keys(args || {});

            keys.sort(function(a, b) {
                return a.length - b.length;
            });
        }

        if (keys.length === 0) {
            return str;
        }

        var key = keys.pop();
        var fragments = str.split(key);

        if (keys.length) {
            for (var i = 0; i < fragments.length; i++) {
                fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
            }
        }

        return fragments.join(args[key]);
    };

    Drupal.t = function(str, args, options) {
        options = options || {};
        options.context = options.context || '';

        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
            str = drupalTranslations.strings[options.context][str];
        }

        if (args) {
            str = Drupal.formatString(str, args);
        }
        return str;
    };

    Drupal.url = function(path) {
        return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
    };

    Drupal.url.toAbsolute = function(url) {
        var urlParsingNode = document.createElement('a');

        try {
            url = decodeURIComponent(url);
        } catch (e) {}

        urlParsingNode.setAttribute('href', url);

        return urlParsingNode.cloneNode(false).href;
    };

    Drupal.url.isLocal = function(url) {
        var absoluteUrl = Drupal.url.toAbsolute(url);
        var protocol = window.location.protocol;

        if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
            protocol = 'https:';
        }
        var baseUrl = protocol + '//' + window.location.host + drupalSettings.path.baseUrl.slice(0, -1);

        try {
            absoluteUrl = decodeURIComponent(absoluteUrl);
        } catch (e) {}
        try {
            baseUrl = decodeURIComponent(baseUrl);
        } catch (e) {}

        return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
    };

    Drupal.formatPlural = function(count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;

        var pluralDelimiter = drupalSettings.pluralDelimiter;
        var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
        var index = 0;

        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
            index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
        } else if (args['@count'] !== 1) {
            index = 1;
        }

        return translations[index];
    };

    Drupal.encodePath = function(item) {
        return window.encodeURIComponent(item).replace(/%2F/g, '/');
    };

    Drupal.theme = function(func) {
        if (func in Drupal.theme) {
            var _Drupal$theme;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return (_Drupal$theme = Drupal.theme)[func].apply(_Drupal$theme, args);
        }
    };

    Drupal.theme.placeholder = function(str) {
        return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>';
    };
})(Drupal, window.drupalSettings, window.drupalTranslations);;
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

if (window.jQuery) {
    jQuery.noConflict();
}

document.documentElement.className += ' js';

(function(domready, Drupal, drupalSettings) {
    domready(function() {
        Drupal.attachBehaviors(document, drupalSettings);
    });
})(domready, Drupal, window.drupalSettings);;
/**
 * @file
 * Drupal Bootstrap object.
 */

/**
 * All Drupal Bootstrap JavaScript APIs are contained in this namespace.
 *
 * @namespace
 */
(function(_, $, Drupal, drupalSettings) {
    'use strict';

    var Bootstrap = {
        processedOnce: {},
        settings: drupalSettings.bootstrap || {}
    };

    /**
     * Wraps Drupal.checkPlain() to ensure value passed isn't empty.
     *
     * Encodes special characters in a plain-text string for display as HTML.
     *
     * @param {string} str
     *   The string to be encoded.
     *
     * @return {string}
     *   The encoded string.
     *
     * @ingroup sanitization
     */
    Bootstrap.checkPlain = function(str) {
        return str && Drupal.checkPlain(str) || '';
    };

    /**
     * Creates a jQuery plugin.
     *
     * @param {String} id
     *   A jQuery plugin identifier located in $.fn.
     * @param {Function} plugin
     *   A constructor function used to initialize the for the jQuery plugin.
     * @param {Boolean} [noConflict]
     *   Flag indicating whether or not to create a ".noConflict()" helper method
     *   for the plugin.
     */
    Bootstrap.createPlugin = function(id, plugin, noConflict) {
        // Immediately return if plugin doesn't exist.
        if ($.fn[id] !== void 0) {
            return this.fatal('Specified jQuery plugin identifier already exists: @id. Use Drupal.bootstrap.replacePlugin() instead.', {
                '@id': id
            });
        }

        // Immediately return if plugin isn't a function.
        if (typeof plugin !== 'function') {
            return this.fatal('You must provide a constructor function to create a jQuery plugin "@id": @plugin', {
                '@id': id,
                '@plugin': plugin
            });
        }

        // Add a ".noConflict()" helper method.
        this.pluginNoConflict(id, plugin, noConflict);

        $.fn[id] = plugin;
    };

    /**
     * Diff object properties.
     *
     * @param {...Object} objects
     *   Two or more objects. The first object will be used to return properties
     *   values.
     *
     * @return {Object}
     *   Returns the properties of the first passed object that are not present
     *   in all other passed objects.
     */
    Bootstrap.diffObjects = function(objects) {
        var args = Array.prototype.slice.call(arguments);
        return _.pick(args[0], _.difference.apply(_, _.map(args, function(obj) {
            return Object.keys(obj);
        })));
    };

    /**
     * Map of supported events by regular expression.
     *
     * @type {Object<Event|MouseEvent|KeyboardEvent|TouchEvent,RegExp>}
     */
    Bootstrap.eventMap = {
        Event: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        MouseEvent: /^(?:click|dblclick|mouse(?:down|enter|leave|up|over|move|out))$/,
        KeyboardEvent: /^(?:key(?:down|press|up))$/,
        TouchEvent: /^(?:touch(?:start|end|move|cancel))$/
    };

    /**
     * Extends a jQuery Plugin.
     *
     * @param {String} id
     *   A jQuery plugin identifier located in $.fn.
     * @param {Function} callback
     *   A constructor function used to initialize the for the jQuery plugin.
     *
     * @return {Function|Boolean}
     *   The jQuery plugin constructor or FALSE if the plugin does not exist.
     */
    Bootstrap.extendPlugin = function(id, callback) {
        // Immediately return if plugin doesn't exist.
        if (typeof $.fn[id] !== 'function') {
            return this.fatal('Specified jQuery plugin identifier does not exist: @id', {
                '@id': id
            });
        }

        // Immediately return if callback isn't a function.
        if (typeof callback !== 'function') {
            return this.fatal('You must provide a callback function to extend the jQuery plugin "@id": @callback', {
                '@id': id,
                '@callback': callback
            });
        }

        // Determine existing plugin constructor.
        var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
        var proto = constructor.prototype;

        var obj = callback.apply(constructor, [this.settings]);
        if (!$.isPlainObject(obj)) {
            return this.fatal('Returned value from callback is not a plain object that can be used to extend the jQuery plugin "@id": @obj', {
                '@obj': obj
            });
        }

        // Add a jQuery UI like option getter/setter method.
        var option = this.option;
        if (proto.option === void(0)) {
            proto.option = function() {
                return option.apply(this, arguments);
            };
        }

        // Handle prototype properties separately.
        if (obj.prototype !== void 0) {
            for (var key in obj.prototype) {
                if (!obj.prototype.hasOwnProperty(key)) continue;
                var value = obj.prototype[key];
                if (typeof value === 'function') {
                    proto[key] = this.superWrapper(proto[key] || function() {}, value);
                } else {
                    proto[key] = $.isPlainObject(value) ? $.extend(true, {}, proto[key], value) : value;
                }
            }
        }
        delete obj.prototype;

        // Handle static properties.
        for (key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            value = obj[key];
            if (typeof value === 'function') {
                constructor[key] = this.superWrapper(constructor[key] || function() {}, value);
            } else {
                constructor[key] = $.isPlainObject(value) ? $.extend(true, {}, constructor[key], value) : value;
            }
        }

        return $.fn[id];
    };

    Bootstrap.superWrapper = function(parent, fn) {
        return function() {
            var previousSuper = this.super;
            this.super = parent;
            var ret = fn.apply(this, arguments);
            if (previousSuper) {
                this.super = previousSuper;
            } else {
                delete this.super;
            }
            return ret;
        };
    };

    /**
     * Provide a helper method for displaying when something is went wrong.
     *
     * @param {String} message
     *   The message to display.
     * @param {Object} [args]
     *   An arguments to use in message.
     *
     * @return {Boolean}
     *   Always returns FALSE.
     */
    Bootstrap.fatal = function(message, args) {
        if (this.settings.dev && console.warn) {
            for (var name in args) {
                if (args.hasOwnProperty(name) && typeof args[name] === 'object') {
                    args[name] = JSON.stringify(args[name]);
                }
            }
            Drupal.throwError(new Error(Drupal.formatString(message, args)));
        }
        return false;
    };

    /**
     * Intersects object properties.
     *
     * @param {...Object} objects
     *   Two or more objects. The first object will be used to return properties
     *   values.
     *
     * @return {Object}
     *   Returns the properties of first passed object that intersects with all
     *   other passed objects.
     */
    Bootstrap.intersectObjects = function(objects) {
        var args = Array.prototype.slice.call(arguments);
        return _.pick(args[0], _.intersection.apply(_, _.map(args, function(obj) {
            return Object.keys(obj);
        })));
    };

    /**
     * An object based once plugin (similar to jquery.once, but without the DOM).
     *
     * @param {String} id
     *   A unique identifier.
     * @param {Function} callback
     *   The callback to invoke if the identifier has not yet been seen.
     *
     * @return {Bootstrap}
     */
    Bootstrap.once = function(id, callback) {
        // Immediately return if identifier has already been processed.
        if (this.processedOnce[id]) {
            return this;
        }
        callback.call(this, this.settings);
        this.processedOnce[id] = true;
        return this;
    };

    /**
     * Provide jQuery UI like ability to get/set options for Bootstrap plugins.
     *
     * @param {string|object} key
     *   A string value of the option to set, can be dot like to a nested key.
     *   An object of key/value pairs.
     * @param {*} [value]
     *   (optional) A value to set for key.
     *
     * @returns {*}
     *   - Returns nothing if key is an object or both key and value parameters
     *   were provided to set an option.
     *   - Returns the a value for a specific setting if key was provided.
     *   - Returns an object of key/value pairs of all the options if no key or
     *   value parameter was provided.
     *
     * @see https://github.com/jquery/jquery-ui/blob/master/ui/widget.js
     */
    Bootstrap.option = function(key, value) {
        var options = $.isPlainObject(key) ? $.extend({}, key) : {};

        // Get all options (clone so it doesn't reference the internal object).
        if (arguments.length === 0) {
            return $.extend({}, this.options);
        }

        // Get/set single option.
        if (typeof key === "string") {
            // Handle nested keys in dot notation.
            // e.g., "foo.bar" => { foo: { bar: true } }
            var parts = key.split('.');
            key = parts.shift();
            var obj = options;
            if (parts.length) {
                for (var i = 0; i < parts.length - 1; i++) {
                    obj[parts[i]] = obj[parts[i]] || {};
                    obj = obj[parts[i]];
                }
                key = parts.pop();
            }

            // Get.
            if (arguments.length === 1) {
                return obj[key] === void 0 ? null : obj[key];
            }

            // Set.
            obj[key] = value;
        }

        // Set multiple options.
        $.extend(true, this.options, options);
    };

    /**
     * Adds a ".noConflict()" helper method if needed.
     *
     * @param {String} id
     *   A jQuery plugin identifier located in $.fn.
     * @param {Function} plugin
     * @param {Function} plugin
     *   A constructor function used to initialize the for the jQuery plugin.
     * @param {Boolean} [noConflict]
     *   Flag indicating whether or not to create a ".noConflict()" helper method
     *   for the plugin.
     */
    Bootstrap.pluginNoConflict = function(id, plugin, noConflict) {
        if (plugin.noConflict === void 0 && (noConflict === void 0 || noConflict)) {
            var old = $.fn[id];
            plugin.noConflict = function() {
                $.fn[id] = old;
                return this;
            };
        }
    };

    /**
     * Replaces a Bootstrap jQuery plugin definition.
     *
     * @param {String} id
     *   A jQuery plugin identifier located in $.fn.
     * @param {Function} callback
     *   A callback function that is immediately invoked and must return a
     *   function that will be used as the plugin constructor.
     * @param {Boolean} [noConflict]
     *   Flag indicating whether or not to create a ".noConflict()" helper method
     *   for the plugin.
     */
    Bootstrap.replacePlugin = function(id, callback, noConflict) {
        // Immediately return if plugin doesn't exist.
        if (typeof $.fn[id] !== 'function') {
            return this.fatal('Specified jQuery plugin identifier does not exist: @id', {
                '@id': id
            });
        }

        // Immediately return if callback isn't a function.
        if (typeof callback !== 'function') {
            return this.fatal('You must provide a valid callback function to replace a jQuery plugin: @callback', {
                '@callback': callback
            });
        }

        // Determine existing plugin constructor.
        var constructor = $.fn[id] && $.fn[id].Constructor || $.fn[id];
        var plugin = callback.apply(constructor, [this.settings]);

        // Immediately return if plugin isn't a function.
        if (typeof plugin !== 'function') {
            return this.fatal('Returned value from callback is not a usable function to replace a jQuery plugin "@id": @plugin', {
                '@id': id,
                '@plugin': plugin
            });
        }

        // Add a ".noConflict()" helper method.
        this.pluginNoConflict(id, plugin, noConflict);

        $.fn[id] = plugin;
    };

    /**
     * Simulates a native event on an element in the browser.
     *
     * Note: This is a pretty complete modern implementation. If things are quite
     * working the way you intend (in older browsers), you may wish to use the
     * jQuery.simulate plugin. If it's available, this method will defer to it.
     *
     * @see https://github.com/jquery/jquery-simulate
     *
     * @param {HTMLElement} element
     *   A DOM element to dispatch event on.
     * @param {String} type
     *   The type of event to simulate.
     * @param {Object} [options]
     *   An object of options to pass to the event constructor. Typically, if
     *   an event is being proxied, you should just pass the original event
     *   object here. This allows, if the browser supports it, to be a truly
     *   simulated event.
     */
    Bootstrap.simulate = function(element, type, options) {
        // Defer to the jQuery.simulate plugin, if it's available.
        if (typeof $.simulate === 'function') {
            new $.simulate(element, type, options);
            return;
        }
        var event;
        var ctor;
        for (var name in this.eventMap) {
            if (this.eventMap[name].test(type)) {
                ctor = name;
                break;
            }
        }
        if (!ctor) {
            throw new SyntaxError('Only rudimentary HTMLEvents, KeyboardEvents and MouseEvents are supported: ' + type);
        }
        var opts = {
            bubbles: true,
            cancelable: true
        };
        if (ctor === 'KeyboardEvent' || ctor === 'MouseEvent') {
            $.extend(opts, {
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1
            });
        }
        if (ctor === 'MouseEvent') {
            $.extend(opts, {
                button: 0,
                pointerX: 0,
                pointerY: 0,
                view: window
            });
        }
        if (options) {
            $.extend(opts, options);
        }
        if (typeof window[ctor] === 'function') {
            event = new window[ctor](type, opts);
            element.dispatchEvent(event);
        } else if (document.createEvent) {
            event = document.createEvent(ctor);
            event.initEvent(type, opts.bubbles, opts.cancelable);
            element.dispatchEvent(event);
        } else if (typeof element.fireEvent === 'function') {
            event = $.extend(document.createEventObject(), opts);
            element.fireEvent('on' + type, event);
        } else if (typeof element[type]) {
            element[type]();
        }
    };

    /**
     * Provide a helper method for displaying when something is unsupported.
     *
     * @param {String} type
     *   The type of unsupported object, e.g. method or option.
     * @param {String} name
     *   The name of the unsupported object.
     * @param {*} [value]
     *   The value of the unsupported object.
     */
    Bootstrap.unsupported = function(type, name, value) {
        if (this.settings.dev && console.warn) {
            console.warn(Drupal.formatString('Unsupported Drupal Bootstrap Modal @type: @name -> @value', {
                '@type': type,
                '@name': name,
                '@value': typeof value === 'object' ? JSON.stringify(value) : value
            }));
        }
    };

    /**
     * Add Bootstrap to the global Drupal object.
     *
     * @type {Bootstrap}
     */
    Drupal.bootstrap = Drupal.bootstrap || Bootstrap;

})(window._, window.jQuery, window.Drupal, window.drupalSettings);;
(function($, _) {

    /**
     * @class Attributes
     *
     * Modifies attributes.
     *
     * @param {Object|Attributes} attributes
     *   An object to initialize attributes with.
     */
    var Attributes = function(attributes) {
        this.data = {};
        this.data['class'] = [];
        this.merge(attributes);
    };

    /**
     * Renders the attributes object as a string to inject into an HTML element.
     *
     * @return {String}
     *   A rendered string suitable for inclusion in HTML markup.
     */
    Attributes.prototype.toString = function() {
        var output = '';
        var name, value;
        var checkPlain = function(str) {
            return str && str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
        };
        var data = this.getData();
        for (name in data) {
            if (!data.hasOwnProperty(name)) continue;
            value = data[name];
            if (_.isFunction(value)) value = value();
            if (_.isObject(value)) value = _.values(value);
            if (_.isArray(value)) value = value.join(' ');
            output += ' ' + checkPlain(name) + '="' + checkPlain(value) + '"';
        }
        return output;
    };

    /**
     * Renders the Attributes object as a plain object.
     *
     * @return {Object}
     *   A plain object suitable for inclusion in DOM elements.
     */
    Attributes.prototype.toPlainObject = function() {
        var object = {};
        var name, value;
        var data = this.getData();
        for (name in data) {
            if (!data.hasOwnProperty(name)) continue;
            value = data[name];
            if (_.isFunction(value)) value = value();
            if (_.isObject(value)) value = _.values(value);
            if (_.isArray(value)) value = value.join(' ');
            object[name] = value;
        }
        return object;
    };

    /**
     * Add class(es) to the array.
     *
     * @param {string|Array} value
     *   An individual class or an array of classes to add.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.addClass = function(value) {
        var args = Array.prototype.slice.call(arguments);
        this.data['class'] = this.sanitizeClasses(this.data['class'].concat(args));
        return this;
    };

    /**
     * Returns whether the requested attribute exists.
     *
     * @param {string} name
     *   An attribute name to check.
     *
     * @return {boolean}
     *   TRUE or FALSE
     */
    Attributes.prototype.exists = function(name) {
        return this.data[name] !== void(0) && this.data[name] !== null;
    };

    /**
     * Retrieve a specific attribute from the array.
     *
     * @param {string} name
     *   The specific attribute to retrieve.
     * @param {*} defaultValue
     *   (optional) The default value to set if the attribute does not exist.
     *
     * @return {*}
     *   A specific attribute value, passed by reference.
     */
    Attributes.prototype.get = function(name, defaultValue) {
        if (!this.exists(name)) this.data[name] = defaultValue;
        return this.data[name];
    };

    /**
     * Retrieves a cloned copy of the internal attributes data object.
     *
     * @return {Object}
     */
    Attributes.prototype.getData = function() {
        return _.extend({}, this.data);
    };

    /**
     * Retrieves classes from the array.
     *
     * @return {Array}
     *   The classes array.
     */
    Attributes.prototype.getClasses = function() {
        return this.get('class', []);
    };

    /**
     * Indicates whether a class is present in the array.
     *
     * @param {string|Array} className
     *   The class(es) to search for.
     *
     * @return {boolean}
     *   TRUE or FALSE
     */
    Attributes.prototype.hasClass = function(className) {
        className = this.sanitizeClasses(Array.prototype.slice.call(arguments));
        var classes = this.getClasses();
        for (var i = 0, l = className.length; i < l; i++) {
            // If one of the classes fails, immediately return false.
            if (_.indexOf(classes, className[i]) === -1) {
                return false;
            }
        }
        return true;
    };

    /**
     * Merges multiple values into the array.
     *
     * @param {Attributes|Node|jQuery|Object} object
     *   An Attributes object with existing data, a Node DOM element, a jQuery
     *   instance or a plain object where the key is the attribute name and the
     *   value is the attribute value.
     * @param {boolean} [recursive]
     *   Flag determining whether or not to recursively merge key/value pairs.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.merge = function(object, recursive) {
        // Immediately return if there is nothing to merge.
        if (!object) {
            return this;
        }

        // Get attributes from a jQuery element.
        if (object instanceof $) {
            object = object[0];
        }

        // Get attributes from a DOM element.
        if (object instanceof Node) {
            object = Array.prototype.slice.call(object.attributes).reduce(function(attributes, attribute) {
                attributes[attribute.name] = attribute.value;
                return attributes;
            }, {});
        }
        // Get attributes from an Attributes instance.
        else if (object instanceof Attributes) {
            object = object.getData();
        }
        // Otherwise, clone the object.
        else {
            object = _.extend({}, object);
        }

        // By this point, there should be a valid plain object.
        if (!$.isPlainObject(object)) {
            setTimeout(function() {
                throw new Error('Passed object is not supported: ' + object);
            });
            return this;
        }

        // Handle classes separately.
        if (object && object['class'] !== void 0) {
            this.addClass(object['class']);
            delete object['class'];
        }

        if (recursive === void 0 || recursive) {
            this.data = $.extend(true, {}, this.data, object);
        } else {
            this.data = $.extend({}, this.data, object);
        }

        return this;
    };

    /**
     * Removes an attribute from the array.
     *
     * @param {string} name
     *   The name of the attribute to remove.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.remove = function(name) {
        if (this.exists(name)) delete this.data[name];
        return this;
    };

    /**
     * Removes a class from the attributes array.
     *
     * @param {...string|Array} className
     *   An individual class or an array of classes to remove.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.removeClass = function(className) {
        var remove = this.sanitizeClasses(Array.prototype.slice.apply(arguments));
        this.data['class'] = _.without(this.getClasses(), remove);
        return this;
    };

    /**
     * Replaces a class in the attributes array.
     *
     * @param {string} oldValue
     *   The old class to remove.
     * @param {string} newValue
     *   The new class. It will not be added if the old class does not exist.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.replaceClass = function(oldValue, newValue) {
        var classes = this.getClasses();
        var i = _.indexOf(this.sanitizeClasses(oldValue), classes);
        if (i >= 0) {
            classes[i] = newValue;
            this.set('class', classes);
        }
        return this;
    };

    /**
     * Ensures classes are flattened into a single is an array and sanitized.
     *
     * @param {...String|Array} classes
     *   The class or classes to sanitize.
     *
     * @return {Array}
     *   A sanitized array of classes.
     */
    Attributes.prototype.sanitizeClasses = function(classes) {
        return _.chain(Array.prototype.slice.call(arguments))
            // Flatten in case there's a mix of strings and arrays.
            .flatten()

        // Split classes that may have been added with a space as a separator.
        .map(function(string) {
            return string.split(' ');
        })

        // Flatten again since it was just split into arrays.
        .flatten()

        // Filter out empty items.
        .filter()

        // Clean the class to ensure it's a valid class name.
        .map(function(value) {
            return Attributes.cleanClass(value);
        })

        // Ensure classes are unique.
        .uniq()

        // Retrieve the final value.
        .value();
    };

    /**
     * Sets an attribute on the array.
     *
     * @param {string} name
     *   The name of the attribute to set.
     * @param {*} value
     *   The value of the attribute to set.
     *
     * @return {Attributes}
     *
     * @chainable
     */
    Attributes.prototype.set = function(name, value) {
        var obj = $.isPlainObject(name) ? name : {};
        if (typeof name === 'string') {
            obj[name] = value;
        }
        return this.merge(obj);
    };

    /**
     * Prepares a string for use as a CSS identifier (element, class, or ID name).
     *
     * Note: this is essentially a direct copy from
     * \Drupal\Component\Utility\Html::cleanCssIdentifier
     *
     * @param {string} identifier
     *   The identifier to clean.
     * @param {Object} [filter]
     *   An object of string replacements to use on the identifier.
     *
     * @return {string}
     *   The cleaned identifier.
     */
    Attributes.cleanClass = function(identifier, filter) {
        filter = filter || {
            ' ': '-',
            '_': '-',
            '/': '-',
            '[': '-',
            ']': ''
        };

        identifier = identifier.toLowerCase();

        if (filter['__'] === void 0) {
            identifier = identifier.replace('__', '#DOUBLE_UNDERSCORE#');
        }

        identifier = identifier.replace(Object.keys(filter), Object.keys(filter).map(function(key) {
            return filter[key];
        }));

        if (filter['__'] === void 0) {
            identifier = identifier.replace('#DOUBLE_UNDERSCORE#', '__');
        }

        identifier = identifier.replace(/[^\u002D\u0030-\u0039\u0041-\u005A\u005F\u0061-\u007A\u00A1-\uFFFF]/g, '');
        identifier = identifier.replace(['/^[0-9]/', '/^(-[0-9])|^(--)/'], ['_', '__']);

        return identifier;
    };

    /**
     * Creates an Attributes instance.
     *
     * @param {object|Attributes} [attributes]
     *   An object to initialize attributes with.
     *
     * @return {Attributes}
     *   An Attributes instance.
     *
     * @constructor
     */
    Attributes.create = function(attributes) {
        return new Attributes(attributes);
    };

    window.Attributes = Attributes;

})(window.jQuery, window._);;
/**
 * @file
 * Theme hooks for the Drupal Bootstrap base theme.
 */
(function($, Drupal, Bootstrap, Attributes) {

    /**
     * Fallback for theming an icon if the Icon API module is not installed.
     */
    if (!Drupal.icon) Drupal.icon = {
        bundles: {}
    };
    if (!Drupal.theme.icon || Drupal.theme.prototype.icon) {
        $.extend(Drupal.theme, /** @lends Drupal.theme */ {
            /**
             * Renders an icon.
             *
             * @param {string} bundle
             *   The bundle which the icon belongs to.
             * @param {string} icon
             *   The name of the icon to render.
             * @param {object|Attributes} [attributes]
             *   An object of attributes to also apply to the icon.
             *
             * @returns {string}
             */
            icon: function(bundle, icon, attributes) {
                if (!Drupal.icon.bundles[bundle]) return '';
                attributes = Attributes.create(attributes).addClass('icon').set('aria-hidden', 'true');
                icon = Drupal.icon.bundles[bundle](icon, attributes);
                return '<span' + attributes + '></span>';
            }
        });
    }

    /**
     * Callback for modifying an icon in the "bootstrap" icon bundle.
     *
     * @param {string} icon
     *   The icon being rendered.
     * @param {Attributes} attributes
     *   Attributes object for the icon.
     */
    Drupal.icon.bundles.bootstrap = function(icon, attributes) {
        attributes.addClass(['glyphicon', 'glyphicon-' + icon]);
    };

    /**
     * Add necessary theming hooks.
     */
    $.extend(Drupal.theme, /** @lends Drupal.theme */ {

        /**
         * Renders a Bootstrap AJAX glyphicon throbber.
         *
         * @returns {string}
         */
        ajaxThrobber: function() {
            return Drupal.theme('bootstrapIcon', 'refresh', {
                'class': ['ajax-throbber', 'glyphicon-spin']
            });
        },

        /**
         * Renders a button element.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button. If it contains one of:
         *   - value: The label of the button.
         *   - context: The context type of Bootstrap button, can be one of:
         *     - default
         *     - primary
         *     - success
         *     - info
         *     - warning
         *     - danger
         *     - link
         *
         * @returns {string}
         */
        button: function(attributes) {
            attributes = Attributes.create(attributes).addClass('btn');
            var context = attributes.get('context', 'default');
            var label = attributes.get('value', '');
            attributes.remove('context').remove('value');
            if (!attributes.hasClass(['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link'])) {
                attributes.addClass('btn-' + Bootstrap.checkPlain(context));
            }

            // Attempt to, intelligently, provide a default button "type".
            if (!attributes.exists('type')) {
                attributes.set('type', attributes.hasClass('form-submit') ? 'submit' : 'button');
            }

            return '<button' + attributes + '>' + label + '</button>';
        },

        /**
         * Alias for "button" theme hook.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button.
         *
         * @see Drupal.theme.button()
         *
         * @returns {string}
         */
        btn: function(attributes) {
            return Drupal.theme('button', attributes);
        },

        /**
         * Renders a button block element.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button.
         *
         * @see Drupal.theme.button()
         *
         * @returns {string}
         */
        'btn-block': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-block'));
        },

        /**
         * Renders a large button element.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button.
         *
         * @see Drupal.theme.button()
         *
         * @returns {string}
         */
        'btn-lg': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-lg'));
        },

        /**
         * Renders a small button element.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button.
         *
         * @see Drupal.theme.button()
         *
         * @returns {string}
         */
        'btn-sm': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-sm'));
        },

        /**
         * Renders an extra small button element.
         *
         * @param {object|Attributes} attributes
         *   An object of attributes to apply to the button.
         *
         * @see Drupal.theme.button()
         *
         * @returns {string}
         */
        'btn-xs': function(attributes) {
            return Drupal.theme('button', Attributes.create(attributes).addClass('btn-xs'));
        },

        /**
         * Renders a glyphicon.
         *
         * @param {string} name
         *   The name of the glyphicon.
         * @param {object|Attributes} [attributes]
         *   An object of attributes to apply to the icon.
         *
         * @returns {string}
         */
        bootstrapIcon: function(name, attributes) {
            return Drupal.theme('icon', 'bootstrap', name, attributes);
        }

    });

})(window.jQuery, window.Drupal, window.Drupal.bootstrap, window.Attributes);;
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+ function($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert = function(el) {
        jQuery(el).on('click', dismiss, this.close)
    }

    Alert.VERSION = '3.3.7'

    Alert.TRANSITION_DURATION = 150

    Alert.prototype.close = function(e) {
        var $this = jQuery(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = jQuery(selector === '#' ? [] : selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one('bsTransitionEnd', removeElement)
            .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
            removeElement()
    }

    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function() {
            var $this = jQuery(this)
            var data = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert

    $.fn.alert = Plugin
    $.fn.alert.Constructor = Alert

    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }

    // ALERT DATA-API
    // ==============

    jQuery(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+ function($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function(element, options) {
        this.$element = jQuery(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger = jQuery('[data-toggle="collapse"][href="#' + element.id + '"],' +
            '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    Collapse.VERSION = '3.3.7'

    Collapse.TRANSITION_DURATION = 350

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }

    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in')) return

        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }

        var dimension = this.dimension()

        this.$element
            .removeClass('collapse')
            .addClass('collapsing')[dimension](0)
            .attr('aria-expanded', true)

        this.$trigger
            .removeClass('collapsed')
            .attr('aria-expanded', true)

        this.transitioning = 1

        var complete = function() {
            this.$element
                .removeClass('collapsing')
                .addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element
                .trigger('shown.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(['scroll', dimension].join('-'))

        this.$element
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight

        this.$element
            .addClass('collapsing')
            .removeClass('collapse in')
            .attr('aria-expanded', false)

        this.$trigger
            .addClass('collapsed')
            .attr('aria-expanded', false)

        this.transitioning = 1

        var complete = function() {
            this.transitioning = 0
            this.$element
                .removeClass('collapsing')
                .addClass('collapse')
                .trigger('hidden.bs.collapse')
        }

        if (!$.support.transition) return complete.call(this)

        this.$element[dimension](0)
            .one('bsTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }

    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Collapse.prototype.getParent = function() {
        return jQuery(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function(i, element) {
                var $element = jQuery(element)
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this))
            .end()
    }

    Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .toggleClass('collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return jQuery(target)
    }

    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = jQuery(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse

    $.fn.collapse = Plugin
    $.fn.collapse.Constructor = Collapse

    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old
        return this
    }

    // COLLAPSE DATA-API
    // =================

    jQuery(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = jQuery(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+ function($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function(element, options) {
        this.options = options
        this.$body = jQuery(document.body)
        this.$element = jQuery(element)
        this.$dialog = this.$element.find('.modal-dialog')
        this.$backdrop = null
        this.isShown = null
        this.originalBodyPad = null
        this.scrollbarWidth = 0
        this.ignoreBackdropClick = false

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function() {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION = '3.3.7'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        })

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.$dialog.on('mousedown.dismiss.bs.modal', function() {
            that.$element.one('mouseup.dismiss.bs.modal', function(e) {
                if (jQuery(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            })

            transition ?
                that.$dialog // wait for modal to slide in
                .one('bsTransitionEnd', function() {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        jQuery(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

        this.$dialog.off('mousedown.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function() {
        jQuery(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function(e) {
                if (document !== e.target &&
                    this.$element[0] !== e.target &&
                    !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function() {
        if (this.isShown) {
            jQuery(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            jQuery(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = jQuery(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body)

            this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide()
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function() {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function() {
        this.adjustDialog()
    }

    Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    Modal.prototype.measureScrollbar = function() { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = jQuery(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal

    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }

    // MODAL DATA-API
    // ==============

    jQuery(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = jQuery(this)
        var href = $this.attr('href')
        var $target = jQuery($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function(showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function() {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+ function($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
        var $el = this
        jQuery(this).one('bsTransitionEnd', function() {
            called = true
        })
        var callback = function() {
            if (!called) jQuery($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    jQuery(function() {
        $.support.transition = transitionEnd()

        if (!$.support.transition) return

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if (jQuery(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    })

}(jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: jQuery(element),
                appendDots: jQuery(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return jQuery('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = jQuery(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = jQuery(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                jQuery(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                jQuery(markup).insertBefore(_.$slides.eq(index));
            } else {
                jQuery(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                jQuery(markup).prependTo(_.$slideTrack);
            } else {
                jQuery(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            jQuery(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                jQuery({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if (asNavFor && asNavFor !== null) {
            asNavFor = jQuery(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if (asNavFor !== null && typeof asNavFor === 'object') {
            asNavFor.each(function() {
                var target = jQuery(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if (!_.paused && !_.interrupted && !_.focussed) {

            if (_.options.infinite === false) {

                if (_.direction === 1 && (_.currentSlide + 1) === (_.slideCount - 1)) {
                    _.direction = 0;
                } else if (_.direction === 0) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler(slideTo);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true) {

            _.$prevArrow = jQuery(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = jQuery(_.options.nextArrow).addClass('slick-arrow');

            if (_.slideCount > _.options.slidesToShow) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add(_.$nextArrow)

                .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = jQuery('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append(jQuery('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
            .children(_.options.slide + ':not(.slick-cloned)')
            .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            jQuery(element)
                .attr('data-slick-index', index)
                .data('originalStyling', jQuery(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            jQuery('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        jQuery('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this,
            a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if (_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width': (100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || jQuery(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if (_.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = jQuery(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if ($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if (!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            jQuery('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        jQuery(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            jQuery(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        jQuery(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        jQuery(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        jQuery('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        jQuery(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this,
            originalSlides;

        if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        jQuery('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.$prevArrow.length) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
        }

        if (_.$nextArrow && _.$nextArrow.length) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display', '');

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
        }

        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function() {
                    jQuery(this).attr('style', jQuery(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if (!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

                event.stopImmediatePropagation();
                var $sf = jQuery(this);

                setTimeout(function() {

                    if (_.options.pauseOnFocus) {
                        _.focussed = $sf.is(':focus');
                        _.autoPlay();
                    }

                }, 0);

            });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft = 0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + (jQuery(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs(jQuery(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!jQuery(_.$slider).hasClass('slick-initialized')) {

            jQuery(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if (_.options.autoplay) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                return (val >= 0) && (val < _.slideCount);
            });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                jQuery(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                    if (jQuery('#' + ariaButtonControl).length) {
                        jQuery(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                jQuery(this).attr({
                    'role': 'presentation'
                });

                jQuery(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({
                    'tabindex': '0'
                });
            } else {
                _.$slides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'previous'
                }, _.changeSlide);
            _.$nextArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'next'
                }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            jQuery('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            jQuery('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if (_.options.pauseOnHover) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        jQuery(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            jQuery(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        jQuery(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        jQuery(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        jQuery('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        jQuery(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        jQuery(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' : 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            jQuery('img[data-lazy]', imagesScope).each(function() {

                var image = jQuery(this),
                    imageSource = jQuery(this).attr('data-lazy'),
                    imageSrcSet = jQuery(this).attr('data-srcset'),
                    imageSizes = jQuery(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({
                            opacity: 0
                        }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet);

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes);
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({
                                    opacity: 1
                                }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr('data-lazy')
                        .removeClass('slick-loading')
                        .addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if (!_.unslicked) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = jQuery(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function(tryCount) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = jQuery('img[data-lazy]', _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ($imgsToLoad.length) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet);

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes);
                    }
                }

                image
                    .attr('src', imageSource)
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if (_.options.adaptiveHeight === true) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if (tryCount < 3) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout(function() {
                        _.progressiveLazyLoad(tryCount + 1);
                    }, 500);

                } else {

                    image
                        .removeAttr('data-lazy')
                        .removeClass('slick-loading')
                        .addClass('slick-lazyload-error');

                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [_]);

        }

    };

    Slick.prototype.refresh = function(initializing) {

        var _ = this,
            currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if (!_.options.infinite && (_.currentSlide > lastVisibleIndex)) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, {
            currentSlide: currentSlide
        });

        _.init();

        if (!initializing) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this,
            breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

            _.respondTo = _.options.respondTo || 'window';

            for (breakpoint in responsiveSettings) {

                l = _.breakpoints.length - 1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return (_.options.mobileFirst) ? a - b : b - a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
            .children(_.options.slide)
            .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            jQuery(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if (jQuery(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = jQuery(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition();
                }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();

        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                jQuery(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                jQuery(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
        Slick.prototype.slickSetOption = function() {

            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var _ = this,
                l, item, option, value, refresh = false,
                type;

            if ($.type(arguments[0]) === 'object') {

                option = arguments[0];
                refresh = arguments[1];
                type = 'multiple';

            } else if ($.type(arguments[0]) === 'string') {

                option = arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                    type = 'responsive';

                } else if (typeof arguments[1] !== 'undefined') {

                    type = 'single';

                }

            }

            if (type === 'single') {

                _.options[option] = value;

            } else if (type === 'multiple') {

                $.each(option, function(opt, val) {

                    _.options[opt] = val;

                });

            } else if (type === 'responsive') {

                for (item in value) {

                    if ($.type(_.options.responsive) !== 'array') {

                        _.options.responsive = [value[item]];

                    } else {

                        l = _.options.responsive.length - 1;

                        // loop through the responsive object and splice out duplicates.
                        while (l >= 0) {

                            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

                                _.options.responsive.splice(l, 1);

                            }

                            l--;

                        }

                        _.options.responsive.push(value[item]);

                    }

                }

            }

            if (refresh) {

                _.unload();
                _.reinit();

            }

        };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };

    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    jQuery(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    jQuery(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    jQuery(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function(toggle) {

        var _ = this;

        if (!toggle) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            jQuery(event.target).is('.slick-slide') ?
            jQuery(event.target) :
            jQuery(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this,
            navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if (_.options.asNavFor) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            direction = _.swipeDirection();

            switch (direction) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                        _.checkNavigable(_.currentSlide + _.getSlideCount()) :
                        _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                        _.checkNavigable(_.currentSlide - _.getSlideCount()) :
                        _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:

            }

            if (direction != 'vertical') {

                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction]);

            }

        } else {

            if (_.touchObject.startX !== _.touchObject.curX) {

                _.slideHandler(_.currentSlide);
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }

        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        jQuery('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if (_.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if (_.options.autoplay) {

            if (document[_.hidden]) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/**
 * @file
 * The primary JS file for AUC theme.
 */

/* eslint-disable space-before-function-paren */
/* eslint-disable brace-style */
/* global jQuery */
/* global Drupal */
/* global drupalSettings */

(function($) {
    var counterFactsFlag = 0
    var factsSectionOffset = 0
    var $language = (drupalSettings) ? drupalSettings.path.currentLanguage : 'en'
    var $rtl = ($language === 'ar')

    jQuery(document).ready(function() {
        loadingSlider()
        toggleSearchForm()
        initMegaMenuIcon()
        updateFirstTabInAccordion()

        if (jQuery('input:radio[name="field_title_value"]').length) {
            facultyProfileFilterSubmission()
        }
        if (jQuery('.paragraph--type--navigation').length) {
            var activeSidebarLinks = jQuery('.paragraph--type--navigation a.is-active')
            activeSidebarLinks.parents('.dropdown-menu').addClass('active')
            activeSidebarLinks.siblings('.dropdown-menu').addClass('active')
        }

        if (window.innerWidth < 1200) {
            // Loading youtube iframes automatic on small screen.
            if (jQuery('.video-youtube-wrapper').length) {
                loadVideoOnsmallScreen()
            }
        }
        // Remove modal when it being hidden.
        jQuery(document).on('hidden.bs.modal', '.video-modal', function(e) {
            jQuery('.video-modal').remove()
        })

        // On click on video image event load youtube iframe.
        jQuery('.video-youtube-wrapper').on('click', function() {
            if (jQuery('.video-modal').length) {
                jQuery('.video-modal').modal('hide')
                jQuery('.video-modal').remove()
            }
            if (window.innerWidth >= 1200) {
                var videoId = jQuery(this).data('videoId')
                var videoType = jQuery(this).data('videoType')
                var videoTitle = jQuery(this).data('title')
                createModal(videoId, videoType, videoTitle)
            }
        })
    })
    jQuery(document).ajaxComplete(function() {
        if (jQuery('input:radio[name="field_title_value"]').length) {
            facultyProfileFilterSubmission()
            jQuery('.view-faculty-profiles table').css({
                'opacity': '1',
                'pointer-events': 'auto'
            })
            jQuery('.view-faculty-profiles .view-content').find('.cssload-fond').remove()
        }
    })
    jQuery(window).resize(function() {
        // Reset height of caption to recalculate it.
        jQuery('.resource-component').find('.caption').css('height', 'auto')
        jQuery('.text-block-component').find('.caption').css('height', 'auto')
        jQuery('.widget-item').find('.small-widget-caption').css('height', 'auto')
        jQuery('.paragraph--type--person').find('.caption-content-light').css('height', 'auto')
        jQuery('.news-vertical-card-wrapper').find('.vertical-wide-caption-content').css('height', 'auto')
        jQuery('.news-horizontal-card-wrapper').find('.caption-light').css('height', 'auto')
        resourcesAlignment('.widget-item')
        resourcesAlignment('.text-block-component')
        resourcesAlignment('.resource-component')
        resourcesAlignment('.featured-person-component')
        resourcesAlignment('.news-vertical-card-wrapper')
        resourcesAlignment('.news-horizontal-card-wrapper')
    })
    jQuery(window).on('load', function() {
        resourcesAlignment('.widget-item')
        resourcesAlignment('.text-block-component')
        resourcesAlignment('.resource-component')
        resourcesAlignment('.featured-person-component')
        resourcesAlignment('.news-vertical-card-wrapper')
        resourcesAlignment('.news-horizontal-card-wrapper')
        if (jQuery('.counter-fact-value').length) {
            factsSectionOffset = jQuery('.counter-fact-value').offset().top
        }
        checkFactsNumbersToStart()
    })
    jQuery(window).scroll(function() {
        // On reach facts section when scroll.
        checkFactsNumbersToStart()
    })

    // Calculating Heights of resource caption per row and add it to array.
    function resourcesAlignment(selector) {
        var $resourcesElements = jQuery(selector)
        var $rows = []
        if ($resourcesElements.length < 2) {
            return
        }
        $resourcesElements.each(function() {
            var $that = jQuery(this)
            var top = Math.floor($that.position().top)
            if (undefined === $rows[top]) {
                $rows[top] = []
            }
            $rows[top].push($that)
        })
        $rows.forEach(function(row) {
            resourcesAlignmentRow(row, selector)
        })
    }

    // Write Max height per row on all captions that in the same row.
    function resourcesAlignmentRow(elements, selector) {
        if (elements.length < 2) {
            return
        }
        var maxHeight = 0
        elements.forEach(function($ele) {
            var height
            if (selector === '.widget-item') {
                height = $ele.find('.small-widget-caption').height()
            } else if (selector === '.featured-person-component') {
                height = $ele.find('.caption-content-light').height()
            } else if (selector === '.news-vertical-card-wrapper') {
                height = $ele.find('.vertical-wide-caption-content').height()
            } else if (selector === '.news-horizontal-card-wrapper') {
                height = $ele.find('.caption-light').height()
            } else {
                height = $ele.find('.caption').height()
            }
            if (height >= maxHeight) {
                maxHeight = height
            }
        })
        elements.forEach(function($ele) {
            if (selector === '.widget-item') {
                $ele.find('.small-widget-caption').height(maxHeight)
            } else if (selector === '.featured-person-component') {
                $ele.find('.caption-content-light').height(maxHeight)
            } else if (selector === '.news-vertical-card-wrapper') {
                $ele.find('.vertical-wide-caption-content').height(maxHeight)
            } else if (selector === '.news-horizontal-card-wrapper') {
                $ele.find('.caption-light').height(maxHeight)
            } else {
                $ele.find('.caption').height(maxHeight)
            }
        })
    }

    function checkFactsNumbersToStart() {
        if (counterFactsFlag === 0 && jQuery(window).scrollTop() > (factsSectionOffset + jQuery('.counter-fact-value').outerHeight() - jQuery(window).height()) && jQuery('.counter-fact-value').length) {
            countFactsNumbers()
        }
    }

    // Function to trigger click on faculty profile submit button.
    function facultyProfileFilterSubmission() {
        jQuery('input:radio[name="field_title_value"]:not(:checked)').closest('label').removeClass('active')
        jQuery('input:radio[name="field_title_value"]:checked').closest('label').addClass('active')
        jQuery('input:radio[name="field_title_value"]').change(function() {
            jQuery('.view-faculty-profiles table').css({
                'opacity': '0.4',
                'pointer-events': 'none'
            })
            jQuery('.view-faculty-profiles .view-content').append('<div class="cssload-fond"><div class="cssload-container-general"><div class="cssload-internal"><div class="cssload-ballcolor cssload-ballcolor-1"> </div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ballcolor-2"> </div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ballcolor-3"> </div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ballcolor-4"> </div></div></div></div>')
        })
    }
    // Function to create modal and init it.
    function createModal(videoId, videoType, videoTitle) {
        var iframe = loadIframe(videoType, videoId)
        var videoModal = '<div class="video-modal modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog" role="document"> <div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">' + videoTitle + '</h4></div>' +
            '<div class="modal-body">' +
            '<div class="embed-responsive embed-responsive-16by9">' +
            iframe[0].outerHTML +
            '</div> </div> </div> </div>'

        jQuery('.region-content').append(videoModal)
        jQuery('.video-modal').modal()
    }
    // Function to load youtube video on small screen.
    function loadVideoOnsmallScreen() {
        jQuery('.video-youtube-wrapper').each(function() {
            var videoId = jQuery(this).data('videoId')
            var videoType = jQuery(this).data('videoType')
            jQuery(this).html(loadIframe(videoType, videoId))
        })
    }

    // Function to load youtube video.
    function loadIframe(videoType, videoId) {
        var url = '//www.youtube.com/embed/'
        if (videoType === 'vimeo') {
            url = '//player.vimeo.com/video/'
        }
        var iframe = jQuery('<iframe>', {
            src: url + videoId + '?autoplay=1',
            frameborder: 0,
            allowfullscreen: '',
            webkitallowfullscreen: '',
            mozallowfullscreen: '',
            class: 'embed-responsive-item'
        })
        return iframe
    }

    // Function to add icons on mega menu items that have data.
    function initMegaMenuIcon() {
        jQuery('.menu--simple-mega-menu li').each(function() {
            if (jQuery(this).has('.mega-menu-wrapper').length) {
                jQuery(this).addClass('item-icon')
            }
        })
        jQuery('.menu--simple-mega-menu li').on('click', function() {
            jQuery(this).find('.mega-menu-wrapper').toggleClass('expanded-menu')
            jQuery(this).toggleClass('in')
        })
    }
    // Function to open and close search form by animation.
    function toggleSearchForm() {
        jQuery('.search-button').on('click', function() {
            jQuery('.search-block-form').toggleClass('search-expanded')
            jQuery('.search-button i').toggleClass('fa-search fa-times close-icon').addClass('opacity-animation')
            setTimeout(function() {
                jQuery('.search-button i').removeClass('opacity-animation')
            }, 500)
        })
    }
    // Make First tab in accordion open by default.
    function updateFirstTabInAccordion() {
        if (jQuery('.paragraph-section .accordion').length) {
            jQuery('.paragraph-section .accordion').each(function() {
                jQuery(this).find('li:first-child .panel-collapse').addClass('in')
                jQuery(this).find('li:first-child .panel-title a').attr('aria-expanded', 'true')
            })
        }
    }
    // Loading all sliders.
    function loadingSlider() {
        if (jQuery('.banner-slider').length) {
            jQuery('.banner-slider').slick({
                infinite: true,
                slidesToShow: 1,
                dots: true,
                rtl: $rtl,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000
            })
        }
        if (jQuery('.slider-gallery-wrapper').length) {
            jQuery('.slider-gallery-wrapper').slick({
                infinite: true,
                slidesToShow: 1,
                dots: true,
                rtl: $rtl,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000
            })
        }
        if (jQuery('.slider-row-gallery-wrapper').length) {
            jQuery('.slider-row-gallery-wrapper').slick({
                infinite: true,
                slidesToShow: 1,
                rtl: $rtl,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: true
            })
        }
        if (jQuery('.field--name-field-promotional-image').length) {
            jQuery('.field--name-field-promotional-image').slick({
                infinite: true,
                slidesToShow: 1,
                rtl: $rtl,
                slidesToScroll: 1
            })
        }
        if (jQuery('.small-content-col .publication-slider').length) {
            jQuery('.small-content-col .publication-slider').slick({
                infinite: true,
                slidesToShow: 2,
                rtl: $rtl,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            })
        }
        if (jQuery('.medium-content-col .publication-slider').length) {
            jQuery('.medium-content-col .publication-slider').slick({
                infinite: true,
                rtl: $rtl,
                slidesToShow: 3,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            })
        }
        if (jQuery('.publication-slider').not('.slick-initialized').length) {
            jQuery('.publication-slider').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 4,
                rtl: $rtl,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            })
        }
    }

    function countFactsNumbers() {
        jQuery('.counter-fact-value').each(function() {
            var $this,
                countTo
            $this = jQuery(this)
            countTo = $this.attr('data-count')
            jQuery({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum))
                },
                complete: function() {
                    $this.text(this.countNum)
                    $this.removeAttr('data-count')
                }
            })
        })
        counterFactsFlag = 1
    }
}(jQuery));



(function($) {
    Drupal.behaviors.auc = {
        attach: function(context, settings) {
            headerMenuLocation()
            navigationMenuLocation()
            jQuery(window).resize(function() {
                // On resize screen changing top header menu location.
                headerMenuLocation()
                navigationMenuLocation()
            })

            jQuery(window).scroll(function() {
                // When scroll change size of header.
                if (jQuery(window).scrollTop() >= 100) {
                    jQuery('header').addClass('shrink-header')
                } else {
                    jQuery('header').removeClass('shrink-header')
                }
            })
        }
    }

    // Function to change header menu location in small devices.
    function headerMenuLocation() {
        if (window.innerWidth < 992) {
            if (jQuery('.nav-menu-xs .container').html().length === 0) {
                jQuery('.region-header-right nav .menu--top-header-menu, .region-header-right nav .menu--top-header-menu-ar').detach().appendTo('.nav-menu-xs .container')
            }
        } else {
            jQuery('.nav-menu-xs .menu--top-header-menu, .nav-menu-xs .menu--top-header-menu-ar').detach().prependTo('.region-header-right nav')
        }
    }

    function navigationMenuLocation() {
        if (window.innerWidth < 768) {
            if (jQuery('.custom-navigation').html().length === 0) {
                jQuery('.navigation-wrapper .paragraph-navigation').detach().appendTo('.custom-navigation')
            }
        } else {
            jQuery('.custom-navigation .paragraph-navigation').detach().appendTo('.navigation-wrapper')
        }
    }
}(jQuery));



/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function($, Drupal, Bootstrap) {
    "use strict";

    /**
     * Extend the Bootstrap Popover plugin constructor class.
     */
    Bootstrap.extendPlugin('popover', function(settings) {
        return {
            DEFAULTS: {
                animation: !!settings.popover_animation,
                enabled: settings.popover_enabled,
                html: !!settings.popover_html,
                placement: settings.popover_placement,
                selector: settings.popover_selector,
                trigger: settings.popover_trigger,
                triggerAutoclose: !!settings.popover_trigger_autoclose,
                title: settings.popover_title,
                content: settings.popover_content,
                delay: parseInt(settings.popover_delay, 10),
                container: settings.popover_container
            }
        };
    });

    /**
     * Bootstrap Popovers.
     *
     * @todo This should really be properly delegated if selector option is set.
     */
    Drupal.behaviors.bootstrapPopovers = {
        attach: function(context) {
            // Immediately return if popovers are not available.
            if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
                return;
            }

            // Popover autoclose.
            if ($.fn.popover.Constructor.DEFAULTS.triggerAutoclose) {
                var $currentPopover = null;
                jQuery(document)
                    .on('show.bs.popover', '[data-toggle=popover]', function() {
                        var $trigger = jQuery(this);
                        var popover = $trigger.data('bs.popover');

                        // Only keep track of clicked triggers that we're manually handling.
                        if (popover.options.originalTrigger === 'click') {
                            if ($currentPopover && !$currentPopover.is($trigger)) {
                                $currentPopover.popover('hide');
                            }
                            $currentPopover = $trigger;
                        }
                    })
                    .on('click', function(e) {
                        var $target = jQuery(e.target);
                        var popover = $target.is('[data-toggle=popover]') && $target.data('bs.popover');
                        if ($currentPopover && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
                            $currentPopover.popover('hide');
                            $currentPopover = null;
                        }
                    });
            }

            var elements = jQuery(context).find('[data-toggle=popover]').toArray();
            for (var i = 0; i < elements.length; i++) {
                var $element = jQuery(elements[i]);
                var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

                // Store the original trigger.
                options.originalTrigger = options.trigger;

                // If the trigger is "click", then we'll handle it manually here.
                if (options.trigger === 'click') {
                    options.trigger = 'manual';
                }

                // Retrieve content from a target element.
                var $target = jQuery(options.target || $element.is('a[href^="#"]') && $element.attr('href')).clone();
                if (!options.content && $target[0]) {
                    $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
                    options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
                }

                // Initialize the popover.
                $element.popover(options);

                // Handle clicks manually.
                if (options.originalTrigger === 'click') {
                    // To ensure the element is bound multiple times, remove any
                    // previously set event handler before adding another one.
                    $element
                        .off('click.drupal.bootstrap.popover')
                        .on('click.drupal.bootstrap.popover', function(e) {
                            jQuery(this).popover('toggle');
                            e.preventDefault();
                            e.stopPropagation();
                        });
                }
            }
        },
        detach: function(context) {
            // Immediately return if popovers are not available.
            if (!$.fn.popover || !$.fn.popover.Constructor.DEFAULTS.enabled) {
                return;
            }

            // Destroy all popovers.
            jQuery(context).find('[data-toggle="popover"]')
                .off('click.drupal.bootstrap.popover')
                .popover('destroy');
        }
    };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);;
/**
 * @file
 * Contains auc_megamenu.js.
 */

(function($, Drupal) {
    'use strict';

    Drupal.behaviors.auc_megamenu = {
        attach: function(context, settings) {

            // Basic a11y.
            // Make the megamenu navigable with keyboard.
            jQuery('ul.menu--simple-mega-menu li.menu-item--expanded a').on('focusin', function() {
                jQuery('li.menu-item--expanded').removeClass('focused');
                jQuery(this).parents('li.menu-item--expanded').addClass('focused');
            });

            // Close menu on click anywhere.
            jQuery('body').on('click', function() {
                jQuery('li.menu-item--expanded').removeClass('focused');
            });

            // Close menu on escape key press.
            jQuery(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    jQuery('li.menu-item--expanded').removeClass('focused');
                }
            });
        }
    };

}(jQuery, Drupal));;