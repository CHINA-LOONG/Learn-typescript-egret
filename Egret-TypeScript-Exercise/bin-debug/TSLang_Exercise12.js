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
 * 迭代器和生成器
 */
var TSLang_Exercise12 = (function (_super) {
    __extends(TSLang_Exercise12, _super);
    function TSLang_Exercise12() {
        return _super.call(this) || this;
    }
    /**
     *
     */
    TSLang_Exercise12.prototype.Exercise01 = function () {
        /**可迭代性 */
        /**当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 */
        /**
         * for..of和for..in均可迭代一个列表；但是用于迭代的值却不同
         * for..in迭代的是对象的 键 的列表
         * for..of则迭代对象的键对应的值
         */
        var list = [4, 5, 6];
        for (var i in list) {
            console.log(i); // "0", "1", "2",
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var i = list_1[_i];
            console.log(i); // "4", "5", "6"
        }
        /**
         * for..in可以操作任何对象；它提供了查看对象属性的一种方法。
         * for..of关注于迭代对象的值。
        */
        //es6才拥有的
        // let pets = new Set(["Cat", "Dog", "Hamster"]);
        // pets["species"] = "mammals";
        // for (let pet in pets) {
        //     console.log(pet); // "species"
        // }
        // for (let pet of pets) {
        //     console.log(pet); // "Cat", "Dog", "Hamster"
        // }
        // 当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。 在非数组值上使用 for..of语句会得到一个错误
    };
    TSLang_Exercise12.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise12;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise12.prototype, "TSLang_Exercise12");
//# sourceMappingURL=TSLang_Exercise12.js.map