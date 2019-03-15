/**
 * 高级类型
 */
class TSLang_Exercise10 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 交叉类型
     */
    private Exercise01() {
        /**交叉类型是将多个类型合并为一个类型。 */
        function extend<T, U>(first: T, second: U): T & U {
            let result = <T & U>{};
            for (let id in first) {
                (<any>result)[id] = (<any>first)[id];
            }
            for (let id in second) {
                if (!result.hasOwnProperty(id)) {
                    (<any>result)[id] = (<any>second)[id];
                }
            }
            return result;
        }

        class Person {
            constructor(public name: string) { }
        }
        interface Loggable {
            log(): void;
        }
        class ConsoleLogger implements Loggable {
            constructor(public name: string) { }
            log() {
                // ...
                console.log(name);
            }
        }
        var jim = extend(new ConsoleLogger("Pet"), new Person("Jim"));//莫名的取第一个
        var n = jim.name;
        jim.log();
        console.log(jim.name);
    }
    /**
     * 联合类型
     */
    private Exercise02() {
        // 联合类型表现
        function padLeft(value: string, padding: string | number) {
            // function padLeft(value: string, padding: any) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error(`Expected string or number, got '${padding}'.`);
        }
        padLeft("Hello world", 4); // returns "    Hello world"
        // let indentedString = padLeft("Hello world", true); // 编译阶段通过，运行时报错 ；可能是任意类型；


        /**如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。 */
        interface Bird {
            fly();
            layEggs();
        }
        interface Fish {
            swim();
            layEggs();
        }
        function getSmallPet(): Fish | Bird {
            // ...\
            let ret: (Fish | Bird);
            return ret;
        }
        let pet = getSmallPet();
        pet.layEggs(); // okay
        // pet.swim();    // errors
    }
    /**
     * 类型保护与区分类型
     */
    private Exercise03() {
        /**JavaScript里常用来区分2个可能值的方法是检查成员是否存在。 */
        interface Bird {
            fly();
            layEggs();
        }
        interface Fish {
            swim();
            layEggs();
        }

        let pet;  //pet:(Bird|Fish)
        if ((<Fish>pet).swim) {
            (<Fish>pet).swim();
        }
        else {
            (<Bird>pet).fly();
        }


        /**用户自定义的类型保护 */
        /**类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 
         * 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词： */

        /**pet is Fish就是类型谓词。 
         * 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。 */
        function isFish(pet: Fish | Bird): pet is Fish {
            return (<Fish>pet).swim !== undefined;
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
        function isNumber(x: any): x is number {
            return typeof x === "number";
        }

        let padding: (number | string) = 10;
        if (isNumber(padding)) {
            return Array(padding).join(" ");
        }

        if (typeof padding === "number") {
            return Array(padding).join(" ");
        }
        /**
         * 1.这些* typeof类型保护*只有两种形式能被识别： 
         *      typeof v === "typename"
         *      typeof v !== "typename"
         * 2."typename"必须是 "number"， "string"， "boolean"或 "symbol"。  */

        /**instanceof类型保护 */
        /**
         * instanceof的右侧要求是一个构造函数，TypeScript将细化为：
         * 1.此构造函数的 prototype属性的类型，如果它的类型不为 any的话
         * 2.构造签名所返回的类型的联合
         */
        interface Padder {
            getPaddingString(): string
        }

        class SpaceRepeatingPadder implements Padder {
            constructor(private numSpaces: number) { }
            getPaddingString() {
                return Array(this.numSpaces + 1).join(" ");
            }
        }

        class StringPadder implements Padder {
            constructor(private value: string) { }
            getPaddingString() {
                return this.value;
            }
        }

        function getRandomPadder() {
            return Math.random() < 0.5 ?
                new SpaceRepeatingPadder(4) :
                new StringPadder("  ");
        }

        // 类型为SpaceRepeatingPadder | StringPadder
        let padder: Padder = getRandomPadder();

        if (padder instanceof SpaceRepeatingPadder) {
            padder; // 类型细化为'SpaceRepeatingPadder'
        }
        if (padder instanceof StringPadder) {
            padder; // 类型细化为'StringPadder'
        }
        /**细化类型 */
    }
    /**
     * 可以为null的类型
     */
    private Exercise04() {
        /**TypeScript具有两种特殊的类型， null和 undefined */
        /**默认情况下，类型检查器认为 null与 undefined可以赋值给任何类型。 */
        /**--strictNullChecks标记可以解决此错误 */
        let s = "foo";
        s = null; // 错误, 'null'不能赋值给'string'
        let sn: string | null = "bar";
        sn = null; // 可以
        sn = undefined; // error, 'undefined'不能赋值给'string | null'

        /**可选参数 */
        /**使用了 --strictNullChecks，可选参数会被自动地加上 | undefined: */
        function f(x: number, y?: number/*y?:(number|undefined)*/) {
            return x + (y || 0);
        }
        f(1, 2);
        f(1);
        f(1, undefined);
        f(1, null); // error, 'null' is not assignable to 'number | undefined'

        /**和可选属性 */
        class C {
            a: number;
            b?: number;
        }
        let c = new C();
        c.a = 12;
        c.a = undefined; // error, 'undefined' is not assignable to 'number'
        c.b = 13;
        c.b = undefined; // ok
        c.b = null; // error, 'null' is not assignable to 'number | undefined'

        /**类型保护和类型断言 */
        function fstring1(sn: string | null): string {
            if (sn == null) {
                return "default";
            }
            else {
                return sn;
            }
        }
        /*短路运算符*/
        function fstring2(sn: string | null): string {
            return sn || "default";
        }

        /**如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 
         * 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined */
        /**限制name！不能为null */
        function broken(name: string | null): string {
            function postfix(epithet: string) {
                return name!.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
            }
            name = name || "Bob";
            return postfix("great");
        }
    }
    /**
     * 类型别名
     */
    private Exercise05() {
        /**类型别名会给一个类型起个新名字。 
         * 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。 */
        type Name = string;
        type NameResolver = () => string;
        type NameOrResolver = Name | NameResolver;
        function getName(n: NameOrResolver): Name {
            if (typeof n === 'string') {
                return n;//sting
            }
            else {
                return n();//方法的返回值string
            }
        }
        /**同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入： */
        type Container<T> = { value: T };
        /**使用类型别名来在属性里引用自己： */
        type Tree<T> = {
            value: T;
            left: Tree<T>;
            right: Tree<T>;
        }
        /**与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。 */
        type LinkedList<T> = T & { next: LinkedList<T> };
        interface Person {
            name: string;
        }

        var people: LinkedList<Person>;
        var s = people.name;
        var s = people.next.name;
        var s = people.next.next.name;
        var s = people.next.next.next.name;

        // type Yikes = Array<Yikes>; // error

        /**类型别名并不创建新名字—比如，错误信息就不会使用别名。 */
        /**另一个重要区别是类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。  */

        /**字符串字面量类型允许你指定字符串必须的固定值。 */
        /**字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 
         * 通过结合使用这些特性，你可以实现类似枚举类型的字符串。 */
        type Easing = "ease-in" | "ease-out" | "ease-in-out";
        let str: Easing;
        // str = "aaa"; //error
        str = "ease-in";

        /**字符串字面量类型还可以用于区分函数重载： */
    }
    /**
     * 数字字面量类型
     */
    private Exercise06() {
        /**TypeScript还具有数字字面量类型。 */
        function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
            return 1;
        }
        function foo(x: number) {
            /**这里对比的是类型和值，所以不能这么比较  前面没通过才会进行后续的比较*/
            if (x !== 1/* || x !== 2*/) {
                //         ~~~~~~~
                // Operator '!==' cannot be applied to types '1' and '2'.
                console.log(true);
            }
            console.log(false);
        }
        foo(1);
    }
    /**
     * 可辨识联合
     */
    private Exercise07() {
        /**合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型。 */
        /**
         * TypeScript则基于已有的JavaScript模式。 它具有3个要素：
         * 1.具有普通的单例类型属性— 可辨识的特征。
         * 2.一个类型别名包含了那些类型的联合— 联合。
         * 3.此属性上的类型保护。
         */
        interface Square {
            kind: "square";
            size: number;
        }
        interface Rectangle {
            kind: "rectangle";
            width: number;
            height: number;
        }
        interface Circle {
            kind: "circle";
            radius: number;
        }
        type Shape = Square | Rectangle | Circle;
        //新增加类型时  --通过没有的类型判断进行报错检查  --通过default与assertNwver主动报错提示
    }
    /**
     * 索引类型
     */
    private Exercise08() {
        function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
            return names.map(n => o[n]);
        }

        interface Person {
            name: string;
            age: number;
        }
        let person: Person = {
            name: 'Jarid',
            age: 35
        };
        let strings: string[] = pluck(person, ['name']); // ok, string[]
        console.log(strings);

        /**首先是 keyof T， 索引类型查询操作符。 
         * 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 */
        let personProps: keyof Person; // 'name' | 'age'
        //编译器会检查你是否传入了正确的属性名给 pluck
        //   luck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'

        /**第二个操作符是 T[K]， 索引访问操作符。 
         * 在这里，类型语法反映了表达式语法。  */
        /**Person['name'] — 在我们的例子里则为 string类型。 */
        function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
            return o[name]; // o[name] is of type T[K]
        }


        /**索引类型和字符串索引签名 */
        /**keyof和 T[K]与字符串索引签名进行交互。  */
    }
    /**
     * 映射类型
     */
    private Exercise09() {
        interface Person {
            name: string;
            age: number;
        }
        /**TypeScript提供了从旧类型中创建新类型的一种方式 — 映射类型。 
         * 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 */
        type Readonly<T> = {
            readonly [P in keyof T]: T[P];
        }
        type Partial<T> = {
            [P in keyof T]?: T[P];
        }
        type PersonPartial = Partial<Person>;
        type ReadonlyPerson = Readonly<Person>;


        /**最简单的映射类型和它的组成部分： */
        /**
         * 类型变量 K，它会依次绑定到每个属性。
         * 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
         * 属性的结果类型。
         */
        type Keys = 'option1' | 'option2';
        type Flags = { [K in Keys]: boolean };
        //相当于
        // type Flags = {
        //     option1: boolean;
        //     option2: boolean;
        // }

        type Nullable<T> = { [P in keyof T]: T[P] | null }
        type PartialA<T> = { [P in keyof T]?: T[P] }
        /**编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。 
         * 例如，假设 Person.name是只读的，那么 Partial<Person>.name也将是只读的且为可选的。 */

        type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
        type Record<K extends string, T> = { [P in K]: T; }

        type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

        let nn: ThreeStringProps;
        nn.prop1 = "";
        nn.prop2 = "";
        nn.prop3 = "";



        class A {
            public a: number;
        }
        class B extends A {
            public b: string;
        }
        class C {
            public c: string;
            public aa: B;
        }
        type PickTest = Pick<C, "aa" | "c">;
        let mm: PickTest;
        mm.aa = { a: 1, b: "" };
        mm.c = "";


        type Proxy<T> = { get(): T; set(value: T): void; }
        type Proxify<T> = { [P in keyof T]: Proxy<T[P]>; }
        function proxify<T>(o: T): Proxify<T> {
            return null;
        }
        let c:C;
        let proxyProps = proxify(c);
        proxyProps.c.set("");
        // c.c.set("");
        proxyProps.aa.set({a:10,b:""});
        // c.aa.set({a:10,b:""});

        /**由映射类型进行推断 */   
        //------拆包
        function unproxify<T>(t: Proxify<T>): T {
            let result = {} as T;
            for (const k in t) {
                result[k] = t[k].get();
            }
            return result;
        }
        let originalProps = unproxify(proxyProps);
        // originalProps.c.set("");//error
        // originalProps.aa.set({a:10,b:""}); 

        /**TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：
            Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
            Extract<T, U> -- 提取T中可以赋值给U的类型。
            NonNullable<T> -- 从T中剔除null和undefined。
            ReturnType<T> -- 获取函数返回值类型。
            InstanceType<T> -- 获取构造函数类型的实例类型。 */
    }
    public Exercise() {
        super.Exercise();
        this.Exercise08();
    }
}