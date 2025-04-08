import {
  WebPlugin
} from "./chunk-7CPMOSH3.js";
import {
  __async
} from "./chunk-I47SK5T2.js";

// node_modules/@capacitor/browser/dist/esm/web.js
var BrowserWeb = class extends WebPlugin {
  constructor() {
    super();
    this._lastWindow = null;
  }
  open(options) {
    return __async(this, null, function* () {
      this._lastWindow = window.open(options.url, options.windowName || "_blank");
    });
  }
  close() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        if (this._lastWindow != null) {
          this._lastWindow.close();
          this._lastWindow = null;
          resolve();
        } else {
          reject("No active window to close!");
        }
      });
    });
  }
};
var Browser = new BrowserWeb();
export {
  Browser,
  BrowserWeb
};
//# sourceMappingURL=web-HBZTKWYI.js.map
