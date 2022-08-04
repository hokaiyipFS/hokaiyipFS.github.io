(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--14-3!./src/style/app.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./node_modules/sass-loader/lib/loader.js??ref--14-3!./src/style/app.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  APP ***/\n/************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** nav menu vars ***/\n/*********************/\n/*** app styles ***/\nbody {\n  font-family: \"Nunito Sans\", sans-serif;\n  font-size: 100%; }\n.btn {\n  border-radius: 0; }\n.btn-primary {\n    background-color: #283891; }\nul {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n/*** utility ***/\n/***************/\n.u-paddingLeft30 {\n  padding-left: 30px !important; }\n@media (min-width: 992px) {\n    .u-paddingLeft30--medium {\n      padding-left: 30px !important; } }\n.u-whiteText {\n  color: white; }\n"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/about/about.component.html":
/*!********************************************!*\
  !*** ./src/app/about/about.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"why-section\" class=\"why-section content-section\">\n    <h3 class=\"content-section-title\">About Us</h3>\n    <div class=\"content-section-description u-whiteText\">\n        <p>\n            We are a lean team of Full Stack Engineers that specialize in building <em>entire software solutions</em>\n            for startup companies in Columbus, Ohio.\n        </p>\n    </div>\n\n    <div class=\"is-flex-rows\">\n\n        <button class=\"btn btn-info  btn-lg btn-light\" type=\"button\">\n            Projects <span class=\"badge badge-primary\">50+</span>\n        </button>\n\n        <button class=\"btn btn-info  btn-lg btn-light\" type=\"button\">\n            Funding raised <span class=\"badge badge-primary\">5M+</span>\n        </button>\n\n        <button class=\"btn btn-info  btn-lg btn-light\" type=\"button\">\n            Start-ups involved <span class=\"badge badge-primary\">20+</span>\n        </button>\n\n        <button class=\"btn btn-info  btn-lg btn-light\" type=\"button\">\n            Line of codes <span class=\"badge badge-primary\">Tons</span>\n        </button>\n\n    </div>\n</section>\n"

/***/ }),

/***/ "./src/app/about/about.component.scss":
/*!********************************************!*\
  !*** ./src/app/about/about.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n.content-section {\n  font-size: 15px;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section {\n      padding: 60px 90px; } }\n.content-section.why-section {\n    min-height: 50vh;\n    padding-top: 10vh;\n    background-color: #283891;\n    color: white;\n    padding-bottom: 10vh; }\n.content-section .content-section-title {\n    font-size: 2.25em;\n    font-weight: 900;\n    margin: 0 0 30px 0;\n    text-transform: uppercase;\n    padding: 30px; }\n@media (min-width: 768px) {\n      .content-section .content-section-title {\n        font-size: 3.125em; } }\n@media (min-width: 992px) {\n      .content-section .content-section-title {\n        font-size: 4.5em; } }\n@media (min-width: 1200px) {\n      .content-section .content-section-title {\n        font-size: 5em; } }\n.content-section .content-section-description {\n    padding-bottom: 150px;\n    font-size: 1.575em; }\n.content-section .is-flex-rows {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n    justify-content: space-around; }\n.content-section .is-flex-rows button {\n      min-width: 25vw;\n      margin: 15px; }\n@media (min-width: 768px) {\n        .content-section .is-flex-rows button {\n          min-width: 40vw; } }\n@media (min-width: 992px) {\n        .content-section .is-flex-rows button {\n          min-width: 10vw; } }\n@media (min-width: 768px) {\n      .content-section .is-flex-rows {\n        display: flex;\n        margin: 7.5px;\n        flex-direction: row;\n        flex-wrap: wrap;\n        justify-content: space-around; } }\n"

/***/ }),

/***/ "./src/app/about/about.component.ts":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
        // Do stuff
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.scss */ "./src/app/about/about.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav-menu></nav-menu>\n<main>\n    <router-outlet></router-outlet>\n</main>\n\n<footer>\n\n\n    <div class=\"flex-two-col is-flex-rows\">\n\n        <a routerLink=\"/privacy-policy\"\n           pageScroll\n           href=\"#portfolio\"\n        ><i class=\"fa fa-product-hunt\" aria-hidden=\"true\"></i> Privacy Policy</a>\n\n\n        <a href=\"https://www.linkedin.com/company/fullstackers\" target=\"_blank\"\n        ><i class=\"fa fa-linkedin-square\" aria-hidden=\"true\"></i> LinkedIn </a>\n\n        <a href=\"https://github.com/fullstackers\" target=\"_blank\"\n        ><i class=\"fa fa-github-square\" aria-hidden=\"true\"></i> GitHub </a>\n\n        <span><i class=\"fa fa-copyright\" aria-hidden=\"true\"></i> Made in the Midwest. Established 2015</span>\n    </div>\n\n</footer>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n:host {\n  display: block; }\nheader {\n  background-color: #fff;\n  padding: 16px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%; }\nmain {\n  text-align: center;\n  display: block; }\nfooter {\n  text-align: center;\n  font-size: 0.8em;\n  padding-top: 20px;\n  padding-bottom: 20px; }\nfooter a, footer span {\n    color: #a0a59e;\n    padding-top: 10px; }\n.is-flex-rows {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  justify-content: space-around; }\n.is-flex-rows a {\n    min-width: 20vw;\n    text-decoration: none;\n    font-size: larger;\n    padding: 0.5em; }\n@media (min-width: 768px) {\n    .is-flex-rows {\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      justify-content: space-around; } }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_page_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-page-scroll */ "./node_modules/ngx-page-scroll/ngx-page-scroll.js");
/* harmony import */ var _style_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/app.scss */ "./src/style/app.scss");
/* harmony import */ var _style_app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_app_scss__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.url = 'http://fullstackers.com';
        ngx_page_scroll__WEBPACK_IMPORTED_MODULE_1__["PageScrollConfig"].defaultScrollOffset = 50;
        ngx_page_scroll__WEBPACK_IMPORTED_MODULE_1__["PageScrollConfig"].defaultEasingLogic = {
            ease: function (t, b, c, d) {
                // easeInOutExpo easing
                if (t === 0)
                    return b;
                if (t === d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/not-found/not-found.component.ts");
/* harmony import */ var _hero_hero_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hero/hero.component */ "./src/app/hero/hero.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _blob_blob_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./blob/blob.component */ "./src/app/blob/blob.component.ts");
/* harmony import */ var _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nav-menu/nav-menu.component */ "./src/app/nav-menu/nav-menu.component.ts");
/* harmony import */ var _contact_form_contact_form_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./contact-form/contact-form.component */ "./src/app/contact-form/contact-form.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/portfolio/portfolio.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _showcase_showcase_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./showcase/showcase.component */ "./src/app/showcase/showcase.component.ts");
/* harmony import */ var _pipes_breaker_breaker_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pipes/breaker/breaker.pipe */ "./src/app/pipes/breaker/breaker.pipe.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shared */ "./src/app/shared/index.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var ngx_page_scroll__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-page-scroll */ "./node_modules/ngx-page-scroll/ngx-page-scroll.js");
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angularclass/hmr */ "./node_modules/@angularclass/hmr/dist/index.js");
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_23__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















// 3RD PARTY



Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
var AppModule = /** @class */ (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        console.log('HMR store', store);
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // recreate elements
        store.disposeOldHosts = Object(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_23__["createNewHosts"])(cmpLocation);
        // remove styles
        Object(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_23__["removeNgStyles"])();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_2__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_20__["routing"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__["NgbModule"].forRoot(),
                ngx_page_scroll__WEBPACK_IMPORTED_MODULE_22__["NgxPageScrollModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _about_about_component__WEBPACK_IMPORTED_MODULE_11__["AboutComponent"],
                _nav_menu_nav_menu_component__WEBPACK_IMPORTED_MODULE_13__["NavMenuComponent"],
                _contact_form_contact_form_component__WEBPACK_IMPORTED_MODULE_14__["ContactFormComponent"],
                _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
                _hero_hero_component__WEBPACK_IMPORTED_MODULE_9__["HeroComponent"],
                _contact_contact_component__WEBPACK_IMPORTED_MODULE_10__["ContactComponent"],
                _pipes_breaker_breaker_pipe__WEBPACK_IMPORTED_MODULE_18__["BreakerPipe"],
                _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_15__["PortfolioComponent"],
                _showcase_showcase_component__WEBPACK_IMPORTED_MODULE_17__["ShowcaseComponent"],
                _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_16__["PrivacyPolicyComponent"],
                _blob_blob_component__WEBPACK_IMPORTED_MODULE_12__["BlobComponent"]
            ],
            providers: [
                _shared__WEBPACK_IMPORTED_MODULE_19__["ApiService"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/portfolio/portfolio.component.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/not-found/not-found.component.ts");
/* harmony import */ var _showcase_showcase_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./showcase/showcase.component */ "./src/app/showcase/showcase.component.ts");







var routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'about', component: _about_about_component__WEBPACK_IMPORTED_MODULE_2__["AboutComponent"] },
    { path: 'portfolio', component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_4__["PortfolioComponent"] },
    { path: 'showcase', component: _showcase_showcase_component__WEBPACK_IMPORTED_MODULE_6__["ShowcaseComponent"] },
    { path: 'privacy-policy', component: _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_3__["PrivacyPolicyComponent"] },
    // All your other routes should come first
    { path: '404', component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"] },
    { path: '**', component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"] }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "./src/app/blob/blob.component.html":
/*!******************************************!*\
  !*** ./src/app/blob/blob.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"blob-section\" class=\"blob-section content-section\">\n\n    <ngb-carousel *ngIf=\"blobs\" class=\"carousel  slide carousel-fade\">\n        <ng-template ngbSlide *ngFor=\"let blob of blobs; let i = index\">\n            <div class=\"picsum-img-wrapper\">\n                <img [src]=\"blob.url\" class=\"d-block w-auto d-md-block\">\n            </div>\n            <div class=\"carousel-caption\">\n                <h3>{{blob.type}}</h3>\n                <blockquote><p>{{blob.message}}</p></blockquote>\n                <div class=\"from\" *ngIf=\"blob.from\">{{blob.from}}</div>\n            </div>\n        </ng-template>\n\n    </ngb-carousel>\n\n\n</section>\n"

/***/ }),

/***/ "./src/app/blob/blob.component.scss":
/*!******************************************!*\
  !*** ./src/app/blob/blob.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n.blob-section {\n  font-size: 15px;\n  transition: ease;\n  transition-duration: 1000ms; }\n.blob-section .carousel-caption {\n    padding-top: 30px;\n    position: inherit;\n    left: 0%;\n    top: 0px;\n    padding-bottom: 60px;\n    background-color: rgba(0, 0, 0, 0.8); }\n.blob-section .carousel-caption h3 {\n      color: white;\n      font-size: 2rem; }\n@media (min-width: 768px) {\n        .blob-section .carousel-caption h3 {\n          color: white; } }\n.blob-section .carousel-caption p {\n      color: white;\n      font-size: 15px !important;\n      padding: 30px; }\n@media (min-width: 768px) {\n        .blob-section .carousel-caption p {\n          color: white; } }\n.blob-section .carousel-caption .from {\n      font-size: 1.2rem; }\n"

/***/ }),

/***/ "./src/app/blob/blob.component.ts":
/*!****************************************!*\
  !*** ./src/app/blob/blob.component.ts ***!
  \****************************************/
/*! exports provided: BlobComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlobComponent", function() { return BlobComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlobComponent = /** @class */ (function () {
    // 180,366,370, 119, 192, 48, 60
    function BlobComponent() {
        // Do stuff
        this.blobs = [
            {
                url: "https://picsum.photos/id/366/1600/300",
                type: 'Testimonial',
                from: 'Gary Ross, CEO, Med-Compliance IQ',
                message: '"Nathan and his team are a pleasure to work with. They are not only talented at software development but are dedicated to delivering results for their customers. They put in extra effort upfront to learn your business so that they can design software that fits the company vision like a glove and helps the business grow. I highly recommend you consider Fullstackers for your next startup or existing business software development project."'
            },
            {
                url: "https://picsum.photos/id/192/1600/300",
                type: 'Do you know?',
                message: 'Fullstackers retains 80% of previous clients thru out the years.'
            },
            {
                url: "https://picsum.photos/id/370/1600/300",
                type: 'Testimonial',
                from: 'Hall Johnson, Co-Founder & CEO, MassMatrix',
                message: '"Early collaboration with Fullstackers allowed us to effectively complete our development-specific objectives moving us to achieve our funding goals. In our latest iteration Fullstackers contributed with their expertise in project management, design and development, allowing us to bring our product from complex concept to market."'
            },
            {
                url: "https://picsum.photos/id/60/1600/300",
                type: 'Do you know?',
                message: 'Fullstackers adopts agile practice for most of our clients. We also tailor our development process to best fit client\'s need.'
            }
        ];
    }
    BlobComponent.prototype.ngOnInit = function () {
    };
    BlobComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'blob',
            template: __webpack_require__(/*! ./blob.component.html */ "./src/app/blob/blob.component.html"),
            styles: [__webpack_require__(/*! ./blob.component.scss */ "./src/app/blob/blob.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlobComponent);
    return BlobComponent;
}());



/***/ }),

/***/ "./src/app/contact-form/contact-form.component.html":
/*!**********************************************************!*\
  !*** ./src/app/contact-form/contact-form.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" id=\"contact-form\">\n  <div [hidden]=\"submitted\">\n    <h5>Drop us a line</h5>\n    <form (ngSubmit)=\"onSubmit()\" #contactForm=\"ngForm\">\n      <div class=\"form-group\">\n        <label for=\"name\">Your Name\n          <span [hidden]=\"name.valid || name.pristine\"\n                class=\"alert\">\n            * Required\n          </span>\n        </label>\n        <input type=\"text\" class=\"form-control\" id=\"name\"\n               required\n               [(ngModel)]=\"model.name\" name=\"name\"\n               #name=\"ngModel\">\n\n      </div>\n      <div class=\"form-group\">\n        <label for=\"title\">Title</label>\n        <input type=\"text\" class=\"form-control\" id=\"title\"\n               [(ngModel)]=\"model.title\" name=\"title\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email\">Email Address\n          <span [hidden]=\"email.valid || email.pristine\" class=\"alert\">\n            * Required\n          </span>\n        </label>\n        <input type=\"email\" class=\"form-control\" id=\"email\"\n               required\n               [(ngModel)]=\"model.email\" name=\"email\"\n               #email=\"ngModel\"/>\n\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email\">Phone Number <span [hidden]=\"phone.valid || phone.pristine\" class=\"alert\">\n          * Required\n        </span></label>\n        <input type=\"phone\" class=\"form-control\" id=\"phone\"\n               required\n               [(ngModel)]=\"model.phone\" name=\"phone\"\n               #phone=\"ngModel\"/>\n\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email\">Message <span [hidden]=\"message.valid || message.pristine\" class=\"alert\">\n          Tell us what we can help.\n        </span></label>\n        <input type=\"text\" class=\"form-control\" id=\"message\"\n               required\n               [(ngModel)]=\"model.message\" name=\"message\"\n               #message=\"ngModel\"/>\n\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!contactForm.form.valid\">Submit</button>\n    </form>\n  </div>\n  <div [hidden]=\"!submitted\">\n    <h3>Thank you. We will contact you shortly.</h3>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/contact-form/contact-form.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/contact-form/contact-form.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n#contact-form {\n  padding-bottom: 20px; }\n#contact-form h5 {\n    color: #283891;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    text-transform: uppercase;\n    font-weight: bolder; }\n#contact-form label {\n    color: #78d9fe;\n    text-transform: uppercase;\n    margin-bottom: 0px; }\n#contact-form input {\n    border-radius: 0;\n    background-color: transparent;\n    color: white;\n    border-top: none;\n    border-right: none;\n    border-left: none;\n    border-bottom: 1px solid #78d9fe;\n    outline: none;\n    box-shadow: none; }\n#contact-form input:focus {\n      outline: none; }\n#contact-form .alert {\n    border-radius: 0px; }\n"

/***/ }),

/***/ "./src/app/contact-form/contact-form.component.ts":
/*!********************************************************!*\
  !*** ./src/app/contact-form/contact-form.component.ts ***!
  \********************************************************/
/*! exports provided: ContactFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormComponent", function() { return ContactFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact */ "./src/app/contact-form/contact.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactFormComponent = /** @class */ (function () {
    function ContactFormComponent(http) {
        this.http = http;
        this.model = new _contact__WEBPACK_IMPORTED_MODULE_1__["Contact"]();
        this.submitted = false;
    }
    ContactFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var data = [];
        for (var k in this.model) {
            data.push(k + '=' + this.model[k]);
        }
        var body = data.join('&');
        this.http
            .post('http://fullstackers.us/contact', body, {
            headers: headers
        })
            .subscribe(function () {
            console.log('sent');
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
        return;
    };
    ContactFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'contact-form',
            template: __webpack_require__(/*! ./contact-form.component.html */ "./src/app/contact-form/contact-form.component.html"),
            styles: [__webpack_require__(/*! ./contact-form.component.scss */ "./src/app/contact-form/contact-form.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], ContactFormComponent);
    return ContactFormComponent;
}());



/***/ }),

/***/ "./src/app/contact-form/contact.ts":
/*!*****************************************!*\
  !*** ./src/app/contact-form/contact.ts ***!
  \*****************************************/
/*! exports provided: Contact */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return Contact; });
var Contact = /** @class */ (function () {
    function Contact(name, title, email, phone, message) {
        this.name = name;
        this.title = title;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }
    return Contact;
}());



/***/ }),

/***/ "./src/app/contact/contact.component.html":
/*!************************************************!*\
  !*** ./src/app/contact/contact.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"contact-section\" class=\"contact-section content-section\">\n    <h3 class=\"content-section-title\">\n        Contact\n    </h3>\n    <div class=\"content-section-description\">\n        <p>\n            Share your ideas with us. We will set you up for success.\n        </p>\n        <div class=\"content-section-body flex-two-col is-flex-rows is-contact\">\n\n            <!--<div class=\"content-section-body-subsection is-full-column--small is-60-column--medium is-50-column--large\">\n              <h4 class=\"content-section-subtitle\">Drop us a line</h4>\n              <form class=\"contact-form\">\n\n                <label class=\"contact-form-label\">Your name</label>\n                <input class=\"contact-form-input\" type=\"text\">\n\n                <label class=\"contact-form-label\">Title</label>\n                <input class=\"contact-form-input\" type=\"text\">\n\n                <label class=\"contact-form-label\">Email address</label>\n                <input class=\"contact-form-input\" type=\"email\">\n\n                <label class=\"contact-form-label\">Phone number</label>\n                <input class=\"contact-form-input\" type=\"tel\">\n\n                <label class=\"contact-form-label\">Message</label>\n                <textarea class=\"contact-form-input\"></textarea>\n\n                <button class=\"contact-form-submit\" type=\"submit\">Submit</button>\n\n              </form>\n            </div>-->\n\n            <!--<div class=\"is-flex-cols is-contact u-paddingLeft30--medium\">-->\n            <!-- remove is-adjusted eventually -->\n<!--            <div class=\"content-section-body-subsection is-adjusted\">-->\n<!--                <h4 class=\"content-section-subtitle\">Visit our office</h4>-->\n<!--                <address>-->\n<!--                    1360 South High Street<br/>-->\n<!--                    Columbus, Ohio 43207<br/>-->\n<!--                </address>-->\n<!--            </div>-->\n\n            <div class=\"content-section-body-subsection is-adjusted\">\n                <h4 class=\"content-section-subtitle\">Start Dialing</h4>\n                <a class=\"contact-section-phone\" href=\"tel:614.259.8680\">(614) 259-8680</a>\n            </div>\n\n            <div class=\"content-section-body-subsection is-adjusted\">\n                <h4 class=\"content-section-subtitle\">Send an email</h4>\n                <a class=\"contact-section-email\" href=\"mailto:info@fullstackers.com\">info@fullstackers.com</a>\n            </div>\n\n            <!--<div class=\"content-section-body-subsection\">\n              <h4 class=\"content-section-subtitle\">Be social</h4>\n              <a class=\"social-link\" href=\"\">LinkedIn</a>\n              <a class=\"social-link\" href=\"\">Twitter</a>\n              <a class=\"social-link\" href=\"\">Facebook</a>\n            </div>-->\n            <!--</div>-->\n\n        </div>\n    </div>\n</section>\n"

/***/ }),

/***/ "./src/app/contact/contact.component.scss":
/*!************************************************!*\
  !*** ./src/app/contact/contact.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** content section vars ***/\n/****************************/\n/*** content section styles ***/\n/******************************/\n.content-section {\n  font-size: 1rem;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section {\n      padding: 60px 90px; } }\n.content-section.why-section {\n    background-color: #283891;\n    color: white; }\n.content-section.solutions-section {\n    background-color: white;\n    color: #283891;\n    padding: 30px 90px 30px 90px; }\n@media (max-width: 768px) {\n      .content-section.solutions-section {\n        padding: 30px; } }\n@media (min-width: 768px) {\n      .content-section.solutions-section {\n        padding: 60px 90px 0 90px; } }\n.content-section.stack-section {\n    background-color: #283891;\n    color: white; }\n.content-section.contact-section {\n    background-color: #00aeef;\n    color: white; }\n.content-section.contact-section a {\n      text-decoration: none !important; }\n.content-section.contact-section a:hover {\n        text-decoration: none; }\n@media (min-width: 768px) {\n      .content-section.contact-section {\n        padding: 60px 0 60px 0; } }\n.content-section.contact-section .content-section-subtitle {\n      color: #283891; }\n.content-section.contact-section a {\n      color: white; }\n.content-section.contact-section .contact-section-phone {\n      font-size: 1.5em;\n      font-weight: 700; }\n.content-section.contact-section .contact-section-email {\n      font-size: 1.5em; }\n.content-section-title {\n  font-size: 2.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase; }\n@media (min-width: 768px) {\n    .content-section-title {\n      font-size: 3.125em; } }\n@media (min-width: 992px) {\n    .content-section-title {\n      font-size: 4.5em; } }\n@media (min-width: 1200px) {\n    .content-section-title {\n      font-size: 5em; } }\n.content-section-subtitle {\n  font-size: 1.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase; }\n.content-section-description p {\n  font-size: 1em;\n  line-height: calc(1em + 10px); }\n.content-section-description p:last-child {\n    margin: 0; }\n@media (min-width: 992px) {\n    .content-section-description p {\n      font-size: 1.25em; } }\n@media (min-width: 1200px) {\n    .content-section-description p {\n      margin-left: auto;\n      margin-right: auto;\n      max-width: 600px; }\n      .content-section-description p:last-child {\n        margin-left: auto;\n        margin-right: auto;\n        margin-bottom: 0; } }\n@media (min-width: 768px) {\n  .content-section-description {\n    margin: 0 auto;\n    width: 66.66666667%; } }\n@media (min-width: 992px) {\n  .content-section-description {\n    width: 75%; } }\n.content-section-body {\n  margin: 30px 0 0 0; }\n@media (min-width: 768px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: 315px; } }\n@media (min-width: 992px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: auto;\n        width: 40%; }\n        .content-section-body .is-flex-cols.is-contact .content-section-body-subsection {\n          width: 100%; } }\n@media (min-width: 1200px) {\n    .content-section-body .is-flex-cols.is-contact {\n      height: 425px;\n      width: 50%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(1), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(2) {\n        width: 60%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(3), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(4) {\n        width: 40%; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-rows {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-solutions {\n      margin: 15px 0 0 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-solutions {\n      background-color: #f7f7f7;\n      margin: 45px -90px 0 -90px; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-cols {\n      display: flex;\n      flex-wrap: wrap;\n      flex-direction: column; }\n      .content-section-body.flex-two-col.is-flex-cols.is-contact {\n        height: 250px; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 1100px;\n      margin-bottom: 0; }\n    .content-section-body.flex-two-col.is-flex-cols.is-contact {\n      margin-bottom: 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 575px; } }\n.content-section-body-subsection {\n  margin: 0 0 30px 0;\n  text-align: left; }\n.content-section-body-subsection.is-full-column {\n    width: 100%; }\n@media (min-width: 768px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: 100%; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: auto; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: 100%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: auto; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--large {\n        width: 100%; } }\n.content-section-body-subsection.is-60-column {\n    width: 60%; }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: 60%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: auto; } }\n.content-section-body-subsection.is-50-column {\n    width: 50%; }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-50-column--large {\n        width: 50%; } }\n@media (min-width: 768px) {\n    .content-section-body-subsection {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 30px 0 0 0;\n      width: 50%; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      font-size: 1.125em;\n      margin-bottom: 30px; }\n      .content-section-body-subsection.is-adjusted {\n        width: auto;\n        text-align: center; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      margin-bottom: 0; } }\n.service {\n  margin: 0 0 30px 0;\n  position: relative; }\n.service:nth-child(1) .service-title {\n    color: #283891;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(2) .service-title {\n    color: #00aeef;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(3) .service-title {\n    color: #cf4a2f;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(4) .service-title {\n    color: #72933d;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(5) .service-title {\n    color: #964374;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(6) .service-title {\n    color: #a0a59e;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(7) .service-title {\n    color: #213e41;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(8) .service-title {\n    color: #71362c;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:last-child {\n    margin: 0; }\n.service::after {\n    -webkit-clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n    content: '';\n    display: block;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 10; }\n.service:hover:after {\n    -webkit-animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n            animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    background: #00aeef; }\n.service:hover .service-title,\n  .service:hover .service-item {\n    -webkit-animation: text-to-white .3s ease-in;\n            animation: text-to-white .3s ease-in;\n    -webkit-animation-delay: .25s;\n            animation-delay: .25s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n@-webkit-keyframes text-to-white {\n  100% {\n    color: white; } }\n@keyframes text-to-white {\n  100% {\n    color: white; } }\n@-webkit-keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@media (min-width: 768px) {\n    .service {\n      flex: 0 1 40%;\n      margin: 0;\n      padding: 30px 0 60px 0; } }\n@media (min-width: 992px) {\n    .service {\n      flex: 0 1 33.333333%;\n      min-height: 305px; } }\n@media (min-width: 1200px) {\n    .service {\n      flex: 0 1 25%;\n      min-height: 335px;\n      padding: 60px 0 60px 0; } }\n.service-title {\n  font-weight: 900;\n  position: relative;\n  text-transform: uppercase;\n  z-index: 20; }\n@media (min-width: 768px) {\n    .service-title {\n      margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n    .service-title {\n      font-size: 1.75em; } }\n.service-list {\n  position: relative;\n  z-index: 20; }\n.service-item {\n  color: #999999;\n  line-height: calc(1em + 10px); }\n@media (min-width: 992px) {\n    .service-item {\n      font-size: 1.125em; } }\n.stack {\n  margin: 0 0 15px 0; }\n.stack:last-child {\n    margin: 0; }\n@media (min-width: 768px) {\n    .stack {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 15px 0 0 0; } }\n@media (min-width: 992px) {\n    .stack {\n      padding: 30px 0 0 0; } }\n.stack-title {\n  color: #00aeef;\n  font-weight: 700; }\n@media (min-width: 768px) {\n    .stack-title {\n      font-size: 1.75em;\n      margin: 0 0 15px 0; } }\n.stack-item {\n  line-height: calc(1em + 20px); }\n.stack-item a {\n    color: white; }\n@media (min-width: 992px) {\n    .stack-item {\n      font-size: 1.125em; } }\n.contact-form {\n  font-size: 1em; }\n.contact-form-label {\n    color: #78d9fe;\n    display: block;\n    margin: 0;\n    text-transform: uppercase; }\n.contact-form-input {\n    background-color: transparent;\n    border-top: 0;\n    border-right: 0;\n    border-left: 0;\n    border-bottom: 1px solid #78d9fe;\n    margin: 0 0 30px 0;\n    width: 100%; }\n.contact-form-submit {\n    background-color: #00ccff;\n    border: 0;\n    font-weight: 700;\n    margin: 0 0 30px 0;\n    padding: 5px 15px;\n    text-transform: uppercase; }\n.social-link {\n  display: block;\n  padding: 0 0 15px 0; }\n.social-link:last-child {\n    padding-bottom: 0; }\n"

/***/ }),

/***/ "./src/app/contact/contact.component.ts":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContactComponent = /** @class */ (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.scss */ "./src/app/contact/contact.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/hero/hero.component.html":
/*!******************************************!*\
  !*** ./src/app/hero/hero.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"hero\" [ngStyle]=\"{'background-image': 'url(' + bg + ')'}\">\n    <div class=\"hero-title--centered-large\">\n        <h1 class=\"hero-title\">\n            {{title}}\n        </h1>\n        <h2 class=\"hero-subtitle\" *ngIf=\"subtitle\">\n            {{subtitle}}\n        </h2>\n    </div>\n    <!--    <div class=\"hero-indicator\" aria-hidden=\"true\">-->\n    <!--        <svg class=\"hero-indicator-icon\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"-->\n    <!--             viewBox=\"0 0 61 61\" height=\"50\" width=\"50\">-->\n    <!--            <path d=\"M30.5,0C13.7,0,0,13.7,0,30.5C0,47.3,13.7,61,30.5,61S61,47.3,61,30.5C61,13.7,47.3,0,30.5,0z M30.5,41-->\n    <!--      \t\tL14.9,28.6l3.9-4.5l11.7,9.1L42.2,24l3.9,4.5L30.5,41z\"/>-->\n    <!--        </svg>-->\n    <!--    </div>-->\n    <div class=\"hero-image-attribution\" *ngIf=\"showAttribution\">\n        Photo: <a href=\"https://www.flickr.com/photos/alwaysshooting/\">@alwaysshooting</a>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hero/hero.component.scss":
/*!******************************************!*\
  !*** ./src/app/hero/hero.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  NAV MENU  ***/\n/****************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** nav menu vars ***/\n/*********************/\n.hero {\n  background-image: url(\"/assets/img/cbus.jpg\");\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  color: white;\n  font-size: 1rem;\n  padding: 140px 0 80px 0;\n  position: relative;\n  overflow: hidden; }\n.hero:after {\n    content: '';\n    display: block;\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    top: 0;\n    left: 0;\n    background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px); }\n@media (min-width: 992px) {\n    .hero {\n      height: 100vh;\n      padding: 0;\n      position: relative; } }\n.hero-title {\n  font-size: 3em;\n  font-weight: 900;\n  margin: 0 auto 30px auto;\n  max-width: 400px;\n  text-align: center;\n  text-transform: uppercase;\n  position: relative;\n  z-index: 50; }\n@media (min-width: 768px) {\n    .hero-title {\n      font-size: 4.5em;\n      max-width: 600px; } }\n@media (min-width: 992px) {\n    .hero-title {\n      font-size: 5.625em;\n      margin: 0;\n      max-width: initial;\n      width: 900px; }\n      .hero-title--centered-large {\n        position: absolute;\n        left: 50%;\n        top: calc(50% + 60px);\n        -webkit-transform: translate(-50%, calc(-1 * (50% + 60px)));\n                transform: translate(-50%, calc(-1 * (50% + 60px)));\n        z-index: 50; } }\n@media (min-width: 1200px) {\n    .hero-title {\n      font-size: 7.5em;\n      width: 1000px; } }\n.hero-subtitle {\n  display: block;\n  font-size: 1.375em;\n  font-weight: 600;\n  text-align: center;\n  position: relative;\n  z-index: 50; }\n@media (min-width: 992px) {\n    .hero-subtitle {\n      font-size: 1.875em;\n      margin: 60px 0 0 0; } }\n.hero-subtitle::before {\n    content: '\\007B'; }\n.hero-subtitle:after {\n    content: '\\007D'; }\n.hero-indicator {\n  -webkit-animation: indicator-bounce 2s cubic-bezier(0, 0.5, 0, 0.5);\n          animation: indicator-bounce 2s cubic-bezier(0, 0.5, 0, 0.5);\n  -webkit-animation-delay: 2s;\n          animation-delay: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  bottom: 10px;\n  height: 25px;\n  left: 50%;\n  position: absolute;\n  z-index: 50;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 25px; }\n@media (min-width: 992px) {\n    .hero-indicator {\n      height: auto;\n      width: auto; } }\n.hero-indicator-icon {\n    fill: white;\n    height: auto;\n    width: 100%; }\n@media (min-width: 992px) {\n      .hero-indicator-icon {\n        width: auto; } }\n.hero-image-attribution {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  padding: 5px;\n  font-size: 0.7em;\n  z-index: 50; }\n.hero-image-attribution a,\n  .hero-image-attribution a:focus,\n  .hero-image-attribution a:hover {\n    color: white; }\n@-webkit-keyframes indicator-bounce {\n  5% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); }\n  25% {\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0); }\n  30% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); } }\n@keyframes indicator-bounce {\n  5% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); }\n  25% {\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0); }\n  30% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); } }\n"

/***/ }),

/***/ "./src/app/hero/hero.component.ts":
/*!****************************************!*\
  !*** ./src/app/hero/hero.component.ts ***!
  \****************************************/
/*! exports provided: HeroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroComponent", function() { return HeroComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeroComponent = /** @class */ (function () {
    function HeroComponent() {
    }
    HeroComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('title'),
        __metadata("design:type", String)
    ], HeroComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('subtitle'),
        __metadata("design:type", String)
    ], HeroComponent.prototype, "subtitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('showAttribution'),
        __metadata("design:type", Boolean)
    ], HeroComponent.prototype, "showAttribution", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('bg'),
        __metadata("design:type", String)
    ], HeroComponent.prototype, "bg", void 0);
    HeroComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'hero',
            template: __webpack_require__(/*! ./hero.component.html */ "./src/app/hero/hero.component.html"),
            styles: [__webpack_require__(/*! ./hero.component.scss */ "./src/app/hero/hero.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HeroComponent);
    return HeroComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"home\" class=\"home\">\n    <hero\n            [title]=\"'Custom Software Development'\"\n            [subtitle]=\"'We develop apps, cloud services, algorithms, and much more...'\"\n            [showAttribution]=\"true\"\n            [bg]=\"'/assets/img/cbus.jpg'\">\n\n    </hero>\n</div>\n\n<about></about>\n\n\n<!--<section id=\"skills-section\" class=\"skills-section content-section\">-->\n<!--    <h3 class=\"content-section-title\">-->\n<!--        Skills-->\n<!--    </h3>-->\n<!--    <div class=\"content-section-description\">-->\n<!--        <p>Our Software Engineers have over one hundred years combined experience in planning, building, and deploying entire software solutions for server, desktop, and mobile platforms.-->\n\n<!--        </p>-->\n<!--    </div>-->\n<!--    <div class=\"content-section-body flex-two-col is-flex-rows is-skills\">-->\n<!--        <div *ngFor=\"let service of services\" class=\"service\">-->\n<!--            <h4 class=\"service-title\" [innerHTML]=\"service.title | myTitleBreaker\"></h4>-->\n<!--            <ul class=\"service-list hidden-xs\">-->\n<!--                <li *ngFor=\"let item of service.items\" class=\"service-item\">{{item}}</li>-->\n<!--            </ul>-->\n<!--        </div>-->\n<!--    </div>-->\n<!--</section>-->\n\n\n<section id=\"skills-section\" class=\"skills-section content-section\">\n    <h3 class=\"content-section-title\">\n        Technology Skillset\n    </h3>\n    <div class=\"content-section-description\">\n        <p>Here are some of the tools we use daily or in our previous projects.</p>\n    </div>\n\n    <div class=\"content-section-body is-flex-rows is-skills\">\n        <div *ngFor=\"let skillset of skillsets\" class=\"skillset\">\n            <h4 class=\"skillset-title\" [innerHTML]=\"skillset.title | myTitleBreaker\"></h4>\n            <div class=\"skillset-list\">\n                <div *ngFor=\"let skill of skillset.items\" class=\"skillset-item\" title=\"{{skill}}\">{{skill}}</div>\n            </div>\n        </div>\n    </div>\n\n    <!--    <div class=\"content-section-body flex-two-col is-flex-rows is-skills\">-->\n    <!--        <div *ngFor=\"let service of services\" class=\"service\">-->\n    <!--            <h4 class=\"service-title\" [innerHTML]=\"service.title | myTitleBreaker\"></h4>-->\n    <!--            <ul class=\"service-list hidden-xs\">-->\n    <!--                <li *ngFor=\"let item of service.items\" class=\"service-item\">{{item}}</li>-->\n    <!--            </ul>-->\n    <!--        </div>-->\n    <!--    </div>-->\n</section>\n\n<!--<section id=\"stack-section\" class=\"stack-section content-section\">-->\n<!--    <h3 class=\"content-section-title\">Technology</h3>-->\n<!--    <div class=\"content-section-description\">-->\n<!--        <p>-->\n<!--            We are passionate about exploring new technology. However, we do understand technology is a tool, and some-->\n<!--            tools are better than others for the job at hand. We will apply our methodologies to your technology stack.-->\n<!--            Here are some of our favorites.-->\n<!--        </p>-->\n<!--        <div class=\"content-section-body flex-two-col is-flex-cols is-stack\">-->\n<!--            <div *ngFor=\"let stack of stacks\" class=\"stack\">-->\n<!--                <h4 class=\"stack-title\">{{stack.title}}</h4>-->\n<!--                <ul class=\"stack-list hidden-xs hidden-sm\">-->\n<!--                    <li *ngFor=\"let item of stack.items\" class=\"stack-item\">-->\n<!--                        <h5>-->\n<!--                            <a href=\"{{item.link}}\" target=\"_blank\">{{item.label}}</a>-->\n<!--                        </h5>-->\n<!--                    </li>-->\n<!--                </ul>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </div>-->\n<!--</section>-->\n\n<blob></blob>\n\n<contact></contact>\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** content section vars ***/\n/****************************/\n/*** content section styles ***/\n/******************************/\n.content-section {\n  font-size: 15px;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section {\n      padding: 60px 90px; } }\n.content-section.why-section {\n    min-height: 50vh;\n    padding-top: 10vh;\n    background-color: #283891;\n    color: white; }\n.content-section.skills-section {\n    background-color: white;\n    color: #283891;\n    padding: 30px 90px 30px 90px;\n    padding: 150px;\n    padding-top: 10vh; }\n@media (max-width: 768px) {\n      .content-section.skills-section {\n        padding: 30px; } }\n@media (min-width: 768px) {\n      .content-section.skills-section {\n        padding: 60px 90px 0 90px; } }\n.content-section.stack-section {\n    background-color: #283891;\n    color: white; }\n.content-section.contact-section {\n    background-color: #00aeef;\n    color: white; }\n.content-section.contact-section a {\n      text-decoration: none; }\n.content-section.contact-section a:hover {\n        text-decoration: none; }\n@media (min-width: 768px) {\n      .content-section.contact-section {\n        padding: 60px 0 60px 0; } }\n.content-section.contact-section .content-section-subtitle {\n      color: #283891; }\n.content-section.contact-section a {\n      color: white; }\n.content-section.contact-section .contact-section-phone {\n      font-size: 1.5em;\n      font-weight: 700; }\n.content-section.contact-section .contact-section-email {\n      font-size: 1.5em; }\n.content-section-title {\n  font-size: 2.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section-title {\n      font-size: 3.125em; } }\n@media (min-width: 992px) {\n    .content-section-title {\n      font-size: 4.5em; } }\n@media (min-width: 1200px) {\n    .content-section-title {\n      font-size: 5em; } }\n.content-section-subtitle {\n  font-size: 1.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase; }\n.content-section-description p {\n  font-size: 1em;\n  line-height: calc(1em + 10px);\n  padding-bottom: 30px; }\n.content-section-description p:last-child {\n    margin: 0; }\n@media (min-width: 992px) {\n    .content-section-description p {\n      font-size: 1.25em; } }\n@media (min-width: 1200px) {\n    .content-section-description p {\n      margin-left: auto;\n      margin-right: auto;\n      max-width: 600px; }\n      .content-section-description p:last-child {\n        margin-left: auto;\n        margin-right: auto;\n        margin-bottom: 0; } }\n@media (min-width: 768px) {\n  .content-section-description {\n    margin: 0 auto;\n    width: 66.66666667%; } }\n@media (min-width: 992px) {\n  .content-section-description {\n    width: 75%; } }\n.content-section-body {\n  margin: 30px 0 0 0; }\n@media (min-width: 768px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: 315px; } }\n@media (min-width: 992px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: auto;\n        width: 40%; }\n        .content-section-body .is-flex-cols.is-contact .content-section-body-subsection {\n          width: 100%; } }\n@media (min-width: 1200px) {\n    .content-section-body .is-flex-cols.is-contact {\n      height: 425px;\n      width: 50%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(1), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(2) {\n        width: 60%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(3), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(4) {\n        width: 40%; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-rows {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-skills {\n      margin: 15px 0 0 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-skills {\n      background-color: #f7f7f7;\n      margin: 45px -90px 0 -90px; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-cols {\n      display: flex;\n      flex-wrap: wrap;\n      flex-direction: column; }\n      .content-section-body.flex-two-col.is-flex-cols.is-contact {\n        height: 250px; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 1100px;\n      margin-bottom: 0; }\n    .content-section-body.flex-two-col.is-flex-cols.is-contact {\n      margin-bottom: 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 575px; } }\n.content-section-body-subsection {\n  margin: 0 0 30px 0;\n  text-align: left; }\n.content-section-body-subsection.is-full-column {\n    width: 100%; }\n@media (min-width: 768px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: 100%; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: auto; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: 100%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: auto; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--large {\n        width: 100%; } }\n.content-section-body-subsection.is-60-column {\n    width: 60%; }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: 60%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: auto; } }\n.content-section-body-subsection.is-50-column {\n    width: 50%; }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-50-column--large {\n        width: 50%; } }\n@media (min-width: 768px) {\n    .content-section-body-subsection {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 30px 0 0 0;\n      width: 50%; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      font-size: 1.125em;\n      margin-bottom: 30px; }\n      .content-section-body-subsection.is-adjusted {\n        width: auto;\n        text-align: center; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      margin-bottom: 0; } }\n.service {\n  margin: 0 0 30px 0;\n  position: relative; }\n.service:nth-child(1) .service-title {\n    color: #283891;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(2) .service-title {\n    color: #00aeef;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(3) .service-title {\n    color: #cf4a2f;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(4) .service-title {\n    color: #72933d;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(5) .service-title {\n    color: #964374;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(6) .service-title {\n    color: #a0a59e;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(7) .service-title {\n    color: #213e41;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(8) .service-title {\n    color: #71362c;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:last-child {\n    margin: 0; }\n.service::after {\n    -webkit-clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n    content: '';\n    display: block;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 10; }\n.service:hover:after {\n    -webkit-animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n            animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    background: #00aeef; }\n.service:hover .service-title,\n  .service:hover .service-item {\n    -webkit-animation: text-to-white .3s ease-in;\n            animation: text-to-white .3s ease-in;\n    -webkit-animation-delay: .25s;\n            animation-delay: .25s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n@-webkit-keyframes text-to-white {\n  100% {\n    color: white; } }\n@keyframes text-to-white {\n  100% {\n    color: white; } }\n@-webkit-keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@media (min-width: 768px) {\n    .service {\n      flex: 0 1 40%;\n      margin: 0;\n      padding: 30px 0 60px 0; } }\n@media (min-width: 992px) {\n    .service {\n      flex: 0 1 33.333333%;\n      min-height: 305px; } }\n@media (min-width: 1200px) {\n    .service {\n      flex: 0 1 25%;\n      min-height: 335px;\n      padding: 60px 0 60px 0; } }\n.service-title {\n  font-weight: 900;\n  position: relative;\n  text-transform: uppercase;\n  z-index: 20; }\n@media (min-width: 768px) {\n    .service-title {\n      margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n    .service-title {\n      font-size: 1.75em; } }\n.service-list {\n  position: relative;\n  z-index: 20; }\n.service-item {\n  color: #999999;\n  line-height: calc(1em + 10px); }\n@media (min-width: 992px) {\n    .service-item {\n      font-size: 1.125em; } }\n.skillset {\n  margin: 0 0 30px 0;\n  display: block; }\n.skillset .skillset-list {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-content: center;\n    align-items: center;\n    justify-content: center;\n    padding-bottom: 30px; }\n.skillset .skillset-title {\n    font-weight: 900;\n    position: relative;\n    text-transform: uppercase;\n    z-index: 20; }\n@media (min-width: 768px) {\n      .skillset .skillset-title {\n        margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n      .skillset .skillset-title {\n        font-size: 1.75em; } }\n.skillset .skillset-item {\n    min-width: 100px;\n    color: #999999;\n    line-height: calc(1em + 10px);\n    padding: 15px;\n    margin: 7.5px;\n    border-radius: 30px;\n    border: 1px solid #999999;\n    transition: ease;\n    transition-duration: 1000ms;\n    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -6px; }\n@media (min-width: 992px) {\n      .skillset .skillset-item {\n        font-size: 1.125em; } }\n.skillset .skillset-item:hover {\n      box-shadow: rgba(0, 0, 0, 0.65) 0px 15px 20px -6px; }\n.service-title {\n  font-weight: 900;\n  position: relative;\n  text-transform: uppercase;\n  z-index: 20; }\n@media (min-width: 768px) {\n    .service-title {\n      margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n    .service-title {\n      font-size: 1.75em; } }\n.service-list {\n  position: relative;\n  z-index: 20; }\n.service-item {\n  color: #999999;\n  line-height: calc(1em + 10px); }\n@media (min-width: 992px) {\n    .service-item {\n      font-size: 1.125em; } }\n.stack {\n  margin: 0 0 15px 0; }\n.stack:last-child {\n    margin: 0; }\n@media (min-width: 768px) {\n    .stack {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 15px 0 0 0; } }\n@media (min-width: 992px) {\n    .stack {\n      padding: 30px 0 0 0; } }\n.stack-title {\n  color: #00aeef;\n  font-weight: 700; }\n@media (min-width: 768px) {\n    .stack-title {\n      font-size: 1.75em;\n      margin: 0 0 15px 0; } }\n.stack-item {\n  line-height: calc(1em + 20px); }\n.stack-item a {\n    color: white; }\n@media (min-width: 992px) {\n    .stack-item {\n      font-size: 1.125em; } }\n.contact-form {\n  font-size: 1em; }\n.contact-form-label {\n    color: #78d9fe;\n    display: block;\n    margin: 0;\n    text-transform: uppercase; }\n.contact-form-input {\n    background-color: transparent;\n    border-top: 0;\n    border-right: 0;\n    border-left: 0;\n    border-bottom: 1px solid #78d9fe;\n    margin: 0 0 30px 0;\n    width: 100%; }\n.contact-form-submit {\n    background-color: #00ccff;\n    border: 0;\n    font-weight: 700;\n    margin: 0 0 30px 0;\n    padding: 5px 15px;\n    text-transform: uppercase; }\n.social-link {\n  display: block;\n  padding: 0 0 15px 0; }\n.social-link:last-child {\n    padding-bottom: 0; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        // Do stuff
        this.skillsets = [
            {
                title: 'Front-end',
                items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Sass/Less', 'D3', 'Angular', 'React', 'React Native', 'Bootstrap', 'Augmented Reality', 'Material Design']
            },
            {
                title: 'Back-end',
                items: ['Node.js', 'TypeScript', 'Python', 'Java']
            },
            {
                title: "Database",
                items: ['SQL', 'SQLite', 'MongoDB', 'PouchDB', 'Redis', 'RabbitMQ', 'PostgreSQL']
            },
            {
                title: 'Data Science',
                items: ['TensorFlow', 'SciKit']
            },
            {
                title: '3rd-Party Integration',
                items: ['Google Analytics', 'Firebase', 'Stripes', 'MailChimp', 'Twilio', 'Shopify', 'OneSignal']
            },
            {
                title: 'Tooling',
                items: ['AWS', 'Amplify', 'Git', 'Docker', 'ECS', 'Jasmine', 'Jenkins', 'Webpack', 'npm', 'TestFlight', 'Headless-CMS', 'Wordpress']
            },
        ];
        this.services = [{
                title: 'Product Development',
                items: ['Business analysis', 'Market research', 'User Experience + Design']
            }, {
                title: 'Front-end Development',
                items: ['Web + native mobile', 'Responsive designs']
            }, {
                title: 'Back-end Development',
                items: ['Service-oriented architectures', 'Micro services', 'REST API\'s', '3rd party integrations']
            }, {
                title: 'Development Operations',
                items: ['Build automation', 'Continuous integration', 'Monitoring + Support']
            }, {
                title: 'Data Management',
                items: ['Migrations', 'Integrations (ETL)', 'Warehousing']
            }, {
                title: 'Data Science',
                items: ['Data analysis', 'Data reporting', 'Classifier development']
            }];
        this.stacks = [{
                title: 'Front-end',
                items: [{
                        label: 'JavaScript',
                        link: 'https://en.wikipedia.org/wiki/JavaScript'
                    }, {
                        label: 'AngularJS',
                        link: 'https://angularjs.org/'
                    }, {
                        label: 'Angular',
                        link: 'https://angular.io/'
                    }, {
                        label: 'React',
                        link: 'https://facebook.github.io/react/'
                    }, {
                        label: 'React Native',
                        link: 'https://facebook.github.io/react-native/'
                    }, {
                        label: 'Bootstrap',
                        link: 'http://getbootstrap.com/'
                    }, {
                        label: 'Jasmine',
                        link: 'https://jasmine.github.io/'
                    }, {
                        label: 'Webpack',
                        link: 'https://webpack.github.io/'
                    }, {
                        label: 'Grunt',
                        link: 'https://gruntjs.com/'
                    }, {
                        label: 'Gulp',
                        link: 'http://gulpjs.com/'
                    }]
            }, {
                title: 'Back-end',
                items: [{
                        label: 'Java',
                        link: 'https://go.java/'
                    }, {
                        label: 'Node.js',
                        link: 'https://nodejs.org/en/'
                    }, {
                        label: 'Python',
                        link: 'https://www.python.org/'
                    }, {
                        label: 'PHP',
                        link: 'http://php.net/manual/en/intro-whatis.php'
                    }]
            }, {
                title: 'Data',
                items: [{
                        label: 'PostgreSQL',
                        link: 'https://www.postgresql.org/'
                    }, {
                        label: 'MySQL',
                        link: 'https://www.mysql.com/'
                    }, {
                        label: 'MongoDB',
                        link: 'https://www.mongodb.com/'
                    }, {
                        label: 'RabbitMQ',
                        link: 'https://www.rabbitmq.com/'
                    }, {
                        label: 'Redis',
                        link: 'https://redis.io/'
                    }, {
                        label: 'Elasticsearch',
                        link: 'https://www.elastic.co/'
                    }]
            }, {
                title: 'DevOps',
                items: [{
                        label: 'Amazon Web Services (AWS)',
                        link: 'https://aws.amazon.com/'
                    }, {
                        label: 'Docker',
                        link: 'https://www.docker.com/'
                    }, {
                        label: 'Jenkins',
                        link: 'https://jenkins.io/'
                    }]
            }, {
                title: 'Analytics',
                items: [{
                        label: 'Tensorflow',
                        link: 'http://hadoop.apache.org/'
                    }]
            }];
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'my-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.html":
/*!**************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n\n    <div class=\"header-bar\">\n        <a class=\"logo-link\" routerLink=\"/\" pageScroll fragment=\"home\" href=\"#home\">\n            <svg class=\"logo\" xmlns=\"http://www.w3.org/2000/svg\"\n                 viewBox=\"0 0 143.9 19.7\" width=\"175\" height=\"60\">\n                <path class=\"logo-letter\" d=\"M5.9,7.2h5.5v4.9H5.9v7.1H0v-19h12.1v5H5.9V7.2z\"/>\n                <path class=\"logo-letter\" d=\"M26.5,19.2h-5.7v-1.5h-0.1c-0.3,0.5-0.8,0.9-1.5,1.3c-0.7,0.4-1.4,0.5-2.3,0.5c-0.9,0-1.7-0.2-2.3-0.5\n          c-0.6-0.3-1.1-0.8-1.5-1.3c-0.4-0.5-0.6-1.1-0.8-1.8c-0.1-0.7-0.2-1.3-0.2-2V5.9H18V13c0,0.7,0.1,1.2,0.3,1.4c0.2,0.3,0.5,0.4,1,0.4\n          c0.4,0,0.7-0.2,1-0.5c0.2-0.3,0.4-0.8,0.4-1.4V5.9h5.9V19.2z\"/>\n                <path class=\"logo-letter\" d=\"M27.7,1.1l6-1v19.2h-6V1.1z\"/>\n                <path class=\"logo-letter\" d=\"M34.8,1l6-1v19.2h-6V1z\"/>\n                <path class=\"logo-letter\" d=\"M52.7,14.9c0,0.9-0.2,1.6-0.6,2.3c-0.4,0.6-0.9,1.1-1.4,1.5c-0.6,0.4-1.2,0.6-1.9,0.8\n          c-0.7,0.2-1.3,0.2-2,0.2c-1.2,0-2.3-0.2-3.4-0.5c-1.1-0.3-2.1-0.8-2.9-1.4l2.9-3.3c0.4,0.4,0.9,0.7,1.4,0.9c0.5,0.2,1.1,0.3,1.6,0.3\n          c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.3-0.4c0-0.2-0.2-0.4-0.5-0.5c-0.3-0.1-0.9-0.3-1.6-0.5c-0.4-0.1-0.9-0.2-1.3-0.4\n          c-0.4-0.2-0.8-0.5-1.2-0.8c-0.4-0.3-0.7-0.7-0.9-1.2c-0.2-0.5-0.4-1-0.4-1.7c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.4-1.5\n          c0.6-0.4,1.2-0.7,1.9-0.8c0.7-0.2,1.3-0.3,1.9-0.3c1,0,2.1,0.2,3.1,0.5c1,0.3,1.9,0.7,2.7,1.3l-2.7,3.3c-0.4-0.3-0.9-0.5-1.3-0.6\n          c-0.4-0.2-0.9-0.2-1.3-0.2c-0.3,0-0.5,0-0.7,0.1c-0.2,0.1-0.3,0.2-0.3,0.4c0,0.2,0.1,0.3,0.3,0.4c0.2,0.1,0.7,0.2,1.5,0.4\n          c0.5,0.1,1,0.3,1.5,0.5c0.5,0.2,0.9,0.5,1.3,0.8c0.4,0.3,0.7,0.7,0.9,1.2C52.5,13.7,52.7,14.3,52.7,14.9z\"/>\n                <path class=\"logo-letter\" d=\"M59.3,19.5c-1.8,0-3.1-0.4-4-1.2c-0.9-0.8-1.3-2-1.3-3.6V10h-1.9V5.8H54v-3h5.7v3h2.9V10h-2.9v3.6\n          c0,0.6,0.1,1.1,0.4,1.3c0.3,0.2,0.7,0.3,1.2,0.3c0.2,0,0.4,0,0.6-0.1c0.2,0,0.4-0.1,0.5-0.1v4c-0.3,0.1-0.7,0.2-1.3,0.3\n          C60.5,19.5,59.9,19.5,59.3,19.5z\"/>\n                <path class=\"logo-letter\" d=\"M70,10.7c0-0.4-0.1-0.7-0.4-0.9c-0.3-0.2-0.6-0.3-1.1-0.3c-0.5,0-1.1,0.1-1.5,0.3c-0.5,0.2-0.9,0.5-1.3,0.8\n          l-2.9-2.9C63.5,7,64.5,6.4,65.6,6c1.1-0.4,2.3-0.6,3.5-0.6c1.3,0,2.3,0.2,3.1,0.5c0.8,0.4,1.5,0.8,2,1.5c0.5,0.6,0.8,1.4,1,2.2\n          c0.2,0.8,0.3,1.7,0.3,2.6v7h-5.3v-1.1h-0.1c-0.3,0.5-0.8,0.9-1.4,1.1c-0.6,0.2-1.2,0.3-1.8,0.3c-0.5,0-1.1-0.1-1.6-0.2\n          s-1-0.4-1.5-0.7c-0.4-0.3-0.8-0.8-1.1-1.3c-0.3-0.5-0.4-1.2-0.4-2c0-0.9,0.2-1.7,0.7-2.3s1.1-1,1.8-1.4c0.7-0.3,1.6-0.6,2.5-0.7\n          C68.2,10.8,69.1,10.8,70,10.7L70,10.7z M70,13.7c-0.9,0-1.6,0.1-2.1,0.3c-0.5,0.2-0.8,0.5-0.8,1c0,0.2,0,0.3,0.1,0.5\n          c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.3,0.1,0.4,0.2c0.2,0,0.3,0.1,0.4,0.1c0.6,0,1-0.2,1.3-0.5c0.3-0.4,0.5-0.8,0.5-1.4v-0.5H70z\"/>\n                <path class=\"logo-letter\" d=\"M83.1,19.7c-1.1,0-2.2-0.2-3.1-0.5c-0.9-0.3-1.8-0.8-2.5-1.4c-0.7-0.6-1.2-1.4-1.6-2.3\n          c-0.4-0.9-0.6-1.9-0.6-3c0-1.1,0.2-2.1,0.6-3c0.4-0.9,1-1.6,1.7-2.3c0.7-0.6,1.5-1.1,2.5-1.4c1-0.3,2-0.5,3.1-0.5\n          c0.5,0,0.9,0,1.4,0.1c0.5,0.1,0.9,0.2,1.3,0.3c0.4,0.1,0.8,0.3,1.2,0.5c0.4,0.2,0.7,0.4,0.9,0.6L85.1,11c-0.2-0.2-0.5-0.4-0.8-0.5\n          c-0.3-0.1-0.6-0.2-1-0.2c-0.3,0-0.6,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.7,0.4c-0.2,0.2-0.4,0.4-0.5,0.7c-0.1,0.3-0.2,0.6-0.2,1\n          c0,0.4,0.1,0.7,0.2,1c0.1,0.3,0.3,0.5,0.5,0.7c0.2,0.2,0.5,0.3,0.7,0.4c0.3,0.1,0.5,0.1,0.8,0.1c0.3,0,0.7-0.1,1-0.2\n          c0.3-0.1,0.6-0.3,0.8-0.5l2.9,4.1c-0.6,0.4-1.3,0.8-2.2,1.1C85,19.5,84.1,19.7,83.1,19.7z\"/>\n                <path class=\"logo-letter\"\n                      d=\"M93.6,13.4v5.8h-5.9V1l5.9-1v10.9h0.1l3.2-5.1h6.8l-4.3,6l4.3,7.3h-6.8L93.6,13.4L93.6,13.4z\"/>\n                <path class=\"logo-letter\" d=\"M115.8,12.6c0,0.2,0,0.4,0,0.7c0,0.2,0,0.4,0,0.6h-9c0,0.2,0.1,0.4,0.2,0.6c0.1,0.2,0.3,0.3,0.5,0.5\n          c0.2,0.1,0.4,0.2,0.7,0.3c0.3,0.1,0.5,0.1,0.8,0.1c0.5,0,1-0.1,1.4-0.3c0.4-0.2,0.6-0.4,0.8-0.6l4.2,2.1c-0.6,1-1.5,1.7-2.6,2.3\n          c-1.1,0.6-2.4,0.8-3.9,0.8c-1,0-1.9-0.2-2.8-0.5c-0.9-0.3-1.7-0.8-2.4-1.4c-0.7-0.6-1.3-1.3-1.7-2.2c-0.4-0.9-0.6-1.9-0.6-3.1\n          c0-1.1,0.2-2.1,0.6-3c0.4-0.9,0.9-1.6,1.6-2.3c0.7-0.6,1.5-1.1,2.4-1.4c0.9-0.3,1.9-0.5,2.9-0.5c1,0,2,0.2,2.9,0.5\n          c0.9,0.4,1.6,0.9,2.2,1.5c0.6,0.7,1.1,1.4,1.4,2.3C115.7,10.6,115.8,11.6,115.8,12.6z M110.8,10.7c0-0.5-0.2-0.9-0.5-1.2\n          c-0.3-0.3-0.8-0.5-1.4-0.5c-0.6,0-1.1,0.2-1.5,0.5c-0.4,0.4-0.6,0.7-0.6,1.1H110.8z\"/>\n                <path class=\"logo-letter\" d=\"M115.6,5.8h5.6v1.5h0.1c0.3-0.5,0.7-1,1.3-1.3c0.6-0.4,1.2-0.5,2-0.5c0.5,0,0.8,0,1.1,0.1l-0.5,5\n          c-0.2-0.1-0.4-0.1-0.6-0.1c-0.2,0-0.4,0-0.6,0c-0.8,0-1.4,0.2-1.8,0.7c-0.5,0.4-0.7,1-0.7,1.6v6.5h-5.9V5.8z\"/>\n                <path class=\"logo-letter\" d=\"M136.5,14.9c0,0.9-0.2,1.6-0.6,2.3c-0.4,0.6-0.9,1.1-1.4,1.5c-0.6,0.4-1.2,0.6-1.9,0.8\n          c-0.7,0.2-1.3,0.2-2,0.2c-1.2,0-2.3-0.2-3.4-0.5c-1.1-0.3-2.1-0.8-2.9-1.4l2.9-3.3c0.4,0.4,0.9,0.7,1.4,0.9c0.5,0.2,1.1,0.3,1.6,0.3\n          c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.3-0.4c0-0.2-0.2-0.4-0.5-0.5c-0.3-0.1-0.9-0.3-1.6-0.5c-0.4-0.1-0.9-0.2-1.3-0.4\n          c-0.4-0.2-0.8-0.5-1.2-0.8c-0.4-0.3-0.7-0.7-0.9-1.2c-0.2-0.5-0.4-1-0.4-1.7c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.4-1.5\n          c0.6-0.4,1.2-0.7,1.9-0.8c0.7-0.2,1.3-0.3,1.9-0.3c1,0,2.1,0.2,3.1,0.5c1,0.3,1.9,0.7,2.7,1.3l-2.7,3.3c-0.4-0.3-0.9-0.5-1.3-0.6\n          c-0.4-0.2-0.9-0.2-1.3-0.2c-0.3,0-0.5,0-0.7,0.1s-0.3,0.2-0.3,0.4c0,0.2,0.1,0.3,0.3,0.4c0.2,0.1,0.7,0.2,1.5,0.4\n          c0.5,0.1,1,0.3,1.5,0.5c0.5,0.2,0.9,0.5,1.3,0.8c0.4,0.3,0.7,0.7,0.9,1.2C136.4,13.7,136.5,14.3,136.5,14.9z\"/>\n                <path class=\"logo-period\" d=\"M137.2,16.3c0-0.5,0.1-0.9,0.3-1.3c0.2-0.4,0.4-0.7,0.7-1c0.3-0.3,0.7-0.5,1.1-0.7c0.4-0.2,0.8-0.3,1.3-0.3\n          c0.4,0,0.9,0.1,1.3,0.3c0.4,0.2,0.7,0.4,1.1,0.7c0.3,0.3,0.5,0.6,0.7,1c0.2,0.4,0.3,0.8,0.3,1.3c0,0.5-0.1,0.9-0.3,1.3\n          c-0.2,0.4-0.4,0.8-0.7,1c-0.3,0.3-0.7,0.5-1.1,0.7c-0.4,0.2-0.8,0.3-1.3,0.3c-0.5,0-0.9-0.1-1.3-0.3c-0.4-0.2-0.8-0.4-1.1-0.7\n          c-0.3-0.3-0.6-0.6-0.7-1C137.3,17.2,137.2,16.8,137.2,16.3z\"/>\n            </svg>\n        </a>\n\n        <button type=\"button\" class=\"nav-toggle d-lg-none\" [class.active]=\"!isCollapsed\"\n                (click)=\"toggleCollapse(false)\">\n            <div class=\"nav-toggle-bar\" aria-hidden=\"true\"></div>\n            <div class=\"nav-toggle-bar\" aria-hidden=\"true\"></div>\n            <div class=\"nav-toggle-bar\" aria-hidden=\"true\"></div>\n        </button>\n\n        <nav class=\"nav d-lg-block\"\n\n             [ngClass]=\"{'d-md-none': !isCollapsed, 'd-sm-block': !isCollapsed, 'is-visible':!isCollapsed, 'is-hidden': isCollapsed}\"\n        >\n            <ul class=\"nav-list\">\n                <!--                <li class=\"nav-item\"><a class=\"nav-link\" pageScroll href=\"#why-section\"-->\n                <!--                                        routerLink=\"/\" fragment=\"why-section\"-->\n                <!--                                        (click)=\"toggleCollapse(true)\">About</a></li>-->\n\n                <li class=\"nav-item\"><a class=\"nav-link\" pageScroll href=\"#skills-section\"\n                                        routerLink=\"/\" fragment=\"skills-section\"\n\n                                        (click)=\"toggleCollapse(true)\">Skills</a></li>\n                <!--                <li class=\"nav-item\"><a class=\"nav-link\" pageScroll href=\"#stack-section\" (click)=\"toggleCollapse(true)\"-->\n\n                <!--                                        routerLink=\"/\" fragment=\"stack-section\"-->\n                <!--                >Technology</a>-->\n                <!--                </li>-->\n\n<!--                <li class=\"nav-item\"><a class=\"nav-link\" (click)=\"toggleCollapse(true)\" routerLink=\"/portfolio\"-->\n<!--                                        pageScroll-->\n<!--                                        href=\"#portfolio\"-->\n<!--                >Portfolio</a></li>-->\n\n                <li class=\"nav-item\"><a class=\"nav-link\" (click)=\"toggleCollapse(true)\" routerLink=\"/showcase\"\n                                        pageScroll\n                                        href=\"#showcase\"\n                >Showcase</a></li>\n\n                <li class=\"nav-item\"><a class=\"nav-link\" pageScroll href=\"#contact-section\"\n                                        (click)=\"toggleCollapse(true)\"\n                                        routerLink=\"/\" fragment=\"contact-section\"\n                >Let&rsquo;s\n                    talk</a></li>\n\n\n            </ul>\n        </nav>\n    </div>\n\n</header>\n"

/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.scss":
/*!**************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  NAV MENU  ***/\n/****************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** nav menu vars ***/\n/*********************/\n/*** navigation styles ***/\n/*************************/\n.header {\n  position: relative; }\n.header-bar {\n  align-items: center;\n  background-color: rgba(0, 174, 239, 0.95);\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  min-height: 60px;\n  position: fixed;\n  width: 100%;\n  z-index: 70; }\n.logo-link {\n  flex: 0 1 auto;\n  margin: 0 0 0 30px; }\n.logo {\n  display: block; }\n.logo-letter,\n.logo-period {\n  fill: white; }\n.nav-toggle {\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  flex: 0 0 30px;\n  float: none;\n  margin: 0 30px 0 0;\n  padding: 0; }\n.nav-toggle.active .nav-toggle-bar:nth-child(1) {\n    -webkit-transform: translateY(10px) rotate(45deg);\n            transform: translateY(10px) rotate(45deg);\n    transition: -webkit-transform .1s ease-in;\n    transition: transform .1s ease-in;\n    transition: transform .1s ease-in, -webkit-transform .1s ease-in; }\n.nav-toggle.active .nav-toggle-bar:nth-child(2) {\n    opacity: 0;\n    transition: opacity .1s ease-in; }\n.nav-toggle.active .nav-toggle-bar:nth-child(3) {\n    -webkit-transform: translateY(-10px) rotate(-45deg);\n            transform: translateY(-10px) rotate(-45deg);\n    transition: -webkit-transform .1s ease-in;\n    transition: transform .1s ease-in;\n    transition: transform .1s ease-in, -webkit-transform .1s ease-in; }\n.nav-toggle-bar {\n  background-color: white;\n  height: 4px;\n  margin: 0 0 6px 0;\n  width: inherit; }\n.nav-toggle-bar:last-child {\n    margin: 0; }\n.nav-toggle-bar:nth-child(1), .nav-toggle-bar:nth-child(2), .nav-toggle-bar:nth-child(3) {\n    transition: -webkit-transform .1s ease-in;\n    transition: transform .1s ease-in;\n    transition: transform .1s ease-in, -webkit-transform .1s ease-in; }\n.nav {\n  flex: 1 0 100%;\n  padding: 0 30px; }\n@media (min-width: 992px) {\n    .nav {\n      flex: 0 1 auto; } }\n.nav.is-visible {\n    display: block !important; }\n.nav.is-hidden {\n    display: none; }\n@media (min-width: 992px) {\n  .nav-list {\n    display: flex;\n    justify-content: space-between; } }\n@media (min-width: 992px) {\n  .nav-item {\n    flex: 1 0 auto;\n    margin: 0 30px 0 0;\n    padding-top: 30px; }\n    .nav-item:last-child {\n      margin-right: 0; } }\n.nav-link {\n  color: white;\n  display: block;\n  font-weight: 900;\n  padding: 15px 0px;\n  text-decoration: none;\n  text-transform: uppercase;\n  font-size: 16px; }\n.nav-link:hover {\n    color: white; }\n.hero {\n  background-image: url(\"/img/cbus.jpg\");\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  color: white;\n  font-size: 1rem;\n  padding: 140px 0 80px 0;\n  position: relative;\n  overflow: hidden; }\n.hero:after {\n    content: '';\n    display: block;\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    top: 0;\n    left: 0;\n    background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px); }\n@media (min-width: 992px) {\n    .hero {\n      height: 100vh;\n      padding: 0;\n      position: relative; } }\n.hero-title {\n  font-size: 3em;\n  font-weight: 900;\n  margin: 0 auto 30px auto;\n  max-width: 400px;\n  text-align: center;\n  text-transform: uppercase;\n  position: relative;\n  z-index: 50; }\n@media (min-width: 768px) {\n    .hero-title {\n      font-size: 4.5em;\n      max-width: 600px; } }\n@media (min-width: 992px) {\n    .hero-title {\n      font-size: 5.625em;\n      margin: 0;\n      max-width: initial;\n      width: 900px; }\n      .hero-title--centered-large {\n        position: absolute;\n        left: 50%;\n        top: calc(50% + 60px);\n        -webkit-transform: translate(-50%, calc(-1 * (50% + 60px)));\n                transform: translate(-50%, calc(-1 * (50% + 60px)));\n        z-index: 50; } }\n@media (min-width: 1200px) {\n    .hero-title {\n      font-size: 7.5em;\n      width: 1000px; } }\n.hero-subtitle {\n  display: block;\n  font-size: 1.375em;\n  font-weight: 600;\n  text-align: center;\n  position: relative;\n  z-index: 50; }\n@media (min-width: 992px) {\n    .hero-subtitle {\n      font-size: 1.875em;\n      margin: 60px 0 0 0; } }\n.hero-subtitle::before {\n    content: '\\007B'; }\n.hero-subtitle:after {\n    content: '\\007D'; }\n.hero-indicator {\n  -webkit-animation: indicator-bounce 2s cubic-bezier(0, 0.5, 0, 0.5);\n          animation: indicator-bounce 2s cubic-bezier(0, 0.5, 0, 0.5);\n  -webkit-animation-delay: 4s;\n          animation-delay: 4s;\n  -webkit-animation-iteration-count: 2;\n          animation-iteration-count: 2;\n  bottom: 10px;\n  height: 25px;\n  left: 50%;\n  position: absolute;\n  z-index: 50;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 25px; }\n@media (min-width: 992px) {\n    .hero-indicator {\n      height: auto;\n      width: auto; } }\n.hero-indicator-icon {\n    fill: white;\n    height: auto;\n    width: 100%; }\n@media (min-width: 992px) {\n      .hero-indicator-icon {\n        width: auto; } }\n.hero-image-attribution {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  padding: 5px;\n  font-size: 0.7em;\n  z-index: 50; }\n.hero-image-attribution a,\n  .hero-image-attribution a:focus,\n  .hero-image-attribution a:hover {\n    color: white; }\n@-webkit-keyframes indicator-bounce {\n  5% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); }\n  25% {\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0); }\n  30% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); } }\n@keyframes indicator-bounce {\n  5% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); }\n  25% {\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0); }\n  30% {\n    -webkit-transform: translate(-50%, 10px);\n            transform: translate(-50%, 10px); } }\n"

/***/ }),

/***/ "./src/app/nav-menu/nav-menu.component.ts":
/*!************************************************!*\
  !*** ./src/app/nav-menu/nav-menu.component.ts ***!
  \************************************************/
/*! exports provided: NavMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavMenuComponent", function() { return NavMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent() {
        this.isCollapsed = true;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        //console.log('Hello Home');
    };
    NavMenuComponent.prototype.toggleCollapse = function (showOpen) {
        if (showOpen) {
            this.isCollapsed = true;
        }
        else {
            this.isCollapsed = !this.isCollapsed;
        }
    };
    NavMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'nav-menu',
            template: __webpack_require__(/*! ./nav-menu.component.html */ "./src/app/nav-menu/nav-menu.component.html"),
            styles: [__webpack_require__(/*! ./nav-menu.component.scss */ "./src/app/nav-menu/nav-menu.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NavMenuComponent);
    return NavMenuComponent;
}());



/***/ }),

/***/ "./src/app/not-found/not-found.component.html":
/*!****************************************************!*\
  !*** ./src/app/not-found/not-found.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"not-found content-section\">\n    <h1>Page not found</h1>\n\n    <div>\n\n        Please visit our home <a class=\"logo-link\" href=\"/\">page</a>\n\n\n    </div>\n\n</section>\n\n\n<contact></contact>"

/***/ }),

/***/ "./src/app/not-found/not-found.component.scss":
/*!****************************************************!*\
  !*** ./src/app/not-found/not-found.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n.not-found {\n  padding-top: 150px;\n  min-height: 400px;\n  color: #00aeef;\n  font-weight: 900;\n  margin: 0 auto 30px auto;\n  width: 100vw;\n  text-align: center;\n  position: relative;\n  z-index: 50;\n  font-size: 2em; }\n.not-found h1 {\n    padding-bottom: 40px; }\n@media (min-width: 768px) {\n      .not-found h1 {\n        font-size: 2em; } }\n@media (min-width: 992px) {\n      .not-found h1 {\n        font-size: 3em;\n        margin: 0; } }\n@media (min-width: 1200px) {\n      .not-found h1 {\n        font-size: 4em; } }\n"

/***/ }),

/***/ "./src/app/not-found/not-found.component.ts":
/*!**************************************************!*\
  !*** ./src/app/not-found/not-found.component.ts ***!
  \**************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'not-found',
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.scss */ "./src/app/not-found/not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/pipes/breaker/breaker.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/pipes/breaker/breaker.pipe.ts ***!
  \***********************************************/
/*! exports provided: BreakerPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakerPipe", function() { return BreakerPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BreakerPipe = /** @class */ (function () {
    function BreakerPipe() {
    }
    BreakerPipe.prototype.transform = function (value) {
        var parts = value.split(' ');
        if (parts.length > 1) {
            return parts[0] + '<br>' + parts[1];
        }
        else {
            return parts[0] + '<br>';
        }
    };
    BreakerPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'myTitleBreaker' })
    ], BreakerPipe);
    return BreakerPipe;
}());



/***/ }),

/***/ "./src/app/portfolio/portfolio.component.html":
/*!****************************************************!*\
  !*** ./src/app/portfolio/portfolio.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"home\" class=\"portfolio\" id=\"portfolio\">\n    <hero\n            [title]=\"'Portfolio'\"\n            [subtitle]=\"'Here is some of our work'\"\n            [showAttribution]=\"false\"\n            [bg]=\"'/assets/img/background-image2.png'\">\n    </hero>\n</div>\n\n<div class=\"portfolio-wrapper\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-4 col-sm-6\" *ngFor=\"let work of works\">\n                <div class=\"card\">\n<!--                    <img class=\"card-img-top\" src=\"{{work.image}}\">-->\n                    <div class=\"card-body\">\n                        <div class=\"card-title\">\n\n<!--                            <a *ngIf=\"work.link\" href=\"{{work.link}}\" target=\"_new\">-->\n<!--                                <h4>{{work.title}}-->\n<!--                                    <i class=\"fa fa-external-link card-title-link\" aria-hidden=\"true\"></i>-->\n<!--                                </h4>-->\n<!--                            </a>-->\n\n\n                            <h4>{{work.title}}</h4>\n\n\n                        </div>\n\n\n                        <p class=\"card-text\">{{work.description}}\n\n                            <a *ngIf=\"work.route\" [routerLink]=\"work.route\" [fragment]=\"work.fragment\">\n                                <i class=\"fa fa-link\" aria-hidden=\"true\"></i>\n\n                            </a>\n                        </p>\n\n\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<contact></contact>\n"

/***/ }),

/***/ "./src/app/portfolio/portfolio.component.scss":
/*!****************************************************!*\
  !*** ./src/app/portfolio/portfolio.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n.portfolio-wrapper {\n  background-color: #78d9fe;\n  padding-top: 50px;\n  padding-bottom: 50px; }\n.portfolio-wrapper h1 {\n    color: #f7f7f7;\n    font-size: 5em; }\n.portfolio-wrapper .card {\n    padding-top: 3em;\n    padding-bottom: 3em;\n    border-radius: 1em;\n    margin: 1em;\n    transition: ease;\n    transition-duration: 1000ms;\n    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -6px; }\n.portfolio-wrapper .card:hover {\n      box-shadow: rgba(0, 0, 0, 0.65) 0px 15px 20px -6px; }\n.portfolio-wrapper .card .fa {\n      font-size: 20px;\n      padding: 20px; }\n.portfolio-wrapper .card .card-img-top {\n      width: 98%;\n      height: auto;\n      border: 1px solid grey;\n      padding: 1%;\n      margin: 1%; }\n.portfolio-wrapper .card .card-body {\n      padding: 1em; }\n.portfolio-wrapper .card .card-title {\n      font-size: 2em;\n      padding-bottom: 20px; }\n.portfolio-wrapper .card .card-text {\n      font-size: 1.3em; }\n.portfolio-wrapper .card a {\n      font-size: 1.5em; }\n.portfolio-wrapper i.fa {\n    padding: 0; }\n"

/***/ }),

/***/ "./src/app/portfolio/portfolio.component.ts":
/*!**************************************************!*\
  !*** ./src/app/portfolio/portfolio.component.ts ***!
  \**************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent() {
        this.works = [
            // {
            //     title: 'Athletic Performance Insights',
            //     image: '/assets/img/APIlogo.png',
            //     description: "Sports data capture & analytics",
            //     fragment: "api"
            //
            // },
            // {
            //     title: 'ShutterHealth',
            //     image: '/assets/img/shutterhealth.png',
            //     description: "Remote health services",
            //
            // },
            //
            // {
            //     title: 'Super-H Index',
            //     image: '/assets/img/superh.png',
            //     link: "https://www.mavenview.com/",
            //     description: "Advanced data & visualization",
            //
            // },
            {
                title: 'MassMatrix',
                image: '/assets/img/mm.png',
                link: "http://www.massmatrix.bio",
                description: "Advanced protein quantification & visualization",
            },
            {
                title: 'InkLocker',
                image: '/assets/img/inklocker.png',
                link: "https://www.inklocker.com/",
                description: "Distributed printing systems",
            },
            {
                title: 'Help Me Startup',
                image: '/assets/img/hmsu.png',
                link: "https://www.helpmestartup.co/",
                description: "Startup & business development",
            },
            {
                title: 'Med-ComplianceIQ',
                image: '/assets/img/mciq.png',
                link: "http://medcomplianceiq.com/",
                description: "Wound image analytics",
                fragment: "mciq"
            },
            {
                title: 'Bail Bond Application',
                image: '/assets/img/bba.png',
                description: "Business Management Suite",
                fragment: "bba",
                link: "https://www.bailbondapplication.com"
            },
            {
                title: 'ARknet',
                description: "Augmented Reality Social Platform for mobile users",
                fragment: "ARknet",
                link: "https://www.bailbondapplication.com"
            },
            {
                title: 'LEMUR',
                description: "LEMUR is patent-pending medical software that provides “live” and “universal” interoperability of core medical data to various end-users",
                fragment: "LEMUR",
                link: "https://lemurpbc.org/"
            },
            {
                title: 'And many more...',
                description: "",
                fragment: "",
            },
        ];
    }
    PortfolioComponent.prototype.ngOnInit = function () {
        //console.log('Hello portfolio');
    };
    PortfolioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'portfolio',
            template: __webpack_require__(/*! ./portfolio.component.html */ "./src/app/portfolio/portfolio.component.html"),
            styles: [__webpack_require__(/*! ./portfolio.component.scss */ "./src/app/portfolio/portfolio.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PortfolioComponent);
    return PortfolioComponent;
}());



/***/ }),

/***/ "./src/app/privacy-policy/privacy-policy.component.html":
/*!**************************************************************!*\
  !*** ./src/app/privacy-policy/privacy-policy.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div id=\"home\" class=\"portfolio\" id=\"portfolio\">\n        <hero\n                [title]=\"'Privacy Policy'\"\n                [subtitle]=\"'Last updated: July 26, 2022'\"\n                [showAttribution]=\"false\"\n                [bg]=\"'/assets/img/background-image3.png'\">\n        </hero>\n    </div>\n    <section id=\"privacy-policy-section\" class=\"privacy-policy-section\">\n\n\n        <div>\n            <h1>Privacy Policy</h1>\n            <p>Last updated: July 26, 2022</p>\n            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your\n                information when You use the Service and tells You about Your privacy rights and how the law protects\n                You.</p>\n            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the\n                collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been\n                created with the help of the <a href=\"https://www.freeprivacypolicy.com/free-privacy-policy-generator/\"\n                                                target=\"_blank\">Free Privacy Policy Generator</a>.</p>\n            <h1>Interpretation and Definitions</h1>\n            <h2>Interpretation</h2>\n            <p>The words of which the initial letter is capitalized have meanings defined under the following\n                conditions.\n                The following definitions shall have the same meaning regardless of whether they appear in singular or\n                in\n                plural.</p>\n            <h2>Definitions</h2>\n            <p>For the purposes of this Privacy Policy:</p>\n            <ul>\n                <li>\n                    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of\n                        our\n                        Service.</p>\n                </li>\n                <li>\n                    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;\n                        or &quot;Our&quot; in this Agreement) refers to Fullstackers LLC, 5256 Bethel Reed Park Ste #3,\n                        Columbus, OH, 43220.</p>\n                </li>\n                <li>\n                    <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any\n                        other\n                        device by a website, containing the details of Your browsing history on that website among its\n                        many\n                        uses.</p>\n                </li>\n                <li>\n                    <p><strong>Country</strong> refers to: Ohio, United States</p>\n                </li>\n                <li>\n                    <p><strong>Device</strong> means any device that can access the Service such as a computer, a\n                        cellphone\n                        or a digital tablet.</p>\n                </li>\n                <li>\n                    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable\n                        individual.</p>\n                </li>\n                <li>\n                    <p><strong>Service</strong> refers to the Website.</p>\n                </li>\n                <li>\n                    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on\n                        behalf\n                        of the Company. It refers to third-party companies or individuals employed by the Company to\n                        facilitate the Service, to provide the Service on behalf of the Company, to perform services\n                        related\n                        to the Service or to assist the Company in analyzing how the Service is used.</p>\n                </li>\n                <li>\n                    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use\n                        of\n                        the Service or from the Service infrastructure itself (for example, the duration of a page\n                        visit).\n                    </p>\n                </li>\n                <li>\n                    <p><strong>Website</strong> refers to Fullstackers, accessible from <a\n                            href=\"https://fullstackers.com/\"\n                            rel=\"external nofollow noopener\"\n                            target=\"_blank\">https://fullstackers.com/</a>\n                    </p>\n                </li>\n                <li>\n                    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or\n                        other\n                        legal entity on behalf of which such individual is accessing or using the Service, as\n                        applicable.\n                    </p>\n                </li>\n            </ul>\n            <h1>Collecting and Using Your Personal Data</h1>\n            <h2>Types of Data Collected</h2>\n            <h3>Personal Data</h3>\n            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information\n                that\n                can be used to contact or identify You. Personally identifiable information may include, but is not\n                limited\n                to:</p>\n            <ul>\n                <li>\n                    <p>Email address</p>\n                </li>\n                <li>\n                    <p>Usage Data</p>\n                </li>\n            </ul>\n            <h3>Usage Data</h3>\n            <p>Usage Data is collected automatically when using the Service.</p>\n            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address),\n                browser\n                type, browser version, the pages of our Service that You visit, the time and date of Your visit, the\n                time\n                spent on those pages, unique device identifiers and other diagnostic data.</p>\n            <p>When You access the Service by or through a mobile device, We may collect certain information\n                automatically,\n                including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP\n                address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You\n                use,\n                unique device identifiers and other diagnostic data.</p>\n            <p>We may also collect information that Your browser sends whenever You visit our Service or when You access\n                the\n                Service by or through a mobile device.</p>\n            <h3>Tracking Technologies and Cookies</h3>\n            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain\n                information. Tracking technologies used are beacons, tags, and scripts to collect and track information\n                and\n                to improve and analyze Our Service. The technologies We use may include:</p>\n            <ul>\n                <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can\n                    instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if\n                    You\n                    do not accept Cookies, You may not be able to use some parts of our Service. Unless you have\n                    adjusted\n                    Your browser setting so that it will refuse Cookies, our Service may use Cookies.\n                </li>\n                <li><strong>Flash Cookies.</strong> Certain features of our Service may use local stored objects (or\n                    Flash\n                    Cookies) to collect and store information about Your preferences or Your activity on our Service.\n                    Flash\n                    Cookies are not managed by the same browser settings as those used for Browser Cookies. For more\n                    information on how You can delete Flash Cookies, please read &quot;Where can I change the settings\n                    for\n                    disabling, or deleting local shared objects?&quot; available at <a\n                            href=\"https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_\"\n                            rel=\"external nofollow noopener\" target=\"_blank\">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</a>\n                </li>\n                <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small\n                    electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel\n                    gifs) that permit the Company, for example, to count users who have visited those pages or opened an\n                    email and for other related website statistics (for example, recording the popularity of a certain\n                    section and verifying system and server integrity).\n                </li>\n            </ul>\n            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your\n                personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You\n                close Your web browser. Learn more about cookies on the <a\n                        href=\"https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking\"\n                        target=\"_blank\">Free Privacy Policy website</a> article.</p>\n            <p>We use both Session and Persistent Cookies for the purposes set out below:</p>\n            <ul>\n                <li>\n                    <p><strong>Necessary / Essential Cookies</strong></p>\n                    <p>Type: Session Cookies</p>\n                    <p>Administered by: Us</p>\n                    <p>Purpose: These Cookies are essential to provide You with services available through the Website\n                        and\n                        to enable You to use some of its features. They help to authenticate users and prevent\n                        fraudulent\n                        use of user accounts. Without these Cookies, the services that You have asked for cannot be\n                        provided, and We only use these Cookies to provide You with those services.</p>\n                </li>\n                <li>\n                    <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>\n                    <p>Type: Persistent Cookies</p>\n                    <p>Administered by: Us</p>\n                    <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>\n                </li>\n                <li>\n                    <p><strong>Functionality Cookies</strong></p>\n                    <p>Type: Persistent Cookies</p>\n                    <p>Administered by: Us</p>\n                    <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as\n                        remembering your login details or language preference. The purpose of these Cookies is to\n                        provide\n                        You with a more personal experience and to avoid You having to re-enter your preferences every\n                        time\n                        You use the Website.</p>\n                </li>\n            </ul>\n            <p>For more information about the cookies we use and your choices regarding cookies, please visit our\n                Cookies\n                Policy or the Cookies section of our Privacy Policy.</p>\n            <h2>Use of Your Personal Data</h2>\n            <p>The Company may use Personal Data for the following purposes:</p>\n            <ul>\n                <li>\n                    <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our\n                        Service.\n                    </p>\n                </li>\n                <li>\n                    <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.\n                        The\n                        Personal Data You provide can give You access to different functionalities of the Service that\n                        are\n                        available to You as a registered user.</p>\n                </li>\n                <li>\n                    <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking\n                        of\n                        the purchase contract for the products, items or services You have purchased or of any other\n                        contract with Us through the Service.</p>\n                </li>\n                <li>\n                    <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other\n                        equivalent\n                        forms of electronic communication, such as a mobile application's push notifications regarding\n                        updates or informative communications related to the functionalities, products or contracted\n                        services, including the security updates, when necessary or reasonable for their implementation.\n                    </p>\n                </li>\n                <li>\n                    <p><strong>To provide You</strong> with news, special offers and general information about other\n                        goods,\n                        services and events which we offer that are similar to those that you have already purchased or\n                        enquired about unless You have opted not to receive such information.</p>\n                </li>\n                <li>\n                    <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>\n                </li>\n                <li>\n                    <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a\n                        merger,\n                        divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or\n                        all of\n                        Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar\n                        proceeding,\n                        in which Personal Data held by Us about our Service users is among the assets transferred.</p>\n                </li>\n                <li>\n                    <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data\n                        analysis, identifying usage trends, determining the effectiveness of our promotional campaigns\n                        and\n                        to evaluate and improve our Service, products, services, marketing and your experience.</p>\n                </li>\n            </ul>\n            <p>We may share Your personal information in the following situations:</p>\n            <ul>\n                <li><strong>With Service Providers:</strong> We may share Your personal information with Service\n                    Providers\n                    to monitor and analyze the use of our Service, to contact You.\n                </li>\n                <li><strong>For business transfers:</strong> We may share or transfer Your personal information in\n                    connection with, or during negotiations of, any merger, sale of Company assets, financing, or\n                    acquisition of all or a portion of Our business to another company.\n                </li>\n                <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case\n                    we\n                    will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company\n                    and\n                    any other subsidiaries, joint venture partners or other companies that We control or that are under\n                    common control with Us.\n                </li>\n                <li><strong>With business partners:</strong> We may share Your information with Our business partners to\n                    offer You certain products, services or promotions.\n                </li>\n                <li><strong>With other users:</strong> when You share personal information or otherwise interact in the\n                    public areas with other users, such information may be viewed by all users and may be publicly\n                    distributed outside.\n                </li>\n                <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose\n                    with\n                    Your consent.\n                </li>\n            </ul>\n            <h2>Retention of Your Personal Data</h2>\n            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in\n                this\n                Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our\n                legal\n                obligations (for example, if we are required to retain your data to comply with applicable laws),\n                resolve\n                disputes, and enforce our legal agreements and policies.</p>\n            <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained\n                for\n                a shorter period of time, except when this data is used to strengthen the security or to improve the\n                functionality of Our Service, or We are legally obligated to retain this data for longer time\n                periods.</p>\n            <h2>Transfer of Your Personal Data</h2>\n            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any\n                other\n                places where the parties involved in the processing are located. It means that this information may be\n                transferred to — and maintained on — computers located outside of Your state, province, country or other\n                governmental jurisdiction where the data protection laws may differ than those from Your\n                jurisdiction.</p>\n            <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your\n                agreement\n                to that transfer.</p>\n            <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in\n                accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an\n                organization\n                or a country unless there are adequate controls in place including the security of Your data and other\n                personal information.</p>\n            <h2>Disclosure of Your Personal Data</h2>\n            <h3>Business Transactions</h3>\n            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred.\n                We\n                will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy\n                Policy.</p>\n            <h3>Law enforcement</h3>\n            <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do\n                so\n                by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>\n            <h3>Other legal requirements</h3>\n            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary\n                to:</p>\n            <ul>\n                <li>Comply with a legal obligation</li>\n                <li>Protect and defend the rights or property of the Company</li>\n                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>\n                <li>Protect the personal safety of Users of the Service or the public</li>\n                <li>Protect against legal liability</li>\n            </ul>\n            <h2>Security of Your Personal Data</h2>\n            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over\n                the\n                Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable\n                means to protect Your Personal Data, We cannot guarantee its absolute security.</p>\n            <h1>Children's Privacy</h1>\n            <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally\n                identifiable\n                information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your\n                child has provided Us with Personal Data, please contact Us. If We become aware that We have collected\n                Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to\n                remove that information from Our servers.</p>\n            <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires\n                consent from a parent, We may require Your parent's consent before We collect and use that\n                information.</p>\n            <h1>Links to Other Websites</h1>\n            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third\n                party\n                link, You will be directed to that third party's site. We strongly advise You to review the Privacy\n                Policy\n                of every site You visit.</p>\n            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of\n                any\n                third party sites or services.</p>\n            <h1>Changes to this Privacy Policy</h1>\n            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new\n                Privacy Policy on this page.</p>\n            <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming\n                effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>\n            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy\n                Policy\n                are effective when they are posted on this page.</p>\n\n\n        </div>\n\n\n    </section>\n    <contact></contact>\n</div>"

/***/ }),

/***/ "./src/app/privacy-policy/privacy-policy.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/privacy-policy/privacy-policy.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n.privacy-policy-section {\n  padding: 20px 10px; }\n@media (min-width: 768px) {\n    .privacy-policy-section {\n      padding: 200px 100px; } }\n"

/***/ }),

/***/ "./src/app/privacy-policy/privacy-policy.component.ts":
/*!************************************************************!*\
  !*** ./src/app/privacy-policy/privacy-policy.component.ts ***!
  \************************************************************/
/*! exports provided: PrivacyPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyPolicyComponent", function() { return PrivacyPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrivacyPolicyComponent = /** @class */ (function () {
    function PrivacyPolicyComponent() {
    }
    PrivacyPolicyComponent.prototype.ngOnInit = function () {
    };
    PrivacyPolicyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'privacy-policy',
            template: __webpack_require__(/*! ./privacy-policy.component.html */ "./src/app/privacy-policy/privacy-policy.component.html"),
            styles: [__webpack_require__(/*! ./privacy-policy.component.scss */ "./src/app/privacy-policy/privacy-policy.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrivacyPolicyComponent);
    return PrivacyPolicyComponent;
}());



/***/ }),

/***/ "./src/app/shared/api.service.ts":
/*!***************************************!*\
  !*** ./src/app/shared/api.service.ts ***!
  \***************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ApiService = /** @class */ (function () {
    function ApiService() {
        this.title = 'Angular 2';
    }
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/shared/index.ts":
/*!*********************************!*\
  !*** ./src/app/shared/index.ts ***!
  \*********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ "./src/app/shared/api.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return _api_service__WEBPACK_IMPORTED_MODULE_0__["ApiService"]; });




/***/ }),

/***/ "./src/app/showcase/showcase.component.html":
/*!**************************************************!*\
  !*** ./src/app/showcase/showcase.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"home\" class=\"showcase\" id=\"showcase\">\n    <hero\n            [title]=\"'Showcase'\"\n            [showAttribution]=\"false\"\n            [bg]=\"'/assets/img/background-image3.png'\">\n    </hero>\n</div>\n\n\n<section class=\"content-section\" *ngFor=\"let showcase of showcases\" id=\"{{showcase.slug}}\">\n    <h3 class=\"content-section-title\">\n        {{showcase.title}}\n    </h3>\n    <div class=\"content-section-description\">\n        <p> {{showcase.description}}</p>\n        <p *ngIf=\"showcase.role\">{{showcase.role}}</p>\n        <p *ngIf=\"showcase.technology\">{{showcase.technology}}</p>\n        <button *ngIf=\"showcase.url\" class=\"btn \" type=\"button\"><a href=\"{{showcase.url}}\"\n                                                                   target=\"_blank\">{{showcase.url}}</a></button>\n\n    </div>\n\n    <div class=\"content-section-body flex-two-col is-flex-rows\">\n\n        <ngb-carousel *ngIf=\"showcase.slides\" [showNavigationArrows]=\"false\">\n            <ng-template ngbSlide *ngFor=\"let slide of showcase.slides\">\n                <img [src]=\"slide.url\" class=\"img-fluid\">\n                <div class=\"carousel-caption\">\n                    <h3 *ngIf=\"slide.title\">{{slide.title}}</h3>\n                    <p *ngIf=\"slide.caption\">{{slide.caption}}</p>\n                </div>\n            </ng-template>\n\n        </ngb-carousel>\n\n    </div>\n</section>\n\n<blob></blob>\n\n<contact></contact>\n"

/***/ }),

/***/ "./src/app/showcase/showcase.component.scss":
/*!**************************************************!*\
  !*** ./src/app/showcase/showcase.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n@import url(\"//fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800,900\");\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/***  CONTENT SECTION  ***/\n/*************************/\n/*** globals ***/\n/***************/\n/***  COLORS  ***/\n/****************/\n/*** brand ***/\n/*************/\n/*** miscellaneous ***/\n/*********************/\n/***  FONTS  ***/\n/****************/\n/*** families ***/\n/****************/\n/*** families ***/\n/****************/\n/*** line height ***/\n/*******************/\n/***  BREAKPOINTS  ***/\n/*********************/\n/***  GUTTER  ***/\n/****************/\n/***  ZINDEX  ***/\n/****************/\n/*** content section vars ***/\n/****************************/\n/*** content section styles ***/\n/******************************/\n.content-section {\n  font-size: 15px;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section {\n      padding: 60px 90px; } }\n.content-section.why-section {\n    min-height: 50vh;\n    padding-top: 10vh;\n    background-color: #283891;\n    color: white; }\n.content-section.skills-section {\n    background-color: white;\n    color: #283891;\n    padding: 30px 90px 30px 90px;\n    padding: 150px;\n    padding-top: 10vh; }\n@media (max-width: 768px) {\n      .content-section.skills-section {\n        padding: 30px; } }\n@media (min-width: 768px) {\n      .content-section.skills-section {\n        padding: 60px 90px 0 90px; } }\n.content-section.stack-section {\n    background-color: #283891;\n    color: white; }\n.content-section.contact-section {\n    background-color: #00aeef;\n    color: white; }\n.content-section.contact-section a {\n      text-decoration: none; }\n.content-section.contact-section a:hover {\n        text-decoration: none; }\n@media (min-width: 768px) {\n      .content-section.contact-section {\n        padding: 60px 0 60px 0; } }\n.content-section.contact-section .content-section-subtitle {\n      color: #283891; }\n.content-section.contact-section a {\n      color: white; }\n.content-section.contact-section .contact-section-phone {\n      font-size: 1.5em;\n      font-weight: 700; }\n.content-section.contact-section .contact-section-email {\n      font-size: 1.5em; }\n.content-section-title {\n  font-size: 2.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section-title {\n      font-size: 3.125em; } }\n@media (min-width: 992px) {\n    .content-section-title {\n      font-size: 4.5em; } }\n@media (min-width: 1200px) {\n    .content-section-title {\n      font-size: 5em; } }\n.content-section-subtitle {\n  font-size: 1.25em;\n  font-weight: 900;\n  margin: 0 0 30px 0;\n  text-transform: uppercase; }\n.content-section-description p {\n  font-size: 1em;\n  line-height: calc(1em + 10px);\n  padding-bottom: 30px; }\n.content-section-description p:last-child {\n    margin: 0; }\n@media (min-width: 992px) {\n    .content-section-description p {\n      font-size: 1.25em; } }\n@media (min-width: 1200px) {\n    .content-section-description p {\n      margin-left: auto;\n      margin-right: auto;\n      max-width: 600px; }\n      .content-section-description p:last-child {\n        margin-left: auto;\n        margin-right: auto;\n        margin-bottom: 0; } }\n@media (min-width: 768px) {\n  .content-section-description {\n    margin: 0 auto;\n    width: 66.66666667%; } }\n@media (min-width: 992px) {\n  .content-section-description {\n    width: 75%; } }\n.content-section-body {\n  margin: 30px 0 0 0; }\n@media (min-width: 768px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: 315px; } }\n@media (min-width: 992px) {\n    .content-section-body .is-flex-cols {\n      display: flex;\n      flex-direction: column;\n      flex-wrap: wrap;\n      width: 100%; }\n      .content-section-body .is-flex-cols.is-contact {\n        height: auto;\n        width: 40%; }\n        .content-section-body .is-flex-cols.is-contact .content-section-body-subsection {\n          width: 100%; } }\n@media (min-width: 1200px) {\n    .content-section-body .is-flex-cols.is-contact {\n      height: 425px;\n      width: 50%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(1), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(2) {\n        width: 60%; }\n      .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(3), .content-section-body .is-flex-cols.is-contact .content-section-body-subsection:nth-child(4) {\n        width: 40%; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-rows {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: center; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-skills {\n      margin: 15px 0 0 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-rows.is-skills {\n      background-color: #f7f7f7;\n      margin: 45px -90px 0 -90px; } }\n@media (min-width: 768px) {\n    .content-section-body.flex-two-col.is-flex-cols {\n      display: flex;\n      flex-wrap: wrap;\n      flex-direction: column; }\n      .content-section-body.flex-two-col.is-flex-cols.is-contact {\n        height: 250px; } }\n@media (min-width: 992px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 1100px;\n      margin-bottom: 0; }\n    .content-section-body.flex-two-col.is-flex-cols.is-contact {\n      margin-bottom: 0; } }\n@media (min-width: 1200px) {\n    .content-section-body.flex-two-col.is-flex-cols.is-stack {\n      height: 575px; } }\n.content-section-body-subsection {\n  margin: 0 0 30px 0;\n  text-align: left; }\n.content-section-body-subsection.is-full-column {\n    width: 100%; }\n@media (min-width: 768px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: 100%; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--small {\n        width: auto; } }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: 100%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--medium {\n        width: auto; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-full-column--large {\n        width: 100%; } }\n.content-section-body-subsection.is-60-column {\n    width: 60%; }\n@media (min-width: 992px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: 60%; } }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-60-column--medium {\n        width: auto; } }\n.content-section-body-subsection.is-50-column {\n    width: 50%; }\n@media (min-width: 1200px) {\n      .content-section-body-subsection.is-50-column--large {\n        width: 50%; } }\n@media (min-width: 768px) {\n    .content-section-body-subsection {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 30px 0 0 0;\n      width: 50%; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      font-size: 1.125em;\n      margin-bottom: 30px; }\n      .content-section-body-subsection.is-adjusted {\n        width: auto;\n        text-align: center; } }\n@media (min-width: 992px) {\n    .content-section-body-subsection {\n      margin-bottom: 0; } }\n.service {\n  margin: 0 0 30px 0;\n  position: relative; }\n.service:nth-child(1) .service-title {\n    color: #283891;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(2) .service-title {\n    color: #00aeef;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(3) .service-title {\n    color: #cf4a2f;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(4) .service-title {\n    color: #72933d;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(5) .service-title {\n    color: #964374;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(6) .service-title {\n    color: #a0a59e;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(7) .service-title {\n    color: #213e41;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:nth-child(8) .service-title {\n    color: #71362c;\n    min-height: 50px;\n    padding-top: 10px; }\n.service:last-child {\n    margin: 0; }\n.service::after {\n    -webkit-clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(76% 100%, 100% 100%, 100% 100%, 0 100%);\n    content: '';\n    display: block;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 10; }\n.service:hover:after {\n    -webkit-animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n            animation: reveal-service 0.5s cubic-bezier(0.11, 0.82, 0.84, 0.35);\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    background: #00aeef; }\n.service:hover .service-title,\n  .service:hover .service-item {\n    -webkit-animation: text-to-white .3s ease-in;\n            animation: text-to-white .3s ease-in;\n    -webkit-animation-delay: .25s;\n            animation-delay: .25s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n@-webkit-keyframes text-to-white {\n  100% {\n    color: white; } }\n@keyframes text-to-white {\n  100% {\n    color: white; } }\n@-webkit-keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@keyframes reveal-service {\n  33% {\n    -webkit-clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 100%, 100% 100%, 0 100%); }\n  66% {\n    -webkit-clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(78% 76%, 100% 0, 100% 100%, 0 100%); }\n  100% {\n    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n@media (min-width: 768px) {\n    .service {\n      flex: 0 1 40%;\n      margin: 0;\n      padding: 30px 0 60px 0; } }\n@media (min-width: 992px) {\n    .service {\n      flex: 0 1 33.333333%;\n      min-height: 305px; } }\n@media (min-width: 1200px) {\n    .service {\n      flex: 0 1 25%;\n      min-height: 335px;\n      padding: 60px 0 60px 0; } }\n.service-title {\n  font-weight: 900;\n  position: relative;\n  text-transform: uppercase;\n  z-index: 20; }\n@media (min-width: 768px) {\n    .service-title {\n      margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n    .service-title {\n      font-size: 1.75em; } }\n.service-list {\n  position: relative;\n  z-index: 20; }\n.service-item {\n  color: #999999;\n  line-height: calc(1em + 10px); }\n@media (min-width: 992px) {\n    .service-item {\n      font-size: 1.125em; } }\n.skillset {\n  margin: 0 0 30px 0;\n  display: block; }\n.skillset .skillset-list {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-content: center;\n    align-items: center;\n    justify-content: center;\n    padding-bottom: 30px; }\n.skillset .skillset-title {\n    font-weight: 900;\n    position: relative;\n    text-transform: uppercase;\n    z-index: 20; }\n@media (min-width: 768px) {\n      .skillset .skillset-title {\n        margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n      .skillset .skillset-title {\n        font-size: 1.75em; } }\n.skillset .skillset-item {\n    min-width: 100px;\n    color: #999999;\n    line-height: calc(1em + 10px);\n    padding: 15px;\n    margin: 7.5px;\n    border-radius: 30px;\n    border: 1px solid #999999;\n    transition: ease;\n    transition-duration: 1000ms;\n    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -6px; }\n@media (min-width: 992px) {\n      .skillset .skillset-item {\n        font-size: 1.125em; } }\n.skillset .skillset-item:hover {\n      box-shadow: rgba(0, 0, 0, 0.65) 0px 15px 20px -6px; }\n.service-title {\n  font-weight: 900;\n  position: relative;\n  text-transform: uppercase;\n  z-index: 20; }\n@media (min-width: 768px) {\n    .service-title {\n      margin: 0 0 15px 0; } }\n@media (min-width: 992px) {\n    .service-title {\n      font-size: 1.75em; } }\n.service-list {\n  position: relative;\n  z-index: 20; }\n.service-item {\n  color: #999999;\n  line-height: calc(1em + 10px); }\n@media (min-width: 992px) {\n    .service-item {\n      font-size: 1.125em; } }\n.stack {\n  margin: 0 0 15px 0; }\n.stack:last-child {\n    margin: 0; }\n@media (min-width: 768px) {\n    .stack {\n      flex: 1 1 auto;\n      margin: 0;\n      padding: 15px 0 0 0; } }\n@media (min-width: 992px) {\n    .stack {\n      padding: 30px 0 0 0; } }\n.stack-title {\n  color: #00aeef;\n  font-weight: 700; }\n@media (min-width: 768px) {\n    .stack-title {\n      font-size: 1.75em;\n      margin: 0 0 15px 0; } }\n.stack-item {\n  line-height: calc(1em + 20px); }\n.stack-item a {\n    color: white; }\n@media (min-width: 992px) {\n    .stack-item {\n      font-size: 1.125em; } }\n.contact-form {\n  font-size: 1em; }\n.contact-form-label {\n    color: #78d9fe;\n    display: block;\n    margin: 0;\n    text-transform: uppercase; }\n.contact-form-input {\n    background-color: transparent;\n    border-top: 0;\n    border-right: 0;\n    border-left: 0;\n    border-bottom: 1px solid #78d9fe;\n    margin: 0 0 30px 0;\n    width: 100%; }\n.contact-form-submit {\n    background-color: #00ccff;\n    border: 0;\n    font-weight: 700;\n    margin: 0 0 30px 0;\n    padding: 5px 15px;\n    text-transform: uppercase; }\n.social-link {\n  display: block;\n  padding: 0 0 15px 0; }\n.social-link:last-child {\n    padding-bottom: 0; }\n.content-section {\n  font-size: 15px;\n  padding: 30px; }\n@media (min-width: 768px) {\n    .content-section {\n      padding: 60px 90px; } }\n.content-section:nth-child(odd) {\n    background: #283891;\n    color: #f7f7f7; }\n.content-section img {\n    width: 800px; }\n.carousel-caption {\n  background: rgba(0, 0, 0, 0.5); }\n.img-fluid {\n  width: 100%;\n  height: 300px; }\n@media (min-width: 768px) {\n    .img-fluid {\n      width: 100%;\n      height: 500px; } }\n"

/***/ }),

/***/ "./src/app/showcase/showcase.component.ts":
/*!************************************************!*\
  !*** ./src/app/showcase/showcase.component.ts ***!
  \************************************************/
/*! exports provided: ShowcaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowcaseComponent", function() { return ShowcaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowcaseComponent = /** @class */ (function () {
    function ShowcaseComponent(_http) {
        this._http = _http;
    }
    ShowcaseComponent.prototype.ngOnInit = function () {
        this.showcases = [];
        // const api = {
        //   slug: "api",
        //   title: 'Athletic Performance Insights',
        //   description: 'Sports data capture & analytics',
        //   slides: [
        //     {
        //       url: '/assets/img/api/team.png',
        //       title: 'Asset Management',
        //       caption: 'Create & manage teams, player rosters, and game schedules'
        //     },
        //     {
        //       url: '/assets/img/api/gameplay.png',
        //       title: 'Intuitive UI',
        //       caption: 'Easy and intuitive UI allows for real-time data capture'
        //     },
        //     {
        //       url: '/assets/img/api/heatmap.png',
        //       title: 'Instant Insights',
        //       caption: 'Advanced data reporting and visualizations'
        //     },
        //     {
        //       url: '/assets/img/api/video.png',
        //       title: 'Efficient Workflow',
        //       caption: 'Video playback of games allows for automation-assisted review and fine-tuning of data'
        //     }
        //   ]
        // };
        //
        //
        // const bba = {
        //   slug: "bba",
        //   title: 'Bail Bond Application',
        //   description: 'Document & Record Management Suite',
        //   slides: [
        //     {
        //       url: '/assets/img/bba/bba-small.png',
        //       title: 'Bail Bond Application',
        //       caption: 'Professional software suite to manage the capture and control of client data'
        //
        //     },
        //     {
        //       url: '/assets/img/bba/control.png',
        //       title: 'Bail Bond Application',
        //       caption: 'Integrated forms to automate the data collection process while enforcing specified control mechanisms'
        //     },
        //     {
        //       url: '/assets/img/bba/process.png',
        //       title: 'Bail Bond Application',
        //     },
        //     {
        //       url: '/assets/img/bba/market.png',
        //       title: 'Bail Bond Application',
        //       caption: 'Connect to expand market presence'
        //     }
        //   ]
        // };
        //
        // const mciq = {
        //   slug: "mciq",
        //   title: 'Med-Compliance IQ',
        //   description: 'Wound image capture & analytics',
        //   slides: [
        //     {
        //       url: '/assets/img/mciq/mciq.png',
        //       title: 'WoundWise IQ',
        //       caption: 'Patented Image Analytics for more Accurate Wound Measurement.'
        //     },
        //     {
        //       url: '/assets/img/mciq/ww3.png',
        //       title: 'WoundWise IQ',
        //       caption: 'Automate wound data collection and receive immediate analytics'
        //     },
        //     {
        //       url: '/assets/img/mciq/ww01.png',
        //       title: 'WoundWise IQ',
        //       caption: 'Track patient wound progress'
        //     },
        //     {
        //       url: '/assets/img/mciq/mciq.png',
        //       title: 'Burn IQ',
        //       caption: 'Track patient wound progress'
        //     },
        //
        //   ]
        // };
        this.showcases.push({
            slug: "ARknet",
            title: 'ARknet',
            description: 'Augmented reality social media & marketing platform allowing users to view and navigate AR objects represented in true 3D space.',
            role: "UI design, consulting, FE development",
            url: 'https://arknet.app/',
            technology: 'ReactJS, React Native, ViroReact, NodeJS, NPM'
        });
        this.showcases.push({
            slug: "api",
            title: 'Athletic Performance Insights',
            description: 'Sports data capture & analytics.',
            role: "UI design, consulting, FE and BE development.",
            url: 'https://www.athleticperformanceinsight.com/',
            technology: 'Angular, NPM, Sass'
        });
        this.showcases.push({
            slug: "BurnIQ",
            title: 'BurnIQ',
            description: 'Wound image AI analysis tool.',
            role: "Design, consulting, FE & BE development, created, implemented and extensive testing of the burn classifier.",
            technology: 'Application in node.js & Angular as electron application, Machine learning using Tensorflow, API services with Node.js, deploying in cloud using AWS and terraform.',
        });
        this.showcases.push({
            slug: "HoneycombArchive",
            title: 'Honeycomb Archive',
            description: 'Building digital asset management platform to create assets and mark the original assets file with creator’s data for proofs.',
            role: "Design, consulting, complete development of a complex digital assets management system",
            technology: 'React Native, Expo kit and Express',
            url: 'https://www.honeycombarchive.com/',
        });
        this.showcases.push({
            slug: "Lemur",
            title: 'Lemur',
            description: 'Next generation health platform to deliver safe and affordable healthcare to everyone by putting patients in control of their health.',
            role: "Design, consulting, FE/BE dev, offering insights for slight course corrections for better outcomes.",
            technology: 'ReactJS, React Native, Firebase, Node.js',
            url: "https://lemurpbc.org/"
        });
        this.showcases.push({
            slug: "WoundwiseIQ",
            title: 'WoundwiseIQ',
            description: 'Building wound analysis platform editor using Node, Angular and Twitter bootstrap. Integrated wound analytics algorithm with mobile user application. Enhanced wound image capture capabilities using vector technology.',
            role: "Consulting, Maintenance, FE & BE development",
            technology: 'Java, Jetty, PHP, Laravel, MySQL, Node.js, Angular, Wound image capture with iOS & Objective-C, AWS, terraform',
            url: "https://woundwiseiq.com/"
        });
        this.showcases.push({
            slug: "MassMatrix",
            title: 'MassMatrix',
            description: 'Building a protein intact mass analysis GUI with robust MS tables and feature sets.',
            role: "Designing the product's UI in its entirety. Building a protein intact mass analysis GUI with robust MS tables and feature sets. Managing disparate development teams to complete the first iteration of the project into production.",
            technology: 'JavaScript, React, Node.js, Express, D3, AWS, Amplify, Jasmine, Cognito, S3, Lambda, SNS, Dynamo, Stripe',
            url: "https://www.massmatrix.bio/"
        });
        this.showcases.push({
            slug: "InkLocker",
            title: 'InkLocker',
            description: 'A decentralized on-demand network of suppliers.',
            role: "Planning, developing and managing the platform. Created platform on top of Promo standards API and 3rd-party supplier api’s.",
            technology: 'AWS, Docker, Node.js, MongoDB, Angular',
        });
    };
    ShowcaseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-show-case',
            template: __webpack_require__(/*! ./showcase.component.html */ "./src/app/showcase/showcase.component.html"),
            styles: [__webpack_require__(/*! ./showcase.component.scss */ "./src/app/showcase/showcase.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ShowcaseComponent);
    return ShowcaseComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    baseURL: ''
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vendor */ "./src/vendor.ts");
/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_vendor__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/style/app.scss":
/*!****************************!*\
  !*** ./src/style/app.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/raw-loader!../../node_modules/postcss-loader/lib??embedded!../../node_modules/sass-loader/lib/loader.js??ref--14-3!./app.scss */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/sass-loader/lib/loader.js??ref--14-3!./src/style/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/vendor.ts":
/*!***********************!*\
  !*** ./src/vendor.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
// BOOTSTRAP
// FONT AWESOME


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/hokaiyip/coop/webapp-base-2/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map