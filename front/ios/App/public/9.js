(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/app/config/bio.const.ts":
/*!*************************************!*\
  !*** ./src/app/config/bio.const.ts ***!
  \*************************************/
/*! exports provided: BIO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIO", function() { return BIO; });
var BIO = {
    default: "Je souhaite apprendre avec d'autres !",
};


/***/ }),

/***/ "./src/app/core/entities/tag/TagDomain.ts":
/*!************************************************!*\
  !*** ./src/app/core/entities/tag/TagDomain.ts ***!
  \************************************************/
/*! exports provided: TagDomain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagDomain", function() { return TagDomain; });
var TagDomain = /** @class */ (function () {
    function TagDomain(obj) {
        if (obj) {
            if ('id' in obj) {
                this.id = obj.id;
            }
            if ('linked_tag' in obj) {
                this.linked_tag = obj.linked_tag;
            }
            this.name = 'name' in obj ? obj.name : null;
            this.emoji = 'emoji' in obj ? obj.emoji : null;
            this.hexcolor = 'hexcolor' in obj ? obj.hexcolor : null;
        }
    }
    return TagDomain;
}());



/***/ }),

/***/ "./src/app/core/enums/search/searchMeta.enum.ts":
/*!******************************************************!*\
  !*** ./src/app/core/enums/search/searchMeta.enum.ts ***!
  \******************************************************/
/*! exports provided: SearchMeta */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMeta", function() { return SearchMeta; });
var SearchMeta;
(function (SearchMeta) {
    SearchMeta["tagNotFound"] = "tagNotFound";
    SearchMeta["useProfileTags"] = "useProfileTags";
    SearchMeta["userLearnTags"] = "userLearnTags";
    SearchMeta["userKnowTags"] = "userKnowTags";
    SearchMeta["userLearnTagDomains"] = "userLearnTagDomains";
    SearchMeta["userKnowTagDomains"] = "userKnowTagDomains";
    SearchMeta["searchLearnTag"] = "searchLearnTag";
    SearchMeta["searchByLearnTagDomain"] = "searchByLearnTagDomain";
    SearchMeta["orderByDistance"] = "orderByDistance";
})(SearchMeta || (SearchMeta = {}));


/***/ }),

/***/ "./src/app/core/services/search/search.service.ts":
/*!********************************************************!*\
  !*** ./src/app/core/services/search/search.service.ts ***!
  \********************************************************/
/*! exports provided: SearchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchService", function() { return SearchService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_services_crud_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/core/services/crud/api */ "./src/app/core/services/crud/api.ts");
/* harmony import */ var _core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/core/enums/search/searchMeta.enum */ "./src/app/core/enums/search/searchMeta.enum.ts");
/* harmony import */ var _core_entities_tag_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/core/entities/tag/entity */ "./src/app/core/entities/tag/entity.ts");
/* harmony import */ var _core_entities_tag_TagDomain__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/core/entities/tag/TagDomain */ "./src/app/core/entities/tag/TagDomain.ts");
/* harmony import */ var _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/core/services/user/profile.service */ "./src/app/core/services/user/profile.service.ts");
/* harmony import */ var _modules_search_config_main__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../modules/search/config/main */ "./src/app/modules/search/config/main.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};













var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService(_http, _profileService) {
        var _this = _super.call(this, _http) || this;
        _this._http = _http;
        _this._profileService = _profileService;
        _this.currentlySearching = false;
        _this.searchInput = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        _this.globalMode$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        _this.community$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        _this._communities$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        _this.useProfileTagsMode$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](true);
        _this.currentFoundMatchs$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        _this.currentFoundAddress = [];
        _this.currentSearch = {};
        _this.endPoint = '/api/user/matchs';
        _this.searchMetaSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        _this._communities$.next([
            { id: null, name: 'Grand public', is_main: true }
        ].concat(_this._profileService.profile.domains.filter(function (domain) { return !domain.is_main; })));
        _this.setCommunity(_this.defaultCommunity);
        return _this;
    }
    Object.defineProperty(SearchService.prototype, "communities", {
        get: function () {
            return this._communities$.value;
            // todo: filter main domain & unshit main domain with hard image & name
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "defaultCommunity", {
        get: function () {
            // todo: make user select default community
            return this.communities.filter(function (domain) { return !domain.is_main; })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "searchType", {
        get: function () {
            if (SearchService.first > 0) {
                return 'scroll';
            }
            return 'default';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "searchMeta", {
        get: function () {
            return this.searchMetaSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    SearchService.prototype.resetSearch = function () {
        SearchService.first = 0;
    };
    Object.defineProperty(SearchService.prototype, "searchInputValue", {
        get: function () {
            return this.searchInput.value;
        },
        enumerable: true,
        configurable: true
    });
    SearchService.prototype.getSearchInputObs = function () {
        return this.searchInput;
    };
    SearchService.prototype.setSearchInputAsTag = function (tag) {
        this.searchInput.next(new _core_entities_tag_entity__WEBPACK_IMPORTED_MODULE_6__["Tag"](tag));
    };
    SearchService.prototype.setSearchInputAsTagDomain = function (tagDomain) {
        this.searchInput.next(new _core_entities_tag_TagDomain__WEBPACK_IMPORTED_MODULE_7__["TagDomain"](tagDomain));
    };
    SearchService.prototype.searchList = function (filters) {
        var _this = this;
        if (filters === void 0) { filters = {}; }
        return this._http.post(this.endPoint, filters)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(function (data) {
            _this._loaded$.next(true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["finalize"])(function () {
            _this._loading$.next(false);
        }));
    };
    SearchService.prototype.search = function (filters) {
        var _this = this;
        if (filters === void 0) { filters = {}; }
        if (!filters.hasOwnProperty('first')) {
            this.resetSearch();
        }
        filters['max'] = _modules_search_config_main__WEBPACK_IMPORTED_MODULE_9__["SEARCH"].default.max;
        filters['global'] = this.globalMode;
        filters['domain'] = this.community;
        if (SearchService.first > 0) {
            // scroll search
            // keep same type of search
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].useProfileTags] = this.searchMeta.useProfileTags;
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].userLearnTags] = this.searchMeta.userLearnTags;
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].userLearnTagDomains] = this.searchMeta.userLearnTagDomains;
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].userKnowTags] = this.searchMeta.userKnowTags;
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].userKnowTagDomains] = this.searchMeta.userKnowTagDomains;
        }
        else {
            filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].useProfileTags] = _core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].useProfileTags in filters ?
                filters[_core_enums_search_searchMeta_enum__WEBPACK_IMPORTED_MODULE_5__["SearchMeta"].useProfileTags] : this.useProfileTagsMode;
        }
        this._loading$.next(true);
        return this.searchList(filters).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            if (SearchService.first === 0) {
                // new search
                _this.searchMetaSubject.next(response.meta);
                _this.currentFoundMatchs$.next(response.data.map(function (val) { return val[0]; }));
            }
            else {
                // scroll search
                _this.currentFoundMatchs$.next(lodash__WEBPACK_IMPORTED_MODULE_3__["uniqBy"](_this.currentFoundMatchs$.getValue().concat(response.data.map(function (val) { return val[0]; })), 'id'));
            }
            _this._loading$.next(false);
            _this.currentlySearching = false;
            return true;
        }));
    };
    SearchService.prototype.searchAgainWithSamefilters = function (filters) {
        if (filters === void 0) { filters = {}; }
        var filledFilters = filters;
        var val = this.searchInputValue;
        if (this.searchInputValue) {
            filledFilters = __assign({}, filters, { tag: (val instanceof _core_entities_tag_entity__WEBPACK_IMPORTED_MODULE_6__["Tag"]) ? val : null, tagDomain: (val instanceof _core_entities_tag_TagDomain__WEBPACK_IMPORTED_MODULE_7__["TagDomain"]) ? val : null });
        }
        this.search(filledFilters).subscribe();
    };
    SearchService.prototype.getCurrentFoundMatchs = function () {
        return this.currentFoundMatchs$.asObservable();
    };
    SearchService.prototype.getCurrentFoundAddress = function () {
        return this.currentFoundAddress;
    };
    SearchService.prototype.addSearchParameter = function (key, value) {
        this.currentSearch[key] = value;
    };
    SearchService.prototype.removeSearchParameter = function (key) {
        delete this.currentSearch[key];
    };
    Object.defineProperty(SearchService.prototype, "globalMode", {
        get: function () {
            return this.globalMode$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "community", {
        get: function () {
            return this.community$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "useProfileTagsMode", {
        get: function () {
            return this.useProfileTagsMode$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    SearchService.prototype.setGlobalMode = function (isGlobal) {
        this.globalMode$.next(isGlobal);
    };
    SearchService.prototype.setCommunity = function (community) {
        this.community$.next(community);
    };
    SearchService.prototype.setUseProfileTagsMode = function (bool) {
        this.useProfileTagsMode$.next(bool);
    };
    SearchService.max = _modules_search_config_main__WEBPACK_IMPORTED_MODULE_9__["SEARCH"].default.max;
    SearchService.first = 0;
    SearchService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({ factory: function SearchService_Factory() { return new SearchService(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_8__["ProfileService"])); }, token: SearchService, providedIn: "root" });
    return SearchService;
}(_core_services_crud_api__WEBPACK_IMPORTED_MODULE_4__["APIService"]));



/***/ }),

/***/ "./src/app/modules/chat/modules/openThread/components/component.ngfactory.js":
/*!***********************************************************************************!*\
  !*** ./src/app/modules/chat/modules/openThread/components/component.ngfactory.js ***!
  \***********************************************************************************/
/*! exports provided: RenderType_OpenThreadComponent, View_OpenThreadComponent_0, View_OpenThreadComponent_Host_0, OpenThreadComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_OpenThreadComponent", function() { return RenderType_OpenThreadComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_OpenThreadComponent_0", function() { return View_OpenThreadComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_OpenThreadComponent_Host_0", function() { return View_OpenThreadComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenThreadComponentNgFactory", function() { return OpenThreadComponentNgFactory; });
/* harmony import */ var _style_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss.shim.ngstyle */ "./src/app/modules/chat/modules/openThread/components/style.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory */ "./node_modules/@angular/material/icon/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component */ "./src/app/modules/chat/modules/openThread/components/component.ts");
/* harmony import */ var _core_services_chat_threads_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../core/services/chat/threads.service */ "./src/app/core/services/chat/threads.service.ts");
/* harmony import */ var _core_services_wc_router_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../core/services/wc-router.service */ "./src/app/core/services/wc-router.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_OpenThreadComponent = [_style_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_OpenThreadComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_OpenThreadComponent, data: {} });

function View_OpenThreadComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "button", [["color", "primary"], ["mat-raised-button", ""]], [[8, "style", 2], [8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openThread() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 4, "div", [["class", "openThread-buttonContent"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Discuter "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_7__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_7__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["chat"]))], function (_ck, _v) { var currVal_3 = "primary"; _ck(_v, 1, 0, currVal_3); _ck(_v, 5, 0); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.style; var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).inline; var currVal_5 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).color !== "warn")); _ck(_v, 4, 0, currVal_4, currVal_5); }); }
function View_OpenThreadComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "open-thread", [], null, null, null, View_OpenThreadComponent_0, RenderType_OpenThreadComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _component__WEBPACK_IMPORTED_MODULE_9__["OpenThreadComponent"], [_core_services_chat_threads_service__WEBPACK_IMPORTED_MODULE_10__["ThreadsService"], _core_services_wc_router_service__WEBPACK_IMPORTED_MODULE_11__["WcRouterService"]], null, null)], null, null); }
var OpenThreadComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("open-thread", _component__WEBPACK_IMPORTED_MODULE_9__["OpenThreadComponent"], View_OpenThreadComponent_Host_0, { user: "user", style: "style" }, {}, []);



/***/ }),

/***/ "./src/app/modules/chat/modules/openThread/components/component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/modules/chat/modules/openThread/components/component.ts ***!
  \*************************************************************************/
/*! exports provided: OpenThreadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenThreadComponent", function() { return OpenThreadComponent; });
/* harmony import */ var _core_entities_user_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/core/entities/user/entity */ "./src/app/core/entities/user/entity.ts");
/* harmony import */ var _core_entities_thread_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/core/entities/thread/entity */ "./src/app/core/entities/thread/entity.ts");
/* harmony import */ var _core_services_chat_threads_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/services/chat/threads.service */ "./src/app/core/services/chat/threads.service.ts");
/* harmony import */ var _core_services_wc_router_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/core/services/wc-router.service */ "./src/app/core/services/wc-router.service.ts");




var OpenThreadComponent = /** @class */ (function () {
    function OpenThreadComponent(_threadsService, _wcRouter) {
        this._threadsService = _threadsService;
        this._wcRouter = _wcRouter;
    }
    OpenThreadComponent.prototype.openThread = function () {
        var thread = new _core_entities_thread_entity__WEBPACK_IMPORTED_MODULE_1__["Thread"]({ id: this.user.id, name: this.user.first_name, image: this.user.image });
        this._wcRouter.navigateToCurrentDiscussion(this.user.id, this._threadsService.setCurrentThread(thread));
    };
    return OpenThreadComponent;
}());



/***/ }),

/***/ "./src/app/modules/chat/modules/openThread/components/style.scss.shim.ngstyle.js":
/*!***************************************************************************************!*\
  !*** ./src/app/modules/chat/modules/openThread/components/style.scss.shim.ngstyle.js ***!
  \***************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".openThread-buttonContent[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  font-weight: bold;\n}\n.openThread-buttonContent[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}"];



/***/ }),

/***/ "./src/app/modules/chat/modules/openThread/openThread.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/chat/modules/openThread/openThread.module.ts ***!
  \**********************************************************************/
/*! exports provided: OpenThreadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenThreadModule", function() { return OpenThreadModule; });
var OpenThreadModule = /** @class */ (function () {
    function OpenThreadModule() {
    }
    return OpenThreadModule;
}());



/***/ }),

/***/ "./src/app/modules/profile/modules/profilImage/directives/defaultProfileImage.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/modules/profile/modules/profilImage/directives/defaultProfileImage.ts ***!
  \***************************************************************************************/
/*! exports provided: DefaultProfileImageDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultProfileImageDirective", function() { return DefaultProfileImageDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/config/image */ "./src/app/config/image.ts");


var DefaultProfileImageDirective = /** @class */ (function () {
    function DefaultProfileImageDirective(el) {
        this.isApplied = false;
        this.EVENT_TYPE = 'error';
        this.el = el.nativeElement;
        this.el.addEventListener(this.EVENT_TYPE, this.onError.bind(this));
    }
    DefaultProfileImageDirective.prototype.onError = function () {
        this.removeEvents();
        if (!this.isApplied) {
            this.isApplied = true;
            this.el.setAttribute('src', _config_image__WEBPACK_IMPORTED_MODULE_1__["image"].default_200px);
        }
    };
    DefaultProfileImageDirective.prototype.removeEvents = function () {
        this.el.removeEventListener(this.EVENT_TYPE, this.onError);
    };
    DefaultProfileImageDirective.prototype.ngOnDestroy = function () {
        this.removeEvents();
    };
    return DefaultProfileImageDirective;
}());



/***/ }),

/***/ "./src/app/modules/search/config/main.ts":
/*!***********************************************!*\
  !*** ./src/app/modules/search/config/main.ts ***!
  \***********************************************/
/*! exports provided: SEARCH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH", function() { return SEARCH; });
var SEARCH = {
    default: {
        max: 12,
    },
    scrollTimeOut: 1000,
};


/***/ }),

/***/ "./src/app/shared/modules/cloudinary/pipes/image/pipe.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/modules/cloudinary/pipes/image/pipe.ts ***!
  \***************************************************************/
/*! exports provided: CloudinaryImagePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudinaryImagePipe", function() { return CloudinaryImagePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/config/image */ "./src/app/config/image.ts");


var CloudinaryImagePipe = /** @class */ (function () {
    function CloudinaryImagePipe() {
    }
    CloudinaryImagePipe.prototype.transform = function (image, extension) {
        if (extension === void 0) { extension = 'jpg'; }
        if (!image) {
            return _config_image__WEBPACK_IMPORTED_MODULE_1__["image"].default_200px;
        }
        var version = '';
        if (image.version) {
            version = "v" + image.version + "/";
        }
        return "https://res.cloudinary.com/wecolearn/image/upload/c_scale,w_324/" + version + "images/" + image.public_id + "." + extension;
    };
    return CloudinaryImagePipe;
}());



/***/ }),

/***/ "./src/app/shared/modules/pipesModule/pipes/tag.pipe.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/modules/pipesModule/pipes/tag.pipe.ts ***!
  \**************************************************************/
/*! exports provided: TagPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagPipe", function() { return TagPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var TagPipe = /** @class */ (function () {
    function TagPipe() {
    }
    TagPipe.prototype.transform = function (items, type, length) {
        var _this = this;
        this.size = 0;
        if (!items) {
            return items;
        }
        return items.filter(function (item, i) {
            var ret = item['type'] === type;
            if (ret) {
                _this.size = _this.size + 1;
            }
            return ret && _this.size < length;
        });
    };
    return TagPipe;
}());



/***/ })

}]);