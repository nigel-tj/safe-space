import {
  __spreadArray
} from "./chunk-24ZYNOED.js";

// node_modules/@ionic/core/dist/esm-es5/index-a5d50daf.js
var win = typeof window !== "undefined" ? window : void 0;
var doc = typeof document !== "undefined" ? document : void 0;

// node_modules/@ionic/core/dist/esm-es5/helpers-be245865.js
var componentOnReady = function(a, r) {
  if (a.componentOnReady) {
    a.componentOnReady().then(function(a2) {
      return r(a2);
    });
  } else {
    raf(function() {
      return r(a);
    });
  }
};
var raf = function(a) {
  if (typeof __zone_symbol__requestAnimationFrame === "function") {
    return __zone_symbol__requestAnimationFrame(a);
  }
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(a);
  }
  return setTimeout(a);
};

// node_modules/@ionic/core/dist/esm-es5/animation-6a0c5338.js
var animationPrefix;
var processKeyframes = function(n) {
  n.forEach(function(n2) {
    for (var r in n2) {
      if (n2.hasOwnProperty(r)) {
        var e = n2[r];
        if (r === "easing") {
          var t = "animation-timing-function";
          n2[t] = e;
          delete n2[r];
        } else {
          var t = convertCamelCaseToHypen(r);
          if (t !== r) {
            n2[t] = e;
            delete n2[r];
          }
        }
      }
    }
  });
  return n;
};
var convertCamelCaseToHypen = function(n) {
  return n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};
var getAnimationPrefix = function(n) {
  if (animationPrefix === void 0) {
    var r = n.style.animationName !== void 0;
    var e = n.style.webkitAnimationName !== void 0;
    animationPrefix = !r && e ? "-webkit-" : "";
  }
  return animationPrefix;
};
var setStyleProperty = function(n, r, e) {
  var t = r.startsWith("animation") ? getAnimationPrefix(n) : "";
  n.style.setProperty(t + r, e);
};
var removeStyleProperty = function(n, r) {
  var e = r.startsWith("animation") ? getAnimationPrefix(n) : "";
  n.style.removeProperty(e + r);
};
var animationEnd = function(n, r) {
  var e;
  var t = { passive: true };
  var i = function() {
    if (e) {
      e();
    }
  };
  var a = function(e2) {
    if (n === e2.target) {
      i();
      r(e2);
    }
  };
  if (n) {
    n.addEventListener("webkitAnimationEnd", a, t);
    n.addEventListener("animationend", a, t);
    e = function() {
      n.removeEventListener("webkitAnimationEnd", a, t);
      n.removeEventListener("animationend", a, t);
    };
  }
  return i;
};
var generateKeyframeRules = function(n) {
  if (n === void 0) {
    n = [];
  }
  return n.map(function(n2) {
    var r = n2.offset;
    var e = [];
    for (var t in n2) {
      if (n2.hasOwnProperty(t) && t !== "offset") {
        e.push("".concat(t, ": ").concat(n2[t], ";"));
      }
    }
    return "".concat(r * 100, "% { ").concat(e.join(" "), " }");
  }).join(" ");
};
var keyframeIds = [];
var generateKeyframeName = function(n) {
  var r = keyframeIds.indexOf(n);
  if (r < 0) {
    r = keyframeIds.push(n) - 1;
  }
  return "ion-animation-".concat(r);
};
var getStyleContainer = function(n) {
  var r = n.getRootNode !== void 0 ? n.getRootNode() : n;
  return r.head || r;
};
var createKeyframeStylesheet = function(n, r, e) {
  var t;
  var i = getStyleContainer(e);
  var a = getAnimationPrefix(e);
  var f = i.querySelector("#" + n);
  if (f) {
    return f;
  }
  var o = ((t = e.ownerDocument) !== null && t !== void 0 ? t : document).createElement("style");
  o.id = n;
  o.textContent = "@".concat(a, "keyframes ").concat(n, " { ").concat(r, " } @").concat(a, "keyframes ").concat(n, "-alt { ").concat(r, " }");
  i.appendChild(o);
  return o;
};
var addClassToArray = function(n, r) {
  if (n === void 0) {
    n = [];
  }
  if (r !== void 0) {
    var e = Array.isArray(r) ? r : [r];
    return __spreadArray(__spreadArray([], n, true), e, true);
  }
  return n;
};
var createAnimation = function(n) {
  var r;
  var e;
  var t;
  var i;
  var a;
  var f;
  var o = [];
  var u = [];
  var v = [];
  var l = false;
  var s;
  var c = {};
  var d = [];
  var y = [];
  var m = {};
  var p = 0;
  var S = false;
  var P = false;
  var g;
  var A;
  var C;
  var b;
  var T = true;
  var k = false;
  var E = true;
  var _;
  var x;
  var K = false;
  var h = n;
  var w = [];
  var I = [];
  var R = [];
  var F = [];
  var D = [];
  var W = [];
  var j = [];
  var H = [];
  var M = [];
  var N = [];
  var $ = [];
  var z = typeof AnimationEffect === "function" || win !== void 0 && typeof win.AnimationEffect === "function";
  var Z = typeof Element === "function" && typeof Element.prototype.animate === "function" && z;
  var q = 100;
  var B = function() {
    return $;
  };
  var G = function(n2) {
    D.forEach(function(r2) {
      r2.destroy(n2);
    });
    J(n2);
    F.length = 0;
    D.length = 0;
    o.length = 0;
    X();
    l = false;
    E = true;
    return x;
  };
  var J = function(n2) {
    Y();
    if (n2) {
      nn();
    }
  };
  var L = function() {
    S = false;
    P = false;
    E = true;
    A = void 0;
    C = void 0;
    b = void 0;
    p = 0;
    k = false;
    T = true;
    K = false;
  };
  var O = function() {
    return p !== 0 && !K;
  };
  var Q = function(n2, r2) {
    var e2 = r2.findIndex(function(r3) {
      return r3.c === n2;
    });
    if (e2 > -1) {
      r2.splice(e2, 1);
    }
  };
  var U = function(n2, r2) {
    R.push({ c: n2, o: r2 });
    return x;
  };
  var V = function(n2, r2) {
    var e2 = (r2 === null || r2 === void 0 ? void 0 : r2.oneTimeCallback) ? I : w;
    e2.push({ c: n2, o: r2 });
    return x;
  };
  var X = function() {
    w.length = 0;
    I.length = 0;
    return x;
  };
  var Y = function() {
    if (Z) {
      $.forEach(function(n3) {
        n3.cancel();
      });
      $.length = 0;
    } else {
      var n2 = F.slice();
      raf(function() {
        n2.forEach(function(n3) {
          removeStyleProperty(n3, "animation-name");
          removeStyleProperty(n3, "animation-duration");
          removeStyleProperty(n3, "animation-timing-function");
          removeStyleProperty(n3, "animation-iteration-count");
          removeStyleProperty(n3, "animation-delay");
          removeStyleProperty(n3, "animation-play-state");
          removeStyleProperty(n3, "animation-fill-mode");
          removeStyleProperty(n3, "animation-direction");
        });
      });
    }
  };
  var nn = function() {
    W.forEach(function(n2) {
      if (n2 === null || n2 === void 0 ? void 0 : n2.parentNode) {
        n2.parentNode.removeChild(n2);
      }
    });
    W.length = 0;
  };
  var rn = function(n2) {
    j.push(n2);
    return x;
  };
  var en = function(n2) {
    H.push(n2);
    return x;
  };
  var tn = function(n2) {
    M.push(n2);
    return x;
  };
  var an = function(n2) {
    N.push(n2);
    return x;
  };
  var fn = function(n2) {
    u = addClassToArray(u, n2);
    return x;
  };
  var on = function(n2) {
    v = addClassToArray(v, n2);
    return x;
  };
  var un = function(n2) {
    if (n2 === void 0) {
      n2 = {};
    }
    c = n2;
    return x;
  };
  var vn = function(n2) {
    if (n2 === void 0) {
      n2 = [];
    }
    for (var r2 = 0, e2 = n2; r2 < e2.length; r2++) {
      var t2 = e2[r2];
      c[t2] = "";
    }
    return x;
  };
  var ln = function(n2) {
    d = addClassToArray(d, n2);
    return x;
  };
  var sn = function(n2) {
    y = addClassToArray(y, n2);
    return x;
  };
  var cn = function(n2) {
    if (n2 === void 0) {
      n2 = {};
    }
    m = n2;
    return x;
  };
  var dn = function(n2) {
    if (n2 === void 0) {
      n2 = [];
    }
    for (var r2 = 0, e2 = n2; r2 < e2.length; r2++) {
      var t2 = e2[r2];
      m[t2] = "";
    }
    return x;
  };
  var yn = function() {
    if (a !== void 0) {
      return a;
    }
    if (s) {
      return s.getFill();
    }
    return "both";
  };
  var mn = function() {
    if (A !== void 0) {
      return A;
    }
    if (f !== void 0) {
      return f;
    }
    if (s) {
      return s.getDirection();
    }
    return "normal";
  };
  var pn = function() {
    if (S) {
      return "linear";
    }
    if (t !== void 0) {
      return t;
    }
    if (s) {
      return s.getEasing();
    }
    return "linear";
  };
  var Sn = function() {
    if (P) {
      return 0;
    }
    if (C !== void 0) {
      return C;
    }
    if (e !== void 0) {
      return e;
    }
    if (s) {
      return s.getDuration();
    }
    return 0;
  };
  var Pn = function() {
    if (i !== void 0) {
      return i;
    }
    if (s) {
      return s.getIterations();
    }
    return 1;
  };
  var gn = function() {
    if (b !== void 0) {
      return b;
    }
    if (r !== void 0) {
      return r;
    }
    if (s) {
      return s.getDelay();
    }
    return 0;
  };
  var An = function() {
    return o;
  };
  var Cn = function(n2) {
    f = n2;
    zn(true);
    return x;
  };
  var bn = function(n2) {
    a = n2;
    zn(true);
    return x;
  };
  var Tn = function(n2) {
    r = n2;
    zn(true);
    return x;
  };
  var kn = function(n2) {
    t = n2;
    zn(true);
    return x;
  };
  var En = function(n2) {
    if (!Z && n2 === 0) {
      n2 = 1;
    }
    e = n2;
    zn(true);
    return x;
  };
  var _n = function(n2) {
    i = n2;
    zn(true);
    return x;
  };
  var xn = function(n2) {
    s = n2;
    return x;
  };
  var Kn = function(n2) {
    if (n2 != null) {
      if (n2.nodeType === 1) {
        F.push(n2);
      } else if (n2.length >= 0) {
        for (var r2 = 0; r2 < n2.length; r2++) {
          F.push(n2[r2]);
        }
      } else {
        console.error("Invalid addElement value");
      }
    }
    return x;
  };
  var hn = function(n2) {
    if (n2 != null) {
      if (Array.isArray(n2)) {
        for (var r2 = 0, e2 = n2; r2 < e2.length; r2++) {
          var t2 = e2[r2];
          t2.parent(x);
          D.push(t2);
        }
      } else {
        n2.parent(x);
        D.push(n2);
      }
    }
    return x;
  };
  var wn = function(n2) {
    var r2 = o !== n2;
    o = n2;
    if (r2) {
      In(o);
    }
    return x;
  };
  var In = function(n2) {
    if (Z) {
      B().forEach(function(r2) {
        var e2 = r2.effect;
        if (e2.setKeyframes) {
          e2.setKeyframes(n2);
        } else {
          var t2 = new KeyframeEffect(e2.target, n2, e2.getTiming());
          r2.effect = t2;
        }
      });
    } else {
      Wn();
    }
  };
  var Rn = function() {
    j.forEach(function(n3) {
      return n3();
    });
    H.forEach(function(n3) {
      return n3();
    });
    var n2 = u;
    var r2 = v;
    var e2 = c;
    F.forEach(function(t2) {
      var i2 = t2.classList;
      n2.forEach(function(n3) {
        return i2.add(n3);
      });
      r2.forEach(function(n3) {
        return i2.remove(n3);
      });
      for (var a2 in e2) {
        if (e2.hasOwnProperty(a2)) {
          setStyleProperty(t2, a2, e2[a2]);
        }
      }
    });
  };
  var Fn = function() {
    On();
    M.forEach(function(n3) {
      return n3();
    });
    N.forEach(function(n3) {
      return n3();
    });
    var n2 = T ? 1 : 0;
    var r2 = d;
    var e2 = y;
    var t2 = m;
    F.forEach(function(n3) {
      var i2 = n3.classList;
      r2.forEach(function(n4) {
        return i2.add(n4);
      });
      e2.forEach(function(n4) {
        return i2.remove(n4);
      });
      for (var a2 in t2) {
        if (t2.hasOwnProperty(a2)) {
          setStyleProperty(n3, a2, t2[a2]);
        }
      }
    });
    C = void 0;
    A = void 0;
    b = void 0;
    w.forEach(function(r3) {
      return r3.c(n2, x);
    });
    I.forEach(function(r3) {
      return r3.c(n2, x);
    });
    I.length = 0;
    E = true;
    if (T) {
      k = true;
    }
    T = true;
  };
  var Dn = function() {
    if (p === 0) {
      return;
    }
    p--;
    if (p === 0) {
      Fn();
      if (s) {
        s.animationFinish();
      }
    }
  };
  var Wn = function(r2) {
    if (r2 === void 0) {
      r2 = true;
    }
    nn();
    var e2 = processKeyframes(o);
    F.forEach(function(t2) {
      if (e2.length > 0) {
        var i2 = generateKeyframeRules(e2);
        _ = n !== void 0 ? n : generateKeyframeName(i2);
        var a2 = createKeyframeStylesheet(_, i2, t2);
        W.push(a2);
        setStyleProperty(t2, "animation-duration", "".concat(Sn(), "ms"));
        setStyleProperty(t2, "animation-timing-function", pn());
        setStyleProperty(t2, "animation-delay", "".concat(gn(), "ms"));
        setStyleProperty(t2, "animation-fill-mode", yn());
        setStyleProperty(t2, "animation-direction", mn());
        var f2 = Pn() === Infinity ? "infinite" : Pn().toString();
        setStyleProperty(t2, "animation-iteration-count", f2);
        setStyleProperty(t2, "animation-play-state", "paused");
        if (r2) {
          setStyleProperty(t2, "animation-name", "".concat(a2.id, "-alt"));
        }
        raf(function() {
          setStyleProperty(t2, "animation-name", a2.id || null);
        });
      }
    });
  };
  var jn = function() {
    F.forEach(function(n2) {
      var r2 = n2.animate(o, { id: h, delay: gn(), duration: Sn(), easing: pn(), iterations: Pn(), fill: yn(), direction: mn() });
      r2.pause();
      $.push(r2);
    });
    if ($.length > 0) {
      $[0].onfinish = function() {
        Dn();
      };
    }
  };
  var Hn = function(n2) {
    if (n2 === void 0) {
      n2 = true;
    }
    Rn();
    if (o.length > 0) {
      if (Z) {
        jn();
      } else {
        Wn(n2);
      }
    }
    l = true;
  };
  var Mn = function(n2) {
    n2 = Math.min(Math.max(n2, 0), 0.9999);
    if (Z) {
      $.forEach(function(r3) {
        r3.currentTime = r3.effect.getComputedTiming().delay + Sn() * n2;
        r3.pause();
      });
    } else {
      var r2 = "-".concat(Sn() * n2, "ms");
      F.forEach(function(n3) {
        if (o.length > 0) {
          setStyleProperty(n3, "animation-delay", r2);
          setStyleProperty(n3, "animation-play-state", "paused");
        }
      });
    }
  };
  var Nn = function(n2) {
    $.forEach(function(n3) {
      n3.effect.updateTiming({ delay: gn(), duration: Sn(), easing: pn(), iterations: Pn(), fill: yn(), direction: mn() });
    });
    if (n2 !== void 0) {
      Mn(n2);
    }
  };
  var $n = function(n2, r2) {
    if (n2 === void 0) {
      n2 = true;
    }
    raf(function() {
      F.forEach(function(e2) {
        setStyleProperty(e2, "animation-name", _ || null);
        setStyleProperty(e2, "animation-duration", "".concat(Sn(), "ms"));
        setStyleProperty(e2, "animation-timing-function", pn());
        setStyleProperty(e2, "animation-delay", r2 !== void 0 ? "-".concat(r2 * Sn(), "ms") : "".concat(gn(), "ms"));
        setStyleProperty(e2, "animation-fill-mode", yn() || null);
        setStyleProperty(e2, "animation-direction", mn() || null);
        var t2 = Pn() === Infinity ? "infinite" : Pn().toString();
        setStyleProperty(e2, "animation-iteration-count", t2);
        if (n2) {
          setStyleProperty(e2, "animation-name", "".concat(_, "-alt"));
        }
        raf(function() {
          setStyleProperty(e2, "animation-name", _ || null);
        });
      });
    });
  };
  var zn = function(n2, r2, e2) {
    if (n2 === void 0) {
      n2 = false;
    }
    if (r2 === void 0) {
      r2 = true;
    }
    if (n2) {
      D.forEach(function(t2) {
        t2.update(n2, r2, e2);
      });
    }
    if (Z) {
      Nn(e2);
    } else {
      $n(r2, e2);
    }
    return x;
  };
  var Zn = function(n2, r2) {
    if (n2 === void 0) {
      n2 = false;
    }
    D.forEach(function(e2) {
      e2.progressStart(n2, r2);
    });
    Gn();
    S = n2;
    if (!l) {
      Hn();
    }
    zn(false, true, r2);
    return x;
  };
  var qn = function(n2) {
    D.forEach(function(r2) {
      r2.progressStep(n2);
    });
    Mn(n2);
    return x;
  };
  var Bn = function(n2, r2, e2) {
    S = false;
    D.forEach(function(t2) {
      t2.progressEnd(n2, r2, e2);
    });
    if (e2 !== void 0) {
      C = e2;
    }
    k = false;
    T = true;
    if (n2 === 0) {
      A = mn() === "reverse" ? "normal" : "reverse";
      if (A === "reverse") {
        T = false;
      }
      if (Z) {
        zn();
        Mn(1 - r2);
      } else {
        b = (1 - r2) * Sn() * -1;
        zn(false, false);
      }
    } else if (n2 === 1) {
      if (Z) {
        zn();
        Mn(r2);
      } else {
        b = r2 * Sn() * -1;
        zn(false, false);
      }
    }
    if (n2 !== void 0 && !s) {
      Yn();
    }
    return x;
  };
  var Gn = function() {
    if (l) {
      if (Z) {
        $.forEach(function(n2) {
          n2.pause();
        });
      } else {
        F.forEach(function(n2) {
          setStyleProperty(n2, "animation-play-state", "paused");
        });
      }
      K = true;
    }
  };
  var Jn = function() {
    D.forEach(function(n2) {
      n2.pause();
    });
    Gn();
    return x;
  };
  var Ln = function() {
    g = void 0;
    Dn();
  };
  var On = function() {
    if (g) {
      clearTimeout(g);
    }
  };
  var Qn = function() {
    On();
    raf(function() {
      F.forEach(function(n3) {
        if (o.length > 0) {
          setStyleProperty(n3, "animation-play-state", "running");
        }
      });
    });
    if (o.length === 0 || F.length === 0) {
      Dn();
    } else {
      var n2 = gn() || 0;
      var r2 = Sn() || 0;
      var e2 = Pn() || 1;
      if (isFinite(e2)) {
        g = setTimeout(Ln, n2 + r2 * e2 + q);
      }
      animationEnd(F[0], function() {
        On();
        raf(function() {
          Un();
          raf(Dn);
        });
      });
    }
  };
  var Un = function() {
    F.forEach(function(n2) {
      removeStyleProperty(n2, "animation-duration");
      removeStyleProperty(n2, "animation-delay");
      removeStyleProperty(n2, "animation-play-state");
    });
  };
  var Vn = function() {
    $.forEach(function(n2) {
      n2.play();
    });
    if (o.length === 0 || F.length === 0) {
      Dn();
    }
  };
  var Xn = function() {
    if (Z) {
      Mn(0);
      Nn();
    } else {
      $n();
    }
  };
  var Yn = function(n2) {
    return new Promise(function(r2) {
      if (n2 === null || n2 === void 0 ? void 0 : n2.sync) {
        P = true;
        V(function() {
          return P = false;
        }, { oneTimeCallback: true });
      }
      if (!l) {
        Hn();
      }
      if (k) {
        Xn();
        k = false;
      }
      if (E) {
        p = D.length + 1;
        E = false;
      }
      var e2 = function() {
        Q(t2, I);
        r2();
      };
      var t2 = function() {
        Q(e2, R);
        r2();
      };
      V(t2, { oneTimeCallback: true });
      U(e2, { oneTimeCallback: true });
      D.forEach(function(n3) {
        n3.play();
      });
      if (Z) {
        Vn();
      } else {
        Qn();
      }
      K = false;
    });
  };
  var nr = function() {
    D.forEach(function(n2) {
      n2.stop();
    });
    if (l) {
      Y();
      l = false;
    }
    L();
    R.forEach(function(n2) {
      return n2.c(0, x);
    });
    R.length = 0;
  };
  var rr = function(n2, r2) {
    var e2;
    var t2 = o[0];
    if (t2 !== void 0 && (t2.offset === void 0 || t2.offset === 0)) {
      t2[n2] = r2;
    } else {
      o = __spreadArray([(e2 = { offset: 0 }, e2[n2] = r2, e2)], o, true);
    }
    return x;
  };
  var er = function(n2, r2) {
    var e2;
    var t2 = o[o.length - 1];
    if (t2 !== void 0 && (t2.offset === void 0 || t2.offset === 1)) {
      t2[n2] = r2;
    } else {
      o = __spreadArray(__spreadArray([], o, true), [(e2 = { offset: 1 }, e2[n2] = r2, e2)], false);
    }
    return x;
  };
  var tr = function(n2, r2, e2) {
    return rr(n2, r2).to(n2, e2);
  };
  return x = { parentAnimation: s, elements: F, childAnimations: D, id: h, animationFinish: Dn, from: rr, to: er, fromTo: tr, parent: xn, play: Yn, pause: Jn, stop: nr, destroy: G, keyframes: wn, addAnimation: hn, addElement: Kn, update: zn, fill: bn, direction: Cn, iterations: _n, duration: En, easing: kn, delay: Tn, getWebAnimations: B, getKeyframes: An, getFill: yn, getDirection: mn, getDelay: gn, getIterations: Pn, getEasing: pn, getDuration: Sn, afterAddRead: tn, afterAddWrite: an, afterClearStyles: dn, afterStyles: cn, afterRemoveClass: sn, afterAddClass: ln, beforeAddRead: rn, beforeAddWrite: en, beforeClearStyles: vn, beforeStyles: un, beforeRemoveClass: on, beforeAddClass: fn, onFinish: V, isRunning: O, progressStart: Zn, progressStep: qn, progressEnd: Bn };
};

// node_modules/@ionic/core/dist/esm-es5/index-fae1515c.js
var getIonPageElement = function(n) {
  if (n.classList.contains("ion-page")) {
    return n;
  }
  var e = n.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");
  if (e) {
    return e;
  }
  return n;
};

export {
  doc,
  componentOnReady,
  createAnimation,
  getIonPageElement
};
/*! Bundled license information:

@ionic/core/dist/esm-es5/index-a5d50daf.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/helpers-be245865.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/animation-6a0c5338.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-fae1515c.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-ONGWA5TS.js.map
