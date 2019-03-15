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
 * 基础类型
 */
var TSLang_Exercise01 = (function (_super) {
    __extends(TSLang_Exercise01, _super);
    function TSLang_Exercise01() {
        return _super.call(this) || this;
    }
    TSLang_Exercise01.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        //boolean
        var isDone = false;
        console.log(isDone);
        //number
        var decLiteral = 6;
        var hexLiteral = 0x00d;
        var binaryLiteral = 10;
        var octalLiteral = 484;
        console.log(decLiteral + "\n" + hexLiteral + "\n" + binaryLiteral + "\n" + octalLiteral);
        //string
        var name = 'loong';
        name = "smith";
        var age = 28;
        var sentence1 = "Hello,my name is " + name + ".\n\nI'll be " + (age + 4) + " years old next next year.";
        var sentence2 = "Hello,my name is " + name +
            '.\n\n' +
            ("I'll be " + (age + 5) + " years old next next year.");
        console.log(sentence1);
        console.log(sentence2);
        //数组
        var list1 = [1, 2, 3];
        var list2 = [1, 2, 3];
        console.log(list1);
        console.log(list2);
        //元组Tuple
        var x; //类型范围
        x = ["Hello", 10]; //初始化
        x[3] = 'world'; //赋值
        console.log(x);
        console.log(x[0].substr(1));
        console.log(x[2]);
        //枚举
        var Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 3] = "Green";
            Color[Color["Blue"] = 4] = "Blue";
        })(Color || (Color = {}));
        var c = Color.Blue;
        var cName = Color[3];
        console.log(c);
        console.log(c.toString());
        console.log(cName); //Green
        //跳过类型检查Any
        var notSure = 4;
        notSure = "maybe a string instead";
        notSure = false;
        var anyList = [1, false, "test"];
        anyList[1] = 3.14;
        console.log(anyList);
        //Void 
        function warnUser2() { } //没有返回值的函数
        var unusable1 = undefined; //没有意义的变量
        var unusable2 = null;
        //Null--undefined
        var n = null; //当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
        var u = undefined; //可以把 null和undefined赋值给number类型的变量。
        // Never
        /**never类型表示的是那些永不存在的值的类型。例如， never类型是那些总是会抛出异常或根
         * 本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，
         * 当它们被永不为真的类型保护所约束时。
         * never类型是任何类型的子类型，也可以赋值给任何类型；*/
        // 返回never的函数必须存在无法达到的终点
        function error(message) {
            throw new Error(message);
        }
        // 推断的返回值类型为never
        function fail() {
            return error("Something failed");
        }
        // 返回never的函数必须存在无法达到的终点
        function infiniteLoop() {
            while (true) {
            }
        }
        //Object
        /**object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之
         * 外的类型。使用object类型，就可以更好的表示像Object.create这样的API。以及自定义类型*/
        //此处的Object类型不同于讲解的object类型--需要替换object或string测试报错
        function create1(o) { console.log(o); }
        ;
        function create2(o) { console.log(o); }
        ;
        create1({ prop: 0 }); // OK
        create1(null); // OK
        create1(42); // Error
        create1("string"); // Error
        create1(false); // Error
        create1(undefined); // Error
        //类型断言---强制类型转换
        /** 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，
         * 只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。 */
        var someValue1 = "this is a string";
        var strLength1 = someValue1.length;
        console.log(someValue1 + ("\u7684\u5B57\u7B26\u4E32\u957F\u5EA6\u662F:" + strLength1));
        var someValue2 = "this is a long string";
        var strLength2 = someValue2.length;
        /**可能地使用let来代替var */
    };
    return TSLang_Exercise01;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise01.prototype, "TSLang_Exercise01");
//# sourceMappingURL=TSLang_Exercise01.js.map