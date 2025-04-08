import {
  mdTransitionAnimation
} from "./chunk-I5ZLSNQK.js";
import "./chunk-7EVV2C7Q.js";
import "./chunk-SWZ2BPOX.js";
import {
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
  componentOnReady,
  createAnimation,
  doc,
  getMode
} from "./chunk-YEWGM5MO.js";
import {
  iosTransitionAnimation
} from "./chunk-JGE4ICMY.js";
import {
  componentOnReady as componentOnReady2,
  createAnimation as createAnimation2,
  doc as doc2,
  getIonPageElement
} from "./chunk-ONGWA5TS.js";
import {
  applyPolyfills,
  defineCustomElements,
  getIonMode,
  getPlatforms,
  isPlatform
} from "./chunk-IZXP2MKQ.js";
import "./chunk-O3MGF67W.js";
import {
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl
} from "./chunk-CA7N5Z6T.js";
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationStart,
  PRIMARY_OUTLET,
  Router,
  RouterLink,
  UrlSerializer
} from "./chunk-HJQ57B22.js";
import "./chunk-HHVNTICE.js";
import "./chunk-K7MHOQBR.js";
import {
  CommonModule,
  DOCUMENT,
  Location,
  LocationStrategy,
  NgIf,
  NgTemplateOutlet
} from "./chunk-776VCP6M.js";
import {
  APP_INITIALIZER,
  ApplicationRef,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Optional,
  Output,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  createComponent,
  forwardRef,
  inject,
  reflectComponentType,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-ESHHWHPK.js";
import {
  fromEvent
} from "./chunk-L6WT4WHF.js";
import "./chunk-4LDUOPTP.js";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  filter,
  of,
  switchMap
} from "./chunk-Q3Q6CVA2.js";
import {
  __awaiter,
  __decorate,
  __generator,
  __spreadArray
} from "./chunk-24ZYNOED.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-I47SK5T2.js";

// node_modules/@ionic/core/components/gesture-controller.js
var GestureController = class {
  constructor() {
    this.gestureId = 0;
    this.requestedStart = /* @__PURE__ */ new Map();
    this.disabledGestures = /* @__PURE__ */ new Map();
    this.disabledScroll = /* @__PURE__ */ new Set();
  }
  /**
   * Creates a gesture delegate based on the GestureConfig passed
   */
  createGesture(config3) {
    var _a;
    return new GestureDelegate(this, this.newID(), config3.name, (_a = config3.priority) !== null && _a !== void 0 ? _a : 0, !!config3.disableScroll);
  }
  /**
   * Creates a blocker that will block any other gesture events from firing. Set in the ion-gesture component.
   */
  createBlocker(opts = {}) {
    return new BlockerDelegate(this, this.newID(), opts.disable, !!opts.disableScroll);
  }
  start(gestureName, id, priority) {
    if (!this.canStart(gestureName)) {
      this.requestedStart.delete(id);
      return false;
    }
    this.requestedStart.set(id, priority);
    return true;
  }
  capture(gestureName, id, priority) {
    if (!this.start(gestureName, id, priority)) {
      return false;
    }
    const requestedStart = this.requestedStart;
    let maxPriority = -1e4;
    requestedStart.forEach((value) => {
      maxPriority = Math.max(maxPriority, value);
    });
    if (maxPriority === priority) {
      this.capturedId = id;
      requestedStart.clear();
      const event = new CustomEvent("ionGestureCaptured", { detail: { gestureName } });
      document.dispatchEvent(event);
      return true;
    }
    requestedStart.delete(id);
    return false;
  }
  release(id) {
    this.requestedStart.delete(id);
    if (this.capturedId === id) {
      this.capturedId = void 0;
    }
  }
  disableGesture(gestureName, id) {
    let set = this.disabledGestures.get(gestureName);
    if (set === void 0) {
      set = /* @__PURE__ */ new Set();
      this.disabledGestures.set(gestureName, set);
    }
    set.add(id);
  }
  enableGesture(gestureName, id) {
    const set = this.disabledGestures.get(gestureName);
    if (set !== void 0) {
      set.delete(id);
    }
  }
  disableScroll(id) {
    this.disabledScroll.add(id);
    if (this.disabledScroll.size === 1) {
      document.body.classList.add(BACKDROP_NO_SCROLL);
    }
  }
  enableScroll(id) {
    this.disabledScroll.delete(id);
    if (this.disabledScroll.size === 0) {
      document.body.classList.remove(BACKDROP_NO_SCROLL);
    }
  }
  canStart(gestureName) {
    if (this.capturedId !== void 0) {
      return false;
    }
    if (this.isDisabled(gestureName)) {
      return false;
    }
    return true;
  }
  isCaptured() {
    return this.capturedId !== void 0;
  }
  isScrollDisabled() {
    return this.disabledScroll.size > 0;
  }
  isDisabled(gestureName) {
    const disabled = this.disabledGestures.get(gestureName);
    if (disabled && disabled.size > 0) {
      return true;
    }
    return false;
  }
  newID() {
    this.gestureId++;
    return this.gestureId;
  }
};
var GestureDelegate = class {
  constructor(ctrl, id, name, priority, disableScroll) {
    this.id = id;
    this.name = name;
    this.disableScroll = disableScroll;
    this.priority = priority * 1e6 + id;
    this.ctrl = ctrl;
  }
  canStart() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.canStart(this.name);
  }
  start() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.start(this.name, this.id, this.priority);
  }
  capture() {
    if (!this.ctrl) {
      return false;
    }
    const captured = this.ctrl.capture(this.name, this.id, this.priority);
    if (captured && this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
    return captured;
  }
  release() {
    if (this.ctrl) {
      this.ctrl.release(this.id);
      if (this.disableScroll) {
        this.ctrl.enableScroll(this.id);
      }
    }
  }
  destroy() {
    this.release();
    this.ctrl = void 0;
  }
};
var BlockerDelegate = class {
  constructor(ctrl, id, disable, disableScroll) {
    this.id = id;
    this.disable = disable;
    this.disableScroll = disableScroll;
    this.ctrl = ctrl;
  }
  block() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (const gesture of this.disable) {
        this.ctrl.disableGesture(gesture, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
  }
  unblock() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (const gesture of this.disable) {
        this.ctrl.enableGesture(gesture, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.enableScroll(this.id);
    }
  }
  destroy() {
    this.unblock();
    this.ctrl = void 0;
  }
};
var BACKDROP_NO_SCROLL = "backdrop-no-scroll";
var GESTURE_CONTROLLER = new GestureController();

// node_modules/@ionic/core/components/ionic-global.js
var Config = class {
  constructor() {
    this.m = /* @__PURE__ */ new Map();
  }
  reset(configObj) {
    this.m = new Map(Object.entries(configObj));
  }
  get(key, fallback) {
    const value = this.m.get(key);
    return value !== void 0 ? value : fallback;
  }
  getBoolean(key, fallback = false) {
    const val = this.m.get(key);
    if (val === void 0) {
      return fallback;
    }
    if (typeof val === "string") {
      return val === "true";
    }
    return !!val;
  }
  getNumber(key, fallback) {
    const val = parseFloat(this.m.get(key));
    return isNaN(val) ? fallback !== void 0 ? fallback : NaN : val;
  }
  set(key, value) {
    this.m.set(key, value);
  }
};
var config = new Config();
var getPlatforms2 = (win3) => setupPlatforms(win3);
var isPlatform2 = (winOrPlatform, platform) => {
  if (typeof winOrPlatform === "string") {
    platform = winOrPlatform;
    winOrPlatform = void 0;
  }
  return getPlatforms2(winOrPlatform).includes(platform);
};
var setupPlatforms = (win3 = window) => {
  if (typeof win3 === "undefined") {
    return [];
  }
  win3.Ionic = win3.Ionic || {};
  let platforms = win3.Ionic.platforms;
  if (platforms == null) {
    platforms = win3.Ionic.platforms = detectPlatforms(win3);
    platforms.forEach((p) => win3.document.documentElement.classList.add(`plt-${p}`));
  }
  return platforms;
};
var detectPlatforms = (win3) => {
  const customPlatformMethods = config.get("platform");
  return Object.keys(PLATFORMS_MAP).filter((p) => {
    const customMethod = customPlatformMethods === null || customPlatformMethods === void 0 ? void 0 : customPlatformMethods[p];
    return typeof customMethod === "function" ? customMethod(win3) : PLATFORMS_MAP[p](win3);
  });
};
var isMobileWeb = (win3) => isMobile(win3) && !isHybrid(win3);
var isIpad = (win3) => {
  if (testUserAgent(win3, /iPad/i)) {
    return true;
  }
  if (testUserAgent(win3, /Macintosh/i) && isMobile(win3)) {
    return true;
  }
  return false;
};
var isIphone = (win3) => testUserAgent(win3, /iPhone/i);
var isIOS = (win3) => testUserAgent(win3, /iPhone|iPod/i) || isIpad(win3);
var isAndroid = (win3) => testUserAgent(win3, /android|sink/i);
var isAndroidTablet = (win3) => {
  return isAndroid(win3) && !testUserAgent(win3, /mobile/i);
};
var isPhablet = (win3) => {
  const width = win3.innerWidth;
  const height = win3.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);
  return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
};
var isTablet = (win3) => {
  const width = win3.innerWidth;
  const height = win3.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);
  return isIpad(win3) || isAndroidTablet(win3) || smallest > 460 && smallest < 820 && largest > 780 && largest < 1400;
};
var isMobile = (win3) => matchMedia(win3, "(any-pointer:coarse)");
var isDesktop = (win3) => !isMobile(win3);
var isHybrid = (win3) => isCordova(win3) || isCapacitorNative(win3);
var isCordova = (win3) => !!(win3["cordova"] || win3["phonegap"] || win3["PhoneGap"]);
var isCapacitorNative = (win3) => {
  const capacitor = win3["Capacitor"];
  return !!(capacitor === null || capacitor === void 0 ? void 0 : capacitor.isNative);
};
var isElectron = (win3) => testUserAgent(win3, /electron/i);
var isPWA = (win3) => {
  var _a;
  return !!(((_a = win3.matchMedia) === null || _a === void 0 ? void 0 : _a.call(win3, "(display-mode: standalone)").matches) || win3.navigator.standalone);
};
var testUserAgent = (win3, expr) => expr.test(win3.navigator.userAgent);
var matchMedia = (win3, query) => {
  var _a;
  return (_a = win3.matchMedia) === null || _a === void 0 ? void 0 : _a.call(win3, query).matches;
};
var PLATFORMS_MAP = {
  ipad: isIpad,
  iphone: isIphone,
  ios: isIOS,
  android: isAndroid,
  phablet: isPhablet,
  tablet: isTablet,
  cordova: isCordova,
  capacitor: isCapacitorNative,
  electron: isElectron,
  pwa: isPWA,
  mobile: isMobile,
  mobileweb: isMobileWeb,
  desktop: isDesktop,
  hybrid: isHybrid
};
var defaultMode;
var getIonMode2 = (ref) => {
  return ref && getMode(ref) || defaultMode;
};

// node_modules/@ionic/core/components/hardware-back-button.js
var MENU_BACK_BUTTON_PRIORITY = 99;

// node_modules/@ionic/core/components/index6.js
var printIonWarning = (message, ...params) => {
  return console.warn(`[Ionic Warning]: ${message}`, ...params);
};

// node_modules/@ionic/core/components/index4.js
var baseAnimation = (isIos) => {
  return createAnimation().duration(isIos ? 400 : 300);
};
var menuOverlayAnimation = (menu) => {
  let closedX;
  let openedX;
  const width = menu.width + 8;
  const menuAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  if (menu.isEndSide) {
    closedX = width + "px";
    openedX = "0px";
  } else {
    closedX = -width + "px";
    openedX = "0px";
  }
  menuAnimation.addElement(menu.menuInnerEl).fromTo("transform", `translateX(${closedX})`, `translateX(${openedX})`);
  const mode = getIonMode2(menu);
  const isIos = mode === "ios";
  const opacity = isIos ? 0.2 : 0.25;
  backdropAnimation.addElement(menu.backdropEl).fromTo("opacity", 0.01, opacity);
  return baseAnimation(isIos).addAnimation([menuAnimation, backdropAnimation]);
};
var menuPushAnimation = (menu) => {
  let contentOpenedX;
  let menuClosedX;
  const mode = getIonMode2(menu);
  const width = menu.width;
  if (menu.isEndSide) {
    contentOpenedX = -width + "px";
    menuClosedX = width + "px";
  } else {
    contentOpenedX = width + "px";
    menuClosedX = -width + "px";
  }
  const menuAnimation = createAnimation().addElement(menu.menuInnerEl).fromTo("transform", `translateX(${menuClosedX})`, "translateX(0px)");
  const contentAnimation = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${contentOpenedX})`);
  const backdropAnimation = createAnimation().addElement(menu.backdropEl).fromTo("opacity", 0.01, 0.32);
  return baseAnimation(mode === "ios").addAnimation([menuAnimation, contentAnimation, backdropAnimation]);
};
var menuRevealAnimation = (menu) => {
  const mode = getIonMode2(menu);
  const openedX = menu.width * (menu.isEndSide ? -1 : 1) + "px";
  const contentOpen = createAnimation().addElement(menu.contentEl).fromTo("transform", "translateX(0px)", `translateX(${openedX})`);
  return baseAnimation(mode === "ios").addAnimation(contentOpen);
};
var createMenuController = () => {
  const menuAnimations = /* @__PURE__ */ new Map();
  const menus = [];
  const open = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu, true);
    if (menuEl) {
      return menuEl.open();
    }
    return false;
  });
  const close = (menu) => __async(void 0, null, function* () {
    const menuEl = yield menu !== void 0 ? get(menu, true) : getOpen();
    if (menuEl !== void 0) {
      return menuEl.close();
    }
    return false;
  });
  const toggle = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu, true);
    if (menuEl) {
      return menuEl.toggle();
    }
    return false;
  });
  const enable = (shouldEnable, menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      menuEl.disabled = !shouldEnable;
    }
    return menuEl;
  });
  const swipeGesture = (shouldEnable, menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      menuEl.swipeGesture = shouldEnable;
    }
    return menuEl;
  });
  const isOpen = (menu) => __async(void 0, null, function* () {
    if (menu != null) {
      const menuEl = yield get(menu);
      return menuEl !== void 0 && menuEl.isOpen();
    } else {
      const menuEl = yield getOpen();
      return menuEl !== void 0;
    }
  });
  const isEnabled = (menu) => __async(void 0, null, function* () {
    const menuEl = yield get(menu);
    if (menuEl) {
      return !menuEl.disabled;
    }
    return false;
  });
  const get = (menu, logOnMultipleSideMenus = false) => __async(void 0, null, function* () {
    yield waitUntilReady();
    if (menu === "start" || menu === "end") {
      const menuRefs = menus.filter((m) => m.side === menu && !m.disabled);
      if (menuRefs.length >= 1) {
        if (menuRefs.length > 1 && logOnMultipleSideMenus) {
          printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${menuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, menuRefs.map((m) => m.el));
        }
        return menuRefs[0].el;
      }
      const sideMenuRefs = menus.filter((m) => m.side === menu);
      if (sideMenuRefs.length >= 1) {
        if (sideMenuRefs.length > 1 && logOnMultipleSideMenus) {
          printIonWarning(`menuController queried for a menu on the "${menu}" side, but ${sideMenuRefs.length} menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side.`, sideMenuRefs.map((m) => m.el));
        }
        return sideMenuRefs[0].el;
      }
    } else if (menu != null) {
      return find((m) => m.menuId === menu);
    }
    const menuEl = find((m) => !m.disabled);
    if (menuEl) {
      return menuEl;
    }
    return menus.length > 0 ? menus[0].el : void 0;
  });
  const getOpen = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return _getOpenSync();
  });
  const getMenus = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return getMenusSync();
  });
  const isAnimating = () => __async(void 0, null, function* () {
    yield waitUntilReady();
    return isAnimatingSync();
  });
  const registerAnimation = (name, animation) => {
    menuAnimations.set(name, animation);
  };
  const _register = (menu) => {
    if (menus.indexOf(menu) < 0) {
      menus.push(menu);
    }
  };
  const _unregister = (menu) => {
    const index = menus.indexOf(menu);
    if (index > -1) {
      menus.splice(index, 1);
    }
  };
  const _setOpen = (menu, shouldOpen, animated) => __async(void 0, null, function* () {
    if (isAnimatingSync()) {
      return false;
    }
    if (shouldOpen) {
      const openedMenu = yield getOpen();
      if (openedMenu && menu.el !== openedMenu) {
        yield openedMenu.setOpen(false, false);
      }
    }
    return menu._setOpen(shouldOpen, animated);
  });
  const _createAnimation = (type, menuCmp) => {
    const animationBuilder = menuAnimations.get(type);
    if (!animationBuilder) {
      throw new Error("animation not registered");
    }
    const animation = animationBuilder(menuCmp);
    return animation;
  };
  const _getOpenSync = () => {
    return find((m) => m._isOpen);
  };
  const getMenusSync = () => {
    return menus.map((menu) => menu.el);
  };
  const isAnimatingSync = () => {
    return menus.some((menu) => menu.isAnimating);
  };
  const find = (predicate) => {
    const instance = menus.find(predicate);
    if (instance !== void 0) {
      return instance.el;
    }
    return void 0;
  };
  const waitUntilReady = () => {
    return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map((menu) => new Promise((resolve) => componentOnReady(menu, resolve))));
  };
  registerAnimation("reveal", menuRevealAnimation);
  registerAnimation("push", menuPushAnimation);
  registerAnimation("overlay", menuOverlayAnimation);
  doc === null || doc === void 0 ? void 0 : doc.addEventListener("ionBackButton", (ev) => {
    const openMenu = _getOpenSync();
    if (openMenu) {
      ev.detail.register(MENU_BACK_BUTTON_PRIORITY, () => {
        return openMenu.close();
      });
    }
  });
  return {
    registerAnimation,
    get,
    getMenus,
    getOpen,
    isEnabled,
    swipeGesture,
    isAnimating,
    isOpen,
    enable,
    toggle,
    close,
    open,
    _getOpenSync,
    _createAnimation,
    _register,
    _unregister,
    _setOpen
  };
};
var menuController = createMenuController();

// node_modules/@ionic/core/components/overlays.js
var createController = (tagName) => {
  return {
    create(options) {
      return createOverlay(tagName, options);
    },
    dismiss(data, role, id) {
      return dismissOverlay(document, data, role, tagName, id);
    },
    getTop() {
      return __async(this, null, function* () {
        return getPresentedOverlay(document, tagName);
      });
    }
  };
};
var alertController = createController("ion-alert");
var actionSheetController = createController("ion-action-sheet");
var loadingController = createController("ion-loading");
var modalController = createController("ion-modal");
var pickerController = createController("ion-picker");
var popoverController = createController("ion-popover");
var toastController = createController("ion-toast");
var createOverlay = (tagName, opts) => {
  if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
    return window.customElements.whenDefined(tagName).then(() => {
      const element = document.createElement(tagName);
      element.classList.add("overlay-hidden");
      Object.assign(element, Object.assign(Object.assign({}, opts), { hasController: true }));
      getAppRoot(document).appendChild(element);
      return new Promise((resolve) => componentOnReady(element, resolve));
    });
  }
  return Promise.resolve();
};
var isOverlayHidden = (overlay) => overlay.classList.contains("overlay-hidden");
var dismissOverlay = (doc3, data, role, overlayTag, id) => {
  const overlay = getPresentedOverlay(doc3, overlayTag, id);
  if (!overlay) {
    return Promise.reject("overlay does not exist");
  }
  return overlay.dismiss(data, role);
};
var getOverlays = (doc3, selector) => {
  if (selector === void 0) {
    selector = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast";
  }
  return Array.from(doc3.querySelectorAll(selector)).filter((c) => c.overlayIndex > 0);
};
var getPresentedOverlays = (doc3, overlayTag) => {
  return getOverlays(doc3, overlayTag).filter((o) => !isOverlayHidden(o));
};
var getPresentedOverlay = (doc3, overlayTag, id) => {
  const overlays = getPresentedOverlays(doc3, overlayTag);
  return id === void 0 ? overlays[overlays.length - 1] : overlays.find((o) => o.id === id);
};
var getAppRoot = (doc3) => {
  return doc3.querySelector("ion-app") || doc3.body;
};

// node_modules/@ionic/angular/fesm2020/ionic-angular-common.mjs
var _c0 = ["tabsInner"];
var MenuController = class {
  constructor(menuController3) {
    this.menuController = menuController3;
  }
  /**
   * Programmatically open the Menu.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu is fully opened
   */
  open(menuId) {
    return this.menuController.open(menuId);
  }
  /**
   * Programmatically close the Menu. If no `menuId` is given as the first
   * argument then it'll close any menu which is open. If a `menuId`
   * is given then it'll close that exact menu.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu is fully closed
   */
  close(menuId) {
    return this.menuController.close(menuId);
  }
  /**
   * Toggle the menu. If it's closed, it will open, and if opened, it
   * will close.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return returns a promise when the menu has been toggled
   */
  toggle(menuId) {
    return this.menuController.toggle(menuId);
  }
  /**
   * Used to enable or disable a menu. For example, there could be multiple
   * left menus, but only one of them should be able to be opened at the same
   * time. If there are multiple menus on the same side, then enabling one menu
   * will also automatically disable all the others that are on the same side.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu, which is useful for chaining.
   */
  enable(shouldEnable, menuId) {
    return this.menuController.enable(shouldEnable, menuId);
  }
  /**
   * Used to enable or disable the ability to swipe open the menu.
   * @param shouldEnable  True if it should be swipe-able, false if not.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu, which is useful for chaining.
   */
  swipeGesture(shouldEnable, menuId) {
    return this.menuController.swipeGesture(shouldEnable, menuId);
  }
  /**
   * @param [menuId] Optionally get the menu by its id, or side.
   * @return Returns true if the specified menu is currently open, otherwise false.
   * If the menuId is not specified, it returns true if ANY menu is currenly open.
   */
  isOpen(menuId) {
    return this.menuController.isOpen(menuId);
  }
  /**
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns true if the menu is currently enabled, otherwise false.
   */
  isEnabled(menuId) {
    return this.menuController.isEnabled(menuId);
  }
  /**
   * Used to get a menu instance. If a `menuId` is not provided then it'll
   * return the first menu found. If a `menuId` is `left` or `right`, then
   * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
   * provided, then it'll try to find the menu using the menu's `id`
   * property. If a menu is not found then it'll return `null`.
   * @param [menuId]  Optionally get the menu by its id, or side.
   * @return Returns the instance of the menu if found, otherwise `null`.
   */
  get(menuId) {
    return this.menuController.get(menuId);
  }
  /**
   * @return Returns the instance of the menu already opened, otherwise `null`.
   */
  getOpen() {
    return this.menuController.getOpen();
  }
  /**
   * @return Returns an array of all menu instances.
   */
  getMenus() {
    return this.menuController.getMenus();
  }
  registerAnimation(name, animation) {
    return this.menuController.registerAnimation(name, animation);
  }
  isAnimating() {
    return this.menuController.isAnimating();
  }
  _getOpenSync() {
    return this.menuController._getOpenSync();
  }
  _createAnimation(type, menuCmp) {
    return this.menuController._createAnimation(type, menuCmp);
  }
  _register(menu) {
    return this.menuController._register(menu);
  }
  _unregister(menu) {
    return this.menuController._unregister(menu);
  }
  _setOpen(menu, shouldOpen, animated) {
    return this.menuController._setOpen(menu, shouldOpen, animated);
  }
};
var DomController = class {
  /**
   * Schedules a task to run during the READ phase of the next frame.
   * This task should only read the DOM, but never modify it.
   */
  read(cb) {
    getQueue().read(cb);
  }
  /**
   * Schedules a task to run during the WRITE phase of the next frame.
   * This task should write the DOM, but never READ it.
   */
  write(cb) {
    getQueue().write(cb);
  }
};
DomController.ɵfac = function DomController_Factory(t) {
  return new (t || DomController)();
};
DomController.ɵprov = ɵɵdefineInjectable({
  token: DomController,
  factory: DomController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var getQueue = () => {
  const win3 = typeof window !== "undefined" ? window : null;
  if (win3 != null) {
    const Ionic = win3.Ionic;
    if (Ionic?.queue) {
      return Ionic.queue;
    }
    return {
      read: (cb) => win3.requestAnimationFrame(cb),
      write: (cb) => win3.requestAnimationFrame(cb)
    };
  }
  return {
    read: (cb) => cb(),
    write: (cb) => cb()
  };
};
var Platform = class {
  constructor(doc3, zone) {
    this.doc = doc3;
    this.backButton = new Subject();
    this.keyboardDidShow = new Subject();
    this.keyboardDidHide = new Subject();
    this.pause = new Subject();
    this.resume = new Subject();
    this.resize = new Subject();
    zone.run(() => {
      this.win = doc3.defaultView;
      this.backButton.subscribeWithPriority = function(priority, callback) {
        return this.subscribe((ev) => {
          return ev.register(priority, (processNextHandler) => zone.run(() => callback(processNextHandler)));
        });
      };
      proxyEvent(this.pause, doc3, "pause", zone);
      proxyEvent(this.resume, doc3, "resume", zone);
      proxyEvent(this.backButton, doc3, "ionBackButton", zone);
      proxyEvent(this.resize, this.win, "resize", zone);
      proxyEvent(this.keyboardDidShow, this.win, "ionKeyboardDidShow", zone);
      proxyEvent(this.keyboardDidHide, this.win, "ionKeyboardDidHide", zone);
      let readyResolve;
      this._readyPromise = new Promise((res) => {
        readyResolve = res;
      });
      if (this.win?.["cordova"]) {
        doc3.addEventListener("deviceready", () => {
          readyResolve("cordova");
        }, {
          once: true
        });
      } else {
        readyResolve("dom");
      }
    });
  }
  /**
   * @returns returns true/false based on platform.
   * @description
   * Depending on the platform the user is on, `is(platformName)` will
   * return `true` or `false`. Note that the same app can return `true`
   * for more than one platform name. For example, an app running from
   * an iPad would return `true` for the platform names: `mobile`,
   * `ios`, `ipad`, and `tablet`. Additionally, if the app was running
   * from Cordova then `cordova` would be true, and if it was running
   * from a web browser on the iPad then `mobileweb` would be `true`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(public platform: Platform) {
   *     if (this.platform.is('ios')) {
   *       // This will only print when on iOS
   *       console.log('I am an iOS device!');
   *     }
   *   }
   * }
   * ```
   *
   * | Platform Name   | Description                        |
   * |-----------------|------------------------------------|
   * | android         | on a device running Android.       |
   * | capacitor       | on a device running Capacitor.     |
   * | cordova         | on a device running Cordova.       |
   * | ios             | on a device running iOS.           |
   * | ipad            | on an iPad device.                 |
   * | iphone          | on an iPhone device.               |
   * | phablet         | on a phablet device.               |
   * | tablet          | on a tablet device.                |
   * | electron        | in Electron on a desktop device.   |
   * | pwa             | as a PWA app.                      |
   * | mobile          | on a mobile device.                |
   * | mobileweb       | on a mobile device in a browser.   |
   * | desktop         | on a desktop device.               |
   * | hybrid          | is a cordova or capacitor app.     |
   *
   */
  is(platformName) {
    return isPlatform2(this.win, platformName);
  }
  /**
   * @returns the array of platforms
   * @description
   * Depending on what device you are on, `platforms` can return multiple values.
   * Each possible value is a hierarchy of platforms. For example, on an iPhone,
   * it would return `mobile`, `ios`, and `iphone`.
   *
   * ```
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyPage {
   *   constructor(public platform: Platform) {
   *     // This will print an array of the current platforms
   *     console.log(this.platform.platforms());
   *   }
   * }
   * ```
   */
  platforms() {
    return getPlatforms2(this.win);
  }
  /**
   * Returns a promise when the platform is ready and native functionality
   * can be called. If the app is running from within a web browser, then
   * the promise will resolve when the DOM is ready. When the app is running
   * from an application engine such as Cordova, then the promise will
   * resolve when Cordova triggers the `deviceready` event.
   *
   * The resolved value is the `readySource`, which states which platform
   * ready was used. For example, when Cordova is ready, the resolved ready
   * source is `cordova`. The default ready source value will be `dom`. The
   * `readySource` is useful if different logic should run depending on the
   * platform the app is running from. For example, only Cordova can execute
   * the status bar plugin, so the web should not run status bar plugin logic.
   *
   * ```
   * import { Component } from '@angular/core';
   * import { Platform } from 'ionic-angular';
   *
   * @Component({...})
   * export MyApp {
   *   constructor(public platform: Platform) {
   *     this.platform.ready().then((readySource) => {
   *       console.log('Platform ready from', readySource);
   *       // Platform now ready, execute any required native code
   *     });
   *   }
   * }
   * ```
   */
  ready() {
    return this._readyPromise;
  }
  /**
   * Returns if this app is using right-to-left language direction or not.
   * We recommend the app's `index.html` file already has the correct `dir`
   * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
   * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
   */
  get isRTL() {
    return this.doc.dir === "rtl";
  }
  /**
   * Get the query string parameter
   */
  getQueryParam(key) {
    return readQueryParam(this.win.location.href, key);
  }
  /**
   * Returns `true` if the app is in landscape mode.
   */
  isLandscape() {
    return !this.isPortrait();
  }
  /**
   * Returns `true` if the app is in portrait mode.
   */
  isPortrait() {
    return this.win.matchMedia?.("(orientation: portrait)").matches;
  }
  testUserAgent(expression) {
    const nav = this.win.navigator;
    return !!(nav?.userAgent && nav.userAgent.indexOf(expression) >= 0);
  }
  /**
   * Get the current url.
   */
  url() {
    return this.win.location.href;
  }
  /**
   * Gets the width of the platform's viewport using `window.innerWidth`.
   */
  width() {
    return this.win.innerWidth;
  }
  /**
   * Gets the height of the platform's viewport using `window.innerHeight`.
   */
  height() {
    return this.win.innerHeight;
  }
};
Platform.ɵfac = function Platform_Factory(t) {
  return new (t || Platform)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone));
};
Platform.ɵprov = ɵɵdefineInjectable({
  token: Platform,
  factory: Platform.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: NgZone
    }];
  }, null);
})();
var readQueryParam = (url, key) => {
  key = key.replace(/[[\]\\]/g, "\\$&");
  const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
  const results = regex.exec(url);
  return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : null;
};
var proxyEvent = (emitter, el, eventName, zone) => {
  if (el) {
    el.addEventListener(eventName, (ev) => {
      zone.run(() => {
        const value = ev != null ? ev.detail : void 0;
        emitter.next(value);
      });
    });
  }
};
var NavController = class {
  constructor(platform, location, serializer, router) {
    this.location = location;
    this.serializer = serializer;
    this.router = router;
    this.direction = DEFAULT_DIRECTION;
    this.animated = DEFAULT_ANIMATED;
    this.guessDirection = "forward";
    this.lastNavId = -1;
    if (router) {
      router.events.subscribe((ev) => {
        if (ev instanceof NavigationStart) {
          const id = ev.restoredState ? ev.restoredState.navigationId : ev.id;
          this.guessDirection = id < this.lastNavId ? "back" : "forward";
          this.guessAnimation = !ev.restoredState ? this.guessDirection : void 0;
          this.lastNavId = this.guessDirection === "forward" ? ev.id : id;
        }
      });
    }
    platform.backButton.subscribeWithPriority(0, (processNextHandler) => {
      this.pop();
      processNextHandler();
    });
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
   *
   * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
   * and that it will show a "forward" animation by default.
   *
   * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
   * ```
   */
  navigateForward(url, options = {}) {
    this.setDirection("forward", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling:
   *
   * ```ts
   * this.navController.setDirection('back');
   * this.router.navigateByUrl(path);
   * ```
   *
   * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
   * and that it will show a "back" animation by default.
   *
   * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="back">Link</a>
   * ```
   */
  navigateBack(url, options = {}) {
    this.setDirection("back", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
   * it's equivalent to calling:
   *
   * ```ts
   * this.navController.setDirection('root');
   * this.router.navigateByUrl(path);
   * ```
   *
   * Going **root** means that all existing pages in the stack will be removed,
   * and the navigated page will become the single page in the stack.
   *
   * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
   *
   * ```html
   * <a routerLink="/path/to/page" routerDirection="root">Link</a>
   * ```
   */
  navigateRoot(url, options = {}) {
    this.setDirection("root", options.animated, options.animationDirection, options.animation);
    return this.navigate(url, options);
  }
  /**
   * Same as [Location](https://angular.io/api/common/Location)'s back() method.
   * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
   * by default.
   */
  back(options = {
    animated: true,
    animationDirection: "back"
  }) {
    this.setDirection("back", options.animated, options.animationDirection, options.animation);
    return this.location.back();
  }
  /**
   * This methods goes back in the context of Ionic's stack navigation.
   *
   * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
   * This is the recommended way to go back when you are using `ion-router-outlet`.
   *
   * Resolves to `true` if it was able to pop.
   */
  pop() {
    return __async(this, null, function* () {
      let outlet = this.topOutlet;
      while (outlet) {
        if (yield outlet.pop()) {
          return true;
        } else {
          outlet = outlet.parentOutlet;
        }
      }
      return false;
    });
  }
  /**
   * This methods specifies the direction of the next navigation performed by the Angular router.
   *
   * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
   *
   * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
   */
  setDirection(direction, animated, animationDirection, animationBuilder) {
    this.direction = direction;
    this.animated = getAnimation(direction, animated, animationDirection);
    this.animationBuilder = animationBuilder;
  }
  /**
   * @internal
   */
  setTopOutlet(outlet) {
    this.topOutlet = outlet;
  }
  /**
   * @internal
   */
  consumeTransition() {
    let direction = "root";
    let animation;
    const animationBuilder = this.animationBuilder;
    if (this.direction === "auto") {
      direction = this.guessDirection;
      animation = this.guessAnimation;
    } else {
      animation = this.animated;
      direction = this.direction;
    }
    this.direction = DEFAULT_DIRECTION;
    this.animated = DEFAULT_ANIMATED;
    this.animationBuilder = void 0;
    return {
      direction,
      animation,
      animationBuilder
    };
  }
  navigate(url, options) {
    if (Array.isArray(url)) {
      return this.router.navigate(url, options);
    } else {
      const urlTree = this.serializer.parse(url.toString());
      if (options.queryParams !== void 0) {
        urlTree.queryParams = __spreadValues({}, options.queryParams);
      }
      if (options.fragment !== void 0) {
        urlTree.fragment = options.fragment;
      }
      return this.router.navigateByUrl(urlTree, options);
    }
  }
};
NavController.ɵfac = function NavController_Factory(t) {
  return new (t || NavController)(ɵɵinject(Platform), ɵɵinject(Location), ɵɵinject(UrlSerializer), ɵɵinject(Router, 8));
};
NavController.ɵprov = ɵɵdefineInjectable({
  token: NavController,
  factory: NavController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Platform
    }, {
      type: Location
    }, {
      type: UrlSerializer
    }, {
      type: Router,
      decorators: [{
        type: Optional
      }]
    }];
  }, null);
})();
var getAnimation = (direction, animated, animationDirection) => {
  if (animated === false) {
    return void 0;
  }
  if (animationDirection !== void 0) {
    return animationDirection;
  }
  if (direction === "forward" || direction === "back") {
    return direction;
  } else if (direction === "root" && animated === true) {
    return "forward";
  }
  return void 0;
};
var DEFAULT_DIRECTION = "auto";
var DEFAULT_ANIMATED = void 0;
var Config2 = class {
  get(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.get(key, fallback);
    }
    return null;
  }
  getBoolean(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.getBoolean(key, fallback);
    }
    return false;
  }
  getNumber(key, fallback) {
    const c = getConfig();
    if (c) {
      return c.getNumber(key, fallback);
    }
    return 0;
  }
};
Config2.ɵfac = function Config_Factory(t) {
  return new (t || Config2)();
};
Config2.ɵprov = ɵɵdefineInjectable({
  token: Config2,
  factory: Config2.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Config2, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigToken = new InjectionToken("USERCONFIG");
var getConfig = () => {
  if (typeof window !== "undefined") {
    const Ionic = window.Ionic;
    if (Ionic?.config) {
      return Ionic.config;
    }
  }
  return null;
};
var NavParams = class {
  constructor(data = {}) {
    this.data = data;
  }
  /**
   * Get the value of a nav-parameter for the current view
   *
   * ```ts
   * import { NavParams } from 'ionic-angular';
   *
   * export class MyClass{
   *  constructor(public navParams: NavParams){
   *    // userParams is an object we have in our nav-parameters
   *    this.navParams.get('userParams');
   *  }
   * }
   * ```
   *
   * @param param Which param you want to look up
   */
  get(param) {
    return this.data[param];
  }
};
var AngularDelegate = class {
  constructor() {
    this.zone = inject(NgZone);
    this.applicationRef = inject(ApplicationRef);
  }
  create(environmentInjector, injector, elementReferenceKey) {
    return new AngularFrameworkDelegate(environmentInjector, injector, this.applicationRef, this.zone, elementReferenceKey);
  }
};
AngularDelegate.ɵfac = function AngularDelegate_Factory(t) {
  return new (t || AngularDelegate)();
};
AngularDelegate.ɵprov = ɵɵdefineInjectable({
  token: AngularDelegate,
  factory: AngularDelegate.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularDelegate, [{
    type: Injectable
  }], null, null);
})();
var AngularFrameworkDelegate = class {
  constructor(environmentInjector, injector, applicationRef, zone, elementReferenceKey) {
    this.environmentInjector = environmentInjector;
    this.injector = injector;
    this.applicationRef = applicationRef;
    this.zone = zone;
    this.elementReferenceKey = elementReferenceKey;
    this.elRefMap = /* @__PURE__ */ new WeakMap();
    this.elEventsMap = /* @__PURE__ */ new WeakMap();
  }
  attachViewToDom(container, component, params, cssClasses) {
    return this.zone.run(() => {
      return new Promise((resolve) => {
        const componentProps = __spreadValues({}, params);
        if (this.elementReferenceKey !== void 0) {
          componentProps[this.elementReferenceKey] = container;
        }
        const el = attachView(this.zone, this.environmentInjector, this.injector, this.applicationRef, this.elRefMap, this.elEventsMap, container, component, componentProps, cssClasses, this.elementReferenceKey);
        resolve(el);
      });
    });
  }
  removeViewFromDom(_container, component) {
    return this.zone.run(() => {
      return new Promise((resolve) => {
        const componentRef = this.elRefMap.get(component);
        if (componentRef) {
          componentRef.destroy();
          this.elRefMap.delete(component);
          const unbindEvents = this.elEventsMap.get(component);
          if (unbindEvents) {
            unbindEvents();
            this.elEventsMap.delete(component);
          }
        }
        resolve();
      });
    });
  }
};
var attachView = (zone, environmentInjector, injector, applicationRef, elRefMap, elEventsMap, container, component, params, cssClasses, elementReferenceKey) => {
  const childInjector = Injector.create({
    providers: getProviders(params),
    parent: injector
  });
  const componentRef = createComponent(component, {
    environmentInjector,
    elementInjector: childInjector
  });
  const instance = componentRef.instance;
  const hostElement = componentRef.location.nativeElement;
  if (params) {
    if (elementReferenceKey && instance[elementReferenceKey] !== void 0) {
      console.error(`[Ionic Error]: ${elementReferenceKey} is a reserved property when using ${container.tagName.toLowerCase()}. Rename or remove the "${elementReferenceKey}" property from ${component.name}.`);
    }
    Object.assign(instance, params);
  }
  if (cssClasses) {
    for (const cssClass of cssClasses) {
      hostElement.classList.add(cssClass);
    }
  }
  const unbindEvents = bindLifecycleEvents(zone, instance, hostElement);
  container.appendChild(hostElement);
  applicationRef.attachView(componentRef.hostView);
  elRefMap.set(hostElement, componentRef);
  elEventsMap.set(hostElement, unbindEvents);
  return hostElement;
};
var LIFECYCLES = [LIFECYCLE_WILL_ENTER, LIFECYCLE_DID_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_DID_LEAVE, LIFECYCLE_WILL_UNLOAD];
var bindLifecycleEvents = (zone, instance, element) => {
  return zone.run(() => {
    const unregisters = LIFECYCLES.filter((eventName) => typeof instance[eventName] === "function").map((eventName) => {
      const handler = (ev) => instance[eventName](ev.detail);
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    });
    return () => unregisters.forEach((fn) => fn());
  });
};
var NavParamsToken = new InjectionToken("NavParamsToken");
var getProviders = (params) => {
  return [{
    provide: NavParamsToken,
    useValue: params
  }, {
    provide: NavParams,
    useFactory: provideNavParamsInjectable,
    deps: [NavParamsToken]
  }];
};
var provideNavParamsInjectable = (params) => {
  return new NavParams(params);
};
var proxyInputs = (Cmp, inputs) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val) {
        this.z.runOutsideAngular(() => this.el[item] = val);
      }
    });
  });
};
var proxyMethods = (Cmp, methods) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};
var proxyOutputs = (instance, el, events) => {
  events.forEach((eventName) => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp(opts) {
  const decorator = function(cls) {
    const {
      defineCustomElementFn,
      inputs,
      methods
    } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs(cls, inputs);
    }
    if (methods) {
      proxyMethods(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var POPOVER_INPUTS = ["alignment", "animated", "arrow", "keepContentsMounted", "backdropDismiss", "cssClass", "dismissOnSelect", "enterAnimation", "event", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "translucent", "trigger", "triggerAction", "reference", "size", "side"];
var POPOVER_METHODS = ["present", "dismiss", "onDidDismiss", "onWillDismiss"];
var IonPopover = class IonPopover2 {
  constructor(c, r, z) {
    this.z = z;
    this.isCmpOpen = false;
    this.el = r.nativeElement;
    this.el.addEventListener("ionMount", () => {
      this.isCmpOpen = true;
      c.detectChanges();
    });
    this.el.addEventListener("didDismiss", () => {
      this.isCmpOpen = false;
      c.detectChanges();
    });
    proxyOutputs(this, this.el, ["ionPopoverDidPresent", "ionPopoverWillPresent", "ionPopoverWillDismiss", "ionPopoverDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonPopover.ɵfac = function IonPopover_Factory(t) {
  return new (t || IonPopover)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonPopover.ɵdir = ɵɵdefineDirective({
  type: IonPopover,
  selectors: [["ion-popover"]],
  contentQueries: function IonPopover_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    alignment: "alignment",
    animated: "animated",
    arrow: "arrow",
    keepContentsMounted: "keepContentsMounted",
    backdropDismiss: "backdropDismiss",
    cssClass: "cssClass",
    dismissOnSelect: "dismissOnSelect",
    enterAnimation: "enterAnimation",
    event: "event",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    showBackdrop: "showBackdrop",
    translucent: "translucent",
    trigger: "trigger",
    triggerAction: "triggerAction",
    reference: "reference",
    size: "size",
    side: "side"
  }
});
IonPopover = __decorate([
  ProxyCmp({
    inputs: POPOVER_INPUTS,
    methods: POPOVER_METHODS
  })
  /**
   * @Component extends from @Directive
   * so by defining the inputs here we
   * do not need to re-define them for the
   * lazy loaded popover.
   */
], IonPopover);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPopover, [{
    type: Directive,
    args: [{
      selector: "ion-popover",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: POPOVER_INPUTS
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: false
      }]
    }]
  });
})();
var MODAL_INPUTS = ["animated", "keepContentsMounted", "backdropBreakpoint", "backdropDismiss", "breakpoints", "canDismiss", "cssClass", "enterAnimation", "event", "handle", "handleBehavior", "initialBreakpoint", "isOpen", "keyboardClose", "leaveAnimation", "mode", "presentingElement", "showBackdrop", "translucent", "trigger"];
var MODAL_METHODS = ["present", "dismiss", "onDidDismiss", "onWillDismiss", "setCurrentBreakpoint", "getCurrentBreakpoint"];
var IonModal = class IonModal2 {
  constructor(c, r, z) {
    this.z = z;
    this.isCmpOpen = false;
    this.el = r.nativeElement;
    this.el.addEventListener("ionMount", () => {
      this.isCmpOpen = true;
      c.detectChanges();
    });
    this.el.addEventListener("didDismiss", () => {
      this.isCmpOpen = false;
      c.detectChanges();
    });
    proxyOutputs(this, this.el, ["ionModalDidPresent", "ionModalWillPresent", "ionModalWillDismiss", "ionModalDidDismiss", "ionBreakpointDidChange", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonModal.ɵfac = function IonModal_Factory(t) {
  return new (t || IonModal)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonModal.ɵdir = ɵɵdefineDirective({
  type: IonModal,
  selectors: [["ion-modal"]],
  contentQueries: function IonModal_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    animated: "animated",
    keepContentsMounted: "keepContentsMounted",
    backdropBreakpoint: "backdropBreakpoint",
    backdropDismiss: "backdropDismiss",
    breakpoints: "breakpoints",
    canDismiss: "canDismiss",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    event: "event",
    handle: "handle",
    handleBehavior: "handleBehavior",
    initialBreakpoint: "initialBreakpoint",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    presentingElement: "presentingElement",
    showBackdrop: "showBackdrop",
    translucent: "translucent",
    trigger: "trigger"
  }
});
IonModal = __decorate([
  ProxyCmp({
    inputs: MODAL_INPUTS,
    methods: MODAL_METHODS
  })
  /**
   * @Component extends from @Directive
   * so by defining the inputs here we
   * do not need to re-define them for the
   * lazy loaded popover.
   */
], IonModal);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonModal, [{
    type: Directive,
    args: [{
      selector: "ion-modal",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: MODAL_INPUTS
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, {
    template: [{
      type: ContentChild,
      args: [TemplateRef, {
        static: false
      }]
    }]
  });
})();
var insertView = (views, view, direction) => {
  if (direction === "root") {
    return setRoot(views, view);
  } else if (direction === "forward") {
    return setForward(views, view);
  } else {
    return setBack(views, view);
  }
};
var setRoot = (views, view) => {
  views = views.filter((v) => v.stackId !== view.stackId);
  views.push(view);
  return views;
};
var setForward = (views, view) => {
  const index = views.indexOf(view);
  if (index >= 0) {
    views = views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
  } else {
    views.push(view);
  }
  return views;
};
var setBack = (views, view) => {
  const index = views.indexOf(view);
  if (index >= 0) {
    return views.filter((v) => v.stackId !== view.stackId || v.id <= view.id);
  } else {
    return setRoot(views, view);
  }
};
var getUrl = (router, activatedRoute) => {
  const urlTree = router.createUrlTree(["."], {
    relativeTo: activatedRoute
  });
  return router.serializeUrl(urlTree);
};
var isTabSwitch = (enteringView, leavingView) => {
  if (!leavingView) {
    return true;
  }
  return enteringView.stackId !== leavingView.stackId;
};
var computeStackId = (prefixUrl, url) => {
  if (!prefixUrl) {
    return void 0;
  }
  const segments = toSegments(url);
  for (let i = 0; i < segments.length; i++) {
    if (i >= prefixUrl.length) {
      return segments[i];
    }
    if (segments[i] !== prefixUrl[i]) {
      return void 0;
    }
  }
  return void 0;
};
var toSegments = (path) => {
  return path.split("/").map((s) => s.trim()).filter((s) => s !== "");
};
var destroyView = (view) => {
  if (view) {
    view.ref.destroy();
    view.unlistenEvents();
  }
};
var StackController = class {
  constructor(tabsPrefix, containerEl, router, navCtrl, zone, location) {
    this.containerEl = containerEl;
    this.router = router;
    this.navCtrl = navCtrl;
    this.zone = zone;
    this.location = location;
    this.views = [];
    this.skipTransition = false;
    this.nextId = 0;
    this.tabsPrefix = tabsPrefix !== void 0 ? toSegments(tabsPrefix) : void 0;
  }
  createView(ref, activatedRoute) {
    const url = getUrl(this.router, activatedRoute);
    const element = ref?.location?.nativeElement;
    const unlistenEvents = bindLifecycleEvents(this.zone, ref.instance, element);
    return {
      id: this.nextId++,
      stackId: computeStackId(this.tabsPrefix, url),
      unlistenEvents,
      element,
      ref,
      url
    };
  }
  getExistingView(activatedRoute) {
    const activatedUrlKey = getUrl(this.router, activatedRoute);
    const view = this.views.find((vw) => vw.url === activatedUrlKey);
    if (view) {
      view.ref.changeDetectorRef.reattach();
    }
    return view;
  }
  setActive(enteringView) {
    const consumeResult = this.navCtrl.consumeTransition();
    let {
      direction,
      animation,
      animationBuilder
    } = consumeResult;
    const leavingView = this.activeView;
    const tabSwitch = isTabSwitch(enteringView, leavingView);
    if (tabSwitch) {
      direction = "back";
      animation = void 0;
    }
    const viewsSnapshot = this.views.slice();
    let currentNavigation;
    const router = this.router;
    if (router.getCurrentNavigation) {
      currentNavigation = router.getCurrentNavigation();
    } else if (router.navigations?.value) {
      currentNavigation = router.navigations.value;
    }
    if (currentNavigation?.extras?.replaceUrl) {
      if (this.views.length > 0) {
        this.views.splice(-1, 1);
      }
    }
    const reused = this.views.includes(enteringView);
    const views = this.insertView(enteringView, direction);
    if (!reused) {
      enteringView.ref.changeDetectorRef.detectChanges();
    }
    const customAnimation = enteringView.animationBuilder;
    if (animationBuilder === void 0 && direction === "back" && !tabSwitch && customAnimation !== void 0) {
      animationBuilder = customAnimation;
    }
    if (leavingView) {
      leavingView.animationBuilder = animationBuilder;
    }
    return this.zone.runOutsideAngular(() => {
      return this.wait(() => {
        if (leavingView) {
          leavingView.ref.changeDetectorRef.detach();
        }
        enteringView.ref.changeDetectorRef.reattach();
        return this.transition(enteringView, leavingView, animation, this.canGoBack(1), false, animationBuilder).then(() => cleanupAsync(enteringView, views, viewsSnapshot, this.location, this.zone)).then(() => ({
          enteringView,
          direction,
          animation,
          tabSwitch
        }));
      });
    });
  }
  canGoBack(deep, stackId = this.getActiveStackId()) {
    return this.getStack(stackId).length > deep;
  }
  pop(deep, stackId = this.getActiveStackId()) {
    return this.zone.run(() => {
      const views = this.getStack(stackId);
      if (views.length <= deep) {
        return Promise.resolve(false);
      }
      const view = views[views.length - deep - 1];
      let url = view.url;
      const viewSavedData = view.savedData;
      if (viewSavedData) {
        const primaryOutlet = viewSavedData.get("primary");
        if (primaryOutlet?.route?._routerState?.snapshot.url) {
          url = primaryOutlet.route._routerState.snapshot.url;
        }
      }
      const {
        animationBuilder
      } = this.navCtrl.consumeTransition();
      return this.navCtrl.navigateBack(url, __spreadProps(__spreadValues({}, view.savedExtras), {
        animation: animationBuilder
      })).then(() => true);
    });
  }
  startBackTransition() {
    const leavingView = this.activeView;
    if (leavingView) {
      const views = this.getStack(leavingView.stackId);
      const enteringView = views[views.length - 2];
      const customAnimation = enteringView.animationBuilder;
      return this.wait(() => {
        return this.transition(
          enteringView,
          // entering view
          leavingView,
          // leaving view
          "back",
          this.canGoBack(2),
          true,
          customAnimation
        );
      });
    }
    return Promise.resolve();
  }
  endBackTransition(shouldComplete) {
    if (shouldComplete) {
      this.skipTransition = true;
      this.pop(1);
    } else if (this.activeView) {
      cleanup(this.activeView, this.views, this.views, this.location, this.zone);
    }
  }
  getLastUrl(stackId) {
    const views = this.getStack(stackId);
    return views.length > 0 ? views[views.length - 1] : void 0;
  }
  /**
   * @internal
   */
  getRootUrl(stackId) {
    const views = this.getStack(stackId);
    return views.length > 0 ? views[0] : void 0;
  }
  getActiveStackId() {
    return this.activeView ? this.activeView.stackId : void 0;
  }
  /**
   * @internal
   */
  getActiveView() {
    return this.activeView;
  }
  hasRunningTask() {
    return this.runningTask !== void 0;
  }
  destroy() {
    this.containerEl = void 0;
    this.views.forEach(destroyView);
    this.activeView = void 0;
    this.views = [];
  }
  getStack(stackId) {
    return this.views.filter((v) => v.stackId === stackId);
  }
  insertView(enteringView, direction) {
    this.activeView = enteringView;
    this.views = insertView(this.views, enteringView, direction);
    return this.views.slice();
  }
  transition(enteringView, leavingView, direction, showGoBack, progressAnimation, animationBuilder) {
    if (this.skipTransition) {
      this.skipTransition = false;
      return Promise.resolve(false);
    }
    if (leavingView === enteringView) {
      return Promise.resolve(false);
    }
    const enteringEl = enteringView ? enteringView.element : void 0;
    const leavingEl = leavingView ? leavingView.element : void 0;
    const containerEl = this.containerEl;
    if (enteringEl && enteringEl !== leavingEl) {
      enteringEl.classList.add("ion-page");
      enteringEl.classList.add("ion-page-invisible");
      if (enteringEl.parentElement !== containerEl) {
        containerEl.appendChild(enteringEl);
      }
      if (containerEl.commit) {
        return containerEl.commit(enteringEl, leavingEl, {
          duration: direction === void 0 ? 0 : void 0,
          direction,
          showGoBack,
          progressAnimation,
          animationBuilder
        });
      }
    }
    return Promise.resolve(false);
  }
  wait(task) {
    return __async(this, null, function* () {
      if (this.runningTask !== void 0) {
        yield this.runningTask;
        this.runningTask = void 0;
      }
      const promise = this.runningTask = task();
      promise.finally(() => this.runningTask = void 0);
      return promise;
    });
  }
};
var cleanupAsync = (activeRoute, views, viewsSnapshot, location, zone) => {
  if (typeof requestAnimationFrame === "function") {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        cleanup(activeRoute, views, viewsSnapshot, location, zone);
        resolve();
      });
    });
  }
  return Promise.resolve();
};
var cleanup = (activeRoute, views, viewsSnapshot, location, zone) => {
  zone.run(() => viewsSnapshot.filter((view) => !views.includes(view)).forEach(destroyView));
  views.forEach((view) => {
    const locationWithoutParams = location.path().split("?")[0];
    const locationWithoutFragment = locationWithoutParams.split("#")[0];
    if (view !== activeRoute && view.url !== locationWithoutFragment) {
      const element = view.element;
      element.setAttribute("aria-hidden", "true");
      element.classList.add("ion-page-hidden");
      view.ref.changeDetectorRef.detach();
    }
  });
};
var IonRouterOutlet = class {
  constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
    this.parentOutlet = parentOutlet;
    this.activatedView = null;
    this.proxyMap = /* @__PURE__ */ new WeakMap();
    this.currentActivatedRoute$ = new BehaviorSubject(null);
    this.activated = null;
    this._activatedRoute = null;
    this.name = PRIMARY_OUTLET;
    this.stackWillChange = new EventEmitter();
    this.stackDidChange = new EventEmitter();
    this.activateEvents = new EventEmitter();
    this.deactivateEvents = new EventEmitter();
    this.parentContexts = inject(ChildrenOutletContexts);
    this.location = inject(ViewContainerRef);
    this.environmentInjector = inject(EnvironmentInjector);
    this.inputBinder = inject(INPUT_BINDER, {
      optional: true
    });
    this.supportsBindingToComponentInputs = true;
    this.config = inject(Config2);
    this.navCtrl = inject(NavController);
    this.nativeEl = elementRef.nativeElement;
    this.name = name || PRIMARY_OUTLET;
    this.tabsPrefix = tabs === "true" ? getUrl(router, activatedRoute) : void 0;
    this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, this.navCtrl, zone, commonLocation);
    this.parentContexts.onChildOutletCreated(this.name, this);
  }
  /** @internal */
  get activatedComponentRef() {
    return this.activated;
  }
  set animation(animation) {
    this.nativeEl.animation = animation;
  }
  set animated(animated) {
    this.nativeEl.animated = animated;
  }
  set swipeGesture(swipe) {
    this._swipeGesture = swipe;
    this.nativeEl.swipeHandler = swipe ? {
      canStart: () => this.stackCtrl.canGoBack(1) && !this.stackCtrl.hasRunningTask(),
      onStart: () => this.stackCtrl.startBackTransition(),
      onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue)
    } : void 0;
  }
  ngOnDestroy() {
    this.stackCtrl.destroy();
    this.inputBinder?.unsubscribeFromRouteData(this);
  }
  getContext() {
    return this.parentContexts.getContext(this.name);
  }
  ngOnInit() {
    this.initializeOutletWithName();
  }
  // Note: Ionic deviates from the Angular Router implementation here
  initializeOutletWithName() {
    if (!this.activated) {
      const context = this.getContext();
      if (context?.route) {
        this.activateWith(context.route, context.injector);
      }
    }
    new Promise((resolve) => componentOnReady(this.nativeEl, resolve)).then(() => {
      if (this._swipeGesture === void 0) {
        this.swipeGesture = this.config.getBoolean("swipeBackEnabled", this.nativeEl.mode === "ios");
      }
    });
  }
  get isActivated() {
    return !!this.activated;
  }
  get component() {
    if (!this.activated) {
      throw new Error("Outlet is not activated");
    }
    return this.activated.instance;
  }
  get activatedRoute() {
    if (!this.activated) {
      throw new Error("Outlet is not activated");
    }
    return this._activatedRoute;
  }
  get activatedRouteData() {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach() {
    throw new Error("incompatible reuse strategy");
  }
  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attach(_ref, _activatedRoute) {
    throw new Error("incompatible reuse strategy");
  }
  deactivate() {
    if (this.activated) {
      if (this.activatedView) {
        const context = this.getContext();
        this.activatedView.savedData = new Map(context.children["contexts"]);
        const primaryOutlet = this.activatedView.savedData.get("primary");
        if (primaryOutlet && context.route) {
          primaryOutlet.route = __spreadValues({}, context.route);
        }
        this.activatedView.savedExtras = {};
        if (context.route) {
          const contextSnapshot = context.route.snapshot;
          this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
          this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
        }
      }
      const c = this.component;
      this.activatedView = null;
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }
  activateWith(activatedRoute, environmentInjector) {
    if (this.isActivated) {
      throw new Error("Cannot activate an already activated outlet");
    }
    this._activatedRoute = activatedRoute;
    let cmpRef;
    let enteringView = this.stackCtrl.getExistingView(activatedRoute);
    if (enteringView) {
      cmpRef = this.activated = enteringView.ref;
      const saved = enteringView.savedData;
      if (saved) {
        const context = this.getContext();
        context.children["contexts"] = saved;
      }
      this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
    } else {
      const snapshot = activatedRoute._futureSnapshot;
      const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
      const component$ = new BehaviorSubject(null);
      const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
      const injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
      const component = snapshot.routeConfig.component ?? snapshot.component;
      cmpRef = this.activated = this.location.createComponent(component, {
        index: this.location.length,
        injector,
        environmentInjector: environmentInjector ?? this.environmentInjector
      });
      component$.next(cmpRef.instance);
      enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
      this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
      this.currentActivatedRoute$.next({
        component: cmpRef.instance,
        activatedRoute
      });
    }
    this.inputBinder?.bindActivatedRouteToOutletComponent(this);
    this.activatedView = enteringView;
    this.navCtrl.setTopOutlet(this);
    const leavingView = this.stackCtrl.getActiveView();
    this.stackWillChange.emit({
      enteringView,
      tabSwitch: isTabSwitch(enteringView, leavingView)
    });
    this.stackCtrl.setActive(enteringView).then((data) => {
      this.activateEvents.emit(cmpRef.instance);
      this.stackDidChange.emit(data);
    });
  }
  /**
   * Returns `true` if there are pages in the stack to go back.
   */
  canGoBack(deep = 1, stackId) {
    return this.stackCtrl.canGoBack(deep, stackId);
  }
  /**
   * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
   */
  pop(deep = 1, stackId) {
    return this.stackCtrl.pop(deep, stackId);
  }
  /**
   * Returns the URL of the active page of each stack.
   */
  getLastUrl(stackId) {
    const active = this.stackCtrl.getLastUrl(stackId);
    return active ? active.url : void 0;
  }
  /**
   * Returns the RouteView of the active page of each stack.
   * @internal
   */
  getLastRouteView(stackId) {
    return this.stackCtrl.getLastUrl(stackId);
  }
  /**
   * Returns the root view in the tab stack.
   * @internal
   */
  getRootView(stackId) {
    return this.stackCtrl.getRootUrl(stackId);
  }
  /**
   * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
   */
  getActiveStackId() {
    return this.stackCtrl.getActiveStackId();
  }
  /**
   * Since the activated route can change over the life time of a component in an ion router outlet, we create
   * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
   */
  createActivatedRouteProxy(component$, activatedRoute) {
    const proxy = new ActivatedRoute();
    proxy._futureSnapshot = activatedRoute._futureSnapshot;
    proxy._routerState = activatedRoute._routerState;
    proxy.snapshot = activatedRoute.snapshot;
    proxy.outlet = activatedRoute.outlet;
    proxy.component = activatedRoute.component;
    proxy._paramMap = this.proxyObservable(component$, "paramMap");
    proxy._queryParamMap = this.proxyObservable(component$, "queryParamMap");
    proxy.url = this.proxyObservable(component$, "url");
    proxy.params = this.proxyObservable(component$, "params");
    proxy.queryParams = this.proxyObservable(component$, "queryParams");
    proxy.fragment = this.proxyObservable(component$, "fragment");
    proxy.data = this.proxyObservable(component$, "data");
    return proxy;
  }
  /**
   * Create a wrapped observable that will switch to the latest activated route matched by the given component
   */
  proxyObservable(component$, path) {
    return component$.pipe(
      // First wait until the component instance is pushed
      filter((component) => !!component),
      switchMap((component) => this.currentActivatedRoute$.pipe(filter((current) => current !== null && current.component === component), switchMap((current) => current && current.activatedRoute[path]), distinctUntilChanged()))
    );
  }
  /**
   * Updates the activated route proxy for the given component to the new incoming router state
   */
  updateActivatedRouteProxy(component, activatedRoute) {
    const proxy = this.proxyMap.get(component);
    if (!proxy) {
      throw new Error(`Could not find activated route proxy for view`);
    }
    proxy._futureSnapshot = activatedRoute._futureSnapshot;
    proxy._routerState = activatedRoute._routerState;
    proxy.snapshot = activatedRoute.snapshot;
    proxy.outlet = activatedRoute.outlet;
    proxy.component = activatedRoute.component;
    this.currentActivatedRoute$.next({
      component,
      activatedRoute
    });
  }
};
IonRouterOutlet.ɵfac = function IonRouterOutlet_Factory(t) {
  return new (t || IonRouterOutlet)(ɵɵinjectAttribute("name"), ɵɵinjectAttribute("tabs"), ɵɵdirectiveInject(Location), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(IonRouterOutlet, 12));
};
IonRouterOutlet.ɵdir = ɵɵdefineDirective({
  type: IonRouterOutlet,
  selectors: [["ion-router-outlet"]],
  inputs: {
    animated: "animated",
    animation: "animation",
    mode: "mode",
    swipeGesture: "swipeGesture",
    name: "name"
  },
  outputs: {
    stackWillChange: "stackWillChange",
    stackDidChange: "stackDidChange",
    activateEvents: "activate",
    deactivateEvents: "deactivate"
  },
  exportAs: ["outlet"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRouterOutlet, [{
    type: Directive,
    args: [{
      selector: "ion-router-outlet",
      exportAs: "outlet",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "animation", "mode", "swipeGesture"]
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Attribute,
        args: ["name"]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Attribute,
        args: ["tabs"]
      }]
    }, {
      type: Location
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: NgZone
    }, {
      type: ActivatedRoute
    }, {
      type: IonRouterOutlet,
      decorators: [{
        type: SkipSelf
      }, {
        type: Optional
      }]
    }];
  }, {
    name: [{
      type: Input
    }],
    stackWillChange: [{
      type: Output
    }],
    stackDidChange: [{
      type: Output
    }],
    activateEvents: [{
      type: Output,
      args: ["activate"]
    }],
    deactivateEvents: [{
      type: Output,
      args: ["deactivate"]
    }]
  });
})();
var OutletInjector = class {
  constructor(route, childContexts, parent) {
    this.route = route;
    this.childContexts = childContexts;
    this.parent = parent;
  }
  get(token, notFoundValue) {
    if (token === ActivatedRoute) {
      return this.route;
    }
    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }
    return this.parent.get(token, notFoundValue);
  }
};
var INPUT_BINDER = new InjectionToken("");
var RoutedComponentInputBinder = class {
  constructor() {
    this.outletDataSubscriptions = /* @__PURE__ */ new Map();
  }
  bindActivatedRouteToOutletComponent(outlet) {
    this.unsubscribeFromRouteData(outlet);
    this.subscribeToRouteData(outlet);
  }
  unsubscribeFromRouteData(outlet) {
    this.outletDataSubscriptions.get(outlet)?.unsubscribe();
    this.outletDataSubscriptions.delete(outlet);
  }
  subscribeToRouteData(outlet) {
    const {
      activatedRoute
    } = outlet;
    const dataSubscription = combineLatest([activatedRoute.queryParams, activatedRoute.params, activatedRoute.data]).pipe(switchMap(([queryParams, params, data], index) => {
      data = __spreadValues(__spreadValues(__spreadValues({}, queryParams), params), data);
      if (index === 0) {
        return of(data);
      }
      return Promise.resolve(data);
    })).subscribe((data) => {
      if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      const mirror = reflectComponentType(activatedRoute.component);
      if (!mirror) {
        this.unsubscribeFromRouteData(outlet);
        return;
      }
      for (const {
        templateName
      } of mirror.inputs) {
        outlet.activatedComponentRef.setInput(templateName, data[templateName]);
      }
    });
    this.outletDataSubscriptions.set(outlet, dataSubscription);
  }
};
RoutedComponentInputBinder.ɵfac = function RoutedComponentInputBinder_Factory(t) {
  return new (t || RoutedComponentInputBinder)();
};
RoutedComponentInputBinder.ɵprov = ɵɵdefineInjectable({
  token: RoutedComponentInputBinder,
  factory: RoutedComponentInputBinder.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoutedComponentInputBinder, [{
    type: Injectable
  }], null, null);
})();
var provideComponentInputBinding = () => {
  return {
    provide: INPUT_BINDER,
    useFactory: componentInputBindingFactory,
    deps: [Router]
  };
};
function componentInputBindingFactory(router) {
  if (router?.componentInputBindingEnabled) {
    return new RoutedComponentInputBinder();
  }
  return null;
}
var BACK_BUTTON_INPUTS = ["color", "defaultHref", "disabled", "icon", "mode", "routerAnimation", "text", "type"];
var IonBackButton = class IonBackButton2 {
  constructor(routerOutlet, navCtrl, config3, r, z, c) {
    this.routerOutlet = routerOutlet;
    this.navCtrl = navCtrl;
    this.config = config3;
    this.r = r;
    this.z = z;
    c.detach();
    this.el = this.r.nativeElement;
  }
  /**
   * @internal
   */
  onClick(ev) {
    const defaultHref = this.defaultHref || this.config.get("backButtonDefaultHref");
    if (this.routerOutlet?.canGoBack()) {
      this.navCtrl.setDirection("back", void 0, void 0, this.routerAnimation);
      this.routerOutlet.pop();
      ev.preventDefault();
    } else if (defaultHref != null) {
      this.navCtrl.navigateBack(defaultHref, {
        animation: this.routerAnimation
      });
      ev.preventDefault();
    }
  }
};
IonBackButton.ɵfac = function IonBackButton_Factory(t) {
  return new (t || IonBackButton)(ɵɵdirectiveInject(IonRouterOutlet, 8), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(Config2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
};
IonBackButton.ɵdir = ɵɵdefineDirective({
  type: IonBackButton,
  hostBindings: function IonBackButton_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function IonBackButton_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    color: "color",
    defaultHref: "defaultHref",
    disabled: "disabled",
    icon: "icon",
    mode: "mode",
    routerAnimation: "routerAnimation",
    text: "text",
    type: "type"
  }
});
IonBackButton = __decorate([ProxyCmp({
  inputs: BACK_BUTTON_INPUTS
})], IonBackButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackButton, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: BACK_BUTTON_INPUTS
    }]
  }], function() {
    return [{
      type: IonRouterOutlet,
      decorators: [{
        type: Optional
      }]
    }, {
      type: NavController
    }, {
      type: Config2
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    defaultHref: [{
      type: Input
    }],
    routerAnimation: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var RouterLinkDelegateDirective = class {
  constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
    this.locationStrategy = locationStrategy;
    this.navCtrl = navCtrl;
    this.elementRef = elementRef;
    this.router = router;
    this.routerLink = routerLink;
    this.routerDirection = "forward";
  }
  ngOnInit() {
    this.updateTargetUrlAndHref();
  }
  ngOnChanges() {
    this.updateTargetUrlAndHref();
  }
  updateTargetUrlAndHref() {
    if (this.routerLink?.urlTree) {
      const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
      this.elementRef.nativeElement.href = href;
    }
  }
  /**
   * @internal
   */
  onClick(ev) {
    this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
    ev.preventDefault();
  }
};
RouterLinkDelegateDirective.ɵfac = function RouterLinkDelegateDirective_Factory(t) {
  return new (t || RouterLinkDelegateDirective)(ɵɵdirectiveInject(LocationStrategy), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(RouterLink, 8));
};
RouterLinkDelegateDirective.ɵdir = ɵɵdefineDirective({
  type: RouterLinkDelegateDirective,
  selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
  hostBindings: function RouterLinkDelegateDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function RouterLinkDelegateDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    routerDirection: "routerDirection",
    routerAnimation: "routerAnimation"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkDelegateDirective, [{
    type: Directive,
    args: [{
      selector: ":not(a):not(area)[routerLink]"
    }]
  }], function() {
    return [{
      type: LocationStrategy
    }, {
      type: NavController
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: RouterLink,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    routerDirection: [{
      type: Input
    }],
    routerAnimation: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var RouterLinkWithHrefDelegateDirective = class {
  constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
    this.locationStrategy = locationStrategy;
    this.navCtrl = navCtrl;
    this.elementRef = elementRef;
    this.router = router;
    this.routerLink = routerLink;
    this.routerDirection = "forward";
  }
  ngOnInit() {
    this.updateTargetUrlAndHref();
  }
  ngOnChanges() {
    this.updateTargetUrlAndHref();
  }
  updateTargetUrlAndHref() {
    if (this.routerLink?.urlTree) {
      const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
      this.elementRef.nativeElement.href = href;
    }
  }
  /**
   * @internal
   */
  onClick() {
    this.navCtrl.setDirection(this.routerDirection, void 0, void 0, this.routerAnimation);
  }
};
RouterLinkWithHrefDelegateDirective.ɵfac = function RouterLinkWithHrefDelegateDirective_Factory(t) {
  return new (t || RouterLinkWithHrefDelegateDirective)(ɵɵdirectiveInject(LocationStrategy), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(RouterLink, 8));
};
RouterLinkWithHrefDelegateDirective.ɵdir = ɵɵdefineDirective({
  type: RouterLinkWithHrefDelegateDirective,
  selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]],
  hostBindings: function RouterLinkWithHrefDelegateDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function RouterLinkWithHrefDelegateDirective_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    routerDirection: "routerDirection",
    routerAnimation: "routerAnimation"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkWithHrefDelegateDirective, [{
    type: Directive,
    args: [{
      selector: "a[routerLink],area[routerLink]"
    }]
  }], function() {
    return [{
      type: LocationStrategy
    }, {
      type: NavController
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: RouterLink,
      decorators: [{
        type: Optional
      }]
    }];
  }, {
    routerDirection: [{
      type: Input
    }],
    routerAnimation: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var NAV_INPUTS = ["animated", "animation", "root", "rootParams", "swipeGesture"];
var NAV_METHODS = ["push", "insert", "insertPages", "pop", "popTo", "popToRoot", "removeIndex", "setRoot", "setPages", "getActive", "getByIndex", "canGoBack", "getPrevious"];
var IonNav = class IonNav2 {
  constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
    this.z = z;
    c.detach();
    this.el = ref.nativeElement;
    ref.nativeElement.delegate = angularDelegate.create(environmentInjector, injector);
    proxyOutputs(this, this.el, ["ionNavDidChange", "ionNavWillChange"]);
  }
};
IonNav.ɵfac = function IonNav_Factory(t) {
  return new (t || IonNav)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(EnvironmentInjector), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(AngularDelegate), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
};
IonNav.ɵdir = ɵɵdefineDirective({
  type: IonNav,
  inputs: {
    animated: "animated",
    animation: "animation",
    root: "root",
    rootParams: "rootParams",
    swipeGesture: "swipeGesture"
  }
});
IonNav = __decorate([ProxyCmp({
  inputs: NAV_INPUTS,
  methods: NAV_METHODS
})], IonNav);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNav, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: NAV_INPUTS
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: EnvironmentInjector
    }, {
      type: Injector
    }, {
      type: AngularDelegate
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var IonTabs = class {
  constructor(navCtrl) {
    this.navCtrl = navCtrl;
    this.ionTabsWillChange = new EventEmitter();
    this.ionTabsDidChange = new EventEmitter();
    this.tabBarSlot = "bottom";
  }
  ngAfterContentInit() {
    this.detectSlotChanges();
  }
  ngAfterContentChecked() {
    this.detectSlotChanges();
  }
  /**
   * @internal
   */
  onStackWillChange({
    enteringView,
    tabSwitch
  }) {
    const stackId = enteringView.stackId;
    if (tabSwitch && stackId !== void 0) {
      this.ionTabsWillChange.emit({
        tab: stackId
      });
    }
  }
  /**
   * @internal
   */
  onStackDidChange({
    enteringView,
    tabSwitch
  }) {
    const stackId = enteringView.stackId;
    if (tabSwitch && stackId !== void 0) {
      if (this.tabBar) {
        this.tabBar.selectedTab = stackId;
      }
      this.ionTabsDidChange.emit({
        tab: stackId
      });
    }
  }
  /**
   * When a tab button is clicked, there are several scenarios:
   * 1. If the selected tab is currently active (the tab button has been clicked
   *    again), then it should go to the root view for that tab.
   *
   *   a. Get the saved root view from the router outlet. If the saved root view
   *      matches the tabRootUrl, set the route view to this view including the
   *      navigation extras.
   *   b. If the saved root view from the router outlet does
   *      not match, navigate to the tabRootUrl. No navigation extras are
   *      included.
   *
   * 2. If the current tab tab is not currently selected, get the last route
   *    view from the router outlet.
   *
   *   a. If the last route view exists, navigate to that view including any
   *      navigation extras
   *   b. If the last route view doesn't exist, then navigate
   *      to the default tabRootUrl
   */
  select(tabOrEvent) {
    const isTabString = typeof tabOrEvent === "string";
    const tab = isTabString ? tabOrEvent : tabOrEvent.detail.tab;
    const alreadySelected = this.outlet.getActiveStackId() === tab;
    const tabRootUrl = `${this.outlet.tabsPrefix}/${tab}`;
    if (!isTabString) {
      tabOrEvent.stopPropagation();
    }
    if (alreadySelected) {
      const activeStackId = this.outlet.getActiveStackId();
      const activeView = this.outlet.getLastRouteView(activeStackId);
      if (activeView?.url === tabRootUrl) {
        return;
      }
      const rootView = this.outlet.getRootView(tab);
      const navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
      return this.navCtrl.navigateRoot(tabRootUrl, __spreadProps(__spreadValues({}, navigationExtras), {
        animated: true,
        animationDirection: "back"
      }));
    } else {
      const lastRoute = this.outlet.getLastRouteView(tab);
      const url = lastRoute?.url || tabRootUrl;
      const navigationExtras = lastRoute?.savedExtras;
      return this.navCtrl.navigateRoot(url, __spreadProps(__spreadValues({}, navigationExtras), {
        animated: true,
        animationDirection: "back"
      }));
    }
  }
  getSelected() {
    return this.outlet.getActiveStackId();
  }
  /**
   * Detects changes to the slot attribute of the tab bar.
   *
   * If the slot attribute has changed, then the tab bar
   * should be relocated to the new slot position.
   */
  detectSlotChanges() {
    this.tabBars.forEach((tabBar) => {
      const currentSlot = tabBar.el.getAttribute("slot");
      if (currentSlot !== this.tabBarSlot) {
        this.tabBarSlot = currentSlot;
        this.relocateTabBar();
      }
    });
  }
  /**
   * Relocates the tab bar to the new slot position.
   */
  relocateTabBar() {
    const tabBar = this.tabBar.el;
    if (this.tabBarSlot === "top") {
      this.tabsInner.nativeElement.before(tabBar);
    } else {
      this.tabsInner.nativeElement.after(tabBar);
    }
  }
};
IonTabs.ɵfac = function IonTabs_Factory(t) {
  return new (t || IonTabs)(ɵɵdirectiveInject(NavController));
};
IonTabs.ɵdir = ɵɵdefineDirective({
  type: IonTabs,
  selectors: [["ion-tabs"]],
  viewQuery: function IonTabs_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7, ElementRef);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabsInner = _t.first);
    }
  },
  hostBindings: function IonTabs_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionTabButtonClick", function IonTabs_ionTabButtonClick_HostBindingHandler($event) {
        return ctx.select($event);
      });
    }
  },
  outputs: {
    ionTabsWillChange: "ionTabsWillChange",
    ionTabsDidChange: "ionTabsDidChange"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabs, [{
    type: Directive,
    args: [{
      selector: "ion-tabs"
    }]
  }], function() {
    return [{
      type: NavController
    }];
  }, {
    tabsInner: [{
      type: ViewChild,
      args: ["tabsInner", {
        read: ElementRef,
        static: true
      }]
    }],
    ionTabsWillChange: [{
      type: Output
    }],
    ionTabsDidChange: [{
      type: Output
    }],
    select: [{
      type: HostListener,
      args: ["ionTabButtonClick", ["$event"]]
    }]
  });
})();
var raf = (h) => {
  if (typeof __zone_symbol__requestAnimationFrame === "function") {
    return __zone_symbol__requestAnimationFrame(h);
  }
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(h);
  }
  return setTimeout(h);
};
var ValueAccessor = class {
  constructor(injector, elementRef) {
    this.injector = injector;
    this.elementRef = elementRef;
    this.onChange = () => {
    };
    this.onTouched = () => {
    };
  }
  writeValue(value) {
    this.elementRef.nativeElement.value = this.lastValue = value;
    setIonicClasses(this.elementRef);
  }
  /**
   * Notifies the ControlValueAccessor of a change in the value of the control.
   *
   * This is called by each of the ValueAccessor directives when we want to update
   * the status and validity of the form control. For example with text components this
   * is called when the ionInput event is fired. For select components this is called
   * when the ionChange event is fired.
   *
   * This also updates the Ionic form status classes on the element.
   *
   * @param el The component element.
   * @param value The new value of the control.
   */
  handleValueChange(el, value) {
    if (el === this.elementRef.nativeElement) {
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.onChange(value);
      }
      setIonicClasses(this.elementRef);
    }
  }
  _handleBlurEvent(el) {
    if (el === this.elementRef.nativeElement) {
      this.onTouched();
      setIonicClasses(this.elementRef);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
  ngOnDestroy() {
    if (this.statusChanges) {
      this.statusChanges.unsubscribe();
    }
  }
  ngAfterViewInit() {
    let ngControl;
    try {
      ngControl = this.injector.get(NgControl);
    } catch {
    }
    if (!ngControl) {
      return;
    }
    if (ngControl.statusChanges) {
      this.statusChanges = ngControl.statusChanges.subscribe(() => setIonicClasses(this.elementRef));
    }
    const formControl = ngControl.control;
    if (formControl) {
      const methodsToPatch = ["markAsTouched", "markAllAsTouched", "markAsUntouched", "markAsDirty", "markAsPristine"];
      methodsToPatch.forEach((method) => {
        if (typeof formControl[method] !== "undefined") {
          const oldFn = formControl[method].bind(formControl);
          formControl[method] = (...params) => {
            oldFn(...params);
            setIonicClasses(this.elementRef);
          };
        }
      });
    }
  }
};
ValueAccessor.ɵfac = function ValueAccessor_Factory(t) {
  return new (t || ValueAccessor)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
ValueAccessor.ɵdir = ɵɵdefineDirective({
  type: ValueAccessor,
  hostBindings: function ValueAccessor_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionBlur", function ValueAccessor_ionBlur_HostBindingHandler($event) {
        return ctx._handleBlurEvent($event.target);
      });
    }
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ValueAccessor, [{
    type: Directive
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleBlurEvent: [{
      type: HostListener,
      args: ["ionBlur", ["$event.target"]]
    }]
  });
})();
var setIonicClasses = (element) => {
  raf(() => {
    const input = element.nativeElement;
    const hasValue = input.value != null && input.value.toString().length > 0;
    const classes = getClasses(input);
    setClasses(input, classes);
    const item = input.closest("ion-item");
    if (item) {
      if (hasValue) {
        setClasses(item, [...classes, "item-has-value"]);
      } else {
        setClasses(item, classes);
      }
    }
  });
};
var getClasses = (element) => {
  const classList = element.classList;
  const classes = [];
  for (let i = 0; i < classList.length; i++) {
    const item = classList.item(i);
    if (item !== null && startsWith(item, "ng-")) {
      classes.push(`ion-${item.substring(3)}`);
    }
  }
  return classes;
};
var setClasses = (element, classes) => {
  const classList = element.classList;
  classList.remove("ion-valid", "ion-invalid", "ion-touched", "ion-untouched", "ion-dirty", "ion-pristine");
  classList.add(...classes);
};
var startsWith = (input, search) => {
  return input.substring(0, search.length) === search;
};
var IonicRouteStrategy = class {
  /**
   * Whether the given route should detach for later reuse.
   */
  shouldDetach(_route) {
    return false;
  }
  /**
   * Returns `false`, meaning the route (and its subtree) is never reattached
   */
  shouldAttach(_route) {
    return false;
  }
  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(_route, _detachedTree) {
    return;
  }
  /**
   * Returns `null` because this strategy does not store routes for later re-use.
   */
  retrieve(_route) {
    return null;
  }
  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and
   * current route config are identical and all route parameters are identical.
   */
  shouldReuseRoute(future, curr) {
    if (future.routeConfig !== curr.routeConfig) {
      return false;
    }
    const futureParams = future.params;
    const currentParams = curr.params;
    const keysA = Object.keys(futureParams);
    const keysB = Object.keys(currentParams);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (const key of keysA) {
      if (currentParams[key] !== futureParams[key]) {
        return false;
      }
    }
    return true;
  }
};
var OverlayBaseController = class {
  constructor(ctrl) {
    this.ctrl = ctrl;
  }
  /**
   * Creates a new overlay
   */
  create(opts) {
    return this.ctrl.create(opts || {});
  }
  /**
   * When `id` is not provided, it dismisses the top overlay.
   */
  dismiss(data, role, id) {
    return this.ctrl.dismiss(data, role, id);
  }
  /**
   * Returns the top overlay.
   */
  getTop() {
    return this.ctrl.getTop();
  }
};

// node_modules/@ionic/core/dist/esm-es5/cubic-bezier-fe2083dc.js
var getTimeGivenProgression2 = function(t, a, r, e, i) {
  return solveCubicBezier(t[1], a[1], r[1], e[1], i).map(function(i2) {
    return solveCubicParametricEquation(t[0], a[0], r[0], e[0], i2);
  });
};
var solveCubicParametricEquation = function(t, a, r, e, i) {
  var n = 3 * a * Math.pow(i - 1, 2);
  var u = -3 * r * i + 3 * r + e * i;
  var o = t * Math.pow(i - 1, 3);
  return i * (n + i * u) - o;
};
var solveCubicBezier = function(t, a, r, e, i) {
  t -= i;
  a -= i;
  r -= i;
  e -= i;
  var n = solveCubicEquation(e - 3 * r + 3 * a - t, 3 * r - 6 * a + 3 * t, 3 * a - 3 * t, t);
  return n.filter(function(t2) {
    return t2 >= 0 && t2 <= 1;
  });
};
var solveQuadraticEquation = function(t, a, r) {
  var e = a * a - 4 * t * r;
  if (e < 0) {
    return [];
  } else {
    return [(-a + Math.sqrt(e)) / (2 * t), (-a - Math.sqrt(e)) / (2 * t)];
  }
};
var solveCubicEquation = function(t, a, r, e) {
  if (t === 0) {
    return solveQuadraticEquation(a, r, e);
  }
  a /= t;
  r /= t;
  e /= t;
  var i = (3 * r - a * a) / 3;
  var n = (2 * a * a * a - 9 * a * r + 27 * e) / 27;
  if (i === 0) {
    return [Math.pow(-n, 1 / 3)];
  } else if (n === 0) {
    return [Math.sqrt(-i), -Math.sqrt(-i)];
  }
  var u = Math.pow(n / 2, 2) + Math.pow(i / 3, 3);
  if (u === 0) {
    return [Math.pow(n / 2, 1 / 2) - a / 3];
  } else if (u > 0) {
    return [Math.pow(-(n / 2) + Math.sqrt(u), 1 / 3) - Math.pow(n / 2 + Math.sqrt(u), 1 / 3) - a / 3];
  }
  var o = Math.sqrt(Math.pow(-(i / 3), 3));
  var v = Math.acos(-(n / (2 * Math.sqrt(Math.pow(-(i / 3), 3)))));
  var h = 2 * Math.pow(o, 1 / 3);
  return [h * Math.cos(v / 3) - a / 3, h * Math.cos((v + 2 * Math.PI) / 3) - a / 3, h * Math.cos((v + 4 * Math.PI) / 3) - a / 3];
};

// node_modules/@ionic/core/dist/esm-es5/gesture-controller-1bf57181.js
var GestureController2 = function() {
  function t() {
    this.gestureId = 0;
    this.requestedStart = /* @__PURE__ */ new Map();
    this.disabledGestures = /* @__PURE__ */ new Map();
    this.disabledScroll = /* @__PURE__ */ new Set();
  }
  t.prototype.createGesture = function(t2) {
    var i;
    return new GestureDelegate2(this, this.newID(), t2.name, (i = t2.priority) !== null && i !== void 0 ? i : 0, !!t2.disableScroll);
  };
  t.prototype.createBlocker = function(t2) {
    if (t2 === void 0) {
      t2 = {};
    }
    return new BlockerDelegate2(this, this.newID(), t2.disable, !!t2.disableScroll);
  };
  t.prototype.start = function(t2, i, n) {
    if (!this.canStart(t2)) {
      this.requestedStart.delete(i);
      return false;
    }
    this.requestedStart.set(i, n);
    return true;
  };
  t.prototype.capture = function(t2, i, n) {
    if (!this.start(t2, i, n)) {
      return false;
    }
    var e = this.requestedStart;
    var s = -1e4;
    e.forEach(function(t3) {
      s = Math.max(s, t3);
    });
    if (s === n) {
      this.capturedId = i;
      e.clear();
      var r = new CustomEvent("ionGestureCaptured", { detail: { gestureName: t2 } });
      document.dispatchEvent(r);
      return true;
    }
    e.delete(i);
    return false;
  };
  t.prototype.release = function(t2) {
    this.requestedStart.delete(t2);
    if (this.capturedId === t2) {
      this.capturedId = void 0;
    }
  };
  t.prototype.disableGesture = function(t2, i) {
    var n = this.disabledGestures.get(t2);
    if (n === void 0) {
      n = /* @__PURE__ */ new Set();
      this.disabledGestures.set(t2, n);
    }
    n.add(i);
  };
  t.prototype.enableGesture = function(t2, i) {
    var n = this.disabledGestures.get(t2);
    if (n !== void 0) {
      n.delete(i);
    }
  };
  t.prototype.disableScroll = function(t2) {
    this.disabledScroll.add(t2);
    if (this.disabledScroll.size === 1) {
      document.body.classList.add(BACKDROP_NO_SCROLL2);
    }
  };
  t.prototype.enableScroll = function(t2) {
    this.disabledScroll.delete(t2);
    if (this.disabledScroll.size === 0) {
      document.body.classList.remove(BACKDROP_NO_SCROLL2);
    }
  };
  t.prototype.canStart = function(t2) {
    if (this.capturedId !== void 0) {
      return false;
    }
    if (this.isDisabled(t2)) {
      return false;
    }
    return true;
  };
  t.prototype.isCaptured = function() {
    return this.capturedId !== void 0;
  };
  t.prototype.isScrollDisabled = function() {
    return this.disabledScroll.size > 0;
  };
  t.prototype.isDisabled = function(t2) {
    var i = this.disabledGestures.get(t2);
    if (i && i.size > 0) {
      return true;
    }
    return false;
  };
  t.prototype.newID = function() {
    this.gestureId++;
    return this.gestureId;
  };
  return t;
}();
var GestureDelegate2 = function() {
  function t(t2, i, n, e, s) {
    this.id = i;
    this.name = n;
    this.disableScroll = s;
    this.priority = e * 1e6 + i;
    this.ctrl = t2;
  }
  t.prototype.canStart = function() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.canStart(this.name);
  };
  t.prototype.start = function() {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.start(this.name, this.id, this.priority);
  };
  t.prototype.capture = function() {
    if (!this.ctrl) {
      return false;
    }
    var t2 = this.ctrl.capture(this.name, this.id, this.priority);
    if (t2 && this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
    return t2;
  };
  t.prototype.release = function() {
    if (this.ctrl) {
      this.ctrl.release(this.id);
      if (this.disableScroll) {
        this.ctrl.enableScroll(this.id);
      }
    }
  };
  t.prototype.destroy = function() {
    this.release();
    this.ctrl = void 0;
  };
  return t;
}();
var BlockerDelegate2 = function() {
  function t(t2, i, n, e) {
    this.id = i;
    this.disable = n;
    this.disableScroll = e;
    this.ctrl = t2;
  }
  t.prototype.block = function() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (var t2 = 0, i = this.disable; t2 < i.length; t2++) {
        var n = i[t2];
        this.ctrl.disableGesture(n, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.disableScroll(this.id);
    }
  };
  t.prototype.unblock = function() {
    if (!this.ctrl) {
      return;
    }
    if (this.disable) {
      for (var t2 = 0, i = this.disable; t2 < i.length; t2++) {
        var n = i[t2];
        this.ctrl.enableGesture(n, this.id);
      }
    }
    if (this.disableScroll) {
      this.ctrl.enableScroll(this.id);
    }
  };
  t.prototype.destroy = function() {
    this.unblock();
    this.ctrl = void 0;
  };
  return t;
}();
var BACKDROP_NO_SCROLL2 = "backdrop-no-scroll";
var GESTURE_CONTROLLER2 = new GestureController2();

// node_modules/@ionic/core/dist/esm-es5/index-2cf77112.js
var addEventListener2 = function(e, r, t, a) {
  var n = supportsPassive(e) ? { capture: !!a.capture, passive: !!a.passive } : !!a.capture;
  var i;
  var f;
  if (e["__zone_symbol__addEventListener"]) {
    i = "__zone_symbol__addEventListener";
    f = "__zone_symbol__removeEventListener";
  } else {
    i = "addEventListener";
    f = "removeEventListener";
  }
  e[i](r, t, n);
  return function() {
    e[f](r, t, n);
  };
};
var supportsPassive = function(e) {
  if (_sPassive === void 0) {
    try {
      var r = Object.defineProperty({}, "passive", { get: function() {
        _sPassive = true;
      } });
      e.addEventListener("optsTest", function() {
        return;
      }, r);
    } catch (e2) {
      _sPassive = false;
    }
  }
  return !!_sPassive;
};
var _sPassive;
var MOUSE_WAIT = 2e3;
var createPointerEvents = function(e, r, t, a, n) {
  var i;
  var f;
  var v;
  var u;
  var s;
  var o;
  var c;
  var d = 0;
  var l = function(a2) {
    d = Date.now() + MOUSE_WAIT;
    if (!r(a2)) {
      return;
    }
    if (!f && t) {
      f = addEventListener2(e, "touchmove", t, n);
    }
    if (!v) {
      v = addEventListener2(a2.target, "touchend", m, n);
    }
    if (!u) {
      u = addEventListener2(a2.target, "touchcancel", m, n);
    }
  };
  var E = function(a2) {
    if (d > Date.now()) {
      return;
    }
    if (!r(a2)) {
      return;
    }
    if (!o && t) {
      o = addEventListener2(getDocument(e), "mousemove", t, n);
    }
    if (!c) {
      c = addEventListener2(getDocument(e), "mouseup", p, n);
    }
  };
  var m = function(e2) {
    _();
    if (a) {
      a(e2);
    }
  };
  var p = function(e2) {
    L();
    if (a) {
      a(e2);
    }
  };
  var _ = function() {
    if (f) {
      f();
    }
    if (v) {
      v();
    }
    if (u) {
      u();
    }
    f = v = u = void 0;
  };
  var L = function() {
    if (o) {
      o();
    }
    if (c) {
      c();
    }
    o = c = void 0;
  };
  var D = function() {
    _();
    L();
  };
  var G = function(r2) {
    if (r2 === void 0) {
      r2 = true;
    }
    if (!r2) {
      if (i) {
        i();
      }
      if (s) {
        s();
      }
      i = s = void 0;
      D();
    } else {
      if (!i) {
        i = addEventListener2(e, "touchstart", l, n);
      }
      if (!s) {
        s = addEventListener2(e, "mousedown", E, n);
      }
    }
  };
  var P = function() {
    G(false);
    a = t = r = void 0;
  };
  return { enable: G, stop: D, destroy: P };
};
var getDocument = function(e) {
  return e instanceof Document ? e : e.ownerDocument;
};
var createPanRecognizer = function(e, r, t) {
  var a = t * (Math.PI / 180);
  var n = e === "x";
  var i = Math.cos(a);
  var f = r * r;
  var v = 0;
  var u = 0;
  var s = false;
  var o = 0;
  return { start: function(e2, r2) {
    v = e2;
    u = r2;
    o = 0;
    s = true;
  }, detect: function(e2, r2) {
    if (!s) {
      return false;
    }
    var t2 = e2 - v;
    var a2 = r2 - u;
    var c = t2 * t2 + a2 * a2;
    if (c < f) {
      return false;
    }
    var d = Math.sqrt(c);
    var l = (n ? t2 : a2) / d;
    if (l > i) {
      o = 1;
    } else if (l < -i) {
      o = -1;
    } else {
      o = 0;
    }
    s = false;
    return true;
  }, isGesture: function() {
    return o !== 0;
  }, getDirection: function() {
    return o;
  } };
};
var createGesture2 = function(e) {
  var r = false;
  var t = false;
  var a = true;
  var n = false;
  var i = Object.assign({ disableScroll: false, direction: "x", gesturePriority: 0, passive: true, maxAngle: 40, threshold: 10 }, e);
  var f = i.canStart;
  var v = i.onWillStart;
  var u = i.onStart;
  var s = i.onEnd;
  var o = i.notCaptured;
  var c = i.onMove;
  var d = i.threshold;
  var l = i.passive;
  var E = i.blurOnStart;
  var m = { type: "pan", startX: 0, startY: 0, startTime: 0, currentX: 0, currentY: 0, velocityX: 0, velocityY: 0, deltaX: 0, deltaY: 0, currentTime: 0, event: void 0, data: void 0 };
  var p = createPanRecognizer(i.direction, i.threshold, i.maxAngle);
  var _ = GESTURE_CONTROLLER2.createGesture({ name: e.gestureName, priority: e.gesturePriority, disableScroll: e.disableScroll });
  var L = function(e2) {
    var r2 = now(e2);
    if (t || !a) {
      return false;
    }
    updateDetail(e2, m);
    m.startX = m.currentX;
    m.startY = m.currentY;
    m.startTime = m.currentTime = r2;
    m.velocityX = m.velocityY = m.deltaX = m.deltaY = 0;
    m.event = e2;
    if (f && f(m) === false) {
      return false;
    }
    _.release();
    if (!_.start()) {
      return false;
    }
    t = true;
    if (d === 0) {
      return P();
    }
    p.start(m.startX, m.startY);
    return true;
  };
  var D = function(e2) {
    if (r) {
      if (!n && a) {
        n = true;
        calcGestureData(m, e2);
        requestAnimationFrame(G);
      }
      return;
    }
    calcGestureData(m, e2);
    if (p.detect(m.currentX, m.currentY)) {
      if (!p.isGesture() || !P()) {
        h();
      }
    }
  };
  var G = function() {
    if (!r) {
      return;
    }
    n = false;
    if (c) {
      c(m);
    }
  };
  var P = function() {
    if (!_.capture()) {
      return false;
    }
    r = true;
    a = false;
    m.startX = m.currentX;
    m.startY = m.currentY;
    m.startTime = m.currentTime;
    if (v) {
      v(m).then(y);
    } else {
      y();
    }
    return true;
  };
  var g = function() {
    if (typeof document !== "undefined") {
      var e2 = document.activeElement;
      if (e2 === null || e2 === void 0 ? void 0 : e2.blur) {
        e2.blur();
      }
    }
  };
  var y = function() {
    if (E) {
      g();
    }
    if (u) {
      u(m);
    }
    a = true;
  };
  var R = function() {
    r = false;
    t = false;
    n = false;
    a = true;
    _.release();
  };
  var T = function(e2) {
    var t2 = r;
    var n2 = a;
    R();
    if (!n2) {
      return;
    }
    calcGestureData(m, e2);
    if (t2) {
      if (s) {
        s(m);
      }
      return;
    }
    if (o) {
      o(m);
    }
  };
  var b = createPointerEvents(i.el, L, D, T, { capture: false, passive: l });
  var h = function() {
    R();
    b.stop();
    if (o) {
      o(m);
    }
  };
  return { enable: function(e2) {
    if (e2 === void 0) {
      e2 = true;
    }
    if (!e2) {
      if (r) {
        T(void 0);
      }
      R();
    }
    b.enable(e2);
  }, destroy: function() {
    _.destroy();
    b.destroy();
  } };
};
var calcGestureData = function(e, r) {
  if (!r) {
    return;
  }
  var t = e.currentX;
  var a = e.currentY;
  var n = e.currentTime;
  updateDetail(r, e);
  var i = e.currentX;
  var f = e.currentY;
  var v = e.currentTime = now(r);
  var u = v - n;
  if (u > 0 && u < 100) {
    var s = (i - t) / u;
    var o = (f - a) / u;
    e.velocityX = s * 0.7 + e.velocityX * 0.3;
    e.velocityY = o * 0.7 + e.velocityY * 0.3;
  }
  e.deltaX = i - e.startX;
  e.deltaY = f - e.startY;
  e.event = r;
};
var updateDetail = function(e, r) {
  var t = 0;
  var a = 0;
  if (e) {
    var n = e.changedTouches;
    if (n && n.length > 0) {
      var i = n[0];
      t = i.clientX;
      a = i.clientY;
    } else if (e.pageX !== void 0) {
      t = e.pageX;
      a = e.pageY;
    }
  }
  r.currentX = t;
  r.currentY = a;
};
var now = function(e) {
  return e.timeStamp || Date.now();
};

// node_modules/@ionic/core/dist/esm-es5/config-49c88215.js
var IonicSafeString2 = /* @__PURE__ */ function() {
  function e(e2) {
    this.value = e2;
  }
  return e;
}();
var setupConfig2 = function(e) {
  var r = window;
  var n = r.Ionic;
  if (n && n.config && n.config.constructor.name !== "Object") {
    return;
  }
  r.Ionic = r.Ionic || {};
  r.Ionic.config = Object.assign(Object.assign({}, r.Ionic.config), e);
  return r.Ionic.config;
};

// node_modules/@ionic/core/dist/esm-es5/theme-01f3f29c.js
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL2 = function(r, t, n, e) {
  return __awaiter(void 0, void 0, void 0, function() {
    var o;
    return __generator(this, function(a) {
      if (r != null && r[0] !== "#" && !SCHEME.test(r)) {
        o = document.querySelector("ion-router");
        if (o) {
          if (t != null) {
            t.preventDefault();
          }
          return [2, o.push(r, n, e)];
        }
      }
      return [2, false];
    });
  });
};

// node_modules/@ionic/core/dist/esm-es5/hardware-back-button-6107a37c.js
var MENU_BACK_BUTTON_PRIORITY2 = 99;

// node_modules/@ionic/core/dist/esm-es5/index-9b0d46f4.js
var printIonWarning2 = function(r) {
  var n = [];
  for (var o = 1; o < arguments.length; o++) {
    n[o - 1] = arguments[o];
  }
  return console.warn.apply(console, __spreadArray(["[Ionic Warning]: ".concat(r)], n, false));
};

// node_modules/@ionic/core/dist/esm-es5/index-6e05b96e.js
var baseAnimation2 = function(n) {
  return createAnimation2().duration(n ? 400 : 300);
};
var menuOverlayAnimation2 = function(n) {
  var r;
  var e;
  var t = n.width + 8;
  var i = createAnimation2();
  var a = createAnimation2();
  if (n.isEndSide) {
    r = t + "px";
    e = "0px";
  } else {
    r = -t + "px";
    e = "0px";
  }
  i.addElement(n.menuInnerEl).fromTo("transform", "translateX(".concat(r, ")"), "translateX(".concat(e, ")"));
  var o = getIonMode(n);
  var u = o === "ios";
  var s = u ? 0.2 : 0.25;
  a.addElement(n.backdropEl).fromTo("opacity", 0.01, s);
  return baseAnimation2(u).addAnimation([i, a]);
};
var menuPushAnimation2 = function(n) {
  var r;
  var e;
  var t = getIonMode(n);
  var i = n.width;
  if (n.isEndSide) {
    r = -i + "px";
    e = i + "px";
  } else {
    r = i + "px";
    e = -i + "px";
  }
  var a = createAnimation2().addElement(n.menuInnerEl).fromTo("transform", "translateX(".concat(e, ")"), "translateX(0px)");
  var o = createAnimation2().addElement(n.contentEl).fromTo("transform", "translateX(0px)", "translateX(".concat(r, ")"));
  var u = createAnimation2().addElement(n.backdropEl).fromTo("opacity", 0.01, 0.32);
  return baseAnimation2(t === "ios").addAnimation([a, o, u]);
};
var menuRevealAnimation2 = function(n) {
  var r = getIonMode(n);
  var e = n.width * (n.isEndSide ? -1 : 1) + "px";
  var t = createAnimation2().addElement(n.contentEl).fromTo("transform", "translateX(0px)", "translateX(".concat(e, ")"));
  return baseAnimation2(r === "ios").addAnimation(t);
};
var createMenuController2 = function() {
  var n = /* @__PURE__ */ new Map();
  var r = [];
  var e = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2, true)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, r2.open()];
            }
            return [2, false];
        }
      });
    });
  };
  var t = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, n2 !== void 0 ? c(n2, true) : f()];
          case 1:
            r2 = e2.sent();
            if (r2 !== void 0) {
              return [2, r2.close()];
            }
            return [2, false];
        }
      });
    });
  };
  var i = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2, true)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, r2.toggle()];
            }
            return [2, false];
        }
      });
    });
  };
  var a = function(n2, r2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var e2;
      return __generator(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, c(r2)];
          case 1:
            e2 = t2.sent();
            if (e2) {
              e2.disabled = !n2;
            }
            return [2, e2];
        }
      });
    });
  };
  var o = function(n2, r2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var e2;
      return __generator(this, function(t2) {
        switch (t2.label) {
          case 0:
            return [4, c(r2)];
          case 1:
            e2 = t2.sent();
            if (e2) {
              e2.swipeGesture = n2;
            }
            return [2, e2];
        }
      });
    });
  };
  var u = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2, r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            if (!(n2 != null)) return [3, 2];
            return [4, c(n2)];
          case 1:
            r2 = e2.sent();
            return [2, r2 !== void 0 && r2.isOpen()];
          case 2:
            return [4, f()];
          case 3:
            r2 = e2.sent();
            return [2, r2 !== void 0];
        }
      });
    });
  };
  var s = function(n2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var r2;
      return __generator(this, function(e2) {
        switch (e2.label) {
          case 0:
            return [4, c(n2)];
          case 1:
            r2 = e2.sent();
            if (r2) {
              return [2, !r2.disabled];
            }
            return [2, false];
        }
      });
    });
  };
  var c = function(n2) {
    var e2 = [];
    for (var t2 = 1; t2 < arguments.length; t2++) {
      e2[t2 - 1] = arguments[t2];
    }
    return __awaiter(void 0, __spreadArray([n2], e2, true), void 0, function(n3, e3) {
      var t3, i2, a2;
      if (e3 === void 0) {
        e3 = false;
      }
      return __generator(this, function(o2) {
        switch (o2.label) {
          case 0:
            return [4, x()];
          case 1:
            o2.sent();
            if (n3 === "start" || n3 === "end") {
              t3 = r.filter(function(r2) {
                return r2.side === n3 && !r2.disabled;
              });
              if (t3.length >= 1) {
                if (t3.length > 1 && e3) {
                  printIonWarning2('menuController queried for a menu on the "'.concat(n3, '" side, but ').concat(t3.length, " menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side."), t3.map(function(n4) {
                    return n4.el;
                  }));
                }
                return [2, t3[0].el];
              }
              i2 = r.filter(function(r2) {
                return r2.side === n3;
              });
              if (i2.length >= 1) {
                if (i2.length > 1 && e3) {
                  printIonWarning2('menuController queried for a menu on the "'.concat(n3, '" side, but ').concat(i2.length, " menus were found. The first menu reference will be used. If this is not the behavior you want then pass the ID of the menu instead of its side."), i2.map(function(n4) {
                    return n4.el;
                  }));
                }
                return [2, i2[0].el];
              }
            } else if (n3 != null) {
              return [2, b(function(r2) {
                return r2.menuId === n3;
              })];
            }
            a2 = b(function(n4) {
              return !n4.disabled;
            });
            if (a2) {
              return [2, a2];
            }
            return [2, r.length > 0 ? r[0].el : void 0];
        }
      });
    });
  };
  var f = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, w()];
        }
      });
    });
  };
  var v = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, g()];
        }
      });
    });
  };
  var d = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(n2) {
        switch (n2.label) {
          case 0:
            return [4, x()];
          case 1:
            n2.sent();
            return [2, A()];
        }
      });
    });
  };
  var _ = function(r2, e2) {
    n.set(r2, e2);
  };
  var m = function(n2) {
    if (r.indexOf(n2) < 0) {
      r.push(n2);
    }
  };
  var l = function(n2) {
    var e2 = r.indexOf(n2);
    if (e2 > -1) {
      r.splice(e2, 1);
    }
  };
  var h = function(n2, r2, e2) {
    return __awaiter(void 0, void 0, void 0, function() {
      var t2;
      return __generator(this, function(i2) {
        switch (i2.label) {
          case 0:
            if (A()) {
              return [2, false];
            }
            if (!r2) return [3, 3];
            return [4, f()];
          case 1:
            t2 = i2.sent();
            if (!(t2 && n2.el !== t2)) return [3, 3];
            return [4, t2.setOpen(false, false)];
          case 2:
            i2.sent();
            i2.label = 3;
          case 3:
            return [2, n2._setOpen(r2, e2)];
        }
      });
    });
  };
  var p = function(r2, e2) {
    var t2 = n.get(r2);
    if (!t2) {
      throw new Error("animation not registered");
    }
    var i2 = t2(e2);
    return i2;
  };
  var w = function() {
    return b(function(n2) {
      return n2._isOpen;
    });
  };
  var g = function() {
    return r.map(function(n2) {
      return n2.el;
    });
  };
  var A = function() {
    return r.some(function(n2) {
      return n2.isAnimating;
    });
  };
  var b = function(n2) {
    var e2 = r.find(n2);
    if (e2 !== void 0) {
      return e2.el;
    }
    return void 0;
  };
  var x = function() {
    return Promise.all(Array.from(document.querySelectorAll("ion-menu")).map(function(n2) {
      return new Promise(function(r2) {
        return componentOnReady2(n2, r2);
      });
    }));
  };
  _("reveal", menuRevealAnimation2);
  _("push", menuPushAnimation2);
  _("overlay", menuOverlayAnimation2);
  doc2 === null || doc2 === void 0 ? void 0 : doc2.addEventListener("ionBackButton", function(n2) {
    var r2 = w();
    if (r2) {
      n2.detail.register(MENU_BACK_BUTTON_PRIORITY2, function() {
        return r2.close();
      });
    }
  });
  return { registerAnimation: _, get: c, getMenus: v, getOpen: f, isEnabled: s, swipeGesture: o, isAnimating: d, isOpen: u, enable: a, toggle: i, close: t, open: e, _getOpenSync: w, _createAnimation: p, _register: m, _unregister: l, _setOpen: h };
};
var menuController2 = createMenuController2();

// node_modules/@ionic/core/dist/esm-es5/overlays-b874c3c3.js
var createController2 = function(e) {
  return { create: function(n) {
    return createOverlay2(e, n);
  }, dismiss: function(n, r, t) {
    return dismissOverlay2(document, n, r, e, t);
  }, getTop: function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(n) {
        return [2, getPresentedOverlay2(document, e)];
      });
    });
  } };
};
var alertController2 = createController2("ion-alert");
var actionSheetController2 = createController2("ion-action-sheet");
var loadingController2 = createController2("ion-loading");
var modalController2 = createController2("ion-modal");
var pickerController2 = createController2("ion-picker");
var popoverController2 = createController2("ion-popover");
var toastController2 = createController2("ion-toast");
var createOverlay2 = function(e, n) {
  if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
    return window.customElements.whenDefined(e).then(function() {
      var r = document.createElement(e);
      r.classList.add("overlay-hidden");
      Object.assign(r, Object.assign(Object.assign({}, n), { hasController: true }));
      getAppRoot2(document).appendChild(r);
      return new Promise(function(e2) {
        return componentOnReady2(r, e2);
      });
    });
  }
  return Promise.resolve();
};
var isOverlayHidden2 = function(e) {
  return e.classList.contains("overlay-hidden");
};
var dismissOverlay2 = function(e, n, r, t, o) {
  var a = getPresentedOverlay2(e, t, o);
  if (!a) {
    return Promise.reject("overlay does not exist");
  }
  return a.dismiss(n, r);
};
var getOverlays2 = function(e, n) {
  if (n === void 0) {
    n = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast";
  }
  return Array.from(e.querySelectorAll(n)).filter(function(e2) {
    return e2.overlayIndex > 0;
  });
};
var getPresentedOverlays2 = function(e, n) {
  return getOverlays2(e, n).filter(function(e2) {
    return !isOverlayHidden2(e2);
  });
};
var getPresentedOverlay2 = function(e, n, r) {
  var t = getPresentedOverlays2(e, n);
  return r === void 0 ? t[t.length - 1] : t.find(function(e2) {
    return e2.id === r;
  });
};
var getAppRoot2 = function(e) {
  return e.querySelector("ion-app") || e.body;
};

// node_modules/@ionic/core/dist/esm-es5/index.js
var IonicSlides = function(e) {
  var o = e.swiper, t = e.extendParams;
  var s = { effect: void 0, direction: "horizontal", initialSlide: 0, loop: false, parallax: false, slidesPerView: 1, spaceBetween: 0, speed: 300, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0, touchEventsTarget: "container", freeMode: false, freeModeMomentum: true, freeModeMomentumRatio: 1, freeModeMomentumBounce: true, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: false, freeModeMinimumVelocity: 0.02, autoHeight: false, setWrapperSize: false, zoom: { maxRatio: 3, minRatio: 1, toggle: false }, touchRatio: 1, touchAngle: 45, simulateTouch: true, touchStartPreventDefault: false, shortSwipes: true, longSwipes: true, longSwipesRatio: 0.5, longSwipesMs: 300, followFinger: true, threshold: 0, touchMoveStopPropagation: true, touchReleaseOnEdges: false, iOSEdgeSwipeDetection: false, iOSEdgeSwipeThreshold: 20, resistance: true, resistanceRatio: 0.85, watchSlidesProgress: false, watchSlidesVisibility: false, preventClicks: true, preventClicksPropagation: true, slideToClickedSlide: false, loopAdditionalSlides: 0, noSwiping: true, runCallbacksOnInit: true, coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }, flipEffect: { slideShadows: true, limitRotation: true }, cubeEffect: { slideShadows: true, shadow: true, shadowOffset: 20, shadowScale: 0.94 }, fadeEffect: { crossFade: false }, a11y: { prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide" } };
  if (o.pagination) {
    s.pagination = { type: "bullets", clickable: false, hideOnClick: false };
  }
  if (o.scrollbar) {
    s.scrollbar = { hide: true };
  }
  t(s);
};

// node_modules/@ionic/angular/fesm2020/ionic-angular.mjs
var _c02 = ["*"];
var _c1 = ["outlet"];
var _c2 = [[["", "slot", "top"]], "*"];
var _c3 = ["[slot=top]", "*"];
function IonModal_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelementContainer(1, 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
  }
}
function IonPopover_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
  }
}
var BooleanValueAccessorDirective = class extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  writeValue(value) {
    this.elementRef.nativeElement.checked = this.lastValue = value;
    setIonicClasses(this.elementRef);
  }
  _handleIonChange(el) {
    this.handleValueChange(el, el.checked);
  }
};
BooleanValueAccessorDirective.ɵfac = function BooleanValueAccessorDirective_Factory(t) {
  return new (t || BooleanValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
BooleanValueAccessorDirective.ɵdir = ɵɵdefineDirective({
  type: BooleanValueAccessorDirective,
  selectors: [["ion-checkbox"], ["ion-toggle"]],
  hostBindings: function BooleanValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionChange", function BooleanValueAccessorDirective_ionChange_HostBindingHandler($event) {
        return ctx._handleIonChange($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: BooleanValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BooleanValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-checkbox,ion-toggle",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: BooleanValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleIonChange: [{
      type: HostListener,
      args: ["ionChange", ["$event.target"]]
    }]
  });
})();
var NumericValueAccessorDirective = class extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  handleInputEvent(el) {
    this.handleValueChange(el, el.value);
  }
  registerOnChange(fn) {
    super.registerOnChange((value) => {
      fn(value === "" ? null : parseFloat(value));
    });
  }
};
NumericValueAccessorDirective.ɵfac = function NumericValueAccessorDirective_Factory(t) {
  return new (t || NumericValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
NumericValueAccessorDirective.ɵdir = ɵɵdefineDirective({
  type: NumericValueAccessorDirective,
  selectors: [["ion-input", "type", "number"]],
  hostBindings: function NumericValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionInput", function NumericValueAccessorDirective_ionInput_HostBindingHandler($event) {
        return ctx.handleInputEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumericValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumericValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event.target"]]
    }]
  });
})();
var RadioValueAccessorDirective = class extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  _handleIonSelect(el) {
    this.handleValueChange(el, el.checked);
  }
};
RadioValueAccessorDirective.ɵfac = function RadioValueAccessorDirective_Factory(t) {
  return new (t || RadioValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
RadioValueAccessorDirective.ɵdir = ɵɵdefineDirective({
  type: RadioValueAccessorDirective,
  selectors: [["ion-radio"]],
  hostBindings: function RadioValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionSelect", function RadioValueAccessorDirective_ionSelect_HostBindingHandler($event) {
        return ctx._handleIonSelect($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioValueAccessorDirective, [{
    type: Directive,
    args: [{
      /* tslint:disable-next-line:directive-selector */
      selector: "ion-radio",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: RadioValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleIonSelect: [{
      type: HostListener,
      args: ["ionSelect", ["$event.target"]]
    }]
  });
})();
var SelectValueAccessorDirective = class extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  _handleChangeEvent(el) {
    this.handleValueChange(el, el.value);
  }
};
SelectValueAccessorDirective.ɵfac = function SelectValueAccessorDirective_Factory(t) {
  return new (t || SelectValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
SelectValueAccessorDirective.ɵdir = ɵɵdefineDirective({
  type: SelectValueAccessorDirective,
  selectors: [["ion-select"], ["ion-radio-group"], ["ion-segment"], ["ion-datetime"]],
  hostBindings: function SelectValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionChange", function SelectValueAccessorDirective_ionChange_HostBindingHandler($event) {
        return ctx._handleChangeEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectValueAccessorDirective, [{
    type: Directive,
    args: [{
      /* tslint:disable-next-line:directive-selector */
      selector: "ion-select, ion-radio-group, ion-segment, ion-datetime",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleChangeEvent: [{
      type: HostListener,
      args: ["ionChange", ["$event.target"]]
    }]
  });
})();
var TextValueAccessorDirective = class extends ValueAccessor {
  constructor(injector, el) {
    super(injector, el);
  }
  _handleInputEvent(el) {
    this.handleValueChange(el, el.value);
  }
};
TextValueAccessorDirective.ɵfac = function TextValueAccessorDirective_Factory(t) {
  return new (t || TextValueAccessorDirective)(ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ElementRef));
};
TextValueAccessorDirective.ɵdir = ɵɵdefineDirective({
  type: TextValueAccessorDirective,
  selectors: [["ion-input", 3, "type", "number"], ["ion-textarea"], ["ion-searchbar"], ["ion-range"]],
  hostBindings: function TextValueAccessorDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("ionInput", function TextValueAccessorDirective_ionInput_HostBindingHandler($event) {
        return ctx._handleInputEvent($event.target);
      });
    }
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextValueAccessorDirective,
    multi: true
  }]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ion-input:not([type=number]),ion-textarea,ion-searchbar,ion-range",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextValueAccessorDirective,
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: Injector
    }, {
      type: ElementRef
    }];
  }, {
    _handleInputEvent: [{
      type: HostListener,
      args: ["ionInput", ["$event.target"]]
    }]
  });
})();
var proxyInputs2 = (Cmp, inputs) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val) {
        this.z.runOutsideAngular(() => this.el[item] = val);
      },
      /**
       * In the event that proxyInputs is called
       * multiple times re-defining these inputs
       * will cause an error to be thrown. As a result
       * we set configurable: true to indicate these
       * properties can be changed.
       */
      configurable: true
    });
  });
};
var proxyMethods2 = (Cmp, methods) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};
var proxyOutputs2 = (instance, el, events) => {
  events.forEach((eventName) => instance[eventName] = fromEvent(el, eventName));
};
function ProxyCmp2(opts) {
  const decorator = function(cls) {
    const {
      defineCustomElementFn,
      inputs,
      methods
    } = opts;
    if (defineCustomElementFn !== void 0) {
      defineCustomElementFn();
    }
    if (inputs) {
      proxyInputs2(cls, inputs);
    }
    if (methods) {
      proxyMethods2(cls, methods);
    }
    return cls;
  };
  return decorator;
}
var IonAccordion = class IonAccordion2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonAccordion.ɵfac = function IonAccordion_Factory(t) {
  return new (t || IonAccordion)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonAccordion.ɵcmp = ɵɵdefineComponent({
  type: IonAccordion,
  selectors: [["ion-accordion"]],
  inputs: {
    disabled: "disabled",
    mode: "mode",
    readonly: "readonly",
    toggleIcon: "toggleIcon",
    toggleIconSlot: "toggleIconSlot",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAccordion_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonAccordion = __decorate([ProxyCmp2({
  inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"]
})], IonAccordion);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAccordion, [{
    type: Component,
    args: [{
      selector: "ion-accordion",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "mode", "readonly", "toggleIcon", "toggleIconSlot", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonAccordionGroup = class IonAccordionGroup2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
};
IonAccordionGroup.ɵfac = function IonAccordionGroup_Factory(t) {
  return new (t || IonAccordionGroup)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonAccordionGroup.ɵcmp = ɵɵdefineComponent({
  type: IonAccordionGroup,
  selectors: [["ion-accordion-group"]],
  inputs: {
    animated: "animated",
    disabled: "disabled",
    expand: "expand",
    mode: "mode",
    multiple: "multiple",
    readonly: "readonly",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAccordionGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonAccordionGroup = __decorate([ProxyCmp2({
  inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"]
})], IonAccordionGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAccordionGroup, [{
    type: Component,
    args: [{
      selector: "ion-accordion-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "disabled", "expand", "mode", "multiple", "readonly", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonActionSheet = class IonActionSheet2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionActionSheetDidPresent", "ionActionSheetWillPresent", "ionActionSheetWillDismiss", "ionActionSheetDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonActionSheet.ɵfac = function IonActionSheet_Factory(t) {
  return new (t || IonActionSheet)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonActionSheet.ɵcmp = ɵɵdefineComponent({
  type: IonActionSheet,
  selectors: [["ion-action-sheet"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    subHeader: "subHeader",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonActionSheet_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonActionSheet = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonActionSheet);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonActionSheet, [{
    type: Component,
    args: [{
      selector: "ion-action-sheet",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "subHeader", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonAlert = class IonAlert2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionAlertDidPresent", "ionAlertWillPresent", "ionAlertWillDismiss", "ionAlertDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonAlert.ɵfac = function IonAlert_Factory(t) {
  return new (t || IonAlert)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonAlert.ɵcmp = ɵɵdefineComponent({
  type: IonAlert,
  selectors: [["ion-alert"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    cssClass: "cssClass",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    inputs: "inputs",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    subHeader: "subHeader",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAlert_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonAlert = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonAlert);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAlert, [{
    type: Component,
    args: [{
      selector: "ion-alert",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "cssClass", "enterAnimation", "header", "htmlAttributes", "inputs", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "subHeader", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonApp = class IonApp2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonApp.ɵfac = function IonApp_Factory(t) {
  return new (t || IonApp)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonApp.ɵcmp = ɵɵdefineComponent({
  type: IonApp,
  selectors: [["ion-app"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonApp_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonApp = __decorate([ProxyCmp2({})], IonApp);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonApp, [{
    type: Component,
    args: [{
      selector: "ion-app",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonAvatar = class IonAvatar2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonAvatar.ɵfac = function IonAvatar_Factory(t) {
  return new (t || IonAvatar)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonAvatar.ɵcmp = ɵɵdefineComponent({
  type: IonAvatar,
  selectors: [["ion-avatar"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonAvatar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonAvatar = __decorate([ProxyCmp2({})], IonAvatar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonAvatar, [{
    type: Component,
    args: [{
      selector: "ion-avatar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonBackdrop = class IonBackdrop2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionBackdropTap"]);
  }
};
IonBackdrop.ɵfac = function IonBackdrop_Factory(t) {
  return new (t || IonBackdrop)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonBackdrop.ɵcmp = ɵɵdefineComponent({
  type: IonBackdrop,
  selectors: [["ion-backdrop"]],
  inputs: {
    stopPropagation: "stopPropagation",
    tappable: "tappable",
    visible: "visible"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBackdrop_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonBackdrop = __decorate([ProxyCmp2({
  inputs: ["stopPropagation", "tappable", "visible"]
})], IonBackdrop);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackdrop, [{
    type: Component,
    args: [{
      selector: "ion-backdrop",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["stopPropagation", "tappable", "visible"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonBadge = class IonBadge2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonBadge.ɵfac = function IonBadge_Factory(t) {
  return new (t || IonBadge)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonBadge.ɵcmp = ɵɵdefineComponent({
  type: IonBadge,
  selectors: [["ion-badge"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBadge_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonBadge = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonBadge);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBadge, [{
    type: Component,
    args: [{
      selector: "ion-badge",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonBreadcrumb = class IonBreadcrumb2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
};
IonBreadcrumb.ɵfac = function IonBreadcrumb_Factory(t) {
  return new (t || IonBreadcrumb)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonBreadcrumb.ɵcmp = ɵɵdefineComponent({
  type: IonBreadcrumb,
  selectors: [["ion-breadcrumb"]],
  inputs: {
    active: "active",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    separator: "separator",
    target: "target"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBreadcrumb_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonBreadcrumb = __decorate([ProxyCmp2({
  inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"]
})], IonBreadcrumb);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBreadcrumb, [{
    type: Component,
    args: [{
      selector: "ion-breadcrumb",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["active", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "separator", "target"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonBreadcrumbs = class IonBreadcrumbs2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionCollapsedClick"]);
  }
};
IonBreadcrumbs.ɵfac = function IonBreadcrumbs_Factory(t) {
  return new (t || IonBreadcrumbs)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonBreadcrumbs.ɵcmp = ɵɵdefineComponent({
  type: IonBreadcrumbs,
  selectors: [["ion-breadcrumbs"]],
  inputs: {
    color: "color",
    itemsAfterCollapse: "itemsAfterCollapse",
    itemsBeforeCollapse: "itemsBeforeCollapse",
    maxItems: "maxItems",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBreadcrumbs_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonBreadcrumbs = __decorate([ProxyCmp2({
  inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"]
})], IonBreadcrumbs);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBreadcrumbs, [{
    type: Component,
    args: [{
      selector: "ion-breadcrumbs",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonButton = class IonButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
};
IonButton.ɵfac = function IonButton_Factory(t) {
  return new (t || IonButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonButton.ɵcmp = ɵɵdefineComponent({
  type: IonButton,
  selectors: [["ion-button"]],
  inputs: {
    buttonType: "buttonType",
    color: "color",
    disabled: "disabled",
    download: "download",
    expand: "expand",
    fill: "fill",
    form: "form",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    shape: "shape",
    size: "size",
    strong: "strong",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonButton = __decorate([ProxyCmp2({
  inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"]
})], IonButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonButton, [{
    type: Component,
    args: [{
      selector: "ion-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonButtons = class IonButtons2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonButtons.ɵfac = function IonButtons_Factory(t) {
  return new (t || IonButtons)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonButtons.ɵcmp = ɵɵdefineComponent({
  type: IonButtons,
  selectors: [["ion-buttons"]],
  inputs: {
    collapse: "collapse"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonButtons_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonButtons = __decorate([ProxyCmp2({
  inputs: ["collapse"]
})], IonButtons);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonButtons, [{
    type: Component,
    args: [{
      selector: "ion-buttons",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCard = class IonCard2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCard.ɵfac = function IonCard_Factory(t) {
  return new (t || IonCard)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCard.ɵcmp = ɵɵdefineComponent({
  type: IonCard,
  selectors: [["ion-card"]],
  inputs: {
    button: "button",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCard_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCard = __decorate([ProxyCmp2({
  inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
})], IonCard);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCard, [{
    type: Component,
    args: [{
      selector: "ion-card",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["button", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCardContent = class IonCardContent2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCardContent.ɵfac = function IonCardContent_Factory(t) {
  return new (t || IonCardContent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCardContent.ɵcmp = ɵɵdefineComponent({
  type: IonCardContent,
  selectors: [["ion-card-content"]],
  inputs: {
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCardContent = __decorate([ProxyCmp2({
  inputs: ["mode"]
})], IonCardContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardContent, [{
    type: Component,
    args: [{
      selector: "ion-card-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCardHeader = class IonCardHeader2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCardHeader.ɵfac = function IonCardHeader_Factory(t) {
  return new (t || IonCardHeader)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCardHeader.ɵcmp = ɵɵdefineComponent({
  type: IonCardHeader,
  selectors: [["ion-card-header"]],
  inputs: {
    color: "color",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCardHeader = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "translucent"]
})], IonCardHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardHeader, [{
    type: Component,
    args: [{
      selector: "ion-card-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCardSubtitle = class IonCardSubtitle2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCardSubtitle.ɵfac = function IonCardSubtitle_Factory(t) {
  return new (t || IonCardSubtitle)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCardSubtitle.ɵcmp = ɵɵdefineComponent({
  type: IonCardSubtitle,
  selectors: [["ion-card-subtitle"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardSubtitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCardSubtitle = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonCardSubtitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardSubtitle, [{
    type: Component,
    args: [{
      selector: "ion-card-subtitle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCardTitle = class IonCardTitle2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCardTitle.ɵfac = function IonCardTitle_Factory(t) {
  return new (t || IonCardTitle)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCardTitle.ɵcmp = ɵɵdefineComponent({
  type: IonCardTitle,
  selectors: [["ion-card-title"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCardTitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCardTitle = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonCardTitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCardTitle, [{
    type: Component,
    args: [{
      selector: "ion-card-title",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCheckbox = class IonCheckbox2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
  }
};
IonCheckbox.ɵfac = function IonCheckbox_Factory(t) {
  return new (t || IonCheckbox)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCheckbox.ɵcmp = ɵɵdefineComponent({
  type: IonCheckbox,
  selectors: [["ion-checkbox"]],
  inputs: {
    alignment: "alignment",
    checked: "checked",
    color: "color",
    disabled: "disabled",
    indeterminate: "indeterminate",
    justify: "justify",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCheckbox = __decorate([ProxyCmp2({
  inputs: ["alignment", "checked", "color", "disabled", "indeterminate", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
})], IonCheckbox);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCheckbox, [{
    type: Component,
    args: [{
      selector: "ion-checkbox",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "checked", "color", "disabled", "indeterminate", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonChip = class IonChip2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonChip.ɵfac = function IonChip_Factory(t) {
  return new (t || IonChip)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonChip.ɵcmp = ɵɵdefineComponent({
  type: IonChip,
  selectors: [["ion-chip"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    mode: "mode",
    outline: "outline"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonChip_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonChip = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "mode", "outline"]
})], IonChip);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonChip, [{
    type: Component,
    args: [{
      selector: "ion-chip",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "mode", "outline"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonCol = class IonCol2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonCol.ɵfac = function IonCol_Factory(t) {
  return new (t || IonCol)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonCol.ɵcmp = ɵɵdefineComponent({
  type: IonCol,
  selectors: [["ion-col"]],
  inputs: {
    offset: "offset",
    offsetLg: "offsetLg",
    offsetMd: "offsetMd",
    offsetSm: "offsetSm",
    offsetXl: "offsetXl",
    offsetXs: "offsetXs",
    pull: "pull",
    pullLg: "pullLg",
    pullMd: "pullMd",
    pullSm: "pullSm",
    pullXl: "pullXl",
    pullXs: "pullXs",
    push: "push",
    pushLg: "pushLg",
    pushMd: "pushMd",
    pushSm: "pushSm",
    pushXl: "pushXl",
    pushXs: "pushXs",
    size: "size",
    sizeLg: "sizeLg",
    sizeMd: "sizeMd",
    sizeSm: "sizeSm",
    sizeXl: "sizeXl",
    sizeXs: "sizeXs"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonCol_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonCol = __decorate([ProxyCmp2({
  inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"]
})], IonCol);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonCol, [{
    type: Component,
    args: [{
      selector: "ion-col",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonContent = class IonContent2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionScrollStart", "ionScroll", "ionScrollEnd"]);
  }
};
IonContent.ɵfac = function IonContent_Factory(t) {
  return new (t || IonContent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonContent.ɵcmp = ɵɵdefineComponent({
  type: IonContent,
  selectors: [["ion-content"]],
  inputs: {
    color: "color",
    forceOverscroll: "forceOverscroll",
    fullscreen: "fullscreen",
    scrollEvents: "scrollEvents",
    scrollX: "scrollX",
    scrollY: "scrollY"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonContent = __decorate([ProxyCmp2({
  inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"],
  methods: ["getScrollElement", "scrollToTop", "scrollToBottom", "scrollByPoint", "scrollToPoint"]
})], IonContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonContent, [{
    type: Component,
    args: [{
      selector: "ion-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonDatetime = class IonDatetime2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionCancel", "ionChange", "ionFocus", "ionBlur"]);
  }
};
IonDatetime.ɵfac = function IonDatetime_Factory(t) {
  return new (t || IonDatetime)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonDatetime.ɵcmp = ɵɵdefineComponent({
  type: IonDatetime,
  selectors: [["ion-datetime"]],
  inputs: {
    cancelText: "cancelText",
    clearText: "clearText",
    color: "color",
    dayValues: "dayValues",
    disabled: "disabled",
    doneText: "doneText",
    firstDayOfWeek: "firstDayOfWeek",
    formatOptions: "formatOptions",
    highlightedDates: "highlightedDates",
    hourCycle: "hourCycle",
    hourValues: "hourValues",
    isDateEnabled: "isDateEnabled",
    locale: "locale",
    max: "max",
    min: "min",
    minuteValues: "minuteValues",
    mode: "mode",
    monthValues: "monthValues",
    multiple: "multiple",
    name: "name",
    preferWheel: "preferWheel",
    presentation: "presentation",
    readonly: "readonly",
    showClearButton: "showClearButton",
    showDefaultButtons: "showDefaultButtons",
    showDefaultTimeLabel: "showDefaultTimeLabel",
    showDefaultTitle: "showDefaultTitle",
    size: "size",
    titleSelectedDatesFormatter: "titleSelectedDatesFormatter",
    value: "value",
    yearValues: "yearValues"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonDatetime_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonDatetime = __decorate([ProxyCmp2({
  inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"],
  methods: ["confirm", "reset", "cancel"]
})], IonDatetime);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonDatetime, [{
    type: Component,
    args: [{
      selector: "ion-datetime",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["cancelText", "clearText", "color", "dayValues", "disabled", "doneText", "firstDayOfWeek", "formatOptions", "highlightedDates", "hourCycle", "hourValues", "isDateEnabled", "locale", "max", "min", "minuteValues", "mode", "monthValues", "multiple", "name", "preferWheel", "presentation", "readonly", "showClearButton", "showDefaultButtons", "showDefaultTimeLabel", "showDefaultTitle", "size", "titleSelectedDatesFormatter", "value", "yearValues"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonDatetimeButton = class IonDatetimeButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonDatetimeButton.ɵfac = function IonDatetimeButton_Factory(t) {
  return new (t || IonDatetimeButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonDatetimeButton.ɵcmp = ɵɵdefineComponent({
  type: IonDatetimeButton,
  selectors: [["ion-datetime-button"]],
  inputs: {
    color: "color",
    datetime: "datetime",
    disabled: "disabled",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonDatetimeButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonDatetimeButton = __decorate([ProxyCmp2({
  inputs: ["color", "datetime", "disabled", "mode"]
})], IonDatetimeButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonDatetimeButton, [{
    type: Component,
    args: [{
      selector: "ion-datetime-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "datetime", "disabled", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonFab = class IonFab2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonFab.ɵfac = function IonFab_Factory(t) {
  return new (t || IonFab)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonFab.ɵcmp = ɵɵdefineComponent({
  type: IonFab,
  selectors: [["ion-fab"]],
  inputs: {
    activated: "activated",
    edge: "edge",
    horizontal: "horizontal",
    vertical: "vertical"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFab_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonFab = __decorate([ProxyCmp2({
  inputs: ["activated", "edge", "horizontal", "vertical"],
  methods: ["close"]
})], IonFab);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFab, [{
    type: Component,
    args: [{
      selector: "ion-fab",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "edge", "horizontal", "vertical"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonFabButton = class IonFabButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
};
IonFabButton.ɵfac = function IonFabButton_Factory(t) {
  return new (t || IonFabButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonFabButton.ɵcmp = ɵɵdefineComponent({
  type: IonFabButton,
  selectors: [["ion-fab-button"]],
  inputs: {
    activated: "activated",
    closeIcon: "closeIcon",
    color: "color",
    disabled: "disabled",
    download: "download",
    href: "href",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    show: "show",
    size: "size",
    target: "target",
    translucent: "translucent",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFabButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonFabButton = __decorate([ProxyCmp2({
  inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"]
})], IonFabButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFabButton, [{
    type: Component,
    args: [{
      selector: "ion-fab-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "closeIcon", "color", "disabled", "download", "href", "mode", "rel", "routerAnimation", "routerDirection", "show", "size", "target", "translucent", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonFabList = class IonFabList2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonFabList.ɵfac = function IonFabList_Factory(t) {
  return new (t || IonFabList)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonFabList.ɵcmp = ɵɵdefineComponent({
  type: IonFabList,
  selectors: [["ion-fab-list"]],
  inputs: {
    activated: "activated",
    side: "side"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFabList_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonFabList = __decorate([ProxyCmp2({
  inputs: ["activated", "side"]
})], IonFabList);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFabList, [{
    type: Component,
    args: [{
      selector: "ion-fab-list",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activated", "side"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonFooter = class IonFooter2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonFooter.ɵfac = function IonFooter_Factory(t) {
  return new (t || IonFooter)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonFooter.ɵcmp = ɵɵdefineComponent({
  type: IonFooter,
  selectors: [["ion-footer"]],
  inputs: {
    collapse: "collapse",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonFooter_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonFooter = __decorate([ProxyCmp2({
  inputs: ["collapse", "mode", "translucent"]
})], IonFooter);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonFooter, [{
    type: Component,
    args: [{
      selector: "ion-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonGrid = class IonGrid2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonGrid.ɵfac = function IonGrid_Factory(t) {
  return new (t || IonGrid)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonGrid.ɵcmp = ɵɵdefineComponent({
  type: IonGrid,
  selectors: [["ion-grid"]],
  inputs: {
    fixed: "fixed"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonGrid_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonGrid = __decorate([ProxyCmp2({
  inputs: ["fixed"]
})], IonGrid);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonGrid, [{
    type: Component,
    args: [{
      selector: "ion-grid",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["fixed"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonHeader = class IonHeader2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonHeader.ɵfac = function IonHeader_Factory(t) {
  return new (t || IonHeader)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonHeader.ɵcmp = ɵɵdefineComponent({
  type: IonHeader,
  selectors: [["ion-header"]],
  inputs: {
    collapse: "collapse",
    mode: "mode",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonHeader = __decorate([ProxyCmp2({
  inputs: ["collapse", "mode", "translucent"]
})], IonHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonHeader, [{
    type: Component,
    args: [{
      selector: "ion-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["collapse", "mode", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonIcon = class IonIcon2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonIcon.ɵfac = function IonIcon_Factory(t) {
  return new (t || IonIcon)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonIcon.ɵcmp = ɵɵdefineComponent({
  type: IonIcon,
  selectors: [["ion-icon"]],
  inputs: {
    color: "color",
    flipRtl: "flipRtl",
    icon: "icon",
    ios: "ios",
    lazy: "lazy",
    md: "md",
    mode: "mode",
    name: "name",
    sanitize: "sanitize",
    size: "size",
    src: "src"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonIcon_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonIcon = __decorate([ProxyCmp2({
  inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"]
})], IonIcon);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonIcon, [{
    type: Component,
    args: [{
      selector: "ion-icon",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonImg = class IonImg2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionImgWillLoad", "ionImgDidLoad", "ionError"]);
  }
};
IonImg.ɵfac = function IonImg_Factory(t) {
  return new (t || IonImg)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonImg.ɵcmp = ɵɵdefineComponent({
  type: IonImg,
  selectors: [["ion-img"]],
  inputs: {
    alt: "alt",
    src: "src"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonImg_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonImg = __decorate([ProxyCmp2({
  inputs: ["alt", "src"]
})], IonImg);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonImg, [{
    type: Component,
    args: [{
      selector: "ion-img",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alt", "src"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonInfiniteScroll = class IonInfiniteScroll2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInfinite"]);
  }
};
IonInfiniteScroll.ɵfac = function IonInfiniteScroll_Factory(t) {
  return new (t || IonInfiniteScroll)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonInfiniteScroll.ɵcmp = ɵɵdefineComponent({
  type: IonInfiniteScroll,
  selectors: [["ion-infinite-scroll"]],
  inputs: {
    disabled: "disabled",
    position: "position",
    threshold: "threshold"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInfiniteScroll_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonInfiniteScroll = __decorate([ProxyCmp2({
  inputs: ["disabled", "position", "threshold"],
  methods: ["complete"]
})], IonInfiniteScroll);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInfiniteScroll, [{
    type: Component,
    args: [{
      selector: "ion-infinite-scroll",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "position", "threshold"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonInfiniteScrollContent = class IonInfiniteScrollContent2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonInfiniteScrollContent.ɵfac = function IonInfiniteScrollContent_Factory(t) {
  return new (t || IonInfiniteScrollContent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonInfiniteScrollContent.ɵcmp = ɵɵdefineComponent({
  type: IonInfiniteScrollContent,
  selectors: [["ion-infinite-scroll-content"]],
  inputs: {
    loadingSpinner: "loadingSpinner",
    loadingText: "loadingText"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInfiniteScrollContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonInfiniteScrollContent = __decorate([ProxyCmp2({
  inputs: ["loadingSpinner", "loadingText"]
})], IonInfiniteScrollContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInfiniteScrollContent, [{
    type: Component,
    args: [{
      selector: "ion-infinite-scroll-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["loadingSpinner", "loadingText"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonInput = class IonInput2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInput", "ionChange", "ionBlur", "ionFocus"]);
  }
};
IonInput.ɵfac = function IonInput_Factory(t) {
  return new (t || IonInput)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonInput.ɵcmp = ɵɵdefineComponent({
  type: IonInput,
  selectors: [["ion-input"]],
  inputs: {
    accept: "accept",
    autocapitalize: "autocapitalize",
    autocomplete: "autocomplete",
    autocorrect: "autocorrect",
    autofocus: "autofocus",
    clearInput: "clearInput",
    clearOnEdit: "clearOnEdit",
    color: "color",
    counter: "counter",
    counterFormatter: "counterFormatter",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    errorText: "errorText",
    fill: "fill",
    helperText: "helperText",
    inputmode: "inputmode",
    label: "label",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    max: "max",
    maxlength: "maxlength",
    min: "min",
    minlength: "minlength",
    mode: "mode",
    multiple: "multiple",
    name: "name",
    pattern: "pattern",
    placeholder: "placeholder",
    readonly: "readonly",
    required: "required",
    shape: "shape",
    size: "size",
    spellcheck: "spellcheck",
    step: "step",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonInput_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonInput = __decorate([ProxyCmp2({
  inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"],
  methods: ["setFocus", "getInputElement"]
})], IonInput);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonInput, [{
    type: Component,
    args: [{
      selector: "ion-input",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["accept", "autocapitalize", "autocomplete", "autocorrect", "autofocus", "clearInput", "clearOnEdit", "color", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "max", "maxlength", "min", "minlength", "mode", "multiple", "name", "pattern", "placeholder", "readonly", "required", "shape", "size", "spellcheck", "step", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItem = class IonItem2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonItem.ɵfac = function IonItem_Factory(t) {
  return new (t || IonItem)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItem.ɵcmp = ɵɵdefineComponent({
  type: IonItem,
  selectors: [["ion-item"]],
  inputs: {
    button: "button",
    color: "color",
    counter: "counter",
    counterFormatter: "counterFormatter",
    detail: "detail",
    detailIcon: "detailIcon",
    disabled: "disabled",
    download: "download",
    fill: "fill",
    href: "href",
    lines: "lines",
    mode: "mode",
    rel: "rel",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection",
    shape: "shape",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItem_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItem = __decorate([ProxyCmp2({
  inputs: ["button", "color", "counter", "counterFormatter", "detail", "detailIcon", "disabled", "download", "fill", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "shape", "target", "type"]
})], IonItem);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItem, [{
    type: Component,
    args: [{
      selector: "ion-item",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["button", "color", "counter", "counterFormatter", "detail", "detailIcon", "disabled", "download", "fill", "href", "lines", "mode", "rel", "routerAnimation", "routerDirection", "shape", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItemDivider = class IonItemDivider2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonItemDivider.ɵfac = function IonItemDivider_Factory(t) {
  return new (t || IonItemDivider)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItemDivider.ɵcmp = ɵɵdefineComponent({
  type: IonItemDivider,
  selectors: [["ion-item-divider"]],
  inputs: {
    color: "color",
    mode: "mode",
    sticky: "sticky"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemDivider_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItemDivider = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "sticky"]
})], IonItemDivider);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemDivider, [{
    type: Component,
    args: [{
      selector: "ion-item-divider",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "sticky"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItemGroup = class IonItemGroup2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonItemGroup.ɵfac = function IonItemGroup_Factory(t) {
  return new (t || IonItemGroup)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItemGroup.ɵcmp = ɵɵdefineComponent({
  type: IonItemGroup,
  selectors: [["ion-item-group"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItemGroup = __decorate([ProxyCmp2({})], IonItemGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemGroup, [{
    type: Component,
    args: [{
      selector: "ion-item-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItemOption = class IonItemOption2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonItemOption.ɵfac = function IonItemOption_Factory(t) {
  return new (t || IonItemOption)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItemOption.ɵcmp = ɵɵdefineComponent({
  type: IonItemOption,
  selectors: [["ion-item-option"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    download: "download",
    expandable: "expandable",
    href: "href",
    mode: "mode",
    rel: "rel",
    target: "target",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemOption_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItemOption = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"]
})], IonItemOption);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemOption, [{
    type: Component,
    args: [{
      selector: "ion-item-option",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "download", "expandable", "href", "mode", "rel", "target", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItemOptions = class IonItemOptions2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionSwipe"]);
  }
};
IonItemOptions.ɵfac = function IonItemOptions_Factory(t) {
  return new (t || IonItemOptions)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItemOptions.ɵcmp = ɵɵdefineComponent({
  type: IonItemOptions,
  selectors: [["ion-item-options"]],
  inputs: {
    side: "side"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemOptions_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItemOptions = __decorate([ProxyCmp2({
  inputs: ["side"]
})], IonItemOptions);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemOptions, [{
    type: Component,
    args: [{
      selector: "ion-item-options",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["side"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonItemSliding = class IonItemSliding2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionDrag"]);
  }
};
IonItemSliding.ɵfac = function IonItemSliding_Factory(t) {
  return new (t || IonItemSliding)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonItemSliding.ɵcmp = ɵɵdefineComponent({
  type: IonItemSliding,
  selectors: [["ion-item-sliding"]],
  inputs: {
    disabled: "disabled"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonItemSliding_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonItemSliding = __decorate([ProxyCmp2({
  inputs: ["disabled"],
  methods: ["getOpenAmount", "getSlidingRatio", "open", "close", "closeOpened"]
})], IonItemSliding);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonItemSliding, [{
    type: Component,
    args: [{
      selector: "ion-item-sliding",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonLabel = class IonLabel2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonLabel.ɵfac = function IonLabel_Factory(t) {
  return new (t || IonLabel)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonLabel.ɵcmp = ɵɵdefineComponent({
  type: IonLabel,
  selectors: [["ion-label"]],
  inputs: {
    color: "color",
    mode: "mode",
    position: "position"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonLabel_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonLabel = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "position"]
})], IonLabel);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonLabel, [{
    type: Component,
    args: [{
      selector: "ion-label",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "position"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonList = class IonList2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonList.ɵfac = function IonList_Factory(t) {
  return new (t || IonList)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonList.ɵcmp = ɵɵdefineComponent({
  type: IonList,
  selectors: [["ion-list"]],
  inputs: {
    inset: "inset",
    lines: "lines",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonList_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonList = __decorate([ProxyCmp2({
  inputs: ["inset", "lines", "mode"],
  methods: ["closeSlidingItems"]
})], IonList);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonList, [{
    type: Component,
    args: [{
      selector: "ion-list",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["inset", "lines", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonListHeader = class IonListHeader2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonListHeader.ɵfac = function IonListHeader_Factory(t) {
  return new (t || IonListHeader)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonListHeader.ɵcmp = ɵɵdefineComponent({
  type: IonListHeader,
  selectors: [["ion-list-header"]],
  inputs: {
    color: "color",
    lines: "lines",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonListHeader_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonListHeader = __decorate([ProxyCmp2({
  inputs: ["color", "lines", "mode"]
})], IonListHeader);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonListHeader, [{
    type: Component,
    args: [{
      selector: "ion-list-header",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "lines", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonLoading = class IonLoading2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionLoadingDidPresent", "ionLoadingWillPresent", "ionLoadingWillDismiss", "ionLoadingDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonLoading.ɵfac = function IonLoading_Factory(t) {
  return new (t || IonLoading)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonLoading.ɵcmp = ɵɵdefineComponent({
  type: IonLoading,
  selectors: [["ion-loading"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    showBackdrop: "showBackdrop",
    spinner: "spinner",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonLoading_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonLoading = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonLoading);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonLoading, [{
    type: Component,
    args: [{
      selector: "ion-loading",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "message", "mode", "showBackdrop", "spinner", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonMenu = class IonMenu2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionWillOpen", "ionWillClose", "ionDidOpen", "ionDidClose"]);
  }
};
IonMenu.ɵfac = function IonMenu_Factory(t) {
  return new (t || IonMenu)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonMenu.ɵcmp = ɵɵdefineComponent({
  type: IonMenu,
  selectors: [["ion-menu"]],
  inputs: {
    contentId: "contentId",
    disabled: "disabled",
    maxEdgeStart: "maxEdgeStart",
    menuId: "menuId",
    side: "side",
    swipeGesture: "swipeGesture",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenu_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonMenu = __decorate([ProxyCmp2({
  inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"],
  methods: ["isOpen", "isActive", "open", "close", "toggle", "setOpen"]
})], IonMenu);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenu, [{
    type: Component,
    args: [{
      selector: "ion-menu",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["contentId", "disabled", "maxEdgeStart", "menuId", "side", "swipeGesture", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonMenuButton = class IonMenuButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonMenuButton.ɵfac = function IonMenuButton_Factory(t) {
  return new (t || IonMenuButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonMenuButton.ɵcmp = ɵɵdefineComponent({
  type: IonMenuButton,
  selectors: [["ion-menu-button"]],
  inputs: {
    autoHide: "autoHide",
    color: "color",
    disabled: "disabled",
    menu: "menu",
    mode: "mode",
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenuButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonMenuButton = __decorate([ProxyCmp2({
  inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"]
})], IonMenuButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenuButton, [{
    type: Component,
    args: [{
      selector: "ion-menu-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoHide", "color", "disabled", "menu", "mode", "type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonMenuToggle = class IonMenuToggle2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonMenuToggle.ɵfac = function IonMenuToggle_Factory(t) {
  return new (t || IonMenuToggle)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonMenuToggle.ɵcmp = ɵɵdefineComponent({
  type: IonMenuToggle,
  selectors: [["ion-menu-toggle"]],
  inputs: {
    autoHide: "autoHide",
    menu: "menu"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonMenuToggle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonMenuToggle = __decorate([ProxyCmp2({
  inputs: ["autoHide", "menu"]
})], IonMenuToggle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMenuToggle, [{
    type: Component,
    args: [{
      selector: "ion-menu-toggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoHide", "menu"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonNavLink = class IonNavLink2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonNavLink.ɵfac = function IonNavLink_Factory(t) {
  return new (t || IonNavLink)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonNavLink.ɵcmp = ɵɵdefineComponent({
  type: IonNavLink,
  selectors: [["ion-nav-link"]],
  inputs: {
    component: "component",
    componentProps: "componentProps",
    routerAnimation: "routerAnimation",
    routerDirection: "routerDirection"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNavLink_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonNavLink = __decorate([ProxyCmp2({
  inputs: ["component", "componentProps", "routerAnimation", "routerDirection"]
})], IonNavLink);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNavLink, [{
    type: Component,
    args: [{
      selector: "ion-nav-link",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["component", "componentProps", "routerAnimation", "routerDirection"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonNote = class IonNote2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonNote.ɵfac = function IonNote_Factory(t) {
  return new (t || IonNote)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonNote.ɵcmp = ɵɵdefineComponent({
  type: IonNote,
  selectors: [["ion-note"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNote_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonNote = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonNote);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNote, [{
    type: Component,
    args: [{
      selector: "ion-note",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonPicker = class IonPicker2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionPickerDidPresent", "ionPickerWillPresent", "ionPickerWillDismiss", "ionPickerDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonPicker.ɵfac = function IonPicker_Factory(t) {
  return new (t || IonPicker)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonPicker.ɵcmp = ɵɵdefineComponent({
  type: IonPicker,
  selectors: [["ion-picker"]],
  inputs: {
    animated: "animated",
    backdropDismiss: "backdropDismiss",
    buttons: "buttons",
    columns: "columns",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    htmlAttributes: "htmlAttributes",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    leaveAnimation: "leaveAnimation",
    mode: "mode",
    showBackdrop: "showBackdrop",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonPicker_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonPicker = __decorate([ProxyCmp2({
  inputs: ["animated", "backdropDismiss", "buttons", "columns", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss", "getColumn"]
})], IonPicker);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPicker, [{
    type: Component,
    args: [{
      selector: "ion-picker",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "backdropDismiss", "buttons", "columns", "cssClass", "duration", "enterAnimation", "htmlAttributes", "isOpen", "keyboardClose", "leaveAnimation", "mode", "showBackdrop", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonProgressBar = class IonProgressBar2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonProgressBar.ɵfac = function IonProgressBar_Factory(t) {
  return new (t || IonProgressBar)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonProgressBar.ɵcmp = ɵɵdefineComponent({
  type: IonProgressBar,
  selectors: [["ion-progress-bar"]],
  inputs: {
    buffer: "buffer",
    color: "color",
    mode: "mode",
    reversed: "reversed",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonProgressBar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonProgressBar = __decorate([ProxyCmp2({
  inputs: ["buffer", "color", "mode", "reversed", "type", "value"]
})], IonProgressBar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonProgressBar, [{
    type: Component,
    args: [{
      selector: "ion-progress-bar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["buffer", "color", "mode", "reversed", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRadio = class IonRadio2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionFocus", "ionBlur"]);
  }
};
IonRadio.ɵfac = function IonRadio_Factory(t) {
  return new (t || IonRadio)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRadio.ɵcmp = ɵɵdefineComponent({
  type: IonRadio,
  selectors: [["ion-radio"]],
  inputs: {
    alignment: "alignment",
    color: "color",
    disabled: "disabled",
    justify: "justify",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRadio_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRadio = __decorate([ProxyCmp2({
  inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
})], IonRadio);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRadio, [{
    type: Component,
    args: [{
      selector: "ion-radio",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "color", "disabled", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRadioGroup = class IonRadioGroup2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
};
IonRadioGroup.ɵfac = function IonRadioGroup_Factory(t) {
  return new (t || IonRadioGroup)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRadioGroup.ɵcmp = ɵɵdefineComponent({
  type: IonRadioGroup,
  selectors: [["ion-radio-group"]],
  inputs: {
    allowEmptySelection: "allowEmptySelection",
    compareWith: "compareWith",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRadioGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRadioGroup = __decorate([ProxyCmp2({
  inputs: ["allowEmptySelection", "compareWith", "name", "value"]
})], IonRadioGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRadioGroup, [{
    type: Component,
    args: [{
      selector: "ion-radio-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["allowEmptySelection", "compareWith", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRange = class IonRange2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionInput", "ionFocus", "ionBlur", "ionKnobMoveStart", "ionKnobMoveEnd"]);
  }
};
IonRange.ɵfac = function IonRange_Factory(t) {
  return new (t || IonRange)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRange.ɵcmp = ɵɵdefineComponent({
  type: IonRange,
  selectors: [["ion-range"]],
  inputs: {
    activeBarStart: "activeBarStart",
    color: "color",
    debounce: "debounce",
    disabled: "disabled",
    dualKnobs: "dualKnobs",
    label: "label",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    max: "max",
    min: "min",
    mode: "mode",
    name: "name",
    pin: "pin",
    pinFormatter: "pinFormatter",
    snaps: "snaps",
    step: "step",
    ticks: "ticks",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRange_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRange = __decorate([ProxyCmp2({
  inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "legacy", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"]
})], IonRange);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRange, [{
    type: Component,
    args: [{
      selector: "ion-range",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["activeBarStart", "color", "debounce", "disabled", "dualKnobs", "label", "labelPlacement", "legacy", "max", "min", "mode", "name", "pin", "pinFormatter", "snaps", "step", "ticks", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRefresher = class IonRefresher2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionRefresh", "ionPull", "ionStart"]);
  }
};
IonRefresher.ɵfac = function IonRefresher_Factory(t) {
  return new (t || IonRefresher)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRefresher.ɵcmp = ɵɵdefineComponent({
  type: IonRefresher,
  selectors: [["ion-refresher"]],
  inputs: {
    closeDuration: "closeDuration",
    disabled: "disabled",
    mode: "mode",
    pullFactor: "pullFactor",
    pullMax: "pullMax",
    pullMin: "pullMin",
    snapbackDuration: "snapbackDuration"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRefresher_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRefresher = __decorate([ProxyCmp2({
  inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"],
  methods: ["complete", "cancel", "getProgress"]
})], IonRefresher);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRefresher, [{
    type: Component,
    args: [{
      selector: "ion-refresher",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["closeDuration", "disabled", "mode", "pullFactor", "pullMax", "pullMin", "snapbackDuration"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRefresherContent = class IonRefresherContent2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonRefresherContent.ɵfac = function IonRefresherContent_Factory(t) {
  return new (t || IonRefresherContent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRefresherContent.ɵcmp = ɵɵdefineComponent({
  type: IonRefresherContent,
  selectors: [["ion-refresher-content"]],
  inputs: {
    pullingIcon: "pullingIcon",
    pullingText: "pullingText",
    refreshingSpinner: "refreshingSpinner",
    refreshingText: "refreshingText"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRefresherContent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRefresherContent = __decorate([ProxyCmp2({
  inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"]
})], IonRefresherContent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRefresherContent, [{
    type: Component,
    args: [{
      selector: "ion-refresher-content",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["pullingIcon", "pullingText", "refreshingSpinner", "refreshingText"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonReorder = class IonReorder2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonReorder.ɵfac = function IonReorder_Factory(t) {
  return new (t || IonReorder)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonReorder.ɵcmp = ɵɵdefineComponent({
  type: IonReorder,
  selectors: [["ion-reorder"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonReorder_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonReorder = __decorate([ProxyCmp2({})], IonReorder);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonReorder, [{
    type: Component,
    args: [{
      selector: "ion-reorder",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonReorderGroup = class IonReorderGroup2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionItemReorder"]);
  }
};
IonReorderGroup.ɵfac = function IonReorderGroup_Factory(t) {
  return new (t || IonReorderGroup)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonReorderGroup.ɵcmp = ɵɵdefineComponent({
  type: IonReorderGroup,
  selectors: [["ion-reorder-group"]],
  inputs: {
    disabled: "disabled"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonReorderGroup_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonReorderGroup = __decorate([ProxyCmp2({
  inputs: ["disabled"],
  methods: ["complete"]
})], IonReorderGroup);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonReorderGroup, [{
    type: Component,
    args: [{
      selector: "ion-reorder-group",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRippleEffect = class IonRippleEffect2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonRippleEffect.ɵfac = function IonRippleEffect_Factory(t) {
  return new (t || IonRippleEffect)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRippleEffect.ɵcmp = ɵɵdefineComponent({
  type: IonRippleEffect,
  selectors: [["ion-ripple-effect"]],
  inputs: {
    type: "type"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRippleEffect_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRippleEffect = __decorate([ProxyCmp2({
  inputs: ["type"],
  methods: ["addRipple"]
})], IonRippleEffect);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRippleEffect, [{
    type: Component,
    args: [{
      selector: "ion-ripple-effect",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["type"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRow = class IonRow2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonRow.ɵfac = function IonRow_Factory(t) {
  return new (t || IonRow)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonRow.ɵcmp = ɵɵdefineComponent({
  type: IonRow,
  selectors: [["ion-row"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonRow_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonRow = __decorate([ProxyCmp2({})], IonRow);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRow, [{
    type: Component,
    args: [{
      selector: "ion-row",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSearchbar = class IonSearchbar2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionInput", "ionChange", "ionCancel", "ionClear", "ionBlur", "ionFocus"]);
  }
};
IonSearchbar.ɵfac = function IonSearchbar_Factory(t) {
  return new (t || IonSearchbar)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSearchbar.ɵcmp = ɵɵdefineComponent({
  type: IonSearchbar,
  selectors: [["ion-searchbar"]],
  inputs: {
    animated: "animated",
    autocapitalize: "autocapitalize",
    autocomplete: "autocomplete",
    autocorrect: "autocorrect",
    cancelButtonIcon: "cancelButtonIcon",
    cancelButtonText: "cancelButtonText",
    clearIcon: "clearIcon",
    color: "color",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    inputmode: "inputmode",
    maxlength: "maxlength",
    minlength: "minlength",
    mode: "mode",
    name: "name",
    placeholder: "placeholder",
    searchIcon: "searchIcon",
    showCancelButton: "showCancelButton",
    showClearButton: "showClearButton",
    spellcheck: "spellcheck",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSearchbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSearchbar = __decorate([ProxyCmp2({
  inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"],
  methods: ["setFocus", "getInputElement"]
})], IonSearchbar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSearchbar, [{
    type: Component,
    args: [{
      selector: "ion-searchbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "autocapitalize", "autocomplete", "autocorrect", "cancelButtonIcon", "cancelButtonText", "clearIcon", "color", "debounce", "disabled", "enterkeyhint", "inputmode", "maxlength", "minlength", "mode", "name", "placeholder", "searchIcon", "showCancelButton", "showClearButton", "spellcheck", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSegment = class IonSegment2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange"]);
  }
};
IonSegment.ɵfac = function IonSegment_Factory(t) {
  return new (t || IonSegment)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSegment.ɵcmp = ɵɵdefineComponent({
  type: IonSegment,
  selectors: [["ion-segment"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    mode: "mode",
    scrollable: "scrollable",
    selectOnFocus: "selectOnFocus",
    swipeGesture: "swipeGesture",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSegment_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSegment = __decorate([ProxyCmp2({
  inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"]
})], IonSegment);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSegment, [{
    type: Component,
    args: [{
      selector: "ion-segment",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "disabled", "mode", "scrollable", "selectOnFocus", "swipeGesture", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSegmentButton = class IonSegmentButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonSegmentButton.ɵfac = function IonSegmentButton_Factory(t) {
  return new (t || IonSegmentButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSegmentButton.ɵcmp = ɵɵdefineComponent({
  type: IonSegmentButton,
  selectors: [["ion-segment-button"]],
  inputs: {
    disabled: "disabled",
    layout: "layout",
    mode: "mode",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSegmentButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSegmentButton = __decorate([ProxyCmp2({
  inputs: ["disabled", "layout", "mode", "type", "value"]
})], IonSegmentButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSegmentButton, [{
    type: Component,
    args: [{
      selector: "ion-segment-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "layout", "mode", "type", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSelect = class IonSelect2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionCancel", "ionDismiss", "ionFocus", "ionBlur"]);
  }
};
IonSelect.ɵfac = function IonSelect_Factory(t) {
  return new (t || IonSelect)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSelect.ɵcmp = ɵɵdefineComponent({
  type: IonSelect,
  selectors: [["ion-select"]],
  inputs: {
    cancelText: "cancelText",
    color: "color",
    compareWith: "compareWith",
    disabled: "disabled",
    expandedIcon: "expandedIcon",
    fill: "fill",
    interface: "interface",
    interfaceOptions: "interfaceOptions",
    justify: "justify",
    label: "label",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    mode: "mode",
    multiple: "multiple",
    name: "name",
    okText: "okText",
    placeholder: "placeholder",
    selectedText: "selectedText",
    shape: "shape",
    toggleIcon: "toggleIcon",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSelect_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSelect = __decorate([ProxyCmp2({
  inputs: ["cancelText", "color", "compareWith", "disabled", "expandedIcon", "fill", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "legacy", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "shape", "toggleIcon", "value"],
  methods: ["open"]
})], IonSelect);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSelect, [{
    type: Component,
    args: [{
      selector: "ion-select",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["cancelText", "color", "compareWith", "disabled", "expandedIcon", "fill", "interface", "interfaceOptions", "justify", "label", "labelPlacement", "legacy", "mode", "multiple", "name", "okText", "placeholder", "selectedText", "shape", "toggleIcon", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSelectOption = class IonSelectOption2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonSelectOption.ɵfac = function IonSelectOption_Factory(t) {
  return new (t || IonSelectOption)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSelectOption.ɵcmp = ɵɵdefineComponent({
  type: IonSelectOption,
  selectors: [["ion-select-option"]],
  inputs: {
    disabled: "disabled",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSelectOption_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSelectOption = __decorate([ProxyCmp2({
  inputs: ["disabled", "value"]
})], IonSelectOption);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSelectOption, [{
    type: Component,
    args: [{
      selector: "ion-select-option",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSkeletonText = class IonSkeletonText2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonSkeletonText.ɵfac = function IonSkeletonText_Factory(t) {
  return new (t || IonSkeletonText)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSkeletonText.ɵcmp = ɵɵdefineComponent({
  type: IonSkeletonText,
  selectors: [["ion-skeleton-text"]],
  inputs: {
    animated: "animated"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSkeletonText_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSkeletonText = __decorate([ProxyCmp2({
  inputs: ["animated"]
})], IonSkeletonText);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSkeletonText, [{
    type: Component,
    args: [{
      selector: "ion-skeleton-text",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSpinner = class IonSpinner2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonSpinner.ɵfac = function IonSpinner_Factory(t) {
  return new (t || IonSpinner)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSpinner.ɵcmp = ɵɵdefineComponent({
  type: IonSpinner,
  selectors: [["ion-spinner"]],
  inputs: {
    color: "color",
    duration: "duration",
    name: "name",
    paused: "paused"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSpinner_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSpinner = __decorate([ProxyCmp2({
  inputs: ["color", "duration", "name", "paused"]
})], IonSpinner);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSpinner, [{
    type: Component,
    args: [{
      selector: "ion-spinner",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "duration", "name", "paused"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonSplitPane = class IonSplitPane2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionSplitPaneVisible"]);
  }
};
IonSplitPane.ɵfac = function IonSplitPane_Factory(t) {
  return new (t || IonSplitPane)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonSplitPane.ɵcmp = ɵɵdefineComponent({
  type: IonSplitPane,
  selectors: [["ion-split-pane"]],
  inputs: {
    contentId: "contentId",
    disabled: "disabled",
    when: "when"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonSplitPane_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonSplitPane = __decorate([ProxyCmp2({
  inputs: ["contentId", "disabled", "when"]
})], IonSplitPane);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonSplitPane, [{
    type: Component,
    args: [{
      selector: "ion-split-pane",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["contentId", "disabled", "when"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonTabBar = class IonTabBar2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonTabBar.ɵfac = function IonTabBar_Factory(t) {
  return new (t || IonTabBar)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonTabBar.ɵcmp = ɵɵdefineComponent({
  type: IonTabBar,
  selectors: [["ion-tab-bar"]],
  inputs: {
    color: "color",
    mode: "mode",
    selectedTab: "selectedTab",
    translucent: "translucent"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTabBar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonTabBar = __decorate([ProxyCmp2({
  inputs: ["color", "mode", "selectedTab", "translucent"]
})], IonTabBar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabBar, [{
    type: Component,
    args: [{
      selector: "ion-tab-bar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode", "selectedTab", "translucent"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonTabButton = class IonTabButton2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonTabButton.ɵfac = function IonTabButton_Factory(t) {
  return new (t || IonTabButton)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonTabButton.ɵcmp = ɵɵdefineComponent({
  type: IonTabButton,
  selectors: [["ion-tab-button"]],
  inputs: {
    disabled: "disabled",
    download: "download",
    href: "href",
    layout: "layout",
    mode: "mode",
    rel: "rel",
    selected: "selected",
    tab: "tab",
    target: "target"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTabButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonTabButton = __decorate([ProxyCmp2({
  inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"]
})], IonTabButton);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabButton, [{
    type: Component,
    args: [{
      selector: "ion-tab-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["disabled", "download", "href", "layout", "mode", "rel", "selected", "tab", "target"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonText = class IonText2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonText.ɵfac = function IonText_Factory(t) {
  return new (t || IonText)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonText.ɵcmp = ɵɵdefineComponent({
  type: IonText,
  selectors: [["ion-text"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonText_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonText = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonText);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonText, [{
    type: Component,
    args: [{
      selector: "ion-text",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonTextarea = class IonTextarea2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionInput", "ionBlur", "ionFocus"]);
  }
};
IonTextarea.ɵfac = function IonTextarea_Factory(t) {
  return new (t || IonTextarea)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonTextarea.ɵcmp = ɵɵdefineComponent({
  type: IonTextarea,
  selectors: [["ion-textarea"]],
  inputs: {
    autoGrow: "autoGrow",
    autocapitalize: "autocapitalize",
    autofocus: "autofocus",
    clearOnEdit: "clearOnEdit",
    color: "color",
    cols: "cols",
    counter: "counter",
    counterFormatter: "counterFormatter",
    debounce: "debounce",
    disabled: "disabled",
    enterkeyhint: "enterkeyhint",
    errorText: "errorText",
    fill: "fill",
    helperText: "helperText",
    inputmode: "inputmode",
    label: "label",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    maxlength: "maxlength",
    minlength: "minlength",
    mode: "mode",
    name: "name",
    placeholder: "placeholder",
    readonly: "readonly",
    required: "required",
    rows: "rows",
    shape: "shape",
    spellcheck: "spellcheck",
    value: "value",
    wrap: "wrap"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTextarea_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonTextarea = __decorate([ProxyCmp2({
  inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"],
  methods: ["setFocus", "getInputElement"]
})], IonTextarea);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTextarea, [{
    type: Component,
    args: [{
      selector: "ion-textarea",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["autoGrow", "autocapitalize", "autofocus", "clearOnEdit", "color", "cols", "counter", "counterFormatter", "debounce", "disabled", "enterkeyhint", "errorText", "fill", "helperText", "inputmode", "label", "labelPlacement", "legacy", "maxlength", "minlength", "mode", "name", "placeholder", "readonly", "required", "rows", "shape", "spellcheck", "value", "wrap"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonThumbnail = class IonThumbnail2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonThumbnail.ɵfac = function IonThumbnail_Factory(t) {
  return new (t || IonThumbnail)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonThumbnail.ɵcmp = ɵɵdefineComponent({
  type: IonThumbnail,
  selectors: [["ion-thumbnail"]],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonThumbnail_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonThumbnail = __decorate([ProxyCmp2({})], IonThumbnail);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonThumbnail, [{
    type: Component,
    args: [{
      selector: "ion-thumbnail",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: []
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonTitle = class IonTitle2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonTitle.ɵfac = function IonTitle_Factory(t) {
  return new (t || IonTitle)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonTitle.ɵcmp = ɵɵdefineComponent({
  type: IonTitle,
  selectors: [["ion-title"]],
  inputs: {
    color: "color",
    size: "size"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonTitle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonTitle = __decorate([ProxyCmp2({
  inputs: ["color", "size"]
})], IonTitle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTitle, [{
    type: Component,
    args: [{
      selector: "ion-title",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "size"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonToast = class IonToast2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionToastDidPresent", "ionToastWillPresent", "ionToastWillDismiss", "ionToastDidDismiss", "didPresent", "willPresent", "willDismiss", "didDismiss"]);
  }
};
IonToast.ɵfac = function IonToast_Factory(t) {
  return new (t || IonToast)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonToast.ɵcmp = ɵɵdefineComponent({
  type: IonToast,
  selectors: [["ion-toast"]],
  inputs: {
    animated: "animated",
    buttons: "buttons",
    color: "color",
    cssClass: "cssClass",
    duration: "duration",
    enterAnimation: "enterAnimation",
    header: "header",
    htmlAttributes: "htmlAttributes",
    icon: "icon",
    isOpen: "isOpen",
    keyboardClose: "keyboardClose",
    layout: "layout",
    leaveAnimation: "leaveAnimation",
    message: "message",
    mode: "mode",
    position: "position",
    positionAnchor: "positionAnchor",
    swipeGesture: "swipeGesture",
    translucent: "translucent",
    trigger: "trigger"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToast_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonToast = __decorate([ProxyCmp2({
  inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"],
  methods: ["present", "dismiss", "onDidDismiss", "onWillDismiss"]
})], IonToast);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToast, [{
    type: Component,
    args: [{
      selector: "ion-toast",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["animated", "buttons", "color", "cssClass", "duration", "enterAnimation", "header", "htmlAttributes", "icon", "isOpen", "keyboardClose", "layout", "leaveAnimation", "message", "mode", "position", "positionAnchor", "swipeGesture", "translucent", "trigger"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonToggle = class IonToggle2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs2(this, this.el, ["ionChange", "ionFocus", "ionBlur"]);
  }
};
IonToggle.ɵfac = function IonToggle_Factory(t) {
  return new (t || IonToggle)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonToggle.ɵcmp = ɵɵdefineComponent({
  type: IonToggle,
  selectors: [["ion-toggle"]],
  inputs: {
    alignment: "alignment",
    checked: "checked",
    color: "color",
    disabled: "disabled",
    enableOnOffLabels: "enableOnOffLabels",
    justify: "justify",
    labelPlacement: "labelPlacement",
    legacy: "legacy",
    mode: "mode",
    name: "name",
    value: "value"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToggle_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonToggle = __decorate([ProxyCmp2({
  inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
})], IonToggle);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToggle, [{
    type: Component,
    args: [{
      selector: "ion-toggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["alignment", "checked", "color", "disabled", "enableOnOffLabels", "justify", "labelPlacement", "legacy", "mode", "name", "value"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonToolbar = class IonToolbar2 {
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
IonToolbar.ɵfac = function IonToolbar_Factory(t) {
  return new (t || IonToolbar)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
};
IonToolbar.ɵcmp = ɵɵdefineComponent({
  type: IonToolbar,
  selectors: [["ion-toolbar"]],
  inputs: {
    color: "color",
    mode: "mode"
  },
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonToolbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
IonToolbar = __decorate([ProxyCmp2({
  inputs: ["color", "mode"]
})], IonToolbar);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonToolbar, [{
    type: Component,
    args: [{
      selector: "ion-toolbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>",
      // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
      inputs: ["color", "mode"]
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }];
  }, null);
})();
var IonRouterOutlet2 = class extends IonRouterOutlet {
  /**
   * We need to pass in the correct instance of IonRouterOutlet
   * otherwise parentOutlet will be null in a nested outlet context.
   * This results in APIs such as NavController.pop not working
   * in nested outlets because the parent outlet cannot be found.
   */
  constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
    super(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet);
    this.parentOutlet = parentOutlet;
  }
};
IonRouterOutlet2.ɵfac = function IonRouterOutlet_Factory2(t) {
  return new (t || IonRouterOutlet2)(ɵɵinjectAttribute("name"), ɵɵinjectAttribute("tabs"), ɵɵdirectiveInject(Location), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(IonRouterOutlet2, 12));
};
IonRouterOutlet2.ɵdir = ɵɵdefineDirective({
  type: IonRouterOutlet2,
  selectors: [["ion-router-outlet"]],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonRouterOutlet2, [{
    type: Directive,
    args: [{
      selector: "ion-router-outlet"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Attribute,
        args: ["name"]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Attribute,
        args: ["tabs"]
      }]
    }, {
      type: Location
    }, {
      type: ElementRef
    }, {
      type: Router
    }, {
      type: NgZone
    }, {
      type: ActivatedRoute
    }, {
      type: IonRouterOutlet2,
      decorators: [{
        type: SkipSelf
      }, {
        type: Optional
      }]
    }];
  }, null);
})();
var IonTabs2 = class extends IonTabs {
};
IonTabs2.ɵfac = /* @__PURE__ */ (() => {
  let ɵIonTabs_BaseFactory;
  return function IonTabs_Factory2(t) {
    return (ɵIonTabs_BaseFactory || (ɵIonTabs_BaseFactory = ɵɵgetInheritedFactory(IonTabs2)))(t || IonTabs2);
  };
})();
IonTabs2.ɵcmp = ɵɵdefineComponent({
  type: IonTabs2,
  selectors: [["ion-tabs"]],
  contentQueries: function IonTabs_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, IonTabBar, 5);
      ɵɵcontentQuery(dirIndex, IonTabBar, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabBar = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabBars = _t);
    }
  },
  viewQuery: function IonTabs_Query2(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 5, IonRouterOutlet2);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.outlet = _t.first);
    }
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c3,
  decls: 6,
  vars: 0,
  consts: [["tabsInner", ""], ["outlet", ""], [1, "tabs-inner"], ["tabs", "true", 3, "stackWillChange", "stackDidChange"]],
  template: function IonTabs_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵprojectionDef(_c2);
      ɵɵprojection(0);
      ɵɵelementStart(1, "div", 2, 0)(3, "ion-router-outlet", 3, 1);
      ɵɵlistener("stackWillChange", function IonTabs_Template_ion_router_outlet_stackWillChange_3_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onStackWillChange($event));
      })("stackDidChange", function IonTabs_Template_ion_router_outlet_stackDidChange_3_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onStackDidChange($event));
      });
      ɵɵelementEnd()();
      ɵɵprojection(5, 1);
    }
  },
  dependencies: [IonRouterOutlet2],
  styles: ["[_nghost-%COMP%]{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner[_ngcontent-%COMP%]{position:relative;flex:1;contain:layout size style}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonTabs2, [{
    type: Component,
    args: [{
      selector: "ion-tabs",
      template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
    </div>
    <ng-content></ng-content>
  `,
      styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"]
    }]
  }], null, {
    outlet: [{
      type: ViewChild,
      args: ["outlet", {
        read: IonRouterOutlet2,
        static: false
      }]
    }],
    tabBar: [{
      type: ContentChild,
      args: [IonTabBar, {
        static: false
      }]
    }],
    tabBars: [{
      type: ContentChildren,
      args: [IonTabBar]
    }]
  });
})();
var IonBackButton3 = class extends IonBackButton {
  constructor(routerOutlet, navCtrl, config3, r, z, c) {
    super(routerOutlet, navCtrl, config3, r, z, c);
  }
};
IonBackButton3.ɵfac = function IonBackButton_Factory2(t) {
  return new (t || IonBackButton3)(ɵɵdirectiveInject(IonRouterOutlet2, 8), ɵɵdirectiveInject(NavController), ɵɵdirectiveInject(Config2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
};
IonBackButton3.ɵcmp = ɵɵdefineComponent({
  type: IonBackButton3,
  selectors: [["ion-back-button"]],
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonBackButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonBackButton3, [{
    type: Component,
    args: [{
      selector: "ion-back-button",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: IonRouterOutlet2,
      decorators: [{
        type: Optional
      }]
    }, {
      type: NavController
    }, {
      type: Config2
    }, {
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var IonNav3 = class extends IonNav {
  constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
    super(ref, environmentInjector, injector, angularDelegate, z, c);
  }
};
IonNav3.ɵfac = function IonNav_Factory2(t) {
  return new (t || IonNav3)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(EnvironmentInjector), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(AngularDelegate), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef));
};
IonNav3.ɵcmp = ɵɵdefineComponent({
  type: IonNav3,
  selectors: [["ion-nav"]],
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function IonNav_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonNav3, [{
    type: Component,
    args: [{
      selector: "ion-nav",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: EnvironmentInjector
    }, {
      type: Injector
    }, {
      type: AngularDelegate
    }, {
      type: NgZone
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var RouterLinkDelegateDirective2 = class extends RouterLinkDelegateDirective {
};
RouterLinkDelegateDirective2.ɵfac = /* @__PURE__ */ (() => {
  let ɵRouterLinkDelegateDirective_BaseFactory;
  return function RouterLinkDelegateDirective_Factory2(t) {
    return (ɵRouterLinkDelegateDirective_BaseFactory || (ɵRouterLinkDelegateDirective_BaseFactory = ɵɵgetInheritedFactory(RouterLinkDelegateDirective2)))(t || RouterLinkDelegateDirective2);
  };
})();
RouterLinkDelegateDirective2.ɵdir = ɵɵdefineDirective({
  type: RouterLinkDelegateDirective2,
  selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkDelegateDirective2, [{
    type: Directive,
    args: [{
      selector: ":not(a):not(area)[routerLink]"
    }]
  }], null, null);
})();
var RouterLinkWithHrefDelegateDirective2 = class extends RouterLinkWithHrefDelegateDirective {
};
RouterLinkWithHrefDelegateDirective2.ɵfac = /* @__PURE__ */ (() => {
  let ɵRouterLinkWithHrefDelegateDirective_BaseFactory;
  return function RouterLinkWithHrefDelegateDirective_Factory2(t) {
    return (ɵRouterLinkWithHrefDelegateDirective_BaseFactory || (ɵRouterLinkWithHrefDelegateDirective_BaseFactory = ɵɵgetInheritedFactory(RouterLinkWithHrefDelegateDirective2)))(t || RouterLinkWithHrefDelegateDirective2);
  };
})();
RouterLinkWithHrefDelegateDirective2.ɵdir = ɵɵdefineDirective({
  type: RouterLinkWithHrefDelegateDirective2,
  selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]],
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterLinkWithHrefDelegateDirective2, [{
    type: Directive,
    args: [{
      selector: "a[routerLink],area[routerLink]"
    }]
  }], null, null);
})();
var IonModal3 = class extends IonModal {
};
IonModal3.ɵfac = /* @__PURE__ */ (() => {
  let ɵIonModal_BaseFactory;
  return function IonModal_Factory2(t) {
    return (ɵIonModal_BaseFactory || (ɵIonModal_BaseFactory = ɵɵgetInheritedFactory(IonModal3)))(t || IonModal3);
  };
})();
IonModal3.ɵcmp = ɵɵdefineComponent({
  type: IonModal3,
  selectors: [["ion-modal"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 1,
  consts: [["class", "ion-delegate-host ion-page", 4, "ngIf"], [1, "ion-delegate-host", "ion-page"], [3, "ngTemplateOutlet"]],
  template: function IonModal_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IonModal_div_0_Template, 2, 1, "div", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.isCmpOpen || ctx.keepContentsMounted);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonModal3, [{
    type: Component,
    args: [{
      selector: "ion-modal",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`
    }]
  }], null, null);
})();
var IonPopover3 = class extends IonPopover {
};
IonPopover3.ɵfac = /* @__PURE__ */ (() => {
  let ɵIonPopover_BaseFactory;
  return function IonPopover_Factory2(t) {
    return (ɵIonPopover_BaseFactory || (ɵIonPopover_BaseFactory = ɵɵgetInheritedFactory(IonPopover3)))(t || IonPopover3);
  };
})();
IonPopover3.ɵcmp = ɵɵdefineComponent({
  type: IonPopover3,
  selectors: [["ion-popover"]],
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 1,
  consts: [[3, "ngTemplateOutlet", 4, "ngIf"], [3, "ngTemplateOutlet"]],
  template: function IonPopover_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IonPopover_ng_container_0_Template, 1, 1, "ng-container", 0);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.isCmpOpen || ctx.keepContentsMounted);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonPopover3, [{
    type: Component,
    args: [{
      selector: "ion-popover",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`
    }]
  }], null, null);
})();
var ION_MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IonMaxValidator),
  multi: true
};
var IonMaxValidator = class extends MaxValidator {
};
IonMaxValidator.ɵfac = /* @__PURE__ */ (() => {
  let ɵIonMaxValidator_BaseFactory;
  return function IonMaxValidator_Factory(t) {
    return (ɵIonMaxValidator_BaseFactory || (ɵIonMaxValidator_BaseFactory = ɵɵgetInheritedFactory(IonMaxValidator)))(t || IonMaxValidator);
  };
})();
IonMaxValidator.ɵdir = ɵɵdefineDirective({
  type: IonMaxValidator,
  selectors: [["ion-input", "type", "number", "max", "", "formControlName", ""], ["ion-input", "type", "number", "max", "", "formControl", ""], ["ion-input", "type", "number", "max", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function IonMaxValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("max", ctx._enabled ? ctx.max : null);
    }
  },
  features: [ɵɵProvidersFeature([ION_MAX_VALIDATOR]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMaxValidator, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]",
      providers: [ION_MAX_VALIDATOR],
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[attr.max]": "_enabled ? max : null"
      }
    }]
  }], null, null);
})();
var ION_MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => IonMinValidator),
  multi: true
};
var IonMinValidator = class extends MinValidator {
};
IonMinValidator.ɵfac = /* @__PURE__ */ (() => {
  let ɵIonMinValidator_BaseFactory;
  return function IonMinValidator_Factory(t) {
    return (ɵIonMinValidator_BaseFactory || (ɵIonMinValidator_BaseFactory = ɵɵgetInheritedFactory(IonMinValidator)))(t || IonMinValidator);
  };
})();
IonMinValidator.ɵdir = ɵɵdefineDirective({
  type: IonMinValidator,
  selectors: [["ion-input", "type", "number", "min", "", "formControlName", ""], ["ion-input", "type", "number", "min", "", "formControl", ""], ["ion-input", "type", "number", "min", "", "ngModel", ""]],
  hostVars: 1,
  hostBindings: function IonMinValidator_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("min", ctx._enabled ? ctx.min : null);
    }
  },
  features: [ɵɵProvidersFeature([ION_MIN_VALIDATOR]), ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonMinValidator, [{
    type: Directive,
    args: [{
      selector: "ion-input[type=number][min][formControlName],ion-input[type=number][min][formControl],ion-input[type=number][min][ngModel]",
      providers: [ION_MIN_VALIDATOR],
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[attr.min]": "_enabled ? min : null"
      }
    }]
  }], null, null);
})();
var AlertController = class extends OverlayBaseController {
  constructor() {
    super(alertController2);
  }
};
AlertController.ɵfac = function AlertController_Factory(t) {
  return new (t || AlertController)();
};
AlertController.ɵprov = ɵɵdefineInjectable({
  token: AlertController,
  factory: AlertController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var AnimationController = class {
  /**
   * Create a new animation
   */
  create(animationId) {
    return createAnimation2(animationId);
  }
  /**
   * EXPERIMENTAL
   *
   * Given a progression and a cubic bezier function,
   * this utility returns the time value(s) at which the
   * cubic bezier reaches the given time progression.
   *
   * If the cubic bezier never reaches the progression
   * the result will be an empty array.
   *
   * This is most useful for switching between easing curves
   * when doing a gesture animation (i.e. going from linear easing
   * during a drag, to another easing when `progressEnd` is called)
   */
  easingTime(p0, p1, p2, p3, progression) {
    return getTimeGivenProgression2(p0, p1, p2, p3, progression);
  }
};
AnimationController.ɵfac = function AnimationController_Factory(t) {
  return new (t || AnimationController)();
};
AnimationController.ɵprov = ɵɵdefineInjectable({
  token: AnimationController,
  factory: AnimationController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ActionSheetController = class extends OverlayBaseController {
  constructor() {
    super(actionSheetController2);
  }
};
ActionSheetController.ɵfac = function ActionSheetController_Factory(t) {
  return new (t || ActionSheetController)();
};
ActionSheetController.ɵprov = ɵɵdefineInjectable({
  token: ActionSheetController,
  factory: ActionSheetController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActionSheetController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var GestureController3 = class {
  constructor(zone) {
    this.zone = zone;
  }
  /**
   * Create a new gesture
   */
  create(opts, runInsideAngularZone = false) {
    if (runInsideAngularZone) {
      Object.getOwnPropertyNames(opts).forEach((key) => {
        if (typeof opts[key] === "function") {
          const fn = opts[key];
          opts[key] = (...props) => this.zone.run(() => fn(...props));
        }
      });
    }
    return createGesture2(opts);
  }
};
GestureController3.ɵfac = function GestureController_Factory(t) {
  return new (t || GestureController3)(ɵɵinject(NgZone));
};
GestureController3.ɵprov = ɵɵdefineInjectable({
  token: GestureController3,
  factory: GestureController3.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GestureController3, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, null);
})();
var LoadingController = class extends OverlayBaseController {
  constructor() {
    super(loadingController2);
  }
};
LoadingController.ɵfac = function LoadingController_Factory(t) {
  return new (t || LoadingController)();
};
LoadingController.ɵprov = ɵɵdefineInjectable({
  token: LoadingController,
  factory: LoadingController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var MenuController2 = class extends MenuController {
  constructor() {
    super(menuController2);
  }
};
MenuController2.ɵfac = function MenuController_Factory(t) {
  return new (t || MenuController2)();
};
MenuController2.ɵprov = ɵɵdefineInjectable({
  token: MenuController2,
  factory: MenuController2.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuController2, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var ModalController = class extends OverlayBaseController {
  constructor() {
    super(modalController2);
    this.angularDelegate = inject(AngularDelegate);
    this.injector = inject(Injector);
    this.environmentInjector = inject(EnvironmentInjector);
  }
  create(opts) {
    return super.create(__spreadProps(__spreadValues({}, opts), {
      delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "modal")
    }));
  }
};
ModalController.ɵfac = function ModalController_Factory(t) {
  return new (t || ModalController)();
};
ModalController.ɵprov = ɵɵdefineInjectable({
  token: ModalController,
  factory: ModalController.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalController, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var PickerController = class extends OverlayBaseController {
  constructor() {
    super(pickerController2);
  }
};
PickerController.ɵfac = function PickerController_Factory(t) {
  return new (t || PickerController)();
};
PickerController.ɵprov = ɵɵdefineInjectable({
  token: PickerController,
  factory: PickerController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickerController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var PopoverController = class extends OverlayBaseController {
  constructor() {
    super(popoverController2);
    this.angularDelegate = inject(AngularDelegate);
    this.injector = inject(Injector);
    this.environmentInjector = inject(EnvironmentInjector);
  }
  create(opts) {
    return super.create(__spreadProps(__spreadValues({}, opts), {
      delegate: this.angularDelegate.create(this.environmentInjector, this.injector, "popover")
    }));
  }
};
var ToastController = class extends OverlayBaseController {
  constructor() {
    super(toastController2);
  }
};
ToastController.ɵfac = function ToastController_Factory(t) {
  return new (t || ToastController)();
};
ToastController.ɵprov = ɵɵdefineInjectable({
  token: ToastController,
  factory: ToastController.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var appInitialize = (config3, doc3, zone) => {
  return () => {
    const win3 = doc3.defaultView;
    if (win3 && typeof window !== "undefined") {
      setupConfig2(__spreadProps(__spreadValues({}, config3), {
        _zoneGate: (h) => zone.run(h)
      }));
      const aelFn = "__zone_symbol__addEventListener" in doc3.body ? "__zone_symbol__addEventListener" : "addEventListener";
      return applyPolyfills().then(() => {
        return defineCustomElements(win3, {
          exclude: ["ion-tabs", "ion-tab"],
          syncQueue: true,
          raf,
          jmp: (h) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            elm[aelFn](eventName, cb, opts);
          },
          rel(elm, eventName, cb, opts) {
            elm.removeEventListener(eventName, cb, opts);
          }
        });
      });
    }
  };
};
var DIRECTIVES = [IonAccordion, IonAccordionGroup, IonActionSheet, IonAlert, IonApp, IonAvatar, IonBackdrop, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonLoading, IonMenu, IonMenuButton, IonMenuToggle, IonNavLink, IonNote, IonPicker, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSkeletonText, IonSpinner, IonSplitPane, IonTabBar, IonTabButton, IonText, IonTextarea, IonThumbnail, IonTitle, IonToast, IonToggle, IonToolbar];
var DECLARATIONS = [
  // generated proxies
  ...DIRECTIVES,
  // manual proxies
  IonModal3,
  IonPopover3,
  // ngModel accessors
  BooleanValueAccessorDirective,
  NumericValueAccessorDirective,
  RadioValueAccessorDirective,
  SelectValueAccessorDirective,
  TextValueAccessorDirective,
  // navigation
  IonTabs2,
  IonRouterOutlet2,
  IonBackButton3,
  IonNav3,
  RouterLinkDelegateDirective2,
  RouterLinkWithHrefDelegateDirective2,
  // validators
  IonMinValidator,
  IonMaxValidator
];
var IonicModule = class _IonicModule {
  static forRoot(config3) {
    return {
      ngModule: _IonicModule,
      providers: [{
        provide: ConfigToken,
        useValue: config3
      }, {
        provide: APP_INITIALIZER,
        useFactory: appInitialize,
        multi: true,
        deps: [ConfigToken, DOCUMENT, NgZone]
      }, provideComponentInputBinding()]
    };
  }
};
IonicModule.ɵfac = function IonicModule_Factory(t) {
  return new (t || IonicModule)();
};
IonicModule.ɵmod = ɵɵdefineNgModule({
  type: IonicModule,
  declarations: [
    IonAccordion,
    IonAccordionGroup,
    IonActionSheet,
    IonAlert,
    IonApp,
    IonAvatar,
    IonBackdrop,
    IonBadge,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNavLink,
    IonNote,
    IonPicker,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSpinner,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToggle,
    IonToolbar,
    // manual proxies
    IonModal3,
    IonPopover3,
    // ngModel accessors
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    RadioValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    // navigation
    IonTabs2,
    IonRouterOutlet2,
    IonBackButton3,
    IonNav3,
    RouterLinkDelegateDirective2,
    RouterLinkWithHrefDelegateDirective2,
    // validators
    IonMinValidator,
    IonMaxValidator
  ],
  imports: [CommonModule],
  exports: [
    IonAccordion,
    IonAccordionGroup,
    IonActionSheet,
    IonAlert,
    IonApp,
    IonAvatar,
    IonBackdrop,
    IonBadge,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNavLink,
    IonNote,
    IonPicker,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSpinner,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToggle,
    IonToolbar,
    // manual proxies
    IonModal3,
    IonPopover3,
    // ngModel accessors
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    RadioValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    // navigation
    IonTabs2,
    IonRouterOutlet2,
    IonBackButton3,
    IonNav3,
    RouterLinkDelegateDirective2,
    RouterLinkWithHrefDelegateDirective2,
    // validators
    IonMinValidator,
    IonMaxValidator
  ]
});
IonicModule.ɵinj = ɵɵdefineInjector({
  providers: [AngularDelegate, ModalController, PopoverController],
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IonicModule, [{
    type: NgModule,
    args: [{
      declarations: DECLARATIONS,
      exports: DECLARATIONS,
      providers: [AngularDelegate, ModalController, PopoverController],
      imports: [CommonModule]
    }]
  }], null, null);
})();
export {
  ActionSheetController,
  AlertController,
  AngularDelegate,
  AnimationController,
  BooleanValueAccessorDirective as BooleanValueAccessor,
  Config2 as Config,
  DomController,
  GestureController3 as GestureController,
  ION_MAX_VALIDATOR,
  ION_MIN_VALIDATOR,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonApp,
  IonAvatar,
  IonBackButton3 as IonBackButton,
  IonBackButton3 as IonBackButtonDelegate,
  IonBackdrop,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMaxValidator,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonMinValidator,
  IonModal3 as IonModal,
  IonNav3 as IonNav,
  IonNavLink,
  IonNote,
  IonPicker,
  IonPopover3 as IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRouterOutlet2 as IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs2 as IonTabs,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  IonicModule,
  IonicRouteStrategy,
  IonicSafeString2 as IonicSafeString,
  IonicSlides,
  LoadingController,
  MenuController2 as MenuController,
  ModalController,
  NavController,
  NavParams,
  NumericValueAccessorDirective as NumericValueAccessor,
  PickerController,
  Platform,
  PopoverController,
  RadioValueAccessorDirective as RadioValueAccessor,
  RouterLinkDelegateDirective2 as RouterLinkDelegate,
  RouterLinkWithHrefDelegateDirective2 as RouterLinkWithHrefDelegate,
  SelectValueAccessorDirective as SelectValueAccessor,
  TextValueAccessorDirective as TextValueAccessor,
  ToastController,
  createAnimation2 as createAnimation,
  createGesture2 as createGesture,
  getIonPageElement,
  getPlatforms,
  getTimeGivenProgression2 as getTimeGivenProgression,
  iosTransitionAnimation,
  isPlatform,
  mdTransitionAnimation,
  openURL2 as openURL
};
/*! Bundled license information:

@ionic/core/components/cubic-bezier.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/gesture-controller.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index3.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/ionic-global.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/config.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/theme.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/hardware-back-button.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index6.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index4.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/framework-delegate.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/overlays.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/index.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/cubic-bezier-fe2083dc.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/gesture-controller-1bf57181.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-2cf77112.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/config-49c88215.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/theme-01f3f29c.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/hardware-back-button-6107a37c.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-9b0d46f4.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index-6e05b96e.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/framework-delegate-ed4ba327.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/overlays-b874c3c3.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/dist/esm-es5/index.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=@ionic_angular.js.map
