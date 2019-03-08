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
 * 高级类型
 */
var TSLang_Exercise10 = (function (_super) {
    __extends(TSLang_Exercise10, _super);
    function TSLang_Exercise10() {
        return _super.call(this) || this;
    }
    /**
     * 交叉类型
     */
    TSLang_Exercise10.prototype.Exercise01 = function () {
        /**交叉类型是将多个类型合并为一个类型。 */
        function extend(first, second) {
            var result = {};
            for (var id in first) {
                result[id] = first[id];
            }
            for (var id in second) {
                if (!result.hasOwnProperty(id)) {
                    result[id] = second[id];
                }
            }
            return result;
        }
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            return Person;
        }());
        var ConsoleLogger = (function () {
            function ConsoleLogger(name) {
                this.name = name;
            }
            ConsoleLogger.prototype.log = function () {
                // ...
                console.log(name);
            };
            return ConsoleLogger;
        }());
        var jim = extend(new ConsoleLogger("Pet"), new Person("Jim")); //莫名的取第一个
        var n = jim.name;
        jim.log();
        console.log(jim.name);
    };
    /**
     * 联合类型
     */
    TSLang_Exercise10.prototype.Exercise02 = function () {
        // 联合类型表现
        function padLeft(value, padding) {
            // function padLeft(value: string, padding: any) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error("Expected string or number, got '" + padding + "'.");
        }
        padLeft("Hello world", 4); // returns "    Hello world"
        function getSmallPet() {
            // ...\
            var ret;
            return ret;
        }
        var pet = getSmallPet();
        pet.layEggs(); // okay
        // pet.swim();    // errors
    };
    /**
     * 类型保护与区分类型
     */
    TSLang_Exercise10.prototype.Exercise03 = function () {
        var pet; //pet:(Bird|Fish)
        if (pet.swim) {
            pet.swim();
        }
        else {
            pet.fly();
        }
        /**用户自定义的类型保护 */
        /**类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。
         * 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词： */
        /**pet is Fish就是类型谓词。
         * 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。 */
        function isFish(pet) {
            return pet.swim !== undefined;
        }
        if (isFish(pet)) {
            pet.swim();
        }
        else {
            pet.fly();
        }
        /**typeof类型保护 */
        /**必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。
         * 幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 */
        function isNumber(x) {
            return typeof x === "number";
        }
        var padding = 10;
        if (isNumber(padding)) {
            return Array(padding).join(" ");
        }
        if (typeof padding === "number") {
            return Array(padding).join(" ");
        }
        var SpaceRepeatingPadder = (function () {
            function SpaceRepeatingPadder(numSpaces) {
                this.numSpaces = numSpaces;
            }
            SpaceRepeatingPadder.prototype.getPaddingString = function () {
                return Array(this.numSpaces + 1).join(" ");
            };
            return SpaceRepeatingPadder;
        }());
        var StringPadder = (function () {
            function StringPadder(value) {
                this.value = value;
            }
            StringPadder.prototype.getPaddingString = function () {
                return this.value;
            };
            return StringPadder;
        }());
        function getRandomPadder() {
            return Math.random() < 0.5 ?
                new SpaceRepeatingPadder(4) :
                new StringPadder("  ");
        }
        // 类型为SpaceRepeatingPadder | StringPadder
        var padder = getRandomPadder();
        if (padder instanceof SpaceRepeatingPadder) {
            padder; // 类型细化为'SpaceRepeatingPadder'
        }
        if (padder instanceof StringPadder) {
            padder; // 类型细化为'StringPadder'
        }
        /**细化类型 */
    };
    /**
     * 可以为null的类型
     */
    TSLang_Exercise10.prototype.Exercise04 = function () {
        /**TypeScript具有两种特殊的类型， null和 undefined */
        /**默认情况下，类型检查器认为 null与 undefined可以赋值给任何类型。 */
        /**--strictNullChecks标记可以解决此错误 */
        var s = "foo";
        s = null; // 错误, 'null'不能赋值给'string'
        var sn = "bar";
        sn = null; // 可以
        sn = undefined; // error, 'undefined'不能赋值给'string | null'
        /**可选参数 */
        /**使用了 --strictNullChecks，可选参数会被自动地加上 | undefined: */
        function f(x, y /*y?:(number|undefined)*/) {
            return x + (y || 0);
        }
        f(1, 2);
        f(1);
        f(1, undefined);
        f(1, null); // error, 'null' is not assignable to 'number | undefined'
        /**和可选属性 */
        var C = (function () {
            function C() {
            }
            return C;
        }());
        var c = new C();
        c.a = 12;
        c.a = undefined; // error, 'undefined' is not assignable to 'number'
        c.b = 13;
        c.b = undefined; // ok
        c.b = null; // error, 'null' is not assignable to 'number | undefined'
        /**类型保护和类型断言 */
        function fstring1(sn) {
            if (sn == null) {
                return "default";
            }
            else {
                return sn;
            }
        }
        /*短路运算符*/
        function fstring2(sn) {
            return sn || "default";
        }
        /**如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。
         * 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined */
        /**限制name！不能为null */
        function broken(name) {
            function postfix(epithet) {
                return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
            }
            name = name || "Bob";
            return postfix("great");
        }
    };
    /**
     * 类型别名
     */
    TSLang_Exercise10.prototype.Exercise05 = function () {
        function getName(n) {
            if (typeof n === 'string') {
                return n; //sting
            }
            else {
                return n(); //方法的返回值string
            }
        }
        var people;
        var s = people.name;
        var s = people.next.name;
        var s = people.next.next.name;
        var s = people.next.next.next.name;
        var str;
        // str = "aaa"; //error
        str = "ease-in";
        /**字符串字面量类型还可以用于区分函数重载： */
    };
    /**
     * 数字字面量类型
     */
    TSLang_Exercise10.prototype.Exercise06 = function () {
        /**TypeScript还具有数字字面量类型。 */
        function rollDie() {
            return 1;
        }
        function foo(x) {
            /**这里对比的是类型和值，所以不能这么比较  前面没通过才会进行后续的比较*/
            if (x !== 1 /* || x !== 2*/) {
                //         ~~~~~~~
                // Operator '!==' cannot be applied to types '1' and '2'.
                console.log(true);
            }
            console.log(false);
        }
        foo(1);
    };
    /**
     * 可辨识联合
     */
    TSLang_Exercise10.prototype.Exercise07 = function () {
        //新增加类型时  --通过没有的类型判断进行报错检查  --通过default与assertNwver主动报错提示
    };
    /**
     * 索引类型
     */
    TSLang_Exercise10.prototype.Exercise08 = function () {
        function pluck(o, names) {
            return names.map(function (n) { return o[n]; });
        }
        var person = {
            name: 'Jarid',
            age: 35
        };
        var strings = pluck(person, ['name']); // ok, string[]
        console.log(strings);
        /**首先是 keyof T， 索引类型查询操作符。
         * 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 */
        var personProps; // 'name' | 'age'
        //编译器会检查你是否传入了正确的属性名给 pluck
        //   luck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
        /**第二个操作符是 T[K]， 索引访问操作符。
         * 在这里，类型语法反映了表达式语法。  */
        /**Person['name'] — 在我们的例子里则为 string类型。 */
        function getProperty(o, name) {
            return o[name]; // o[name] is of type T[K]
        }
        /**索引类型和字符串索引签名 */
        /**keyof和 T[K]与字符串索引签名进行交互。  */
    };
    /**
     * 映射类型
     */
    TSLang_Exercise10.prototype.Exercise09 = function () {
        var nn;
        nn.prop1 = "";
        nn.prop2 = "";
        nn.prop3 = "";
        var A = (function () {
            function A() {
            }
            return A;
        }());
        var B = (function (_super) {
            __extends(B, _super);
            function B() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return B;
        }(A));
        var C = (function () {
            function C() {
            }
            return C;
        }());
        var mm;
        mm.aa = { a: 1, b: "" };
        mm.c = "";
        function proxify(o) {
            return null;
        }
        var c;
        var proxyProps = proxify(c);
        proxyProps.c.set("");
        // c.c.set("");
        proxyProps.aa.set({ a: 10, b: "" });
        // c.aa.set({a:10,b:""});
        /**由映射类型进行推断 */
        //------拆包
        function unproxify(t) {
            var result = {};
            for (var k in t) {
                result[k] = t[k].get();
            }
            return result;
        }
        var originalProps = unproxify(proxyProps);
        // originalProps.c.set("");//error
        // originalProps.aa.set({a:10,b:""}); 
        /**TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：
            Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
            Extract<T, U> -- 提取T中可以赋值给U的类型。
            NonNullable<T> -- 从T中剔除null和undefined。
            ReturnType<T> -- 获取函数返回值类型。
            InstanceType<T> -- 获取构造函数类型的实例类型。 */
    };
    TSLang_Exercise10.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise08();
    };
    return TSLang_Exercise10;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise10.prototype, "TSLang_Exercise10");
//# sourceMappingURL=TSLang_Exercise10.js.map