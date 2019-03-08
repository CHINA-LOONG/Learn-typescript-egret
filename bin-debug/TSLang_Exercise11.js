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
 * Symbols   --注意这是es2015 /es6才支持的内容
 */
var TSLang_Exercise11 = (function (_super) {
    __extends(TSLang_Exercise11, _super);
    function TSLang_Exercise11() {
        return _super.call(this) || this;
    }
    /**
     *
     */
    TSLang_Exercise11.prototype.Exercise01 = function () {
        /**自ECMAScript 2015起，symbol成为了一种新的原生类型 */
        /**symbol类型的值是通过Symbol构造函数创建的。 */
        // let sym1 = Symbol();
        // let sym2 = Symbol("key");
        // let sym3 = Symbol("key");
        // sym2 === sym3; // false, symbols是唯一的
        // console.log(sym2);
    };
    TSLang_Exercise11.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise11;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise11.prototype, "TSLang_Exercise11");
//# sourceMappingURL=TSLang_Exercise11.js.map