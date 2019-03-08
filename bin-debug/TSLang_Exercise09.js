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
 * 类型兼容性
 */
var TSLang_Exercise09 = (function (_super) {
    __extends(TSLang_Exercise09, _super);
    function TSLang_Exercise09() {
        return _super.call(this) || this;
    }
    /**TypeScript里的类型兼容性是基于结构子类型的。     --相对的（名义类型系统）
     * 它是基于类型的组成结构，且不要求明确地声明。
     */
    TSLang_Exercise09.prototype.Exercise01 = function () {
        var Person = (function () {
            function Person() {
            }
            return Person;
        }());
        var p;
        // OK, because of structural typing
        p = new Person();
        /**TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。 */
        /**这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 */
        var x;
        // y's inferred type is { name: string; location: string; }
        var y = { name: 'Alice', location: 'Seattle' };
        x = y;
        /**检查函数参数时使用相同的规则： */
        function greet(n) {
            console.log('Hello, ' + n.name);
        }
        greet(y); // OK
    };
    /**
     * 比较两个函数
     */
    TSLang_Exercise09.prototype.Exercise02 = function () {
        var x = function (a) { return 0; };
        var y = function (b, s) { return 0; };
        y = x; // OK
        // x = y; // Error
        /**是忽略额外的参数在JavaScript里是很常见的。  */
        var items = [1, 2, 3];
        // Don't force these extra arguments
        items.forEach(function (item, index, array) { return console.log(item); });
        // Should be OK!
        items.forEach(function (item) { return console.log(item); });
        /**类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。 */
        /**注意此处只是函数类型的声明 */
        var x1 = function () { return ({ name: 'Alice' }); };
        var y1 = function () { return ({ name: 'Alice', location: 'Seattle' }); };
        x1 = y1; // OK
        // y1 = x1; // Error, because x() lacks a location property
    };
    /**
     * 函数参数双向协变
     * 函数重载
     */
    TSLang_Exercise09.prototype.Exercise03 = function () {
        /**当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。
         * 这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的
         * 函数的时候却使用了不是那么精确的类型信息。 */
        var EventType;
        (function (EventType) {
            EventType[EventType["Mouse"] = 0] = "Mouse";
            EventType[EventType["Keyboard"] = 1] = "Keyboard";
        })(EventType || (EventType = {}));
        function listenEvent(eventType, handler) {
            /* ... */
        }
        //常用方式
        listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
        //调用后类型断言
        listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
        //函数类型断言
        listenEvent(EventType.Mouse, (function (e) { return console.log(e.x + ',' + e.y); }));
        /**对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。 这确保了目标函数可以在所有源函数可调用的地方调用。 */
    };
    /**
     * 可选参数及剩余参数
     */
    TSLang_Exercise09.prototype.Exercise04 = function () {
        /**这对于类型系统来说是不稳定的
         * 但从运行时的角度来看，可选参数一般来说是不强制的，因为对于大多数函数来说相当于传递了一些undefinded。 */
        function invokeLater(args, callback) {
            /* ... Invoke callback with 'args' ... */
        }
        invokeLater([1, 2], function (x, y) { return console.log(x + ', '); });
        invokeLater([1, 2], function (x, y) { return console.log(x + ', '); });
        //看的不是太懂
    };
    /**
     * 枚举
     */
    TSLang_Exercise09.prototype.Exercise05 = function () {
        /**
         * 1.枚举类型与数字类型兼容
         * 2.并且数字类型与枚举类型兼容
         * 3.不同枚举类型之间是不兼容的
         */
        var Status;
        (function (Status) {
            Status[Status["Ready"] = 0] = "Ready";
            Status[Status["Waiting"] = 1] = "Waiting";
        })(Status || (Status = {}));
        ;
        var Color;
        (function (Color) {
            Color[Color["Red"] = 0] = "Red";
            Color[Color["Blue"] = 1] = "Blue";
            Color[Color["Green"] = 2] = "Green";
        })(Color || (Color = {}));
        ;
        var status = Status.Ready;
        status = 1;
        var num;
        num = status;
        // status = Color.Green;  // Error
    };
    /**
     * 类
     */
    TSLang_Exercise09.prototype.Exercise06 = function () {
        /**类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。
         * 比较两个类类型的对象时，只有实例的成员会被比较。
         * 静态成员和构造函数不在比较的范围内。 */
        var Animal = (function () {
            function Animal(name, numFeet) {
            }
            return Animal;
        }());
        var Size = (function () {
            function Size(numFeet) {
            }
            return Size;
        }());
        var a;
        var s;
        a = s; // OK
        s = a; // OK
        /**类的私有成员和受保护成员会影响兼容性。 当检查类实例的兼容时，
         * 如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类
         * 的这个私有成员。 同样地，这条规则也适用于包含受保护成员实例的
         * 类型检查。 这允许子类赋值给父类，但是不能赋值给其它有同样类型的类。 */
        var Bird = (function () {
            function Bird(name, numFeet) {
            }
            return Bird;
        }());
        var ABird = (function (_super) {
            __extends(ABird, _super);
            function ABird() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ABird;
        }(Bird));
        var BBird = (function (_super) {
            __extends(BBird, _super);
            function BBird() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BBird;
        }(Bird));
        var CBird = (function (_super) {
            __extends(CBird, _super);
            function CBird() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CBird;
        }(Bird));
        var DBird = (function (_super) {
            __extends(DBird, _super);
            function DBird() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBird;
        }(Bird));
        var bird;
        var aBird;
        var bBird;
        var cBird;
        var dBird;
        bird = aBird;
        // aBird = bird; //Error
        aBird = bBird;
        // bBird = aBird;//Error
        // aBird = dBird;//Error
        // dBird = aBird;//Error
        // 证明只能小等于大，作用域也要对应
    };
    /**
     * 泛型
     */
    TSLang_Exercise09.prototype.Exercise07 = function () {
        var x;
        var y;
        x = y; // OK, because y matches structure of x
        var identity;
        var reverse;
        // let identity = function<T>(x: T): T {
        //     // ...
        // }
        // let reverse = function<U>(y: U): U {
        //     // ...
        // }
        identity = reverse; // OK, because (x: any) => any matches (y: any) => any
    };
    /*
     *  在TypeScript里，有两种兼容性：子类型和赋值。
     *  它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和any来回赋值，以及enum和对应数字值之间的来回赋值。
     */
    TSLang_Exercise09.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise09;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise09.prototype, "TSLang_Exercise09");
//# sourceMappingURL=TSLang_Exercise09.js.map