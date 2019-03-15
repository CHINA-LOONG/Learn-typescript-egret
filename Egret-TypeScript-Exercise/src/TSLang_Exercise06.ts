/**
 * 泛型
 */
class TSLang_Exercise06 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 泛型介绍
     */
    private Exercise01() {
        /**软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 
         * 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建
         * 大型系统时为你提供了十分灵活的功能。 */
        /**使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 */

        /**使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息 */
        function identity1(arg: any): any {
            return arg;
        }

        /**一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，
         * 它是一种特殊的变量，只用于表示类型而不是值。 */
        function identity2<T>(arg: T): T {
            return arg;
        }
        //调用方法一
        let output1 = identity2<string>("myString");
        //调用方法二
        let output2 = identity2("myString");
    }
    /**
     * 使用泛型变量
     */
    private Exercise02() {
        /**编译器会报错说我们使用了arg的.length属性，但是没有地方指明arg具有这个属性。 */
        // function loggingIdentity<T>(arg: T): T {
        //     console.log(arg.length);  // Error: T doesn't have .length
        //     return arg;
        // }

        /**元素类型是T的数组，并返回元素类型是T的数组 */
        function loggingIdentity<T>(arg: Array<T>): Array<T> {
            console.log(arg.length);  // Array has a .length, so no more error
            return arg;
        }
    }
    /**
     * 泛型类型
     */
    private Exercise03() {
        /**泛型函数的类型与非泛型函数的类型没什么不同 */
        function identity<T>(arg: T): T {
            return arg;
        }
        let myIdentity1: <T>(arg: T) => T = identity;
        let myIdentity2: <U>(arg: U) => U = identity;
        let myIdentity3: { <T>(arg: T): T } = identity;
        interface GenericIdentityFn1 {
            <T>(arg: T): T;
        }
        let myIdentity4: GenericIdentityFn1 = identity;

        interface GenericIdentityFn2<T> {
            (arg: T): T;
        }
        let myIdentity5: GenericIdentityFn2<number> = identity;

        /**
         * 注意：
         * 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。
         */
    }
    /**
     * 泛型类
     */
    private Exercise04() {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }
        //number
        let myGenericNumber = new GenericNumber<number>();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y; };
        //string
        let stringNumeric = new GenericNumber<string>();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function (x, y) { return x + y; };
        /**
         * 注意
         * 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
         */
    }
    /**
     * 泛型约束
     */
    private Exercise05() {
        /**
         * 场景
         * 我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错
         */
        /**限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，
         * 就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。 */
        interface Lengthwise {
            length: number;
        }
        /**对泛型的类型进行约束 */
        function loggingIdentity<T extends Lengthwise>(arg: T): T {
            console.log(arg.length);  // Now we know it has a .length property, so no more error
            return arg;
        }
        // loggingIdentity(3);  // Error, number doesn't have a .length property
        loggingIdentity({ length: 10, value: 3 });

        //在泛型里使用类类型
        /**在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。 */
        function create<T>(c: { new(): T; }): T {
            return new c();
        }

        /**一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。复制到剪切板 */
        class BeeKeeper {
            hasMask: boolean;
        }
        class ZooKeeper {
            nametag: string;
        }
        class Animal {
            numLegs: number;
        }
        class Bee extends Animal {
            keeper: BeeKeeper;
        }
        class Lion extends Animal {
            keeper: ZooKeeper;
        }

        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }
        createInstance(Lion).keeper.nametag;  // typechecks!
        createInstance(Bee).keeper.hasMask;   // typechecks!
    }

    public Exercise() {
        super.Exercise();
        this.Exercise01();
    }
}