/**
 * 接口
 */
class TSLang_Exercise03 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 接口初探
     */
    private Exercise01() {
        function printLable(labelledObj: { label: string }) {
            console.log(labelledObj.label);
        }
        let myObj = { size: 10, label: "size 10 Object" };
        printLable(myObj);

        /**并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。 */
        /**类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。 */
        interface LabelledValue {
            label: string;
        }
        function printLable2(labelledObj: LabelledValue) {
            console.log(labelledObj.label);
        }
        let myObj2 = { size: 10, label: "size 10 Object" };
        printLable(myObj2);
        /**接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在
         * 应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。 */
        interface SquareConfig {
            color?: string;
            width?: number;
        }
        /**带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。 */
        function createSquare(config: SquareConfig): { color: string, area: number } {
            let newSquare = { color: "white", area: 100 };
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }
        console.log(createSquare({ color: "black" }));
    }
    /**
     * 只读属性
     */
    private Exercise02() {
        /**可以在属性名前用 readonly来指定只读属性 */
        interface Point {
            readonly x: number;
            y: number;
        }
        let p1: Point = { x: 10, y: 20 };
        // p1.x = 100; //error
        p1.y = 200;

        /**TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
         * 因此可以确保数组创建后再也不能被修改： */
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;
        // ro[0] = 12; // error!
        // ro.push(5); // error!
        // ro.length = 100; // error!
        // a = ro; // error!
        a = ro as number[]; //类型断言或叫做强制类型转换

        /**该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 
         * 做为变量使用的话用 const，若做为属性则使用readonly。 */


        // 额外的属性检查
        interface SquareConfig {
            color?: string;
            width?: number;
            [aaa: string]: any;   //1.代表可以拥有其他类型变量
        }

        function createSquare(config: SquareConfig): { color: string; area: number } {
            let newSquare = { color: "white", area: 100 };
            return newSquare;
        }
        let mySquare1 = createSquare({ colour: "red", width: 100 });        //1..代表可以拥有其他类型变量
        let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);//2.强制类型转换

    }
    /**
     * 函数类型
     */
    private Exercise03() {
        /**接口除了描述带有属性的普通对象外，接口也可以描述函数类型。 */
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }
        let mySearch: SearchFunc;
        /**函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 */
        /**TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc类型变量。 */
        mySearch = function (src, sub) {
            let result = src.search(sub);
            return result > -1;
        }
        console.log(mySearch("abcd", "bc"));

        interface StringArray {
            [index: number]: string;
        }

        let myArray: StringArray;
        myArray = ["Bob", "Fred"];
        let myStr: string = myArray[0];
        console.log(`myStr : ${myStr}`);
        console.log(`myArray[1] : ${myArray[1]}`);

        /**TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字
         * 索引的返回值必须是字符串索引返回值类型的子类型。 */
        class Animal {
            name: string;
        }
        class Dog extends Animal {
            breed: string;
        }
        interface NotOkey {
            [x: number]: Dog;
            [x: string]: Animal;
        }
    }
    /**
     * 类类型
     */
    private Exercise04(){
        /**C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。 */
        interface ClockInterface{
            currentTime:Date;
            setTime(d:Date);
        }
        /**接口描述了类的公共部分，而不是公共和私有两部分。 */
        class Clock implements ClockInterface{
            currentTime:Date;
            constructor(h:number){}
            setTime(dt:Date){}
        }
    }
    /**
     * 继承接口 
     */
    private Exercise05(){
        /**一个接口可以继承多个接口，创建出多个接口的合成接口。 */
        interface Shape {
            color: string;
        }
        
        interface PenStroke {
            penWidth: number;
        }
        
        interface Square extends Shape, PenStroke {
            sideLength: number;
        }
        
        let square = <Square>{};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;
    }
    /**
     * 混合类型
     */
    private Exercise06(){
        /**一个对象可以同时做为函数和对象使用，并带有额外的属性。 */
        interface Counter {
            (start: number): string;
            interval: number;
            reset(): void;
        }
        
        function getCounter(): Counter {
            let counter = <Counter>function (start: number) { };
            counter.interval = 123;
            counter.reset = function () { };
            return counter;
        }
        
        let c = getCounter();
        c(10);  //作为函数
        c.reset();  //拥有方法
        c.interval = 5.0;   //拥有属性
    }
    /**
     * 接口继承类
     */
    private Exercise07(){
        class Control{
            private state:any;
        }
        interface SelectableControl extends Control{
            select():void;
        }
        class Button extends Control implements SelectableControl{
            select(){};
        }
        class TextBox extends Control{
            select(){}
        }
        //Error:必须是继承自Control的类型
        // class Image implements SelectableControl{
        //     select(){}
        // }

    }

    public Exercise() {
        super.Exercise();

        this.Exercise04();
    }
}