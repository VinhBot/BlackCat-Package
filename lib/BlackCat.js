var Tạo_Ràng_Buộc = (this && this.Tạo_Ràng_Buộc) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var Mô_Tả = Object.getOwnPropertyDescriptor(m, k);
    if (!Mô_Tả || ("get" in Mô_Tả ? !m.__esModule : Mô_Tả.writable || Mô_Tả.configurable)) {
      Mô_Tả = { enumerable: true, get: function() { return m[k] }};
    };
    Object.defineProperty(o, k2, Mô_Tả);
}):(function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var Chạy_các_modules = (this && this.Chạy_các_modules) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) Tạo_Ràng_Buộc(exports, m, p);
};
//==================| BlackCat-Club |========================>
Chạy_các_modules(require("./Modules/Client.js"), exports);
//===========================================================>
Chạy_các_modules(require("./MainEvents.js"), exports);
//===========================================================>
Chạy_các_modules(require("./Publish02/api.js"), exports);
//===========================================================>
Chạy_các_modules(require("./Publish02/index.js"), exports);
//===========================================================>
Chạy_các_modules(require("./Publish01/Util/Util.js"), exports);
//===========================================================>