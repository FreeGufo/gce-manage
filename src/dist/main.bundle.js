webpackJsonp([2,4],{

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(46)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = "<!-- Main jumbotron for a primary marketing message or call to action -->\n<div class=\"jumbotron\">\n  <div class=\"container\">\n    <h1>GCE Instance Manager</h1>\n    <p>インスタンスのアップダウンを行います！</p>\n  </div>\n</div>\n\n<div class=\"container\">\n  <!-- Example row of columns -->\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h2>appid: {{ project }}</h2>\n      <p><button class=\"btn btn-default\" (click)=\"instanceRefresh()\"><span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\"></span> Refresh</button></p>\n      <table class=\"table\">\n        <tr>\n          <th>instance</th>\n          <th>zone</th>\n          <th>status</th>\n          <th>ip address</th>\n          <th>up</th>\n          <th>down</th>\n        </tr>\n        <tr *ngFor=\"let ins of instanceList\">\n          <td>{{ins.instance}}</td>\n          <td>{{ins.zone}}</td>\n          <td>{{ins.status}}</td>\n          <!--<td><a ng-href=\"http://{{ins.ip}}/\" *ngIf=\"ns.ip != ''\" target=\"_blank\">{{ins.ip}}</a></td>-->\n          <td><a href=\"http://{{ins.ip}}/\" target=\"_blank\">{{ins.ip}}</a></td>\n          <td><button class=\"btn btn-info\" (click)=\"startIns(ins)\">start</button></td>\n          <td><button class=\"btn btn-danger\" (click)=\"stopIns(ins)\">stop</button></td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</div> <!-- /container -->\n"

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),

/***/ 74:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 74;


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(84);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = AppComponent_1 = (function () {
    function AppComponent(instanceService, projectIdService) {
        this.instanceService = instanceService;
        this.projectIdService = projectIdService;
    }
    AppComponent.prototype.getProjectID = function () {
        var _this = this;
        this.projectIdService.getProjectID().then(function (projectID) { return _this.project = projectID; });
    };
    AppComponent.prototype.getInstances = function () {
        var _this = this;
        this.instanceService.getInstances().then(function (instanceList) { return _this.instanceList = instanceList; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getInstances();
        this.getProjectID();
    };
    AppComponent.prototype.instanceRefresh = function () {
        this.getInstances();
    };
    AppComponent.prototype.startIns = function (ins) {
        var _this = this;
        var param = AppComponent_1.createParam(ins, 'start');
        this.instanceService.post(param)
            .then(function () { return _this.getInstances(); });
    };
    AppComponent.prototype.stopIns = function (ins) {
        var _this = this;
        var param = AppComponent_1.createParam(ins, 'stop');
        this.instanceService.post(param)
            .then(function () { return _this.getInstances(); });
    };
    AppComponent.createParam = function (ins, method) {
        var param = new __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* Param */]();
        param.instance = ins.instance;
        param.zone = ins.zone;
        param.Method = method;
        return param;
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(143),
        styles: [__webpack_require__(138)],
        providers: [__WEBPACK_IMPORTED_MODULE_2__app_service__["b" /* InstanceService */], __WEBPACK_IMPORTED_MODULE_2__app_service__["c" /* ProjectIdService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["b" /* InstanceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_service__["b" /* InstanceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["c" /* ProjectIdService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_service__["c" /* ProjectIdService */]) === "function" && _b || Object])
], AppComponent);

var AppComponent_1, _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(81);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { InstanceService } from './app.service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InstanceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProjectIdService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by t_nuki on 2017/04/27.
 */



var Param = (function () {
    function Param() {
    }
    return Param;
}());

var InstanceService = (function () {
    function InstanceService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.instanceUrl = '/instance'; // URL to web api
    }
    InstanceService.prototype.getInstances = function () {
        // return Promise.resolve(INSLIST);
        return this.http.get(this.instanceUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    InstanceService.prototype.post = function (param) {
        var url = "" + this.instanceUrl;
        return this.http
            .post(url, JSON.stringify(param), { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    InstanceService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return InstanceService;
}());
InstanceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], InstanceService);

var ProjectIdService = (function () {
    function ProjectIdService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.projectIdUrl = '/projectid'; // URL to web api
    }
    ProjectIdService.prototype.getProjectID = function () {
        return this.http.get(this.projectIdUrl)
            .toPromise()
            .then(function (response) { return response.json().projectId; })
            .catch(this.handleError);
    };
    ProjectIdService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ProjectIdService;
}());
ProjectIdService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object])
], ProjectIdService);

var _a, _b;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[176]);
//# sourceMappingURL=main.bundle.js.map