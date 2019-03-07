/**
 * 类
 */
class TSLang_Exercise04 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 类介绍
     */
    private Exercise01() {
        /**
         * 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，
         * 但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是
         * 基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就
         * 是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象
         * 的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且
         * 编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到
         * 下个JavaScript版本。
         */
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return `Hello, ${this.greeting}`;
            }
        }
        let greeter = new Greeter("World");
        greeter.greeting = "TypeScript";
        console.log(greeter.greet());
    }
    /**
     * 类继承
     */
    private Exercise02() {
        /**继承不多描述 */
        class Animal {
            name: string;
            constructor(theName: string) { this.name = theName; }
            move(distanceInMeters: number = 0) {
                console.log(`Animal moved ${distanceInMeters}m.`);
            }
        }

        class Snake extends Animal {
            constructor(name: string) { super(name); }
            move(distanceInMeters = 5) {
                console.log("Slithering...");
                super.move(distanceInMeters);
            }
        }

        class Horse extends Animal {
            constructor(name: string) { super(name); }
            move(distanceInMeters = 45) {
                console.log("Galloping...");
                super.move(distanceInMeters);
            }
        }

        let sam = new Snake("Sammy the Python");
        let tom: Animal = new Horse("Tommy the Palomino");//因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法

        sam.move();
        tom.move(34);
    }
    /**
     * 公共，私有与受保护的修饰符
     */
    private Exercise03() {
        /**TypeScript里，成员都默认为 public */
        /**当成员被标记成 private时，它就不能在声明它的类的外部访问。 */
        class Animal {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }
        // new Animal("Cat").name; // 错误: 'name' 是私有的.
        /**TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，
         * 如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。 
         * 
         * 当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包
         * 含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来
         * 自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。（）*/


        class Rhino extends Animal {
            constructor() { super("Rhino"); }
        }

        class Employee {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }

        let animal = new Animal("Goat");
        let rhino = new Rhino();
        let employee = new Employee("Bob");

        animal = rhino;
        // animal = employee; // 错误: Animal 与 Employee 不兼容.


        //Protected
        /**protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。 */
        /**构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承 */
        class Person {
            protected name: string;
            protected constructor(name: string) { this.name = name; }
        }

        class Employee1 extends Person {
            private department: string;

            constructor(name: string, department: string) {
                super(name)
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }

        let howard = new Employee1("Howard", "Sales");
        console.log(howard.getElevatorPitch());
        // console.log(howard.name); // 错误
        // let person = new Person("Howard");//受保护的构造函数，不能被实例化能被继承

        /**你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。 */
        class Octopus {
            readonly name: string;
            readonly numberOfLegs: number = 8;
            constructor(theName: string) {
                this.name = theName;
            }
        }
        let dad = new Octopus("Man with the 8 strong legs");
        // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.


        /*参数属性*/
        /**使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。 */
        class Octopus1 {
            readonly numberOfLegs: number = 8;
            /**参数属性可以方便地让我们在一个地方定义并初始化一个成员。 */
            constructor(readonly name: string) {
            }
        }
    }
    /**
     * 存取器
     */
    private Exercise04() {
        /**TypeScript支持通过getters/setters来截取对对象成员的访问。   -----属性封装 */
        class Employee {
            fullName: string;
        }
        let employee = new Employee();
        employee.fullName = "Bob Smith";
        if (employee.fullName) {
            console.log(employee.fullName);
        }
        /**存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 
         * 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 这在从代码生成 .d.ts
         * 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。 */
        let passcode = "secret passcode";
        class Employee1 {
            private _fullName: string;

            get fullName(): string {
                return this._fullName;
            }

            set fullName(newName: string) {
                if (passcode && passcode == "secret passcode") {
                    this._fullName = newName;
                }
                else {
                    console.log("Error: Unauthorized update of employee!");
                }
            }
        }
        let employee1 = new Employee1();
        employee1.fullName = "Bob Smith";
        if (employee1.fullName) {
            alert(employee1.fullName);
        }



    }
    /**
     * 静态属性
     */
    private Exercise05(){
        /**静态成员，这些属性存在于类本身上面而不是类的实例上。 */
        class Grid{
            static origin = {x:0,y:0};
            calculateDistanceFromOrgin(point:{x:number;y:number}){
                let xDist = (point.x - Grid.origin.x);
                let yDist = (point.y - Grid.origin.y);
                return Math.sqrt(xDist*xDist+yDist*yDist)/this.scale;
            }
            constructor(public scale:number){}
        }
        let grid1 = new Grid(1.0);
        let grid2 = new Grid(1.5);

        console.log(grid1.calculateDistanceFromOrgin({x:10,y:20}));
        console.log(grid2.calculateDistanceFromOrgin({x:10,y:20}));


    }
    /**
     * 抽象类
     */
    private Exercise06(){
        /**
         * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方
         * 法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然
         * 而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
         */
        abstract class Department {

            constructor(public name: string) {
            }
            printName(): void {
                console.log('Department name: ' + this.name);
            }
            abstract printMeeting(): void; // 必须在派生类中实现
        }
        class AccountingDepartment extends Department {
            constructor() {
                super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
            }
            printMeeting(): void {
                console.log('The Accounting Department meets each Monday at 10am.');
            }
            generateReports(): void {
                console.log('Generating accounting reports...');
            }
        }
        let department: Department; // 允许创建一个对抽象类型的引用
        // department = new Department(); // 错误: 不能创建一个抽象类的实例
        department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
        department.printName();
        department.printMeeting();
        // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
    }
    /**
     * 高级技巧  --构造函数
     */
    private Exercise07(){
        class Greeter {
            static standardGreeting = "Hello, there";
            greeting: string;
            greet() {
                if (this.greeting) {
                    return "Hello, " + this.greeting;
                }
                else {
                    return Greeter.standardGreeting;
                }
            }
        }
        
        let greeter1: Greeter;
        greeter1 = new Greeter();
        console.log(greeter1.greet());
        
        let greeterMaker: typeof Greeter = Greeter;
        greeterMaker.standardGreeting = "Hey there!";
        
        let greeter2: Greeter = new greeterMaker();
        console.log(greeter2.greet());
        /**
         * greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。
         * 
         * 再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者
         * 说保存了类构造函数。 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类
         * 型。 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 这个类型包含了类
         * 的所有静态成员和构造函数。 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter
         * 的实例。
         */

         /**把类当做接口使用------------接口中讲解的接口继承类 */
    }

    public Exercise() {
        super.Exercise();

        this.Exercise04();
    }
}