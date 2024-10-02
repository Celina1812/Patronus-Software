(function (we) {
    typeof define == "function" && define.amd ? define(we) : we()
}
)(function () {
    "use strict";
    function we(u) {
        if (u === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return u
    }
    function co(u, t) {
        u.prototype = Object.create(t.prototype),
            u.prototype.constructor = u,
            u.__proto__ = t
    }
    /*!
 * GSAP 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var _e = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    }, tr = {
        duration: .5,
        overwrite: !1,
        delay: 0
    }, jn, Ht, Dt, be = 1e8, nt = 1 / be, Kn = Math.PI * 2, Ma = Kn / 4, Ra = 0, ho = Math.sqrt, Ba = Math.cos, La = Math.sin, Mt = function (t) {
        return typeof t == "string"
    }, gt = function (t) {
        return typeof t == "function"
    }, ii = function (t) {
        return typeof t == "number"
    }, Zn = function (t) {
        return typeof t == "undefined"
    }, He = function (t) {
        return typeof t == "object"
    }, ae = function (t) {
        return t !== !1
    }, Qn = function () {
        return typeof window != "undefined"
    }, sn = function (t) {
        return gt(t) || Mt(t)
    }, po = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function () { }
        , $t = Array.isArray, Jn = /(?:-?\.?\d|\.)+/gi, _o = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, er = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ts = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Do = /[+-]=-?[.\d]+/, go = /[^,'"\[\]\s]+/gi, za = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ft, Te, es, is, De = {}, on = {}, mo, yo = function (t) {
            return (on = Ti(t, De)) && he
        }, rs = function (t, i) {
            return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()")
        }, un = function (t, i) {
            return !i && console.warn(t)
        }, vo = function (t, i) {
            return t && (De[t] = i) && on && (on[t] = i) || De
        }, wr = function () {
            return 0
        }, Na = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        }, an = {
            suppressEvents: !0,
            kill: !1
        }, Ia = {
            suppressEvents: !0
        }, ns = {}, ci = [], ss = {}, Co, ge = {}, os = {}, xo = 30, ln = [], us = "", as = function (t) {
            var i = t[0], e, r;
            if (He(i) || gt(i) || (t = [t]),
                !(e = (i._gsap || {}).harness)) {
                for (r = ln.length; r-- && !ln[r].targetTest(i);)
                    ;
                e = ln[r]
            }
            for (r = t.length; r--;)
                t[r] && (t[r]._gsap || (t[r]._gsap = new Zo(t[r], e))) || t.splice(r, 1);
            return t
        }, bi = function (t) {
            return t._gsap || as(Ae(t))[0]._gsap
        }, Fo = function (t, i, e) {
            return (e = t[i]) && gt(e) ? t[i]() : Zn(e) && t.getAttribute && t.getAttribute(i) || e
        }, le = function (t, i) {
            return (t = t.split(",")).forEach(i) || t
        }, Ct = function (t) {
            return Math.round(t * 1e5) / 1e5 || 0
        }, zt = function (t) {
            return Math.round(t * 1e7) / 1e7 || 0
        }, ir = function (t, i) {
            var e = i.charAt(0)
                , r = parseFloat(i.substr(2));
            return t = parseFloat(t),
                e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r
        }, Ya = function (t, i) {
            for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e;)
                ;
            return r < e
        }, fn = function () {
            var t = ci.length, i = ci.slice(0), e, r;
            for (ss = {},
                ci.length = 0,
                e = 0; e < t; e++)
                r = i[e],
                    r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0)
        }, Eo = function (t, i, e, r) {
            ci.length && !Ht && fn(),
                t.render(i, e, r || Ht && i < 0 && (t._initted || t._startAt)),
                ci.length && !Ht && fn()
        }, wo = function (t) {
            var i = parseFloat(t);
            return (i || i === 0) && (t + "").match(go).length < 2 ? i : Mt(t) ? t.trim() : t
        }, bo = function (t) {
            return t
        }, Se = function (t, i) {
            for (var e in i)
                e in t || (t[e] = i[e]);
            return t
        }, Xa = function (t) {
            return function (i, e) {
                for (var r in e)
                    r in i || r === "duration" && t || r === "ease" || (i[r] = e[r])
            }
        }, Ti = function (t, i) {
            for (var e in i)
                t[e] = i[e];
            return t
        }, To = function u(t, i) {
            for (var e in i)
                e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = He(i[e]) ? u(t[e] || (t[e] = {}), i[e]) : i[e]);
            return t
        }, cn = function (t, i) {
            var e = {}, r;
            for (r in t)
                r in i || (e[r] = t[r]);
            return e
        }, br = function (t) {
            var i = t.parent || ft
                , e = t.keyframes ? Xa($t(t.keyframes)) : Se;
            if (ae(t.inherit))
                for (; i;)
                    e(t, i.vars.defaults),
                        i = i.parent || i._dp;
            return t
        }, Wa = function (t, i) {
            for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e];)
                ;
            return e < 0
        }, So = function (t, i, e, r, n) {
            e === void 0 && (e = "_first"),
                r === void 0 && (r = "_last");
            var s = t[r], o;
            if (n)
                for (o = i[n]; s && s[n] > o;)
                    s = s._prev;
            return s ? (i._next = s._next,
                s._next = i) : (i._next = t[e],
                    t[e] = i),
                i._next ? i._next._prev = i : t[r] = i,
                i._prev = s,
                i.parent = i._dp = t,
                i
        }, hn = function (t, i, e, r) {
            e === void 0 && (e = "_first"),
                r === void 0 && (r = "_last");
            var n = i._prev
                , s = i._next;
            n ? n._next = s : t[e] === i && (t[e] = s),
                s ? s._prev = n : t[r] === i && (t[r] = n),
                i._next = i._prev = i.parent = null
        }, hi = function (t, i) {
            t.parent && (!i || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t),
                t._act = 0
        }, Si = function (t, i) {
            if (t && (!i || i._end > t._dur || i._start < 0))
                for (var e = t; e;)
                    e._dirty = 1,
                        e = e.parent;
            return t
        }, Va = function (t) {
            for (var i = t.parent; i && i.parent;)
                i._dirty = 1,
                    i.totalDuration(),
                    i = i.parent;
            return t
        }, ls = function (t, i, e, r) {
            return t._startAt && (Ht ? t._startAt.revert(an) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, !0, r))
        }, Ua = function u(t) {
            return !t || t._ts && u(t.parent)
        }, ko = function (t) {
            return t._repeat ? rr(t._tTime, t = t.duration() + t._rDelay) * t : 0
        }, rr = function (t, i) {
            var e = Math.floor(t /= i);
            return t && e === t ? e - 1 : e
        }, dn = function (t, i) {
            return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur)
        }, pn = function (t) {
            return t._end = zt(t._start + (t._tDur / Math.abs(t._ts || t._rts || nt) || 0))
        }, _n = function (t, i) {
            var e = t._dp;
            return e && e.smoothChildTiming && t._ts && (t._start = zt(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)),
                pn(t),
                e._dirty || Si(e, t)),
                t
        }, Ao = function (t, i) {
            var e;
            if ((i._time || !i._dur && i._initted || i._start < t._time && (i._dur || !i.add)) && (e = dn(t.rawTime(), i),
                (!i._dur || Sr(0, i.totalDuration(), e) - i._tTime > nt) && i.render(e, !0)),
                Si(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
                if (t._dur < t.duration())
                    for (e = t; e._dp;)
                        e.rawTime() >= 0 && e.totalTime(e._tTime),
                            e = e._dp;
                t._zTime = -nt
            }
        }, $e = function (t, i, e, r) {
            return i.parent && hi(i),
                i._start = zt((ii(e) ? e : e || t !== ft ? ke(t, e, i) : t._time) + i._delay),
                i._end = zt(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)),
                So(t, i, "_first", "_last", t._sort ? "_start" : 0),
                fs(i) || (t._recent = i),
                r || Ao(t, i),
                t._ts < 0 && _n(t, t._tTime),
                t
        }, Po = function (t, i) {
            return (De.ScrollTrigger || rs("scrollTrigger", i)) && De.ScrollTrigger.create(i, t)
        }, Oo = function (t, i, e, r, n) {
            if (ys(t, i, n),
                !t._initted)
                return 1;
            if (!e && t._pt && !Ht && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Co !== me.frame)
                return ci.push(t),
                    t._lazy = [n, r],
                    1
        }, Ha = function u(t) {
            var i = t.parent;
            return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || u(i))
        }, fs = function (t) {
            var i = t.data;
            return i === "isFromStart" || i === "isStart"
        }, $a = function (t, i, e, r) {
            var n = t.ratio, s = i < 0 || !i && (!t._start && Ha(t) && !(!t._initted && fs(t)) || (t._ts < 0 || t._dp._ts < 0) && !fs(t)) ? 0 : 1, o = t._rDelay, a = 0, l, f, p;
            if (o && t._repeat && (a = Sr(0, t._tDur, i),
                f = rr(a, o),
                t._yoyo && f & 1 && (s = 1 - s),
                f !== rr(t._tTime, o) && (n = 1 - s,
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                s !== n || Ht || r || t._zTime === nt || !i && t._zTime) {
                if (!t._initted && Oo(t, i, r, e, a))
                    return;
                for (p = t._zTime,
                    t._zTime = i || (e ? nt : 0),
                    e || (e = i && !p),
                    t.ratio = s,
                    t._from && (s = 1 - s),
                    t._time = 0,
                    t._tTime = a,
                    l = t._pt; l;)
                    l.r(s, l.d),
                        l = l._next;
                i < 0 && ls(t, i, e, !0),
                    t._onUpdate && !e && Pe(t, "onUpdate"),
                    a && t._repeat && !e && t.parent && Pe(t, "onRepeat"),
                    (i >= t._tDur || i < 0) && t.ratio === s && (s && hi(t, 1),
                        !e && !Ht && (Pe(t, s ? "onComplete" : "onReverseComplete", !0),
                            t._prom && t._prom()))
            } else
                t._zTime || (t._zTime = i)
        }, qa = function (t, i, e) {
            var r;
            if (e > i)
                for (r = t._first; r && r._start <= e;) {
                    if (r.data === "isPause" && r._start > i)
                        return r;
                    r = r._next
                }
            else
                for (r = t._last; r && r._start >= e;) {
                    if (r.data === "isPause" && r._start < i)
                        return r;
                    r = r._prev
                }
        }, nr = function (t, i, e, r) {
            var n = t._repeat
                , s = zt(i) || 0
                , o = t._tTime / t._tDur;
            return o && !r && (t._time *= s / t._dur),
                t._dur = s,
                t._tDur = n ? n < 0 ? 1e10 : zt(s * (n + 1) + t._rDelay * n) : s,
                o > 0 && !r && _n(t, t._tTime = t._tDur * o),
                t.parent && pn(t),
                e || Si(t.parent, t),
                t
        }, Mo = function (t) {
            return t instanceof fe ? Si(t) : nr(t, t._dur)
        }, Ga = {
            _start: 0,
            endTime: wr,
            totalDuration: wr
        }, ke = function u(t, i, e) {
            var r = t.labels, n = t._recent || Ga, s = t.duration() >= be ? n.endTime(!1) : t._dur, o, a, l;
            return Mt(i) && (isNaN(i) || i in r) ? (a = i.charAt(0),
                l = i.substr(-1) === "%",
                o = i.indexOf("="),
                a === "<" || a === ">" ? (o >= 0 && (i = i.replace(/=/, "")),
                    (a === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (l ? (o < 0 ? n : e).totalDuration() / 100 : 1)) : o < 0 ? (i in r || (r[i] = s),
                        r[i]) : (a = parseFloat(i.charAt(o - 1) + i.substr(o + 1)),
                            l && e && (a = a / 100 * ($t(e) ? e[0] : e).totalDuration()),
                            o > 1 ? u(t, i.substr(0, o - 1), e) + a : s + a)) : i == null ? s : +i
        }, Tr = function (t, i, e) {
            var r = ii(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = i[n], o, a;
            if (r && (s.duration = i[1]),
                s.parent = e,
                t) {
                for (o = s,
                    a = e; a && !("immediateRender" in o);)
                    o = a.vars.defaults || {},
                        a = ae(a.vars.inherit) && a.parent;
                s.immediateRender = ae(o.immediateRender),
                    t < 2 ? s.runBackwards = 1 : s.startAt = i[n - 1]
            }
            return new bt(i[0], s, i[n + 1])
        }, di = function (t, i) {
            return t || t === 0 ? i(t) : i
        }, Sr = function (t, i, e) {
            return e < t ? t : e > i ? i : e
        }, qt = function (t, i) {
            return !Mt(t) || !(i = za.exec(t)) ? "" : i[1]
        }, ja = function (t, i, e) {
            return di(e, function (r) {
                return Sr(t, i, r)
            })
        }, cs = [].slice, Ro = function (t, i) {
            return t && He(t) && "length" in t && (!i && !t.length || t.length - 1 in t && He(t[0])) && !t.nodeType && t !== Te
        }, Ka = function (t, i, e) {
            return e === void 0 && (e = []),
                t.forEach(function (r) {
                    var n;
                    return Mt(r) && !i || Ro(r, 1) ? (n = e).push.apply(n, Ae(r)) : e.push(r)
                }) || e
        }, Ae = function (t, i, e) {
            return Dt && !i && Dt.selector ? Dt.selector(t) : Mt(t) && !e && (es || !or()) ? cs.call((i || is).querySelectorAll(t), 0) : $t(t) ? Ka(t, e) : Ro(t) ? cs.call(t, 0) : t ? [t] : []
        }, hs = function (t) {
            return t = Ae(t)[0] || un("Invalid scope") || {},
                function (i) {
                    var e = t.current || t.nativeElement || t;
                    return Ae(i, e.querySelectorAll ? e : e === t ? un("Invalid scope") || is.createElement("div") : t)
                }
        }, Bo = function (t) {
            return t.sort(function () {
                return .5 - Math.random()
            })
        }, Lo = function (t) {
            if (gt(t))
                return t;
            var i = He(t) ? t : {
                each: t
            }
                , e = ki(i.ease)
                , r = i.from || 0
                , n = parseFloat(i.base) || 0
                , s = {}
                , o = r > 0 && r < 1
                , a = isNaN(r) || o
                , l = i.axis
                , f = r
                , p = r;
            return Mt(r) ? f = p = {
                center: .5,
                edges: .5,
                end: 1
            }[r] || 0 : !o && a && (f = r[0],
                p = r[1]),
                function (h, c, _) {
                    var d = (_ || i).length, g = s[d], C, x, F, m, E, S, y, T, b;
                    if (!g) {
                        if (b = i.grid === "auto" ? 0 : (i.grid || [1, be])[1],
                            !b) {
                            for (y = -be; y < (y = _[b++].getBoundingClientRect().left) && b < d;)
                                ;
                            b--
                        }
                        for (g = s[d] = [],
                            C = a ? Math.min(b, d) * f - .5 : r % b,
                            x = b === be ? 0 : a ? d * p / b - .5 : r / b | 0,
                            y = 0,
                            T = be,
                            S = 0; S < d; S++)
                            F = S % b - C,
                                m = x - (S / b | 0),
                                g[S] = E = l ? Math.abs(l === "y" ? m : F) : ho(F * F + m * m),
                                E > y && (y = E),
                                E < T && (T = E);
                        r === "random" && Bo(g),
                            g.max = y - T,
                            g.min = T,
                            g.v = d = (parseFloat(i.amount) || parseFloat(i.each) * (b > d ? d - 1 : l ? l === "y" ? d / b : b : Math.max(b, d / b)) || 0) * (r === "edges" ? -1 : 1),
                            g.b = d < 0 ? n - d : n,
                            g.u = qt(i.amount || i.each) || 0,
                            e = e && d < 0 ? Go(e) : e
                    }
                    return d = (g[h] - g.min) / g.max || 0,
                        zt(g.b + (e ? e(d) : d) * g.v) + g.u
                }
        }, ds = function (t) {
            var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
            return function (e) {
                var r = zt(Math.round(parseFloat(e) / t) * t * i);
                return (r - r % 1) / i + (ii(e) ? 0 : qt(e))
            }
        }, zo = function (t, i) {
            var e = $t(t), r, n;
            return !e && He(t) && (r = e = t.radius || be,
                t.values ? (t = Ae(t.values),
                    (n = !ii(t[0])) && (r *= r)) : t = ds(t.increment)),
                di(i, e ? gt(t) ? function (s) {
                    return n = t(s),
                        Math.abs(n - s) <= r ? n : s
                }
                    : function (s) {
                        for (var o = parseFloat(n ? s.x : s), a = parseFloat(n ? s.y : 0), l = be, f = 0, p = t.length, h, c; p--;)
                            n ? (h = t[p].x - o,
                                c = t[p].y - a,
                                h = h * h + c * c) : h = Math.abs(t[p] - o),
                                h < l && (l = h,
                                    f = p);
                        return f = !r || l <= r ? t[f] : s,
                            n || f === s || ii(s) ? f : f + qt(s)
                    }
                    : ds(t))
        }, No = function (t, i, e, r) {
            return di($t(t) ? !i : e === !0 ? !!(e = 0) : !r, function () {
                return $t(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * .99)) / e) * e * r) / r
            })
        }, Za = function () {
            for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
                i[e] = arguments[e];
            return function (r) {
                return i.reduce(function (n, s) {
                    return s(n)
                }, r)
            }
        }, Qa = function (t, i) {
            return function (e) {
                return t(parseFloat(e)) + (i || qt(e))
            }
        }, Ja = function (t, i, e) {
            return Yo(t, i, 0, 1, e)
        }, Io = function (t, i, e) {
            return di(e, function (r) {
                return t[~~i(r)]
            })
        }, tl = function u(t, i, e) {
            var r = i - t;
            return $t(t) ? Io(t, u(0, t.length), i) : di(e, function (n) {
                return (r + (n - t) % r) % r + t
            })
        }, el = function u(t, i, e) {
            var r = i - t
                , n = r * 2;
            return $t(t) ? Io(t, u(0, t.length - 1), i) : di(e, function (s) {
                return s = (n + (s - t) % n) % n || 0,
                    t + (s > r ? n - s : s)
            })
        }, kr = function (t) {
            for (var i = 0, e = "", r, n, s, o; ~(r = t.indexOf("random(", i));)
                s = t.indexOf(")", r),
                    o = t.charAt(r + 7) === "[",
                    n = t.substr(r + 7, s - r - 7).match(o ? go : Jn),
                    e += t.substr(i, r - i) + No(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5),
                    i = s + 1;
            return e + t.substr(i, t.length - i)
        }, Yo = function (t, i, e, r, n) {
            var s = i - t
                , o = r - e;
            return di(n, function (a) {
                return e + ((a - t) / s * o || 0)
            })
        }, il = function u(t, i, e, r) {
            var n = isNaN(t + i) ? 0 : function (c) {
                return (1 - c) * t + c * i
            }
                ;
            if (!n) {
                var s = Mt(t), o = {}, a, l, f, p, h;
                if (e === !0 && (r = 1) && (e = null),
                    s)
                    t = {
                        p: t
                    },
                        i = {
                            p: i
                        };
                else if ($t(t) && !$t(i)) {
                    for (f = [],
                        p = t.length,
                        h = p - 2,
                        l = 1; l < p; l++)
                        f.push(u(t[l - 1], t[l]));
                    p--,
                        n = function (_) {
                            _ *= p;
                            var d = Math.min(h, ~~_);
                            return f[d](_ - d)
                        }
                        ,
                        e = i
                } else
                    r || (t = Ti($t(t) ? [] : {}, t));
                if (!f) {
                    for (a in i)
                        gs.call(o, t, a, "get", i[a]);
                    n = function (_) {
                        return xs(_, o) || (s ? t.p : t)
                    }
                }
            }
            return di(e, n)
        }, Xo = function (t, i, e) {
            var r = t.labels, n = be, s, o, a;
            for (s in r)
                o = r[s] - i,
                    o < 0 == !!e && o && n > (o = Math.abs(o)) && (a = s,
                        n = o);
            return a
        }, Pe = function (t, i, e) {
            var r = t.vars, n = r[i], s = Dt, o = t._ctx, a, l, f;
            if (!!n)
                return a = r[i + "Params"],
                    l = r.callbackScope || t,
                    e && ci.length && fn(),
                    o && (Dt = o),
                    f = a ? n.apply(l, a) : n.call(l),
                    Dt = s,
                    f
        }, Ar = function (t) {
            return hi(t),
                t.scrollTrigger && t.scrollTrigger.kill(!!Ht),
                t.progress() < 1 && Pe(t, "onInterrupt"),
                t
        }, sr, Wo = [], Vo = function (t) {
            if (Qn() && t) {
                t = !t.name && t.default || t;
                var i = t.name
                    , e = gt(t)
                    , r = i && !e && t.init ? function () {
                        this._props = []
                    }
                        : t
                    , n = {
                        init: wr,
                        render: xs,
                        add: gs,
                        kill: ml,
                        modifier: gl,
                        rawVars: 0
                    }
                    , s = {
                        targetTest: 0,
                        get: 0,
                        getSetter: Cs,
                        aliases: {},
                        register: 0
                    };
                if (or(),
                    t !== r) {
                    if (ge[i])
                        return;
                    Se(r, Se(cn(t, n), s)),
                        Ti(r.prototype, Ti(n, cn(t, s))),
                        ge[r.prop = i] = r,
                        t.targetTest && (ln.push(r),
                            ns[i] = 1),
                        i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin"
                }
                vo(i, r),
                    t.register && t.register(he, r, ce)
            } else
                t && Wo.push(t)
        }, st = 255, Pr = {
            aqua: [0, st, st],
            lime: [0, st, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, st],
            navy: [0, 0, 128],
            white: [st, st, st],
            olive: [128, 128, 0],
            yellow: [st, st, 0],
            orange: [st, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [st, 0, 0],
            pink: [st, 192, 203],
            cyan: [0, st, st],
            transparent: [st, st, st, 0]
        }, ps = function (t, i, e) {
            return t += t < 0 ? 1 : t > 1 ? -1 : 0,
                (t * 6 < 1 ? i + (e - i) * t * 6 : t < .5 ? e : t * 3 < 2 ? i + (e - i) * (2 / 3 - t) * 6 : i) * st + .5 | 0
        }, Uo = function (t, i, e) {
            var r = t ? ii(t) ? [t >> 16, t >> 8 & st, t & st] : 0 : Pr.black, n, s, o, a, l, f, p, h, c, _;
            if (!r) {
                if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)),
                    Pr[t])
                    r = Pr[t];
                else if (t.charAt(0) === "#") {
                    if (t.length < 6 && (n = t.charAt(1),
                        s = t.charAt(2),
                        o = t.charAt(3),
                        t = "#" + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")),
                        t.length === 9)
                        return r = parseInt(t.substr(1, 6), 16),
                            [r >> 16, r >> 8 & st, r & st, parseInt(t.substr(7), 16) / 255];
                    t = parseInt(t.substr(1), 16),
                        r = [t >> 16, t >> 8 & st, t & st]
                } else if (t.substr(0, 3) === "hsl") {
                    if (r = _ = t.match(Jn),
                        !i)
                        a = +r[0] % 360 / 360,
                            l = +r[1] / 100,
                            f = +r[2] / 100,
                            s = f <= .5 ? f * (l + 1) : f + l - f * l,
                            n = f * 2 - s,
                            r.length > 3 && (r[3] *= 1),
                            r[0] = ps(a + 1 / 3, n, s),
                            r[1] = ps(a, n, s),
                            r[2] = ps(a - 1 / 3, n, s);
                    else if (~t.indexOf("="))
                        return r = t.match(_o),
                            e && r.length < 4 && (r[3] = 1),
                            r
                } else
                    r = t.match(Jn) || Pr.transparent;
                r = r.map(Number)
            }
            return i && !_ && (n = r[0] / st,
                s = r[1] / st,
                o = r[2] / st,
                p = Math.max(n, s, o),
                h = Math.min(n, s, o),
                f = (p + h) / 2,
                p === h ? a = l = 0 : (c = p - h,
                    l = f > .5 ? c / (2 - p - h) : c / (p + h),
                    a = p === n ? (s - o) / c + (s < o ? 6 : 0) : p === s ? (o - n) / c + 2 : (n - s) / c + 4,
                    a *= 60),
                r[0] = ~~(a + .5),
                r[1] = ~~(l * 100 + .5),
                r[2] = ~~(f * 100 + .5)),
                e && r.length < 4 && (r[3] = 1),
                r
        }, Ho = function (t) {
            var i = []
                , e = []
                , r = -1;
            return t.split(pi).forEach(function (n) {
                var s = n.match(er) || [];
                i.push.apply(i, s),
                    e.push(r += s.length + 1)
            }),
                i.c = e,
                i
        }, $o = function (t, i, e) {
            var r = "", n = (t + r).match(pi), s = i ? "hsla(" : "rgba(", o = 0, a, l, f, p;
            if (!n)
                return t;
            if (n = n.map(function (h) {
                return (h = Uo(h, i, 1)) && s + (i ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")"
            }),
                e && (f = Ho(t),
                    a = e.c,
                    a.join(r) !== f.c.join(r)))
                for (l = t.replace(pi, "1").split(er),
                    p = l.length - 1; o < p; o++)
                    r += l[o] + (~a.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : e).shift());
            if (!l)
                for (l = t.split(pi),
                    p = l.length - 1; o < p; o++)
                    r += l[o] + n[o];
            return r + l[p]
        }, pi = function () {
            var u = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
            for (t in Pr)
                u += "|" + t + "\\b";
            return new RegExp(u + ")", "gi")
        }(), rl = /hsl[a]?\(/, qo = function (t) {
            var i = t.join(" "), e;
            if (pi.lastIndex = 0,
                pi.test(i))
                return e = rl.test(i),
                    t[1] = $o(t[1], e),
                    t[0] = $o(t[0], e, Ho(t[1])),
                    !0
        }, Or, me = function () {
            var u = Date.now, t = 500, i = 33, e = u(), r = e, n = 1e3 / 240, s = n, o = [], a, l, f, p, h, c, _ = function d(g) {
                var C = u() - r, x = g === !0, F, m, E, S;
                if (C > t && (e += C - i),
                    r += C,
                    E = r - e,
                    F = E - s,
                    (F > 0 || x) && (S = ++p.frame,
                        h = E - p.time * 1e3,
                        p.time = E = E / 1e3,
                        s += F + (F >= n ? 4 : n - F),
                        m = 1),
                    x || (a = l(d)),
                    m)
                    for (c = 0; c < o.length; c++)
                        o[c](E, h, S, g)
            };
            return p = {
                time: 0,
                frame: 0,
                tick: function () {
                    _(!0)
                },
                deltaRatio: function (g) {
                    return h / (1e3 / (g || 60))
                },
                wake: function () {
                    mo && (!es && Qn() && (Te = es = window,
                        is = Te.document || {},
                        De.gsap = he,
                        (Te.gsapVersions || (Te.gsapVersions = [])).push(he.version),
                        yo(on || Te.GreenSockGlobals || !Te.gsap && Te || {}),
                        f = Te.requestAnimationFrame,
                        Wo.forEach(Vo)),
                        a && p.sleep(),
                        l = f || function (g) {
                            return setTimeout(g, s - p.time * 1e3 + 1 | 0)
                        }
                        ,
                        Or = 1,
                        _(2))
                },
                sleep: function () {
                    (f ? Te.cancelAnimationFrame : clearTimeout)(a),
                        Or = 0,
                        l = wr
                },
                lagSmoothing: function (g, C) {
                    t = g || 1 / 0,
                        i = Math.min(C || 33, t)
                },
                fps: function (g) {
                    n = 1e3 / (g || 240),
                        s = p.time * 1e3 + n
                },
                add: function (g, C, x) {
                    var F = C ? function (m, E, S, y) {
                        g(m, E, S, y),
                            p.remove(F)
                    }
                        : g;
                    return p.remove(g),
                        o[x ? "unshift" : "push"](F),
                        or(),
                        F
                },
                remove: function (g, C) {
                    ~(C = o.indexOf(g)) && o.splice(C, 1) && c >= C && c--
                },
                _listeners: o
            },
                p
        }(), or = function () {
            return !Or && me.wake()
        }, j = {}, nl = /^[\d.\-M][\d.\-,\s]/, sl = /["']/g, ol = function (t) {
            for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, s = e.length, o, a, l; n < s; n++)
                a = e[n],
                    o = n !== s - 1 ? a.lastIndexOf(",") : a.length,
                    l = a.substr(0, o),
                    i[r] = isNaN(l) ? l.replace(sl, "").trim() : +l,
                    r = a.substr(o + 1).trim();
            return i
        }, ul = function (t) {
            var i = t.indexOf("(") + 1
                , e = t.indexOf(")")
                , r = t.indexOf("(", i);
            return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e)
        }, al = function (t) {
            var i = (t + "").split("(")
                , e = j[i[0]];
            return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [ol(i[1])] : ul(t).split(",").map(wo)) : j._CE && nl.test(t) ? j._CE("", t) : e
        }, Go = function (t) {
            return function (i) {
                return 1 - t(1 - i)
            }
        }, jo = function u(t, i) {
            for (var e = t._first, r; e;)
                e instanceof fe ? u(e, i) : e.vars.yoyoEase && (!e._yoyo || !e._repeat) && e._yoyo !== i && (e.timeline ? u(e.timeline, i) : (r = e._ease,
                    e._ease = e._yEase,
                    e._yEase = r,
                    e._yoyo = i)),
                    e = e._next
        }, ki = function (t, i) {
            return t && (gt(t) ? t : j[t] || al(t)) || i
        }, Ai = function (t, i, e, r) {
            e === void 0 && (e = function (a) {
                return 1 - i(1 - a)
            }
            ),
                r === void 0 && (r = function (a) {
                    return a < .5 ? i(a * 2) / 2 : 1 - i((1 - a) * 2) / 2
                }
                );
            var n = {
                easeIn: i,
                easeOut: e,
                easeInOut: r
            }, s;
            return le(t, function (o) {
                j[o] = De[o] = n,
                    j[s = o.toLowerCase()] = e;
                for (var a in n)
                    j[s + (a === "easeIn" ? ".in" : a === "easeOut" ? ".out" : ".inOut")] = j[o + "." + a] = n[a]
            }),
                n
        }, Ko = function (t) {
            return function (i) {
                return i < .5 ? (1 - t(1 - i * 2)) / 2 : .5 + t((i - .5) * 2) / 2
            }
        }, _s = function u(t, i, e) {
            var r = i >= 1 ? i : 1
                , n = (e || (t ? .3 : .45)) / (i < 1 ? i : 1)
                , s = n / Kn * (Math.asin(1 / r) || 0)
                , o = function (f) {
                    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * La((f - s) * n) + 1
                }
                , a = t === "out" ? o : t === "in" ? function (l) {
                    return 1 - o(1 - l)
                }
                    : Ko(o);
            return n = Kn / n,
                a.config = function (l, f) {
                    return u(t, l, f)
                }
                ,
                a
        }, Ds = function u(t, i) {
            i === void 0 && (i = 1.70158);
            var e = function (s) {
                return s ? --s * s * ((i + 1) * s + i) + 1 : 0
            }
                , r = t === "out" ? e : t === "in" ? function (n) {
                    return 1 - e(1 - n)
                }
                    : Ko(e);
            return r.config = function (n) {
                return u(t, n)
            }
                ,
                r
        };
    le("Linear,Quad,Cubic,Quart,Quint,Strong", function (u, t) {
        var i = t < 5 ? t + 1 : t;
        Ai(u + ",Power" + (i - 1), t ? function (e) {
            return Math.pow(e, i)
        }
            : function (e) {
                return e
            }
            , function (e) {
                return 1 - Math.pow(1 - e, i)
            }, function (e) {
                return e < .5 ? Math.pow(e * 2, i) / 2 : 1 - Math.pow((1 - e) * 2, i) / 2
            })
    }),
        j.Linear.easeNone = j.none = j.Linear.easeIn,
        Ai("Elastic", _s("in"), _s("out"), _s()),
        function (u, t) {
            var i = 1 / t
                , e = 2 * i
                , r = 2.5 * i
                , n = function (o) {
                    return o < i ? u * o * o : o < e ? u * Math.pow(o - 1.5 / t, 2) + .75 : o < r ? u * (o -= 2.25 / t) * o + .9375 : u * Math.pow(o - 2.625 / t, 2) + .984375
                };
            Ai("Bounce", function (s) {
                return 1 - n(1 - s)
            }, n)
        }(7.5625, 2.75),
        Ai("Expo", function (u) {
            return u ? Math.pow(2, 10 * (u - 1)) : 0
        }),
        Ai("Circ", function (u) {
            return -(ho(1 - u * u) - 1)
        }),
        Ai("Sine", function (u) {
            return u === 1 ? 1 : -Ba(u * Ma) + 1
        }),
        Ai("Back", Ds("in"), Ds("out"), Ds()),
        j.SteppedEase = j.steps = De.SteppedEase = {
            config: function (t, i) {
                t === void 0 && (t = 1);
                var e = 1 / t
                    , r = t + (i ? 0 : 1)
                    , n = i ? 1 : 0
                    , s = 1 - nt;
                return function (o) {
                    return ((r * Sr(0, s, o) | 0) + n) * e
                }
            }
        },
        tr.ease = j["quad.out"],
        le("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (u) {
            return us += u + "," + u + "Params,"
        });
    var Zo = function (t, i) {
        this.id = Ra++,
            t._gsap = this,
            this.target = t,
            this.harness = i,
            this.get = i ? i.get : Fo,
            this.set = i ? i.getSetter : Cs
    }
        , Mr = function () {
            function u(i) {
                this.vars = i,
                    this._delay = +i.delay || 0,
                    (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0,
                        this._yoyo = !!i.yoyo || !!i.yoyoEase),
                    this._ts = 1,
                    nr(this, +i.duration, 1, 1),
                    this.data = i.data,
                    Dt && (this._ctx = Dt,
                        Dt.data.push(this)),
                    Or || me.wake()
            }
            var t = u.prototype;
            return t.delay = function (e) {
                return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay),
                    this._delay = e,
                    this) : this._delay
            }
                ,
                t.duration = function (e) {
                    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur
                }
                ,
                t.totalDuration = function (e) {
                    return arguments.length ? (this._dirty = 0,
                        nr(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
                }
                ,
                t.totalTime = function (e, r) {
                    if (or(),
                        !arguments.length)
                        return this._tTime;
                    var n = this._dp;
                    if (n && n.smoothChildTiming && this._ts) {
                        for (_n(this, e),
                            !n._dp || n.parent || Ao(n, this); n && n.parent;)
                            n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0),
                                n = n.parent;
                        !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && $e(this._dp, this, this._start - this._delay)
                    }
                    return (this._tTime !== e || !this._dur && !r || this._initted && Math.abs(this._zTime) === nt || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e),
                        Eo(this, e, r)),
                        this
                }
                ,
                t.time = function (e, r) {
                    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + ko(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), r) : this._time
                }
                ,
                t.totalProgress = function (e, r) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
                }
                ,
                t.progress = function (e, r) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + ko(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
                }
                ,
                t.iteration = function (e, r) {
                    var n = this.duration() + this._rDelay;
                    return arguments.length ? this.totalTime(this._time + (e - 1) * n, r) : this._repeat ? rr(this._tTime, n) + 1 : 1
                }
                ,
                t.timeScale = function (e) {
                    if (!arguments.length)
                        return this._rts === -nt ? 0 : this._rts;
                    if (this._rts === e)
                        return this;
                    var r = this.parent && this._ts ? dn(this.parent._time, this) : this._tTime;
                    return this._rts = +e || 0,
                        this._ts = this._ps || e === -nt ? 0 : this._rts,
                        this.totalTime(Sr(-Math.abs(this._delay), this._tDur, r), !0),
                        pn(this),
                        Va(this)
                }
                ,
                t.paused = function (e) {
                    return arguments.length ? (this._ps !== e && (this._ps = e,
                        e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
                            this._ts = this._act = 0) : (or(),
                                this._ts = this._rts,
                                this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== nt && (this._tTime -= nt)))),
                        this) : this._ps
                }
                ,
                t.startTime = function (e) {
                    if (arguments.length) {
                        this._start = e;
                        var r = this.parent || this._dp;
                        return r && (r._sort || !this.parent) && $e(r, this, e - this._delay),
                            this
                    }
                    return this._start
                }
                ,
                t.endTime = function (e) {
                    return this._start + (ae(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
                }
                ,
                t.rawTime = function (e) {
                    var r = this.parent || this._dp;
                    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? dn(r.rawTime(e), this) : this._tTime : this._tTime
                }
                ,
                t.revert = function (e) {
                    e === void 0 && (e = Ia);
                    var r = Ht;
                    return Ht = e,
                        (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e),
                            this.totalTime(-.01, e.suppressEvents)),
                        this.data !== "nested" && e.kill !== !1 && this.kill(),
                        Ht = r,
                        this
                }
                ,
                t.globalTime = function (e) {
                    for (var r = this, n = arguments.length ? e : r.rawTime(); r;)
                        n = r._start + n / (r._ts || 1),
                            r = r._dp;
                    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 / 0 : this._sat.globalTime(e) : n
                }
                ,
                t.repeat = function (e) {
                    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e,
                        Mo(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
                }
                ,
                t.repeatDelay = function (e) {
                    if (arguments.length) {
                        var r = this._time;
                        return this._rDelay = e,
                            Mo(this),
                            r ? this.time(r) : this
                    }
                    return this._rDelay
                }
                ,
                t.yoyo = function (e) {
                    return arguments.length ? (this._yoyo = e,
                        this) : this._yoyo
                }
                ,
                t.seek = function (e, r) {
                    return this.totalTime(ke(this, e), ae(r))
                }
                ,
                t.restart = function (e, r) {
                    return this.play().totalTime(e ? -this._delay : 0, ae(r))
                }
                ,
                t.play = function (e, r) {
                    return e != null && this.seek(e, r),
                        this.reversed(!1).paused(!1)
                }
                ,
                t.reverse = function (e, r) {
                    return e != null && this.seek(e || this.totalDuration(), r),
                        this.reversed(!0).paused(!1)
                }
                ,
                t.pause = function (e, r) {
                    return e != null && this.seek(e, r),
                        this.paused(!0)
                }
                ,
                t.resume = function () {
                    return this.paused(!1)
                }
                ,
                t.reversed = function (e) {
                    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -nt : 0)),
                        this) : this._rts < 0
                }
                ,
                t.invalidate = function () {
                    return this._initted = this._act = 0,
                        this._zTime = -nt,
                        this
                }
                ,
                t.isActive = function () {
                    var e = this.parent || this._dp, r = this._start, n;
                    return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= r && n < this.endTime(!0) - nt)
                }
                ,
                t.eventCallback = function (e, r, n) {
                    var s = this.vars;
                    return arguments.length > 1 ? (r ? (s[e] = r,
                        n && (s[e + "Params"] = n),
                        e === "onUpdate" && (this._onUpdate = r)) : delete s[e],
                        this) : s[e]
                }
                ,
                t.then = function (e) {
                    var r = this;
                    return new Promise(function (n) {
                        var s = gt(e) ? e : bo
                            , o = function () {
                                var l = r.then;
                                r.then = null,
                                    gt(s) && (s = s(r)) && (s.then || s === r) && (r.then = l),
                                    n(s),
                                    r.then = l
                            };
                        r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? o() : r._prom = o
                    }
                    )
                }
                ,
                t.kill = function () {
                    Ar(this)
                }
                ,
                u
        }();
    Se(Mr.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -nt,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var fe = function (u) {
        co(t, u);
        function t(e, r) {
            var n;
            return e === void 0 && (e = {}),
                n = u.call(this, e) || this,
                n.labels = {},
                n.smoothChildTiming = !!e.smoothChildTiming,
                n.autoRemoveChildren = !!e.autoRemoveChildren,
                n._sort = ae(e.sortChildren),
                ft && $e(e.parent || ft, we(n), r),
                e.reversed && n.reverse(),
                e.paused && n.paused(!0),
                e.scrollTrigger && Po(we(n), e.scrollTrigger),
                n
        }
        var i = t.prototype;
        return i.to = function (r, n, s) {
            return Tr(0, arguments, this),
                this
        }
            ,
            i.from = function (r, n, s) {
                return Tr(1, arguments, this),
                    this
            }
            ,
            i.fromTo = function (r, n, s, o) {
                return Tr(2, arguments, this),
                    this
            }
            ,
            i.set = function (r, n, s) {
                return n.duration = 0,
                    n.parent = this,
                    br(n).repeatDelay || (n.repeat = 0),
                    n.immediateRender = !!n.immediateRender,
                    new bt(r, n, ke(this, s), 1),
                    this
            }
            ,
            i.call = function (r, n, s) {
                return $e(this, bt.delayedCall(0, r, n), s)
            }
            ,
            i.staggerTo = function (r, n, s, o, a, l, f) {
                return s.duration = n,
                    s.stagger = s.stagger || o,
                    s.onComplete = l,
                    s.onCompleteParams = f,
                    s.parent = this,
                    new bt(r, s, ke(this, a)),
                    this
            }
            ,
            i.staggerFrom = function (r, n, s, o, a, l, f) {
                return s.runBackwards = 1,
                    br(s).immediateRender = ae(s.immediateRender),
                    this.staggerTo(r, n, s, o, a, l, f)
            }
            ,
            i.staggerFromTo = function (r, n, s, o, a, l, f, p) {
                return o.startAt = s,
                    br(o).immediateRender = ae(o.immediateRender),
                    this.staggerTo(r, n, o, a, l, f, p)
            }
            ,
            i.render = function (r, n, s) {
                var o = this._time, a = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, f = r <= 0 ? 0 : zt(r), p = this._zTime < 0 != r < 0 && (this._initted || !l), h, c, _, d, g, C, x, F, m, E, S, y;
                if (this !== ft && f > a && r >= 0 && (f = a),
                    f !== this._tTime || s || p) {
                    if (o !== this._time && l && (f += this._time - o,
                        r += this._time - o),
                        h = f,
                        m = this._start,
                        F = this._ts,
                        C = !F,
                        p && (l || (o = this._zTime),
                            (r || !n) && (this._zTime = r)),
                        this._repeat) {
                        if (S = this._yoyo,
                            g = l + this._rDelay,
                            this._repeat < -1 && r < 0)
                            return this.totalTime(g * 100 + r, n, s);
                        if (h = zt(f % g),
                            f === a ? (d = this._repeat,
                                h = l) : (d = ~~(f / g),
                                    d && d === f / g && (h = l,
                                        d--),
                                    h > l && (h = l)),
                            E = rr(this._tTime, g),
                            !o && this._tTime && E !== d && this._tTime - E * g - this._dur <= 0 && (E = d),
                            S && d & 1 && (h = l - h,
                                y = 1),
                            d !== E && !this._lock) {
                            var T = S && E & 1
                                , b = T === (S && d & 1);
                            if (d < E && (T = !T),
                                o = T ? 0 : f % l ? l : f,
                                this._lock = 1,
                                this.render(o || (y ? 0 : zt(d * g)), n, !l)._lock = 0,
                                this._tTime = f,
                                !n && this.parent && Pe(this, "onRepeat"),
                                this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1),
                                o && o !== this._time || C !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                                return this;
                            if (l = this._dur,
                                a = this._tDur,
                                b && (this._lock = 2,
                                    o = T ? l : -1e-4,
                                    this.render(o, !0),
                                    this.vars.repeatRefresh && !y && this.invalidate()),
                                this._lock = 0,
                                !this._ts && !C)
                                return this;
                            jo(this, y)
                        }
                    }
                    if (this._hasPause && !this._forcing && this._lock < 2 && (x = qa(this, zt(o), zt(h)),
                        x && (f -= h - (h = x._start))),
                        this._tTime = f,
                        this._time = h,
                        this._act = !F,
                        this._initted || (this._onUpdate = this.vars.onUpdate,
                            this._initted = 1,
                            this._zTime = r,
                            o = 0),
                        !o && h && !n && !d && (Pe(this, "onStart"),
                            this._tTime !== f))
                        return this;
                    if (h >= o && r >= 0)
                        for (c = this._first; c;) {
                            if (_ = c._next,
                                (c._act || h >= c._start) && c._ts && x !== c) {
                                if (c.parent !== this)
                                    return this.render(r, n, s);
                                if (c.render(c._ts > 0 ? (h - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (h - c._start) * c._ts, n, s),
                                    h !== this._time || !this._ts && !C) {
                                    x = 0,
                                        _ && (f += this._zTime = -nt);
                                    break
                                }
                            }
                            c = _
                        }
                    else {
                        c = this._last;
                        for (var k = r < 0 ? r : h; c;) {
                            if (_ = c._prev,
                                (c._act || k <= c._end) && c._ts && x !== c) {
                                if (c.parent !== this)
                                    return this.render(r, n, s);
                                if (c.render(c._ts > 0 ? (k - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (k - c._start) * c._ts, n, s || Ht && (c._initted || c._startAt)),
                                    h !== this._time || !this._ts && !C) {
                                    x = 0,
                                        _ && (f += this._zTime = k ? -nt : nt);
                                    break
                                }
                            }
                            c = _
                        }
                    }
                    if (x && !n && (this.pause(),
                        x.render(h >= o ? 0 : -nt)._zTime = h >= o ? 1 : -1,
                        this._ts))
                        return this._start = m,
                            pn(this),
                            this.render(r, n, s);
                    this._onUpdate && !n && Pe(this, "onUpdate", !0),
                        (f === a && this._tTime >= this.totalDuration() || !f && o) && (m === this._start || Math.abs(F) !== Math.abs(this._ts)) && (this._lock || ((r || !l) && (f === a && this._ts > 0 || !f && this._ts < 0) && hi(this, 1),
                            !n && !(r < 0 && !o) && (f || o || !a) && (Pe(this, f === a && r >= 0 ? "onComplete" : "onReverseComplete", !0),
                                this._prom && !(f < a && this.timeScale() > 0) && this._prom())))
                }
                return this
            }
            ,
            i.add = function (r, n) {
                var s = this;
                if (ii(n) || (n = ke(this, n, r)),
                    !(r instanceof Mr)) {
                    if ($t(r))
                        return r.forEach(function (o) {
                            return s.add(o, n)
                        }),
                            this;
                    if (Mt(r))
                        return this.addLabel(r, n);
                    if (gt(r))
                        r = bt.delayedCall(0, r);
                    else
                        return this
                }
                return this !== r ? $e(this, r, n) : this
            }
            ,
            i.getChildren = function (r, n, s, o) {
                r === void 0 && (r = !0),
                    n === void 0 && (n = !0),
                    s === void 0 && (s = !0),
                    o === void 0 && (o = -be);
                for (var a = [], l = this._first; l;)
                    l._start >= o && (l instanceof bt ? n && a.push(l) : (s && a.push(l),
                        r && a.push.apply(a, l.getChildren(!0, n, s)))),
                        l = l._next;
                return a
            }
            ,
            i.getById = function (r) {
                for (var n = this.getChildren(1, 1, 1), s = n.length; s--;)
                    if (n[s].vars.id === r)
                        return n[s]
            }
            ,
            i.remove = function (r) {
                return Mt(r) ? this.removeLabel(r) : gt(r) ? this.killTweensOf(r) : (hn(this, r),
                    r === this._recent && (this._recent = this._last),
                    Si(this))
            }
            ,
            i.totalTime = function (r, n) {
                return arguments.length ? (this._forcing = 1,
                    !this._dp && this._ts && (this._start = zt(me.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))),
                    u.prototype.totalTime.call(this, r, n),
                    this._forcing = 0,
                    this) : this._tTime
            }
            ,
            i.addLabel = function (r, n) {
                return this.labels[r] = ke(this, n),
                    this
            }
            ,
            i.removeLabel = function (r) {
                return delete this.labels[r],
                    this
            }
            ,
            i.addPause = function (r, n, s) {
                var o = bt.delayedCall(0, n || wr, s);
                return o.data = "isPause",
                    this._hasPause = 1,
                    $e(this, o, ke(this, r))
            }
            ,
            i.removePause = function (r) {
                var n = this._first;
                for (r = ke(this, r); n;)
                    n._start === r && n.data === "isPause" && hi(n),
                        n = n._next
            }
            ,
            i.killTweensOf = function (r, n, s) {
                for (var o = this.getTweensOf(r, s), a = o.length; a--;)
                    _i !== o[a] && o[a].kill(r, n);
                return this
            }
            ,
            i.getTweensOf = function (r, n) {
                for (var s = [], o = Ae(r), a = this._first, l = ii(n), f; a;)
                    a instanceof bt ? Ya(a._targets, o) && (l ? (!_i || a._initted && a._ts) && a.globalTime(0) <= n && a.globalTime(a.totalDuration()) > n : !n || a.isActive()) && s.push(a) : (f = a.getTweensOf(o, n)).length && s.push.apply(s, f),
                        a = a._next;
                return s
            }
            ,
            i.tweenTo = function (r, n) {
                n = n || {};
                var s = this, o = ke(s, r), a = n, l = a.startAt, f = a.onStart, p = a.onStartParams, h = a.immediateRender, c, _ = bt.to(s, Se({
                    ease: n.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: o,
                    overwrite: "auto",
                    duration: n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || nt,
                    onStart: function () {
                        if (s.pause(),
                            !c) {
                            var g = n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale());
                            _._dur !== g && nr(_, g, 0, 1).render(_._time, !0, !0),
                                c = 1
                        }
                        f && f.apply(_, p || [])
                    }
                }, n));
                return h ? _.render(0) : _
            }
            ,
            i.tweenFromTo = function (r, n, s) {
                return this.tweenTo(n, Se({
                    startAt: {
                        time: ke(this, r)
                    }
                }, s))
            }
            ,
            i.recent = function () {
                return this._recent
            }
            ,
            i.nextLabel = function (r) {
                return r === void 0 && (r = this._time),
                    Xo(this, ke(this, r))
            }
            ,
            i.previousLabel = function (r) {
                return r === void 0 && (r = this._time),
                    Xo(this, ke(this, r), 1)
            }
            ,
            i.currentLabel = function (r) {
                return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + nt)
            }
            ,
            i.shiftChildren = function (r, n, s) {
                s === void 0 && (s = 0);
                for (var o = this._first, a = this.labels, l; o;)
                    o._start >= s && (o._start += r,
                        o._end += r),
                        o = o._next;
                if (n)
                    for (l in a)
                        a[l] >= s && (a[l] += r);
                return Si(this)
            }
            ,
            i.invalidate = function (r) {
                var n = this._first;
                for (this._lock = 0; n;)
                    n.invalidate(r),
                        n = n._next;
                return u.prototype.invalidate.call(this, r)
            }
            ,
            i.clear = function (r) {
                r === void 0 && (r = !0);
                for (var n = this._first, s; n;)
                    s = n._next,
                        this.remove(n),
                        n = s;
                return this._dp && (this._time = this._tTime = this._pTime = 0),
                    r && (this.labels = {}),
                    Si(this)
            }
            ,
            i.totalDuration = function (r) {
                var n = 0, s = this, o = s._last, a = be, l, f, p;
                if (arguments.length)
                    return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
                if (s._dirty) {
                    for (p = s.parent; o;)
                        l = o._prev,
                            o._dirty && o.totalDuration(),
                            f = o._start,
                            f > a && s._sort && o._ts && !s._lock ? (s._lock = 1,
                                $e(s, o, f - o._delay, 1)._lock = 0) : a = f,
                            f < 0 && o._ts && (n -= f,
                                (!p && !s._dp || p && p.smoothChildTiming) && (s._start += f / s._ts,
                                    s._time -= f,
                                    s._tTime -= f),
                                s.shiftChildren(-f, !1, -1 / 0),
                                a = 0),
                            o._end > n && o._ts && (n = o._end),
                            o = l;
                    nr(s, s === ft && s._time > n ? s._time : n, 1, 1),
                        s._dirty = 0
                }
                return s._tDur
            }
            ,
            t.updateRoot = function (r) {
                if (ft._ts && (Eo(ft, dn(r, ft)),
                    Co = me.frame),
                    me.frame >= xo) {
                    xo += _e.autoSleep || 120;
                    var n = ft._first;
                    if ((!n || !n._ts) && _e.autoSleep && me._listeners.length < 2) {
                        for (; n && !n._ts;)
                            n = n._next;
                        n || me.sleep()
                    }
                }
            }
            ,
            t
    }(Mr);
    Se(fe.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var ll = function (t, i, e, r, n, s, o) {
        var a = new ce(this._pt, t, i, 0, 1, ru, null, n), l = 0, f = 0, p, h, c, _, d, g, C, x;
        for (a.b = e,
            a.e = r,
            e += "",
            r += "",
            (C = ~r.indexOf("random(")) && (r = kr(r)),
            s && (x = [e, r],
                s(x, t, i),
                e = x[0],
                r = x[1]),
            h = e.match(ts) || []; p = ts.exec(r);)
            _ = p[0],
                d = r.substring(l, p.index),
                c ? c = (c + 1) % 5 : d.substr(-5) === "rgba(" && (c = 1),
                _ !== h[f++] && (g = parseFloat(h[f - 1]) || 0,
                    a._pt = {
                        _next: a._pt,
                        p: d || f === 1 ? d : ",",
                        s: g,
                        c: _.charAt(1) === "=" ? ir(g, _) - g : parseFloat(_) - g,
                        m: c && c < 4 ? Math.round : 0
                    },
                    l = ts.lastIndex);
        return a.c = l < r.length ? r.substring(l, r.length) : "",
            a.fp = o,
            (Do.test(r) || C) && (a.e = 0),
            this._pt = a,
            a
    }, gs = function (t, i, e, r, n, s, o, a, l, f) {
        gt(r) && (r = r(n || 0, t, s));
        var p = t[i], h = e !== "get" ? e : gt(p) ? l ? t[i.indexOf("set") || !gt(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](l) : t[i]() : p, c = gt(p) ? l ? pl : eu : vs, _;
        if (Mt(r) && (~r.indexOf("random(") && (r = kr(r)),
            r.charAt(1) === "=" && (_ = ir(h, r) + (qt(h) || 0),
                (_ || _ === 0) && (r = _))),
            !f || h !== r || ms)
            return !isNaN(h * r) && r !== "" ? (_ = new ce(this._pt, t, i, +h || 0, r - (h || 0), typeof p == "boolean" ? Dl : iu, 0, c),
                l && (_.fp = l),
                o && _.modifier(o, this, t),
                this._pt = _) : (!p && !(i in t) && rs(i, r),
                    ll.call(this, t, i, h, r, c, a || _e.stringFilter, l))
    }, fl = function (t, i, e, r, n) {
        if (gt(t) && (t = Rr(t, n, i, e, r)),
            !He(t) || t.style && t.nodeType || $t(t) || po(t))
            return Mt(t) ? Rr(t, n, i, e, r) : t;
        var s = {}, o;
        for (o in t)
            s[o] = Rr(t[o], n, i, e, r);
        return s
    }, Qo = function (t, i, e, r, n, s) {
        var o, a, l, f;
        if (ge[t] && (o = new ge[t]).init(n, o.rawVars ? i[t] : fl(i[t], r, n, s, e), e, r, s) !== !1 && (e._pt = a = new ce(e._pt, n, t, 0, 1, o.render, o, 0, o.priority),
            e !== sr))
            for (l = e._ptLookup[e._targets.indexOf(n)],
                f = o._props.length; f--;)
                l[o._props[f]] = a;
        return o
    }, _i, ms, ys = function u(t, i, e) {
        var r = t.vars, n = r.ease, s = r.startAt, o = r.immediateRender, a = r.lazy, l = r.onUpdate, f = r.onUpdateParams, p = r.callbackScope, h = r.runBackwards, c = r.yoyoEase, _ = r.keyframes, d = r.autoRevert, g = t._dur, C = t._startAt, x = t._targets, F = t.parent, m = F && F.data === "nested" ? F.vars.targets : x, E = t._overwrite === "auto" && !jn, S = t.timeline, y, T, b, k, B, A, $, I, Y, M, P, z, w;
        if (S && (!_ || !n) && (n = "none"),
            t._ease = ki(n, tr.ease),
            t._yEase = c ? Go(ki(c === !0 ? n : c, tr.ease)) : 0,
            c && t._yoyo && !t._repeat && (c = t._yEase,
                t._yEase = t._ease,
                t._ease = c),
            t._from = !S && !!r.runBackwards,
            !S || _ && !r.stagger) {
            if (I = x[0] ? bi(x[0]).harness : 0,
                z = I && r[I.prop],
                y = cn(r, ns),
                C && (C._zTime < 0 && C.progress(1),
                    i < 0 && h && o && !d ? C.render(-1, !0) : C.revert(h && g ? an : Na),
                    C._lazy = 0),
                s) {
                if (hi(t._startAt = bt.set(x, Se({
                    data: "isStart",
                    overwrite: !1,
                    parent: F,
                    immediateRender: !0,
                    lazy: !C && ae(a),
                    startAt: null,
                    delay: 0,
                    onUpdate: l,
                    onUpdateParams: f,
                    callbackScope: p,
                    stagger: 0
                }, s))),
                    t._startAt._dp = 0,
                    t._startAt._sat = t,
                    i < 0 && (Ht || !o && !d) && t._startAt.revert(an),
                    o && g && i <= 0 && e <= 0) {
                    i && (t._zTime = i);
                    return
                }
            } else if (h && g && !C) {
                if (i && (o = !1),
                    b = Se({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: o && !C && ae(a),
                        immediateRender: o,
                        stagger: 0,
                        parent: F
                    }, y),
                    z && (b[I.prop] = z),
                    hi(t._startAt = bt.set(x, b)),
                    t._startAt._dp = 0,
                    t._startAt._sat = t,
                    i < 0 && (Ht ? t._startAt.revert(an) : t._startAt.render(-1, !0)),
                    t._zTime = i,
                    !o)
                    u(t._startAt, nt, nt);
                else if (!i)
                    return
            }
            for (t._pt = t._ptCache = 0,
                a = g && ae(a) || a && !g,
                T = 0; T < x.length; T++) {
                if (B = x[T],
                    $ = B._gsap || as(x)[T]._gsap,
                    t._ptLookup[T] = M = {},
                    ss[$.id] && ci.length && fn(),
                    P = m === x ? T : m.indexOf(B),
                    I && (Y = new I).init(B, z || y, t, P, m) !== !1 && (t._pt = k = new ce(t._pt, B, Y.name, 0, 1, Y.render, Y, 0, Y.priority),
                        Y._props.forEach(function (D) {
                            M[D] = k
                        }),
                        Y.priority && (A = 1)),
                    !I || z)
                    for (b in y)
                        ge[b] && (Y = Qo(b, y, t, P, B, m)) ? Y.priority && (A = 1) : M[b] = k = gs.call(t, B, b, "get", y[b], P, m, 0, r.stringFilter);
                t._op && t._op[T] && t.kill(B, t._op[T]),
                    E && t._pt && (_i = t,
                        ft.killTweensOf(B, M, t.globalTime(i)),
                        w = !t.parent,
                        _i = 0),
                    t._pt && a && (ss[$.id] = 1)
            }
            A && nu(t),
                t._onInit && t._onInit(t)
        }
        t._onUpdate = l,
            t._initted = (!t._op || t._pt) && !w,
            _ && i <= 0 && S.render(be, !0, !0)
    }, cl = function (t, i, e, r, n, s, o) {
        var a = (t._pt && t._ptCache || (t._ptCache = {}))[i], l, f, p, h;
        if (!a)
            for (a = t._ptCache[i] = [],
                p = t._ptLookup,
                h = t._targets.length; h--;) {
                if (l = p[h][i],
                    l && l.d && l.d._pt)
                    for (l = l.d._pt; l && l.p !== i && l.fp !== i;)
                        l = l._next;
                if (!l)
                    return ms = 1,
                        t.vars[i] = "+=0",
                        ys(t, o),
                        ms = 0,
                        1;
                a.push(l)
            }
        for (h = a.length; h--;)
            f = a[h],
                l = f._pt || f,
                l.s = (r || r === 0) && !n ? r : l.s + (r || 0) + s * l.c,
                l.c = e - l.s,
                f.e && (f.e = Ct(e) + qt(f.e)),
                f.b && (f.b = l.s + qt(f.b))
    }, hl = function (t, i) {
        var e = t[0] ? bi(t[0]).harness : 0, r = e && e.aliases, n, s, o, a;
        if (!r)
            return i;
        n = Ti({}, i);
        for (s in r)
            if (s in n)
                for (a = r[s].split(","),
                    o = a.length; o--;)
                    n[a[o]] = n[s];
        return n
    }, dl = function (t, i, e, r) {
        var n = i.ease || r || "power1.inOut", s, o;
        if ($t(i))
            o = e[t] || (e[t] = []),
                i.forEach(function (a, l) {
                    return o.push({
                        t: l / (i.length - 1) * 100,
                        v: a,
                        e: n
                    })
                });
        else
            for (s in i)
                o = e[s] || (e[s] = []),
                    s === "ease" || o.push({
                        t: parseFloat(t),
                        v: i[s],
                        e: n
                    })
    }, Rr = function (t, i, e, r, n) {
        return gt(t) ? t.call(i, e, r, n) : Mt(t) && ~t.indexOf("random(") ? kr(t) : t
    }, Jo = us + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", tu = {};
    le(Jo + ",id,stagger,delay,duration,paused,scrollTrigger", function (u) {
        return tu[u] = 1
    });
    var bt = function (u) {
        co(t, u);
        function t(e, r, n, s) {
            var o;
            typeof r == "number" && (n.duration = r,
                r = n,
                n = null),
                o = u.call(this, s ? r : br(r)) || this;
            var a = o.vars, l = a.duration, f = a.delay, p = a.immediateRender, h = a.stagger, c = a.overwrite, _ = a.keyframes, d = a.defaults, g = a.scrollTrigger, C = a.yoyoEase, x = r.parent || ft, F = ($t(e) || po(e) ? ii(e[0]) : "length" in r) ? [e] : Ae(e), m, E, S, y, T, b, k, B;
            if (o._targets = F.length ? as(F) : un("GSAP target " + e + " not found. https://greensock.com", !_e.nullTargetWarn) || [],
                o._ptLookup = [],
                o._overwrite = c,
                _ || h || sn(l) || sn(f)) {
                if (r = o.vars,
                    m = o.timeline = new fe({
                        data: "nested",
                        defaults: d || {},
                        targets: x && x.data === "nested" ? x.vars.targets : F
                    }),
                    m.kill(),
                    m.parent = m._dp = we(o),
                    m._start = 0,
                    h || sn(l) || sn(f)) {
                    if (y = F.length,
                        k = h && Lo(h),
                        He(h))
                        for (T in h)
                            ~Jo.indexOf(T) && (B || (B = {}),
                                B[T] = h[T]);
                    for (E = 0; E < y; E++)
                        S = cn(r, tu),
                            S.stagger = 0,
                            C && (S.yoyoEase = C),
                            B && Ti(S, B),
                            b = F[E],
                            S.duration = +Rr(l, we(o), E, b, F),
                            S.delay = (+Rr(f, we(o), E, b, F) || 0) - o._delay,
                            !h && y === 1 && S.delay && (o._delay = f = S.delay,
                                o._start += f,
                                S.delay = 0),
                            m.to(b, S, k ? k(E, b, F) : 0),
                            m._ease = j.none;
                    m.duration() ? l = f = 0 : o.timeline = 0
                } else if (_) {
                    br(Se(m.vars.defaults, {
                        ease: "none"
                    })),
                        m._ease = ki(_.ease || r.ease || "none");
                    var A = 0, $, I, Y;
                    if ($t(_))
                        _.forEach(function (M) {
                            return m.to(F, M, ">")
                        }),
                            m.duration();
                    else {
                        S = {};
                        for (T in _)
                            T === "ease" || T === "easeEach" || dl(T, _[T], S, _.easeEach);
                        for (T in S)
                            for ($ = S[T].sort(function (M, P) {
                                return M.t - P.t
                            }),
                                A = 0,
                                E = 0; E < $.length; E++)
                                I = $[E],
                                    Y = {
                                        ease: I.e,
                                        duration: (I.t - (E ? $[E - 1].t : 0)) / 100 * l
                                    },
                                    Y[T] = I.v,
                                    m.to(F, Y, A),
                                    A += Y.duration;
                        m.duration() < l && m.to({}, {
                            duration: l - m.duration()
                        })
                    }
                }
                l || o.duration(l = m.duration())
            } else
                o.timeline = 0;
            return c === !0 && !jn && (_i = we(o),
                ft.killTweensOf(F),
                _i = 0),
                $e(x, we(o), n),
                r.reversed && o.reverse(),
                r.paused && o.paused(!0),
                (p || !l && !_ && o._start === zt(x._time) && ae(p) && Ua(we(o)) && x.data !== "nested") && (o._tTime = -nt,
                    o.render(Math.max(0, -f) || 0)),
                g && Po(we(o), g),
                o
        }
        var i = t.prototype;
        return i.render = function (r, n, s) {
            var o = this._time, a = this._tDur, l = this._dur, f = r < 0, p = r > a - nt && !f ? a : r < nt ? 0 : r, h, c, _, d, g, C, x, F, m;
            if (!l)
                $a(this, r, n, s);
            else if (p !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
                if (h = p,
                    F = this.timeline,
                    this._repeat) {
                    if (d = l + this._rDelay,
                        this._repeat < -1 && f)
                        return this.totalTime(d * 100 + r, n, s);
                    if (h = zt(p % d),
                        p === a ? (_ = this._repeat,
                            h = l) : (_ = ~~(p / d),
                                _ && _ === p / d && (h = l,
                                    _--),
                                h > l && (h = l)),
                        C = this._yoyo && _ & 1,
                        C && (m = this._yEase,
                            h = l - h),
                        g = rr(this._tTime, d),
                        h === o && !s && this._initted)
                        return this._tTime = p,
                            this;
                    _ !== g && (F && this._yEase && jo(F, C),
                        this.vars.repeatRefresh && !C && !this._lock && (this._lock = s = 1,
                            this.render(zt(d * _), !0).invalidate()._lock = 0))
                }
                if (!this._initted) {
                    if (Oo(this, f ? r : h, s, n, p))
                        return this._tTime = 0,
                            this;
                    if (o !== this._time)
                        return this;
                    if (l !== this._dur)
                        return this.render(r, n, s)
                }
                if (this._tTime = p,
                    this._time = h,
                    !this._act && this._ts && (this._act = 1,
                        this._lazy = 0),
                    this.ratio = x = (m || this._ease)(h / l),
                    this._from && (this.ratio = x = 1 - x),
                    h && !o && !n && !_ && (Pe(this, "onStart"),
                        this._tTime !== p))
                    return this;
                for (c = this._pt; c;)
                    c.r(x, c.d),
                        c = c._next;
                F && F.render(r < 0 ? r : !h && C ? -nt : F._dur * F._ease(h / this._dur), n, s) || this._startAt && (this._zTime = r),
                    this._onUpdate && !n && (f && ls(this, r, n, s),
                        Pe(this, "onUpdate")),
                    this._repeat && _ !== g && this.vars.onRepeat && !n && this.parent && Pe(this, "onRepeat"),
                    (p === this._tDur || !p) && this._tTime === p && (f && !this._onUpdate && ls(this, r, !0, !0),
                        (r || !l) && (p === this._tDur && this._ts > 0 || !p && this._ts < 0) && hi(this, 1),
                        !n && !(f && !o) && (p || o || C) && (Pe(this, p === a ? "onComplete" : "onReverseComplete", !0),
                            this._prom && !(p < a && this.timeScale() > 0) && this._prom()))
            }
            return this
        }
            ,
            i.targets = function () {
                return this._targets
            }
            ,
            i.invalidate = function (r) {
                return (!r || !this.vars.runBackwards) && (this._startAt = 0),
                    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
                    this._ptLookup = [],
                    this.timeline && this.timeline.invalidate(r),
                    u.prototype.invalidate.call(this, r)
            }
            ,
            i.resetTo = function (r, n, s, o) {
                Or || me.wake(),
                    this._ts || this.play();
                var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), l;
                return this._initted || ys(this, a),
                    l = this._ease(a / this._dur),
                    cl(this, r, n, s, o, l, a) ? this.resetTo(r, n, s, o) : (_n(this, 0),
                        this.parent || So(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
                        this.render(0))
            }
            ,
            i.kill = function (r, n) {
                if (n === void 0 && (n = "all"),
                    !r && (!n || n === "all"))
                    return this._lazy = this._pt = 0,
                        this.parent ? Ar(this) : this;
                if (this.timeline) {
                    var s = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(r, n, _i && _i.vars.overwrite !== !0)._first || Ar(this),
                        this.parent && s !== this.timeline.totalDuration() && nr(this, this._dur * this.timeline._tDur / s, 0, 1),
                        this
                }
                var o = this._targets, a = r ? Ae(r) : o, l = this._ptLookup, f = this._pt, p, h, c, _, d, g, C;
                if ((!n || n === "all") && Wa(o, a))
                    return n === "all" && (this._pt = 0),
                        Ar(this);
                for (p = this._op = this._op || [],
                    n !== "all" && (Mt(n) && (d = {},
                        le(n, function (x) {
                            return d[x] = 1
                        }),
                        n = d),
                        n = hl(o, n)),
                    C = o.length; C--;)
                    if (~a.indexOf(o[C])) {
                        h = l[C],
                            n === "all" ? (p[C] = n,
                                _ = h,
                                c = {}) : (c = p[C] = p[C] || {},
                                    _ = n);
                        for (d in _)
                            g = h && h[d],
                                g && ((!("kill" in g.d) || g.d.kill(d) === !0) && hn(this, g, "_pt"),
                                    delete h[d]),
                                c !== "all" && (c[d] = 1)
                    }
                return this._initted && !this._pt && f && Ar(this),
                    this
            }
            ,
            t.to = function (r, n) {
                return new t(r, n, arguments[2])
            }
            ,
            t.from = function (r, n) {
                return Tr(1, arguments)
            }
            ,
            t.delayedCall = function (r, n, s, o) {
                return new t(n, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: r,
                    onComplete: n,
                    onReverseComplete: n,
                    onCompleteParams: s,
                    onReverseCompleteParams: s,
                    callbackScope: o
                })
            }
            ,
            t.fromTo = function (r, n, s) {
                return Tr(2, arguments)
            }
            ,
            t.set = function (r, n) {
                return n.duration = 0,
                    n.repeatDelay || (n.repeat = 0),
                    new t(r, n)
            }
            ,
            t.killTweensOf = function (r, n, s) {
                return ft.killTweensOf(r, n, s)
            }
            ,
            t
    }(Mr);
    Se(bt.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }),
        le("staggerTo,staggerFrom,staggerFromTo", function (u) {
            bt[u] = function () {
                var t = new fe
                    , i = cs.call(arguments, 0);
                return i.splice(u === "staggerFromTo" ? 5 : 4, 0, 0),
                    t[u].apply(t, i)
            }
        });
    var vs = function (t, i, e) {
        return t[i] = e
    }
        , eu = function (t, i, e) {
            return t[i](e)
        }
        , pl = function (t, i, e, r) {
            return t[i](r.fp, e)
        }
        , _l = function (t, i, e) {
            return t.setAttribute(i, e)
        }
        , Cs = function (t, i) {
            return gt(t[i]) ? eu : Zn(t[i]) && t.setAttribute ? _l : vs
        }
        , iu = function (t, i) {
            return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e6) / 1e6, i)
        }
        , Dl = function (t, i) {
            return i.set(i.t, i.p, !!(i.s + i.c * t), i)
        }
        , ru = function (t, i) {
            var e = i._pt
                , r = "";
            if (!t && i.b)
                r = i.b;
            else if (t === 1 && i.e)
                r = i.e;
            else {
                for (; e;)
                    r = e.p + (e.m ? e.m(e.s + e.c * t) : Math.round((e.s + e.c * t) * 1e4) / 1e4) + r,
                        e = e._next;
                r += i.c
            }
            i.set(i.t, i.p, r, i)
        }
        , xs = function (t, i) {
            for (var e = i._pt; e;)
                e.r(t, e.d),
                    e = e._next
        }
        , gl = function (t, i, e, r) {
            for (var n = this._pt, s; n;)
                s = n._next,
                    n.p === r && n.modifier(t, i, e),
                    n = s
        }
        , ml = function (t) {
            for (var i = this._pt, e, r; i;)
                r = i._next,
                    i.p === t && !i.op || i.op === t ? hn(this, i, "_pt") : i.dep || (e = 1),
                    i = r;
            return !e
        }
        , yl = function (t, i, e, r) {
            r.mSet(t, i, r.m.call(r.tween, e, r.mt), r)
        }
        , nu = function (t) {
            for (var i = t._pt, e, r, n, s; i;) {
                for (e = i._next,
                    r = n; r && r.pr > i.pr;)
                    r = r._next;
                (i._prev = r ? r._prev : s) ? i._prev._next = i : n = i,
                    (i._next = r) ? r._prev = i : s = i,
                    i = e
            }
            t._pt = n
        }
        , ce = function () {
            function u(i, e, r, n, s, o, a, l, f) {
                this.t = e,
                    this.s = n,
                    this.c = s,
                    this.p = r,
                    this.r = o || iu,
                    this.d = a || this,
                    this.set = l || vs,
                    this.pr = f || 0,
                    this._next = i,
                    i && (i._prev = this)
            }
            var t = u.prototype;
            return t.modifier = function (e, r, n) {
                this.mSet = this.mSet || this.set,
                    this.set = yl,
                    this.m = e,
                    this.mt = n,
                    this.tween = r
            }
                ,
                u
        }();
    le(us + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (u) {
        return ns[u] = 1
    }),
        De.TweenMax = De.TweenLite = bt,
        De.TimelineLite = De.TimelineMax = fe,
        ft = new fe({
            sortChildren: !1,
            defaults: tr,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0
        }),
        _e.stringFilter = qo;
    var Pi = []
        , Dn = {}
        , vl = []
        , su = 0
        , Cl = 0
        , Fs = function (t) {
            return (Dn[t] || vl).map(function (i) {
                return i()
            })
        }
        , Es = function () {
            var t = Date.now()
                , i = [];
            t - su > 2 && (Fs("matchMediaInit"),
                Pi.forEach(function (e) {
                    var r = e.queries, n = e.conditions, s, o, a, l;
                    for (o in r)
                        s = Te.matchMedia(r[o]).matches,
                            s && (a = 1),
                            s !== n[o] && (n[o] = s,
                                l = 1);
                    l && (e.revert(),
                        a && i.push(e))
                }),
                Fs("matchMediaRevert"),
                i.forEach(function (e) {
                    return e.onMatch(e)
                }),
                su = t,
                Fs("matchMedia"))
        }
        , ou = function () {
            function u(i, e) {
                this.selector = e && hs(e),
                    this.data = [],
                    this._r = [],
                    this.isReverted = !1,
                    this.id = Cl++,
                    i && this.add(i)
            }
            var t = u.prototype;
            return t.add = function (e, r, n) {
                gt(e) && (n = r,
                    r = e,
                    e = gt);
                var s = this
                    , o = function () {
                        var l = Dt, f = s.selector, p;
                        return l && l !== s && l.data.push(s),
                            n && (s.selector = hs(n)),
                            Dt = s,
                            p = r.apply(s, arguments),
                            gt(p) && s._r.push(p),
                            Dt = l,
                            s.selector = f,
                            s.isReverted = !1,
                            p
                    };
                return s.last = o,
                    e === gt ? o(s) : e ? s[e] = o : o
            }
                ,
                t.ignore = function (e) {
                    var r = Dt;
                    Dt = null,
                        e(this),
                        Dt = r
                }
                ,
                t.getTweens = function () {
                    var e = [];
                    return this.data.forEach(function (r) {
                        return r instanceof u ? e.push.apply(e, r.getTweens()) : r instanceof bt && !(r.parent && r.parent.data === "nested") && e.push(r)
                    }),
                        e
                }
                ,
                t.clear = function () {
                    this._r.length = this.data.length = 0
                }
                ,
                t.kill = function (e, r) {
                    var n = this;
                    if (e) {
                        var s = this.getTweens();
                        this.data.forEach(function (a) {
                            a.data === "isFlip" && (a.revert(),
                                a.getChildren(!0, !0, !1).forEach(function (l) {
                                    return s.splice(s.indexOf(l), 1)
                                }))
                        }),
                            s.map(function (a) {
                                return {
                                    g: a.globalTime(0),
                                    t: a
                                }
                            }).sort(function (a, l) {
                                return l.g - a.g || -1 / 0
                            }).forEach(function (a) {
                                return a.t.revert(e)
                            }),
                            this.data.forEach(function (a) {
                                return !(a instanceof bt) && a.revert && a.revert(e)
                            }),
                            this._r.forEach(function (a) {
                                return a(e, n)
                            }),
                            this.isReverted = !0
                    } else
                        this.data.forEach(function (a) {
                            return a.kill && a.kill()
                        });
                    if (this.clear(),
                        r)
                        for (var o = Pi.length; o--;)
                            Pi[o].id === this.id && Pi.splice(o, 1)
                }
                ,
                t.revert = function (e) {
                    this.kill(e || {})
                }
                ,
                u
        }()
        , xl = function () {
            function u(i) {
                this.contexts = [],
                    this.scope = i
            }
            var t = u.prototype;
            return t.add = function (e, r, n) {
                He(e) || (e = {
                    matches: e
                });
                var s = new ou(0, n || this.scope), o = s.conditions = {}, a, l, f;
                Dt && !s.selector && (s.selector = Dt.selector),
                    this.contexts.push(s),
                    r = s.add("onMatch", r),
                    s.queries = e;
                for (l in e)
                    l === "all" ? f = 1 : (a = Te.matchMedia(e[l]),
                        a && (Pi.indexOf(s) < 0 && Pi.push(s),
                            (o[l] = a.matches) && (f = 1),
                            a.addListener ? a.addListener(Es) : a.addEventListener("change", Es)));
                return f && r(s),
                    this
            }
                ,
                t.revert = function (e) {
                    this.kill(e || {})
                }
                ,
                t.kill = function (e) {
                    this.contexts.forEach(function (r) {
                        return r.kill(e, !0)
                    })
                }
                ,
                u
        }()
        , gn = {
            registerPlugin: function () {
                for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
                    i[e] = arguments[e];
                i.forEach(function (r) {
                    return Vo(r)
                })
            },
            timeline: function (t) {
                return new fe(t)
            },
            getTweensOf: function (t, i) {
                return ft.getTweensOf(t, i)
            },
            getProperty: function (t, i, e, r) {
                Mt(t) && (t = Ae(t)[0]);
                var n = bi(t || {}).get
                    , s = e ? bo : wo;
                return e === "native" && (e = ""),
                    t && (i ? s((ge[i] && ge[i].get || n)(t, i, e, r)) : function (o, a, l) {
                        return s((ge[o] && ge[o].get || n)(t, o, a, l))
                    }
                    )
            },
            quickSetter: function (t, i, e) {
                if (t = Ae(t),
                    t.length > 1) {
                    var r = t.map(function (f) {
                        return he.quickSetter(f, i, e)
                    })
                        , n = r.length;
                    return function (f) {
                        for (var p = n; p--;)
                            r[p](f)
                    }
                }
                t = t[0] || {};
                var s = ge[i]
                    , o = bi(t)
                    , a = o.harness && (o.harness.aliases || {})[i] || i
                    , l = s ? function (f) {
                        var p = new s;
                        sr._pt = 0,
                            p.init(t, e ? f + e : f, sr, 0, [t]),
                            p.render(1, p),
                            sr._pt && xs(1, sr)
                    }
                        : o.set(t, a);
                return s ? l : function (f) {
                    return l(t, a, e ? f + e : f, o, 1)
                }
            },
            quickTo: function (t, i, e) {
                var r, n = he.to(t, Ti((r = {},
                    r[i] = "+=0.1",
                    r.paused = !0,
                    r), e || {})), s = function (a, l, f) {
                        return n.resetTo(i, a, l, f)
                    };
                return s.tween = n,
                    s
            },
            isTweening: function (t) {
                return ft.getTweensOf(t, !0).length > 0
            },
            defaults: function (t) {
                return t && t.ease && (t.ease = ki(t.ease, tr.ease)),
                    To(tr, t || {})
            },
            config: function (t) {
                return To(_e, t || {})
            },
            registerEffect: function (t) {
                var i = t.name
                    , e = t.effect
                    , r = t.plugins
                    , n = t.defaults
                    , s = t.extendTimeline;
                (r || "").split(",").forEach(function (o) {
                    return o && !ge[o] && !De[o] && un(i + " effect requires " + o + " plugin.")
                }),
                    os[i] = function (o, a, l) {
                        return e(Ae(o), Se(a || {}, n), l)
                    }
                    ,
                    s && (fe.prototype[i] = function (o, a, l) {
                        return this.add(os[i](o, He(a) ? a : (l = a) && {}, this), l)
                    }
                    )
            },
            registerEase: function (t, i) {
                j[t] = ki(i)
            },
            parseEase: function (t, i) {
                return arguments.length ? ki(t, i) : j
            },
            getById: function (t) {
                return ft.getById(t)
            },
            exportRoot: function (t, i) {
                t === void 0 && (t = {});
                var e = new fe(t), r, n;
                for (e.smoothChildTiming = ae(t.smoothChildTiming),
                    ft.remove(e),
                    e._dp = 0,
                    e._time = e._tTime = ft._time,
                    r = ft._first; r;)
                    n = r._next,
                        (i || !(!r._dur && r instanceof bt && r.vars.onComplete === r._targets[0])) && $e(e, r, r._start - r._delay),
                        r = n;
                return $e(ft, e, 0),
                    e
            },
            context: function (t, i) {
                return t ? new ou(t, i) : Dt
            },
            matchMedia: function (t) {
                return new xl(t)
            },
            matchMediaRefresh: function () {
                return Pi.forEach(function (t) {
                    var i = t.conditions, e, r;
                    for (r in i)
                        i[r] && (i[r] = !1,
                            e = 1);
                    e && t.revert()
                }) || Es()
            },
            addEventListener: function (t, i) {
                var e = Dn[t] || (Dn[t] = []);
                ~e.indexOf(i) || e.push(i)
            },
            removeEventListener: function (t, i) {
                var e = Dn[t]
                    , r = e && e.indexOf(i);
                r >= 0 && e.splice(r, 1)
            },
            utils: {
                wrap: tl,
                wrapYoyo: el,
                distribute: Lo,
                random: No,
                snap: zo,
                normalize: Ja,
                getUnit: qt,
                clamp: ja,
                splitColor: Uo,
                toArray: Ae,
                selector: hs,
                mapRange: Yo,
                pipe: Za,
                unitize: Qa,
                interpolate: il,
                shuffle: Bo
            },
            install: yo,
            effects: os,
            ticker: me,
            updateRoot: fe.updateRoot,
            plugins: ge,
            globalTimeline: ft,
            core: {
                PropTween: ce,
                globals: vo,
                Tween: bt,
                Timeline: fe,
                Animation: Mr,
                getCache: bi,
                _removeLinkedListItem: hn,
                reverting: function () {
                    return Ht
                },
                context: function (t) {
                    return t && Dt && (Dt.data.push(t),
                        t._ctx = Dt),
                        Dt
                },
                suppressOverwrites: function (t) {
                    return jn = t
                }
            }
        };
    le("to,from,fromTo,delayedCall,set,killTweensOf", function (u) {
        return gn[u] = bt[u]
    }),
        me.add(fe.updateRoot),
        sr = gn.to({}, {
            duration: 0
        });
    var Fl = function (t, i) {
        for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i;)
            e = e._next;
        return e
    }
        , El = function (t, i) {
            var e = t._targets, r, n, s;
            for (r in i)
                for (n = e.length; n--;)
                    s = t._ptLookup[n][r],
                        s && (s = s.d) && (s._pt && (s = Fl(s, r)),
                            s && s.modifier && s.modifier(i[r], t, e[n], r))
        }
        , ws = function (t, i) {
            return {
                name: t,
                rawVars: 1,
                init: function (r, n, s) {
                    s._onInit = function (o) {
                        var a, l;
                        if (Mt(n) && (a = {},
                            le(n, function (f) {
                                return a[f] = 1
                            }),
                            n = a),
                            i) {
                            a = {};
                            for (l in n)
                                a[l] = i(n[l]);
                            n = a
                        }
                        El(o, n)
                    }
                }
            }
        }
        , he = gn.registerPlugin({
            name: "attr",
            init: function (t, i, e, r, n) {
                var s, o, a;
                this.tween = e;
                for (s in i)
                    a = t.getAttribute(s) || "",
                        o = this.add(t, "setAttribute", (a || 0) + "", i[s], r, n, 0, 0, s),
                        o.op = s,
                        o.b = a,
                        this._props.push(s)
            },
            render: function (t, i) {
                for (var e = i._pt; e;)
                    Ht ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d),
                        e = e._next
            }
        }, {
            name: "endArray",
            init: function (t, i) {
                for (var e = i.length; e--;)
                    this.add(t, e, t[e] || 0, i[e], 0, 0, 0, 0, 0, 1)
            }
        }, ws("roundProps", ds), ws("modifiers"), ws("snap", zo)) || gn;
    bt.version = fe.version = he.version = "3.12.2",
        mo = 1,
        Qn() && or(),
        j.Power0,
        j.Power1,
        j.Power2,
        j.Power3,
        j.Power4,
        j.Linear,
        j.Quad,
        j.Cubic,
        j.Quart,
        j.Quint,
        j.Strong,
        j.Elastic,
        j.Back,
        j.SteppedEase,
        j.Bounce,
        j.Sine,
        j.Expo,
        j.Circ;
    /*!
 * CSSPlugin 3.12.2
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var uu, Di, ur, bs, Oi, au, Ts, wl = function () {
        return typeof window != "undefined"
    }, ri = {}, Mi = 180 / Math.PI, ar = Math.PI / 180, lr = Math.atan2, lu = 1e8, Ss = /([A-Z])/g, bl = /(left|right|width|margin|padding|x)/i, Tl = /[\s,\(]\S/, qe = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    }, ks = function (t, i) {
        return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i)
    }, Sl = function (t, i) {
        return i.set(i.t, i.p, t === 1 ? i.e : Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i)
    }, kl = function (t, i) {
        return i.set(i.t, i.p, t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i)
    }, Al = function (t, i) {
        var e = i.s + i.c * t;
        i.set(i.t, i.p, ~~(e + (e < 0 ? -.5 : .5)) + i.u, i)
    }, fu = function (t, i) {
        return i.set(i.t, i.p, t ? i.e : i.b, i)
    }, cu = function (t, i) {
        return i.set(i.t, i.p, t !== 1 ? i.b : i.e, i)
    }, Pl = function (t, i, e) {
        return t.style[i] = e
    }, Ol = function (t, i, e) {
        return t.style.setProperty(i, e)
    }, Ml = function (t, i, e) {
        return t._gsap[i] = e
    }, Rl = function (t, i, e) {
        return t._gsap.scaleX = t._gsap.scaleY = e
    }, Bl = function (t, i, e, r, n) {
        var s = t._gsap;
        s.scaleX = s.scaleY = e,
            s.renderTransform(n, s)
    }, Ll = function (t, i, e, r, n) {
        var s = t._gsap;
        s[i] = e,
            s.renderTransform(n, s)
    }, ct = "transform", Le = ct + "Origin", zl = function u(t, i) {
        var e = this
            , r = this.target
            , n = r.style;
        if (t in ri && n) {
            if (this.tfm = this.tfm || {},
                t !== "transform")
                t = qe[t] || t,
                    ~t.indexOf(",") ? t.split(",").forEach(function (s) {
                        return e.tfm[s] = ni(r, s)
                    }) : this.tfm[t] = r._gsap.x ? r._gsap[t] : ni(r, t);
            else
                return qe.transform.split(",").forEach(function (s) {
                    return u.call(e, s, i)
                });
            if (this.props.indexOf(ct) >= 0)
                return;
            r._gsap.svg && (this.svgo = r.getAttribute("data-svg-origin"),
                this.props.push(Le, i, "")),
                t = ct
        }
        (n || i) && this.props.push(t, i, n[t])
    }, hu = function (t) {
        t.translate && (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"))
    }, Nl = function () {
        var t = this.props, i = this.target, e = i.style, r = i._gsap, n, s;
        for (n = 0; n < t.length; n += 3)
            t[n + 1] ? i[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Ss, "-$1").toLowerCase());
        if (this.tfm) {
            for (s in this.tfm)
                r[s] = this.tfm[s];
            r.svg && (r.renderTransform(),
                i.setAttribute("data-svg-origin", this.svgo || "")),
                n = Ts(),
                (!n || !n.isStart) && !e[ct] && (hu(e),
                    r.uncache = 1)
        }
    }, du = function (t, i) {
        var e = {
            target: t,
            props: [],
            revert: Nl,
            save: zl
        };
        return t._gsap || he.core.getCache(t),
            i && i.split(",").forEach(function (r) {
                return e.save(r)
            }),
            e
    }, pu, As = function (t, i) {
        var e = Di.createElementNS ? Di.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Di.createElement(t);
        return e.style ? e : Di.createElement(t)
    }, Ge = function u(t, i, e) {
        var r = getComputedStyle(t);
        return r[i] || r.getPropertyValue(i.replace(Ss, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && u(t, fr(i) || i, 1) || ""
    }, _u = "O,Moz,ms,Ms,Webkit".split(","), fr = function (t, i, e) {
        var r = i || Oi
            , n = r.style
            , s = 5;
        if (t in n && !e)
            return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(_u[s] + t in n);)
            ;
        return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? _u[s] : "") + t
    }, Ps = function () {
        wl() && window.document && (uu = window,
            Di = uu.document,
            ur = Di.documentElement,
            Oi = As("div") || {
                style: {}
            },
            As("div"),
            ct = fr(ct),
            Le = ct + "Origin",
            Oi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
            pu = !!fr("perspective"),
            Ts = he.core.reverting,
            bs = 1)
    }, Os = function u(t) {
        var i = As("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), e = this.parentNode, r = this.nextSibling, n = this.style.cssText, s;
        if (ur.appendChild(i),
            i.appendChild(this),
            this.style.display = "block",
            t)
            try {
                s = this.getBBox(),
                    this._gsapBBox = this.getBBox,
                    this.getBBox = u
            } catch { }
        else
            this._gsapBBox && (s = this._gsapBBox());
        return e && (r ? e.insertBefore(this, r) : e.appendChild(this)),
            ur.removeChild(i),
            this.style.cssText = n,
            s
    }, Du = function (t, i) {
        for (var e = i.length; e--;)
            if (t.hasAttribute(i[e]))
                return t.getAttribute(i[e])
    }, gu = function (t) {
        var i;
        try {
            i = t.getBBox()
        } catch {
            i = Os.call(t, !0)
        }
        return i && (i.width || i.height) || t.getBBox === Os || (i = Os.call(t, !0)),
            i && !i.width && !i.x && !i.y ? {
                x: +Du(t, ["x", "cx", "x1"]) || 0,
                y: +Du(t, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            } : i
    }, mu = function (t) {
        return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && gu(t))
    }, Br = function (t, i) {
        if (i) {
            var e = t.style;
            i in ri && i !== Le && (i = ct),
                e.removeProperty ? ((i.substr(0, 2) === "ms" || i.substr(0, 6) === "webkit") && (i = "-" + i),
                    e.removeProperty(i.replace(Ss, "-$1").toLowerCase())) : e.removeAttribute(i)
        }
    }, gi = function (t, i, e, r, n, s) {
        var o = new ce(t._pt, i, e, 0, 1, s ? cu : fu);
        return t._pt = o,
            o.b = r,
            o.e = n,
            t._props.push(e),
            o
    }, yu = {
        deg: 1,
        rad: 1,
        turn: 1
    }, Il = {
        grid: 1,
        flex: 1
    }, mi = function u(t, i, e, r) {
        var n = parseFloat(e) || 0, s = (e + "").trim().substr((n + "").length) || "px", o = Oi.style, a = bl.test(i), l = t.tagName.toLowerCase() === "svg", f = (l ? "client" : "offset") + (a ? "Width" : "Height"), p = 100, h = r === "px", c = r === "%", _, d, g, C;
        return r === s || !n || yu[r] || yu[s] ? n : (s !== "px" && !h && (n = u(t, i, e, "px")),
            C = t.getCTM && mu(t),
            (c || s === "%") && (ri[i] || ~i.indexOf("adius")) ? (_ = C ? t.getBBox()[a ? "width" : "height"] : t[f],
                Ct(c ? n / _ * p : n / 100 * _)) : (o[a ? "width" : "height"] = p + (h ? s : r),
                    d = ~i.indexOf("adius") || r === "em" && t.appendChild && !l ? t : t.parentNode,
                    C && (d = (t.ownerSVGElement || {}).parentNode),
                    (!d || d === Di || !d.appendChild) && (d = Di.body),
                    g = d._gsap,
                    g && c && g.width && a && g.time === me.time && !g.uncache ? Ct(n / g.width * p) : ((c || s === "%") && !Il[Ge(d, "display")] && (o.position = Ge(t, "position")),
                        d === t && (o.position = "static"),
                        d.appendChild(Oi),
                        _ = Oi[f],
                        d.removeChild(Oi),
                        o.position = "absolute",
                        a && c && (g = bi(d),
                            g.time = me.time,
                            g.width = d[f]),
                        Ct(h ? _ * n / p : _ && n ? p / _ * n : 0))))
    }, ni = function (t, i, e, r) {
        var n;
        return bs || Ps(),
            i in qe && i !== "transform" && (i = qe[i],
                ~i.indexOf(",") && (i = i.split(",")[0])),
            ri[i] && i !== "transform" ? (n = zr(t, r),
                n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : yn(Ge(t, Le)) + " " + n.zOrigin + "px") : (n = t.style[i],
                    (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = mn[i] && mn[i](t, i, e) || Ge(t, i) || Fo(t, i) || (i === "opacity" ? 1 : 0))),
            e && !~(n + "").trim().indexOf(" ") ? mi(t, i, n, e) + e : n
    }, Yl = function (t, i, e, r) {
        if (!e || e === "none") {
            var n = fr(i, t, 1)
                , s = n && Ge(t, n, 1);
            s && s !== e ? (i = n,
                e = s) : i === "borderColor" && (e = Ge(t, "borderTopColor"))
        }
        var o = new ce(this._pt, t.style, i, 0, 1, ru), a = 0, l = 0, f, p, h, c, _, d, g, C, x, F, m, E;
        if (o.b = e,
            o.e = r,
            e += "",
            r += "",
            r === "auto" && (t.style[i] = r,
                r = Ge(t, i) || r,
                t.style[i] = e),
            f = [e, r],
            qo(f),
            e = f[0],
            r = f[1],
            h = e.match(er) || [],
            E = r.match(er) || [],
            E.length) {
            for (; p = er.exec(r);)
                g = p[0],
                    x = r.substring(a, p.index),
                    _ ? _ = (_ + 1) % 5 : (x.substr(-5) === "rgba(" || x.substr(-5) === "hsla(") && (_ = 1),
                    g !== (d = h[l++] || "") && (c = parseFloat(d) || 0,
                        m = d.substr((c + "").length),
                        g.charAt(1) === "=" && (g = ir(c, g) + m),
                        C = parseFloat(g),
                        F = g.substr((C + "").length),
                        a = er.lastIndex - F.length,
                        F || (F = F || _e.units[i] || m,
                            a === r.length && (r += F,
                                o.e += F)),
                        m !== F && (c = mi(t, i, d, F) || 0),
                        o._pt = {
                            _next: o._pt,
                            p: x || l === 1 ? x : ",",
                            s: c,
                            c: C - c,
                            m: _ && _ < 4 || i === "zIndex" ? Math.round : 0
                        });
            o.c = a < r.length ? r.substring(a, r.length) : ""
        } else
            o.r = i === "display" && r === "none" ? cu : fu;
        return Do.test(r) && (o.e = 0),
            this._pt = o,
            o
    }, vu = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, Xl = function (t) {
        var i = t.split(" ")
            , e = i[0]
            , r = i[1] || "50%";
        return (e === "top" || e === "bottom" || r === "left" || r === "right") && (t = e,
            e = r,
            r = t),
            i[0] = vu[e] || e,
            i[1] = vu[r] || r,
            i.join(" ")
    }, Wl = function (t, i) {
        if (i.tween && i.tween._time === i.tween._dur) {
            var e = i.t, r = e.style, n = i.u, s = e._gsap, o, a, l;
            if (n === "all" || n === !0)
                r.cssText = "",
                    a = 1;
            else
                for (n = n.split(","),
                    l = n.length; --l > -1;)
                    o = n[l],
                        ri[o] && (a = 1,
                            o = o === "transformOrigin" ? Le : ct),
                        Br(e, o);
            a && (Br(e, ct),
                s && (s.svg && e.removeAttribute("transform"),
                    zr(e, 1),
                    s.uncache = 1,
                    hu(r)))
        }
    }, mn = {
        clearProps: function (t, i, e, r, n) {
            if (n.data !== "isFromStart") {
                var s = t._pt = new ce(t._pt, i, e, 0, 0, Wl);
                return s.u = r,
                    s.pr = -10,
                    s.tween = n,
                    t._props.push(e),
                    1
            }
        }
    }, Lr = [1, 0, 0, 1, 0, 0], Cu = {}, xu = function (t) {
        return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t
    }, Fu = function (t) {
        var i = Ge(t, ct);
        return xu(i) ? Lr : i.substr(7).match(_o).map(Ct)
    }, Ms = function (t, i) {
        var e = t._gsap || bi(t), r = t.style, n = Fu(t), s, o, a, l;
        return e.svg && t.getAttribute("transform") ? (a = t.transform.baseVal.consolidate().matrix,
            n = [a.a, a.b, a.c, a.d, a.e, a.f],
            n.join(",") === "1,0,0,1,0,0" ? Lr : n) : (n === Lr && !t.offsetParent && t !== ur && !e.svg && (a = r.display,
                r.display = "block",
                s = t.parentNode,
                (!s || !t.offsetParent) && (l = 1,
                    o = t.nextElementSibling,
                    ur.appendChild(t)),
                n = Fu(t),
                a ? r.display = a : Br(t, "display"),
                l && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ur.removeChild(t))),
                i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
    }, Rs = function (t, i, e, r, n, s) {
        var o = t._gsap, a = n || Ms(t, !0), l = o.xOrigin || 0, f = o.yOrigin || 0, p = o.xOffset || 0, h = o.yOffset || 0, c = a[0], _ = a[1], d = a[2], g = a[3], C = a[4], x = a[5], F = i.split(" "), m = parseFloat(F[0]) || 0, E = parseFloat(F[1]) || 0, S, y, T, b;
        e ? a !== Lr && (y = c * g - _ * d) && (T = m * (g / y) + E * (-d / y) + (d * x - g * C) / y,
            b = m * (-_ / y) + E * (c / y) - (c * x - _ * C) / y,
            m = T,
            E = b) : (S = gu(t),
                m = S.x + (~F[0].indexOf("%") ? m / 100 * S.width : m),
                E = S.y + (~(F[1] || F[0]).indexOf("%") ? E / 100 * S.height : E)),
            r || r !== !1 && o.smooth ? (C = m - l,
                x = E - f,
                o.xOffset = p + (C * c + x * d) - C,
                o.yOffset = h + (C * _ + x * g) - x) : o.xOffset = o.yOffset = 0,
            o.xOrigin = m,
            o.yOrigin = E,
            o.smooth = !!r,
            o.origin = i,
            o.originIsAbsolute = !!e,
            t.style[Le] = "0px 0px",
            s && (gi(s, o, "xOrigin", l, m),
                gi(s, o, "yOrigin", f, E),
                gi(s, o, "xOffset", p, o.xOffset),
                gi(s, o, "yOffset", h, o.yOffset)),
            t.setAttribute("data-svg-origin", m + " " + E)
    }, zr = function (t, i) {
        var e = t._gsap || new Zo(t);
        if ("x" in e && !i && !e.uncache)
            return e;
        var r = t.style, n = e.scaleX < 0, s = "px", o = "deg", a = getComputedStyle(t), l = Ge(t, Le) || "0", f, p, h, c, _, d, g, C, x, F, m, E, S, y, T, b, k, B, A, $, I, Y, M, P, z, w, D, U, ut, Xt, Z, W;
        return f = p = h = d = g = C = x = F = m = 0,
            c = _ = 1,
            e.svg = !!(t.getCTM && mu(t)),
            a.translate && ((a.translate !== "none" || a.scale !== "none" || a.rotate !== "none") && (r[ct] = (a.translate !== "none" ? "translate3d(" + (a.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (a.rotate !== "none" ? "rotate(" + a.rotate + ") " : "") + (a.scale !== "none" ? "scale(" + a.scale.split(" ").join(",") + ") " : "") + (a[ct] !== "none" ? a[ct] : "")),
                r.scale = r.rotate = r.translate = "none"),
            y = Ms(t, e.svg),
            e.svg && (e.uncache ? (z = t.getBBox(),
                l = e.xOrigin - z.x + "px " + (e.yOrigin - z.y) + "px",
                P = "") : P = !i && t.getAttribute("data-svg-origin"),
                Rs(t, P || l, !!P || e.originIsAbsolute, e.smooth !== !1, y)),
            E = e.xOrigin || 0,
            S = e.yOrigin || 0,
            y !== Lr && (B = y[0],
                A = y[1],
                $ = y[2],
                I = y[3],
                f = Y = y[4],
                p = M = y[5],
                y.length === 6 ? (c = Math.sqrt(B * B + A * A),
                    _ = Math.sqrt(I * I + $ * $),
                    d = B || A ? lr(A, B) * Mi : 0,
                    x = $ || I ? lr($, I) * Mi + d : 0,
                    x && (_ *= Math.abs(Math.cos(x * ar))),
                    e.svg && (f -= E - (E * B + S * $),
                        p -= S - (E * A + S * I))) : (W = y[6],
                            Xt = y[7],
                            D = y[8],
                            U = y[9],
                            ut = y[10],
                            Z = y[11],
                            f = y[12],
                            p = y[13],
                            h = y[14],
                            T = lr(W, ut),
                            g = T * Mi,
                            T && (b = Math.cos(-T),
                                k = Math.sin(-T),
                                P = Y * b + D * k,
                                z = M * b + U * k,
                                w = W * b + ut * k,
                                D = Y * -k + D * b,
                                U = M * -k + U * b,
                                ut = W * -k + ut * b,
                                Z = Xt * -k + Z * b,
                                Y = P,
                                M = z,
                                W = w),
                            T = lr(-$, ut),
                            C = T * Mi,
                            T && (b = Math.cos(-T),
                                k = Math.sin(-T),
                                P = B * b - D * k,
                                z = A * b - U * k,
                                w = $ * b - ut * k,
                                Z = I * k + Z * b,
                                B = P,
                                A = z,
                                $ = w),
                            T = lr(A, B),
                            d = T * Mi,
                            T && (b = Math.cos(T),
                                k = Math.sin(T),
                                P = B * b + A * k,
                                z = Y * b + M * k,
                                A = A * b - B * k,
                                M = M * b - Y * k,
                                B = P,
                                Y = z),
                            g && Math.abs(g) + Math.abs(d) > 359.9 && (g = d = 0,
                                C = 180 - C),
                            c = Ct(Math.sqrt(B * B + A * A + $ * $)),
                            _ = Ct(Math.sqrt(M * M + W * W)),
                            T = lr(Y, M),
                            x = Math.abs(T) > 2e-4 ? T * Mi : 0,
                            m = Z ? 1 / (Z < 0 ? -Z : Z) : 0),
                e.svg && (P = t.getAttribute("transform"),
                    e.forceCSS = t.setAttribute("transform", "") || !xu(Ge(t, ct)),
                    P && t.setAttribute("transform", P))),
            Math.abs(x) > 90 && Math.abs(x) < 270 && (n ? (c *= -1,
                x += d <= 0 ? 180 : -180,
                d += d <= 0 ? 180 : -180) : (_ *= -1,
                    x += x <= 0 ? 180 : -180)),
            i = i || e.uncache,
            e.x = f - ((e.xPercent = f && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + s,
            e.y = p - ((e.yPercent = p && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-p) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + s,
            e.z = h + s,
            e.scaleX = Ct(c),
            e.scaleY = Ct(_),
            e.rotation = Ct(d) + o,
            e.rotationX = Ct(g) + o,
            e.rotationY = Ct(C) + o,
            e.skewX = x + o,
            e.skewY = F + o,
            e.transformPerspective = m + s,
            (e.zOrigin = parseFloat(l.split(" ")[2]) || 0) && (r[Le] = yn(l)),
            e.xOffset = e.yOffset = 0,
            e.force3D = _e.force3D,
            e.renderTransform = e.svg ? Ul : pu ? Eu : Vl,
            e.uncache = 0,
            e
    }, yn = function (t) {
        return (t = t.split(" "))[0] + " " + t[1]
    }, Bs = function (t, i, e) {
        var r = qt(i);
        return Ct(parseFloat(i) + parseFloat(mi(t, "x", e + "px", r))) + r
    }, Vl = function (t, i) {
        i.z = "0px",
            i.rotationY = i.rotationX = "0deg",
            i.force3D = 0,
            Eu(t, i)
    }, Ri = "0deg", Nr = "0px", Bi = ") ", Eu = function (t, i) {
        var e = i || this
            , r = e.xPercent
            , n = e.yPercent
            , s = e.x
            , o = e.y
            , a = e.z
            , l = e.rotation
            , f = e.rotationY
            , p = e.rotationX
            , h = e.skewX
            , c = e.skewY
            , _ = e.scaleX
            , d = e.scaleY
            , g = e.transformPerspective
            , C = e.force3D
            , x = e.target
            , F = e.zOrigin
            , m = ""
            , E = C === "auto" && t && t !== 1 || C === !0;
        if (F && (p !== Ri || f !== Ri)) {
            var S = parseFloat(f) * ar, y = Math.sin(S), T = Math.cos(S), b;
            S = parseFloat(p) * ar,
                b = Math.cos(S),
                s = Bs(x, s, y * b * -F),
                o = Bs(x, o, -Math.sin(S) * -F),
                a = Bs(x, a, T * b * -F + F)
        }
        g !== Nr && (m += "perspective(" + g + Bi),
            (r || n) && (m += "translate(" + r + "%, " + n + "%) "),
            (E || s !== Nr || o !== Nr || a !== Nr) && (m += a !== Nr || E ? "translate3d(" + s + ", " + o + ", " + a + ") " : "translate(" + s + ", " + o + Bi),
            l !== Ri && (m += "rotate(" + l + Bi),
            f !== Ri && (m += "rotateY(" + f + Bi),
            p !== Ri && (m += "rotateX(" + p + Bi),
            (h !== Ri || c !== Ri) && (m += "skew(" + h + ", " + c + Bi),
            (_ !== 1 || d !== 1) && (m += "scale(" + _ + ", " + d + Bi),
            x.style[ct] = m || "translate(0, 0)"
    }, Ul = function (t, i) {
        var e = i || this, r = e.xPercent, n = e.yPercent, s = e.x, o = e.y, a = e.rotation, l = e.skewX, f = e.skewY, p = e.scaleX, h = e.scaleY, c = e.target, _ = e.xOrigin, d = e.yOrigin, g = e.xOffset, C = e.yOffset, x = e.forceCSS, F = parseFloat(s), m = parseFloat(o), E, S, y, T, b;
        a = parseFloat(a),
            l = parseFloat(l),
            f = parseFloat(f),
            f && (f = parseFloat(f),
                l += f,
                a += f),
            a || l ? (a *= ar,
                l *= ar,
                E = Math.cos(a) * p,
                S = Math.sin(a) * p,
                y = Math.sin(a - l) * -h,
                T = Math.cos(a - l) * h,
                l && (f *= ar,
                    b = Math.tan(l - f),
                    b = Math.sqrt(1 + b * b),
                    y *= b,
                    T *= b,
                    f && (b = Math.tan(f),
                        b = Math.sqrt(1 + b * b),
                        E *= b,
                        S *= b)),
                E = Ct(E),
                S = Ct(S),
                y = Ct(y),
                T = Ct(T)) : (E = p,
                    T = h,
                    S = y = 0),
            (F && !~(s + "").indexOf("px") || m && !~(o + "").indexOf("px")) && (F = mi(c, "x", s, "px"),
                m = mi(c, "y", o, "px")),
            (_ || d || g || C) && (F = Ct(F + _ - (_ * E + d * y) + g),
                m = Ct(m + d - (_ * S + d * T) + C)),
            (r || n) && (b = c.getBBox(),
                F = Ct(F + r / 100 * b.width),
                m = Ct(m + n / 100 * b.height)),
            b = "matrix(" + E + "," + S + "," + y + "," + T + "," + F + "," + m + ")",
            c.setAttribute("transform", b),
            x && (c.style[ct] = b)
    }, Hl = function (t, i, e, r, n) {
        var s = 360, o = Mt(n), a = parseFloat(n) * (o && ~n.indexOf("rad") ? Mi : 1), l = a - r, f = r + l + "deg", p, h;
        return o && (p = n.split("_")[1],
            p === "short" && (l %= s,
                l !== l % (s / 2) && (l += l < 0 ? s : -s)),
            p === "cw" && l < 0 ? l = (l + s * lu) % s - ~~(l / s) * s : p === "ccw" && l > 0 && (l = (l - s * lu) % s - ~~(l / s) * s)),
            t._pt = h = new ce(t._pt, i, e, r, l, Sl),
            h.e = f,
            h.u = "deg",
            t._props.push(e),
            h
    }, wu = function (t, i) {
        for (var e in i)
            t[e] = i[e];
        return t
    }, $l = function (t, i, e) {
        var r = wu({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = e.style, o, a, l, f, p, h, c, _;
        r.svg ? (l = e.getAttribute("transform"),
            e.setAttribute("transform", ""),
            s[ct] = i,
            o = zr(e, 1),
            Br(e, ct),
            e.setAttribute("transform", l)) : (l = getComputedStyle(e)[ct],
                s[ct] = i,
                o = zr(e, 1),
                s[ct] = l);
        for (a in ri)
            l = r[a],
                f = o[a],
                l !== f && n.indexOf(a) < 0 && (c = qt(l),
                    _ = qt(f),
                    p = c !== _ ? mi(e, a, l, _) : parseFloat(l),
                    h = parseFloat(f),
                    t._pt = new ce(t._pt, o, a, p, h - p, ks),
                    t._pt.u = _ || 0,
                    t._props.push(a));
        wu(o, r)
    };
    le("padding,margin,Width,Radius", function (u, t) {
        var i = "Top"
            , e = "Right"
            , r = "Bottom"
            , n = "Left"
            , s = (t < 3 ? [i, e, r, n] : [i + n, i + e, r + e, r + n]).map(function (o) {
                return t < 2 ? u + o : "border" + o + u
            });
        mn[t > 1 ? "border" + u : u] = function (o, a, l, f, p) {
            var h, c;
            if (arguments.length < 4)
                return h = s.map(function (_) {
                    return ni(o, _, l)
                }),
                    c = h.join(" "),
                    c.split(h[0]).length === 5 ? h[0] : c;
            h = (f + "").split(" "),
                c = {},
                s.forEach(function (_, d) {
                    return c[_] = h[d] = h[d] || h[(d - 1) / 2 | 0]
                }),
                o.init(a, c, p)
        }
    });
    var bu = {
        name: "css",
        register: Ps,
        targetTest: function (t) {
            return t.style && t.nodeType
        },
        init: function (t, i, e, r, n) {
            var s = this._props, o = t.style, a = e.vars.startAt, l, f, p, h, c, _, d, g, C, x, F, m, E, S, y, T;
            bs || Ps(),
                this.styles = this.styles || du(t),
                T = this.styles.props,
                this.tween = e;
            for (d in i)
                if (d !== "autoRound" && (f = i[d],
                    !(ge[d] && Qo(d, i, e, r, t, n)))) {
                    if (c = typeof f,
                        _ = mn[d],
                        c === "function" && (f = f.call(e, r, t, n),
                            c = typeof f),
                        c === "string" && ~f.indexOf("random(") && (f = kr(f)),
                        _)
                        _(this, t, d, f, e) && (y = 1);
                    else if (d.substr(0, 2) === "--")
                        l = (getComputedStyle(t).getPropertyValue(d) + "").trim(),
                            f += "",
                            pi.lastIndex = 0,
                            pi.test(l) || (g = qt(l),
                                C = qt(f)),
                            C ? g !== C && (l = mi(t, d, l, C) + C) : g && (f += g),
                            this.add(o, "setProperty", l, f, r, n, 0, 0, d),
                            s.push(d),
                            T.push(d, 0, o[d]);
                    else if (c !== "undefined") {
                        if (a && d in a ? (l = typeof a[d] == "function" ? a[d].call(e, r, t, n) : a[d],
                            Mt(l) && ~l.indexOf("random(") && (l = kr(l)),
                            qt(l + "") || (l += _e.units[d] || qt(ni(t, d)) || ""),
                            (l + "").charAt(1) === "=" && (l = ni(t, d))) : l = ni(t, d),
                            h = parseFloat(l),
                            x = c === "string" && f.charAt(1) === "=" && f.substr(0, 2),
                            x && (f = f.substr(2)),
                            p = parseFloat(f),
                            d in qe && (d === "autoAlpha" && (h === 1 && ni(t, "visibility") === "hidden" && p && (h = 0),
                                T.push("visibility", 0, o.visibility),
                                gi(this, o, "visibility", h ? "inherit" : "hidden", p ? "inherit" : "hidden", !p)),
                                d !== "scale" && d !== "transform" && (d = qe[d],
                                    ~d.indexOf(",") && (d = d.split(",")[0]))),
                            F = d in ri,
                            F) {
                            if (this.styles.save(d),
                                m || (E = t._gsap,
                                    E.renderTransform && !i.parseTransform || zr(t, i.parseTransform),
                                    S = i.smoothOrigin !== !1 && E.smooth,
                                    m = this._pt = new ce(this._pt, o, ct, 0, 1, E.renderTransform, E, 0, -1),
                                    m.dep = 1),
                                d === "scale")
                                this._pt = new ce(this._pt, E, "scaleY", E.scaleY, (x ? ir(E.scaleY, x + p) : p) - E.scaleY || 0, ks),
                                    this._pt.u = 0,
                                    s.push("scaleY", d),
                                    d += "X";
                            else if (d === "transformOrigin") {
                                T.push(Le, 0, o[Le]),
                                    f = Xl(f),
                                    E.svg ? Rs(t, f, 0, S, 0, this) : (C = parseFloat(f.split(" ")[2]) || 0,
                                        C !== E.zOrigin && gi(this, E, "zOrigin", E.zOrigin, C),
                                        gi(this, o, d, yn(l), yn(f)));
                                continue
                            } else if (d === "svgOrigin") {
                                Rs(t, f, 1, S, 0, this);
                                continue
                            } else if (d in Cu) {
                                Hl(this, E, d, h, x ? ir(h, x + f) : f);
                                continue
                            } else if (d === "smoothOrigin") {
                                gi(this, E, "smooth", E.smooth, f);
                                continue
                            } else if (d === "force3D") {
                                E[d] = f;
                                continue
                            } else if (d === "transform") {
                                $l(this, f, t);
                                continue
                            }
                        } else
                            d in o || (d = fr(d) || d);
                        if (F || (p || p === 0) && (h || h === 0) && !Tl.test(f) && d in o)
                            g = (l + "").substr((h + "").length),
                                p || (p = 0),
                                C = qt(f) || (d in _e.units ? _e.units[d] : g),
                                g !== C && (h = mi(t, d, l, C)),
                                this._pt = new ce(this._pt, F ? E : o, d, h, (x ? ir(h, x + p) : p) - h, !F && (C === "px" || d === "zIndex") && i.autoRound !== !1 ? Al : ks),
                                this._pt.u = C || 0,
                                g !== C && C !== "%" && (this._pt.b = l,
                                    this._pt.r = kl);
                        else if (d in o)
                            Yl.call(this, t, d, l, x ? x + f : f);
                        else if (d in t)
                            this.add(t, d, l || t[d], x ? x + f : f, r, n);
                        else if (d !== "parseTransform") {
                            rs(d, f);
                            continue
                        }
                        F || (d in o ? T.push(d, 0, o[d]) : T.push(d, 1, l || t[d])),
                            s.push(d)
                    }
                }
            y && nu(this)
        },
        render: function (t, i) {
            if (i.tween._time || !Ts())
                for (var e = i._pt; e;)
                    e.r(t, e.d),
                        e = e._next;
            else
                i.styles.revert()
        },
        get: ni,
        aliases: qe,
        getSetter: function (t, i, e) {
            var r = qe[i];
            return r && r.indexOf(",") < 0 && (i = r),
                i in ri && i !== Le && (t._gsap.x || ni(t, "x")) ? e && au === e ? i === "scale" ? Rl : Ml : (au = e || {}) && (i === "scale" ? Bl : Ll) : t.style && !Zn(t.style[i]) ? Pl : ~i.indexOf("-") ? Ol : Cs(t, i)
        },
        core: {
            _removeProperty: Br,
            _getMatrix: Ms
        }
    };
    he.utils.checkPrefix = fr,
        he.core.getStyleSaver = du,
        function (u, t, i, e) {
            var r = le(u + "," + t + "," + i, function (n) {
                ri[n] = 1
            });
            le(t, function (n) {
                _e.units[n] = "deg",
                    Cu[n] = 1
            }),
                qe[r[13]] = u + "," + t,
                le(e, function (n) {
                    var s = n.split(":");
                    qe[s[1]] = r[s[0]]
                })
        }("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),
        le("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (u) {
            _e.units[u] = "px"
        }),
        he.registerPlugin(bu);
    var Nt = he.registerPlugin(bu) || he;
    Nt.core.Tween;
    function Tu(u, t) {
        for (var i = 0; i < t.length; i++) {
            var e = t[i];
            e.enumerable = e.enumerable || !1,
                e.configurable = !0,
                "value" in e && (e.writable = !0),
                Object.defineProperty(u, e.key, e)
        }
    }
    function ql(u, t, i) {
        return t && Tu(u.prototype, t),
            i && Tu(u, i),
            u
    }
    /*!
 * Observer 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var It, Ls, ye, yi, vi, cr, Su, Li, Ir, ku, si, ze, Au, Pu = function () {
        return It || typeof window != "undefined" && (It = window.gsap) && It.registerPlugin && It
    }, Ou = 1, hr = [], H = [], je = [], Yr = Date.now, zs = function (t, i) {
        return i
    }, Gl = function () {
        var t = Ir.core
            , i = t.bridge || {}
            , e = t._scrollers
            , r = t._proxies;
        e.push.apply(e, H),
            r.push.apply(r, je),
            H = e,
            je = r,
            zs = function (s, o) {
                return i[s](o)
            }
    }, Ci = function (t, i) {
        return ~je.indexOf(t) && je[je.indexOf(t) + 1][i]
    }, Xr = function (t) {
        return !!~ku.indexOf(t)
    }, Qt = function (t, i, e, r, n) {
        return t.addEventListener(i, e, {
            passive: !r,
            capture: !!n
        })
    }, Jt = function (t, i, e, r) {
        return t.removeEventListener(i, e, !!r)
    }, vn = "scrollLeft", Cn = "scrollTop", Ns = function () {
        return si && si.isPressed || H.cache++
    }, xn = function (t, i) {
        var e = function r(n) {
            if (n || n === 0) {
                Ou && (ye.history.scrollRestoration = "manual");
                var s = si && si.isPressed;
                n = r.v = Math.round(n) || (si && si.iOS ? 1 : 0),
                    t(n),
                    r.cacheID = H.cache,
                    s && zs("ss", n)
            } else
                (i || H.cache !== r.cacheID || zs("ref")) && (r.cacheID = H.cache,
                    r.v = t());
            return r.v + r.offset
        };
        return e.offset = 0,
            t && e
    }, te = {
        s: vn,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: xn(function (u) {
            return arguments.length ? ye.scrollTo(u, Pt.sc()) : ye.pageXOffset || yi[vn] || vi[vn] || cr[vn] || 0
        })
    }, Pt = {
        s: Cn,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: te,
        sc: xn(function (u) {
            return arguments.length ? ye.scrollTo(te.sc(), u) : ye.pageYOffset || yi[Cn] || vi[Cn] || cr[Cn] || 0
        })
    }, de = function (t, i) {
        return (i && i._ctx && i._ctx.selector || It.utils.toArray)(t)[0] || (typeof t == "string" && It.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null)
    }, xi = function (t, i) {
        var e = i.s
            , r = i.sc;
        Xr(t) && (t = yi.scrollingElement || vi);
        var n = H.indexOf(t)
            , s = r === Pt.sc ? 1 : 2;
        !~n && (n = H.push(t) - 1),
            H[n + s] || Qt(t, "scroll", Ns);
        var o = H[n + s]
            , a = o || (H[n + s] = xn(Ci(t, e), !0) || (Xr(t) ? r : xn(function (l) {
                return arguments.length ? t[e] = l : t[e]
            })));
        return a.target = t,
            o || (a.smooth = It.getProperty(t, "scrollBehavior") === "smooth"),
            a
    }, Is = function (t, i, e) {
        var r = t
            , n = t
            , s = Yr()
            , o = s
            , a = i || 50
            , l = Math.max(500, a * 3)
            , f = function (_, d) {
                var g = Yr();
                d || g - s > a ? (n = r,
                    r = _,
                    o = s,
                    s = g) : e ? r += _ : r = n + (_ - n) / (g - o) * (s - o)
            }
            , p = function () {
                n = r = e ? 0 : r,
                    o = s = 0
            }
            , h = function (_) {
                var d = o
                    , g = n
                    , C = Yr();
                return (_ || _ === 0) && _ !== r && f(_),
                    s === o || C - o > l ? 0 : (r + (e ? g : -g)) / ((e ? C : s) - d) * 1e3
            };
        return {
            update: f,
            reset: p,
            getVelocity: h
        }
    }, Wr = function (t, i) {
        return i && !t._gsapAllow && t.preventDefault(),
            t.changedTouches ? t.changedTouches[0] : t
    }, Mu = function (t) {
        var i = Math.max.apply(Math, t)
            , e = Math.min.apply(Math, t);
        return Math.abs(i) >= Math.abs(e) ? i : e
    }, Ru = function () {
        Ir = It.core.globals().ScrollTrigger,
            Ir && Ir.core && Gl()
    }, Bu = function (t) {
        return It = t || Pu(),
            It && typeof document != "undefined" && document.body && (ye = window,
                yi = document,
                vi = yi.documentElement,
                cr = yi.body,
                ku = [ye, yi, vi, cr],
                It.utils.clamp,
                Au = It.core.context || function () { }
                ,
                Li = "onpointerenter" in cr ? "pointer" : "mouse",
                Su = Tt.isTouch = ye.matchMedia && ye.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in ye || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
                ze = Tt.eventTypes = ("ontouchstart" in vi ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in vi ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
                setTimeout(function () {
                    return Ou = 0
                }, 500),
                Ru(),
                Ls = 1),
            Ls
    };
    te.op = Pt,
        H.cache = 0;
    var Tt = function () {
        function u(i) {
            this.init(i)
        }
        var t = u.prototype;
        return t.init = function (e) {
            Ls || Bu(It) || console.warn("Please gsap.registerPlugin(Observer)"),
                Ir || Ru();
            var r = e.tolerance
                , n = e.dragMinimum
                , s = e.type
                , o = e.target
                , a = e.lineHeight
                , l = e.debounce
                , f = e.preventDefault
                , p = e.onStop
                , h = e.onStopDelay
                , c = e.ignore
                , _ = e.wheelSpeed
                , d = e.event
                , g = e.onDragStart
                , C = e.onDragEnd
                , x = e.onDrag
                , F = e.onPress
                , m = e.onRelease
                , E = e.onRight
                , S = e.onLeft
                , y = e.onUp
                , T = e.onDown
                , b = e.onChangeX
                , k = e.onChangeY
                , B = e.onChange
                , A = e.onToggleX
                , $ = e.onToggleY
                , I = e.onHover
                , Y = e.onHoverEnd
                , M = e.onMove
                , P = e.ignoreCheck
                , z = e.isNormalizer
                , w = e.onGestureStart
                , D = e.onGestureEnd
                , U = e.onWheel
                , ut = e.onEnable
                , Xt = e.onDisable
                , Z = e.onClick
                , W = e.scrollSpeed
                , xt = e.capture
                , J = e.allowClicks
                , dt = e.lockAxis
                , mt = e.onLockAxis;
            this.target = o = de(o) || vi,
                this.vars = e,
                c && (c = It.utils.toArray(c)),
                r = r || 1e-9,
                n = n || 0,
                _ = _ || 1,
                W = W || 1,
                s = s || "wheel,touch,pointer",
                l = l !== !1,
                a || (a = parseFloat(ye.getComputedStyle(cr).lineHeight) || 22);
            var se, yt, jt, Q, lt, kt, oe, v = this, Ft = 0, Be = 0, Hi = xi(o, te), At = xi(o, Pt), $i = Hi(), qi = At(), tn = ~s.indexOf("touch") && !~s.indexOf("pointer") && ze[0] === "pointerdown", Wt = Xr(o), Et = o.ownerDocument || yi, Ie = [0, 0, 0], Ye = [0, 0, 0], Gi = 0, li = function () {
                return Gi = Yr()
            }, Qe = function (L, rt) {
                return (v.event = L) && c && ~c.indexOf(L.target) || rt && tn && L.pointerType !== "touch" || P && P(L, rt)
            }, pe = function () {
                v._vx.reset(),
                    v._vy.reset(),
                    yt.pause(),
                    p && p(v)
            }, ji = function () {
                var L = v.deltaX = Mu(Ie)
                    , rt = v.deltaY = Mu(Ye)
                    , vt = Math.abs(L) >= r
                    , R = Math.abs(rt) >= r;
                B && (vt || R) && B(v, L, rt, Ie, Ye),
                    vt && (E && v.deltaX > 0 && E(v),
                        S && v.deltaX < 0 && S(v),
                        b && b(v),
                        A && v.deltaX < 0 != Ft < 0 && A(v),
                        Ft = v.deltaX,
                        Ie[0] = Ie[1] = Ie[2] = 0),
                    R && (T && v.deltaY > 0 && T(v),
                        y && v.deltaY < 0 && y(v),
                        k && k(v),
                        $ && v.deltaY < 0 != Be < 0 && $(v),
                        Be = v.deltaY,
                        Ye[0] = Ye[1] = Ye[2] = 0),
                    (Q || jt) && (M && M(v),
                        jt && (x(v),
                            jt = !1),
                        Q = !1),
                    kt && !(kt = !1) && mt && mt(v),
                    lt && (U(v),
                        lt = !1),
                    se = 0
            }, xr = function (L, rt, vt) {
                Ie[vt] += L,
                    Ye[vt] += rt,
                    v._vx.update(L),
                    v._vy.update(rt),
                    l ? se || (se = requestAnimationFrame(ji)) : ji()
            }, Fr = function (L, rt) {
                dt && !oe && (v.axis = oe = Math.abs(L) > Math.abs(rt) ? "x" : "y",
                    kt = !0),
                    oe !== "y" && (Ie[2] += L,
                        v._vx.update(L, !0)),
                    oe !== "x" && (Ye[2] += rt,
                        v._vy.update(rt, !0)),
                    l ? se || (se = requestAnimationFrame(ji)) : ji()
            }, Ki = function (L) {
                if (!Qe(L, 1)) {
                    L = Wr(L, f);
                    var rt = L.clientX
                        , vt = L.clientY
                        , R = rt - v.x
                        , tt = vt - v.y
                        , N = v.isDragging;
                    v.x = rt,
                        v.y = vt,
                        (N || Math.abs(v.startX - rt) >= n || Math.abs(v.startY - vt) >= n) && (x && (jt = !0),
                            N || (v.isDragging = !0),
                            Fr(R, tt),
                            N || g && g(v))
                }
            }, Ei = v.onPress = function (X) {
                Qe(X, 1) || X && X.button || (v.axis = oe = null,
                    yt.pause(),
                    v.isPressed = !0,
                    X = Wr(X),
                    Ft = Be = 0,
                    v.startX = v.x = X.clientX,
                    v.startY = v.y = X.clientY,
                    v._vx.reset(),
                    v._vy.reset(),
                    Qt(z ? o : Et, ze[1], Ki, f, !0),
                    v.deltaX = v.deltaY = 0,
                    F && F(v))
            }
                , wi = v.onRelease = function (X) {
                    if (!Qe(X, 1)) {
                        Jt(z ? o : Et, ze[1], Ki, !0);
                        var L = !isNaN(v.y - v.startY)
                            , rt = v.isDragging && (Math.abs(v.x - v.startX) > 3 || Math.abs(v.y - v.startY) > 3)
                            , vt = Wr(X);
                        !rt && L && (v._vx.reset(),
                            v._vy.reset(),
                            f && J && It.delayedCall(.08, function () {
                                if (Yr() - Gi > 300 && !X.defaultPrevented) {
                                    if (X.target.click)
                                        X.target.click();
                                    else if (Et.createEvent) {
                                        var R = Et.createEvent("MouseEvents");
                                        R.initMouseEvent("click", !0, !0, ye, 1, vt.screenX, vt.screenY, vt.clientX, vt.clientY, !1, !1, !1, !1, 0, null),
                                            X.target.dispatchEvent(R)
                                    }
                                }
                            })),
                            v.isDragging = v.isGesturing = v.isPressed = !1,
                            p && !z && yt.restart(!0),
                            C && rt && C(v),
                            m && m(v, rt)
                    }
                }
                , et = function (L) {
                    return L.touches && L.touches.length > 1 && (v.isGesturing = !0) && w(L, v.isDragging)
                }, Zi = function () {
                    return (v.isGesturing = !1) || D(v)
                }, Xe = function (L) {
                    if (!Qe(L)) {
                        var rt = Hi()
                            , vt = At();
                        xr((rt - $i) * W, (vt - qi) * W, 1),
                            $i = rt,
                            qi = vt,
                            p && yt.restart(!0)
                    }
                }, We = function (L) {
                    if (!Qe(L)) {
                        L = Wr(L, f),
                            U && (lt = !0);
                        var rt = (L.deltaMode === 1 ? a : L.deltaMode === 2 ? ye.innerHeight : 1) * _;
                        xr(L.deltaX * rt, L.deltaY * rt, 0),
                            p && !z && yt.restart(!0)
                    }
                }, Ve = function (L) {
                    if (!Qe(L)) {
                        var rt = L.clientX
                            , vt = L.clientY
                            , R = rt - v.x
                            , tt = vt - v.y;
                        v.x = rt,
                            v.y = vt,
                            Q = !0,
                            (R || tt) && Fr(R, tt)
                    }
                }, Qi = function (L) {
                    v.event = L,
                        I(v)
                }, Er = function (L) {
                    v.event = L,
                        Y(v)
                }, fi = function (L) {
                    return Qe(L) || Wr(L, f) && Z(v)
                };
            yt = v._dc = It.delayedCall(h || .25, pe).pause(),
                v.deltaX = v.deltaY = 0,
                v._vx = Is(0, 50, !0),
                v._vy = Is(0, 50, !0),
                v.scrollX = Hi,
                v.scrollY = At,
                v.isDragging = v.isGesturing = v.isPressed = !1,
                Au(this),
                v.enable = function (X) {
                    return v.isEnabled || (Qt(Wt ? Et : o, "scroll", Ns),
                        s.indexOf("scroll") >= 0 && Qt(Wt ? Et : o, "scroll", Xe, f, xt),
                        s.indexOf("wheel") >= 0 && Qt(o, "wheel", We, f, xt),
                        (s.indexOf("touch") >= 0 && Su || s.indexOf("pointer") >= 0) && (Qt(o, ze[0], Ei, f, xt),
                            Qt(Et, ze[2], wi),
                            Qt(Et, ze[3], wi),
                            J && Qt(o, "click", li, !1, !0),
                            Z && Qt(o, "click", fi),
                            w && Qt(Et, "gesturestart", et),
                            D && Qt(Et, "gestureend", Zi),
                            I && Qt(o, Li + "enter", Qi),
                            Y && Qt(o, Li + "leave", Er),
                            M && Qt(o, Li + "move", Ve)),
                        v.isEnabled = !0,
                        X && X.type && Ei(X),
                        ut && ut(v)),
                        v
                }
                ,
                v.disable = function () {
                    v.isEnabled && (hr.filter(function (X) {
                        return X !== v && Xr(X.target)
                    }).length || Jt(Wt ? Et : o, "scroll", Ns),
                        v.isPressed && (v._vx.reset(),
                            v._vy.reset(),
                            Jt(z ? o : Et, ze[1], Ki, !0)),
                        Jt(Wt ? Et : o, "scroll", Xe, xt),
                        Jt(o, "wheel", We, xt),
                        Jt(o, ze[0], Ei, xt),
                        Jt(Et, ze[2], wi),
                        Jt(Et, ze[3], wi),
                        Jt(o, "click", li, !0),
                        Jt(o, "click", fi),
                        Jt(Et, "gesturestart", et),
                        Jt(Et, "gestureend", Zi),
                        Jt(o, Li + "enter", Qi),
                        Jt(o, Li + "leave", Er),
                        Jt(o, Li + "move", Ve),
                        v.isEnabled = v.isPressed = v.isDragging = !1,
                        Xt && Xt(v))
                }
                ,
                v.kill = v.revert = function () {
                    v.disable();
                    var X = hr.indexOf(v);
                    X >= 0 && hr.splice(X, 1),
                        si === v && (si = 0)
                }
                ,
                hr.push(v),
                z && Xr(o) && (si = v),
                v.enable(d)
        }
            ,
            ql(u, [{
                key: "velocityX",
                get: function () {
                    return this._vx.getVelocity()
                }
            }, {
                key: "velocityY",
                get: function () {
                    return this._vy.getVelocity()
                }
            }]),
            u
    }();
    Tt.version = "3.12.2",
        Tt.create = function (u) {
            return new Tt(u)
        }
        ,
        Tt.register = Bu,
        Tt.getAll = function () {
            return hr.slice()
        }
        ,
        Tt.getById = function (u) {
            return hr.filter(function (t) {
                return t.vars.id === u
            })[0]
        }
        ,
        Pu() && It.registerPlugin(Tt);
    /*!
 * ScrollTrigger 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var O, dr, K, ht, Ne, at, Lu, Fn, En, pr, wn, bn, Gt, Tn, Ys, ee, zu, Nu, _r, Iu, Xs, Yu, ve, Xu, Wu, Vu, Fi, Ws, Vs, Dr, Us, Hs, Sn = 1, ie = Date.now, $s = ie(), Oe = 0, Vr = 0, Uu = function (t, i, e) {
        var r = Ce(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
        return e["_" + i + "Clamp"] = r,
            r ? t.substr(6, t.length - 7) : t
    }, Hu = function (t, i) {
        return i && (!Ce(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t
    }, jl = function u() {
        return Vr && requestAnimationFrame(u)
    }, $u = function () {
        return Tn = 1
    }, qu = function () {
        return Tn = 0
    }, Ke = function (t) {
        return t
    }, Ur = function (t) {
        return Math.round(t * 1e5) / 1e5 || 0
    }, Gu = function () {
        return typeof window != "undefined"
    }, ju = function () {
        return O || Gu() && (O = window.gsap) && O.registerPlugin && O
    }, zi = function (t) {
        return !!~Lu.indexOf(t)
    }, Ku = function (t) {
        return (t === "Height" ? Us : K["inner" + t]) || Ne["client" + t] || at["client" + t]
    }, Zu = function (t) {
        return Ci(t, "getBoundingClientRect") || (zi(t) ? function () {
            return Xn.width = K.innerWidth,
                Xn.height = Us,
                Xn
        }
            : function () {
                return ui(t)
            }
        )
    }, Kl = function (t, i, e) {
        var r = e.d
            , n = e.d2
            , s = e.a;
        return (s = Ci(t, "getBoundingClientRect")) ? function () {
            return s()[r]
        }
            : function () {
                return (i ? Ku(n) : t["client" + n]) || 0
            }
    }, Zl = function (t, i) {
        return !i || ~je.indexOf(t) ? Zu(t) : function () {
            return Xn
        }
    }, oi = function (t, i) {
        var e = i.s
            , r = i.d2
            , n = i.d
            , s = i.a;
        return Math.max(0, (e = "scroll" + r) && (s = Ci(t, e)) ? s() - Zu(t)()[n] : zi(t) ? (Ne[e] || at[e]) - Ku(r) : t[e] - t["offset" + r])
    }, kn = function (t, i) {
        for (var e = 0; e < _r.length; e += 3)
            (!i || ~i.indexOf(_r[e + 1])) && t(_r[e], _r[e + 1], _r[e + 2])
    }, Ce = function (t) {
        return typeof t == "string"
    }, re = function (t) {
        return typeof t == "function"
    }, An = function (t) {
        return typeof t == "number"
    }, Ni = function (t) {
        return typeof t == "object"
    }, Hr = function (t, i, e) {
        return t && t.progress(i ? 0 : 1) && e && t.pause()
    }, qs = function (t, i) {
        if (t.enabled) {
            var e = i(t);
            e && e.totalTime && (t.callbackAnimation = e)
        }
    }, gr = Math.abs, Qu = "left", Ju = "top", Gs = "right", js = "bottom", Ii = "width", Yi = "height", $r = "Right", qr = "Left", Gr = "Top", jr = "Bottom", St = "padding", Me = "margin", mr = "Width", Ks = "Height", Yt = "px", Re = function (t) {
        return K.getComputedStyle(t)
    }, Ql = function (t) {
        var i = Re(t).position;
        t.style.position = i === "absolute" || i === "fixed" ? i : "relative"
    }, ta = function (t, i) {
        for (var e in i)
            e in t || (t[e] = i[e]);
        return t
    }, ui = function (t, i) {
        var e = i && Re(t)[Ys] !== "matrix(1, 0, 0, 1, 0, 0)" && O.to(t, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0
        }).progress(1)
            , r = t.getBoundingClientRect();
        return e && e.progress(0).kill(),
            r
    }, Zs = function (t, i) {
        var e = i.d2;
        return t["offset" + e] || t["client" + e] || 0
    }, ea = function (t) {
        var i = [], e = t.labels, r = t.duration(), n;
        for (n in e)
            i.push(e[n] / r);
        return i
    }, Jl = function (t) {
        return function (i) {
            return O.utils.snap(ea(t), i)
        }
    }, Qs = function (t) {
        var i = O.utils.snap(t)
            , e = Array.isArray(t) && t.slice(0).sort(function (r, n) {
                return r - n
            });
        return e ? function (r, n, s) {
            s === void 0 && (s = .001);
            var o;
            if (!n)
                return i(r);
            if (n > 0) {
                for (r -= s,
                    o = 0; o < e.length; o++)
                    if (e[o] >= r)
                        return e[o];
                return e[o - 1]
            } else
                for (o = e.length,
                    r += s; o--;)
                    if (e[o] <= r)
                        return e[o];
            return e[0]
        }
            : function (r, n, s) {
                s === void 0 && (s = .001);
                var o = i(r);
                return !n || Math.abs(o - r) < s || o - r < 0 == n < 0 ? o : i(n < 0 ? r - t : r + t)
            }
    }, tf = function (t) {
        return function (i, e) {
            return Qs(ea(t))(i, e.direction)
        }
    }, Pn = function (t, i, e, r) {
        return e.split(",").forEach(function (n) {
            return t(i, n, r)
        })
    }, Rt = function (t, i, e, r, n) {
        return t.addEventListener(i, e, {
            passive: !r,
            capture: !!n
        })
    }, Bt = function (t, i, e, r) {
        return t.removeEventListener(i, e, !!r)
    }, On = function (t, i, e) {
        e = e && e.wheelHandler,
            e && (t(i, "wheel", e),
                t(i, "touchmove", e))
    }, ia = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal"
    }, Mn = {
        toggleActions: "play",
        anticipatePin: 0
    }, Rn = {
        top: 0,
        left: 0,
        center: .5,
        bottom: 1,
        right: 1
    }, Bn = function (t, i) {
        if (Ce(t)) {
            var e = t.indexOf("=")
                , r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
            ~e && (t.indexOf("%") > e && (r *= i / 100),
                t = t.substr(0, e - 1)),
                t = r + (t in Rn ? Rn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0)
        }
        return t
    }, Ln = function (t, i, e, r, n, s, o, a) {
        var l = n.startColor
            , f = n.endColor
            , p = n.fontSize
            , h = n.indent
            , c = n.fontWeight
            , _ = ht.createElement("div")
            , d = zi(e) || Ci(e, "pinType") === "fixed"
            , g = t.indexOf("scroller") !== -1
            , C = d ? at : e
            , x = t.indexOf("start") !== -1
            , F = x ? l : f
            , m = "border-color:" + F + ";font-size:" + p + ";color:" + F + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return m += "position:" + ((g || a) && d ? "fixed;" : "absolute;"),
            (g || a || !d) && (m += (r === Pt ? Gs : js) + ":" + (s + parseFloat(h)) + "px;"),
            o && (m += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"),
            _._isStart = x,
            _.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")),
            _.style.cssText = m,
            _.innerText = i || i === 0 ? t + "-" + i : t,
            C.children[0] ? C.insertBefore(_, C.children[0]) : C.appendChild(_),
            _._offset = _["offset" + r.op.d2],
            zn(_, 0, r, x),
            _
    }, zn = function (t, i, e, r) {
        var n = {
            display: "block"
        }
            , s = e[r ? "os2" : "p2"]
            , o = e[r ? "p2" : "os2"];
        t._isFlipped = r,
            n[e.a + "Percent"] = r ? -100 : 0,
            n[e.a] = r ? "1px" : 0,
            n["border" + s + mr] = 1,
            n["border" + o + mr] = 0,
            n[e.p] = i + "px",
            O.set(t, n)
    }, V = [], Js = {}, Kr, ra = function () {
        return ie() - Oe > 34 && (Kr || (Kr = requestAnimationFrame(ai)))
    }, yr = function () {
        (!ve || !ve.isPressed || ve.startX > at.clientWidth) && (H.cache++,
            ve ? Kr || (Kr = requestAnimationFrame(ai)) : ai(),
            Oe || Wi("scrollStart"),
            Oe = ie())
    }, to = function () {
        Vu = K.innerWidth,
            Wu = K.innerHeight
    }, Zr = function () {
        H.cache++,
            !Gt && !Yu && !ht.fullscreenElement && !ht.webkitFullscreenElement && (!Xu || Vu !== K.innerWidth || Math.abs(K.innerHeight - Wu) > K.innerHeight * .25) && Fn.restart(!0)
    }, Xi = {}, ef = [], na = function u() {
        return Bt(G, "scrollEnd", u) || Ui(!0)
    }, Wi = function (t) {
        return Xi[t] && Xi[t].map(function (i) {
            return i()
        }) || ef
    }, xe = [], sa = function (t) {
        for (var i = 0; i < xe.length; i += 5)
            (!t || xe[i + 4] && xe[i + 4].query === t) && (xe[i].style.cssText = xe[i + 1],
                xe[i].getBBox && xe[i].setAttribute("transform", xe[i + 2] || ""),
                xe[i + 3].uncache = 1)
    }, eo = function (t, i) {
        var e;
        for (ee = 0; ee < V.length; ee++)
            e = V[ee],
                e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(!0, !0));
        i && sa(i),
            i || Wi("revert")
    }, oa = function (t, i) {
        H.cache++,
            (i || !ne) && H.forEach(function (e) {
                return re(e) && e.cacheID++ && (e.rec = 0)
            }),
            Ce(t) && (K.history.scrollRestoration = Vs = t)
    }, ne, Vi = 0, ua, rf = function () {
        if (ua !== Vi) {
            var t = ua = Vi;
            requestAnimationFrame(function () {
                return t === Vi && Ui(!0)
            })
        }
    }, aa = function () {
        at.appendChild(Dr),
            Us = Dr.offsetHeight || K.innerHeight,
            at.removeChild(Dr)
    }, Ui = function (t, i) {
        if (Oe && !t) {
            Rt(G, "scrollEnd", na);
            return
        }
        aa(),
            ne = G.isRefreshing = !0,
            H.forEach(function (r) {
                return re(r) && ++r.cacheID && (r.rec = r())
            });
        var e = Wi("refreshInit");
        Iu && G.sort(),
            i || eo(),
            H.forEach(function (r) {
                re(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"),
                    r(0))
            }),
            V.slice(0).forEach(function (r) {
                return r.refresh()
            }),
            V.forEach(function (r, n) {
                if (r._subPinOffset && r.pin) {
                    var s = r.vars.horizontal ? "offsetWidth" : "offsetHeight"
                        , o = r.pin[s];
                    r.revert(!0, 1),
                        r.adjustPinSpacing(r.pin[s] - o),
                        r.refresh()
                }
            }),
            V.forEach(function (r) {
                var n = oi(r.scroller, r._dir);
                (r.vars.end === "max" || r._endClamp && r.end > n) && r.setPositions(r.start, Math.max(r.start + 1, n), !0)
            }),
            e.forEach(function (r) {
                return r && r.render && r.render(-1)
            }),
            H.forEach(function (r) {
                re(r) && (r.smooth && requestAnimationFrame(function () {
                    return r.target.style.scrollBehavior = "smooth"
                }),
                    r.rec && r(r.rec))
            }),
            oa(Vs, 1),
            Fn.pause(),
            Vi++,
            ne = 2,
            ai(2),
            V.forEach(function (r) {
                return re(r.vars.onRefresh) && r.vars.onRefresh(r)
            }),
            ne = G.isRefreshing = !1,
            Wi("refresh")
    }, io = 0, Nn = 1, Qr, ai = function (t) {
        if (!ne || t === 2) {
            G.isUpdating = !0,
                Qr && Qr.update(0);
            var i = V.length
                , e = ie()
                , r = e - $s >= 50
                , n = i && V[0].scroll();
            if (Nn = io > n ? -1 : 1,
                ne || (io = n),
                r && (Oe && !Tn && e - Oe > 200 && (Oe = 0,
                    Wi("scrollEnd")),
                    wn = $s,
                    $s = e),
                Nn < 0) {
                for (ee = i; ee-- > 0;)
                    V[ee] && V[ee].update(0, r);
                Nn = 1
            } else
                for (ee = 0; ee < i; ee++)
                    V[ee] && V[ee].update(0, r);
            G.isUpdating = !1
        }
        Kr = 0
    }, ro = [Qu, Ju, js, Gs, Me + jr, Me + $r, Me + Gr, Me + qr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], In = ro.concat([Ii, Yi, "boxSizing", "max" + mr, "max" + Ks, "position", Me, St, St + Gr, St + $r, St + jr, St + qr]), nf = function (t, i, e) {
        vr(e);
        var r = t._gsap;
        if (r.spacerIsNative)
            vr(r.spacerState);
        else if (t._gsap.swappedIn) {
            var n = i.parentNode;
            n && (n.insertBefore(t, i),
                n.removeChild(i))
        }
        t._gsap.swappedIn = !1
    }, no = function (t, i, e, r) {
        if (!t._gsap.swappedIn) {
            for (var n = ro.length, s = i.style, o = t.style, a; n--;)
                a = ro[n],
                    s[a] = e[a];
            s.position = e.position === "absolute" ? "absolute" : "relative",
                e.display === "inline" && (s.display = "inline-block"),
                o[js] = o[Gs] = "auto",
                s.flexBasis = e.flexBasis || "auto",
                s.overflow = "visible",
                s.boxSizing = "border-box",
                s[Ii] = Zs(t, te) + Yt,
                s[Yi] = Zs(t, Pt) + Yt,
                s[St] = o[Me] = o[Ju] = o[Qu] = "0",
                vr(r),
                o[Ii] = o["max" + mr] = e[Ii],
                o[Yi] = o["max" + Ks] = e[Yi],
                o[St] = e[St],
                t.parentNode !== i && (t.parentNode.insertBefore(i, t),
                    i.appendChild(t)),
                t._gsap.swappedIn = !0
        }
    }, sf = /([A-Z])/g, vr = function (t) {
        if (t) {
            var i = t.t.style, e = t.length, r = 0, n, s;
            for ((t.t._gsap || O.core.getCache(t.t)).uncache = 1; r < e; r += 2)
                s = t[r + 1],
                    n = t[r],
                    s ? i[n] = s : i[n] && i.removeProperty(n.replace(sf, "-$1").toLowerCase())
        }
    }, Yn = function (t) {
        for (var i = In.length, e = t.style, r = [], n = 0; n < i; n++)
            r.push(In[n], e[In[n]]);
        return r.t = t,
            r
    }, of = function (t, i, e) {
        for (var r = [], n = t.length, s = e ? 8 : 0, o; s < n; s += 2)
            o = t[s],
                r.push(o, o in i ? i[o] : t[s + 1]);
        return r.t = t.t,
            r
    }, Xn = {
        left: 0,
        top: 0
    }, la = function (t, i, e, r, n, s, o, a, l, f, p, h, c, _) {
        re(t) && (t = t(a)),
            Ce(t) && t.substr(0, 3) === "max" && (t = h + (t.charAt(4) === "=" ? Bn("0" + t.substr(3), e) : 0));
        var d = c ? c.time() : 0, g, C, x;
        if (c && c.seek(0),
            isNaN(t) || (t = +t),
            An(t))
            c && (t = O.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, h, t)),
                o && zn(o, e, r, !0);
        else {
            re(i) && (i = i(a));
            var F = (t || "0").split(" "), m, E, S, y;
            x = de(i, a) || at,
                m = ui(x) || {},
                (!m || !m.left && !m.top) && Re(x).display === "none" && (y = x.style.display,
                    x.style.display = "block",
                    m = ui(x),
                    y ? x.style.display = y : x.style.removeProperty("display")),
                E = Bn(F[0], m[r.d]),
                S = Bn(F[1] || "0", e),
                t = m[r.p] - l[r.p] - f + E + n - S,
                o && zn(o, S, r, e - S < 20 || o._isStart && S > 20),
                e -= e - S
        }
        if (_ && (a[_] = t || -.001,
            t < 0 && (t = 0)),
            s) {
            var T = t + e
                , b = s._isStart;
            g = "scroll" + r.d2,
                zn(s, T, r, b && T > 20 || !b && (p ? Math.max(at[g], Ne[g]) : s.parentNode[g]) <= T + 1),
                p && (l = ui(o),
                    p && (s.style[r.op.p] = l[r.op.p] - r.op.m - s._offset + Yt))
        }
        return c && x && (g = ui(x),
            c.seek(h),
            C = ui(x),
            c._caScrollDist = g[r.p] - C[r.p],
            t = t / c._caScrollDist * h),
            c && c.seek(d),
            c ? t : Math.round(t)
    }, uf = /(webkit|moz|length|cssText|inset)/i, fa = function (t, i, e, r) {
        if (t.parentNode !== i) {
            var n = t.style, s, o;
            if (i === at) {
                t._stOrig = n.cssText,
                    o = Re(t);
                for (s in o)
                    !+s && !uf.test(s) && o[s] && typeof n[s] == "string" && s !== "0" && (n[s] = o[s]);
                n.top = e,
                    n.left = r
            } else
                n.cssText = t._stOrig;
            O.core.getCache(t).uncache = 1,
                i.appendChild(t)
        }
    }, ca = function (t, i, e) {
        var r = i
            , n = r;
        return function (s) {
            var o = Math.round(t());
            return o !== r && o !== n && Math.abs(o - r) > 3 && Math.abs(o - n) > 3 && (s = o,
                e && e()),
                n = r,
                r = s,
                s
        }
    }, Wn = function (t, i, e) {
        var r = {};
        r[i.p] = "+=" + e,
            O.set(t, r)
    }, ha = function (t, i) {
        var e = xi(t, i)
            , r = "_scroll" + i.p2
            , n = function s(o, a, l, f, p) {
                var h = s.tween
                    , c = a.onComplete
                    , _ = {};
                l = l || e();
                var d = ca(e, l, function () {
                    h.kill(),
                        s.tween = 0
                });
                return p = f && p || 0,
                    f = f || o - l,
                    h && h.kill(),
                    a[r] = o,
                    a.modifiers = _,
                    _[r] = function () {
                        return d(l + f * h.ratio + p * h.ratio * h.ratio)
                    }
                    ,
                    a.onUpdate = function () {
                        H.cache++,
                            ai()
                    }
                    ,
                    a.onComplete = function () {
                        s.tween = 0,
                            c && c.call(h)
                    }
                    ,
                    h = s.tween = O.to(t, a),
                    h
            };
        return t[r] = e,
            e.wheelHandler = function () {
                return n.tween && n.tween.kill() && (n.tween = 0)
            }
            ,
            Rt(t, "wheel", e.wheelHandler),
            G.isTouch && Rt(t, "touchmove", e.wheelHandler),
            n
    }, G = function () {
        function u(i, e) {
            dr || u.register(O) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
                Ws(this),
                this.init(i, e)
        }
        var t = u.prototype;
        return t.init = function (e, r) {
            if (this.progress = this.start = 0,
                this.vars && this.kill(!0, !0),
                !Vr) {
                this.update = this.refresh = this.kill = Ke;
                return
            }
            e = ta(Ce(e) || An(e) || e.nodeType ? {
                trigger: e
            } : e, Mn);
            var n = e, s = n.onUpdate, o = n.toggleClass, a = n.id, l = n.onToggle, f = n.onRefresh, p = n.scrub, h = n.trigger, c = n.pin, _ = n.pinSpacing, d = n.invalidateOnRefresh, g = n.anticipatePin, C = n.onScrubComplete, x = n.onSnapComplete, F = n.once, m = n.snap, E = n.pinReparent, S = n.pinSpacer, y = n.containerAnimation, T = n.fastScrollEnd, b = n.preventOverlaps, k = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? te : Pt, B = !p && p !== 0, A = de(e.scroller || K), $ = O.core.getCache(A), I = zi(A), Y = ("pinType" in e ? e.pinType : Ci(A, "pinType") || I && "fixed") === "fixed", M = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], P = B && e.toggleActions.split(" "), z = "markers" in e ? e.markers : Mn.markers, w = I ? 0 : parseFloat(Re(A)["border" + k.p2 + mr]) || 0, D = this, U = e.onRefreshInit && function () {
                return e.onRefreshInit(D)
            }
                , ut = Kl(A, I, k), Xt = Zl(A, I), Z = 0, W = 0, xt = 0, J = xi(A, k), dt, mt, se, yt, jt, Q, lt, kt, oe, v, Ft, Be, Hi, At, $i, qi, tn, Wt, Et, Ie, Ye, Gi, li, Qe, pe, ji, xr, Fr, Ki, Ei, wi, et, Zi, Xe, We, Ve, Qi, Er, fi;
            if (D._startClamp = D._endClamp = !1,
                D._dir = k,
                g *= 45,
                D.scroller = A,
                D.scroll = y ? y.time.bind(y) : J,
                yt = J(),
                D.vars = e,
                r = r || e.animation,
                "refreshPriority" in e && (Iu = 1,
                    e.refreshPriority === -9999 && (Qr = D)),
                $.tweenScroll = $.tweenScroll || {
                    top: ha(A, Pt),
                    left: ha(A, te)
                },
                D.tweenTo = dt = $.tweenScroll[k.p],
                D.scrubDuration = function (R) {
                    Zi = An(R) && R,
                        Zi ? et ? et.duration(R) : et = O.to(r, {
                            ease: "expo",
                            totalProgress: "+=0",
                            duration: Zi,
                            paused: !0,
                            onComplete: function () {
                                return C && C(D)
                            }
                        }) : (et && et.progress(1).kill(),
                            et = 0)
                }
                ,
                r && (r.vars.lazy = !1,
                    r._initted && !D.isReverted || r.vars.immediateRender !== !1 && e.immediateRender !== !1 && r.duration() && r.render(0, !0, !0),
                    D.animation = r.pause(),
                    r.scrollTrigger = D,
                    D.scrubDuration(p),
                    Ei = 0,
                    a || (a = r.vars.id)),
                m && ((!Ni(m) || m.push) && (m = {
                    snapTo: m
                }),
                    "scrollBehavior" in at.style && O.set(I ? [at, Ne] : A, {
                        scrollBehavior: "auto"
                    }),
                    H.forEach(function (R) {
                        return re(R) && R.target === (I ? ht.scrollingElement || Ne : A) && (R.smooth = !1)
                    }),
                    se = re(m.snapTo) ? m.snapTo : m.snapTo === "labels" ? Jl(r) : m.snapTo === "labelsDirectional" ? tf(r) : m.directional !== !1 ? function (R, tt) {
                        return Qs(m.snapTo)(R, ie() - W < 500 ? 0 : tt.direction)
                    }
                        : O.utils.snap(m.snapTo),
                    Xe = m.duration || {
                        min: .1,
                        max: 2
                    },
                    Xe = Ni(Xe) ? pr(Xe.min, Xe.max) : pr(Xe, Xe),
                    We = O.delayedCall(m.delay || Zi / 2 || .1, function () {
                        var R = J()
                            , tt = ie() - W < 500
                            , N = dt.tween;
                        if ((tt || Math.abs(D.getVelocity()) < 10) && !N && !Tn && Z !== R) {
                            var q = (R - Q) / At
                                , Lt = r && !B ? r.totalProgress() : q
                                , it = tt ? 0 : (Lt - wi) / (ie() - wn) * 1e3 || 0
                                , wt = O.utils.clamp(-q, 1 - q, gr(it / 2) * it / .185)
                                , ue = q + (m.inertia === !1 ? 0 : wt)
                                , Vt = pr(0, 1, se(ue, D))
                                , pt = Math.round(Q + Vt * At)
                                , ot = m
                                , Ue = ot.onStart
                                , _t = ot.onInterrupt
                                , Fe = ot.onComplete;
                            if (R <= lt && R >= Q && pt !== R) {
                                if (N && !N._initted && N.data <= gr(pt - R))
                                    return;
                                m.inertia === !1 && (wt = Vt - q),
                                    dt(pt, {
                                        duration: Xe(gr(Math.max(gr(ue - Lt), gr(Vt - Lt)) * .185 / it / .05 || 0)),
                                        ease: m.ease || "power3",
                                        data: gr(pt - R),
                                        onInterrupt: function () {
                                            return We.restart(!0) && _t && _t(D)
                                        },
                                        onComplete: function () {
                                            D.update(),
                                                Z = J(),
                                                Ei = wi = r && !B ? r.totalProgress() : D.progress,
                                                x && x(D),
                                                Fe && Fe(D)
                                        }
                                    }, R, wt * At, pt - R - wt * At),
                                    Ue && Ue(D, dt.tween)
                            }
                        } else
                            D.isActive && Z !== R && We.restart(!0)
                    }).pause()),
                a && (Js[a] = D),
                h = D.trigger = de(h || c !== !0 && c),
                fi = h && h._gsap && h._gsap.stRevert,
                fi && (fi = fi(D)),
                c = c === !0 ? h : de(c),
                Ce(o) && (o = {
                    targets: h,
                    className: o
                }),
                c && (_ === !1 || _ === Me || (_ = !_ && c.parentNode && c.parentNode.style && Re(c.parentNode).display === "flex" ? !1 : St),
                    D.pin = c,
                    mt = O.core.getCache(c),
                    mt.spacer ? $i = mt.pinState : (S && (S = de(S),
                        S && !S.nodeType && (S = S.current || S.nativeElement),
                        mt.spacerIsNative = !!S,
                        S && (mt.spacerState = Yn(S))),
                        mt.spacer = Wt = S || ht.createElement("div"),
                        Wt.classList.add("pin-spacer"),
                        a && Wt.classList.add("pin-spacer-" + a),
                        mt.pinState = $i = Yn(c)),
                    e.force3D !== !1 && O.set(c, {
                        force3D: !0
                    }),
                    D.spacer = Wt = mt.spacer,
                    Ki = Re(c),
                    Qe = Ki[_ + k.os2],
                    Ie = O.getProperty(c),
                    Ye = O.quickSetter(c, k.a, Yt),
                    no(c, Wt, Ki),
                    tn = Yn(c)),
                z) {
                Be = Ni(z) ? ta(z, ia) : ia,
                    v = Ln("scroller-start", a, A, k, Be, 0),
                    Ft = Ln("scroller-end", a, A, k, Be, 0, v),
                    Et = v["offset" + k.op.d2];
                var X = de(Ci(A, "content") || A);
                kt = this.markerStart = Ln("start", a, X, k, Be, Et, 0, y),
                    oe = this.markerEnd = Ln("end", a, X, k, Be, Et, 0, y),
                    y && (Er = O.quickSetter([kt, oe], k.a, Yt)),
                    !Y && !(je.length && Ci(A, "fixedMarkers") === !0) && (Ql(I ? at : A),
                        O.set([v, Ft], {
                            force3D: !0
                        }),
                        ji = O.quickSetter(v, k.a, Yt),
                        Fr = O.quickSetter(Ft, k.a, Yt))
            }
            if (y) {
                var L = y.vars.onUpdate
                    , rt = y.vars.onUpdateParams;
                y.eventCallback("onUpdate", function () {
                    D.update(0, 0, 1),
                        L && L.apply(y, rt || [])
                })
            }
            if (D.previous = function () {
                return V[V.indexOf(D) - 1]
            }
                ,
                D.next = function () {
                    return V[V.indexOf(D) + 1]
                }
                ,
                D.revert = function (R, tt) {
                    if (!tt)
                        return D.kill(!0);
                    var N = R !== !1 || !D.enabled
                        , q = Gt;
                    N !== D.isReverted && (N && (Ve = Math.max(J(), D.scroll.rec || 0),
                        xt = D.progress,
                        Qi = r && r.progress()),
                        kt && [kt, oe, v, Ft].forEach(function (Lt) {
                            return Lt.style.display = N ? "none" : "block"
                        }),
                        N && (Gt = D,
                            D.update(N)),
                        c && (!E || !D.isActive) && (N ? nf(c, Wt, $i) : no(c, Wt, Re(c), pe)),
                        N || D.update(N),
                        Gt = q,
                        D.isReverted = N)
                }
                ,
                D.refresh = function (R, tt, N, q) {
                    if (!((Gt || !D.enabled) && !tt)) {
                        if (c && R && Oe) {
                            Rt(u, "scrollEnd", na);
                            return
                        }
                        !ne && U && U(D),
                            Gt = D,
                            dt.tween && !N && (dt.tween.kill(),
                                dt.tween = 0),
                            et && et.pause(),
                            d && r && r.revert({
                                kill: !1
                            }).invalidate(),
                            D.isReverted || D.revert(!0, !0),
                            D._subPinOffset = !1;
                        var Lt = ut(), it = Xt(), wt = y ? y.duration() : oi(A, k), ue = At <= .01, Vt = 0, pt = q || 0, ot = Ni(N) ? N.end : e.end, Ue = e.endTrigger || h, _t = Ni(N) ? N.start : e.start || (e.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"), Fe = D.pinnedContainer = e.pinnedContainer && de(e.pinnedContainer, D), Je = h && Math.max(0, V.indexOf(D)) || 0, Ee = Je, Ut, Kt, Ji, qn, Zt, Ot, ti, fo, Oa, en, ei, rn, Gn;
                        for (z && Ni(N) && (rn = O.getProperty(v, k.p),
                            Gn = O.getProperty(Ft, k.p)); Ee--;)
                            Ot = V[Ee],
                                Ot.end || Ot.refresh(0, 1) || (Gt = D),
                                ti = Ot.pin,
                                ti && (ti === h || ti === c || ti === Fe) && !Ot.isReverted && (en || (en = []),
                                    en.unshift(Ot),
                                    Ot.revert(!0, !0)),
                                Ot !== V[Ee] && (Je--,
                                    Ee--);
                        for (re(_t) && (_t = _t(D)),
                            _t = Uu(_t, "start", D),
                            Q = la(_t, h, Lt, k, J(), kt, v, D, it, w, Y, wt, y, D._startClamp && "_startClamp") || (c ? -.001 : 0),
                            re(ot) && (ot = ot(D)),
                            Ce(ot) && !ot.indexOf("+=") && (~ot.indexOf(" ") ? ot = (Ce(_t) ? _t.split(" ")[0] : "") + ot : (Vt = Bn(ot.substr(2), Lt),
                                ot = Ce(_t) ? _t : (y ? O.utils.mapRange(0, y.duration(), y.scrollTrigger.start, y.scrollTrigger.end, Q) : Q) + Vt,
                                Ue = h)),
                            ot = Uu(ot, "end", D),
                            lt = Math.max(Q, la(ot || (Ue ? "100% 0" : wt), Ue, Lt, k, J() + Vt, oe, Ft, D, it, w, Y, wt, y, D._endClamp && "_endClamp")) || -.001,
                            Vt = 0,
                            Ee = Je; Ee--;)
                            Ot = V[Ee],
                                ti = Ot.pin,
                                ti && Ot.start - Ot._pinPush <= Q && !y && Ot.end > 0 && (Ut = Ot.end - (D._startClamp ? Math.max(0, Ot.start) : Ot.start),
                                    (ti === h && Ot.start - Ot._pinPush < Q || ti === Fe) && isNaN(_t) && (Vt += Ut * (1 - Ot.progress)),
                                    ti === c && (pt += Ut));
                        if (Q += Vt,
                            lt += Vt,
                            D._startClamp && (D._startClamp += Vt),
                            D._endClamp && !ne && (D._endClamp = lt || -.001,
                                lt = Math.min(lt, oi(A, k))),
                            At = lt - Q || (Q -= .01) && .001,
                            ue && (xt = O.utils.clamp(0, 1, O.utils.normalize(Q, lt, Ve))),
                            D._pinPush = pt,
                            kt && Vt && (Ut = {},
                                Ut[k.a] = "+=" + Vt,
                                Fe && (Ut[k.p] = "-=" + J()),
                                O.set([kt, oe], Ut)),
                            c)
                            Ut = Re(c),
                                qn = k === Pt,
                                Ji = J(),
                                Gi = parseFloat(Ie(k.a)) + pt,
                                !wt && lt > 1 && (ei = (I ? ht.scrollingElement || Ne : A).style,
                                    ei = {
                                        style: ei,
                                        value: ei["overflow" + k.a.toUpperCase()]
                                    },
                                    I && Re(at)["overflow" + k.a.toUpperCase()] !== "scroll" && (ei.style["overflow" + k.a.toUpperCase()] = "scroll")),
                                no(c, Wt, Ut),
                                tn = Yn(c),
                                Kt = ui(c, !0),
                                fo = Y && xi(A, qn ? te : Pt)(),
                                _ && (pe = [_ + k.os2, At + pt + Yt],
                                    pe.t = Wt,
                                    Ee = _ === St ? Zs(c, k) + At + pt : 0,
                                    Ee && pe.push(k.d, Ee + Yt),
                                    vr(pe),
                                    Fe && V.forEach(function (nn) {
                                        nn.pin === Fe && nn.vars.pinSpacing !== !1 && (nn._subPinOffset = !0)
                                    }),
                                    Y && J(Ve)),
                                Y && (Zt = {
                                    top: Kt.top + (qn ? Ji - Q : fo) + Yt,
                                    left: Kt.left + (qn ? fo : Ji - Q) + Yt,
                                    boxSizing: "border-box",
                                    position: "fixed"
                                },
                                    Zt[Ii] = Zt["max" + mr] = Math.ceil(Kt.width) + Yt,
                                    Zt[Yi] = Zt["max" + Ks] = Math.ceil(Kt.height) + Yt,
                                    Zt[Me] = Zt[Me + Gr] = Zt[Me + $r] = Zt[Me + jr] = Zt[Me + qr] = "0",
                                    Zt[St] = Ut[St],
                                    Zt[St + Gr] = Ut[St + Gr],
                                    Zt[St + $r] = Ut[St + $r],
                                    Zt[St + jr] = Ut[St + jr],
                                    Zt[St + qr] = Ut[St + qr],
                                    qi = of($i, Zt, E),
                                    ne && J(0)),
                                r ? (Oa = r._initted,
                                    Xs(1),
                                    r.render(r.duration(), !0, !0),
                                    li = Ie(k.a) - Gi + At + pt,
                                    xr = Math.abs(At - li) > 1,
                                    Y && xr && qi.splice(qi.length - 2, 2),
                                    r.render(0, !0, !0),
                                    Oa || r.invalidate(!0),
                                    r.parent || r.totalTime(r.totalTime()),
                                    Xs(0)) : li = At,
                                ei && (ei.value ? ei.style["overflow" + k.a.toUpperCase()] = ei.value : ei.style.removeProperty("overflow-" + k.a));
                        else if (h && J() && !y)
                            for (Kt = h.parentNode; Kt && Kt !== at;)
                                Kt._pinOffset && (Q -= Kt._pinOffset,
                                    lt -= Kt._pinOffset),
                                    Kt = Kt.parentNode;
                        en && en.forEach(function (nn) {
                            return nn.revert(!1, !0)
                        }),
                            D.start = Q,
                            D.end = lt,
                            yt = jt = ne ? Ve : J(),
                            !y && !ne && (yt < Ve && J(Ve),
                                D.scroll.rec = 0),
                            D.revert(!1, !0),
                            W = ie(),
                            We && (Z = -1,
                                We.restart(!0)),
                            Gt = 0,
                            r && B && (r._initted || Qi) && r.progress() !== Qi && r.progress(Qi || 0, !0).render(r.time(), !0, !0),
                            (ue || xt !== D.progress || y) && (r && !B && r.totalProgress(y && Q < -.001 && !xt ? O.utils.normalize(Q, lt, 0) : xt, !0),
                                D.progress = ue || (yt - Q) / At === xt ? 0 : xt),
                            c && _ && (Wt._pinOffset = Math.round(D.progress * li)),
                            et && et.invalidate(),
                            isNaN(rn) || (rn -= O.getProperty(v, k.p),
                                Gn -= O.getProperty(Ft, k.p),
                                Wn(v, k, rn),
                                Wn(kt, k, rn - (q || 0)),
                                Wn(Ft, k, Gn),
                                Wn(oe, k, Gn - (q || 0))),
                            ue && !ne && D.update(),
                            f && !ne && !Hi && (Hi = !0,
                                f(D),
                                Hi = !1)
                    }
                }
                ,
                D.getVelocity = function () {
                    return (J() - jt) / (ie() - wn) * 1e3 || 0
                }
                ,
                D.endAnimation = function () {
                    Hr(D.callbackAnimation),
                        r && (et ? et.progress(1) : r.paused() ? B || Hr(r, D.direction < 0, 1) : Hr(r, r.reversed()))
                }
                ,
                D.labelToScroll = function (R) {
                    return r && r.labels && (Q || D.refresh() || Q) + r.labels[R] / r.duration() * At || 0
                }
                ,
                D.getTrailing = function (R) {
                    var tt = V.indexOf(D)
                        , N = D.direction > 0 ? V.slice(0, tt).reverse() : V.slice(tt + 1);
                    return (Ce(R) ? N.filter(function (q) {
                        return q.vars.preventOverlaps === R
                    }) : N).filter(function (q) {
                        return D.direction > 0 ? q.end <= Q : q.start >= lt
                    })
                }
                ,
                D.update = function (R, tt, N) {
                    if (!(y && !N && !R)) {
                        var q = ne === !0 ? Ve : D.scroll(), Lt = R ? 0 : (q - Q) / At, it = Lt < 0 ? 0 : Lt > 1 ? 1 : Lt || 0, wt = D.progress, ue, Vt, pt, ot, Ue, _t, Fe, Je;
                        if (tt && (jt = yt,
                            yt = y ? J() : q,
                            m && (wi = Ei,
                                Ei = r && !B ? r.totalProgress() : it)),
                            g && !it && c && !Gt && !Sn && Oe && Q < q + (q - jt) / (ie() - wn) * g && (it = 1e-4),
                            it !== wt && D.enabled) {
                            if (ue = D.isActive = !!it && it < 1,
                                Vt = !!wt && wt < 1,
                                _t = ue !== Vt,
                                Ue = _t || !!it != !!wt,
                                D.direction = it > wt ? 1 : -1,
                                D.progress = it,
                                Ue && !Gt && (pt = it && !wt ? 0 : it === 1 ? 1 : wt === 1 ? 2 : 3,
                                    B && (ot = !_t && P[pt + 1] !== "none" && P[pt + 1] || P[pt],
                                        Je = r && (ot === "complete" || ot === "reset" || ot in r))),
                                b && (_t || Je) && (Je || p || !r) && (re(b) ? b(D) : D.getTrailing(b).forEach(function (Ji) {
                                    return Ji.endAnimation()
                                })),
                                B || (et && !Gt && !Sn ? (et._dp._time - et._start !== et._time && et.render(et._dp._time - et._start),
                                    et.resetTo ? et.resetTo("totalProgress", it, r._tTime / r._tDur) : (et.vars.totalProgress = it,
                                        et.invalidate().restart())) : r && r.totalProgress(it, !!(Gt && (W || R)))),
                                c) {
                                if (R && _ && (Wt.style[_ + k.os2] = Qe),
                                    !Y)
                                    Ye(Ur(Gi + li * it));
                                else if (Ue) {
                                    if (Fe = !R && it > wt && lt + 1 > q && q + 1 >= oi(A, k),
                                        E)
                                        if (!R && (ue || Fe)) {
                                            var Ee = ui(c, !0)
                                                , Ut = q - Q;
                                            fa(c, at, Ee.top + (k === Pt ? Ut : 0) + Yt, Ee.left + (k === Pt ? 0 : Ut) + Yt)
                                        } else
                                            fa(c, Wt);
                                    vr(ue || Fe ? qi : tn),
                                        xr && it < 1 && ue || Ye(Gi + (it === 1 && !Fe ? li : 0))
                                }
                            }
                            m && !dt.tween && !Gt && !Sn && We.restart(!0),
                                o && (_t || F && it && (it < 1 || !Hs)) && En(o.targets).forEach(function (Ji) {
                                    return Ji.classList[ue || F ? "add" : "remove"](o.className)
                                }),
                                s && !B && !R && s(D),
                                Ue && !Gt ? (B && (Je && (ot === "complete" ? r.pause().totalProgress(1) : ot === "reset" ? r.restart(!0).pause() : ot === "restart" ? r.restart(!0) : r[ot]()),
                                    s && s(D)),
                                    (_t || !Hs) && (l && _t && qs(D, l),
                                        M[pt] && qs(D, M[pt]),
                                        F && (it === 1 ? D.kill(!1, 1) : M[pt] = 0),
                                        _t || (pt = it === 1 ? 1 : 3,
                                            M[pt] && qs(D, M[pt]))),
                                    T && !ue && Math.abs(D.getVelocity()) > (An(T) ? T : 2500) && (Hr(D.callbackAnimation),
                                        et ? et.progress(1) : Hr(r, ot === "reverse" ? 1 : !it, 1))) : B && s && !Gt && s(D)
                        }
                        if (Fr) {
                            var Kt = y ? q / y.duration() * (y._caScrollDist || 0) : q;
                            ji(Kt + (v._isFlipped ? 1 : 0)),
                                Fr(Kt)
                        }
                        Er && Er(-q / y.duration() * (y._caScrollDist || 0))
                    }
                }
                ,
                D.enable = function (R, tt) {
                    D.enabled || (D.enabled = !0,
                        Rt(A, "resize", Zr),
                        I || Rt(A, "scroll", yr),
                        U && Rt(u, "refreshInit", U),
                        R !== !1 && (D.progress = xt = 0,
                            yt = jt = Z = J()),
                        tt !== !1 && D.refresh())
                }
                ,
                D.getTween = function (R) {
                    return R && dt ? dt.tween : et
                }
                ,
                D.setPositions = function (R, tt, N, q) {
                    if (y) {
                        var Lt = y.scrollTrigger
                            , it = y.duration()
                            , wt = Lt.end - Lt.start;
                        R = Lt.start + wt * R / it,
                            tt = Lt.start + wt * tt / it
                    }
                    D.refresh(!1, !1, {
                        start: Hu(R, N && !!D._startClamp),
                        end: Hu(tt, N && !!D._endClamp)
                    }, q),
                        D.update()
                }
                ,
                D.adjustPinSpacing = function (R) {
                    if (pe && R) {
                        var tt = pe.indexOf(k.d) + 1;
                        pe[tt] = parseFloat(pe[tt]) + R + Yt,
                            pe[1] = parseFloat(pe[1]) + R + Yt,
                            vr(pe)
                    }
                }
                ,
                D.disable = function (R, tt) {
                    if (D.enabled && (R !== !1 && D.revert(!0, !0),
                        D.enabled = D.isActive = !1,
                        tt || et && et.pause(),
                        Ve = 0,
                        mt && (mt.uncache = 1),
                        U && Bt(u, "refreshInit", U),
                        We && (We.pause(),
                            dt.tween && dt.tween.kill() && (dt.tween = 0)),
                        !I)) {
                        for (var N = V.length; N--;)
                            if (V[N].scroller === A && V[N] !== D)
                                return;
                        Bt(A, "resize", Zr),
                            I || Bt(A, "scroll", yr)
                    }
                }
                ,
                D.kill = function (R, tt) {
                    D.disable(R, tt),
                        et && !tt && et.kill(),
                        a && delete Js[a];
                    var N = V.indexOf(D);
                    N >= 0 && V.splice(N, 1),
                        N === ee && Nn > 0 && ee--,
                        N = 0,
                        V.forEach(function (q) {
                            return q.scroller === D.scroller && (N = 1)
                        }),
                        N || ne || (D.scroll.rec = 0),
                        r && (r.scrollTrigger = null,
                            R && r.revert({
                                kill: !1
                            }),
                            tt || r.kill()),
                        kt && [kt, oe, v, Ft].forEach(function (q) {
                            return q.parentNode && q.parentNode.removeChild(q)
                        }),
                        Qr === D && (Qr = 0),
                        c && (mt && (mt.uncache = 1),
                            N = 0,
                            V.forEach(function (q) {
                                return q.pin === c && N++
                            }),
                            N || (mt.spacer = 0)),
                        e.onKill && e.onKill(D)
                }
                ,
                V.push(D),
                D.enable(!1, !1),
                fi && fi(D),
                r && r.add && !At) {
                var vt = D.update;
                D.update = function () {
                    D.update = vt,
                        Q || lt || D.refresh()
                }
                    ,
                    O.delayedCall(.01, D.update),
                    At = .01,
                    Q = lt = 0
            } else
                D.refresh();
            c && rf()
        }
            ,
            u.register = function (e) {
                return dr || (O = e || ju(),
                    Gu() && window.document && u.enable(),
                    dr = Vr),
                    dr
            }
            ,
            u.defaults = function (e) {
                if (e)
                    for (var r in e)
                        Mn[r] = e[r];
                return Mn
            }
            ,
            u.disable = function (e, r) {
                Vr = 0,
                    V.forEach(function (s) {
                        return s[r ? "kill" : "disable"](e)
                    }),
                    Bt(K, "wheel", yr),
                    Bt(ht, "scroll", yr),
                    clearInterval(bn),
                    Bt(ht, "touchcancel", Ke),
                    Bt(at, "touchstart", Ke),
                    Pn(Bt, ht, "pointerdown,touchstart,mousedown", $u),
                    Pn(Bt, ht, "pointerup,touchend,mouseup", qu),
                    Fn.kill(),
                    kn(Bt);
                for (var n = 0; n < H.length; n += 3)
                    On(Bt, H[n], H[n + 1]),
                        On(Bt, H[n], H[n + 2])
            }
            ,
            u.enable = function () {
                if (K = window,
                    ht = document,
                    Ne = ht.documentElement,
                    at = ht.body,
                    O && (En = O.utils.toArray,
                        pr = O.utils.clamp,
                        Ws = O.core.context || Ke,
                        Xs = O.core.suppressOverwrites || Ke,
                        Vs = K.history.scrollRestoration || "auto",
                        io = K.pageYOffset,
                        O.core.globals("ScrollTrigger", u),
                        at)) {
                    Vr = 1,
                        Dr = document.createElement("div"),
                        Dr.style.height = "100vh",
                        Dr.style.position = "absolute",
                        aa(),
                        jl(),
                        Tt.register(O),
                        u.isTouch = Tt.isTouch,
                        Fi = Tt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
                        Rt(K, "wheel", yr),
                        Lu = [K, ht, Ne, at],
                        O.matchMedia ? (u.matchMedia = function (a) {
                            var l = O.matchMedia(), f;
                            for (f in a)
                                l.add(f, a[f]);
                            return l
                        }
                            ,
                            O.addEventListener("matchMediaInit", function () {
                                return eo()
                            }),
                            O.addEventListener("matchMediaRevert", function () {
                                return sa()
                            }),
                            O.addEventListener("matchMedia", function () {
                                Ui(0, 1),
                                    Wi("matchMedia")
                            }),
                            O.matchMedia("(orientation: portrait)", function () {
                                return to(),
                                    to
                            })) : console.warn("Requires GSAP 3.11.0 or later"),
                        to(),
                        Rt(ht, "scroll", yr);
                    var e = at.style, r = e.borderTopStyle, n = O.core.Animation.prototype, s, o;
                    for (n.revert || Object.defineProperty(n, "revert", {
                        value: function () {
                            return this.time(-.01, !0)
                        }
                    }),
                        e.borderTopStyle = "solid",
                        s = ui(at),
                        Pt.m = Math.round(s.top + Pt.sc()) || 0,
                        te.m = Math.round(s.left + te.sc()) || 0,
                        r ? e.borderTopStyle = r : e.removeProperty("border-top-style"),
                        bn = setInterval(ra, 250),
                        O.delayedCall(.5, function () {
                            return Sn = 0
                        }),
                        Rt(ht, "touchcancel", Ke),
                        Rt(at, "touchstart", Ke),
                        Pn(Rt, ht, "pointerdown,touchstart,mousedown", $u),
                        Pn(Rt, ht, "pointerup,touchend,mouseup", qu),
                        Ys = O.utils.checkPrefix("transform"),
                        In.push(Ys),
                        dr = ie(),
                        Fn = O.delayedCall(.2, Ui).pause(),
                        _r = [ht, "visibilitychange", function () {
                            var a = K.innerWidth
                                , l = K.innerHeight;
                            ht.hidden ? (zu = a,
                                Nu = l) : (zu !== a || Nu !== l) && Zr()
                        }
                            , ht, "DOMContentLoaded", Ui, K, "load", Ui, K, "resize", Zr],
                        kn(Rt),
                        V.forEach(function (a) {
                            return a.enable(0, 1)
                        }),
                        o = 0; o < H.length; o += 3)
                        On(Bt, H[o], H[o + 1]),
                            On(Bt, H[o], H[o + 2])
                }
            }
            ,
            u.config = function (e) {
                "limitCallbacks" in e && (Hs = !!e.limitCallbacks);
                var r = e.syncInterval;
                r && clearInterval(bn) || (bn = r) && setInterval(ra, r),
                    "ignoreMobileResize" in e && (Xu = u.isTouch === 1 && e.ignoreMobileResize),
                    "autoRefreshEvents" in e && (kn(Bt) || kn(Rt, e.autoRefreshEvents || "none"),
                        Yu = (e.autoRefreshEvents + "").indexOf("resize") === -1)
            }
            ,
            u.scrollerProxy = function (e, r) {
                var n = de(e)
                    , s = H.indexOf(n)
                    , o = zi(n);
                ~s && H.splice(s, o ? 6 : 2),
                    r && (o ? je.unshift(K, r, at, r, Ne, r) : je.unshift(n, r))
            }
            ,
            u.clearMatchMedia = function (e) {
                V.forEach(function (r) {
                    return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0)
                })
            }
            ,
            u.isInViewport = function (e, r, n) {
                var s = (Ce(e) ? de(e) : e).getBoundingClientRect()
                    , o = s[n ? Ii : Yi] * r || 0;
                return n ? s.right - o > 0 && s.left + o < K.innerWidth : s.bottom - o > 0 && s.top + o < K.innerHeight
            }
            ,
            u.positionInViewport = function (e, r, n) {
                Ce(e) && (e = de(e));
                var s = e.getBoundingClientRect()
                    , o = s[n ? Ii : Yi]
                    , a = r == null ? o / 2 : r in Rn ? Rn[r] * o : ~r.indexOf("%") ? parseFloat(r) * o / 100 : parseFloat(r) || 0;
                return n ? (s.left + a) / K.innerWidth : (s.top + a) / K.innerHeight
            }
            ,
            u.killAll = function (e) {
                if (V.slice(0).forEach(function (n) {
                    return n.vars.id !== "ScrollSmoother" && n.kill()
                }),
                    e !== !0) {
                    var r = Xi.killAll || [];
                    Xi = {},
                        r.forEach(function (n) {
                            return n()
                        })
                }
            }
            ,
            u
    }();
    G.version = "3.12.2",
        G.saveStyles = function (u) {
            return u ? En(u).forEach(function (t) {
                if (t && t.style) {
                    var i = xe.indexOf(t);
                    i >= 0 && xe.splice(i, 5),
                        xe.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), O.core.getCache(t), Ws())
                }
            }) : xe
        }
        ,
        G.revert = function (u, t) {
            return eo(!u, t)
        }
        ,
        G.create = function (u, t) {
            return new G(u, t)
        }
        ,
        G.refresh = function (u) {
            return u ? Zr() : (dr || G.register()) && Ui(!0)
        }
        ,
        G.update = function (u) {
            return ++H.cache && ai(u === !0 ? 2 : 0)
        }
        ,
        G.clearScrollMemory = oa,
        G.maxScroll = function (u, t) {
            return oi(u, t ? te : Pt)
        }
        ,
        G.getScrollFunc = function (u, t) {
            return xi(de(u), t ? te : Pt)
        }
        ,
        G.getById = function (u) {
            return Js[u]
        }
        ,
        G.getAll = function () {
            return V.filter(function (u) {
                return u.vars.id !== "ScrollSmoother"
            })
        }
        ,
        G.isScrolling = function () {
            return !!Oe
        }
        ,
        G.snapDirectional = Qs,
        G.addEventListener = function (u, t) {
            var i = Xi[u] || (Xi[u] = []);
            ~i.indexOf(t) || i.push(t)
        }
        ,
        G.removeEventListener = function (u, t) {
            var i = Xi[u]
                , e = i && i.indexOf(t);
            e >= 0 && i.splice(e, 1)
        }
        ,
        G.batch = function (u, t) {
            var i = [], e = {}, r = t.interval || .016, n = t.batchMax || 1e9, s = function (l, f) {
                var p = []
                    , h = []
                    , c = O.delayedCall(r, function () {
                        f(p, h),
                            p = [],
                            h = []
                    }).pause();
                return function (_) {
                    p.length || c.restart(!0),
                        p.push(_.trigger),
                        h.push(_),
                        n <= p.length && c.progress(1)
                }
            }, o;
            for (o in t)
                e[o] = o.substr(0, 2) === "on" && re(t[o]) && o !== "onRefreshInit" ? s(o, t[o]) : t[o];
            return re(n) && (n = n(),
                Rt(G, "refresh", function () {
                    return n = t.batchMax()
                })),
                En(u).forEach(function (a) {
                    var l = {};
                    for (o in e)
                        l[o] = e[o];
                    l.trigger = a,
                        i.push(G.create(l))
                }),
                i
        }
        ;
    var da = function (t, i, e, r) {
        return i > r ? t(r) : i < 0 && t(0),
            e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1
    }, so = function u(t, i) {
        i === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (Tt.isTouch ? " pinch-zoom" : "") : "none",
            t === Ne && u(at, i)
    }, Vn = {
        auto: 1,
        scroll: 1
    }, af = function (t) {
        var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, s = n._gsap || O.core.getCache(n), o = ie(), a;
        if (!s._isScrollT || o - s._isScrollT > 2e3) {
            for (; n && n !== at && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Vn[(a = Re(n)).overflowY] || Vn[a.overflowX]));)
                n = n.parentNode;
            s._isScroll = n && n !== e && !zi(n) && (Vn[(a = Re(n)).overflowY] || Vn[a.overflowX]),
                s._isScrollT = o
        }
        (s._isScroll || r === "x") && (i.stopPropagation(),
            i._gsapAllow = !0)
    }, pa = function (t, i, e, r) {
        return Tt.create({
            target: t,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: i,
            onWheel: r = r && af,
            onPress: r,
            onDrag: r,
            onScroll: r,
            onEnable: function () {
                return e && Rt(ht, Tt.eventTypes[0], Da, !1, !0)
            },
            onDisable: function () {
                return Bt(ht, Tt.eventTypes[0], Da, !0)
            }
        })
    }, lf = /(input|label|select|textarea)/i, _a, Da = function (t) {
        var i = lf.test(t.target.tagName);
        (i || _a) && (t._gsapAllow = !0,
            _a = i)
    }, ff = function (t) {
        Ni(t) || (t = {}),
            t.preventDefault = t.isNormalizer = t.allowClicks = !0,
            t.type || (t.type = "wheel,touch"),
            t.debounce = !!t.debounce,
            t.id = t.id || "normalizer";
        var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, s = i.onRelease, o, a, l = de(t.target) || Ne, f = O.core.globals().ScrollSmoother, p = f && f.get(), h = Fi && (t.content && de(t.content) || p && t.content !== !1 && !p.smooth() && p.content()), c = xi(l, Pt), _ = xi(l, te), d = 1, g = (Tt.isTouch && K.visualViewport ? K.visualViewport.scale * K.visualViewport.width : K.outerWidth) / K.innerWidth, C = 0, x = re(r) ? function () {
            return r(o)
        }
            : function () {
                return r || 2.8
            }
            , F, m, E = pa(l, t.type, !0, n), S = function () {
                return m = !1
            }, y = Ke, T = Ke, b = function () {
                a = oi(l, Pt),
                    T = pr(Fi ? 1 : 0, a),
                    e && (y = pr(0, oi(l, te))),
                    F = Vi
            }, k = function () {
                h._gsap.y = Ur(parseFloat(h._gsap.y) + c.offset) + "px",
                    h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)",
                    c.offset = c.cacheID = 0
            }, B = function () {
                if (m) {
                    requestAnimationFrame(S);
                    var z = Ur(o.deltaY / 2)
                        , w = T(c.v - z);
                    if (h && w !== c.v + c.offset) {
                        c.offset = w - c.v;
                        var D = Ur((parseFloat(h && h._gsap.y) || 0) - c.offset);
                        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + D + ", 0, 1)",
                            h._gsap.y = D + "px",
                            c.cacheID = H.cache,
                            ai()
                    }
                    return !0
                }
                c.offset && k(),
                    m = !0
            }, A, $, I, Y, M = function () {
                b(),
                    A.isActive() && A.vars.scrollY > a && (c() > a ? A.progress(1) && c(a) : A.resetTo("scrollY", a))
            };
        return h && O.set(h, {
            y: "+=0"
        }),
            t.ignoreCheck = function (P) {
                return Fi && P.type === "touchmove" && B() || d > 1.05 && P.type !== "touchstart" || o.isGesturing || P.touches && P.touches.length > 1
            }
            ,
            t.onPress = function () {
                m = !1;
                var P = d;
                d = Ur((K.visualViewport && K.visualViewport.scale || 1) / g),
                    A.pause(),
                    P !== d && so(l, d > 1.01 ? !0 : e ? !1 : "x"),
                    $ = _(),
                    I = c(),
                    b(),
                    F = Vi
            }
            ,
            t.onRelease = t.onGestureStart = function (P, z) {
                if (c.offset && k(),
                    !z)
                    Y.restart(!0);
                else {
                    H.cache++;
                    var w = x(), D, U;
                    e && (D = _(),
                        U = D + w * .05 * -P.velocityX / .227,
                        w *= da(_, D, U, oi(l, te)),
                        A.vars.scrollX = y(U)),
                        D = c(),
                        U = D + w * .05 * -P.velocityY / .227,
                        w *= da(c, D, U, oi(l, Pt)),
                        A.vars.scrollY = T(U),
                        A.invalidate().duration(w).play(.01),
                        (Fi && A.vars.scrollY >= a || D >= a - 1) && O.to({}, {
                            onUpdate: M,
                            duration: w
                        })
                }
                s && s(P)
            }
            ,
            t.onWheel = function () {
                A._ts && A.pause(),
                    ie() - C > 1e3 && (F = 0,
                        C = ie())
            }
            ,
            t.onChange = function (P, z, w, D, U) {
                if (Vi !== F && b(),
                    z && e && _(y(D[2] === z ? $ + (P.startX - P.x) : _() + z - D[1])),
                    w) {
                    c.offset && k();
                    var ut = U[2] === w
                        , Xt = ut ? I + P.startY - P.y : c() + w - U[1]
                        , Z = T(Xt);
                    ut && Xt !== Z && (I += Z - Xt),
                        c(Z)
                }
                (w || z) && ai()
            }
            ,
            t.onEnable = function () {
                so(l, e ? !1 : "x"),
                    G.addEventListener("refresh", M),
                    Rt(K, "resize", M),
                    c.smooth && (c.target.style.scrollBehavior = "auto",
                        c.smooth = _.smooth = !1),
                    E.enable()
            }
            ,
            t.onDisable = function () {
                so(l, !0),
                    Bt(K, "resize", M),
                    G.removeEventListener("refresh", M),
                    E.kill()
            }
            ,
            t.lockAxis = t.lockAxis !== !1,
            o = new Tt(t),
            o.iOS = Fi,
            Fi && !c() && c(1),
            Fi && O.ticker.add(Ke),
            Y = o._dc,
            A = O.to(o, {
                ease: "power4",
                paused: !0,
                scrollX: e ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                modifiers: {
                    scrollY: ca(c, c(), function () {
                        return A.pause()
                    })
                },
                onUpdate: ai,
                onComplete: Y.vars.onComplete
            }),
            o
    };
    G.sort = function (u) {
        return V.sort(u || function (t, i) {
            return (t.vars.refreshPriority || 0) * -1e6 + t.start - (i.start + (i.vars.refreshPriority || 0) * -1e6)
        }
        )
    }
        ,
        G.observe = function (u) {
            return new Tt(u)
        }
        ,
        G.normalizeScroll = function (u) {
            if (typeof u == "undefined")
                return ve;
            if (u === !0 && ve)
                return ve.enable();
            if (u === !1)
                return ve && ve.kill();
            var t = u instanceof Tt ? u : ff(u);
            return ve && ve.target === t.target && ve.kill(),
                zi(t.target) && (ve = t),
                t
        }
        ,
        G.core = {
            _getVelocityProp: Is,
            _inputObserver: pa,
            _scrollers: H,
            _proxies: je,
            bridge: {
                ss: function () {
                    Oe || Wi("scrollStart"),
                        Oe = ie()
                },
                ref: function () {
                    return Gt
                }
            }
        },
        ju() && O.registerPlugin(G);
    /*!
 * strings: 3.12.2
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var cf = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
    function ga(u) {
        var t = u.nodeType
            , i = "";
        if (t === 1 || t === 9 || t === 11) {
            if (typeof u.textContent == "string")
                return u.textContent;
            for (u = u.firstChild; u; u = u.nextSibling)
                i += ga(u)
        } else if (t === 3 || t === 4)
            return u.nodeValue;
        return i
    }
    /*!
 * SplitText: 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var Cr, oo, ma, Jr, ya, Un, hf = /(?:\r|\n|\t\t)/g, df = /(?:\s\s+)/g, va = function (t) {
        Cr = document,
            oo = window,
            Jr = Jr || t || oo.gsap || console.warn("Please gsap.registerPlugin(SplitText)"),
            Jr && (Un = Jr.utils.toArray,
                ya = Jr.core.context || function () { }
                ,
                ma = 1)
    }, Ca = function (t) {
        return oo.getComputedStyle(t)
    }, uo = function (t) {
        return t.position === "absolute" || t.absolute === !0
    }, pf = function (t, i) {
        for (var e = i.length, r; --e > -1;)
            if (r = i[e],
                t.substr(0, r.length) === r)
                return r.length
    }, _f = " style='position:relative;display:inline-block;'", xa = function (t, i) {
        t === void 0 && (t = "");
        var e = ~t.indexOf("++")
            , r = 1;
        return e && (t = t.split("++").join("")),
            function () {
                return "<" + i + _f + (t ? " class='" + t + (e ? r++ : "") + "'>" : ">")
            }
    }, Fa = function u(t, i, e) {
        var r = t.nodeType;
        if (r === 1 || r === 9 || r === 11)
            for (t = t.firstChild; t; t = t.nextSibling)
                u(t, i, e);
        else
            (r === 3 || r === 4) && (t.nodeValue = t.nodeValue.split(i).join(e))
    }, ao = function (t, i) {
        for (var e = i.length; --e > -1;)
            t.push(i[e])
    }, Ea = function (t, i, e) {
        for (var r; t && t !== i;) {
            if (r = t._next || t.nextSibling,
                r)
                return r.textContent.charAt(0) === e;
            t = t.parentNode || t._parent
        }
    }, Df = function u(t) {
        var i = Un(t.childNodes), e = i.length, r, n;
        for (r = 0; r < e; r++)
            n = i[r],
                n._isSplit ? u(n) : r && n.previousSibling && n.previousSibling.nodeType === 3 ? (n.previousSibling.nodeValue += n.nodeType === 3 ? n.nodeValue : n.firstChild.nodeValue,
                    t.removeChild(n)) : n.nodeType !== 3 && (t.insertBefore(n.firstChild, n),
                        t.removeChild(n))
    }, Ze = function (t, i) {
        return parseFloat(i[t]) || 0
    }, gf = function (t, i, e, r, n, s, o) {
        var a = Ca(t), l = Ze("paddingLeft", a), f = -999, p = Ze("borderBottomWidth", a) + Ze("borderTopWidth", a), h = Ze("borderLeftWidth", a) + Ze("borderRightWidth", a), c = Ze("paddingTop", a) + Ze("paddingBottom", a), _ = Ze("paddingLeft", a) + Ze("paddingRight", a), d = Ze("fontSize", a) * (i.lineThreshold || .2), g = a.textAlign, C = [], x = [], F = [], m = i.wordDelimiter || " ", E = i.tag ? i.tag : i.span ? "span" : "div", S = i.type || i.split || "chars,words,lines", y = n && ~S.indexOf("lines") ? [] : null, T = ~S.indexOf("words"), b = ~S.indexOf("chars"), k = uo(i), B = i.linesClass, A = ~(B || "").indexOf("++"), $ = [], I = a.display === "flex", Y = t.style.display, M, P, z, w, D, U, ut, Xt, Z, W, xt, J;
        for (A && (B = B.split("++").join("")),
            I && (t.style.display = "block"),
            P = t.getElementsByTagName("*"),
            z = P.length,
            D = [],
            M = 0; M < z; M++)
            D[M] = P[M];
        if (y || k)
            for (M = 0; M < z; M++)
                w = D[M],
                    U = w.parentNode === t,
                    (U || k || b && !T) && (J = w.offsetTop,
                        y && U && Math.abs(J - f) > d && (w.nodeName !== "BR" || M === 0) && (ut = [],
                            y.push(ut),
                            f = J),
                        k && (w._x = w.offsetLeft,
                            w._y = J,
                            w._w = w.offsetWidth,
                            w._h = w.offsetHeight),
                        y && ((w._isSplit && U || !b && U || T && U || !T && w.parentNode.parentNode === t && !w.parentNode._isSplit) && (ut.push(w),
                            w._x -= l,
                            Ea(w, t, m) && (w._wordEnd = !0)),
                            w.nodeName === "BR" && (w.nextSibling && w.nextSibling.nodeName === "BR" || M === 0) && y.push([])));
        for (M = 0; M < z; M++) {
            if (w = D[M],
                U = w.parentNode === t,
                w.nodeName === "BR") {
                y || k ? (w.parentNode && w.parentNode.removeChild(w),
                    D.splice(M--, 1),
                    z--) : T || t.appendChild(w);
                continue
            }
            if (k && (Z = w.style,
                !T && !U && (w._x += w.parentNode._x,
                    w._y += w.parentNode._y),
                Z.left = w._x + "px",
                Z.top = w._y + "px",
                Z.position = "absolute",
                Z.display = "block",
                Z.width = w._w + 1 + "px",
                Z.height = w._h + "px"),
                !T && b)
                if (w._isSplit)
                    for (w._next = P = w.nextSibling,
                        w.parentNode.appendChild(w); P && P.nodeType === 3 && P.textContent === " ";)
                        w._next = P.nextSibling,
                            w.parentNode.appendChild(P),
                            P = P.nextSibling;
                else
                    w.parentNode._isSplit ? (w._parent = w.parentNode,
                        !w.previousSibling && w.firstChild && (w.firstChild._isFirst = !0),
                        w.nextSibling && w.nextSibling.textContent === " " && !w.nextSibling.nextSibling && $.push(w.nextSibling),
                        w._next = w.nextSibling && w.nextSibling._isFirst ? null : w.nextSibling,
                        w.parentNode.removeChild(w),
                        D.splice(M--, 1),
                        z--) : U || (J = !w.nextSibling && Ea(w.parentNode, t, m),
                            w.parentNode._parent && w.parentNode._parent.appendChild(w),
                            J && w.parentNode.appendChild(Cr.createTextNode(" ")),
                            E === "span" && (w.style.display = "inline"),
                            C.push(w));
            else
                w.parentNode._isSplit && !w._isSplit && w.innerHTML !== "" ? x.push(w) : b && !w._isSplit && (E === "span" && (w.style.display = "inline"),
                    C.push(w))
        }
        for (M = $.length; --M > -1;)
            $[M].parentNode.removeChild($[M]);
        if (y) {
            for (k && (W = Cr.createElement(E),
                t.appendChild(W),
                xt = W.offsetWidth + "px",
                J = W.offsetParent === t ? 0 : t.offsetLeft,
                t.removeChild(W)),
                Z = t.style.cssText,
                t.style.cssText = "display:none;"; t.firstChild;)
                t.removeChild(t.firstChild);
            for (Xt = m === " " && (!k || !T && !b),
                M = 0; M < y.length; M++) {
                for (ut = y[M],
                    W = Cr.createElement(E),
                    W.style.cssText = "display:block;text-align:" + g + ";position:" + (k ? "absolute;" : "relative;"),
                    B && (W.className = B + (A ? M + 1 : "")),
                    F.push(W),
                    z = ut.length,
                    P = 0; P < z; P++)
                    ut[P].nodeName !== "BR" && (w = ut[P],
                        W.appendChild(w),
                        Xt && w._wordEnd && W.appendChild(Cr.createTextNode(" ")),
                        k && (P === 0 && (W.style.top = w._y + "px",
                            W.style.left = l + J + "px"),
                            w.style.top = "0px",
                            J && (w.style.left = w._x - J + "px")));
                z === 0 ? W.innerHTML = "&nbsp;" : !T && !b && (Df(W),
                    Fa(W, String.fromCharCode(160), " ")),
                    k && (W.style.width = xt,
                        W.style.height = w._h + "px"),
                    t.appendChild(W)
            }
            t.style.cssText = Z
        }
        k && (o > t.clientHeight && (t.style.height = o - c + "px",
            t.clientHeight < o && (t.style.height = o + p + "px")),
            s > t.clientWidth && (t.style.width = s - _ + "px",
                t.clientWidth < s && (t.style.width = s + h + "px"))),
            I && (Y ? t.style.display = Y : t.style.removeProperty("display")),
            ao(e, C),
            T && ao(r, x),
            ao(n, F)
    }, mf = function (t, i, e, r) {
        var n = i.tag ? i.tag : i.span ? "span" : "div", s = i.type || i.split || "chars,words,lines", o = ~s.indexOf("chars"), a = uo(i), l = i.wordDelimiter || " ", f = l !== " " ? "" : a ? "&#173; " : " ", p = "</" + n + ">", h = 1, c = i.specialChars ? typeof i.specialChars == "function" ? i.specialChars : pf : null, _, d, g, C, x, F, m, E, S = Cr.createElement("div"), y = t.parentNode;
        for (y.insertBefore(S, t),
            S.textContent = t.nodeValue,
            y.removeChild(t),
            t = S,
            _ = ga(t),
            m = _.indexOf("<") !== -1,
            i.reduceWhiteSpace !== !1 && (_ = _.replace(df, " ").replace(hf, "")),
            m && (_ = _.split("<").join("{{LT}}")),
            x = _.length,
            d = (_.charAt(0) === " " ? f : "") + e(),
            g = 0; g < x; g++)
            if (F = _.charAt(g),
                c && (E = c(_.substr(g), i.specialChars)))
                F = _.substr(g, E || 1),
                    d += o && F !== " " ? r() + F + "</" + n + ">" : F,
                    g += E - 1;
            else if (F === l && _.charAt(g - 1) !== l && g) {
                for (d += h ? p : "",
                    h = 0; _.charAt(g + 1) === l;)
                    d += f,
                        g++;
                g === x - 1 ? d += f : _.charAt(g + 1) !== ")" && (d += f + e(),
                    h = 1)
            } else
                F === "{" && _.substr(g, 6) === "{{LT}}" ? (d += o ? r() + "{{LT}}</" + n + ">" : "{{LT}}",
                    g += 5) : F.charCodeAt(0) >= 55296 && F.charCodeAt(0) <= 56319 || _.charCodeAt(g + 1) >= 65024 && _.charCodeAt(g + 1) <= 65039 ? (C = ((_.substr(g, 12).split(cf) || [])[1] || "").length || 2,
                        d += o && F !== " " ? r() + _.substr(g, C) + "</" + n + ">" : _.substr(g, C),
                        g += C - 1) : d += o && F !== " " ? r() + F + "</" + n + ">" : F;
        t.outerHTML = d + (h ? p : ""),
            m && Fa(y, "{{LT}}", "<")
    }, yf = function u(t, i, e, r) {
        var n = Un(t.childNodes), s = n.length, o = uo(i), a, l;
        if (t.nodeType !== 3 || s > 1) {
            for (i.absolute = !1,
                a = 0; a < s; a++)
                l = n[a],
                    l._next = l._isFirst = l._parent = l._wordEnd = null,
                    (l.nodeType !== 3 || /\S+/.test(l.nodeValue)) && (o && l.nodeType !== 3 && Ca(l).display === "inline" && (l.style.display = "inline-block",
                        l.style.position = "relative"),
                        l._isSplit = !0,
                        u(l, i, e, r));
            i.absolute = o,
                t._isSplit = !0;
            return
        }
        mf(t, i, e, r)
    }, Hn = function () {
        function u(i, e) {
            ma || va(),
                this.elements = Un(i),
                this.chars = [],
                this.words = [],
                this.lines = [],
                this._originals = [],
                this.vars = e || {},
                ya(this),
                this.split(e)
        }
        var t = u.prototype;
        return t.split = function (e) {
            this.isSplit && this.revert(),
                this.vars = e = e || this.vars,
                this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
            for (var r = this.elements.length, n = e.tag ? e.tag : e.span ? "span" : "div", s = xa(e.wordsClass, n), o = xa(e.charsClass, n), a, l, f; --r > -1;)
                f = this.elements[r],
                    this._originals[r] = f.innerHTML,
                    a = f.clientHeight,
                    l = f.clientWidth,
                    yf(f, e, s, o),
                    gf(f, e, this.chars, this.words, this.lines, l, a);
            return this.chars.reverse(),
                this.words.reverse(),
                this.lines.reverse(),
                this.isSplit = !0,
                this
        }
            ,
            t.revert = function () {
                var e = this._originals;
                if (!e)
                    throw "revert() call wasn't scoped properly.";
                return this.elements.forEach(function (r, n) {
                    return r.innerHTML = e[n]
                }),
                    this.chars = [],
                    this.words = [],
                    this.lines = [],
                    this.isSplit = !1,
                    this
            }
            ,
            u.create = function (e, r) {
                return new u(e, r)
            }
            ,
            u
    }();
    Hn.version = "3.12.2",
        Hn.register = va;
    function wa(u, t) {
        for (var i = 0; i < t.length; i++) {
            var e = t[i];
            e.enumerable = e.enumerable || !1,
                e.configurable = !0,
                "value" in e && (e.writable = !0),
                Object.defineProperty(u, typeof (r = function (n, s) {
                    if (typeof n != "object" || n === null)
                        return n;
                    var o = n[Symbol.toPrimitive];
                    if (o !== void 0) {
                        var a = o.call(n, "string");
                        if (typeof a != "object")
                            return a;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(n)
                }(e.key)) == "symbol" ? r : String(r), e)
        }
        var r
    }
    function ba(u, t, i) {
        return t && wa(u.prototype, t),
            i && wa(u, i),
            Object.defineProperty(u, "prototype", {
                writable: !1
            }),
            u
    }
    function lo() {
        return lo = Object.assign ? Object.assign.bind() : function (u) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var e in i)
                    Object.prototype.hasOwnProperty.call(i, e) && (u[e] = i[e])
            }
            return u
        }
            ,
            lo.apply(this, arguments)
    }
    function $n(u, t, i) {
        return Math.max(u, Math.min(t, i))
    }
    var vf = function () {
        function u() { }
        var t = u.prototype;
        return t.advance = function (i) {
            var e, r, n, s;
            if (this.isRunning) {
                var o = !1;
                if (this.lerp)
                    this.value = (r = this.value,
                        n = this.to,
                        (1 - (s = 1 - Math.exp(-60 * this.lerp * i))) * r + s * n),
                        Math.round(this.value) === this.to && (this.value = this.to,
                            o = !0);
                else {
                    this.currentTime += i;
                    var a = $n(0, this.currentTime / this.duration, 1)
                        , l = (o = a >= 1) ? 1 : this.easing(a);
                    this.value = this.from + (this.to - this.from) * l
                }
                (e = this.onUpdate) == null || e.call(this, this.value, o),
                    o && this.stop()
            }
        }
            ,
            t.stop = function () {
                this.isRunning = !1
            }
            ,
            t.fromTo = function (i, e, r) {
                var n = r.lerp
                    , s = n === void 0 ? .1 : n
                    , o = r.duration
                    , a = o === void 0 ? 1 : o
                    , l = r.easing
                    , f = l === void 0 ? function (c) {
                        return c
                    }
                        : l
                    , p = r.onStart
                    , h = r.onUpdate;
                this.from = this.value = i,
                    this.to = e,
                    this.lerp = s,
                    this.duration = a,
                    this.easing = f,
                    this.currentTime = 0,
                    this.isRunning = !0,
                    p == null || p(),
                    this.onUpdate = h
            }
            ,
            u
    }()
        , Cf = function () {
            function u(t) {
                var i, e, r = this, n = t === void 0 ? {} : t, s = n.wrapper, o = n.content, a = n.autoResize, l = a === void 0 || a;
                if (this.resize = function () {
                    r.onWrapperResize(),
                        r.onContentResize()
                }
                    ,
                    this.onWrapperResize = function () {
                        r.wrapper === window ? (r.width = window.innerWidth,
                            r.height = window.innerHeight) : (r.width = r.wrapper.clientWidth,
                                r.height = r.wrapper.clientHeight)
                    }
                    ,
                    this.onContentResize = function () {
                        r.scrollHeight = r.content.scrollHeight,
                            r.scrollWidth = r.content.scrollWidth
                    }
                    ,
                    this.wrapper = s,
                    this.content = o,
                    l) {
                    var f = (i = this.resize,
                        function () {
                            var p = arguments
                                , h = this;
                            clearTimeout(e),
                                e = setTimeout(function () {
                                    i.apply(h, p)
                                }, 250)
                        }
                    );
                    this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(f),
                        this.wrapperResizeObserver.observe(this.wrapper)),
                        this.contentResizeObserver = new ResizeObserver(f),
                        this.contentResizeObserver.observe(this.content)
                }
                this.resize()
            }
            return u.prototype.destroy = function () {
                var t, i;
                (t = this.wrapperResizeObserver) == null || t.disconnect(),
                    (i = this.contentResizeObserver) == null || i.disconnect()
            }
                ,
                ba(u, [{
                    key: "limit",
                    get: function () {
                        return {
                            x: this.scrollWidth - this.width,
                            y: this.scrollHeight - this.height
                        }
                    }
                }]),
                u
        }()
        , Ta = function () {
            function u() {
                this.events = {}
            }
            var t = u.prototype;
            return t.emit = function (i) {
                for (var e = this.events[i] || [], r = 0, n = e.length; r < n; r++)
                    e[r].apply(e, [].slice.call(arguments, 1))
            }
                ,
                t.on = function (i, e) {
                    var r, n = this;
                    return ((r = this.events[i]) == null ? void 0 : r.push(e)) || (this.events[i] = [e]),
                        function () {
                            var s;
                            n.events[i] = (s = n.events[i]) == null ? void 0 : s.filter(function (o) {
                                return e !== o
                            })
                        }
                }
                ,
                t.off = function (i, e) {
                    var r;
                    this.events[i] = (r = this.events[i]) == null ? void 0 : r.filter(function (n) {
                        return e !== n
                    })
                }
                ,
                t.destroy = function () {
                    this.events = {}
                }
                ,
                u
        }()
        , xf = function () {
            function u(i, e) {
                var r = this
                    , n = e.wheelMultiplier
                    , s = n === void 0 ? 1 : n
                    , o = e.touchMultiplier
                    , a = o === void 0 ? 2 : o
                    , l = e.normalizeWheel
                    , f = l !== void 0 && l;
                this.onTouchStart = function (p) {
                    var h = p.targetTouches ? p.targetTouches[0] : p
                        , c = h.clientY;
                    r.touchStart.x = h.clientX,
                        r.touchStart.y = c,
                        r.lastDelta = {
                            x: 0,
                            y: 0
                        }
                }
                    ,
                    this.onTouchMove = function (p) {
                        var h = p.targetTouches ? p.targetTouches[0] : p
                            , c = h.clientX
                            , _ = h.clientY
                            , d = -(c - r.touchStart.x) * r.touchMultiplier
                            , g = -(_ - r.touchStart.y) * r.touchMultiplier;
                        r.touchStart.x = c,
                            r.touchStart.y = _,
                            r.lastDelta = {
                                x: d,
                                y: g
                            },
                            r.emitter.emit("scroll", {
                                deltaX: d,
                                deltaY: g,
                                event: p
                            })
                    }
                    ,
                    this.onTouchEnd = function (p) {
                        r.emitter.emit("scroll", {
                            deltaX: r.lastDelta.x,
                            deltaY: r.lastDelta.y,
                            event: p
                        })
                    }
                    ,
                    this.onWheel = function (p) {
                        var h = p.deltaX
                            , c = p.deltaY;
                        r.normalizeWheel && (h = $n(-100, h, 100),
                            c = $n(-100, c, 100)),
                            r.emitter.emit("scroll", {
                                deltaX: h *= r.wheelMultiplier,
                                deltaY: c *= r.wheelMultiplier,
                                event: p
                            })
                    }
                    ,
                    this.element = i,
                    this.wheelMultiplier = s,
                    this.touchMultiplier = a,
                    this.normalizeWheel = f,
                    this.touchStart = {
                        x: null,
                        y: null
                    },
                    this.emitter = new Ta,
                    this.element.addEventListener("wheel", this.onWheel, {
                        passive: !1
                    }),
                    this.element.addEventListener("touchstart", this.onTouchStart, {
                        passive: !1
                    }),
                    this.element.addEventListener("touchmove", this.onTouchMove, {
                        passive: !1
                    }),
                    this.element.addEventListener("touchend", this.onTouchEnd, {
                        passive: !1
                    })
            }
            var t = u.prototype;
            return t.on = function (i, e) {
                return this.emitter.on(i, e)
            }
                ,
                t.destroy = function () {
                    this.emitter.destroy(),
                        this.element.removeEventListener("wheel", this.onWheel, {
                            passive: !1
                        }),
                        this.element.removeEventListener("touchstart", this.onTouchStart, {
                            passive: !1
                        }),
                        this.element.removeEventListener("touchmove", this.onTouchMove, {
                            passive: !1
                        }),
                        this.element.removeEventListener("touchend", this.onTouchEnd, {
                            passive: !1
                        })
                }
                ,
                u
        }()
        , Ff = function () {
            function u(i) {
                var e = this
                    , r = i === void 0 ? {} : i
                    , n = r.wrapper
                    , s = n === void 0 ? window : n
                    , o = r.content
                    , a = o === void 0 ? document.documentElement : o
                    , l = r.wheelEventsTarget
                    , f = l === void 0 ? s : l
                    , p = r.eventsTarget
                    , h = p === void 0 ? f : p
                    , c = r.smoothWheel
                    , _ = c === void 0 || c
                    , d = r.smoothTouch
                    , g = d !== void 0 && d
                    , C = r.syncTouch
                    , x = C !== void 0 && C
                    , F = r.syncTouchLerp
                    , m = F === void 0 ? .1 : F
                    , E = r.__iosNoInertiaSyncTouchLerp
                    , S = E === void 0 ? .4 : E
                    , y = r.touchInertiaMultiplier
                    , T = y === void 0 ? 35 : y
                    , b = r.duration
                    , k = r.easing
                    , B = k === void 0 ? function (dt) {
                        return Math.min(1, 1.001 - Math.pow(2, -10 * dt))
                    }
                        : k
                    , A = r.lerp
                    , $ = A === void 0 ? !b && .1 : A
                    , I = r.infinite
                    , Y = I !== void 0 && I
                    , M = r.orientation
                    , P = M === void 0 ? "vertical" : M
                    , z = r.gestureOrientation
                    , w = z === void 0 ? "vertical" : z
                    , D = r.touchMultiplier
                    , U = D === void 0 ? 1 : D
                    , ut = r.wheelMultiplier
                    , Xt = ut === void 0 ? 1 : ut
                    , Z = r.normalizeWheel
                    , W = Z !== void 0 && Z
                    , xt = r.autoResize
                    , J = xt === void 0 || xt;
                this.onVirtualScroll = function (dt) {
                    var mt = dt.deltaX
                        , se = dt.deltaY
                        , yt = dt.event;
                    if (!yt.ctrlKey) {
                        var jt = yt.type.includes("touch")
                            , Q = yt.type.includes("wheel");
                        if (!(e.options.gestureOrientation === "both" && mt === 0 && se === 0 || e.options.gestureOrientation === "vertical" && se === 0 || e.options.gestureOrientation === "horizontal" && mt === 0 || jt && e.options.gestureOrientation === "vertical" && e.scroll === 0 && !e.options.infinite && se <= 0)) {
                            var lt = yt.composedPath();
                            if (!(lt = lt.slice(0, lt.indexOf(e.rootElement))).find(function (Ft) {
                                var Be;
                                return (Ft.hasAttribute == null ? void 0 : Ft.hasAttribute("data-lenis-prevent")) || jt && (Ft.hasAttribute == null ? void 0 : Ft.hasAttribute("data-lenis-prevent-touch")) || Q && (Ft.hasAttribute == null ? void 0 : Ft.hasAttribute("data-lenis-prevent-wheel")) || ((Be = Ft.classList) == null ? void 0 : Be.contains("lenis"))
                            }))
                                if (e.isStopped || e.isLocked)
                                    yt.preventDefault();
                                else {
                                    if (e.isSmooth = (e.options.smoothTouch || e.options.syncTouch) && jt || e.options.smoothWheel && Q,
                                        !e.isSmooth)
                                        return e.isScrolling = !1,
                                            void e.animate.stop();
                                    yt.preventDefault();
                                    var kt = se;
                                    e.options.gestureOrientation === "both" ? kt = Math.abs(se) > Math.abs(mt) ? se : mt : e.options.gestureOrientation === "horizontal" && (kt = mt);
                                    var oe = jt && e.options.syncTouch
                                        , v = jt && yt.type === "touchend" && Math.abs(kt) > 1;
                                    v && (kt = e.velocity * e.options.touchInertiaMultiplier),
                                        e.scrollTo(e.targetScroll + kt, lo({
                                            programmatic: !1
                                        }, oe && {
                                            lerp: v ? e.syncTouchLerp : e.options.__iosNoInertiaSyncTouchLerp
                                        }))
                                }
                        }
                    }
                }
                    ,
                    this.onScroll = function () {
                        if (!e.isScrolling) {
                            var dt = e.animatedScroll;
                            e.animatedScroll = e.targetScroll = e.actualScroll,
                                e.velocity = 0,
                                e.direction = Math.sign(e.animatedScroll - dt),
                                e.emit()
                        }
                    }
                    ,
                    window.lenisVersion = "1.0.27",
                    s !== document.documentElement && s !== document.body || (s = window),
                    this.options = {
                        wrapper: s,
                        content: a,
                        wheelEventsTarget: f,
                        eventsTarget: h,
                        smoothWheel: _,
                        smoothTouch: g,
                        syncTouch: x,
                        syncTouchLerp: m,
                        __iosNoInertiaSyncTouchLerp: S,
                        touchInertiaMultiplier: T,
                        duration: b,
                        easing: B,
                        lerp: $,
                        infinite: Y,
                        gestureOrientation: w,
                        orientation: P,
                        touchMultiplier: U,
                        wheelMultiplier: Xt,
                        normalizeWheel: W,
                        autoResize: J
                    },
                    this.animate = new vf,
                    this.emitter = new Ta,
                    this.dimensions = new Cf({
                        wrapper: s,
                        content: a,
                        autoResize: J
                    }),
                    this.toggleClass("lenis", !0),
                    this.velocity = 0,
                    this.isLocked = !1,
                    this.isStopped = !1,
                    this.isSmooth = x || _ || g,
                    this.isScrolling = !1,
                    this.targetScroll = this.animatedScroll = this.actualScroll,
                    this.options.wrapper.addEventListener("scroll", this.onScroll, {
                        passive: !1
                    }),
                    this.virtualScroll = new xf(h, {
                        touchMultiplier: U,
                        wheelMultiplier: Xt,
                        normalizeWheel: W
                    }),
                    this.virtualScroll.on("scroll", this.onVirtualScroll)
            }
            var t = u.prototype;
            return t.destroy = function () {
                this.emitter.destroy(),
                    this.options.wrapper.removeEventListener("scroll", this.onScroll, {
                        passive: !1
                    }),
                    this.virtualScroll.destroy(),
                    this.dimensions.destroy(),
                    this.toggleClass("lenis", !1),
                    this.toggleClass("lenis-smooth", !1),
                    this.toggleClass("lenis-scrolling", !1),
                    this.toggleClass("lenis-stopped", !1),
                    this.toggleClass("lenis-locked", !1)
            }
                ,
                t.on = function (i, e) {
                    return this.emitter.on(i, e)
                }
                ,
                t.off = function (i, e) {
                    return this.emitter.off(i, e)
                }
                ,
                t.setScroll = function (i) {
                    this.isHorizontal ? this.rootElement.scrollLeft = i : this.rootElement.scrollTop = i
                }
                ,
                t.resize = function () {
                    this.dimensions.resize()
                }
                ,
                t.emit = function () {
                    this.emitter.emit("scroll", this)
                }
                ,
                t.reset = function () {
                    this.isLocked = !1,
                        this.isScrolling = !1,
                        this.velocity = 0,
                        this.animate.stop()
                }
                ,
                t.start = function () {
                    this.isStopped = !1,
                        this.reset()
                }
                ,
                t.stop = function () {
                    this.isStopped = !0,
                        this.animate.stop(),
                        this.reset()
                }
                ,
                t.raf = function (i) {
                    var e = i - (this.time || i);
                    this.time = i,
                        this.animate.advance(.001 * e)
                }
                ,
                t.scrollTo = function (i, e) {
                    var r = this
                        , n = e === void 0 ? {} : e
                        , s = n.offset
                        , o = s === void 0 ? 0 : s
                        , a = n.immediate
                        , l = a !== void 0 && a
                        , f = n.lock
                        , p = f !== void 0 && f
                        , h = n.duration
                        , c = h === void 0 ? this.options.duration : h
                        , _ = n.easing
                        , d = _ === void 0 ? this.options.easing : _
                        , g = n.lerp
                        , C = g === void 0 ? !c && this.options.lerp : g
                        , x = n.onComplete
                        , F = x === void 0 ? null : x
                        , m = n.force
                        , E = n.programmatic
                        , S = E === void 0 || E;
                    if (!this.isStopped && !this.isLocked || m !== void 0 && m) {
                        if (["top", "left", "start"].includes(i))
                            i = 0;
                        else if (["bottom", "right", "end"].includes(i))
                            i = this.limit;
                        else {
                            var y, T;
                            if (typeof i == "string" ? T = document.querySelector(i) : (y = i) != null && y.nodeType && (T = i),
                                T) {
                                if (this.options.wrapper !== window) {
                                    var b = this.options.wrapper.getBoundingClientRect();
                                    o -= this.isHorizontal ? b.left : b.top
                                }
                                var k = T.getBoundingClientRect();
                                i = (this.isHorizontal ? k.left : k.top) + this.animatedScroll
                            }
                        }
                        if (typeof i == "number") {
                            if (i += o,
                                i = Math.round(i),
                                this.options.infinite ? S && (this.targetScroll = this.animatedScroll = this.scroll) : i = $n(0, i, this.limit),
                                l)
                                return this.animatedScroll = this.targetScroll = i,
                                    this.setScroll(this.scroll),
                                    this.reset(),
                                    void (F == null || F(this));
                            if (!S) {
                                if (i === this.targetScroll)
                                    return;
                                this.targetScroll = i
                            }
                            this.animate.fromTo(this.animatedScroll, i, {
                                duration: c,
                                easing: d,
                                lerp: C,
                                onStart: function () {
                                    p && (r.isLocked = !0),
                                        r.isScrolling = !0
                                },
                                onUpdate: function (B, A) {
                                    r.isScrolling = !0,
                                        r.velocity = B - r.animatedScroll,
                                        r.direction = Math.sign(r.velocity),
                                        r.animatedScroll = B,
                                        r.setScroll(r.scroll),
                                        S && (r.targetScroll = B),
                                        A || r.emit(),
                                        A && requestAnimationFrame(function () {
                                            r.reset(),
                                                r.emit(),
                                                F == null || F(r)
                                        })
                                }
                            })
                        }
                    }
                }
                ,
                t.toggleClass = function (i, e) {
                    this.rootElement.classList.toggle(i, e),
                        this.emitter.emit("className change", this)
                }
                ,
                ba(u, [{
                    key: "rootElement",
                    get: function () {
                        return this.options.wrapper === window ? this.options.content : this.options.wrapper
                    }
                }, {
                    key: "limit",
                    get: function () {
                        return this.dimensions.limit[this.isHorizontal ? "x" : "y"]
                    }
                }, {
                    key: "isHorizontal",
                    get: function () {
                        return this.options.orientation === "horizontal"
                    }
                }, {
                    key: "actualScroll",
                    get: function () {
                        return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
                    }
                }, {
                    key: "scroll",
                    get: function () {
                        return this.options.infinite ? (this.animatedScroll % (i = this.limit) + i) % i : this.animatedScroll;
                        var i
                    }
                }, {
                    key: "progress",
                    get: function () {
                        return this.limit === 0 ? 1 : this.scroll / this.limit
                    }
                }, {
                    key: "isSmooth",
                    get: function () {
                        return this.__isSmooth
                    },
                    set: function (i) {
                        this.__isSmooth !== i && (this.__isSmooth = i,
                            this.toggleClass("lenis-smooth", i))
                    }
                }, {
                    key: "isScrolling",
                    get: function () {
                        return this.__isScrolling
                    },
                    set: function (i) {
                        this.__isScrolling !== i && (this.__isScrolling = i,
                            this.toggleClass("lenis-scrolling", i))
                    }
                }, {
                    key: "isStopped",
                    get: function () {
                        return this.__isStopped
                    },
                    set: function (i) {
                        this.__isStopped !== i && (this.__isStopped = i,
                            this.toggleClass("lenis-stopped", i))
                    }
                }, {
                    key: "isLocked",
                    get: function () {
                        return this.__isLocked
                    },
                    set: function (i) {
                        this.__isLocked !== i && (this.__isLocked = i,
                            this.toggleClass("lenis-locked", i))
                    }
                }, {
                    key: "className",
                    get: function () {
                        var i = "lenis";
                        return this.isStopped && (i += " lenis-stopped"),
                            this.isLocked && (i += " lenis-locked"),
                            this.isScrolling && (i += " lenis-scrolling"),
                            this.isSmooth && (i += " lenis-smooth"),
                            i
                    }
                }]),
                u
        }();
    Nt.registerPlugin(G, Hn);
    const Ef = new Ff({
        easing: u => u === 1 ? 1 : 1 - Math.pow(2, -10 * u),
        syncTouch: !1,
        lerp: .06
    });
    function Sa(u) {
        Ef.raf(u),
            requestAnimationFrame(Sa)
    }
    requestAnimationFrame(Sa);
    function wf() {
        Nt.to("[loader-num]", {
            innerText: 33,
            duration: 1.5,
            snap: "innerText"
        }),
            Nt.to("[loader-bar]", {
                width: "33%",
                duration: 1.5
            }, "0"),
            Nt.to("[loader-bar]", {
                width: "100%",
                duration: 2.5,
                delay: .5
            }, ">"),
            Nt.to("[loader-num]", {
                innerText: 100,
                duration: 2.5,
                snap: "innerText"
            }, "<"),
            Nt.to("[loader-counter]", {
                opacity: 0,
                y: "-100%",
                duration: .5,
                ease: "power3.in"
            }, ">"),
            Nt.to("[loader]", {
                y: "-100%",
                display: "none",
                duration: 1,
                delay: .1,
                ease: "power3.inOut"
            }, "<"),
            Nt.to("#sound-btn", {
                opacity: 1,
                display: "block",
                duration: .7
            }, ">"),
            Nt.to("#enable-sound", {
                opacity: 1,
                duration: .5,
                onComplete: () => {
                    document.addEventListener("click", ka)
                }
            }, "<")
    }
    setTimeout(wf, 300);
    function ka() {
        Nt.to("#enable-sound", {
            opacity: 0,
            duration: .3
        }),
            document.querySelector("[audio-toggle]").click(),
            document.removeEventListener("click", ka)
    }
    function bf() {
        document.querySelectorAll("[scrollanimation]").forEach(u => {
            Nt.to(u, {
                opacity: 1,
                y: 0,
                delay: (t, i) => i.getAttribute("scrollanimation") || 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: u,
                    start: "top 80%",
                    toggleActions: "play pause resume reverse"
                }
            })
        }
        )
    }
    bf();
    function Tf() {
        Nt.matchMedia().add("(min-width: 768px)", () => {
            const t = document.querySelector("#hero-video video")
                , i = Nt.timeline({
                    scrollTrigger: {
                        trigger: ".c-video-section",
                        start: "top top",
                        end: "bottom top",
                        markers: !1,
                        scrub: !0
                    }
                });
            i.fromTo(".c-video-grid", {
                gap: 0
            }, {
                gap: "0.875em",
                duration: .1
            }, .2),
                i.fromTo("#hero-video", {
                    opacity: 1,
                    display: "flex"
                }, {
                    opacity: 0,
                    display: "none",
                    duration: .1,
                    onComplete: () => {
                        t.pause()
                    }
                }, .2),
                i.fromTo(".c-card_backface", {
                    borderRadius: 0
                }, {
                    borderRadius: "1.5em",
                    duration: .1
                }, .2),
                i.fromTo(".c-video-grid", {
                    borderRadius: "1.5em",
                    overflow: "hidden"
                }, {
                    borderRadius: "0",
                    overflow: "visible",
                    duration: .3
                }, ">"),
                i.to(".c-card_frontface", {
                    rotateY: "0deg",
                    stagger: {
                        amount: .1,
                        from: "edges"
                    }
                }, ">"),
                i.to(".c-card_backface", {
                    rotateY: "-180deg",
                    stagger: {
                        amount: .1,
                        from: "edges"
                    }
                }, "<"),
                i.to(".c-video-card:nth-child(1)", {
                    x: "5em",
                    y: "10em",
                    rotateY: "20deg",
                    rotateX: "5deg",
                    rotateZ: "-20deg"
                }),
                i.to(".c-video-card:nth-child(2)", {
                    zIndex: 10,
                    x: "5em",
                    y: "-10em",
                    rotateY: "-15deg",
                    rotateX: "-3deg",
                    rotateZ: "10deg"
                }, "<"),
                i.to(".c-video-card:nth-child(3)", {
                    x: "-3em",
                    y: "5em",
                    rotateY: "10deg",
                    rotateX: "-3deg",
                    rotateZ: "15deg"
                }, "<"),
                i.fromTo("[card-light]", {
                    opacity: 0
                }, {
                    opacity: .2,
                    duration: 1
                }, 0)
        }
        )
    }
    Tf();
    function Sf() {
        new Hn("[split-text-words]", {
            type: "words",
            wordsClass: "word"
        }),
            Nt.from("[split-text-words] .word", {
                opacity: 0,
                y: "20px",
                duration: 1,
                ease: "power3.out",
                stagger: .05,
                scrollTrigger: {
                    trigger: "[split-text-words]",
                    start: "top 80%",
                    toggleActions: "play pause resume reverse",
                    markers: !1
                }
            })
    }
    Sf(),
        document.getElementById("video-poster").addEventListener("click", kf);
    function kf(u) {
        Nt.to("#video-button, #video-poster", {
            display: "none",
            opacity: 0,
            ease: "power3.out",
            duration: .5
        }),
            Nt.to("[video-embed]", {
                display: "flex",
                opacity: 1,
                ease: "power3.out",
                duration: .5
            }),
            document.querySelector("audio").paused || document.getElementById("sound-btn").click();
        const t = document.querySelector("#hero-video video");
        t.src = t.getAttribute("data-source"),
            t.play()
    }
    const Aa = document.getElementById("footer")
        , Pa = document.getElementById("cursor");
    Aa.addEventListener("mouseenter", function () {
        Pa.style.backgroundColor = "#161618"
    }),
        Aa.addEventListener("mouseleave", function () {
            Pa.style.backgroundColor = "#ffffff"
        })
});
