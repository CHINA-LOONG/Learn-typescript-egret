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
 * 类
 */
var TSLang_Exercise04 = (function (_super) {
    __extends(TSLang_Exercise04, _super);
    function TSLang_Exercise04() {
        return _super.call(this) || this;
    }
    /**
     * 类介绍
     */
    TSLang_Exercise04.prototype.Exercise01 = function () {
        /**
         * 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，
         * 但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是
         * 基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就
         * 是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象
         * 的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且
         * 编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到
         * 下个JavaScript版本。
         */
        var Greeter = (function () {
            function Greeter(message) {
                this.greeting = message;
            }
            Greeter.prototype.greet = function () {
                return "Hello, " + this.greeting;
            };
            return Greeter;
        }());
        var greeter = new Greeter("World");
        greeter.greeting = "TypeScript";
        console.log(greeter.greet());
    };
    /**
     * 类继承
     */
    TSLang_Exercise04.prototype.Exercise02 = function () {
        /**继承不多描述 */
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            Animal.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 0; }
                console.log("Animal moved " + distanceInMeters + "m.");
            };
            return Animal;
        }());
        var Snake = (function (_super) {
            __extends(Snake, _super);
            function Snake(name) {
                return _super.call(this, name) || this;
            }
            Snake.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 5; }
                console.log("Slithering...");
                _super.prototype.move.call(this, distanceInMeters);
            };
            return Snake;
        }(Animal));
        var Horse = (function (_super) {
            __extends(Horse, _super);
            function Horse(name) {
                return _super.call(this, name) || this;
            }
            Horse.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 45; }
                console.log("Galloping...");
                _super.prototype.move.call(this, distanceInMeters);
            };
            return Horse;
        }(Animal));
        var sam = new Snake("Sammy the Python");
        var tom = new Horse("Tommy the Palomino"); //因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法
        sam.move();
        tom.move(34);
    };
    /**
     * 公共，私有与受保护的修饰符
     */
    TSLang_Exercise04.prototype.Exercise03 = function () {
        /**TypeScript里，成员都默认为 public */
        /**当成员被标记成 private时，它就不能在声明它的类的外部访问。 */
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            return Animal;
        }());
        // new Animal("Cat").name; // 错误: 'name' 是私有的.
        /**TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，
         * 如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。
         *
         * 当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包
         * 含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来
         * 自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。（）*/
        var Rhino = (function (_super) {
            __extends(Rhino, _super);
            function Rhino() {
                return _super.call(this, "Rhino") || this;
            }
            return Rhino;
        }(Animal));
        var Employee = (function () {
            function Employee(theName) {
                this.name = theName;
            }
            return Employee;
        }());
        var animal = new Animal("Goat");
        var rhino = new Rhino();
        var employee = new Employee("Bob");
        animal = rhino;
        // animal = employee; // 错误: Animal 与 Employee 不兼容.
        //Protected
        /**protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。 */
        /**构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承 */
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            return Person;
        }());
        var Employee1 = (function (_super) {
            __extends(Employee1, _super);
            function Employee1(name, department) {
                var _this = _super.call(this, name) || this;
                _this.department = department;
                return _this;
            }
            Employee1.prototype.getElevatorPitch = function () {
                return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
            };
            return Employee1;
        }(Person));
        var howard = new Employee1("Howard", "Sales");
        console.log(howard.getElevatorPitch());
        // console.log(howard.name); // 错误
        // let person = new Person("Howard");//受保护的构造函数，不能被实例化能被继承
        /**你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。 */
        var Octopus = (function () {
            function Octopus(theName) {
                this.numberOfLegs = 8;
                this.name = theName;
            }
            return Octopus;
        }());
        var dad = new Octopus("Man with the 8 strong legs");
        // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
        /*参数属性*/
        /**使用 private限定一个参数属性会声明并初始化一个私有成员；对于 public和 protected来说也是一样。 */
        var Octopus1 = (function () {
            /**参数属性可以方便地让我们在一个地方定义并初始化一个成员。 */
            function Octopus1(name) {
                this.name = name;
                this.numberOfLegs = 8;
            }
            return Octopus1;
        }());
    };
    /**
     * 存取器
     */
    TSLang_Exercise04.prototype.Exercise04 = function () {
        /**TypeScript支持通过getters/setters来截取对对象成员的访问。   -----属性封装 */
        var Employee = (function () {
            function Employee() {
            }
            return Employee;
        }());
        var employee = new Employee();
        employee.fullName = "Bob Smith";
        if (employee.fullName) {
            console.log(employee.fullName);
        }
        /**存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
         * 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 这在从代码生成 .d.ts
         * 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。 */
        var passcode = "secret passcode";
        var Employee1 = (function () {
            function Employee1() {
            }
            Object.defineProperty(Employee1.prototype, "fullName", {
                get: function () {
                    return this._fullName;
                },
                set: function (newName) {
                    if (passcode && passcode == "secret passcode") {
                        this._fullName = newName;
                    }
                    else {
                        console.log("Error: Unauthorized update of employee!");
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Employee1;
        }());
        var employee1 = new Employee1();
        employee1.fullName = "Bob Smith";
        if (employee1.fullName) {
            alert(employee1.fullName);
        }
    };
    /**
     * 静态属性
     */
    TSLang_Exercise04.prototype.Exercise05 = function () {
        /**静态成员，这些属性存在于类本身上面而不是类的实例上。 */
        var Grid = (function () {
            function Grid(scale) {
                this.scale = scale;
            }
            Grid.prototype.calculateDistanceFromOrgin = function (point) {
                var xDist = (point.x - Grid.origin.x);
                var yDist = (point.y - Grid.origin.y);
                return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
            };
            Grid.origin = { x: 0, y: 0 };
            return Grid;
        }());
        var grid1 = new Grid(1.0);
        var grid2 = new Grid(1.5);
        console.log(grid1.calculateDistanceFromOrgin({ x: 10, y: 20 }));
        console.log(grid2.calculateDistanceFromOrgin({ x: 10, y: 20 }));
    };
    /**
     * 抽象类
     */
    TSLang_Exercise04.prototype.Exercise06 = function () {
        /**
         * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方
         * 法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然
         * 而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
         */
        var Department = (function () {
            function Department(name) {
                this.name = name;
            }
            Department.prototype.printName = function () {
                console.log('Department name: ' + this.name);
            };
            return Department;
        }());
        var AccountingDepartment = (function (_super) {
            __extends(AccountingDepartment, _super);
            function AccountingDepartment() {
                return _super.call(this, 'Accounting and Auditing') || this;
            }
            AccountingDepartment.prototype.printMeeting = function () {
                console.log('The Accounting Department meets each Monday at 10am.');
            };
            AccountingDepartment.prototype.generateReports = function () {
                console.log('Generating accounting reports...');
            };
            return AccountingDepartment;
        }(Department));
        var department; // 允许创建一个对抽象类型的引用
        // department = new Department(); // 错误: 不能创建一个抽象类的实例
        department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
        department.printName();
        department.printMeeting();
        // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
    };
    /**
     * 高级技巧  --构造函数
     */
    TSLang_Exercise04.prototype.Exercise07 = function () {
        var Greeter = (function () {
            function Greeter() {
            }
            Greeter.prototype.greet = function () {
                if (this.greeting) {
                    return "Hello, " + this.greeting;
                }
                else {
                    return Greeter.standardGreeting;
                }
            };
            Greeter.standardGreeting = "Hello, there";
            return Greeter;
        }());
        var greeter1;
        greeter1 = new Greeter();
        console.log(greeter1.greet());
        var greeterMaker = Greeter;
        greeterMaker.standardGreeting = "Hey there!";
        var greeter2 = new greeterMaker();
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
    };
    TSLang_Exercise04.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise04();
    };
    return TSLang_Exercise04;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise04.prototype, "TSLang_Exercise04");
//# sourceMappingURL=TSLang_Exercise04.js.map