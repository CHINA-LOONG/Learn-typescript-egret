/**
 * 枚举
 */
class TSLang_Exercise07 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /** TypeScript支持数字的和基于字符串的枚举。 */

    /**
     * 数字枚举
     */
    private Exercise01() {
        /**可以自动推断值，也可以指定 */
        enum Direction {
            Up,
            Down = 2,
            Left = 5,
            Right
        }
        console.log(Direction.Right);

        /**
         * 注意
         * 数字枚举可以被混入到 计算过的和常量成员 */
    }
    /**
     * 字符串枚举
     */
    private Exercise02() {
        /**在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。 */
        enum Direction {
            Up = "UP",
            Down = "DOWN",
            Left = "LEFT",
            Right = "RIGHT",
        }
        /**由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 */
        /**字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。 */
    }
    /**
     * 异构枚举
     */
    private Exercise03() {
        /**枚举可以混合字符串和数字成员 */
        enum BooleanLikeHeterogeneousEnum {
            No = 0,
            Yes = "YES",
        }
    }
    /**
     * 计算的和常量成员
     */
    private Exercise04() {
        /**枚举值可以是一个表达式，但不能是NaN或Infinity只能是常量表达式 */
        enum E1 {
            X, Y, Z
        }

        enum E2 {
            A = 1, B, C
        }
        /**枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。  */
        enum FileAccess {
            // constant members
            None,
            Read = 1 << 1,
            Write = 1 << 2,
            ReadWrite = Read | Write,
            // computed member
            G = "123".length
        }
    }
    /**
     * 联合枚举与枚举成员的类型
     */
    private Exercise05() {
        /**存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 */
        enum ShapeKind {
            Circle,
            Square,
        }
        interface Circle {
            kind: ShapeKind.Circle;
            radius: number;
        }
        let c: Circle = {
            kind: ShapeKind.Circle,
            // kind: ShapeKind.Square,//    ~~~~~~~~~~~~~~~~ Error!
            radius: 100,
        }

        /**TypeScript能够捕获在比较值的时候犯的愚蠢的错误。 */
        enum E {
            Foo,
            Bar,
        }

        function f(x: E) {
            if (x !== E.Foo/* || x !== E.Bar*/) {//这里总有一个会相等
                //             ~~~~~~~~~~~
                // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
            }
        }
    }
    /**
     * 运行时的枚举
     */
    private Exercise06() {
        /**枚举是在运行时真正存在的对象。 */
        enum E {
            X, Y, Z
        }
        function f(obj: { X: number }) {
            return obj.X;
        }

        // Works, since 'E' has a property named 'X' which is a number.
        console.log(f(E));
    }
    /**
     * 反向映射
     * const枚举
     */
    private Exercise07() {
        /**除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字。 */
        enum Enum{A}
        let a = Enum.A;
        console.log(Enum[a]);

        /**编译后的枚举 */
        // var Enum;
        // (function (Enum) {
        //     Enum[Enum["A"] = 0] = "A";
        // })(Enum || (Enum = {}));

        /**
         * 注意
         * 不会为字符串枚举成员生成反向映射。
         */



        /**某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，
         * 常量枚举通过在枚举上使用 const修饰符来定义。 */
        /**
         * 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 
         * 常量枚举成员在使用的地方会被内联进来。
         */
        const enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        
        let directions1 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
        var directions2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    }
    /**
     * 外部枚举
     */
    private Exercise08(){
        // declare enum Enum {
        //     A = 1,
        //     B,
        //     C = 2
        // }
        /**
         * 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，
         * 没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举
         * 而言，没有初始化方法时被当做需要经过计算的。
         * 
         * 不是很懂
         */
    }

    public Exercise() {
        super.Exercise();
        this.Exercise06();
    }
}