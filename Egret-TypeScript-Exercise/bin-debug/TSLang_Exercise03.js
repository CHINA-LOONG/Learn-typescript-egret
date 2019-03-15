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
 * 接口
 */
var TSLang_Exercise03 = (function (_super) {
    __extends(TSLang_Exercise03, _super);
    function TSLang_Exercise03() {
        return _super.call(this) || this;
    }
    /**
     * 接口初探
     */
    TSLang_Exercise03.prototype.Exercise01 = function () {
        function printLable(labelledObj) {
            console.log(labelledObj.label);
        }
        var myObj = { size: 10, label: "size 10 Object" };
        printLable(myObj);
        function printLable2(labelledObj) {
            console.log(labelledObj.label);
        }
        var myObj2 = { size: 10, label: "size 10 Object" };
        printLable(myObj2);
        /**带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。 */
        function createSquare(config) {
            var newSquare = { color: "white", area: 100 };
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }
        console.log(createSquare({ color: "black" }));
    };
    /**
     * 只读属性
     */
    TSLang_Exercise03.prototype.Exercise02 = function () {
        var p1 = { x: 10, y: 20 };
        // p1.x = 100; //error
        p1.y = 200;
        /**TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
         * 因此可以确保数组创建后再也不能被修改： */
        var a = [1, 2, 3, 4];
        var ro = a;
        // ro[0] = 12; // error!
        // ro.push(5); // error!
        // ro.length = 100; // error!
        // a = ro; // error!
        a = ro; //类型断言或叫做强制类型转换
        function createSquare(config) {
            var newSquare = { color: "white", area: 100 };
            return newSquare;
        }
        var mySquare1 = createSquare({ colour: "red", width: 100 }); //1..代表可以拥有其他类型变量
        var mySquare2 = createSquare({ width: 100, opacity: 0.5 }); //2.强制类型转换
    };
    /**
     * 函数类型
     */
    TSLang_Exercise03.prototype.Exercise03 = function () {
        var mySearch;
        /**函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 */
        /**TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。 */
        mySearch = function (src, sub) {
            var result = src.search(sub);
            return result > -1;
        };
        console.log(mySearch("abcd", "bc"));
        var myArray;
        myArray = ["Bob", "Fred"];
        var myStr = myArray[0];
        console.log("myStr : " + myStr);
        console.log("myArray[1] : " + myArray[1]);
        /**TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字
         * 索引的返回值必须是字符串索引返回值类型的子类型。 */
        var Animal = (function () {
            function Animal() {
            }
            return Animal;
        }());
        var Dog = (function (_super) {
            __extends(Dog, _super);
            function Dog() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Dog;
        }(Animal));
    };
    /**
     * 类类型
     */
    TSLang_Exercise03.prototype.Exercise04 = function () {
        /**接口描述了类的公共部分，而不是公共和私有两部分。 */
        var Clock = (function () {
            function Clock(h) {
            }
            Clock.prototype.setTime = function (dt) { };
            return Clock;
        }());
    };
    /**
     * 继承接口
     */
    TSLang_Exercise03.prototype.Exercise05 = function () {
        var square = {};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;
    };
    /**
     * 混合类型
     */
    TSLang_Exercise03.prototype.Exercise06 = function () {
        function getCounter() {
            var counter = function (start) { };
            counter.interval = 123;
            counter.reset = function () { };
            return counter;
        }
        var c = getCounter();
        c(10); //作为函数
        c.reset(); //拥有方法
        c.interval = 5.0; //拥有属性
    };
    /**
     * 接口继承类
     */
    TSLang_Exercise03.prototype.Exercise07 = function () {
        var Control = (function () {
            function Control() {
            }
            return Control;
        }());
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Button.prototype.select = function () { };
            ;
            return Button;
        }(Control));
        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            function TextBox() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextBox.prototype.select = function () { };
            return TextBox;
        }(Control));
        //Error:必须是继承自Control的类型
        // class Image implements SelectableControl{
        //     select(){}
        // }
    };
    TSLang_Exercise03.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise04();
    };
    return TSLang_Exercise03;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise03.prototype, "TSLang_Exercise03");
//# sourceMappingURL=TSLang_Exercise03.js.map