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
 * 变量声明
 */
var TSLang_Exercise02 = (function (_super) {
    __extends(TSLang_Exercise02, _super);
    function TSLang_Exercise02() {
        return _super.call(this) || this;
    }
    TSLang_Exercise02.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        // console.log("exercise02 start");
        //变量声明
    };
    return TSLang_Exercise02;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise02.prototype, "TSLang_Exercise02");
//# sourceMappingURL=TSLang_Exercise02.js.map