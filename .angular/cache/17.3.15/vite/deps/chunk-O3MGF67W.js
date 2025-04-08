import {
  __awaiter,
  __extends,
  __generator,
  __spreadArray
} from "./chunk-24ZYNOED.js";

// node_modules/@ionic/core/dist/esm-es5/index-a1a47f01.js
var NAMESPACE = "ionic";
var BUILD = { allRenderFn: false, appendChildSlotFix: false, asyncLoading: true, asyncQueue: false, attachStyles: true, cloneNodeFix: false, cmpDidLoad: true, cmpDidRender: true, cmpDidUnload: false, cmpDidUpdate: true, cmpShouldUpdate: false, cmpWillLoad: true, cmpWillRender: true, cmpWillUpdate: false, connectedCallback: true, constructableCSS: true, cssAnnotations: true, devTools: false, disconnectedCallback: true, element: false, event: true, experimentalScopedSlotChanges: false, experimentalSlotFixes: false, formAssociated: false, hasRenderFn: true, hostListener: true, hostListenerTarget: true, hostListenerTargetBody: true, hostListenerTargetDocument: true, hostListenerTargetParent: false, hostListenerTargetWindow: true, hotModuleReplacement: false, hydrateClientSide: true, hydrateServerSide: false, hydratedAttribute: false, hydratedClass: true, initializeNextTick: false, invisiblePrehydration: true, isDebug: false, isDev: false, isTesting: false, lazyLoad: true, lifecycle: true, lifecycleDOMEvents: false, member: true, method: true, mode: true, observeAttribute: true, profile: false, prop: true, propBoolean: true, propMutable: true, propNumber: true, propString: true, reflect: true, scoped: true, scopedSlotTextContentFix: false, scriptDataOpts: false, shadowDelegatesFocus: true, shadowDom: true, slot: true, slotChildNodesFix: false, slotRelocation: true, state: true, style: true, svg: true, taskQueue: true, transformTagName: false, updatable: true, vdomAttribute: true, vdomClass: true, vdomFunctional: true, vdomKey: true, vdomListener: true, vdomPropOrAttr: true, vdomRef: true, vdomRender: true, vdomStyle: true, vdomText: true, vdomXlink: true, watchCallback: true };
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var queuePending = false;
var createTime = function(e, t) {
  if (t === void 0) {
    t = "";
  }
  {
    return function() {
      return;
    };
  }
};
var uniqueTime = function(e, t) {
  {
    return function() {
      return;
    };
  }
};
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var HYDRATE_ID = "s-id";
var HYDRATED_STYLE_ID = "sty-id";
var HYDRATE_CHILD_ID = "c-id";
var HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var EMPTY_OBJ = {};
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var isDef = function(e) {
  return e != null;
};
var isComplexType = function(e) {
  e = typeof e;
  return e === "object" || e === "function";
};
function queryNonceMetaTagContent(e) {
  var t, r, n;
  return (n = (r = (t = e.head) === null || t === void 0 ? void 0 : t.querySelector('meta[name="csp-nonce"]')) === null || r === void 0 ? void 0 : r.getAttribute("content")) !== null && n !== void 0 ? n : void 0;
}
var h = function(e, t) {
  var r = [];
  for (var n = 2; n < arguments.length; n++) {
    r[n - 2] = arguments[n];
  }
  var a = null;
  var i = null;
  var o = null;
  var l = false;
  var s = false;
  var u = [];
  var f = function(t2) {
    for (var r2 = 0; r2 < t2.length; r2++) {
      a = t2[r2];
      if (Array.isArray(a)) {
        f(a);
      } else if (a != null && typeof a !== "boolean") {
        if (l = typeof e !== "function" && !isComplexType(a)) {
          a = String(a);
        }
        if (l && s) {
          u[u.length - 1].i += a;
        } else {
          u.push(l ? newVNode(null, a) : a);
        }
        s = l;
      }
    }
  };
  f(r);
  if (t) {
    if (t.key) {
      i = t.key;
    }
    if (t.name) {
      o = t.name;
    }
    {
      var c = t.className || t.class;
      if (c) {
        t.class = typeof c !== "object" ? c : Object.keys(c).filter(function(e2) {
          return c[e2];
        }).join(" ");
      }
    }
  }
  if (typeof e === "function") {
    return e(t === null ? {} : t, u, vdomFnUtils);
  }
  var v = newVNode(e, null);
  v.o = t;
  if (u.length > 0) {
    v.l = u;
  }
  {
    v.u = i;
  }
  {
    v.v = o;
  }
  return v;
};
var newVNode = function(e, t) {
  var r = { p: 0, m: e, i: t, h: null, l: null };
  {
    r.o = null;
  }
  {
    r.u = null;
  }
  {
    r.v = null;
  }
  return r;
};
var Host = {};
var isHost = function(e) {
  return e && e.m === Host;
};
var vdomFnUtils = { forEach: function(e, t) {
  return e.map(convertToPublic).forEach(t);
}, map: function(e, t) {
  return e.map(convertToPublic).map(t).map(convertToPrivate);
} };
var convertToPublic = function(e) {
  return { vattrs: e.o, vchildren: e.l, vkey: e.u, vname: e.v, vtag: e.m, vtext: e.i };
};
var convertToPrivate = function(e) {
  if (typeof e.vtag === "function") {
    var t = Object.assign({}, e.vattrs);
    if (e.vkey) {
      t.key = e.vkey;
    }
    if (e.vname) {
      t.name = e.vname;
    }
    return h.apply(void 0, __spreadArray([e.vtag, t], e.vchildren || [], false));
  }
  var r = newVNode(e.vtag, e.vtext);
  r.o = e.vattrs;
  r.l = e.vchildren;
  r.u = e.vkey;
  r.v = e.vname;
  return r;
};
var initializeClientHydrate = function(e, t, r, n) {
  var a = createTime("hydrateClient", t);
  var i = e.shadowRoot;
  var o = [];
  var l = [];
  var s = i ? [] : null;
  var u = n.S = newVNode(t, null);
  if (!plt.T) {
    initializeDocumentHydrate(doc.body, plt.T = /* @__PURE__ */ new Map());
  }
  e[HYDRATE_ID] = r;
  e.removeAttribute(HYDRATE_ID);
  clientHydrate(u, o, l, s, e, e, r);
  o.map(function(e2) {
    var r2 = e2._ + "." + e2.C;
    var n2 = plt.T.get(r2);
    var a2 = e2.h;
    if (n2 && supportsShadow && n2["s-en"] === "") {
      n2.parentNode.insertBefore(a2, n2.nextSibling);
    }
    if (!i) {
      a2["s-hn"] = t;
      if (n2) {
        a2["s-ol"] = n2;
        a2["s-ol"]["s-nr"] = a2;
      }
    }
    plt.T.delete(r2);
  });
  if (i) {
    s.map(function(e2) {
      if (e2) {
        i.appendChild(e2);
      }
    });
  }
  a();
};
var clientHydrate = function(e, t, r, n, a, i, o) {
  var l;
  var s;
  var u;
  var f;
  if (i.nodeType === 1) {
    l = i.getAttribute(HYDRATE_CHILD_ID);
    if (l) {
      s = l.split(".");
      if (s[0] === o || s[0] === "0") {
        u = { p: 0, _: s[0], C: s[1], R: s[2], $: s[3], m: i.tagName.toLowerCase(), h: i, o: null, l: null, u: null, v: null, i: null };
        t.push(u);
        i.removeAttribute(HYDRATE_CHILD_ID);
        if (!e.l) {
          e.l = [];
        }
        e.l[u.$] = u;
        e = u;
        if (n && u.R === "0") {
          n[u.$] = u.h;
        }
      }
    }
    for (f = i.childNodes.length - 1; f >= 0; f--) {
      clientHydrate(e, t, r, n, a, i.childNodes[f], o);
    }
    if (i.shadowRoot) {
      for (f = i.shadowRoot.childNodes.length - 1; f >= 0; f--) {
        clientHydrate(e, t, r, n, a, i.shadowRoot.childNodes[f], o);
      }
    }
  } else if (i.nodeType === 8) {
    s = i.nodeValue.split(".");
    if (s[1] === o || s[1] === "0") {
      l = s[0];
      u = { p: 0, _: s[1], C: s[2], R: s[3], $: s[4], h: i, o: null, l: null, u: null, v: null, m: null, i: null };
      if (l === TEXT_NODE_ID) {
        u.h = i.nextSibling;
        if (u.h && u.h.nodeType === 3) {
          u.i = u.h.textContent;
          t.push(u);
          i.remove();
          if (!e.l) {
            e.l = [];
          }
          e.l[u.$] = u;
          if (n && u.R === "0") {
            n[u.$] = u.h;
          }
        }
      } else if (u._ === o) {
        if (l === SLOT_NODE_ID) {
          u.m = "slot";
          if (s[5]) {
            i["s-sn"] = u.v = s[5];
          } else {
            i["s-sn"] = "";
          }
          i["s-sr"] = true;
          if (n) {
            u.h = doc.createElement(u.m);
            if (u.v) {
              u.h.setAttribute("name", u.v);
            }
            i.parentNode.insertBefore(u.h, i);
            i.remove();
            if (u.R === "0") {
              n[u.$] = u.h;
            }
          }
          r.push(u);
          if (!e.l) {
            e.l = [];
          }
          e.l[u.$] = u;
        } else if (l === CONTENT_REF_ID) {
          if (n) {
            i.remove();
          } else {
            a["s-cr"] = i;
            i["s-cn"] = true;
          }
        }
      }
    }
  } else if (e && e.m === "style") {
    var c = newVNode(null, i.textContent);
    c.h = i;
    c.$ = "0";
    e.l = [c];
  }
};
var initializeDocumentHydrate = function(e, t) {
  if (e.nodeType === 1) {
    var r = 0;
    for (; r < e.childNodes.length; r++) {
      initializeDocumentHydrate(e.childNodes[r], t);
    }
    if (e.shadowRoot) {
      for (r = 0; r < e.shadowRoot.childNodes.length; r++) {
        initializeDocumentHydrate(e.shadowRoot.childNodes[r], t);
      }
    }
  } else if (e.nodeType === 8) {
    var n = e.nodeValue.split(".");
    if (n[0] === ORG_LOCATION_ID) {
      t.set(n[1] + "." + n[2], e);
      e.nodeValue = "";
      e["s-en"] = n[3];
    }
  }
};
var computeMode = function(e) {
  return modeResolutionChain.map(function(t) {
    return t(e);
  }).find(function(e2) {
    return !!e2;
  });
};
var setMode = function(e) {
  return modeResolutionChain.push(e);
};
var getMode = function(e) {
  return getHostRef(e).N;
};
var parsePropertyValue = function(e, t) {
  if (e != null && !isComplexType(e)) {
    if (t & 4) {
      return e === "false" ? false : e === "" || !!e;
    }
    if (t & 2) {
      return parseFloat(e);
    }
    if (t & 1) {
      return String(e);
    }
    return e;
  }
  return e;
};
var emitEvent = function(e, t, r) {
  var n = plt.ce(t, r);
  e.dispatchEvent(n);
  return n;
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = function(e, t, r) {
  var n = styles.get(e);
  if (supportsConstructableStylesheets && r) {
    n = n || new CSSStyleSheet();
    if (typeof n === "string") {
      n = t;
    } else {
      n.replaceSync(t);
    }
  } else {
    n = t;
  }
  styles.set(e, n);
};
var addStyle = function(e, t, r) {
  var n;
  var a = getScopeId(t, r);
  var i = styles.get(a);
  e = e.nodeType === 11 ? e : doc;
  if (i) {
    if (typeof i === "string") {
      e = e.head || e;
      var o = rootAppliedStyles.get(e);
      var l = void 0;
      if (!o) {
        rootAppliedStyles.set(e, o = /* @__PURE__ */ new Set());
      }
      if (!o.has(a)) {
        if (e.host && (l = e.querySelector("[".concat(HYDRATED_STYLE_ID, '="').concat(a, '"]')))) {
          l.innerHTML = i;
        } else {
          l = doc.createElement("style");
          l.innerHTML = i;
          var s = (n = plt.D) !== null && n !== void 0 ? n : queryNonceMetaTagContent(doc);
          if (s != null) {
            l.setAttribute("nonce", s);
          }
          e.insertBefore(l, e.querySelector("link"));
        }
        if (t.p & 4) {
          l.innerHTML += SLOT_FB_CSS;
        }
        if (o) {
          o.add(a);
        }
      }
    } else if (!e.adoptedStyleSheets.includes(i)) {
      e.adoptedStyleSheets = __spreadArray(__spreadArray([], e.adoptedStyleSheets, true), [i], false);
    }
  }
  return a;
};
var attachStyles = function(e) {
  var t = e.k;
  var r = e.$hostElement$;
  var n = t.p;
  var a = createTime("attachStyles", t.L);
  var i = addStyle(r.shadowRoot ? r.shadowRoot : r.getRootNode(), t, e.N);
  if (n & 10) {
    r["s-sc"] = i;
    r.classList.add(i + "-h");
    if (n & 2) {
      r.classList.add(i + "-s");
    }
  }
  a();
};
var getScopeId = function(e, t) {
  return "sc-" + (t && e.p & 32 ? e.L + "-" + t : e.L);
};
var convertScopedToShadow = function(e) {
  return e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
};
var setAccessor = function(e, t, r, n, a, i) {
  if (r !== n) {
    var o = isMemberInElement(e, t);
    var l = t.toLowerCase();
    if (t === "class") {
      var s = e.classList;
      var u = parseClassList(r);
      var f = parseClassList(n);
      s.remove.apply(s, u.filter(function(e2) {
        return e2 && !f.includes(e2);
      }));
      s.add.apply(s, f.filter(function(e2) {
        return e2 && !u.includes(e2);
      }));
    } else if (t === "style") {
      {
        for (var c in r) {
          if (!n || n[c] == null) {
            if (c.includes("-")) {
              e.style.removeProperty(c);
            } else {
              e.style[c] = "";
            }
          }
        }
      }
      for (var c in n) {
        if (!r || n[c] !== r[c]) {
          if (c.includes("-")) {
            e.style.setProperty(c, n[c]);
          } else {
            e.style[c] = n[c];
          }
        }
      }
    } else if (t === "key") ;
    else if (t === "ref") {
      if (n) {
        n(e);
      }
    } else if (!o && t[0] === "o" && t[1] === "n") {
      if (t[2] === "-") {
        t = t.slice(3);
      } else if (isMemberInElement(win, l)) {
        t = l.slice(2);
      } else {
        t = l[2] + t.slice(3);
      }
      if (r || n) {
        var v = t.endsWith(CAPTURE_EVENT_SUFFIX);
        t = t.replace(CAPTURE_EVENT_REGEX, "");
        if (r) {
          plt.rel(e, t, r, v);
        }
        if (n) {
          plt.ael(e, t, n, v);
        }
      }
    } else {
      var d = isComplexType(n);
      if ((o || d && n !== null) && !a) {
        try {
          if (!e.tagName.includes("-")) {
            var p = n == null ? "" : n;
            if (t === "list") {
              o = false;
            } else if (r == null || e[t] != p) {
              e[t] = p;
            }
          } else {
            e[t] = n;
          }
        } catch (e2) {
        }
      }
      var m = false;
      {
        if (l !== (l = l.replace(/^xlink\:?/, ""))) {
          t = l;
          m = true;
        }
      }
      if (n == null || n === false) {
        if (n !== false || e.getAttribute(t) === "") {
          if (m) {
            e.removeAttributeNS(XLINK_NS, t);
          } else {
            e.removeAttribute(t);
          }
        }
      } else if ((!o || i & 4 || a) && !d) {
        n = n === true ? "" : n;
        if (m) {
          e.setAttributeNS(XLINK_NS, t, n);
        } else {
          e.setAttribute(t, n);
        }
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = function(e) {
  return !e ? [] : e.split(parseClassListRegex);
};
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");
var updateElement = function(e, t, r, n) {
  var a = t.h.nodeType === 11 && t.h.host ? t.h.host : t.h;
  var i = e && e.o || EMPTY_OBJ;
  var o = t.o || EMPTY_OBJ;
  {
    for (var l = 0, s = sortedAttrNames(Object.keys(i)); l < s.length; l++) {
      n = s[l];
      if (!(n in o)) {
        setAccessor(a, n, i[n], void 0, r, t.p);
      }
    }
  }
  for (var u = 0, f = sortedAttrNames(Object.keys(o)); u < f.length; u++) {
    n = f[u];
    setAccessor(a, n, i[n], o[n], r, t.p);
  }
};
function sortedAttrNames(e) {
  return e.includes("ref") ? __spreadArray(__spreadArray([], e.filter(function(e2) {
    return e2 !== "ref";
  }), true), ["ref"], false) : e;
}
var createElm = function(e, t, r, n) {
  var a;
  var i = t.l[r];
  var o = 0;
  var l;
  var s;
  var u;
  if (!useNativeShadowDom) {
    checkSlotRelocate = true;
    if (i.m === "slot") {
      if (scopeId) {
        n.classList.add(scopeId + "-s");
      }
      i.p |= i.l ? 2 : 1;
    }
  }
  if (i.i !== null) {
    l = i.h = doc.createTextNode(i.i);
  } else if (i.p & 1) {
    l = i.h = doc.createTextNode("");
  } else {
    if (!isSvgMode) {
      isSvgMode = i.m === "svg";
    }
    l = i.h = doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, i.p & 2 ? "slot-fb" : i.m);
    if (isSvgMode && i.m === "foreignObject") {
      isSvgMode = false;
    }
    {
      updateElement(null, i, isSvgMode);
    }
    if (isDef(scopeId) && l["s-si"] !== scopeId) {
      l.classList.add(l["s-si"] = scopeId);
    }
    if (i.l) {
      for (o = 0; o < i.l.length; ++o) {
        s = createElm(e, i, o, l);
        if (s) {
          l.appendChild(s);
        }
      }
    }
    {
      if (i.m === "svg") {
        isSvgMode = false;
      } else if (l.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  l["s-hn"] = hostTagName;
  {
    if (i.p & (2 | 1)) {
      l["s-sr"] = true;
      l["s-cr"] = contentRef;
      l["s-sn"] = i.v || "";
      l["s-rf"] = (a = i.o) === null || a === void 0 ? void 0 : a.ref;
      u = e && e.l && e.l[r];
      if (u && u.m === i.m && e.h) {
        {
          putBackInOriginalLocation(e.h, false);
        }
      }
    }
  }
  return l;
};
var putBackInOriginalLocation = function(e, t) {
  plt.p |= 1;
  var r = Array.from(e.childNodes);
  if (e["s-sr"] && BUILD.experimentalSlotFixes) {
    var n = e;
    while (n = n.nextSibling) {
      if (n && n["s-sn"] === e["s-sn"] && n["s-sh"] === hostTagName) {
        r.push(n);
      }
    }
  }
  for (var a = r.length - 1; a >= 0; a--) {
    var i = r[a];
    if (i["s-hn"] !== hostTagName && i["s-ol"]) {
      parentReferenceNode(i).insertBefore(i, referenceNode(i));
      i["s-ol"].remove();
      i["s-ol"] = void 0;
      i["s-sh"] = void 0;
      checkSlotRelocate = true;
    }
    if (t) {
      putBackInOriginalLocation(i, t);
    }
  }
  plt.p &= ~1;
};
var addVnodes = function(e, t, r, n, a, i) {
  var o = e["s-cr"] && e["s-cr"].parentNode || e;
  var l;
  if (o.shadowRoot && o.tagName === hostTagName) {
    o = o.shadowRoot;
  }
  for (; a <= i; ++a) {
    if (n[a]) {
      l = createElm(null, r, a, e);
      if (l) {
        n[a].h = l;
        o.insertBefore(l, referenceNode(t));
      }
    }
  }
};
var removeVnodes = function(e, t, r) {
  for (var n = t; n <= r; ++n) {
    var a = e[n];
    if (a) {
      var i = a.h;
      nullifyVNodeRefs(a);
      if (i) {
        {
          checkSlotFallbackVisibility = true;
          if (i["s-ol"]) {
            i["s-ol"].remove();
          } else {
            putBackInOriginalLocation(i, true);
          }
        }
        i.remove();
      }
    }
  }
};
var updateChildren = function(e, t, r, n, a) {
  if (a === void 0) {
    a = false;
  }
  var i = 0;
  var o = 0;
  var l = 0;
  var s = 0;
  var u = t.length - 1;
  var f = t[0];
  var c = t[u];
  var v = n.length - 1;
  var d = n[0];
  var p = n[v];
  var m;
  var h2;
  while (i <= u && o <= v) {
    if (f == null) {
      f = t[++i];
    } else if (c == null) {
      c = t[--u];
    } else if (d == null) {
      d = n[++o];
    } else if (p == null) {
      p = n[--v];
    } else if (isSameVnode(f, d, a)) {
      patch(f, d, a);
      f = t[++i];
      d = n[++o];
    } else if (isSameVnode(c, p, a)) {
      patch(c, p, a);
      c = t[--u];
      p = n[--v];
    } else if (isSameVnode(f, p, a)) {
      if (f.m === "slot" || p.m === "slot") {
        putBackInOriginalLocation(f.h.parentNode, false);
      }
      patch(f, p, a);
      e.insertBefore(f.h, c.h.nextSibling);
      f = t[++i];
      p = n[--v];
    } else if (isSameVnode(c, d, a)) {
      if (f.m === "slot" || p.m === "slot") {
        putBackInOriginalLocation(c.h.parentNode, false);
      }
      patch(c, d, a);
      e.insertBefore(c.h, f.h);
      c = t[--u];
      d = n[++o];
    } else {
      l = -1;
      {
        for (s = i; s <= u; ++s) {
          if (t[s] && t[s].u !== null && t[s].u === d.u) {
            l = s;
            break;
          }
        }
      }
      if (l >= 0) {
        h2 = t[l];
        if (h2.m !== d.m) {
          m = createElm(t && t[o], r, l, e);
        } else {
          patch(h2, d, a);
          t[l] = void 0;
          m = h2.h;
        }
        d = n[++o];
      } else {
        m = createElm(t && t[o], r, o, e);
        d = n[++o];
      }
      if (m) {
        {
          parentReferenceNode(f.h).insertBefore(m, referenceNode(f.h));
        }
      }
    }
  }
  if (i > u) {
    addVnodes(e, n[v + 1] == null ? null : n[v + 1].h, r, n, o, v);
  } else if (o > v) {
    removeVnodes(t, i, u);
  }
};
var isSameVnode = function(e, t, r) {
  if (r === void 0) {
    r = false;
  }
  if (e.m === t.m) {
    if (e.m === "slot") {
      return e.v === t.v;
    }
    if (!r) {
      return e.u === t.u;
    }
    return true;
  }
  return false;
};
var referenceNode = function(e) {
  return e && e["s-ol"] || e;
};
var parentReferenceNode = function(e) {
  return (e["s-ol"] ? e["s-ol"] : e).parentNode;
};
var patch = function(e, t, r) {
  if (r === void 0) {
    r = false;
  }
  var n = t.h = e.h;
  var a = e.l;
  var i = t.l;
  var o = t.m;
  var l = t.i;
  var s;
  if (l === null) {
    {
      isSvgMode = o === "svg" ? true : o === "foreignObject" ? false : isSvgMode;
    }
    {
      if (o === "slot" && !useNativeShadowDom) ;
      else {
        updateElement(e, t, isSvgMode);
      }
    }
    if (a !== null && i !== null) {
      updateChildren(n, a, t, i, r);
    } else if (i !== null) {
      if (e.i !== null) {
        n.textContent = "";
      }
      addVnodes(n, null, t, i, 0, i.length - 1);
    } else if (a !== null) {
      removeVnodes(a, 0, a.length - 1);
    }
    if (isSvgMode && o === "svg") {
      isSvgMode = false;
    }
  } else if (s = n["s-cr"]) {
    s.parentNode.textContent = l;
  } else if (e.i !== l) {
    n.data = l;
  }
};
var updateFallbackSlotVisibility = function(e) {
  var t = e.childNodes;
  for (var r = 0, n = t; r < n.length; r++) {
    var a = n[r];
    if (a.nodeType === 1) {
      if (a["s-sr"]) {
        var i = a["s-sn"];
        a.hidden = false;
        for (var o = 0, l = t; o < l.length; o++) {
          var s = l[o];
          if (s !== a) {
            if (s["s-hn"] !== a["s-hn"] || i !== "") {
              if (s.nodeType === 1 && (i === s.getAttribute("slot") || i === s["s-sn"])) {
                a.hidden = true;
                break;
              }
            } else {
              if (s.nodeType === 1 || s.nodeType === 3 && s.textContent.trim() !== "") {
                a.hidden = true;
                break;
              }
            }
          }
        }
      }
      updateFallbackSlotVisibility(a);
    }
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = function(e) {
  var t;
  var r;
  var n;
  for (var a = 0, i = e.childNodes; a < i.length; a++) {
    var o = i[a];
    if (o["s-sr"] && (t = o["s-cr"]) && t.parentNode) {
      r = t.parentNode.childNodes;
      var l = o["s-sn"];
      var s = function() {
        t = r[n];
        if (!t["s-cn"] && !t["s-nr"] && t["s-hn"] !== o["s-hn"] && !BUILD.experimentalSlotFixes) {
          if (isNodeLocatedInSlot(t, l)) {
            var e2 = relocateNodes.find(function(e3) {
              return e3.I === t;
            });
            checkSlotFallbackVisibility = true;
            t["s-sn"] = t["s-sn"] || l;
            if (e2) {
              e2.I["s-sh"] = o["s-hn"];
              e2.H = o;
            } else {
              t["s-sh"] = o["s-hn"];
              relocateNodes.push({ H: o, I: t });
            }
            if (t["s-sr"]) {
              relocateNodes.map(function(r2) {
                if (isNodeLocatedInSlot(r2.I, t["s-sn"])) {
                  e2 = relocateNodes.find(function(e3) {
                    return e3.I === t;
                  });
                  if (e2 && !r2.H) {
                    r2.H = e2.H;
                  }
                }
              });
            }
          } else if (!relocateNodes.some(function(e3) {
            return e3.I === t;
          })) {
            relocateNodes.push({ I: t });
          }
        }
      };
      for (n = r.length - 1; n >= 0; n--) {
        s();
      }
    }
    if (o.nodeType === 1) {
      markSlotContentForRelocation(o);
    }
  }
};
var isNodeLocatedInSlot = function(e, t) {
  if (e.nodeType === 1) {
    if (e.getAttribute("slot") === null && t === "") {
      return true;
    }
    if (e.getAttribute("slot") === t) {
      return true;
    }
    return false;
  }
  if (e["s-sn"] === t) {
    return true;
  }
  return t === "";
};
var nullifyVNodeRefs = function(e) {
  {
    e.o && e.o.ref && e.o.ref(null);
    e.l && e.l.map(nullifyVNodeRefs);
  }
};
var renderVdom = function(e, t, r) {
  if (r === void 0) {
    r = false;
  }
  var n, a, i, o;
  var l = e.$hostElement$;
  var s = e.k;
  var u = e.S || newVNode(null, null);
  var f = isHost(t) ? t : h(null, null, t);
  hostTagName = l.tagName;
  if (s.A) {
    f.o = f.o || {};
    s.A.map(function(e2) {
      var t2 = e2[0], r2 = e2[1];
      return f.o[r2] = l[t2];
    });
  }
  if (r && f.o) {
    for (var c = 0, v = Object.keys(f.o); c < v.length; c++) {
      var d = v[c];
      if (l.hasAttribute(d) && !["key", "ref", "style", "class"].includes(d)) {
        f.o[d] = l[d];
      }
    }
  }
  f.m = null;
  f.p |= 4;
  e.S = f;
  f.h = u.h = l.shadowRoot || l;
  {
    scopeId = l["s-sc"];
  }
  useNativeShadowDom = (s.p & 1) !== 0;
  {
    contentRef = l["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(u, f, r);
  {
    plt.p |= 1;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(f.h);
      for (var p = 0, m = relocateNodes; p < m.length; p++) {
        var y = m[p];
        var S = y.I;
        if (!S["s-ol"]) {
          var g = doc.createTextNode("");
          g["s-nr"] = S;
          S.parentNode.insertBefore(S["s-ol"] = g, S);
        }
      }
      for (var T = 0, _ = relocateNodes; T < _.length; T++) {
        var y = _[T];
        var S = y.I;
        var C = y.H;
        if (C) {
          var b = C.parentNode;
          var E = C.nextSibling;
          {
            var g = (n = S["s-ol"]) === null || n === void 0 ? void 0 : n.previousSibling;
            while (g) {
              var R = (a = g["s-nr"]) !== null && a !== void 0 ? a : null;
              if (R && R["s-sn"] === S["s-sn"] && b === R.parentNode) {
                R = R.nextSibling;
                while (R === S || (R === null || R === void 0 ? void 0 : R["s-sr"])) {
                  R = R === null || R === void 0 ? void 0 : R.nextSibling;
                }
                if (!R || !R["s-nr"]) {
                  E = R;
                  break;
                }
              }
              g = g.previousSibling;
            }
          }
          if (!E && b !== S.parentNode || S.nextSibling !== E) {
            if (S !== E) {
              if (!S["s-hn"] && S["s-ol"]) {
                S["s-hn"] = S["s-ol"].parentNode.nodeName;
              }
              b.insertBefore(S, E);
              if (S.nodeType === 1) {
                S.hidden = (i = S["s-ih"]) !== null && i !== void 0 ? i : false;
              }
            }
          }
          S && typeof C["s-rf"] === "function" && C["s-rf"](S);
        } else {
          if (S.nodeType === 1) {
            if (r) {
              S["s-ih"] = (o = S.hidden) !== null && o !== void 0 ? o : false;
            }
            S.hidden = true;
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(f.h);
    }
    plt.p &= ~1;
    relocateNodes.length = 0;
  }
  contentRef = void 0;
};
var attachToAncestor = function(e, t) {
  if (t && !e.M && t["s-p"]) {
    t["s-p"].push(new Promise(function(t2) {
      return e.M = t2;
    }));
  }
};
var scheduleUpdate = function(e, t) {
  {
    e.p |= 16;
  }
  if (e.p & 4) {
    e.p |= 512;
    return;
  }
  attachToAncestor(e, e.O);
  var r = function() {
    return dispatchHooks(e, t);
  };
  return writeTask(r);
};
var dispatchHooks = function(e, t) {
  var r = createTime("scheduleUpdate", e.k.L);
  var n = e.V;
  var a;
  if (t) {
    {
      e.p |= 256;
      if (e.F) {
        e.F.map(function(e2) {
          var t2 = e2[0], r2 = e2[1];
          return safeCall(n, t2, r2);
        });
        e.F = void 0;
      }
    }
    {
      a = safeCall(n, "componentWillLoad");
    }
  }
  {
    a = enqueue(a, function() {
      return safeCall(n, "componentWillRender");
    });
  }
  r();
  return enqueue(a, function() {
    return updateComponent(e, n, t);
  });
};
var enqueue = function(e, t) {
  return isPromisey(e) ? e.then(t) : t();
};
var isPromisey = function(e) {
  return e instanceof Promise || e && e.then && typeof e.then === "function";
};
var updateComponent = function(e, t, r) {
  return __awaiter(void 0, void 0, void 0, function() {
    var n, a, i, o, l, s, u;
    return __generator(this, function(f) {
      a = e.$hostElement$;
      i = createTime("update", e.k.L);
      o = a["s-rc"];
      if (r) {
        attachStyles(e);
      }
      l = createTime("render", e.k.L);
      {
        callRender(e, t, a, r);
      }
      if (o) {
        o.map(function(e2) {
          return e2();
        });
        a["s-rc"] = void 0;
      }
      l();
      i();
      {
        s = (n = a["s-p"]) !== null && n !== void 0 ? n : [];
        u = function() {
          return postUpdateComponent(e);
        };
        if (s.length === 0) {
          u();
        } else {
          Promise.all(s).then(u);
          e.p |= 4;
          s.length = 0;
        }
      }
      return [2];
    });
  });
};
var callRender = function(e, t, r, n) {
  try {
    t = t.render && t.render();
    {
      e.p &= ~16;
    }
    {
      e.p |= 2;
    }
    {
      {
        {
          renderVdom(e, t, n);
        }
      }
    }
  } catch (t2) {
    consoleError(t2, e.$hostElement$);
  }
  return null;
};
var postUpdateComponent = function(e) {
  var t = e.k.L;
  var r = e.$hostElement$;
  var n = createTime("postUpdate", t);
  var a = e.V;
  var i = e.O;
  {
    safeCall(a, "componentDidRender");
  }
  if (!(e.p & 64)) {
    e.p |= 64;
    {
      addHydratedFlag(r);
    }
    {
      safeCall(a, "componentDidLoad");
    }
    n();
    {
      e.P(r);
      if (!i) {
        appDidLoad();
      }
    }
  } else {
    {
      safeCall(a, "componentDidUpdate");
    }
    n();
  }
  {
    e.U(r);
  }
  {
    if (e.M) {
      e.M();
      e.M = void 0;
    }
    if (e.p & 512) {
      nextTick(function() {
        return scheduleUpdate(e, false);
      });
    }
    e.p &= ~(4 | 512);
  }
};
var appDidLoad = function(e) {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(function() {
    return emitEvent(win, "appload", { detail: { namespace: NAMESPACE } });
  });
};
var safeCall = function(e, t, r) {
  if (e && e[t]) {
    try {
      return e[t](r);
    } catch (e2) {
      consoleError(e2);
    }
  }
  return void 0;
};
var addHydratedFlag = function(e) {
  return e.classList.add("hydrated");
};
var getValue = function(e, t) {
  return getHostRef(e).q.get(t);
};
var setValue = function(e, t, r, n) {
  var a = getHostRef(e);
  var i = a.$hostElement$;
  var o = a.q.get(t);
  var l = a.p;
  var s = a.V;
  r = parsePropertyValue(r, n.j[t][0]);
  var u = Number.isNaN(o) && Number.isNaN(r);
  var f = r !== o && !u;
  if ((!(l & 8) || o === void 0) && f) {
    a.q.set(t, r);
    if (s) {
      if (n.B && l & 128) {
        var c = n.B[t];
        if (c) {
          c.map(function(e2) {
            try {
              s[e2](r, o, t);
            } catch (e3) {
              consoleError(e3, i);
            }
          });
        }
      }
      if ((l & (2 | 16)) === 2) {
        scheduleUpdate(a, false);
      }
    }
  }
};
var proxyComponent = function(e, t, r) {
  var n;
  var a = e.prototype;
  if (t.j) {
    if (e.watchers) {
      t.B = e.watchers;
    }
    var i = Object.entries(t.j);
    i.map(function(e2) {
      var n2 = e2[0], i2 = e2[1][0];
      if (i2 & 31 || r & 2 && i2 & 32) {
        Object.defineProperty(a, n2, { get: function() {
          return getValue(this, n2);
        }, set: function(e3) {
          setValue(this, n2, e3, t);
        }, configurable: true, enumerable: true });
      } else if (r & 1 && i2 & 64) {
        Object.defineProperty(a, n2, { value: function() {
          var e3 = [];
          for (var t2 = 0; t2 < arguments.length; t2++) {
            e3[t2] = arguments[t2];
          }
          var r2;
          var a2 = getHostRef(this);
          return (r2 = a2 === null || a2 === void 0 ? void 0 : a2.Y) === null || r2 === void 0 ? void 0 : r2.then(function() {
            var t3;
            return (t3 = a2.V) === null || t3 === void 0 ? void 0 : t3[n2].apply(t3, e3);
          });
        } });
      }
    });
    if (r & 1) {
      var o = /* @__PURE__ */ new Map();
      a.attributeChangedCallback = function(e2, r2, n2) {
        var i2 = this;
        plt.jmp(function() {
          var l;
          var s = o.get(e2);
          if (i2.hasOwnProperty(s)) {
            n2 = i2[s];
            delete i2[s];
          } else if (a.hasOwnProperty(s) && typeof i2[s] === "number" && i2[s] == n2) {
            return;
          } else if (s == null) {
            var u = getHostRef(i2);
            var f = u === null || u === void 0 ? void 0 : u.p;
            if (f && !(f & 8) && f & 128 && n2 !== r2) {
              var c = u.V;
              var v = (l = t.B) === null || l === void 0 ? void 0 : l[e2];
              v === null || v === void 0 ? void 0 : v.forEach(function(t2) {
                if (c[t2] != null) {
                  c[t2].call(c, n2, r2, e2);
                }
              });
            }
            return;
          }
          i2[s] = n2 === null && typeof i2[s] === "boolean" ? false : n2;
        });
      };
      e.observedAttributes = Array.from(new Set(__spreadArray(__spreadArray([], Object.keys((n = t.B) !== null && n !== void 0 ? n : {}), true), i.filter(function(e2) {
        var t2 = e2[0], r2 = e2[1];
        return r2[0] & 15;
      }).map(function(e2) {
        var r2 = e2[0], n2 = e2[1];
        var a2;
        var i2 = n2[1] || r2;
        o.set(i2, r2);
        if (n2[0] & 512) {
          (a2 = t.A) === null || a2 === void 0 ? void 0 : a2.push([r2, i2]);
        }
        return i2;
      }), true)));
    }
  }
  return e;
};
var initializeComponent = function(e, t, r, n) {
  return __awaiter(void 0, void 0, void 0, function() {
    var n2, a, i, o, l, s, u, f, c;
    return __generator(this, function(v) {
      switch (v.label) {
        case 0:
          if (!((t.p & 32) === 0)) return [3, 5];
          t.p |= 32;
          a = r.W;
          if (!a) return [3, 3];
          n2 = loadModule(r);
          if (!n2.then) return [3, 2];
          i = uniqueTime();
          return [4, n2];
        case 1:
          n2 = v.sent();
          i();
          v.label = 2;
        case 2:
          if (!n2.isProxied) {
            {
              r.B = n2.watchers;
            }
            proxyComponent(n2, r, 2);
            n2.isProxied = true;
          }
          o = createTime("createInstance", r.L);
          {
            t.p |= 8;
          }
          try {
            new n2(t);
          } catch (e2) {
            consoleError(e2);
          }
          {
            t.p &= ~8;
          }
          {
            t.p |= 128;
          }
          o();
          fireConnectedCallback(t.V);
          return [3, 4];
        case 3:
          n2 = e.constructor;
          customElements.whenDefined(r.L).then(function() {
            return t.p |= 128;
          });
          v.label = 4;
        case 4:
          if (n2.style) {
            l = n2.style;
            if (typeof l !== "string") {
              l = l[t.N = computeMode(e)];
            }
            s = getScopeId(r, t.N);
            if (!styles.has(s)) {
              u = createTime("registerStyles", r.L);
              registerStyle(s, l, !!(r.p & 1));
              u();
            }
          }
          v.label = 5;
        case 5:
          f = t.O;
          c = function() {
            return scheduleUpdate(t, true);
          };
          if (f && f["s-rc"]) {
            f["s-rc"].push(c);
          } else {
            c();
          }
          return [2];
      }
    });
  });
};
var fireConnectedCallback = function(e) {
  {
    safeCall(e, "connectedCallback");
  }
};
var connectedCallback = function(e) {
  if ((plt.p & 1) === 0) {
    var t = getHostRef(e);
    var r = t.k;
    var n = createTime("connectedCallback", r.L);
    if (!(t.p & 1)) {
      t.p |= 1;
      var a = void 0;
      {
        a = e.getAttribute(HYDRATE_ID);
        if (a) {
          if (r.p & 1) {
            var i = addStyle(e.shadowRoot, r, e.getAttribute("s-mode"));
            e.classList.remove(i + "-h", i + "-s");
          }
          initializeClientHydrate(e, r.L, a, t);
        }
      }
      if (!a) {
        if (r.p & (4 | 8)) {
          setContentReference(e);
        }
      }
      {
        var o = e;
        while (o = o.parentNode || o.host) {
          if (o.nodeType === 1 && o.hasAttribute("s-id") && o["s-p"] || o["s-p"]) {
            attachToAncestor(t, t.O = o);
            break;
          }
        }
      }
      if (r.j) {
        Object.entries(r.j).map(function(t2) {
          var r2 = t2[0], n2 = t2[1][0];
          if (n2 & 31 && e.hasOwnProperty(r2)) {
            var a2 = e[r2];
            delete e[r2];
            e[r2] = a2;
          }
        });
      }
      {
        initializeComponent(e, t, r);
      }
    } else {
      addHostEventListeners(e, t, r.X);
      if (t === null || t === void 0 ? void 0 : t.V) {
        fireConnectedCallback(t.V);
      } else if (t === null || t === void 0 ? void 0 : t.G) {
        t.G.then(function() {
          return fireConnectedCallback(t.V);
        });
      }
    }
    n();
  }
};
var setContentReference = function(e) {
  var t = e["s-cr"] = doc.createComment("");
  t["s-cn"] = true;
  e.insertBefore(t, e.firstChild);
};
var disconnectInstance = function(e) {
  {
    safeCall(e, "disconnectedCallback");
  }
};
var disconnectedCallback = function(e) {
  return __awaiter(void 0, void 0, void 0, function() {
    var t;
    return __generator(this, function(r) {
      if ((plt.p & 1) === 0) {
        t = getHostRef(e);
        {
          if (t.K) {
            t.K.map(function(e2) {
              return e2();
            });
            t.K = void 0;
          }
        }
        if (t === null || t === void 0 ? void 0 : t.V) {
          disconnectInstance(t.V);
        } else if (t === null || t === void 0 ? void 0 : t.G) {
          t.G.then(function() {
            return disconnectInstance(t.V);
          });
        }
      }
      return [2];
    });
  });
};
var bootstrapLazy = function(e, t) {
  if (t === void 0) {
    t = {};
  }
  var r;
  var n = createTime();
  var a = [];
  var i = t.exclude || [];
  var o = win.customElements;
  var l = doc.head;
  var s = l.querySelector("meta[charset]");
  var u = doc.createElement("style");
  var f = [];
  var c = doc.querySelectorAll("[".concat(HYDRATED_STYLE_ID, "]"));
  var v;
  var d = true;
  var p = 0;
  Object.assign(plt, t);
  plt.t = new URL(t.resourcesUrl || "./", doc.baseURI).href;
  {
    plt.p |= 2;
  }
  {
    for (; p < c.length; p++) {
      registerStyle(c[p].getAttribute(HYDRATED_STYLE_ID), convertScopedToShadow(c[p].innerHTML), true);
    }
  }
  var m = false;
  e.map(function(e2) {
    e2[1].map(function(t2) {
      var r2;
      var n2 = { p: t2[0], L: t2[1], j: t2[2], X: t2[3] };
      if (n2.p & 4) {
        m = true;
      }
      {
        n2.j = t2[2];
      }
      {
        n2.X = t2[3];
      }
      {
        n2.A = [];
      }
      {
        n2.B = (r2 = t2[4]) !== null && r2 !== void 0 ? r2 : {};
      }
      var l2 = n2.L;
      var s2 = function(e3) {
        __extends(t3, e3);
        function t3(t4) {
          var r3 = e3.call(this, t4) || this;
          t4 = r3;
          registerHost(t4, n2);
          if (n2.p & 1) {
            {
              {
                t4.attachShadow({ mode: "open", delegatesFocus: !!(n2.p & 16) });
              }
            }
          }
          return r3;
        }
        t3.prototype.connectedCallback = function() {
          var e4 = this;
          if (v) {
            clearTimeout(v);
            v = null;
          }
          if (d) {
            f.push(this);
          } else {
            plt.jmp(function() {
              return connectedCallback(e4);
            });
          }
        };
        t3.prototype.disconnectedCallback = function() {
          var e4 = this;
          plt.jmp(function() {
            return disconnectedCallback(e4);
          });
        };
        t3.prototype.componentOnReady = function() {
          return getHostRef(this).G;
        };
        return t3;
      }(HTMLElement);
      n2.W = e2[0];
      if (!i.includes(l2) && !o.get(l2)) {
        a.push(l2);
        o.define(l2, proxyComponent(s2, n2, 1));
      }
    });
  });
  if (a.length > 0) {
    if (m) {
      u.textContent += SLOT_FB_CSS;
    }
    {
      u.textContent += a + HYDRATED_CSS;
    }
    if (u.innerHTML.length) {
      u.setAttribute("data-styles", "");
      var h2 = (r = plt.D) !== null && r !== void 0 ? r : queryNonceMetaTagContent(doc);
      if (h2 != null) {
        u.setAttribute("nonce", h2);
      }
      l.insertBefore(u, s ? s.nextSibling : l.firstChild);
    }
  }
  d = false;
  if (f.length) {
    f.map(function(e2) {
      return e2.connectedCallback();
    });
  } else {
    {
      plt.jmp(function() {
        return v = setTimeout(appDidLoad, 30);
      });
    }
  }
  n();
};
var addHostEventListeners = function(e, t, r, n) {
  if (r) {
    r.map(function(r2) {
      var n2 = r2[0], a = r2[1], i = r2[2];
      var o = getHostListenerTarget(e, n2);
      var l = hostListenerProxy(t, i);
      var s = hostListenerOpts(n2);
      plt.ael(o, a, l, s);
      (t.K = t.K || []).push(function() {
        return plt.rel(o, a, l, s);
      });
    });
  }
};
var hostListenerProxy = function(e, t) {
  return function(r) {
    try {
      {
        if (e.p & 256) {
          e.V[t](r);
        } else {
          (e.F = e.F || []).push([t, r]);
        }
      }
    } catch (e2) {
      consoleError(e2);
    }
  };
};
var getHostListenerTarget = function(e, t) {
  if (t & 4) return doc;
  if (t & 8) return win;
  if (t & 16) return doc.body;
  return e;
};
var hostListenerOpts = function(e) {
  return supportsListenerOptions ? { passive: (e & 1) !== 0, capture: (e & 2) !== 0 } : (e & 2) !== 0;
};
var setNonce = function(e) {
  return plt.D = e;
};
var hostRefs = /* @__PURE__ */ new WeakMap();
var getHostRef = function(e) {
  return hostRefs.get(e);
};
var registerHost = function(e, t) {
  var r = { p: 0, $hostElement$: e, k: t, q: /* @__PURE__ */ new Map() };
  {
    r.Y = new Promise(function(e2) {
      return r.U = e2;
    });
  }
  {
    r.G = new Promise(function(e2) {
      return r.P = e2;
    });
    e["s-p"] = [];
    e["s-rc"] = [];
  }
  addHostEventListeners(e, r, t.X);
  return hostRefs.set(e, r);
};
var isMemberInElement = function(e, t) {
  return t in e;
};
var consoleError = function(e, t) {
  return (0, console.error)(e, t);
};
var cmpModules = /* @__PURE__ */ new Map();
var loadModule = function(e, t, r) {
  var n = e.L.replace(/-/g, "_");
  var a = e.W;
  var i = cmpModules.get(a);
  if (i) {
    return i[n];
  }
  return import("./".concat(a, ".entry.js").concat("")).then(function(e2) {
    {
      cmpModules.set(a, e2);
    }
    return e2[n];
  }, consoleError);
};
var styles = /* @__PURE__ */ new Map();
var modeResolutionChain = [];
var win = typeof window !== "undefined" ? window : {};
var doc = win.document || { head: {} };
var plt = { p: 0, t: "", jmp: function(e) {
  return e();
}, raf: function(e) {
  return requestAnimationFrame(e);
}, ael: function(e, t, r, n) {
  return e.addEventListener(t, r, n);
}, rel: function(e, t, r, n) {
  return e.removeEventListener(t, r, n);
}, ce: function(e, t) {
  return new CustomEvent(e, t);
} };
var setPlatformHelpers = function(e) {
  Object.assign(plt, e);
};
var supportsShadow = true;
var supportsListenerOptions = function() {
  var e = false;
  try {
    doc.addEventListener("e", null, Object.defineProperty({}, "passive", { get: function() {
      e = true;
    } }));
  } catch (e2) {
  }
  return e;
}();
var promiseResolve = function(e) {
  return Promise.resolve(e);
};
var supportsConstructableStylesheets = function() {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
}();
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = function(e, t) {
  return function(r) {
    e.push(r);
    if (!queuePending) {
      queuePending = true;
      if (t && plt.p & 4) {
        nextTick(flush);
      } else {
        plt.raf(flush);
      }
    }
  };
};
var consume = function(e) {
  for (var t = 0; t < e.length; t++) {
    try {
      e[t](performance.now());
    } catch (e2) {
      consoleError(e2);
    }
  }
  e.length = 0;
};
var flush = function() {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
var nextTick = function(e) {
  return promiseResolve().then(e);
};
var readTask = queueTask(queueDomReads, false);
var writeTask = queueTask(queueDomWrites, true);

export {
  setMode,
  getMode,
  bootstrapLazy,
  setNonce,
  setPlatformHelpers
};
/*! Bundled license information:

@ionic/core/dist/esm-es5/index-a1a47f01.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-a1a47f01.js:
  (*!__STENCIL_STATIC_IMPORT_SWITCH__*)
*/
//# sourceMappingURL=chunk-O3MGF67W.js.map
