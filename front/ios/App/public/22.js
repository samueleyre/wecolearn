(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./src/app/core/entities/tag/entity.ts":
/*!*********************************************!*\
  !*** ./src/app/core/entities/tag/entity.ts ***!
  \*********************************************/
/*! exports provided: Tag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tag", function() { return Tag; });
var Tag = /** @class */ (function () {
    function Tag(obj) {
        this.name = obj && obj.name ? obj.name.toLocaleLowerCase() : null;
        this.tag_domains = obj && obj.tag_domains ? obj.tag_domains : [];
        this.type = obj && 'type' in obj ? obj.type : null;
        if (obj && 'id' in obj) {
            this.id = obj.id;
        }
        if (obj && obj.iteration) {
            this.iteration = obj.iteration;
        }
    }
    return Tag;
}());



/***/ }),

/***/ "./src/app/core/enums/tag/tag-type.enum.ts":
/*!*************************************************!*\
  !*** ./src/app/core/enums/tag/tag-type.enum.ts ***!
  \*************************************************/
/*! exports provided: TagTypeEnum, tagTypes, tagTypeEN, tagTypeFR, tagTypeEmoji, ɵ0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagTypeEnum", function() { return TagTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagTypes", function() { return tagTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagTypeEN", function() { return tagTypeEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagTypeFR", function() { return tagTypeFR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagTypeEmoji", function() { return tagTypeEmoji; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
var _a, _b, _c;
var TagTypeEnum;
(function (TagTypeEnum) {
    TagTypeEnum[TagTypeEnum["LEARN"] = 0] = "LEARN";
    TagTypeEnum[TagTypeEnum["KNOW"] = 1] = "KNOW";
    TagTypeEnum[TagTypeEnum["TEACH"] = 2] = "TEACH";
})(TagTypeEnum || (TagTypeEnum = {}));
var ɵ0 = function (el) { return typeof el === 'number'; };
var tagTypes = Object.values(TagTypeEnum).filter(ɵ0);
var tagTypeEN = (_a = {},
    _a[TagTypeEnum.LEARN] = 'learn',
    _a[TagTypeEnum.KNOW] = 'know',
    _a[TagTypeEnum.TEACH] = 'teach',
    _a);
var tagTypeFR = (_b = {},
    _b[TagTypeEnum.LEARN] = 'Apprentissage',
    _b[TagTypeEnum.KNOW] = 'Connaissance',
    _b[TagTypeEnum.TEACH] = 'Transmission',
    _b);
var tagTypeEmoji = (_c = {},
    _c[TagTypeEnum.LEARN] = '1F4C8',
    _c[TagTypeEnum.KNOW] = 'E319',
    _c[TagTypeEnum.TEACH] = '1F9D1-200D-1F3EB',
    _c);



/***/ }),

/***/ "./src/app/core/services/tag/popular-tag-domains-as-tags.service.ts":
/*!**************************************************************************!*\
  !*** ./src/app/core/services/tag/popular-tag-domains-as-tags.service.ts ***!
  \**************************************************************************/
/*! exports provided: PopularTagDomainsAsTagsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopularTagDomainsAsTagsService", function() { return PopularTagDomainsAsTagsService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_services_crud_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/core/services/crud/api */ "./src/app/core/services/crud/api.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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




var PopularTagDomainsAsTagsService = /** @class */ (function (_super) {
    __extends(PopularTagDomainsAsTagsService, _super);
    function PopularTagDomainsAsTagsService(_http) {
        var _this = _super.call(this, _http) || this;
        _this._http = _http;
        _this.endPoint = '/api/tag/domains-popular-as-tag';
        return _this;
    }
    /**
     * for tag selection in profil
     */
    PopularTagDomainsAsTagsService.prototype.getPopularDomainsAsTags = function (limit) {
        return _super.prototype.list.call(this, { limit: limit });
    };
    PopularTagDomainsAsTagsService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ factory: function PopularTagDomainsAsTagsService_Factory() { return new PopularTagDomainsAsTagsService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: PopularTagDomainsAsTagsService, providedIn: "root" });
    return PopularTagDomainsAsTagsService;
}(_core_services_crud_api__WEBPACK_IMPORTED_MODULE_1__["APIService"]));



/***/ }),

/***/ "./src/app/core/services/tag/tag.service.ts":
/*!**************************************************!*\
  !*** ./src/app/core/services/tag/tag.service.ts ***!
  \**************************************************/
/*! exports provided: TagService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagService", function() { return TagService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



var TagService = /** @class */ (function () {
    function TagService(_http) {
        this._http = _http;
        this.endPoint = '/api/tag';
    }
    TagService.prototype.findTags = function (text, type) {
        if (type === void 0) { type = 0; }
        var filter = '';
        if (text) {
            filter = "?tagLetters=" + text + "&type=" + type;
        }
        return this._http.get(this.endPoint + "/find" + filter);
    };
    TagService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function TagService_Factory() { return new TagService(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: TagService, providedIn: "root" });
    return TagService;
}());



/***/ }),

/***/ "./src/app/modules/profile/modules/form/form.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/profile/modules/form/form.module.ts ***!
  \*************************************************************/
/*! exports provided: ProfileFormModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileFormModule", function() { return ProfileFormModule; });
var ProfileFormModule = /** @class */ (function () {
    function ProfileFormModule() {
    }
    return ProfileFormModule;
}());



/***/ }),

/***/ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ngfactory.js":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ngfactory.js ***!
  \*******************************************************************************************************************/
/*! exports provided: RenderType_TagSearchMobileComponent, View_TagSearchMobileComponent_0, View_TagSearchMobileComponent_Host_0, TagSearchMobileComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_TagSearchMobileComponent", function() { return RenderType_TagSearchMobileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TagSearchMobileComponent_0", function() { return View_TagSearchMobileComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TagSearchMobileComponent_Host_0", function() { return View_TagSearchMobileComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagSearchMobileComponentNgFactory", function() { return TagSearchMobileComponentNgFactory; });
/* harmony import */ var _tag_search_mobile_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag-search-mobile.component.scss.shim.ngstyle */ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory */ "./node_modules/@angular/material/icon/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../shared/components/emoji/emoji.component.ngfactory */ "./src/app/shared/components/emoji/emoji.component.ngfactory.js");
/* harmony import */ var _shared_components_emoji_emoji_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../shared/components/emoji/emoji.component */ "./src/app/shared/components/emoji/emoji.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_ionic_angular_ionic_angular_ngfactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../../../node_modules/@ionic/angular/ionic-angular.ngfactory */ "./node_modules/@ionic/angular/ionic-angular.ngfactory.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _tag_search_mobile_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tag-search-mobile.component */ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ts");
/* harmony import */ var _core_services_tag_tag_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../../../core/services/tag/tag.service */ "./src/app/core/services/tag/tag.service.ts");
/* harmony import */ var _core_services_tag_popular_tag_domains_as_tags_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../../../core/services/tag/popular-tag-domains-as-tags.service */ "./src/app/core/services/tag/popular-tag-domains-as-tags.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























var styles_TagSearchMobileComponent = [_tag_search_mobile_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_TagSearchMobileComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_TagSearchMobileComponent, data: {} });

function View_TagSearchMobileComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "button", [["aria-label", "Clear"], ["mat-icon-button", ""], ["matSuffix", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.resetSearchBar($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, [[8, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["close"]))], function (_ck, _v) { _ck(_v, 4, 0); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).inline; var currVal_3 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).color !== "warn")); _ck(_v, 3, 0, currVal_2, currVal_3); }); }
function View_TagSearchMobileComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "h6", [["class", "tagDomains-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Cat\u00E9gories populaires"]))], null, null); }
function View_TagSearchMobileComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "div", [["class", "tagDomains-box"]], [[4, "borderColor", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.select(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 2, "span", [["class", "tagDomains-box-emoji"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "app-emoji", [], null, null, null, _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["View_EmojiComponent_0"], _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["RenderType_EmojiComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 49152, null, 0, _shared_components_emoji_emoji_component__WEBPACK_IMPORTED_MODULE_11__["EmojiComponent"], [], { emojiName: [0, "emojiName"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "span", [["class", "tagDomains-box-name"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](5, null, ["", ""]))], function (_ck, _v) { var currVal_1 = _v.context.$implicit.tag_domains[0].emoji; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = (_v.context.$implicit.tag_domains[0] ? _v.context.$implicit.tag_domains[0].hexcolor : null); _ck(_v, 0, 0, currVal_0); var currVal_2 = _v.context.$implicit.name; _ck(_v, 5, 0, currVal_2); }); }
function View_TagSearchMobileComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 7, "div", [["class", "tagDomains-container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 2, null, View_TagSearchMobileComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "div", [["class", "tagDomains"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 2, null, View_TagSearchMobileComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 2, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).transform(_co.popularTagDomainsAsTags$)).length > 0); _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 6, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).transform(_co.popularTagDomainsAsTags$)); _ck(_v, 6, 0, currVal_1); }, null); }
function View_TagSearchMobileComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "ion-item", [["class", "tagAutocompleteItem"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.select(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_ionic_angular_ionic_angular_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_IonItem_0"], _node_modules_ionic_angular_ionic_angular_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_IonItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__["IonItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, 0, [" ", " "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_0); }); }
function View_TagSearchMobileComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "ion-list", [], null, null, null, _node_modules_ionic_angular_ionic_angular_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_IonList_0"], _node_modules_ionic_angular_ionic_angular_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_IonList"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__["IonList"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 2, null, View_TagSearchMobileComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 3, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).transform(_co.foundAutocompleteTags$)); _ck(_v, 3, 0, currVal_0); }, null); }
function View_TagSearchMobileComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 8, "div", [["class", "SearchBar-noTagFound"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Vous ne trouvez pas votre apprentissage ? Ajoutez-le ! "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 5, "button", [["color", "primary"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addTagByName(_co.addYourOwnTag) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, 0, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["add"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](8, 0, ["", ""]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 4, 0, currVal_2); _ck(_v, 6, 0); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._animationMode === "NoopAnimations"); _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).inline; var currVal_4 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color !== "warn")); _ck(_v, 5, 0, currVal_3, currVal_4); var currVal_5 = _co.addYourOwnTag; _ck(_v, 8, 0, currVal_5); }); }
function View_TagSearchMobileComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { searchBar: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 22, "div", [["class", "SearchBar"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 2, "mat-icon", [["class", "SearchBar-returnIcon mat-icon notranslate"], ["id", "returnButton"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.return() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["arrow_back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 18, "mat-form-field", [["appearance", "outline"], ["class", "mat-form-field"], ["color", "accent"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 7520256, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_17__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"], appearance: [1, "appearance"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 4, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, [[1, 0], ["searchBar", 1]], 1, 7, "input", [["autocomplete", "off"], ["autofocus", ""], ["class", "mat-input-element mat-form-field-autofill-control"], ["matInput", ""], ["placeholder", "Recherche"], ["type", "text"]], [[2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "keyup.backspace"], [null, "keyup"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._onInput() !== false);
        ad = (pd_6 && ad);
    } if (("keyup.backspace" === en)) {
        var pd_7 = (_co.inputChangeByUser($event) !== false);
        ad = (pd_7 && ad);
    } if (("keyup" === en)) {
        var pd_8 = (_co.inputChangeByUser($event) !== false);
        ad = (pd_8 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormControlDirective"], [[8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵangular_packages_forms_forms_q"]]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormControlDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_19__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_20__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[2, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_19__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 4, 1, null, View_TagSearchMobileComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_TagSearchMobileComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_TagSearchMobileComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 2, null, View_TagSearchMobileComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) { var _co = _v.component; _ck(_v, 3, 0); var currVal_24 = "accent"; var currVal_25 = "outline"; _ck(_v, 6, 0, currVal_24, currVal_25); var currVal_42 = _co.searchInputControl; _ck(_v, 17, 0, currVal_42); var currVal_43 = "Recherche"; var currVal_44 = "text"; _ck(_v, 19, 0, currVal_43, currVal_44); var currVal_45 = !_co.inputIsEmpty; _ck(_v, 23, 0, currVal_45); var currVal_46 = _co.showTagDomains; _ck(_v, 25, 0, currVal_46); var currVal_47 = !_co.inputIsEmpty; _ck(_v, 27, 0, currVal_47); var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 29, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).transform(_co.addYourOwnTag$)); _ck(_v, 29, 0, currVal_48); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).inline; var currVal_1 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "warn")); _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "standard"); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "fill"); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "outline"); var currVal_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "legacy"); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.errorState; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._canLabelFloat; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldLabelFloat(); var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._hasFloatingLabel(); var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._hideControlPlaceholder(); var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.disabled; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.autofilled; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.focused; var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color == "accent"); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color == "warn"); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("untouched"); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("touched"); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("pristine"); var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("dirty"); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("valid"); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("invalid"); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("pending"); var currVal_23 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._animationsEnabled; _ck(_v, 5, 1, [currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23]); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._isServer; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).id; var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).placeholder; var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).disabled; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).required; var currVal_31 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._isNativeSelect) || null); var currVal_32 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19)._ariaDescribedby || null); var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).errorState; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).required.toString(); var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassUntouched; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassTouched; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassPristine; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassDirty; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassValid; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassInvalid; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).ngClassPending; _ck(_v, 14, 1, [currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41]); }); }
function View_TagSearchMobileComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-tag-search-mobile", [], null, null, null, View_TagSearchMobileComponent_0, RenderType_TagSearchMobileComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _tag_search_mobile_component__WEBPACK_IMPORTED_MODULE_21__["TagSearchMobileComponent"], [_core_services_tag_tag_service__WEBPACK_IMPORTED_MODULE_22__["TagService"], _core_services_tag_popular_tag_domains_as_tags_service__WEBPACK_IMPORTED_MODULE_23__["PopularTagDomainsAsTagsService"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var TagSearchMobileComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-tag-search-mobile", _tag_search_mobile_component__WEBPACK_IMPORTED_MODULE_21__["TagSearchMobileComponent"], View_TagSearchMobileComponent_Host_0, { returnLink: "returnLink", tagType: "tagType", tagIdExceptions: "tagIdExceptions" }, { tag: "tag" }, []);



/***/ }),

/***/ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.scss.shim.ngstyle.js":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.scss.shim.ngstyle.js ***!
  \***************************************************************************************************************************/
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
var styles = ["html[_ngcontent-%COMP%] {\n  --main-color-1: #501B4A;\n  --main-color-1-light-5: #63215c;\n  --main-color-1-light-10: #76286d;\n  --main-color-1-light-15: #892e7f;\n  --main-color-1-dark-5: #3d1538;\n  --main-color-1-dark-10: #2a0e27;\n  --main-color-1-dark-15: #170815;\n  --main-color-2: #ffc52d;\n  --main-color-2-light-5: #ffcc47;\n  --main-color-2-light-10: #ffd360;\n  --main-color-2-light-15: #ffda7a;\n  --main-color-2-dark-5: #ffbe14;\n  --main-color-2-dark-10: #f9b400;\n  --main-color-2-dark-15: #e0a200;\n}\n\n[_ngcontent-%COMP%]:root {\n  --ion-color-primary: #501B4A;\n  --ion-color-primary-rgb: 80,27,74;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255,255,255;\n  --ion-color-primary-shade: #461841;\n  --ion-color-primary-tint: #62325c;\n  --ion-color-secondary: #ffc52d;\n  --ion-color-secondary-rgb: 255,197,45;\n  --ion-color-secondary-contrast: #000000;\n  --ion-color-secondary-contrast-rgb: 0,0,0;\n  --ion-color-secondary-shade: #e0ad28;\n  --ion-color-secondary-tint: #ffcb42;\n}\n\n.SearchBar[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  padding: 5px 9px;\n}\n\n.SearchBar-returnIcon[_ngcontent-%COMP%] {\n  padding-right: 48px;\n  padding-left: 12px;\n  margin-top: 5px;\n}\n\n.SearchBar-option[_ngcontent-%COMP%] {\n  padding: 8px;\n  background-color: #ffc600;\n  color: #310c31;\n}\n\n.SearchBar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.SearchBar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .mat-form-field-wrapper {\n  margin-bottom: 0;\n  padding-bottom: 0;\n}\n\n.SearchBar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]     .mat-form-field-suffix {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.SearchBar-noTagFound[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.SearchBar-noTagFound[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.SearchBar-noTagFound[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]     .mat-button-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.tagDomains[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.tagDomains-container[_ngcontent-%COMP%] {\n  margin-top: 25px;\n}\n\n.tagDomains-title[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n\n.tagDomains-box[_ngcontent-%COMP%] {\n  border: solid 2px var(--main-color-2);\n  margin: 10px;\n  border-radius: 10px;\n  padding: 15px;\n  width: 150px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.tagDomains-box-emoji[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.tagDomains-box-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-family: ralewaybold, OpenSansSerif, sans-serif;\n  text-align: center;\n}"];



/***/ }),

/***/ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: TagSearchMobileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagSearchMobileComponent", function() { return TagSearchMobileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_services_tag_tag_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/core/services/tag/tag.service */ "./src/app/core/services/tag/tag.service.ts");
/* harmony import */ var _core_entities_tag_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/core/entities/tag/entity */ "./src/app/core/entities/tag/entity.ts");
/* harmony import */ var _core_enums_tag_tag_type_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/core/enums/tag/tag-type.enum */ "./src/app/core/enums/tag/tag-type.enum.ts");
/* harmony import */ var _core_services_tag_popular_tag_domains_as_tags_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/core/services/tag/popular-tag-domains-as-tags.service */ "./src/app/core/services/tag/popular-tag-domains-as-tags.service.ts");
/* harmony import */ var _core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~/core/components/destroy-observable */ "./src/app/core/components/destroy-observable.ts");
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










var TagSearchMobileComponent = /** @class */ (function (_super) {
    __extends(TagSearchMobileComponent, _super);
    function TagSearchMobileComponent(_tagService, _popularTagDomainAsTags, _router) {
        var _this = _super.call(this) || this;
        _this._tagService = _tagService;
        _this._popularTagDomainAsTags = _popularTagDomainAsTags;
        _this._router = _router;
        _this.tag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.addYourOwnTag$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        _this.searchInputControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        _this.foundAutocompleteTags$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        _this.inputChangeByUser$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        return _this;
    }
    TagSearchMobileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initTagDomains();
        var inputChangeByUserAsObservable = this.inputChangeByUser$.asObservable();
        var foundAutocompleteTagsNotFiltered$ = inputChangeByUserAsObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function () { return _this.addYourOwnTag$.next(null); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (val) { return val !== '' && val !== null && val !== undefined && typeof val === 'string'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (value) { return _this._tagService.findTags(value, _this.tagType); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (tags) { return tags.filter(filterExceptionsById); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
        var filterExceptionsById = function (tag) { return _this.tagIdExceptions.indexOf(tag.id) === -1; };
        foundAutocompleteTagsNotFiltered$.pipe().subscribe(function (tags) {
            _this.foundAutocompleteTags$.next(tags);
        });
        foundAutocompleteTagsNotFiltered$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (tags) { return !_this.inputIsEmpty
            && _this.inputValue.length > 3
            && tags.length < 1; })).subscribe(function (noResult) {
            if (noResult) {
                _this.addYourOwnTag$.next(_this.inputValue);
            }
        });
    };
    TagSearchMobileComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.searchBar.nativeElement.focus();
        });
    };
    Object.defineProperty(TagSearchMobileComponent.prototype, "addYourOwnTag", {
        get: function () {
            return this.addYourOwnTag$.value;
        },
        enumerable: true,
        configurable: true
    });
    TagSearchMobileComponent.prototype.initTagDomains = function () {
        this._popularTagDomainAsTags.getPopularDomainsAsTags(15).subscribe();
    };
    Object.defineProperty(TagSearchMobileComponent.prototype, "popularTagDomainsAsTags$", {
        get: function () {
            var _this = this;
            // tslint:disable-next-line:no-magic-numbers
            return this._popularTagDomainAsTags.entities$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (tags) { return tags.filter((function (tag) { return _this.tagIdExceptions.indexOf(tag.id) === -1; })); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagSearchMobileComponent.prototype, "inputIsEmpty", {
        get: function () {
            return this.searchInputControl.value === null || this.searchInputControl.value === '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagSearchMobileComponent.prototype, "inputValue", {
        get: function () {
            return this.searchInputControl.value;
        },
        enumerable: true,
        configurable: true
    });
    // get showAddYourOwnTagOption() {
    //   return !this.inputIsEmpty && this.inputValue.length > 3 && (this.foundAutocompleteTags$.value.length < 1);
    // }
    TagSearchMobileComponent.prototype.addTagByName = function (tagName) {
        this.select(new _core_entities_tag_entity__WEBPACK_IMPORTED_MODULE_6__["Tag"]({ name: tagName, type: this.tagType }));
    };
    Object.defineProperty(TagSearchMobileComponent.prototype, "showTagDomains", {
        get: function () {
            return this.inputIsEmpty && this.tagType === _core_enums_tag_tag_type_enum__WEBPACK_IMPORTED_MODULE_7__["TagTypeEnum"].LEARN;
        },
        enumerable: true,
        configurable: true
    });
    TagSearchMobileComponent.prototype.inputChangeByUser = function ($event) {
        this.inputChangeByUser$.next($event.target.value);
    };
    TagSearchMobileComponent.prototype.select = function (tag) {
        this.tag.emit(tag);
    };
    TagSearchMobileComponent.prototype.resetSearchBar = function (event) {
        this.searchInputControl.setValue(null);
        this.foundAutocompleteTags$.next([]);
    };
    TagSearchMobileComponent.prototype.return = function () {
        this._router.navigate([this.returnLink.split('#')[0]], { fragment: _core_enums_tag_tag_type_enum__WEBPACK_IMPORTED_MODULE_7__["tagTypeEN"][this.tagType] });
    };
    return TagSearchMobileComponent;
}(_core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_9__["DestroyObservable"]));



/***/ }),

/***/ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ngfactory.js":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ngfactory.js ***!
  \*********************************************************************************************************************/
/*! exports provided: RenderType_ProfileTagsSearchBarPageComponent, View_ProfileTagsSearchBarPageComponent_0, View_ProfileTagsSearchBarPageComponent_Host_0, ProfileTagsSearchBarPageComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_ProfileTagsSearchBarPageComponent", function() { return RenderType_ProfileTagsSearchBarPageComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ProfileTagsSearchBarPageComponent_0", function() { return View_ProfileTagsSearchBarPageComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ProfileTagsSearchBarPageComponent_Host_0", function() { return View_ProfileTagsSearchBarPageComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileTagsSearchBarPageComponentNgFactory", function() { return ProfileTagsSearchBarPageComponentNgFactory; });
/* harmony import */ var _profile_tags_search_bar_page_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-tags-search-bar-page.component.scss.shim.ngstyle */ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _modules_tag_ui_components_tag_search_mobile_tag_search_mobile_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ngfactory */ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ngfactory.js");
/* harmony import */ var _modules_tag_ui_components_tag_search_mobile_tag_search_mobile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component */ "./src/app/modules/tags/modules/tag-ui/components/tag-search-mobile/tag-search-mobile.component.ts");
/* harmony import */ var _core_services_tag_tag_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/services/tag/tag.service */ "./src/app/core/services/tag/tag.service.ts");
/* harmony import */ var _core_services_tag_popular_tag_domains_as_tags_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/services/tag/popular-tag-domains-as-tags.service */ "./src/app/core/services/tag/popular-tag-domains-as-tags.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile-tags-search-bar-page.component */ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var styles_ProfileTagsSearchBarPageComponent = [_profile_tags_search_bar_page_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_ProfileTagsSearchBarPageComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_ProfileTagsSearchBarPageComponent, data: {} });

function View_ProfileTagsSearchBarPageComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-tag-search-mobile", [], null, [[null, "tag"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("tag" === en)) {
        var pd_0 = (_co.goBackToPageWithForm($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _modules_tag_ui_components_tag_search_mobile_tag_search_mobile_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_TagSearchMobileComponent_0"], _modules_tag_ui_components_tag_search_mobile_tag_search_mobile_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_TagSearchMobileComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _modules_tag_ui_components_tag_search_mobile_tag_search_mobile_component__WEBPACK_IMPORTED_MODULE_3__["TagSearchMobileComponent"], [_core_services_tag_tag_service__WEBPACK_IMPORTED_MODULE_4__["TagService"], _core_services_tag_popular_tag_domains_as_tags_service__WEBPACK_IMPORTED_MODULE_5__["PopularTagDomainsAsTagsService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]], { returnLink: [0, "returnLink"], tagType: [1, "tagType"], tagIdExceptions: [2, "tagIdExceptions"] }, { tag: "tag" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.origin; var currVal_1 = _co.tagType; var currVal_2 = _co.tagIdExceptions; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_ProfileTagsSearchBarPageComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-profile-tags-search-bar-page", [], null, null, null, View_ProfileTagsSearchBarPageComponent_0, RenderType_ProfileTagsSearchBarPageComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_7__["ProfileTagsSearchBarPageComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ProfileTagsSearchBarPageComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-profile-tags-search-bar-page", _profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_7__["ProfileTagsSearchBarPageComponent"], View_ProfileTagsSearchBarPageComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.scss.shim.ngstyle.js":
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.scss.shim.ngstyle.js ***!
  \*****************************************************************************************************************************/
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
var styles = [""];



/***/ }),

/***/ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: ProfileTagsSearchBarPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileTagsSearchBarPageComponent", function() { return ProfileTagsSearchBarPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_enums_tag_tag_type_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/enums/tag/tag-type.enum */ "./src/app/core/enums/tag/tag-type.enum.ts");



/*
Page dedicated to search for profile tags on mobile
 */
var ProfileTagsSearchBarPageComponent = /** @class */ (function () {
    function ProfileTagsSearchBarPageComponent(_route, _router) {
        this._route = _route;
        this._router = _router;
    }
    ProfileTagsSearchBarPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.queryParams.subscribe(function (params) {
            if ('origin' in params && 'tag_type' in params && 'exceptions' in params) {
                _this.origin = params['origin'];
                _this.tagType = Number(params['tag_type']);
                _this.tagIdExceptions = params['exceptions'].split(',').map(Number);
            }
            else {
                _this._router.navigate(['/']);
            }
        });
    };
    ProfileTagsSearchBarPageComponent.prototype.goBackToPageWithForm = function (tag) {
        this._router.navigate([this.origin.split('#')[0]], {
            queryParams: { tag_id: tag.id, tag_name: tag.name, tag_type: this.tagType },
            fragment: _core_enums_tag_tag_type_enum__WEBPACK_IMPORTED_MODULE_2__["tagTypeEN"][this.tagType],
        });
    };
    return ProfileTagsSearchBarPageComponent;
}());



/***/ }),

/***/ "./src/app/modules/tags/tags-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/tags/tags-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: TagsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsRoutingModule", function() { return TagsRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _modules_tags_pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component */ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ts");


var routes = [
    {
        path: 'searchBar', component: _modules_tags_pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_1__["ProfileTagsSearchBarPageComponent"], pathMatch: 'full',
    },
];
var TagsRoutingModule = /** @class */ (function () {
    function TagsRoutingModule() {
    }
    return TagsRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/tags/tags.module.ngfactory.js":
/*!*******************************************************!*\
  !*** ./src/app/modules/tags/tags.module.ngfactory.js ***!
  \*******************************************************/
/*! exports provided: TagsModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsModuleNgFactory", function() { return TagsModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tags_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tags.module */ "./src/app/modules/tags/tags.module.ts");
/* harmony import */ var _node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/tooltip/typings/index.ngfactory */ "./node_modules/@angular/material/tooltip/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_dialog_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/dialog/typings/index.ngfactory */ "./node_modules/@angular/material/dialog/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory */ "./node_modules/@angular/material/datepicker/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/snack-bar/typings/index.ngfactory */ "./node_modules/@angular/material/snack-bar/typings/index.ngfactory.js");
/* harmony import */ var _shared_components_no_connection_toast_no_connection_toast_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/no-connection-toast/no-connection-toast.component.ngfactory */ "./src/app/shared/components/no-connection-toast/no-connection-toast.component.ngfactory.js");
/* harmony import */ var _shared_modules_cloudinary_components_upload_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/modules/cloudinary/components/upload/component.ngfactory */ "./src/app/shared/modules/cloudinary/components/upload/component.ngfactory.js");
/* harmony import */ var _pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ngfactory */ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../core/services/auth/session.service */ "./src/app/core/services/auth/session.service.ts");
/* harmony import */ var _ngx_pwa_local_storage__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-pwa/local-storage */ "./node_modules/@ngx-pwa/local-storage/fesm5/ngx-pwa-local-storage.js");
/* harmony import */ var _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../core/services/auth/headerBag */ "./src/app/core/services/auth/headerBag.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../shared/modules/pipesModule/pipes.module */ "./src/app/shared/modules/pipesModule/pipes.module.ts");
/* harmony import */ var _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../profile/modules/profilImage/profileImage.module */ "./src/app/modules/profile/modules/profilImage/profileImage.module.ts");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/esm5/badge.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ../../shared/modules/material/material.module */ "./src/app/shared/modules/material/material.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ng2-file-upload/file-upload/file-upload.module */ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js");
/* harmony import */ var ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ../../shared/modules/cloudinary/components/upload/module */ "./src/app/shared/modules/cloudinary/components/upload/module.ts");
/* harmony import */ var _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ../../shared/modules/cloudinary/cloudinary.module */ "./src/app/shared/modules/cloudinary/cloudinary.module.ts");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ../profile/modules/form/form.module */ "./src/app/modules/profile/modules/form/form.module.ts");
/* harmony import */ var _tags_routing_module__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./tags-routing.module */ "./src/app/modules/tags/tags-routing.module.ts");
/* harmony import */ var _modules_tag_domain_ui_tag_domain_ui_module__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./modules/tag-domain-ui/tag-domain-ui.module */ "./src/app/modules/tags/modules/tag-domain-ui/tag-domain-ui.module.ts");
/* harmony import */ var _modules_tag_ui_tag_ui_module__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./modules/tag-ui/tag-ui.module */ "./src/app/modules/tags/modules/tag-ui/tag-ui.module.ts");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var _pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component */ "./src/app/modules/tags/pages/profile-tags-search-bar-page/profile-tags-search-bar-page.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


































































var TagsModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_tags_module__WEBPACK_IMPORTED_MODULE_1__["TagsModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["TooltipComponentNgFactory"], _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_router_router_lNgFactory"], _node_modules_angular_material_dialog_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatDialogContainerNgFactory"], _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerContentNgFactory"], _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["MatCalendarHeaderNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["MatSnackBarContainerNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["SimpleSnackBarNgFactory"], _shared_components_no_connection_toast_no_connection_toast_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["NoConnectionToastComponentNgFactory"], _shared_modules_cloudinary_components_upload_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["UploadComponentNgFactory"], _pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["ProfileTagsSearchBarPageComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_11__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_11__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MAT_TOOLTIP_SCROLL_STRATEGY"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["HAMMER_GESTURE_CONFIG"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["GestureConfig"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MAT_HAMMER_OPTIONS"]], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatCommonModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_forms_forms_o"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_forms_forms_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MAT_DIALOG_SCROLL_STRATEGY"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialog"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialog"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"]], [2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MAT_DIALOG_DEFAULT_OPTIONS"]], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MAT_DIALOG_SCROLL_STRATEGY"], [3, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialog"]], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayContainer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MatDatepickerIntl"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MatDatepickerIntl"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MAT_DATEPICKER_SCROLL_STRATEGY"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_select__WEBPACK_IMPORTED_MODULE_21__["MAT_SELECT_SCROLL_STRATEGY"], _angular_material_select__WEBPACK_IMPORTED_MODULE_21__["MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MAT_MENU_SCROLL_STRATEGY"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["ɵd24"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__["MatStepperIntl"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__["MAT_STEPPER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__["MatStepperIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__["MatSortHeaderIntl"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__["MAT_SORT_HEADER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__["MatSortHeaderIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_26__["SessionService"], _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_26__["SessionService"], [_ngx_pwa_local_storage__WEBPACK_IMPORTED_MODULE_27__["LocalStorage"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_28__["HeaderBag"], _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_28__["HeaderBag"], [_core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_26__["SessionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["AngularDelegate"], _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["AngularDelegate"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["ModalController"], [_ionic_angular__WEBPACK_IMPORTED_MODULE_29__["AngularDelegate"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["PopoverController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["PopoverController"], [_ionic_angular__WEBPACK_IMPORTED_MODULE_29__["AngularDelegate"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_11__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_11__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_30__["A11yModule"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_30__["A11yModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_31__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_31__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_32__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_32__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltipModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_33__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_33__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_33__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_33__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_34__["PipesModule"], _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_34__["PipesModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_35__["ProfileImageModule"], _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_35__["ProfileImageModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_badge__WEBPACK_IMPORTED_MODULE_36__["MatBadgeModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_36__["MatBadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_37__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_37__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_38__["MatButtonToggleModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_38__["MatButtonToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__["MatChipsModule"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__["MatChipsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MatDatepickerModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_20__["MatDatepickerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_40__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_40__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_41__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_41__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_42__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_42__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_select__WEBPACK_IMPORTED_MODULE_21__["MatSelectModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_21__["MatSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_43__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_43__["MatCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MatMenuModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MatMenuModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["NativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatNativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatNativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_44__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_44__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_45__["CdkStepperModule"], _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_45__["CdkStepperModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__["MatStepperModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_24__["MatStepperModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_46__["MatProgressSpinnerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_46__["MatProgressSpinnerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_table__WEBPACK_IMPORTED_MODULE_47__["CdkTableModule"], _angular_cdk_table__WEBPACK_IMPORTED_MODULE_47__["CdkTableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_table__WEBPACK_IMPORTED_MODULE_48__["MatTableModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_48__["MatTableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__["MatSortModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__["MatSortModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_49__["MatProgressBarModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_49__["MatProgressBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_50__["MatSlideToggleModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_50__["MatSlideToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_51__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_51__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_52__["MatSnackBarModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_52__["MatSnackBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_53__["MaterialModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_53__["MaterialModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_shared_module__WEBPACK_IMPORTED_MODULE_54__["SharedModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_54__["SharedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_55__["FileUploadModule"], ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_55__["FileUploadModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_56__["UploadModule"], _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_56__["UploadModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_57__["CloudinaryModule"], _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_57__["CloudinaryModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slider__WEBPACK_IMPORTED_MODULE_58__["MatSliderModule"], _angular_material_slider__WEBPACK_IMPORTED_MODULE_58__["MatSliderModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_radio__WEBPACK_IMPORTED_MODULE_59__["MatRadioModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_59__["MatRadioModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["IonicModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_29__["IonicModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_60__["ProfileFormModule"], _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_60__["ProfileFormModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _tags_routing_module__WEBPACK_IMPORTED_MODULE_61__["TagsRoutingModule"], _tags_routing_module__WEBPACK_IMPORTED_MODULE_61__["TagsRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _modules_tag_domain_ui_tag_domain_ui_module__WEBPACK_IMPORTED_MODULE_62__["TagDomainUiModule"], _modules_tag_domain_ui_tag_domain_ui_module__WEBPACK_IMPORTED_MODULE_62__["TagDomainUiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _modules_tag_ui_tag_ui_module__WEBPACK_IMPORTED_MODULE_63__["TagUiModule"], _modules_tag_ui_tag_ui_module__WEBPACK_IMPORTED_MODULE_63__["TagUiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _tags_module__WEBPACK_IMPORTED_MODULE_1__["TagsModule"], _tags_module__WEBPACK_IMPORTED_MODULE_1__["TagsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__["MAT_CHIPS_DEFAULT_OPTIONS"], { separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_64__["ENTER"]] }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MAT_DATE_FORMATS"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MAT_NATIVE_DATE_FORMATS"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_33__["ROUTES"], function () { return [[{ path: "searchBar", component: _pages_profile_tags_search_bar_page_profile_tags_search_bar_page_component__WEBPACK_IMPORTED_MODULE_65__["ProfileTagsSearchBarPageComponent"], pathMatch: "full" }]]; }, [])]); });



/***/ }),

/***/ "./src/app/modules/tags/tags.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/tags/tags.module.ts ***!
  \*********************************************/
/*! exports provided: TagsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsModule", function() { return TagsModule; });
var TagsModule = /** @class */ (function () {
    function TagsModule() {
    }
    return TagsModule;
}());



/***/ })

}]);