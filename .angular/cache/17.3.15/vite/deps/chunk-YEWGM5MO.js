import {
  __glob
} from "./chunk-I47SK5T2.js";

// node_modules/@ionic/core/components/index5.js
var win = typeof window !== "undefined" ? window : void 0;
var doc = typeof document !== "undefined" ? document : void 0;

// node_modules/@ionic/core/components/helpers.js
var componentOnReady = (el, callback) => {
  if (el.componentOnReady) {
    el.componentOnReady().then((resolvedEl) => callback(resolvedEl));
  } else {
    raf(() => callback(el));
  }
};
var raf = (h) => {
  if (typeof __zone_symbol__requestAnimationFrame === "function") {
    return __zone_symbol__requestAnimationFrame(h);
  }
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(h);
  }
  return setTimeout(h);
};

// node_modules/@ionic/core/components/animation.js
var animationPrefix;
var processKeyframes = (keyframes) => {
  keyframes.forEach((keyframe) => {
    for (const key in keyframe) {
      if (keyframe.hasOwnProperty(key)) {
        const value = keyframe[key];
        if (key === "easing") {
          const newKey = "animation-timing-function";
          keyframe[newKey] = value;
          delete keyframe[key];
        } else {
          const newKey = convertCamelCaseToHypen(key);
          if (newKey !== key) {
            keyframe[newKey] = value;
            delete keyframe[key];
          }
        }
      }
    }
  });
  return keyframes;
};
var convertCamelCaseToHypen = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};
var getAnimationPrefix = (el) => {
  if (animationPrefix === void 0) {
    const supportsUnprefixed = el.style.animationName !== void 0;
    const supportsWebkitPrefix = el.style.webkitAnimationName !== void 0;
    animationPrefix = !supportsUnprefixed && supportsWebkitPrefix ? "-webkit-" : "";
  }
  return animationPrefix;
};
var setStyleProperty = (element, propertyName, value) => {
  const prefix = propertyName.startsWith("animation") ? getAnimationPrefix(element) : "";
  element.style.setProperty(prefix + propertyName, value);
};
var removeStyleProperty = (element, propertyName) => {
  const prefix = propertyName.startsWith("animation") ? getAnimationPrefix(element) : "";
  element.style.removeProperty(prefix + propertyName);
};
var animationEnd = (el, callback) => {
  let unRegTrans;
  const opts = { passive: true };
  const unregister = () => {
    if (unRegTrans) {
      unRegTrans();
    }
  };
  const onTransitionEnd = (ev) => {
    if (el === ev.target) {
      unregister();
      callback(ev);
    }
  };
  if (el) {
    el.addEventListener("webkitAnimationEnd", onTransitionEnd, opts);
    el.addEventListener("animationend", onTransitionEnd, opts);
    unRegTrans = () => {
      el.removeEventListener("webkitAnimationEnd", onTransitionEnd, opts);
      el.removeEventListener("animationend", onTransitionEnd, opts);
    };
  }
  return unregister;
};
var generateKeyframeRules = (keyframes = []) => {
  return keyframes.map((keyframe) => {
    const offset = keyframe.offset;
    const frameString = [];
    for (const property in keyframe) {
      if (keyframe.hasOwnProperty(property) && property !== "offset") {
        frameString.push(`${property}: ${keyframe[property]};`);
      }
    }
    return `${offset * 100}% { ${frameString.join(" ")} }`;
  }).join(" ");
};
var keyframeIds = [];
var generateKeyframeName = (keyframeRules) => {
  let index = keyframeIds.indexOf(keyframeRules);
  if (index < 0) {
    index = keyframeIds.push(keyframeRules) - 1;
  }
  return `ion-animation-${index}`;
};
var getStyleContainer = (element) => {
  const rootNode = element.getRootNode !== void 0 ? element.getRootNode() : element;
  return rootNode.head || rootNode;
};
var createKeyframeStylesheet = (keyframeName, keyframeRules, element) => {
  var _a;
  const styleContainer = getStyleContainer(element);
  const keyframePrefix = getAnimationPrefix(element);
  const existingStylesheet = styleContainer.querySelector("#" + keyframeName);
  if (existingStylesheet) {
    return existingStylesheet;
  }
  const stylesheet = ((_a = element.ownerDocument) !== null && _a !== void 0 ? _a : document).createElement("style");
  stylesheet.id = keyframeName;
  stylesheet.textContent = `@${keyframePrefix}keyframes ${keyframeName} { ${keyframeRules} } @${keyframePrefix}keyframes ${keyframeName}-alt { ${keyframeRules} }`;
  styleContainer.appendChild(stylesheet);
  return stylesheet;
};
var addClassToArray = (classes = [], className) => {
  if (className !== void 0) {
    const classNameToAppend = Array.isArray(className) ? className : [className];
    return [...classes, ...classNameToAppend];
  }
  return classes;
};
var createAnimation = (animationId) => {
  let _delay;
  let _duration;
  let _easing;
  let _iterations;
  let _fill;
  let _direction;
  let _keyframes = [];
  let beforeAddClasses = [];
  let beforeRemoveClasses = [];
  let initialized = false;
  let parentAnimation;
  let beforeStylesValue = {};
  let afterAddClasses = [];
  let afterRemoveClasses = [];
  let afterStylesValue = {};
  let numAnimationsRunning = 0;
  let shouldForceLinearEasing = false;
  let shouldForceSyncPlayback = false;
  let cssAnimationsTimerFallback;
  let forceDirectionValue;
  let forceDurationValue;
  let forceDelayValue;
  let willComplete = true;
  let finished = false;
  let shouldCalculateNumAnimations = true;
  let keyframeName;
  let ani;
  let paused = false;
  const id = animationId;
  const onFinishCallbacks = [];
  const onFinishOneTimeCallbacks = [];
  const onStopOneTimeCallbacks = [];
  const elements = [];
  const childAnimations = [];
  const stylesheets = [];
  const _beforeAddReadFunctions = [];
  const _beforeAddWriteFunctions = [];
  const _afterAddReadFunctions = [];
  const _afterAddWriteFunctions = [];
  const webAnimations = [];
  const supportsAnimationEffect = typeof AnimationEffect === "function" || win !== void 0 && typeof win.AnimationEffect === "function";
  const supportsWebAnimations = typeof Element === "function" && typeof Element.prototype.animate === "function" && supportsAnimationEffect;
  const ANIMATION_END_FALLBACK_PADDING_MS = 100;
  const getWebAnimations = () => {
    return webAnimations;
  };
  const destroy = (clearStyleSheets) => {
    childAnimations.forEach((childAnimation) => {
      childAnimation.destroy(clearStyleSheets);
    });
    cleanUp(clearStyleSheets);
    elements.length = 0;
    childAnimations.length = 0;
    _keyframes.length = 0;
    clearOnFinish();
    initialized = false;
    shouldCalculateNumAnimations = true;
    return ani;
  };
  const cleanUp = (clearStyleSheets) => {
    cleanUpElements();
    if (clearStyleSheets) {
      cleanUpStyleSheets();
    }
  };
  const resetFlags = () => {
    shouldForceLinearEasing = false;
    shouldForceSyncPlayback = false;
    shouldCalculateNumAnimations = true;
    forceDirectionValue = void 0;
    forceDurationValue = void 0;
    forceDelayValue = void 0;
    numAnimationsRunning = 0;
    finished = false;
    willComplete = true;
    paused = false;
  };
  const isRunning = () => {
    return numAnimationsRunning !== 0 && !paused;
  };
  const clearCallback = (callbackToRemove, callbackObjects) => {
    const index = callbackObjects.findIndex((callbackObject) => callbackObject.c === callbackToRemove);
    if (index > -1) {
      callbackObjects.splice(index, 1);
    }
  };
  const onStop = (callback, opts) => {
    onStopOneTimeCallbacks.push({ c: callback, o: opts });
    return ani;
  };
  const onFinish = (callback, opts) => {
    const callbacks = (opts === null || opts === void 0 ? void 0 : opts.oneTimeCallback) ? onFinishOneTimeCallbacks : onFinishCallbacks;
    callbacks.push({ c: callback, o: opts });
    return ani;
  };
  const clearOnFinish = () => {
    onFinishCallbacks.length = 0;
    onFinishOneTimeCallbacks.length = 0;
    return ani;
  };
  const cleanUpElements = () => {
    if (supportsWebAnimations) {
      webAnimations.forEach((animation) => {
        animation.cancel();
      });
      webAnimations.length = 0;
    } else {
      const elementsArray = elements.slice();
      raf(() => {
        elementsArray.forEach((element) => {
          removeStyleProperty(element, "animation-name");
          removeStyleProperty(element, "animation-duration");
          removeStyleProperty(element, "animation-timing-function");
          removeStyleProperty(element, "animation-iteration-count");
          removeStyleProperty(element, "animation-delay");
          removeStyleProperty(element, "animation-play-state");
          removeStyleProperty(element, "animation-fill-mode");
          removeStyleProperty(element, "animation-direction");
        });
      });
    }
  };
  const cleanUpStyleSheets = () => {
    stylesheets.forEach((stylesheet) => {
      if (stylesheet === null || stylesheet === void 0 ? void 0 : stylesheet.parentNode) {
        stylesheet.parentNode.removeChild(stylesheet);
      }
    });
    stylesheets.length = 0;
  };
  const beforeAddRead = (readFn) => {
    _beforeAddReadFunctions.push(readFn);
    return ani;
  };
  const beforeAddWrite = (writeFn) => {
    _beforeAddWriteFunctions.push(writeFn);
    return ani;
  };
  const afterAddRead = (readFn) => {
    _afterAddReadFunctions.push(readFn);
    return ani;
  };
  const afterAddWrite = (writeFn) => {
    _afterAddWriteFunctions.push(writeFn);
    return ani;
  };
  const beforeAddClass = (className) => {
    beforeAddClasses = addClassToArray(beforeAddClasses, className);
    return ani;
  };
  const beforeRemoveClass = (className) => {
    beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);
    return ani;
  };
  const beforeStyles = (styles = {}) => {
    beforeStylesValue = styles;
    return ani;
  };
  const beforeClearStyles = (propertyNames = []) => {
    for (const property of propertyNames) {
      beforeStylesValue[property] = "";
    }
    return ani;
  };
  const afterAddClass = (className) => {
    afterAddClasses = addClassToArray(afterAddClasses, className);
    return ani;
  };
  const afterRemoveClass = (className) => {
    afterRemoveClasses = addClassToArray(afterRemoveClasses, className);
    return ani;
  };
  const afterStyles = (styles = {}) => {
    afterStylesValue = styles;
    return ani;
  };
  const afterClearStyles = (propertyNames = []) => {
    for (const property of propertyNames) {
      afterStylesValue[property] = "";
    }
    return ani;
  };
  const getFill = () => {
    if (_fill !== void 0) {
      return _fill;
    }
    if (parentAnimation) {
      return parentAnimation.getFill();
    }
    return "both";
  };
  const getDirection = () => {
    if (forceDirectionValue !== void 0) {
      return forceDirectionValue;
    }
    if (_direction !== void 0) {
      return _direction;
    }
    if (parentAnimation) {
      return parentAnimation.getDirection();
    }
    return "normal";
  };
  const getEasing = () => {
    if (shouldForceLinearEasing) {
      return "linear";
    }
    if (_easing !== void 0) {
      return _easing;
    }
    if (parentAnimation) {
      return parentAnimation.getEasing();
    }
    return "linear";
  };
  const getDuration = () => {
    if (shouldForceSyncPlayback) {
      return 0;
    }
    if (forceDurationValue !== void 0) {
      return forceDurationValue;
    }
    if (_duration !== void 0) {
      return _duration;
    }
    if (parentAnimation) {
      return parentAnimation.getDuration();
    }
    return 0;
  };
  const getIterations = () => {
    if (_iterations !== void 0) {
      return _iterations;
    }
    if (parentAnimation) {
      return parentAnimation.getIterations();
    }
    return 1;
  };
  const getDelay = () => {
    if (forceDelayValue !== void 0) {
      return forceDelayValue;
    }
    if (_delay !== void 0) {
      return _delay;
    }
    if (parentAnimation) {
      return parentAnimation.getDelay();
    }
    return 0;
  };
  const getKeyframes = () => {
    return _keyframes;
  };
  const direction = (animationDirection) => {
    _direction = animationDirection;
    update(true);
    return ani;
  };
  const fill = (animationFill) => {
    _fill = animationFill;
    update(true);
    return ani;
  };
  const delay = (animationDelay) => {
    _delay = animationDelay;
    update(true);
    return ani;
  };
  const easing = (animationEasing) => {
    _easing = animationEasing;
    update(true);
    return ani;
  };
  const duration = (animationDuration) => {
    if (!supportsWebAnimations && animationDuration === 0) {
      animationDuration = 1;
    }
    _duration = animationDuration;
    update(true);
    return ani;
  };
  const iterations = (animationIterations) => {
    _iterations = animationIterations;
    update(true);
    return ani;
  };
  const parent = (animation) => {
    parentAnimation = animation;
    return ani;
  };
  const addElement = (el) => {
    if (el != null) {
      if (el.nodeType === 1) {
        elements.push(el);
      } else if (el.length >= 0) {
        for (let i = 0; i < el.length; i++) {
          elements.push(el[i]);
        }
      } else {
        console.error("Invalid addElement value");
      }
    }
    return ani;
  };
  const addAnimation = (animationToAdd) => {
    if (animationToAdd != null) {
      if (Array.isArray(animationToAdd)) {
        for (const animation of animationToAdd) {
          animation.parent(ani);
          childAnimations.push(animation);
        }
      } else {
        animationToAdd.parent(ani);
        childAnimations.push(animationToAdd);
      }
    }
    return ani;
  };
  const keyframes = (keyframeValues) => {
    const different = _keyframes !== keyframeValues;
    _keyframes = keyframeValues;
    if (different) {
      updateKeyframes(_keyframes);
    }
    return ani;
  };
  const updateKeyframes = (keyframeValues) => {
    if (supportsWebAnimations) {
      getWebAnimations().forEach((animation) => {
        const keyframeEffect = animation.effect;
        if (keyframeEffect.setKeyframes) {
          keyframeEffect.setKeyframes(keyframeValues);
        } else {
          const newEffect = new KeyframeEffect(keyframeEffect.target, keyframeValues, keyframeEffect.getTiming());
          animation.effect = newEffect;
        }
      });
    } else {
      initializeCSSAnimation();
    }
  };
  const beforeAnimation = () => {
    _beforeAddReadFunctions.forEach((callback) => callback());
    _beforeAddWriteFunctions.forEach((callback) => callback());
    const addClasses = beforeAddClasses;
    const removeClasses = beforeRemoveClasses;
    const styles = beforeStylesValue;
    elements.forEach((el) => {
      const elementClassList = el.classList;
      addClasses.forEach((c) => elementClassList.add(c));
      removeClasses.forEach((c) => elementClassList.remove(c));
      for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    });
  };
  const afterAnimation = () => {
    clearCSSAnimationsTimeout();
    _afterAddReadFunctions.forEach((callback) => callback());
    _afterAddWriteFunctions.forEach((callback) => callback());
    const currentStep = willComplete ? 1 : 0;
    const addClasses = afterAddClasses;
    const removeClasses = afterRemoveClasses;
    const styles = afterStylesValue;
    elements.forEach((el) => {
      const elementClassList = el.classList;
      addClasses.forEach((c) => elementClassList.add(c));
      removeClasses.forEach((c) => elementClassList.remove(c));
      for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    });
    forceDurationValue = void 0;
    forceDirectionValue = void 0;
    forceDelayValue = void 0;
    onFinishCallbacks.forEach((onFinishCallback) => {
      return onFinishCallback.c(currentStep, ani);
    });
    onFinishOneTimeCallbacks.forEach((onFinishCallback) => {
      return onFinishCallback.c(currentStep, ani);
    });
    onFinishOneTimeCallbacks.length = 0;
    shouldCalculateNumAnimations = true;
    if (willComplete) {
      finished = true;
    }
    willComplete = true;
  };
  const animationFinish = () => {
    if (numAnimationsRunning === 0) {
      return;
    }
    numAnimationsRunning--;
    if (numAnimationsRunning === 0) {
      afterAnimation();
      if (parentAnimation) {
        parentAnimation.animationFinish();
      }
    }
  };
  const initializeCSSAnimation = (toggleAnimationName = true) => {
    cleanUpStyleSheets();
    const processedKeyframes = processKeyframes(_keyframes);
    elements.forEach((element) => {
      if (processedKeyframes.length > 0) {
        const keyframeRules = generateKeyframeRules(processedKeyframes);
        keyframeName = animationId !== void 0 ? animationId : generateKeyframeName(keyframeRules);
        const stylesheet = createKeyframeStylesheet(keyframeName, keyframeRules, element);
        stylesheets.push(stylesheet);
        setStyleProperty(element, "animation-duration", `${getDuration()}ms`);
        setStyleProperty(element, "animation-timing-function", getEasing());
        setStyleProperty(element, "animation-delay", `${getDelay()}ms`);
        setStyleProperty(element, "animation-fill-mode", getFill());
        setStyleProperty(element, "animation-direction", getDirection());
        const iterationsCount = getIterations() === Infinity ? "infinite" : getIterations().toString();
        setStyleProperty(element, "animation-iteration-count", iterationsCount);
        setStyleProperty(element, "animation-play-state", "paused");
        if (toggleAnimationName) {
          setStyleProperty(element, "animation-name", `${stylesheet.id}-alt`);
        }
        raf(() => {
          setStyleProperty(element, "animation-name", stylesheet.id || null);
        });
      }
    });
  };
  const initializeWebAnimation = () => {
    elements.forEach((element) => {
      const animation = element.animate(_keyframes, {
        id,
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection()
      });
      animation.pause();
      webAnimations.push(animation);
    });
    if (webAnimations.length > 0) {
      webAnimations[0].onfinish = () => {
        animationFinish();
      };
    }
  };
  const initializeAnimation = (toggleAnimationName = true) => {
    beforeAnimation();
    if (_keyframes.length > 0) {
      if (supportsWebAnimations) {
        initializeWebAnimation();
      } else {
        initializeCSSAnimation(toggleAnimationName);
      }
    }
    initialized = true;
  };
  const setAnimationStep = (step) => {
    step = Math.min(Math.max(step, 0), 0.9999);
    if (supportsWebAnimations) {
      webAnimations.forEach((animation) => {
        animation.currentTime = animation.effect.getComputedTiming().delay + getDuration() * step;
        animation.pause();
      });
    } else {
      const animationDuration = `-${getDuration() * step}ms`;
      elements.forEach((element) => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, "animation-delay", animationDuration);
          setStyleProperty(element, "animation-play-state", "paused");
        }
      });
    }
  };
  const updateWebAnimation = (step) => {
    webAnimations.forEach((animation) => {
      animation.effect.updateTiming({
        delay: getDelay(),
        duration: getDuration(),
        easing: getEasing(),
        iterations: getIterations(),
        fill: getFill(),
        direction: getDirection()
      });
    });
    if (step !== void 0) {
      setAnimationStep(step);
    }
  };
  const updateCSSAnimation = (toggleAnimationName = true, step) => {
    raf(() => {
      elements.forEach((element) => {
        setStyleProperty(element, "animation-name", keyframeName || null);
        setStyleProperty(element, "animation-duration", `${getDuration()}ms`);
        setStyleProperty(element, "animation-timing-function", getEasing());
        setStyleProperty(element, "animation-delay", step !== void 0 ? `-${step * getDuration()}ms` : `${getDelay()}ms`);
        setStyleProperty(element, "animation-fill-mode", getFill() || null);
        setStyleProperty(element, "animation-direction", getDirection() || null);
        const iterationsCount = getIterations() === Infinity ? "infinite" : getIterations().toString();
        setStyleProperty(element, "animation-iteration-count", iterationsCount);
        if (toggleAnimationName) {
          setStyleProperty(element, "animation-name", `${keyframeName}-alt`);
        }
        raf(() => {
          setStyleProperty(element, "animation-name", keyframeName || null);
        });
      });
    });
  };
  const update = (deep = false, toggleAnimationName = true, step) => {
    if (deep) {
      childAnimations.forEach((animation) => {
        animation.update(deep, toggleAnimationName, step);
      });
    }
    if (supportsWebAnimations) {
      updateWebAnimation(step);
    } else {
      updateCSSAnimation(toggleAnimationName, step);
    }
    return ani;
  };
  const progressStart = (forceLinearEasing = false, step) => {
    childAnimations.forEach((animation) => {
      animation.progressStart(forceLinearEasing, step);
    });
    pauseAnimation();
    shouldForceLinearEasing = forceLinearEasing;
    if (!initialized) {
      initializeAnimation();
    }
    update(false, true, step);
    return ani;
  };
  const progressStep = (step) => {
    childAnimations.forEach((animation) => {
      animation.progressStep(step);
    });
    setAnimationStep(step);
    return ani;
  };
  const progressEnd = (playTo, step, dur) => {
    shouldForceLinearEasing = false;
    childAnimations.forEach((animation) => {
      animation.progressEnd(playTo, step, dur);
    });
    if (dur !== void 0) {
      forceDurationValue = dur;
    }
    finished = false;
    willComplete = true;
    if (playTo === 0) {
      forceDirectionValue = getDirection() === "reverse" ? "normal" : "reverse";
      if (forceDirectionValue === "reverse") {
        willComplete = false;
      }
      if (supportsWebAnimations) {
        update();
        setAnimationStep(1 - step);
      } else {
        forceDelayValue = (1 - step) * getDuration() * -1;
        update(false, false);
      }
    } else if (playTo === 1) {
      if (supportsWebAnimations) {
        update();
        setAnimationStep(step);
      } else {
        forceDelayValue = step * getDuration() * -1;
        update(false, false);
      }
    }
    if (playTo !== void 0 && !parentAnimation) {
      play();
    }
    return ani;
  };
  const pauseAnimation = () => {
    if (initialized) {
      if (supportsWebAnimations) {
        webAnimations.forEach((animation) => {
          animation.pause();
        });
      } else {
        elements.forEach((element) => {
          setStyleProperty(element, "animation-play-state", "paused");
        });
      }
      paused = true;
    }
  };
  const pause = () => {
    childAnimations.forEach((animation) => {
      animation.pause();
    });
    pauseAnimation();
    return ani;
  };
  const onAnimationEndFallback = () => {
    cssAnimationsTimerFallback = void 0;
    animationFinish();
  };
  const clearCSSAnimationsTimeout = () => {
    if (cssAnimationsTimerFallback) {
      clearTimeout(cssAnimationsTimerFallback);
    }
  };
  const playCSSAnimations = () => {
    clearCSSAnimationsTimeout();
    raf(() => {
      elements.forEach((element) => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, "animation-play-state", "running");
        }
      });
    });
    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    } else {
      const animationDelay = getDelay() || 0;
      const animationDuration = getDuration() || 0;
      const animationIterations = getIterations() || 1;
      if (isFinite(animationIterations)) {
        cssAnimationsTimerFallback = setTimeout(onAnimationEndFallback, animationDelay + animationDuration * animationIterations + ANIMATION_END_FALLBACK_PADDING_MS);
      }
      animationEnd(elements[0], () => {
        clearCSSAnimationsTimeout();
        raf(() => {
          clearCSSAnimationPlayState();
          raf(animationFinish);
        });
      });
    }
  };
  const clearCSSAnimationPlayState = () => {
    elements.forEach((element) => {
      removeStyleProperty(element, "animation-duration");
      removeStyleProperty(element, "animation-delay");
      removeStyleProperty(element, "animation-play-state");
    });
  };
  const playWebAnimations = () => {
    webAnimations.forEach((animation) => {
      animation.play();
    });
    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    }
  };
  const resetAnimation = () => {
    if (supportsWebAnimations) {
      setAnimationStep(0);
      updateWebAnimation();
    } else {
      updateCSSAnimation();
    }
  };
  const play = (opts) => {
    return new Promise((resolve) => {
      if (opts === null || opts === void 0 ? void 0 : opts.sync) {
        shouldForceSyncPlayback = true;
        onFinish(() => shouldForceSyncPlayback = false, { oneTimeCallback: true });
      }
      if (!initialized) {
        initializeAnimation();
      }
      if (finished) {
        resetAnimation();
        finished = false;
      }
      if (shouldCalculateNumAnimations) {
        numAnimationsRunning = childAnimations.length + 1;
        shouldCalculateNumAnimations = false;
      }
      const onStopCallback = () => {
        clearCallback(onFinishCallback, onFinishOneTimeCallbacks);
        resolve();
      };
      const onFinishCallback = () => {
        clearCallback(onStopCallback, onStopOneTimeCallbacks);
        resolve();
      };
      onFinish(onFinishCallback, { oneTimeCallback: true });
      onStop(onStopCallback, { oneTimeCallback: true });
      childAnimations.forEach((animation) => {
        animation.play();
      });
      if (supportsWebAnimations) {
        playWebAnimations();
      } else {
        playCSSAnimations();
      }
      paused = false;
    });
  };
  const stop = () => {
    childAnimations.forEach((animation) => {
      animation.stop();
    });
    if (initialized) {
      cleanUpElements();
      initialized = false;
    }
    resetFlags();
    onStopOneTimeCallbacks.forEach((onStopCallback) => onStopCallback.c(0, ani));
    onStopOneTimeCallbacks.length = 0;
  };
  const from = (property, value) => {
    const firstFrame = _keyframes[0];
    if (firstFrame !== void 0 && (firstFrame.offset === void 0 || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      _keyframes = [{ offset: 0, [property]: value }, ..._keyframes];
    }
    return ani;
  };
  const to = (property, value) => {
    const lastFrame = _keyframes[_keyframes.length - 1];
    if (lastFrame !== void 0 && (lastFrame.offset === void 0 || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      _keyframes = [..._keyframes, { offset: 1, [property]: value }];
    }
    return ani;
  };
  const fromTo = (property, fromValue, toValue) => {
    return from(property, fromValue).to(property, toValue);
  };
  return ani = {
    parentAnimation,
    elements,
    childAnimations,
    id,
    animationFinish,
    from,
    to,
    fromTo,
    parent,
    play,
    pause,
    stop,
    destroy,
    keyframes,
    addAnimation,
    addElement,
    update,
    fill,
    direction,
    iterations,
    duration,
    easing,
    delay,
    getWebAnimations,
    getKeyframes,
    getFill,
    getDirection,
    getDelay,
    getIterations,
    getEasing,
    getDuration,
    afterAddRead,
    afterAddWrite,
    afterClearStyles,
    afterStyles,
    afterRemoveClass,
    afterAddClass,
    beforeAddRead,
    beforeAddWrite,
    beforeClearStyles,
    beforeStyles,
    beforeRemoveClass,
    beforeAddClass,
    onFinish,
    isRunning,
    progressStart,
    progressStep,
    progressEnd
  };
};

// node_modules/@stencil/core/internal/app-data/index.js
var BUILD = {
  allRenderFn: false,
  element: true,
  event: true,
  hasRenderFn: true,
  hostListener: true,
  hostListenerTargetWindow: true,
  hostListenerTargetDocument: true,
  hostListenerTargetBody: true,
  hostListenerTargetParent: false,
  hostListenerTarget: true,
  member: true,
  method: true,
  mode: true,
  observeAttribute: true,
  prop: true,
  propMutable: true,
  reflect: true,
  scoped: true,
  shadowDom: true,
  slot: true,
  cssAnnotations: true,
  state: true,
  style: true,
  formAssociated: false,
  svg: true,
  updatable: true,
  vdomAttribute: true,
  vdomXlink: true,
  vdomClass: true,
  vdomFunctional: true,
  vdomKey: true,
  vdomListener: true,
  vdomRef: true,
  vdomPropOrAttr: true,
  vdomRender: true,
  vdomStyle: true,
  vdomText: true,
  watchCallback: true,
  taskQueue: true,
  hotModuleReplacement: false,
  isDebug: false,
  isDev: false,
  isTesting: false,
  hydrateServerSide: false,
  hydrateClientSide: false,
  lifecycleDOMEvents: false,
  lazyLoad: false,
  profile: false,
  slotRelocation: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  appendChildSlotFix: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  cloneNodeFix: false,
  hydratedAttribute: false,
  hydratedClass: true,
  // TODO(STENCIL-1305): remove this option
  scriptDataOpts: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  scopedSlotTextContentFix: false,
  // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
  shadowDomShim: false,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  slotChildNodesFix: false,
  invisiblePrehydration: true,
  propBoolean: true,
  propNumber: true,
  propString: true,
  constructableCSS: true,
  devTools: false,
  shadowDelegatesFocus: true,
  initializeNextTick: false,
  asyncLoading: true,
  asyncQueue: false,
  transformTagName: false,
  attachStyles: true,
  // TODO(STENCIL-914): remove this option when `experimentalSlotFixes` is the default behavior
  experimentalSlotFixes: false
};

// import("./**/*.entry.js*") in node_modules/@stencil/core/internal/client/index.js
var globImport_entry_js = __glob({});

// node_modules/@stencil/core/internal/client/index.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var Build = {
  isDev: BUILD.isDev ? true : false,
  isBrowser: true,
  isServer: false,
  isTesting: BUILD.isTesting ? true : false
};
var PrimitiveType = ((PrimitiveType2) => {
  PrimitiveType2["Undefined"] = "undefined";
  PrimitiveType2["Null"] = "null";
  PrimitiveType2["String"] = "string";
  PrimitiveType2["Number"] = "number";
  PrimitiveType2["SpecialNumber"] = "number";
  PrimitiveType2["Boolean"] = "boolean";
  PrimitiveType2["BigInt"] = "bigint";
  return PrimitiveType2;
})(PrimitiveType || {});
var NonPrimitiveType = ((NonPrimitiveType2) => {
  NonPrimitiveType2["Array"] = "array";
  NonPrimitiveType2["Date"] = "date";
  NonPrimitiveType2["Map"] = "map";
  NonPrimitiveType2["Object"] = "object";
  NonPrimitiveType2["RegularExpression"] = "regexp";
  NonPrimitiveType2["Set"] = "set";
  NonPrimitiveType2["Channel"] = "channel";
  NonPrimitiveType2["Symbol"] = "symbol";
  return NonPrimitiveType2;
})(NonPrimitiveType || {});
var getHostRef = (ref) => {
  if (ref.__stencil__getHostRef) {
    return ref.__stencil__getHostRef();
  }
  return void 0;
};
var customError;
var consoleError = (e, el) => (customError || console.error)(e, el);
var STENCIL_DEV_MODE = BUILD.isTesting ? ["STENCIL:"] : [
  "%cstencil",
  "color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px"
];
var win2 = typeof window !== "undefined" ? window : {};
var H = win2.HTMLElement || class {
};
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts)
};
var supportsShadow = BUILD.shadowDom;
var supportsListenerOptions = (() => {
  var _a;
  let supportsListenerOptions2 = false;
  try {
    (_a = win2.document) == null ? void 0 : _a.addEventListener(
      "e",
      null,
      Object.defineProperty({}, "passive", {
        get() {
          supportsListenerOptions2 = true;
        }
      })
    );
  } catch (e) {
  }
  return supportsListenerOptions2;
})();
var promiseResolve = (v) => Promise.resolve(v);
var supportsConstructableStylesheets = BUILD.constructableCSS ? (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
})() : false;
var queueCongestion = 0;
var queuePending = false;
var queueDomReads = [];
var queueDomWrites = [];
var queueDomWritesLow = [];
var queueTask = (queue, write) => (cb) => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
var consume = (queue) => {
  for (let i2 = 0; i2 < queue.length; i2++) {
    try {
      queue[i2](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
var consumeTimeout = (queue, timeout) => {
  let i2 = 0;
  let ts = 0;
  while (i2 < queue.length && (ts = performance.now()) < timeout) {
    try {
      queue[i2++](ts);
    } catch (e) {
      consoleError(e);
    }
  }
  if (i2 === queue.length) {
    queue.length = 0;
  } else if (i2 !== 0) {
    queue.splice(0, i2);
  }
};
var flush = () => {
  if (BUILD.asyncQueue) {
    queueCongestion++;
  }
  consume(queueDomReads);
  if (BUILD.asyncQueue) {
    const timeout = (plt.$flags$ & 6) === 2 ? performance.now() + 14 * Math.ceil(queueCongestion * (1 / 10)) : Infinity;
    consumeTimeout(queueDomWrites, timeout);
    consumeTimeout(queueDomWritesLow, timeout);
    if (queueDomWrites.length > 0) {
      queueDomWritesLow.push(...queueDomWrites);
      queueDomWrites.length = 0;
    }
    if (queuePending = queueDomReads.length + queueDomWrites.length + queueDomWritesLow.length > 0) {
      plt.raf(flush);
    } else {
      queueCongestion = 0;
    }
  } else {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
var nextTick = (cb) => promiseResolve().then(cb);
var readTask = queueTask(queueDomReads, false);
var writeTask = queueTask(queueDomWrites, true);
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
var lowerPathParam = (fn) => (p) => fn(p.toLowerCase());
var isDtsFile = lowerPathParam((p) => p.endsWith(".d.ts") || p.endsWith(".d.mts") || p.endsWith(".d.cts"));
var isTsFile = lowerPathParam(
  (p) => !isDtsFile(p) && (p.endsWith(".ts") || p.endsWith(".mts") || p.endsWith(".cts"))
);
var isTsxFile = lowerPathParam(
  (p) => p.endsWith(".tsx") || p.endsWith(".mtsx") || p.endsWith(".ctsx")
);
var isJsxFile = lowerPathParam(
  (p) => p.endsWith(".jsx") || p.endsWith(".mjsx") || p.endsWith(".cjsx")
);
var isJsFile = lowerPathParam((p) => p.endsWith(".js") || p.endsWith(".mjs") || p.endsWith(".cjs"));
var _polyfillHost = "-shadowcsshost";
var _polyfillSlotted = "-shadowcssslotted";
var _polyfillHostContext = "-shadowcsscontext";
var _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
var _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
var _cssColonHostContextRe = new RegExp("(" + _polyfillHostContext + _parenSuffix, "gim");
var _cssColonSlottedRe = new RegExp("(" + _polyfillSlotted + _parenSuffix, "gim");
var _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
var createSupportsRuleRe = (selector) => new RegExp(`((?<!(^@supports(.*)))|(?<={.*))(${selector}\\b)`, "gim");
var _colonSlottedRe = createSupportsRuleRe("::slotted");
var _colonHostRe = createSupportsRuleRe(":host");
var _colonHostContextRe = createSupportsRuleRe(":host-context");
var getMode = (ref) => getHostRef(ref).$modeName$;
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");

// node_modules/@ionic/core/components/index2.js
var LIFECYCLE_WILL_ENTER = "ionViewWillEnter";
var LIFECYCLE_DID_ENTER = "ionViewDidEnter";
var LIFECYCLE_WILL_LEAVE = "ionViewWillLeave";
var LIFECYCLE_DID_LEAVE = "ionViewDidLeave";
var LIFECYCLE_WILL_UNLOAD = "ionViewWillUnload";
var getIonPageElement = (element) => {
  if (element.classList.contains("ion-page")) {
    return element;
  }
  const ionPage = element.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");
  if (ionPage) {
    return ionPage;
  }
  return element;
};

export {
  getMode,
  doc,
  componentOnReady,
  createAnimation,
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
  getIonPageElement
};
/*! Bundled license information:

@ionic/core/components/index5.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/helpers.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/animation.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@stencil/core/internal/client/index.js:
  (**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *
   * This file is a port of shadowCSS from `webcomponents.js` to TypeScript.
   * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
   * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
   *)

@ionic/core/components/index2.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-YEWGM5MO.js.map
