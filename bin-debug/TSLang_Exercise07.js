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
 * 枚举
 */
var TSLang_Exercise07 = (function (_super) {
    __extends(TSLang_Exercise07, _super);
    function TSLang_Exercise07() {
        return _super.call(this) || this;
    }
    /** TypeScript支持数字的和基于字符串的枚举。 */
    /**
     * 数字枚举
     */
    TSLang_Exercise07.prototype.Exercise01 = function () {
        /**可以自动推断值，也可以指定 */
        var Direction;
        (function (Direction) {
            Direction[Direction["Up"] = 0] = "Up";
            Direction[Direction["Down"] = 2] = "Down";
            Direction[Direction["Left"] = 5] = "Left";
            Direction[Direction["Right"] = 6] = "Right";
        })(Direction || (Direction = {}));
        console.log(Direction.Right);
        /**
         * 注意
         * 数字枚举可以被混入到 计算过的和常量成员 */
    };
    /**
     * 字符串枚举
     */
    TSLang_Exercise07.prototype.Exercise02 = function () {
        /**在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。 */
        var Direction;
        (function (Direction) {
            Direction["Up"] = "UP";
            Direction["Down"] = "DOWN";
            Direction["Left"] = "LEFT";
            Direction["Right"] = "RIGHT";
        })(Direction || (Direction = {}));
        /**由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 */
        /**字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。 */
    };
    /**
     * 异构枚举
     */
    TSLang_Exercise07.prototype.Exercise03 = function () {
        /**枚举可以混合字符串和数字成员 */
        var BooleanLikeHeterogeneousEnum;
        (function (BooleanLikeHeterogeneousEnum) {
            BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
            BooleanLikeHeterogeneousEnum["Yes"] = "YES";
        })(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
    };
    /**
     * 计算的和常量成员
     */
    TSLang_Exercise07.prototype.Exercise04 = function () {
        /**枚举值可以是一个表达式，但不能是NaN或Infinity只能是常量表达式 */
        var E1;
        (function (E1) {
            E1[E1["X"] = 0] = "X";
            E1[E1["Y"] = 1] = "Y";
            E1[E1["Z"] = 2] = "Z";
        })(E1 || (E1 = {}));
        var E2;
        (function (E2) {
            E2[E2["A"] = 1] = "A";
            E2[E2["B"] = 2] = "B";
            E2[E2["C"] = 3] = "C";
        })(E2 || (E2 = {}));
        /**枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。  */
        var FileAccess;
        (function (FileAccess) {
            // constant members
            FileAccess[FileAccess["None"] = 0] = "None";
            FileAccess[FileAccess["Read"] = 2] = "Read";
            FileAccess[FileAccess["Write"] = 4] = "Write";
            FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
            // computed member
            FileAccess[FileAccess["G"] = "123".length] = "G";
        })(FileAccess || (FileAccess = {}));
    };
    /**
     * 联合枚举与枚举成员的类型
     */
    TSLang_Exercise07.prototype.Exercise05 = function () {
        /**存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 */
        var ShapeKind;
        (function (ShapeKind) {
            ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
            ShapeKind[ShapeKind["Square"] = 1] = "Square";
        })(ShapeKind || (ShapeKind = {}));
        var c = {
            kind: ShapeKind.Circle,
            // kind: ShapeKind.Square,//    ~~~~~~~~~~~~~~~~ Error!
            radius: 100,
        };
        /**TypeScript能够捕获在比较值的时候犯的愚蠢的错误。 */
        var E;
        (function (E) {
            E[E["Foo"] = 0] = "Foo";
            E[E["Bar"] = 1] = "Bar";
        })(E || (E = {}));
        function f(x) {
            if (x !== E.Foo /* || x !== E.Bar*/) {
                //             ~~~~~~~~~~~
                // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
            }
        }
    };
    /**
     * 运行时的枚举
     */
    TSLang_Exercise07.prototype.Exercise06 = function () {
        /**枚举是在运行时真正存在的对象。 */
        var E;
        (function (E) {
            E[E["X"] = 0] = "X";
            E[E["Y"] = 1] = "Y";
            E[E["Z"] = 2] = "Z";
        })(E || (E = {}));
        function f(obj) {
            return obj.X;
        }
        // Works, since 'E' has a property named 'X' which is a number.
        console.log(f(E));
    };
    /**
     * 反向映射
     * const枚举
     */
    TSLang_Exercise07.prototype.Exercise07 = function () {
        /**除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字。 */
        var Enum;
        (function (Enum) {
            Enum[Enum["A"] = 0] = "A";
        })(Enum || (Enum = {}));
        var a = Enum.A;
        console.log(Enum[a]);
        var directions1 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
        var directions2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    };
    /**
     * 外部枚举
     */
    TSLang_Exercise07.prototype.Exercise08 = function () {
        // declare enum Enum {
        //     A = 1,
        //     B,
        //     C = 2
        // }
        /**
         * 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，
         * 没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举
         * 而言，没有初始化方法时被当做需要经过计算的。
         *
         * 不是很懂
         */
    };
    TSLang_Exercise07.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise06();
    };
    return TSLang_Exercise07;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise07.prototype, "TSLang_Exercise07");
//# sourceMappingURL=TSLang_Exercise07.js.map