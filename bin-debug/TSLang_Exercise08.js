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
 * 类型推论
 */
var TSLang_Exercise08 = (function (_super) {
    __extends(TSLang_Exercise08, _super);
    function TSLang_Exercise08() {
        return _super.call(this) || this;
    }
    /**
     * 基础
     */
    TSLang_Exercise08.prototype.Exercise01 = function () {
        //变量x的类型被推断为数字。
        var x1 = 3;
        //为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
        var x2 = [0, 1, null];
        // 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]
        // let zoo = [new Rhino(), new Elephant(), new Snake()];
        //TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。
        window.onmousedown = function (mouseEvent) { console.log(mouseEvent.button); };
        console.log("1234321");
    };
    TSLang_Exercise08.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise08;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise08.prototype, "TSLang_Exercise08");
//# sourceMappingURL=TSLang_Exercise08.js.map