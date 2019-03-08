var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Template
 */
var TSLang_Exercise00 = (function (_super) {
    __extends(TSLang_Exercise00, _super);
    function TSLang_Exercise00() {
        return _super.call(this) || this;
    }
    TSLang_Exercise00.prototype.Exercise01 = function () {
    };
    TSLang_Exercise00.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise00;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise00.prototype, "TSLang_Exercise00");
//# sourceMappingURL=TSLang_Exercise00.js.map