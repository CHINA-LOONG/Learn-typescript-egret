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
 * 泛型
 */
var TSLang_Exercise06 = (function (_super) {
    __extends(TSLang_Exercise06, _super);
    function TSLang_Exercise06() {
        return _super.call(this) || this;
    }
    /**
     * 泛型介绍
     */
    TSLang_Exercise06.prototype.Exercise01 = function () {
        /**软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。
         * 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建
         * 大型系统时为你提供了十分灵活的功能。 */
        /**使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 */
        /**使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息 */
        function identity1(arg) {
            return arg;
        }
        /**一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，
         * 它是一种特殊的变量，只用于表示类型而不是值。 */
        function identity2(arg) {
            return arg;
        }
        //调用方法一
        var output1 = identity2("myString");
        //调用方法二
        var output2 = identity2("myString");
    };
    /**
     * 使用泛型变量
     */
    TSLang_Exercise06.prototype.Exercise02 = function () {
        /**编译器会报错说我们使用了arg的.length属性，但是没有地方指明arg具有这个属性。 */
        // function loggingIdentity<T>(arg: T): T {
        //     console.log(arg.length);  // Error: T doesn't have .length
        //     return arg;
        // }
        /**元素类型是T的数组，并返回元素类型是T的数组 */
        function loggingIdentity(arg) {
            console.log(arg.length); // Array has a .length, so no more error
            return arg;
        }
    };
    /**
     * 泛型类型
     */
    TSLang_Exercise06.prototype.Exercise03 = function () {
        /**泛型函数的类型与非泛型函数的类型没什么不同 */
        function identity(arg) {
            return arg;
        }
        var myIdentity1 = identity;
        var myIdentity2 = identity;
        var myIdentity3 = identity;
        var myIdentity4 = identity;
        var myIdentity5 = identity;
        /**
         * 注意：
         * 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。
         */
    };
    /**
     * 泛型类
     */
    TSLang_Exercise06.prototype.Exercise04 = function () {
        var GenericNumber = (function () {
            function GenericNumber() {
            }
            return GenericNumber;
        }());
        //number
        var myGenericNumber = new GenericNumber();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y; };
        //string
        var stringNumeric = new GenericNumber();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function (x, y) { return x + y; };
        /**
         * 注意
         * 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
         */
    };
    /**
     * 泛型约束
     */
    TSLang_Exercise06.prototype.Exercise05 = function () {
        /**对泛型的类型进行约束 */
        function loggingIdentity(arg) {
            console.log(arg.length); // Now we know it has a .length property, so no more error
            return arg;
        }
        // loggingIdentity(3);  // Error, number doesn't have a .length property
        loggingIdentity({ length: 10, value: 3 });
        //在泛型里使用类类型
        /**在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。 */
        function create(c) {
            return new c();
        }
        /**一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。复制到剪切板 */
        var BeeKeeper = (function () {
            function BeeKeeper() {
            }
            return BeeKeeper;
        }());
        var ZooKeeper = (function () {
            function ZooKeeper() {
            }
            return ZooKeeper;
        }());
        var Animal = (function () {
            function Animal() {
            }
            return Animal;
        }());
        var Bee = (function (_super) {
            __extends(Bee, _super);
            function Bee() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Bee;
        }(Animal));
        var Lion = (function (_super) {
            __extends(Lion, _super);
            function Lion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Lion;
        }(Animal));
        function createInstance(c) {
            return new c();
        }
        createInstance(Lion).keeper.nametag; // typechecks!
        createInstance(Bee).keeper.hasMask; // typechecks!
    };
    TSLang_Exercise06.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise01();
    };
    return TSLang_Exercise06;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise06.prototype, "TSLang_Exercise06");
//# sourceMappingURL=TSLang_Exercise06.js.map