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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * 变量声明
 */
var TSLang_Exercise02 = (function (_super) {
    __extends(TSLang_Exercise02, _super);
    function TSLang_Exercise02() {
        return _super.call(this) || this;
    }
    TSLang_Exercise02.prototype.Exercise01 = function () {
        //变量声明
        /**let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。
         * const是对let的一个增强，它能阻止对一个变量再次赋值。 */
        var a = 10;
        function f1() { var msg = "Hello,World!"; return msg; }
        function f2() {
            var a = 5;
            return function g() {
                var b = a + 1;
                return b;
            };
        }
        var g = f2();
        console.log(g());
        console.log(a);
        function f3() {
            var a = 1;
            a = 2;
            var b = g();
            a = 3;
            return b;
            function g() {
                return a;
            }
        }
        console.log(f3());
    };
    TSLang_Exercise02.prototype.Exercise02 = function () {
        //作用域规则
        function f4(shouldInitialize) {
            if (shouldInitialize) {
                var x = 10;
            }
            return x;
        }
        f4(true); // returns '10'
        f4(false); // returns 'undefined'
        function sumMatrix(matrix) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (var i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }
            return sum;
        }
        console.log(sumMatrix([[1, 2, 3], [4, 5, 6]])); //return 1+2+3=6
        /**var 声明后循环错误问题 */
        for (var i = 0; i < 10; i++) {
            setTimeout(function () { console.log(i); }, 1000 * i); //返回10，10，10
        }
        for (var i = 0; i < 10; i++) {
            (function (i) {
                setTimeout(function () { console.log(i); }, 1000 * i); //返回1,2,3,4
            })(i);
        }
    };
    TSLang_Exercise02.prototype.Exercise03 = function () {
        //let声明
        var hello = "Hello!";
        /**当用let声明一个变量，它使用的是词法作用域或块作用域。 不同于使用 var声明的变量那样可以在包含
         * 它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。 */
        function f5(input) {
            var a = 100;
            if (input) {
                var b = a + 10;
                return b;
            }
            return a; //return b is error Doesn't exist here
        }
        /**当用let声明一个变量，它使用的是词法作用域或块作用域。 不同于使用 var声明的变量那样可以在包含它
         * 们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。 */
        function f6() {
            return nnn;
        }
        console.log(f6());
        var nnn = 101;
        console.log(f6());
        /**重定义以及屏蔽 */
        function f7() {
            var x;
            var x;
            if (true) {
                var x;
            }
            var a;
            // let a;   //Error;
            // let x;   //Error;
        }
        function sumMatrix2(matrix) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (var i_1 = 0; i_1 < currentRow.length; i_1++) {
                    sum += currentRow[i_1];
                }
            }
            return sum;
        }
        console.log(sumMatrix2([[1, 2, 3], [4, 5, 6]]));
        var _loop_1 = function (i) {
            setTimeout(function () { console.log(i); }, 100 * i);
        };
        /**与练习01中的setTimeout对比 */
        for (var i = 0; i < 10; i++) {
            _loop_1(i);
        }
    };
    TSLang_Exercise02.prototype.Exercise04 = function () {
        //const声明
        /**与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 */
        var numLivesForCat = 9;
        var kitty = {
            name: "Aurora",
            numLives: numLivesForCat,
        };
        //Error
        // kitty={
        //     name:""
        // }
        //Okay
        kitty.name = "Rory";
        /**
         * let vs. const
         * 最小特权原则，所有变量除了你计划去修改的都应该使用const。
         */
    };
    /**
     * 解构数组
     */
    TSLang_Exercise02.prototype.Exercise05 = function () {
        //解构数组
        var input = [1, 2];
        var first = input[0], second = input[1], third = input[2];
        console.log(first);
        console.log(second);
        // console.log(third);  //Error
        _a = [second, first], first = _a[0], second = _a[1];
        console.log(first);
        console.log(second);
        function f(_a) {
            var first = _a[0], second = _a[1];
            console.log(first);
            console.log(second);
        }
        f([1, "first"]);
        var _b = [1, 2, 3, 4], num = _b[0], rest = _b.slice(1);
        console.log(num); //1
        console.log(rest); //234
        var num1 = [1, 2, 3, 4][0];
        console.log(num1); //1
        var _c = [1, 2, 3, 4], num2 = _c[1], num3 = _c[3];
        console.log("\n" + num2); //2
        console.log("\n" + num3); //4
        var _a;
    };
    /**
     * 对象解构
     */
    TSLang_Exercise02.prototype.Exercise06 = function () {
        /**注意，我们需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块。 */
        var o = {
            a: "foo",
            b: 12,
            c: "bar",
        };
        var a = o.a, c = o.c;
        console.log("a=" + a);
        console.log("c=" + c);
        var name;
        var age;
        (_a = { name: "baz", age: 101, }, name = _a.name, age = _a.age);
        var newName1 = o.a, newName2 = o.c;
        console.log("\n" + newName1 + ("   " + newName2));
        //默认值
        function keepWholeObject(wholeObject) {
            var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
            console.log(a + " " + b);
        }
        keepWholeObject({ a: "aaa" });
        var _a;
    };
    /**
     * 展开--反解构
     */
    TSLang_Exercise02.prototype.Exercise07 = function () {
        var first = [1, 2];
        var bothPlus = [0].concat(first);
        console.log(bothPlus);
        /**它是从左至右进行处理，但结果仍为对象。 这就意味着出现在展开对象后面的属性会覆盖前面的属性。 */
        var defaults = { food: "spicy", price: 50 };
        var search = __assign({}, defaults, { food: "rich" });
        console.log(search);
        search = __assign({ food: "rich" }, defaults);
        console.log(search);
        /**对象展开仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法： */
        var C = (function () {
            function C() {
                this.p = 12;
            }
            C.prototype.m = function () {
            };
            return C;
        }());
        var c = new C();
        var clone = __assign({}, c);
        clone.p; // ok
        //   clone.m(); // error!
    };
    TSLang_Exercise02.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        // console.log("--------------------------exercise02 start------------------------");
        this.Exercise07();
    };
    return TSLang_Exercise02;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise02.prototype, "TSLang_Exercise02");
//# sourceMappingURL=TSLang_Exercise02.js.map