(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./src/app/core/services/communityAdmin/community-admin-message-stats.service.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/core/services/communityAdmin/community-admin-message-stats.service.ts ***!
  \***************************************************************************************/
/*! exports provided: CommunityAdminMessageStatsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityAdminMessageStatsService", function() { return CommunityAdminMessageStatsService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





var CommunityAdminMessageStatsService = /** @class */ (function () {
    function CommunityAdminMessageStatsService(_http) {
        this._http = _http;
        this._entity$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this._loaded$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    CommunityAdminMessageStatsService.prototype.get = function (id) {
        var _this = this;
        return this._http.get("/api/community-admin/message/stat/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(function (data) {
            _this._entity$.next(data);
            _this._loaded$.next(true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["finalize"])(function () {
            _this._loading$.next(false);
        }));
    };
    CommunityAdminMessageStatsService.prototype.stats = function () {
        return this._entity$;
    };
    CommunityAdminMessageStatsService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function CommunityAdminMessageStatsService_Factory() { return new CommunityAdminMessageStatsService(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); }, token: CommunityAdminMessageStatsService, providedIn: "root" });
    return CommunityAdminMessageStatsService;
}());



/***/ }),

/***/ "./src/app/core/services/communityAdmin/community-admin-users.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/core/services/communityAdmin/community-admin-users.service.ts ***!
  \*******************************************************************************/
/*! exports provided: CommunityAdminUsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityAdminUsersService", function() { return CommunityAdminUsersService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_services_crud_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/services/crud/api */ "./src/app/core/services/crud/api.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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





var CommunityAdminUsersService = /** @class */ (function (_super) {
    __extends(CommunityAdminUsersService, _super);
    function CommunityAdminUsersService(_http) {
        var _this = _super.call(this, _http) || this;
        _this._http = _http;
        _this.endPoint = '/api/community-admin/user';
        return _this;
    }
    CommunityAdminUsersService.prototype.createAndList = function (user) {
        var _this = this;
        this._loading$.next(true);
        return this._http.post("" + this.endPoint, user).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (patchedUser) { return _this._entity$.next(patchedUser); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function () { return _this.list(); }));
    };
    Object.defineProperty(CommunityAdminUsersService.prototype, "user", {
        get: function () {
            return this.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommunityAdminUsersService.prototype, "users$", {
        get: function () {
            return this.entities$;
        },
        enumerable: true,
        configurable: true
    });
    CommunityAdminUsersService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function CommunityAdminUsersService_Factory() { return new CommunityAdminUsersService(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: CommunityAdminUsersService, providedIn: "root" });
    return CommunityAdminUsersService;
}(_core_services_crud_api__WEBPACK_IMPORTED_MODULE_2__["APIService"]));



/***/ }),

/***/ "./src/app/core/services/communityAdmin/community-admin.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/core/services/communityAdmin/community-admin.service.ts ***!
  \*************************************************************************/
/*! exports provided: CommunityAdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityAdminService", function() { return CommunityAdminService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_services_crud_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/services/crud/api */ "./src/app/core/services/crud/api.ts");
/* harmony import */ var _config_api_end_points_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/config/api/end-points.const */ "./src/app/config/api/end-points.const.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
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






var CommunityAdminService = /** @class */ (function (_super) {
    __extends(CommunityAdminService, _super);
    function CommunityAdminService(_http) {
        var _this = _super.call(this, _http) || this;
        _this._http = _http;
        _this.endPoint = _config_api_end_points_const__WEBPACK_IMPORTED_MODULE_3__["ENDPOINTS"].communityAdmin.community;
        return _this;
    }
    Object.defineProperty(CommunityAdminService.prototype, "community$", {
        get: function () {
            return this.entity$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (val) { return !!val; }));
        },
        enumerable: true,
        configurable: true
    });
    CommunityAdminService.prototype.generateNewInviteToken = function () {
        var _this = this;
        return this._http.get(_config_api_end_points_const__WEBPACK_IMPORTED_MODULE_3__["ENDPOINTS"].communityAdmin.generateInviteUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function () { return _this.get(); }));
    };
    CommunityAdminService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ factory: function CommunityAdminService_Factory() { return new CommunityAdminService(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: CommunityAdminService, providedIn: "root" });
    return CommunityAdminService;
}(_core_services_crud_api__WEBPACK_IMPORTED_MODULE_2__["APIService"]));



/***/ }),

/***/ "./src/app/modules/admin-community/admin-community-routing.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/modules/admin-community/admin-community-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: AdminCommunityRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityRoutingModule", function() { return AdminCommunityRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _modules_admin_community_pages_tags_datavize_tags_datavize_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/modules/admin-community/pages/tags-datavize/tags-datavize.component */ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ts");
/* harmony import */ var _modules_admin_community_pages_admin_community_users_admin_community_users_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/modules/admin-community/pages/admin-community-users/admin-community-users.component */ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ts");
/* harmony import */ var _modules_admin_community_pages_admin_community_settings_admin_community_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/modules/admin-community/pages/admin-community-settings/admin-community-settings.component */ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ts");
/* harmony import */ var _modules_admin_community_pages_admin_community_message_stats_admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component */ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ts");





var adminRoutes = [
    { path: 'users', component: _modules_admin_community_pages_admin_community_users_admin_community_users_component__WEBPACK_IMPORTED_MODULE_2__["AdminCommunityUsersComponent"] },
    { path: 'tags', component: _modules_admin_community_pages_tags_datavize_tags_datavize_component__WEBPACK_IMPORTED_MODULE_1__["TagsDatavizeComponent"] },
    { path: 'stats', component: _modules_admin_community_pages_admin_community_message_stats_admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_4__["AdminCommunityMessageStatsComponent"] },
    { path: 'settings', component: _modules_admin_community_pages_admin_community_settings_admin_community_settings_component__WEBPACK_IMPORTED_MODULE_3__["AdminCommunitySettingsComponent"] },
    { path: '', redirectTo: '/dashboard/community-admin/tags', pathMatch: 'full' },
];
var AdminCommunityRoutingModule = /** @class */ (function () {
    function AdminCommunityRoutingModule() {
    }
    return AdminCommunityRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/admin-community/admin-community.module.ngfactory.js":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/admin-community/admin-community.module.ngfactory.js ***!
  \*****************************************************************************/
/*! exports provided: AdminCommunityModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityModuleNgFactory", function() { return AdminCommunityModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_community_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-community.module */ "./src/app/modules/admin-community/admin-community.module.ts");
/* harmony import */ var _node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/tooltip/typings/index.ngfactory */ "./node_modules/@angular/material/tooltip/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_dialog_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/dialog/typings/index.ngfactory */ "./node_modules/@angular/material/dialog/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory */ "./node_modules/@angular/material/datepicker/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/snack-bar/typings/index.ngfactory */ "./node_modules/@angular/material/snack-bar/typings/index.ngfactory.js");
/* harmony import */ var _shared_components_no_connection_toast_no_connection_toast_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/no-connection-toast/no-connection-toast.component.ngfactory */ "./src/app/shared/components/no-connection-toast/no-connection-toast.component.ngfactory.js");
/* harmony import */ var _pages_admin_community_users_admin_community_users_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/admin-community-users/admin-community-users.component.ngfactory */ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ngfactory.js");
/* harmony import */ var _pages_tags_datavize_tags_datavize_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/tags-datavize/tags-datavize.component.ngfactory */ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ngfactory.js");
/* harmony import */ var _pages_admin_community_message_stats_admin_community_message_stats_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/admin-community-message-stats/admin-community-message-stats.component.ngfactory */ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ngfactory.js");
/* harmony import */ var _pages_admin_community_settings_admin_community_settings_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/admin-community-settings/admin-community-settings.component.ngfactory */ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ngfactory.js");
/* harmony import */ var _shared_modules_cloudinary_components_upload_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/modules/cloudinary/components/upload/component.ngfactory */ "./src/app/shared/modules/cloudinary/components/upload/component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../core/services/auth/session.service */ "./src/app/core/services/auth/session.service.ts");
/* harmony import */ var _ngx_pwa_local_storage__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ngx-pwa/local-storage */ "./node_modules/@ngx-pwa/local-storage/fesm5/ngx-pwa-local-storage.js");
/* harmony import */ var _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../core/services/auth/headerBag */ "./src/app/core/services/auth/headerBag.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../../shared/modules/pipesModule/pipes.module */ "./src/app/shared/modules/pipesModule/pipes.module.ts");
/* harmony import */ var _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../profile/modules/profilImage/profileImage.module */ "./src/app/modules/profile/modules/profilImage/profileImage.module.ts");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/esm5/badge.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/cdk/stepper */ "./node_modules/@angular/cdk/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ../../shared/modules/material/material.module */ "./src/app/shared/modules/material/material.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _admin_community_routing_module__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./admin-community-routing.module */ "./src/app/modules/admin-community/admin-community-routing.module.ts");
/* harmony import */ var _users_modules_user_ui_user_ui_module__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ../users/modules/user-ui/user-ui.module */ "./src/app/modules/users/modules/user-ui/user-ui.module.ts");
/* harmony import */ var ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ng2-file-upload/file-upload/file-upload.module */ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js");
/* harmony import */ var ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ../../shared/modules/cloudinary/components/upload/module */ "./src/app/shared/modules/cloudinary/components/upload/module.ts");
/* harmony import */ var _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ../../shared/modules/cloudinary/cloudinary.module */ "./src/app/shared/modules/cloudinary/cloudinary.module.ts");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ../profile/modules/form/form.module */ "./src/app/modules/profile/modules/form/form.module.ts");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var _pages_admin_community_users_admin_community_users_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./pages/admin-community-users/admin-community-users.component */ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ts");
/* harmony import */ var _pages_tags_datavize_tags_datavize_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./pages/tags-datavize/tags-datavize.component */ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ts");
/* harmony import */ var _pages_admin_community_message_stats_admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./pages/admin-community-message-stats/admin-community-message-stats.component */ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ts");
/* harmony import */ var _pages_admin_community_settings_admin_community_settings_component__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./pages/admin-community-settings/admin-community-settings.component */ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








































































var AdminCommunityModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_admin_community_module__WEBPACK_IMPORTED_MODULE_1__["AdminCommunityModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["TooltipComponentNgFactory"], _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_router_router_lNgFactory"], _node_modules_angular_material_dialog_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatDialogContainerNgFactory"], _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerContentNgFactory"], _node_modules_angular_material_datepicker_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["MatCalendarHeaderNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["MatSnackBarContainerNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["SimpleSnackBarNgFactory"], _shared_components_no_connection_toast_no_connection_toast_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["NoConnectionToastComponentNgFactory"], _pages_admin_community_users_admin_community_users_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["AdminCommunityUsersComponentNgFactory"], _pages_tags_datavize_tags_datavize_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["TagsDatavizeComponentNgFactory"], _pages_admin_community_message_stats_admin_community_message_stats_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["AdminCommunityMessageStatsComponentNgFactory"], _pages_admin_community_settings_admin_community_settings_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["AdminCommunitySettingsComponentNgFactory"], _shared_modules_cloudinary_components_upload_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["UploadComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_14__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_14__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MAT_TOOLTIP_SCROLL_STRATEGY"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__["HAMMER_GESTURE_CONFIG"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["GestureConfig"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MAT_HAMMER_OPTIONS"]], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatCommonModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_forms_forms_o"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_forms_forms_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_21__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_21__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MAT_DIALOG_SCROLL_STRATEGY"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialog"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialog"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"]], [2, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MAT_DIALOG_DEFAULT_OPTIONS"]], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MAT_DIALOG_SCROLL_STRATEGY"], [3, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialog"]], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayContainer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MatDatepickerIntl"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MatDatepickerIntl"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MAT_DATEPICKER_SCROLL_STRATEGY"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__["MAT_SELECT_SCROLL_STRATEGY"], _angular_material_select__WEBPACK_IMPORTED_MODULE_24__["MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__["MAT_MENU_SCROLL_STRATEGY"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__["ɵd24"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_26__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__["MatStepperIntl"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__["MAT_STEPPER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__["MatStepperIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MatSortHeaderIntl"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MAT_SORT_HEADER_INTL_PROVIDER_FACTORY"], [[3, _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MatSortHeaderIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorIntl"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MAT_PAGINATOR_INTL_PROVIDER_FACTORY"], [[3, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorIntl"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_30__["SessionService"], _core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_30__["SessionService"], [_ngx_pwa_local_storage__WEBPACK_IMPORTED_MODULE_31__["LocalStorage"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_32__["HeaderBag"], _core_services_auth_headerBag__WEBPACK_IMPORTED_MODULE_32__["HeaderBag"], [_core_services_auth_session_service__WEBPACK_IMPORTED_MODULE_30__["SessionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["AngularDelegate"], _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["AngularDelegate"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["ModalController"], [_ionic_angular__WEBPACK_IMPORTED_MODULE_33__["AngularDelegate"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["PopoverController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["PopoverController"], [_ionic_angular__WEBPACK_IMPORTED_MODULE_33__["AngularDelegate"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_13__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_26__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_26__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_14__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_14__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_34__["A11yModule"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_34__["A11yModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_35__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_35__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_36__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_36__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MatTooltipModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MatTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_37__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_37__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_37__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_37__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_38__["PipesModule"], _shared_modules_pipesModule_pipes_module__WEBPACK_IMPORTED_MODULE_38__["PipesModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_39__["ProfileImageModule"], _profile_modules_profilImage_profileImage_module__WEBPACK_IMPORTED_MODULE_39__["ProfileImageModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_21__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_21__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_badge__WEBPACK_IMPORTED_MODULE_40__["MatBadgeModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_40__["MatBadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_41__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_41__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_42__["MatButtonToggleModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_42__["MatButtonToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_chips__WEBPACK_IMPORTED_MODULE_43__["MatChipsModule"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_43__["MatChipsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialogModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MatDatepickerModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MatDatepickerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_44__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_44__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_45__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_45__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_46__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_46__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__["MatSelectModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_24__["MatSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_47__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_47__["MatCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__["MatMenuModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__["MatMenuModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["NativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatNativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatNativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_48__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_48__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_49__["CdkStepperModule"], _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_49__["CdkStepperModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__["MatStepperModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_27__["MatStepperModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_50__["MatProgressSpinnerModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_50__["MatProgressSpinnerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_table__WEBPACK_IMPORTED_MODULE_51__["CdkTableModule"], _angular_cdk_table__WEBPACK_IMPORTED_MODULE_51__["CdkTableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_table__WEBPACK_IMPORTED_MODULE_52__["MatTableModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_52__["MatTableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MatSortModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__["MatSortModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_53__["MatProgressBarModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_53__["MatProgressBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_54__["MatSlideToggleModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_54__["MatSlideToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_55__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_55__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_56__["MatSnackBarModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_56__["MatSnackBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_57__["MaterialModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_57__["MaterialModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_shared_module__WEBPACK_IMPORTED_MODULE_58__["SharedModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_58__["SharedModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _admin_community_routing_module__WEBPACK_IMPORTED_MODULE_59__["AdminCommunityRoutingModule"], _admin_community_routing_module__WEBPACK_IMPORTED_MODULE_59__["AdminCommunityRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _users_modules_user_ui_user_ui_module__WEBPACK_IMPORTED_MODULE_60__["UserUiModule"], _users_modules_user_ui_user_ui_module__WEBPACK_IMPORTED_MODULE_60__["UserUiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_29__["MatPaginatorModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_61__["FileUploadModule"], ng2_file_upload_file_upload_file_upload_module__WEBPACK_IMPORTED_MODULE_61__["FileUploadModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_62__["UploadModule"], _shared_modules_cloudinary_components_upload_module__WEBPACK_IMPORTED_MODULE_62__["UploadModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_63__["CloudinaryModule"], _shared_modules_cloudinary_cloudinary_module__WEBPACK_IMPORTED_MODULE_63__["CloudinaryModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slider__WEBPACK_IMPORTED_MODULE_64__["MatSliderModule"], _angular_material_slider__WEBPACK_IMPORTED_MODULE_64__["MatSliderModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_radio__WEBPACK_IMPORTED_MODULE_65__["MatRadioModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_65__["MatRadioModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["IonicModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_33__["IonicModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_66__["ProfileFormModule"], _profile_modules_form_form_module__WEBPACK_IMPORTED_MODULE_66__["ProfileFormModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _admin_community_module__WEBPACK_IMPORTED_MODULE_1__["AdminCommunityModule"], _admin_community_module__WEBPACK_IMPORTED_MODULE_1__["AdminCommunityModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_chips__WEBPACK_IMPORTED_MODULE_43__["MAT_CHIPS_DEFAULT_OPTIONS"], { separatorKeyCodes: [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_67__["ENTER"]] }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MAT_DATE_FORMATS"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MAT_NATIVE_DATE_FORMATS"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_37__["ROUTES"], function () { return [[{ path: "users", component: _pages_admin_community_users_admin_community_users_component__WEBPACK_IMPORTED_MODULE_68__["AdminCommunityUsersComponent"] }, { path: "tags", component: _pages_tags_datavize_tags_datavize_component__WEBPACK_IMPORTED_MODULE_69__["TagsDatavizeComponent"] }, { path: "stats", component: _pages_admin_community_message_stats_admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_70__["AdminCommunityMessageStatsComponent"] }, { path: "settings", component: _pages_admin_community_settings_admin_community_settings_component__WEBPACK_IMPORTED_MODULE_71__["AdminCommunitySettingsComponent"] }, { path: "", redirectTo: "/dashboard/community-admin/tags", pathMatch: "full" }]]; }, [])]); });



/***/ }),

/***/ "./src/app/modules/admin-community/admin-community.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/modules/admin-community/admin-community.module.ts ***!
  \*******************************************************************/
/*! exports provided: AdminCommunityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityModule", function() { return AdminCommunityModule; });
var AdminCommunityModule = /** @class */ (function () {
    function AdminCommunityModule() {
    }
    return AdminCommunityModule;
}());



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ngfactory.js":
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ngfactory.js ***!
  \**********************************************************************************************************************************/
/*! exports provided: RenderType_AdminCommunityMessageStatsComponent, View_AdminCommunityMessageStatsComponent_0, View_AdminCommunityMessageStatsComponent_Host_0, AdminCommunityMessageStatsComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AdminCommunityMessageStatsComponent", function() { return RenderType_AdminCommunityMessageStatsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunityMessageStatsComponent_0", function() { return View_AdminCommunityMessageStatsComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunityMessageStatsComponent_Host_0", function() { return View_AdminCommunityMessageStatsComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityMessageStatsComponentNgFactory", function() { return AdminCommunityMessageStatsComponentNgFactory; });
/* harmony import */ var _admin_community_message_stats_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-community-message-stats.component.scss.shim.ngstyle */ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/layouts/dash-page-layout/dash-page-layout.component.ngfactory */ "./src/app/shared/layouts/dash-page-layout/dash-page-layout.component.ngfactory.js");
/* harmony import */ var _shared_layouts_dash_page_layout_dash_page_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/layouts/dash-page-layout/dash-page-layout.component */ "./src/app/shared/layouts/dash-page-layout/dash-page-layout.component.ts");
/* harmony import */ var _admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin-community-message-stats.component */ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ts");
/* harmony import */ var _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../core/services/user/profile.service */ "./src/app/core/services/user/profile.service.ts");
/* harmony import */ var _core_services_communityAdmin_community_admin_message_stats_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../core/services/communityAdmin/community-admin-message-stats.service */ "./src/app/core/services/communityAdmin/community-admin-message-stats.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var styles_AdminCommunityMessageStatsComponent = [_admin_community_message_stats_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AdminCommunityMessageStatsComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AdminCommunityMessageStatsComponent, data: {} });

function View_AdminCommunityMessageStatsComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 23, "div", [["class", "AdminCommunityMessageStats-main"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 6, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](3, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 3, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["conversation"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 6, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](10, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 3, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["membre"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 8, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](17, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](18, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 4, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["conversation"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" par personne"]))], function (_ck, _v) { var currVal_1 = (_v.context.ngIf.global.conversations > 1); _ck(_v, 7, 0, currVal_1); var currVal_3 = (_v.context.ngIf.global.people > 1); _ck(_v, 14, 0, currVal_3); var currVal_5 = (_v.context.ngIf.global.averageConversation > 1); _ck(_v, 22, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = _v.context.ngIf.global.conversations; _ck(_v, 3, 0, currVal_0); var currVal_2 = _v.context.ngIf.global.people; _ck(_v, 10, 0, currVal_2); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 17, 0, _ck(_v, 18, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v.parent, 0), _v.context.ngIf.global.averageConversation, "1.0-0")); _ck(_v, 17, 0, currVal_4); }); }
function View_AdminCommunityMessageStatsComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["x"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_9(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["s"]))], null, null); }
function View_AdminCommunityMessageStatsComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 20, "div", [["class", "AdminCommunityMessageStats-pastWeek"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 9, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](3, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 6, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["nouvelle"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" conversation"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 9, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](13, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 6, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["nouveau"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" membre"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityMessageStatsComponent_9)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_1 = (_v.context.ngIf.lastWeek.conversations > 1); _ck(_v, 7, 0, currVal_1); var currVal_2 = (_v.context.ngIf.lastWeek.conversations > 1); _ck(_v, 10, 0, currVal_2); var currVal_4 = (_v.context.ngIf.lastWeek.people > 1); _ck(_v, 17, 0, currVal_4); var currVal_5 = (_v.context.ngIf.lastWeek.people > 1); _ck(_v, 20, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = _v.context.ngIf.lastWeek.conversations; _ck(_v, 3, 0, currVal_0); var currVal_3 = _v.context.ngIf.lastWeek.people; _ck(_v, 13, 0, currVal_3); }); }
function View_AdminCommunityMessageStatsComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["DecimalPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 12, "app-dash-page-layout", [["title", "Statistiques d'usage"]], null, null, null, _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_DashPageLayoutComponent_0"], _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_DashPageLayoutComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _shared_layouts_dash_page_layout_dash_page_layout_component__WEBPACK_IMPORTED_MODULE_4__["DashPageLayoutComponent"], [], { title: [0, "title"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 10, "div", [["class", "AdminCommunityMessageStats"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Global"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 2, null, View_AdminCommunityMessageStatsComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Activit\u00E9 de la semaine pass\u00E9e"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 2, null, View_AdminCommunityMessageStatsComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Statistiques d'usage"; _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 7, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).transform(_co.stats$)); _ck(_v, 7, 0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 12, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).transform(_co.stats$)); _ck(_v, 12, 0, currVal_2); }, null); }
function View_AdminCommunityMessageStatsComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-admin-community-message-stats", [], null, null, null, View_AdminCommunityMessageStatsComponent_0, RenderType_AdminCommunityMessageStatsComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_5__["AdminCommunityMessageStatsComponent"], [_core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_6__["ProfileService"], _core_services_communityAdmin_community_admin_message_stats_service__WEBPACK_IMPORTED_MODULE_7__["CommunityAdminMessageStatsService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AdminCommunityMessageStatsComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-admin-community-message-stats", _admin_community_message_stats_component__WEBPACK_IMPORTED_MODULE_5__["AdminCommunityMessageStatsComponent"], View_AdminCommunityMessageStatsComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.scss.shim.ngstyle.js":
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.scss.shim.ngstyle.js ***!
  \******************************************************************************************************************************************/
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
var styles = [".AdminCommunityMessageStats[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 40px;\n}\n.AdminCommunityMessageStats-main[_ngcontent-%COMP%], .AdminCommunityMessageStats-pastWeek[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  padding-bottom: 30px;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n.AdminCommunityMessageStats-main[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .AdminCommunityMessageStats-pastWeek[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.AdminCommunityMessageStats-main[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .AdminCommunityMessageStats-pastWeek[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}"];



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-message-stats/admin-community-message-stats.component.ts ***!
  \************************************************************************************************************************/
/*! exports provided: AdminCommunityMessageStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityMessageStatsComponent", function() { return AdminCommunityMessageStatsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_services_communityAdmin_community_admin_message_stats_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/core/services/communityAdmin/community-admin-message-stats.service */ "./src/app/core/services/communityAdmin/community-admin-message-stats.service.ts");
/* harmony import */ var _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/services/user/profile.service */ "./src/app/core/services/user/profile.service.ts");



var AdminCommunityMessageStatsComponent = /** @class */ (function () {
    function AdminCommunityMessageStatsComponent(_profileService, _messageStatsService) {
        this._profileService = _profileService;
        this._messageStatsService = _messageStatsService;
    }
    AdminCommunityMessageStatsComponent.prototype.ngOnInit = function () {
        var user = this._profileService.profile;
        this._messageStatsService.get(user.admin_domain.id).subscribe();
    };
    Object.defineProperty(AdminCommunityMessageStatsComponent.prototype, "stats$", {
        get: function () {
            return this._messageStatsService.stats();
        },
        enumerable: true,
        configurable: true
    });
    return AdminCommunityMessageStatsComponent;
}());



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ngfactory.js":
/*!************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ngfactory.js ***!
  \************************************************************************************************************************/
/*! exports provided: RenderType_AdminCommunitySettingsComponent, View_AdminCommunitySettingsComponent_0, View_AdminCommunitySettingsComponent_Host_0, AdminCommunitySettingsComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AdminCommunitySettingsComponent", function() { return RenderType_AdminCommunitySettingsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunitySettingsComponent_0", function() { return View_AdminCommunitySettingsComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunitySettingsComponent_Host_0", function() { return View_AdminCommunitySettingsComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunitySettingsComponentNgFactory", function() { return AdminCommunitySettingsComponentNgFactory; });
/* harmony import */ var _admin_community_settings_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-community-settings.component.scss.shim.ngstyle */ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _shared_components_copy_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/components/copy/component.ngfactory */ "./src/app/shared/components/copy/component.ngfactory.js");
/* harmony import */ var _shared_components_copy_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/components/copy/component */ "./src/app/shared/components/copy/component.ts");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _shared_modules_cloudinary_components_image_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../shared/modules/cloudinary/components/image/component.ngfactory */ "./src/app/shared/modules/cloudinary/components/image/component.ngfactory.js");
/* harmony import */ var _shared_modules_cloudinary_components_image_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../shared/modules/cloudinary/components/image/component */ "./src/app/shared/modules/cloudinary/components/image/component.ts");
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../core/services/toast.service */ "./src/app/core/services/toast.service.ts");
/* harmony import */ var _shared_directives_hide_menu_mobile_on_focus_directive__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../shared/directives/hide-menu-mobile-on-focus.directive */ "./src/app/shared/directives/hide-menu-mobile-on-focus.directive.ts");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/fesm5/ngx-device-detector.js");
/* harmony import */ var _core_services_layout_footer_mobile__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../core/services/layout/footer-mobile */ "./src/app/core/services/layout/footer-mobile.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _admin_community_settings_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin-community-settings.component */ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ts");
/* harmony import */ var _core_services_communityAdmin_community_admin_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../core/services/communityAdmin/community-admin.service */ "./src/app/core/services/communityAdmin/community-admin.service.ts");
/* harmony import */ var _core_services_dialog_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../core/services/dialog.service */ "./src/app/core/services/dialog.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


























var styles_AdminCommunitySettingsComponent = [_admin_community_settings_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AdminCommunitySettingsComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AdminCommunitySettingsComponent, data: {} });

function View_AdminCommunitySettingsComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 13, "mat-form-field", [["appearance", "outline"], ["class", "mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 7520256, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { appearance: [0, "appearance"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 10, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, 1, 2, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["id", "communityLinkInput"], ["matInput", ""]], [[2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "blur"], [null, "focus"], [null, "input"]], function (_v, en, $event) { var ad = true; if (("blur" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._focusChanged(false) !== false);
        ad = (pd_0 && ad);
    } if (("focus" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._focusChanged(true) !== false);
        ad = (pd_1 && ad);
    } if (("input" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._onInput() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], [8, null], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { disabled: [0, "disabled"], id: [1, "id"], value: [2, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[8, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 1, 1, "copy", [], null, null, null, _shared_components_copy_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_CopyComponent_0"], _shared_components_copy_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_CopyComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 114688, null, 0, _shared_components_copy_component__WEBPACK_IMPORTED_MODULE_12__["CopyComponent"], [], { data: [0, "data"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_22 = "outline"; _ck(_v, 1, 0, currVal_22); var currVal_32 = true; var currVal_33 = "communityLinkInput"; var currVal_34 = _co.link; _ck(_v, 10, 0, currVal_32, currVal_33, currVal_34); var currVal_35 = _co.link; _ck(_v, 13, 0, currVal_35); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "standard"); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "fill"); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "outline"); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "legacy"); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.errorState; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._canLabelFloat; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldLabelFloat(); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._hasFloatingLabel(); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._hideControlPlaceholder(); var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.disabled; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.autofilled; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.focused; var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).color == "accent"); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).color == "warn"); var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("untouched"); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("touched"); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("pristine"); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("dirty"); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("valid"); var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("invalid"); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("pending"); var currVal_21 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationsEnabled; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21]); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._isServer; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).id; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).placeholder; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).disabled; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).required; var currVal_28 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._isNativeSelect) || null); var currVal_29 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._ariaDescribedby || null); var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).errorState; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).required.toString(); _ck(_v, 9, 0, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31); }); }
function View_AdminCommunitySettingsComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "button", [["class", "bold"], ["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changeNewInviteLink() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["G\u00E9n\u00E9rer un nouveau lien d'invitation"]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_AdminCommunitySettingsComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "button", [["class", "bold"], ["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changeNewInviteLink() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["G\u00E9n\u00E9rer un lien d'invitation"]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_AdminCommunitySettingsComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 50, "section", [["class", "AdminCommunitySettings"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h1", [["class", "center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Param\u00E8tres de la communaut\u00E9"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 47, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 46, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 45, "div", [["class", "col-12 col-md-10 col-lg-8 col-xl-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 44, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_forms_forms_z"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 4, "div", [["class", "AdminCommunitySettings-imageUpload"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Image de la communaut\u00E9"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 1, "app-upload-form-image", [["url", "/api/community-admin/uploadCommunityImage"]], null, null, null, _shared_modules_cloudinary_components_image_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_UploadFormImageComponent_0"], _shared_modules_cloudinary_components_image_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_UploadFormImageComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 114688, null, 0, _shared_modules_cloudinary_components_image_component__WEBPACK_IMPORTED_MODULE_17__["UploadFormImageComponent"], [_core_services_toast_service__WEBPACK_IMPORTED_MODULE_18__["ToastService"]], { parentForm: [0, "parentForm"], url: [1, "url"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 23, "div", [["class", "AdminCommunitySettings-name"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Nom de la communaut\u00E9"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 17, "mat-form-field", [["appearance", "fill"], ["class", "mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 7520256, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { appearance: [0, "appearance"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, 1, 8, "input", [["appHideMenuMobileOnFocus", ""], ["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "name"], ["id", "communityNameInput"], ["matInput", ""]], [[2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._onInput() !== false);
        ad = (pd_6 && ad);
    } if (("focus" === en)) {
        var pd_7 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).setInputFocus() !== false);
        ad = (pd_7 && ad);
    } if (("blur" === en)) {
        var pd_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).setInputFocusOut() !== false);
        ad = (pd_8 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_forms_forms_q"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_10__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { id: [0, "id"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 16384, null, 0, _shared_directives_hide_menu_mobile_on_focus_directive__WEBPACK_IMPORTED_MODULE_19__["HideMenuMobileOnFocusDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], ngx_device_detector__WEBPACK_IMPORTED_MODULE_20__["DeviceDetectorService"], _core_services_layout_footer_mobile__WEBPACK_IMPORTED_MODULE_21__["FooterMobileService"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 2, "button", [["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changeName() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Enregistrer le changement"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 8, "div", [["class", "AdminCommunitySettings-link"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Lien d'invitation \u00E0 la communaut\u00E9"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunitySettingsComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_22__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunitySettingsComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](48, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_22__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunitySettingsComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](50, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_22__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.communityForm; _ck(_v, 8, 0, currVal_7); var currVal_8 = _co.communityForm; var currVal_9 = "/api/community-admin/uploadCommunityImage"; _ck(_v, 15, 0, currVal_8, currVal_9); var currVal_32 = "fill"; _ck(_v, 21, 0, currVal_32); var currVal_49 = "name"; _ck(_v, 32, 0, currVal_49); var currVal_50 = "communityNameInput"; _ck(_v, 34, 0, currVal_50); var currVal_53 = !_co.communityNameControl.dirty; var currVal_54 = "primary"; _ck(_v, 39, 0, currVal_53, currVal_54); var currVal_55 = _co.hasLink; _ck(_v, 46, 0, currVal_55); var currVal_56 = _co.hasLink; _ck(_v, 48, 0, currVal_56); var currVal_57 = !_co.hasLink; _ck(_v, 50, 0, currVal_57); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassUntouched; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassTouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassPristine; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassDirty; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassValid; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassInvalid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).ngClassPending; _ck(_v, 6, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).appearance == "standard"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).appearance == "fill"); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).appearance == "outline"); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).appearance == "legacy"); var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._control.errorState; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._canLabelFloat; var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldLabelFloat(); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._hasFloatingLabel(); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._hideControlPlaceholder(); var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._control.disabled; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._control.autofilled; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._control.focused; var currVal_22 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).color == "accent"); var currVal_23 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).color == "warn"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("untouched"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("touched"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("pristine"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("dirty"); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("valid"); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("invalid"); var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._shouldForward("pending"); var currVal_31 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._animationsEnabled; _ck(_v, 20, 1, [currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31]); var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._isServer; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).id; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).placeholder; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).disabled; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).required; var currVal_38 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._isNativeSelect) || null); var currVal_39 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._ariaDescribedby || null); var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).errorState; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).required.toString(); var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassUntouched; var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassTouched; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassPristine; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassDirty; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassValid; var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassInvalid; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).ngClassPending; _ck(_v, 29, 1, [currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48]); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).disabled || null); var currVal_52 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._animationMode === "NoopAnimations"); _ck(_v, 38, 0, currVal_51, currVal_52); }); }
function View_AdminCommunitySettingsComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunitySettingsComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_22__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.loaded; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AdminCommunitySettingsComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-admin-community-settings", [], null, null, null, View_AdminCommunitySettingsComponent_0, RenderType_AdminCommunitySettingsComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _admin_community_settings_component__WEBPACK_IMPORTED_MODULE_23__["AdminCommunitySettingsComponent"], [_core_services_communityAdmin_community_admin_service__WEBPACK_IMPORTED_MODULE_24__["CommunityAdminService"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"], _core_services_dialog_service__WEBPACK_IMPORTED_MODULE_25__["DialogService"], _core_services_toast_service__WEBPACK_IMPORTED_MODULE_18__["ToastService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AdminCommunitySettingsComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-admin-community-settings", _admin_community_settings_component__WEBPACK_IMPORTED_MODULE_23__["AdminCommunitySettingsComponent"], View_AdminCommunitySettingsComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.scss.shim.ngstyle.js":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.scss.shim.ngstyle.js ***!
  \********************************************************************************************************************************/
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
var styles = ["section[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: white;\n  padding-bottom: 30px;\n  padding-top: 30px;\n}\nsection[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  padding: 20px 0 30px;\n}\n.AdminCommunitySettings-imageUpload[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.AdminCommunitySettings-name[_ngcontent-%COMP%], .AdminCommunitySettings-link[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}"];



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-settings/admin-community-settings.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: AdminCommunitySettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunitySettingsComponent", function() { return AdminCommunitySettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_services_communityAdmin_community_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/core/services/communityAdmin/community-admin.service */ "./src/app/core/services/communityAdmin/community-admin.service.ts");
/* harmony import */ var _core_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/core/services/dialog.service */ "./src/app/core/services/dialog.service.ts");
/* harmony import */ var _core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/core/components/destroy-observable */ "./src/app/core/components/destroy-observable.ts");
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/core/services/toast.service */ "./src/app/core/services/toast.service.ts");
/* harmony import */ var _config_navigation_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/config/navigation/nav */ "./src/app/config/navigation/nav.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
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









var AdminCommunitySettingsComponent = /** @class */ (function (_super) {
    __extends(AdminCommunitySettingsComponent, _super);
    function AdminCommunitySettingsComponent(_communityAdminService, _fb, _dialogService, _toastr) {
        var _this = _super.call(this) || this;
        _this._communityAdminService = _communityAdminService;
        _this._fb = _fb;
        _this._dialogService = _dialogService;
        _this._toastr = _toastr;
        _this.communityForm = _this._fb.group({
            image: null,
            name: null,
            link: null,
        });
        return _this;
    }
    AdminCommunitySettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._communityAdminService.community$.subscribe(function (community) {
            _this.communityForm.get('image').setValue(community.image);
            _this.communityForm.get('name').setValue(community.name);
            _this.communityForm.get('link').setValue(community.invite_token ? community.invite_token.token : null);
        });
        this._communityAdminService.get().subscribe();
    };
    Object.defineProperty(AdminCommunitySettingsComponent.prototype, "loaded", {
        get: function () {
            return this._communityAdminService.loaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminCommunitySettingsComponent.prototype, "communityNameControl", {
        get: function () {
            return this.communityForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminCommunitySettingsComponent.prototype, "link", {
        get: function () {
            return "" + _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].publique + _config_navigation_nav__WEBPACK_IMPORTED_MODULE_7__["NAV"].signup + "?community_token=" + this.communityForm.get('link').value;
        },
        enumerable: true,
        configurable: true
    });
    AdminCommunitySettingsComponent.prototype.changeName = function () {
        var _this = this;
        this._dialogService
            .confirm('Changement de Nom', 'Etes-vous sûr de vouloir changer le nom de la communauté ?')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroy$))
            .subscribe(function (hasConfirmed) {
            if (hasConfirmed) {
                _this.updateName();
            }
        });
    };
    Object.defineProperty(AdminCommunitySettingsComponent.prototype, "hasLink", {
        get: function () {
            return !!this.communityForm.get('link').value;
        },
        enumerable: true,
        configurable: true
    });
    AdminCommunitySettingsComponent.prototype.changeNewInviteLink = function () {
        var _this = this;
        this._communityAdminService.generateNewInviteToken().subscribe(function () {
            _this._toastr.success('Un nouveau token a été généré');
        }, function () {
        });
    };
    AdminCommunitySettingsComponent.prototype.updateName = function () {
        var _this = this;
        this._communityAdminService.put({ name: this.communityNameControl.value }).subscribe(function () {
            _this._toastr.success('Changement du nom effectué !');
        }, function () {
        });
    };
    return AdminCommunitySettingsComponent;
}(_core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_5__["DestroyObservable"]));



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ngfactory.js":
/*!******************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ngfactory.js ***!
  \******************************************************************************************************************/
/*! exports provided: RenderType_AdminCommunityUsersComponent, View_AdminCommunityUsersComponent_0, View_AdminCommunityUsersComponent_Host_0, AdminCommunityUsersComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AdminCommunityUsersComponent", function() { return RenderType_AdminCommunityUsersComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunityUsersComponent_0", function() { return View_AdminCommunityUsersComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AdminCommunityUsersComponent_Host_0", function() { return View_AdminCommunityUsersComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityUsersComponentNgFactory", function() { return AdminCommunityUsersComponentNgFactory; });
/* harmony import */ var _admin_community_users_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-community-users.component.scss.shim.ngstyle */ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_progress_spinner_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/progress-spinner/typings/index.ngfactory */ "./node_modules/@angular/material/progress-spinner/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _users_modules_user_ui_components_users_list_users_list_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../users/modules/user-ui/components/users-list/users-list.component.ngfactory */ "./src/app/modules/users/modules/user-ui/components/users-list/users-list.component.ngfactory.js");
/* harmony import */ var _users_modules_user_ui_components_users_list_users_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../users/modules/user-ui/components/users-list/users-list.component */ "./src/app/modules/users/modules/user-ui/components/users-list/users-list.component.ts");
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../core/services/toast.service */ "./src/app/core/services/toast.service.ts");
/* harmony import */ var _core_services_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../core/services/dialog.service */ "./src/app/core/services/dialog.service.ts");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory */ "./node_modules/@angular/material/icon/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _users_modules_user_ui_components_user_form_user_form_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../users/modules/user-ui/components/user-form/user-form.component.ngfactory */ "./src/app/modules/users/modules/user-ui/components/user-form/user-form.component.ngfactory.js");
/* harmony import */ var _users_modules_user_ui_components_user_form_user_form_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../users/modules/user-ui/components/user-form/user-form.component */ "./src/app/modules/users/modules/user-ui/components/user-form/user-form.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _users_services_admin_users_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../users/services/admin-users.service */ "./src/app/modules/users/services/admin-users.service.ts");
/* harmony import */ var _core_services_admin_admin_community_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../core/services/admin/admin-community.service */ "./src/app/core/services/admin/admin-community.service.ts");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _node_modules_angular_material_paginator_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/paginator/typings/index.ngfactory */ "./node_modules/@angular/material/paginator/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _admin_community_users_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./admin-community-users.component */ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ts");
/* harmony import */ var _core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../core/services/auth/auth.service */ "./src/app/core/services/auth/auth.service.ts");
/* harmony import */ var _core_services_communityAdmin_community_admin_users_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../../core/services/communityAdmin/community-admin-users.service */ "./src/app/core/services/communityAdmin/community-admin-users.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
































var styles_AdminCommunityUsersComponent = [_admin_community_users_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AdminCommunityUsersComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AdminCommunityUsersComponent, data: {} });

function View_AdminCommunityUsersComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "Users-list--loading"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "mat-spinner", [["class", "mat-spinner mat-progress-spinner"], ["mode", "indeterminate"], ["role", "progressbar"]], [[2, "_mat-animation-noopable", null], [4, "width", "px"], [4, "height", "px"]], null, null, _node_modules_angular_material_progress_spinner_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatSpinner_0"], _node_modules_angular_material_progress_spinner_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatSpinner"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatSpinner"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS"]], null, null)], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._noopAnimations; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).diameter; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).diameter; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AdminCommunityUsersComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "app-users-list", [], null, [[null, "editUser"], [null, "deleteUser"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("editUser" === en)) {
        var pd_0 = (_co.showEditForm($event) !== false);
        ad = (pd_0 && ad);
    } if (("deleteUser" === en)) {
        var pd_1 = (_co.deleteUser($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, _users_modules_user_ui_components_users_list_users_list_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["View_UsersListComponent_0"], _users_modules_user_ui_components_users_list_users_list_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["RenderType_UsersListComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _users_modules_user_ui_components_users_list_users_list_component__WEBPACK_IMPORTED_MODULE_8__["UsersListComponent"], [_core_services_toast_service__WEBPACK_IMPORTED_MODULE_9__["ToastService"], _core_services_dialog_service__WEBPACK_IMPORTED_MODULE_10__["DialogService"]], { users: [0, "users"], displayedColumns: [1, "displayedColumns"], actions: [2, "actions"] }, { editUser: "editUser", deleteUser: "deleteUser" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](2, 3), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](3, 1)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.usersToShow; var currVal_1 = _ck(_v, 2, 0, "name", "tags", "actions"); var currVal_2 = _ck(_v, 3, 0, "revoke"); _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AdminCommunityUsersComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "button", [["class", "font-weight-bold"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showEditForm() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_13__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 2, "mat-icon", [["class", "mat-icon notranslate"], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["add"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Ajouter un utilisateur d\u00E9j\u00E0 pr\u00E9sent sur la plateforme "]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); _ck(_v, 3, 0); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).inline; var currVal_4 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "warn")); _ck(_v, 2, 0, currVal_3, currVal_4); }); }
function View_AdminCommunityUsersComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Ajouter un utilisateur "]))], null, null); }
function View_AdminCommunityUsersComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Modifier un utilisateur "]))], null, null); }
function View_AdminCommunityUsersComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "app-user-form", [], null, [[null, "onCloseEditUser"], [null, "createUser"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onCloseEditUser" === en)) {
        var pd_0 = (_co.closeUserForm() !== false);
        ad = (pd_0 && ad);
    } if (("createUser" === en)) {
        var pd_1 = (_co.createUser($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, _users_modules_user_ui_components_user_form_user_form_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_UserFormComponent_0"], _users_modules_user_ui_components_user_form_user_form_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_UserFormComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 770048, [[1, 4]], 0, _users_modules_user_ui_components_user_form_user_form_component__WEBPACK_IMPORTED_MODULE_17__["UserFormComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormBuilder"], _users_services_admin_users_service__WEBPACK_IMPORTED_MODULE_19__["AdminUsersService"], _core_services_toast_service__WEBPACK_IMPORTED_MODULE_9__["ToastService"], _core_services_admin_admin_community_service__WEBPACK_IMPORTED_MODULE_20__["AdminCommunityService"]], { user: [0, "user"], fields: [1, "fields"], isCreating: [2, "isCreating"], groupEditable: [3, "groupEditable"] }, { onCloseEditUser: "onCloseEditUser", createUser: "createUser" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](2, 1)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.editedUser; var currVal_1 = _ck(_v, 2, 0, "email"); var currVal_2 = true; var currVal_3 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_AdminCommunityUsersComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "app-user-form", [], null, [[null, "onCloseEditUser"], [null, "updateUser"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onCloseEditUser" === en)) {
        var pd_0 = (_co.closeUserForm() !== false);
        ad = (pd_0 && ad);
    } if (("updateUser" === en)) {
        var pd_1 = (_co.updateUser($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, _users_modules_user_ui_components_user_form_user_form_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_UserFormComponent_0"], _users_modules_user_ui_components_user_form_user_form_component_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_UserFormComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 770048, [[1, 4]], 0, _users_modules_user_ui_components_user_form_user_form_component__WEBPACK_IMPORTED_MODULE_17__["UserFormComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormBuilder"], _users_services_admin_users_service__WEBPACK_IMPORTED_MODULE_19__["AdminUsersService"], _core_services_toast_service__WEBPACK_IMPORTED_MODULE_9__["ToastService"], _core_services_admin_admin_community_service__WEBPACK_IMPORTED_MODULE_20__["AdminCommunityService"]], { user: [0, "user"], fields: [1, "fields"], isCreating: [2, "isCreating"], groupEditable: [3, "groupEditable"] }, { onCloseEditUser: "onCloseEditUser", updateUser: "updateUser" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](2, 2)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.editedUser; var currVal_1 = _ck(_v, 2, 0, "first_name", "last_name"); var currVal_2 = false; var currVal_3 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_AdminCommunityUsersComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 9, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 4, "div", [["class", "Users-form"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isCreatingUser; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.isCreatingUser; _ck(_v, 4, 0, currVal_1); var currVal_2 = _co.isCreatingUser; _ck(_v, 7, 0, currVal_2); var currVal_3 = !_co.isCreatingUser; _ck(_v, 9, 0, currVal_3); }, null); }
function View_AdminCommunityUsersComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { userForm: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](402653184, 2, { paginator: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 45, "div", [["class", "Users"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 39, "div", [["class", "Users-list"]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 31, "div", [["class", "Users-list-header"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Utilisateurs "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 28, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵangular_packages_forms_forms_z"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 23, "mat-form-field", [["appearance", "outline"], ["class", "mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_21__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_21__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 7520256, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_24__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { appearance: [0, "appearance"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 4, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 5, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, 3, 2, "mat-label", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 16384, [[5, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MatLabel"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Rechercher"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](24, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "query"], ["matInput", ""], ["placeholder", "Nom d'utilisateur, email"]], [[2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵangular_packages_forms_forms_q"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_26__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[3, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, 4, 3, "mat-icon", [["class", "mat-icon notranslate"], ["matSuffix", ""], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], null, null, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_14__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](33, 16384, [[9, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MatSuffix"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["search"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 4, "div", [["class", "Users-list-table"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](40, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 1, "mat-paginator", [["class", "mat-paginator"]], [[8, "hidden", 0]], null, null, _node_modules_angular_material_paginator_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_27__["View_MatPaginator_0"], _node_modules_angular_material_paginator_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_27__["RenderType_MatPaginator"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](42, 245760, [[2, 4]], 0, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginator"], [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginatorIntl"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { length: [0, "length"], pageSize: [1, "pageSize"], showFirstLastButtons: [2, "showFirstLastButtons"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, null, 4, "div", [["class", "Users-add"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AdminCommunityUsersComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](47, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.searchFilters; _ck(_v, 9, 0, currVal_8); var currVal_31 = "outline"; _ck(_v, 13, 0, currVal_31); var currVal_48 = "query"; _ck(_v, 27, 0, currVal_48); var currVal_49 = "Nom d'utilisateur, email"; _ck(_v, 29, 0, currVal_49); _ck(_v, 34, 0); var currVal_52 = !_co.loaded; _ck(_v, 37, 0, currVal_52); var currVal_53 = _co.usersToShow; _ck(_v, 40, 0, currVal_53); var currVal_55 = _co.countUsers; var currVal_56 = _co.PAGE_SIZE; var currVal_57 = true; _ck(_v, 42, 0, currVal_55, currVal_56, currVal_57); var currVal_58 = !_co.editUserFormVisible; _ck(_v, 45, 0, currVal_58); var currVal_59 = _co.editUserFormVisible; _ck(_v, 47, 0, currVal_59); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.editUserFormVisible; _ck(_v, 3, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassUntouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassTouched; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassPristine; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassDirty; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassValid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassInvalid; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).ngClassPending; _ck(_v, 7, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).appearance == "standard"); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).appearance == "fill"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).appearance == "outline"); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).appearance == "legacy"); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._control.errorState; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._canLabelFloat; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldLabelFloat(); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._hasFloatingLabel(); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._hideControlPlaceholder(); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._control.disabled; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._control.autofilled; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._control.focused; var currVal_21 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).color == "accent"); var currVal_22 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).color == "warn"); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("untouched"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("touched"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("pristine"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("dirty"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("valid"); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("invalid"); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._shouldForward("pending"); var currVal_30 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._animationsEnabled; _ck(_v, 12, 1, [currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30]); var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._isServer; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).id; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).placeholder; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).disabled; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).required; var currVal_37 = ((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._isNativeSelect) || null); var currVal_38 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29)._ariaDescribedby || null); var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).errorState; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).required.toString(); var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassUntouched; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassTouched; var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassPristine; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassDirty; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassValid; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassInvalid; var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassPending; _ck(_v, 24, 1, [currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47]); var currVal_50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).inline; var currVal_51 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).color !== "warn")); _ck(_v, 32, 0, currVal_50, currVal_51); var currVal_54 = (!_co.usersToShow && !_co.usersFiltered); _ck(_v, 41, 0, currVal_54); }); }
function View_AdminCommunityUsersComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-admin-community-users", [], null, null, null, View_AdminCommunityUsersComponent_0, RenderType_AdminCommunityUsersComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _admin_community_users_component__WEBPACK_IMPORTED_MODULE_29__["AdminCommunityUsersComponent"], [_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_30__["AuthenticationService"], _core_services_communityAdmin_community_admin_users_service__WEBPACK_IMPORTED_MODULE_31__["CommunityAdminUsersService"], _core_services_toast_service__WEBPACK_IMPORTED_MODULE_9__["ToastService"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormBuilder"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AdminCommunityUsersComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-admin-community-users", _admin_community_users_component__WEBPACK_IMPORTED_MODULE_29__["AdminCommunityUsersComponent"], View_AdminCommunityUsersComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.scss.shim.ngstyle.js":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.scss.shim.ngstyle.js ***!
  \**************************************************************************************************************************/
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
var styles = [".Users[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.Users-list-header[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.Users-list--loading[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n}\n.Users-list-table[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.Users-form[_ngcontent-%COMP%] {\n  max-width: 550px;\n}"];



/***/ }),

/***/ "./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/admin-community-users/admin-community-users.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: AdminCommunityUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCommunityUsersComponent", function() { return AdminCommunityUsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_entities_user_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/core/entities/user/entity */ "./src/app/core/entities/user/entity.ts");
/* harmony import */ var _modules_users_modules_user_ui_components_user_form_user_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/modules/users/modules/user-ui/components/user-form/user-form.component */ "./src/app/modules/users/modules/user-ui/components/user-form/user-form.component.ts");
/* harmony import */ var _core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/core/services/auth/auth.service */ "./src/app/core/services/auth/auth.service.ts");
/* harmony import */ var _core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/core/components/destroy-observable */ "./src/app/core/components/destroy-observable.ts");
/* harmony import */ var _core_services_communityAdmin_community_admin_users_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ~/core/services/communityAdmin/community-admin-users.service */ "./src/app/core/services/communityAdmin/community-admin-users.service.ts");
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~/core/services/toast.service */ "./src/app/core/services/toast.service.ts");
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











var AdminCommunityUsersComponent = /** @class */ (function (_super) {
    __extends(AdminCommunityUsersComponent, _super);
    function AdminCommunityUsersComponent(authenticationService, _userService, _toastr, fb) {
        var _this = _super.call(this) || this;
        _this.authenticationService = authenticationService;
        _this._userService = _userService;
        _this._toastr = _toastr;
        _this.fb = fb;
        _this.users$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        _this.editUserFormVisible = false;
        _this.isCreatingUser = false;
        _this.PAGE_SIZE = 10;
        return _this;
    }
    AdminCommunityUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        // listen to user list
        this._userService.users$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroy$)).subscribe(function (users) {
            _this.users$.next(users);
        });
        this.loadUsers();
        this.initSearchForm();
    };
    AdminCommunityUsersComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.users$, this.searchFilters.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () { return (_this.paginator.pageIndex = 0); })), this.paginator.page)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function () { return !!_this.users; }), // skip if users is not defined yet
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function () {
            _this.closeUserForm();
            var query = _this.searchFilters ? _this.searchFilters.controls.query.value : '';
            var page = _this.paginator.pageIndex;
            var start = Number(page) * _this.PAGE_SIZE;
            var end = Number(page) * _this.PAGE_SIZE + _this.PAGE_SIZE;
            _this.usersFiltered = _this.users.filter(function (u) { return (u.email + " " + u.first_name + " " + u.last_name + " " + u.tags.map(function (tag) { return tag.name; })
                .join()).toLowerCase().includes(query.toLowerCase()); });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_this.usersFiltered.slice(start, end));
        }))
            .subscribe(function (filteredUsers) {
            _this.usersToShow = filteredUsers;
        });
    };
    Object.defineProperty(AdminCommunityUsersComponent.prototype, "users", {
        get: function () {
            return this.users$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminCommunityUsersComponent.prototype, "loaded", {
        get: function () {
            return !!this.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminCommunityUsersComponent.prototype, "countUsers", {
        get: function () {
            return this.usersFiltered && this.usersFiltered.length;
        },
        enumerable: true,
        configurable: true
    });
    AdminCommunityUsersComponent.prototype.showEditForm = function (user) {
        if (user === void 0) { user = null; }
        var newUser = new _core_entities_user_entity__WEBPACK_IMPORTED_MODULE_5__["User"]({
            first_name: null,
            last_name: null,
            email: null,
            roles: [],
            domains: [],
        });
        this.editedUser =
            user === null
                ? newUser
                : user;
        this.isCreatingUser = !this.editedUser.id;
        this.editUserFormVisible = true;
    };
    AdminCommunityUsersComponent.prototype.closeUserForm = function () {
        this.editUserFormVisible = false;
    };
    AdminCommunityUsersComponent.prototype.errM = function (err) {
        console.log(err);
        if (err.status === 409) {
            this._toastr.error('Ce compte est déjà associé');
        }
        if (err.status === 404) {
            this._toastr.error("Cette adresse mail n'est pas présente sur la plateforme");
        }
    };
    AdminCommunityUsersComponent.prototype.createUser = function (params) {
        var _this = this;
        this._userService.createAndList(params).subscribe(function (data) {
            var user = _this._userService.user;
            _this.closeUserForm();
            _this._toastr.success("Un email a \u00E9t\u00E9 envoy\u00E9 \u00E0 " + params.email, "L'utilisateur " + user.first_name + " " + user.last_name + " a \u00E9t\u00E9 ajout\u00E9");
        }, function (err) { return _this.errM(err); });
    };
    AdminCommunityUsersComponent.prototype.updateUser = function (params) {
        var _this = this;
        this._userService.putAndList(__assign({}, params, { id: this.editedUser.id })).subscribe(function (data) {
            _this.closeUserForm();
            _this._toastr.success("Les informations ont bien \u00E9t\u00E9 modifi\u00E9es");
        }, function (err) { return _this.errM(err); });
    };
    AdminCommunityUsersComponent.prototype.loadUsers = function () {
        this._userService.list().subscribe();
    };
    AdminCommunityUsersComponent.prototype.initSearchForm = function () {
        this.searchFilters = this.fb.group({
            query: [''],
        });
    };
    AdminCommunityUsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this._userService
            .deleteAndList(user.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.destroy$))
            .subscribe(function () {
            _this._toastr.success("L'utilisateur " + user.first_name + " " + user.last_name + " a \u00E9t\u00E9 supprim\u00E9");
        }, function (err) {
            _this._toastr.error(err.message);
        });
    };
    return AdminCommunityUsersComponent;
}(_core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_8__["DestroyObservable"]));



/***/ }),

/***/ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ngfactory.js":
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ngfactory.js ***!
  \**************************************************************************************************/
/*! exports provided: RenderType_TagsDatavizeComponent, View_TagsDatavizeComponent_0, View_TagsDatavizeComponent_Host_0, TagsDatavizeComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_TagsDatavizeComponent", function() { return RenderType_TagsDatavizeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TagsDatavizeComponent_0", function() { return View_TagsDatavizeComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TagsDatavizeComponent_Host_0", function() { return View_TagsDatavizeComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsDatavizeComponentNgFactory", function() { return TagsDatavizeComponentNgFactory; });
/* harmony import */ var _tags_datavize_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tags-datavize.component.scss.shim.ngstyle */ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/components/emoji/emoji.component.ngfactory */ "./src/app/shared/components/emoji/emoji.component.ngfactory.js");
/* harmony import */ var _shared_components_emoji_emoji_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/emoji/emoji.component */ "./src/app/shared/components/emoji/emoji.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/layouts/dash-page-layout/dash-page-layout.component.ngfactory */ "./src/app/shared/layouts/dash-page-layout/dash-page-layout.component.ngfactory.js");
/* harmony import */ var _shared_layouts_dash_page_layout_dash_page_layout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/layouts/dash-page-layout/dash-page-layout.component */ "./src/app/shared/layouts/dash-page-layout/dash-page-layout.component.ts");
/* harmony import */ var _tags_datavize_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tags-datavize.component */ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ts");
/* harmony import */ var _tags_services_community_admin_tag_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../tags/services/community-admin-tag.service */ "./src/app/modules/tags/services/community-admin-tag.service.ts");
/* harmony import */ var _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../core/services/user/profile.service */ "./src/app/core/services/user/profile.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_TagsDatavizeComponent = [_tags_datavize_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_TagsDatavizeComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_TagsDatavizeComponent, data: {} });

function View_TagsDatavizeComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "TagsDatavize-box-tag"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "span", [], [[4, "borderColor", null], [4, "fontSize", null]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tagsGroupedByDomain[_v.parent.context.$implicit].tagDomain.hexcolor; var currVal_1 = _co.getFontSize(_v.context.$implicit.iteration); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_2); }); }
function View_TagsDatavizeComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 7, "div", [["class", "TagsDatavize-box-container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 3, "h6", [["class", "TagsDatavize-box-title"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "app-emoji", [], null, null, null, _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_EmojiComponent_0"], _shared_components_emoji_emoji_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_EmojiComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 49152, null, 0, _shared_components_emoji_emoji_component__WEBPACK_IMPORTED_MODULE_3__["EmojiComponent"], [], { emojiName: [0, "emojiName"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](4, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "div", [["class", "TagsDatavize-box"]], [[4, "borderColor", null]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_TagsDatavizeComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tagsGroupedByDomain[_v.context.$implicit].tagDomain.emoji; _ck(_v, 3, 0, currVal_0); var currVal_3 = _co.tagsGroupedByDomain[_v.context.$implicit].tags; _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.tagsGroupedByDomain[_v.context.$implicit].tagDomain.name; _ck(_v, 4, 0, currVal_1); var currVal_2 = (_co.tagsGroupedByDomain[_v.context.$implicit].tagDomain.hexcolor + 20); _ck(_v, 5, 0, currVal_2); }); }
function View_TagsDatavizeComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "TagsDatavize"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_TagsDatavizeComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tagDomainIds; _ck(_v, 2, 0, currVal_0); }, null); }
function View_TagsDatavizeComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "app-dash-page-layout", [["title", "Les apprentissages dans votre communaut\u00E9"]], null, null, null, _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_DashPageLayoutComponent_0"], _shared_layouts_dash_page_layout_dash_page_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_DashPageLayoutComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _shared_layouts_dash_page_layout_dash_page_layout_component__WEBPACK_IMPORTED_MODULE_6__["DashPageLayoutComponent"], [], { title: [0, "title"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 1, null, View_TagsDatavizeComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Les apprentissages dans votre communaut\u00E9"; _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.loaded; _ck(_v, 3, 0, currVal_1); }, null); }
function View_TagsDatavizeComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-tags-datavize", [], null, null, null, View_TagsDatavizeComponent_0, RenderType_TagsDatavizeComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _tags_datavize_component__WEBPACK_IMPORTED_MODULE_7__["TagsDatavizeComponent"], [_tags_services_community_admin_tag_service__WEBPACK_IMPORTED_MODULE_8__["CommunityAdminTagService"], _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_9__["ProfileService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var TagsDatavizeComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-tags-datavize", _tags_datavize_component__WEBPACK_IMPORTED_MODULE_7__["TagsDatavizeComponent"], View_TagsDatavizeComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.scss.shim.ngstyle.js":
/*!**********************************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.scss.shim.ngstyle.js ***!
  \**********************************************************************************************************/
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
var styles = [".TagsDatavize[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n}\n.TagsDatavize-box[_ngcontent-%COMP%] {\n  border: 8px solid;\n  border-radius: 20px;\n  padding: 10px;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 450px;\n}\n.TagsDatavize-box-container[_ngcontent-%COMP%] {\n  margin: 22px;\n}\n.TagsDatavize-box-title[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.TagsDatavize-box-title[_ngcontent-%COMP%]   app-emoji[_ngcontent-%COMP%] {\n  padding-right: 5px;\n}\n.TagsDatavize-box-tag[_ngcontent-%COMP%] {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  margin: 5px;\n}\n.TagsDatavize-box-tag[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 6px 20px;\n  border: 2px solid;\n  border-radius: 6px;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}"];



/***/ }),

/***/ "./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/admin-community/pages/tags-datavize/tags-datavize.component.ts ***!
  \****************************************************************************************/
/*! exports provided: TagsDatavizeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsDatavizeComponent", function() { return TagsDatavizeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/core/components/destroy-observable */ "./src/app/core/components/destroy-observable.ts");
/* harmony import */ var _modules_tags_services_community_admin_tag_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/modules/tags/services/community-admin-tag.service */ "./src/app/modules/tags/services/community-admin-tag.service.ts");
/* harmony import */ var _core_services_user_profile_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/core/services/user/profile.service */ "./src/app/core/services/user/profile.service.ts");
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






var TagsDatavizeComponent = /** @class */ (function (_super) {
    __extends(TagsDatavizeComponent, _super);
    function TagsDatavizeComponent(_communityAdminTag, _profileService) {
        var _this = _super.call(this) || this;
        _this._communityAdminTag = _communityAdminTag;
        _this._profileService = _profileService;
        _this.tags$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        _this.maxIteration = 10;
        return _this;
    }
    TagsDatavizeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._communityAdminTag.tagsInCommunity$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (tags) { return tags.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (tags) { return tags.filter(function (tag) { return tag.type === 0
            && !tag.tag_domains.find(function (td) { return td.name === tag.name; }); }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy$))
            .subscribe(function (tags) {
            // group tags by tagdomains
            var tagsGroupedByDomain = tags.reduce(function (grouped, tag, index) {
                tag.tag_domains.forEach(function (td) {
                    if (!(td.id in grouped)) {
                        grouped[td.id] = {
                            tagDomain: td,
                            tags: [],
                            iterations: 0,
                        };
                    }
                    grouped[td.id].iterations += tag.iteration;
                    grouped[td.id].tags.push(tag);
                    grouped[td.id].tags.sort(function (a, b) { return b.iteration - a.iteration; });
                    // use this loop to update max tag iteration
                    if (tag.iteration > _this.maxIteration) {
                        _this.maxIteration = tag.iteration;
                    }
                });
                return grouped;
            }, {});
            _this.tags$.next(tagsGroupedByDomain);
        });
        this.loadTags();
    };
    Object.defineProperty(TagsDatavizeComponent.prototype, "tagsGroupedByDomain", {
        get: function () {
            return this.tags$.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagsDatavizeComponent.prototype, "tagDomainIds", {
        get: function () {
            return Object.values(this.tags$.value).sort(function (a, b) { return b.iterations - a.iterations; }).map(function (el) { return el.tagDomain.id; });
        },
        enumerable: true,
        configurable: true
    });
    TagsDatavizeComponent.prototype.getFontSize = function (iteration) {
        var maxFontSize = 34;
        var minFontSize = 14;
        var maxIteration = this.maxIteration;
        var minIteration = 1;
        var size = (iteration - minIteration) * (maxFontSize - minFontSize) / (maxIteration - minIteration) + minFontSize;
        return Math.floor(size) + 'px';
    };
    Object.defineProperty(TagsDatavizeComponent.prototype, "loaded", {
        get: function () {
            return this.tagsGroupedByDomain !== null;
        },
        enumerable: true,
        configurable: true
    });
    TagsDatavizeComponent.prototype.loadTags = function () {
        var user = this._profileService.profile;
        this._communityAdminTag.get(user.admin_domain.id).subscribe();
    };
    return TagsDatavizeComponent;
}(_core_components_destroy_observable__WEBPACK_IMPORTED_MODULE_3__["DestroyObservable"]));



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

/***/ "./src/app/modules/tags/services/community-admin-tag.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/tags/services/community-admin-tag.service.ts ***!
  \**********************************************************************/
/*! exports provided: CommunityAdminTagService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityAdminTagService", function() { return CommunityAdminTagService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





var CommunityAdminTagService = /** @class */ (function () {
    function CommunityAdminTagService(_http) {
        this._http = _http;
        this._entities$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this._loaded$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    CommunityAdminTagService.prototype.get = function (id) {
        var _this = this;
        return this._http.get("/api/community-admin/tags-in-community/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (data) {
            _this._entities$.next(data);
            _this._loaded$.next(true);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
            _this._loading$.next(false);
        }));
    };
    Object.defineProperty(CommunityAdminTagService.prototype, "tagsInCommunity$", {
        get: function () {
            return this._entities$;
        },
        enumerable: true,
        configurable: true
    });
    CommunityAdminTagService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function CommunityAdminTagService_Factory() { return new CommunityAdminTagService(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: CommunityAdminTagService, providedIn: "root" });
    return CommunityAdminTagService;
}());



/***/ }),

/***/ "./src/app/shared/components/copy/component.ngfactory.js":
/*!***************************************************************!*\
  !*** ./src/app/shared/components/copy/component.ngfactory.js ***!
  \***************************************************************/
/*! exports provided: RenderType_CopyComponent, View_CopyComponent_0, View_CopyComponent_Host_0, CopyComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_CopyComponent", function() { return RenderType_CopyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CopyComponent_0", function() { return View_CopyComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CopyComponent_Host_0", function() { return View_CopyComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyComponentNgFactory", function() { return CopyComponentNgFactory; });
/* harmony import */ var _copy_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./copy.component.scss.shim.ngstyle */ "./src/app/shared/components/copy/copy.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/icon/typings/index.ngfactory */ "./node_modules/@angular/material/icon/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component */ "./src/app/shared/components/copy/component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_CopyComponent = [_copy_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_CopyComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_CopyComponent, data: {} });

function View_CopyComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { tooltip: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 3, "mat-icon", [["class", "mat-icon notranslate"], ["mat-icon-button", ""], ["matSuffix", ""], ["role", "img"]], [[2, "mat-icon-inline", null], [2, "mat-icon-no-color", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.copy() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatIcon_0"], _node_modules_angular_material_icon_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatIcon"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatSuffix"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 9158656, null, 0, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconRegistry"], [8, null], [2, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MAT_ICON_LOCATION"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["content_copy"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 16777216, null, null, 1, "span", [["matTooltip", "Copi\u00E9 !"]], null, [[null, "longpress"], [null, "keydown"], [null, "touchend"]], function (_v, en, $event) { var ad = true; if (("longpress" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).show() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("touchend" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._handleTouchend() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 147456, [[1, 4], ["tooltip", 4]], 0, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MatTooltip"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__["ScrollDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_8__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["AriaDescriber"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["FocusMonitor"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MAT_TOOLTIP_SCROLL_STRATEGY"], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MAT_TOOLTIP_DEFAULT_OPTIONS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__["HAMMER_LOADER"]]], { message: [0, "message"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 0, "input", [["style", "display: none;"], ["type", "text"]], [[8, "id", 0], [8, "value", 0]], null, null, null, null))], function (_ck, _v) { _ck(_v, 3, 0); var currVal_2 = "Copi\u00E9 !"; _ck(_v, 6, 0, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).inline; var currVal_1 = (((_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "primary") && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "accent")) && (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).color !== "warn")); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "copy", _co.rand, ""); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.data, ""); _ck(_v, 7, 0, currVal_3, currVal_4); }); }
function View_CopyComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "copy", [], null, null, null, View_CopyComponent_0, RenderType_CopyComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _component__WEBPACK_IMPORTED_MODULE_12__["CopyComponent"], [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CopyComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("copy", _component__WEBPACK_IMPORTED_MODULE_12__["CopyComponent"], View_CopyComponent_Host_0, { data: "data" }, {}, []);



/***/ }),

/***/ "./src/app/shared/components/copy/component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/components/copy/component.ts ***!
  \*****************************************************/
/*! exports provided: CopyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyComponent", function() { return CopyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");


var CopyComponent = /** @class */ (function () {
    function CopyComponent() {
    }
    CopyComponent.prototype.ngOnInit = function () {
        this.rand = String(Math.floor(Math.random() * (10000))); // tslint:disable-line no-magic-numbers
    };
    CopyComponent.prototype.copy = function () {
        this.tooltip.show();
        var input = document.getElementById('copy' + this.rand);
        input.style.display = 'block';
        input.select();
        document.execCommand('copy');
        input.style.display = 'none';
    };
    return CopyComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/copy/copy.component.scss.shim.ngstyle.js":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/copy/copy.component.scss.shim.ngstyle.js ***!
  \****************************************************************************/
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
var styles = ["mat-icon[_ngcontent-%COMP%] {\n  cursor: pointer;\n  margin-top: 10px;\n}"];



/***/ }),

/***/ "./src/app/shared/directives/hide-menu-mobile-on-focus.directive.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/directives/hide-menu-mobile-on-focus.directive.ts ***!
  \**************************************************************************/
/*! exports provided: HideMenuMobileOnFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HideMenuMobileOnFocusDirective", function() { return HideMenuMobileOnFocusDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/fesm5/ngx-device-detector.js");
/* harmony import */ var _core_services_layout_footer_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/core/services/layout/footer-mobile */ "./src/app/core/services/layout/footer-mobile.ts");



var HideMenuMobileOnFocusDirective = /** @class */ (function () {
    function HideMenuMobileOnFocusDirective(el, _deviceService, _footerMobileService) {
        this.el = el;
        this._deviceService = _deviceService;
        this._footerMobileService = _footerMobileService;
    }
    HideMenuMobileOnFocusDirective.prototype.setInputFocus = function () {
        if (this._deviceService.isMobile()) {
            this._footerMobileService.inputFocusState.next(true);
        }
    };
    HideMenuMobileOnFocusDirective.prototype.setInputFocusOut = function () {
        if (this._deviceService.isMobile()) {
            this._footerMobileService.inputFocusState.next(false);
        }
    };
    return HideMenuMobileOnFocusDirective;
}());



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



/***/ })

}]);