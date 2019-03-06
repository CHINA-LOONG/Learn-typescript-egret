/**
 * 变量声明
 */
class TSLang_Exercise02 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }

    private Exercise01() {
        //变量声明
        /**let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 
         * const是对let的一个增强，它能阻止对一个变量再次赋值。 */
        var a = 10;
        function f1() { var msg = "Hello,World!"; return msg; }
        function f2() {
            var a = 5;
            return function g() {
                var b = a + 1;
                return b;
            }
        }
        var g = f2();

        console.log(g());
        console.log(a);
        function f3() {
            var a = 1;
            a = 2;
            var b = g();
            a = 3;
            return b;
            function g() {
                return a;
            }
        }
        console.log(f3());
    }
    private Exercise02() {
        //作用域规则
        function f4(shouldInitialize: boolean) {
            if (shouldInitialize) {
                var x = 10;
            }
            return x;
        }
        f4(true);  // returns '10'
        f4(false); // returns 'undefined'

        function sumMatrix(matrix: number[][]) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (var i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }
            return sum;
        }
        console.log(sumMatrix([[1, 2, 3], [4, 5, 6]]));//return 1+2+3=6
        /**var 声明后循环错误问题 */
        for (var i = 0; i < 10; i++) {
            setTimeout(function () { console.log(i); }, 1000 * i);//返回10，10，10
        }

        for (var i = 0; i < 10; i++) {
            (function (i) {
                setTimeout(function () { console.log(i); }, 1000 * i);//返回1,2,3,4
            })(i);
        }
    }
    private Exercise03() {
        //let声明
        let hello = "Hello!";
        /**当用let声明一个变量，它使用的是词法作用域或块作用域。 不同于使用 var声明的变量那样可以在包含
         * 它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。 */
        function f5(input: boolean) {
            let a = 100;
            if (input) {
                let b = a + 10;
                return b;
            }
            return /*b*/a;  //return b is error Doesn't exist here
        }
        /**当用let声明一个变量，它使用的是词法作用域或块作用域。 不同于使用 var声明的变量那样可以在包含它
         * 们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。 */
        function f6() {
            return nnn;
        }
        console.log(f6());
        let nnn: number = 101;
        console.log(f6());

        /**重定义以及屏蔽 */
        function f7() {
            var x;
            var x;
            if (true) {
                var x;
            }
            let a;
            // let a;   //Error;
            // let x;   //Error;
        }

        function sumMatrix2(matrix: number[][]) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                let currentRow = matrix[i];
                for (let i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }
            return sum;
        }
        console.log(sumMatrix2([[1, 2, 3], [4, 5, 6]]));
        /**与练习01中的setTimeout对比 */
        for (let i = 0; i < 10; i++) {
            setTimeout(function () { console.log(i) }, 100 * i);
        }
    }
    private Exercise04() {
        //const声明
        /**与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 */
        const numLivesForCat = 9;
        const kitty = {
            name: "Aurora",
            numLives: numLivesForCat,
        }
        //Error
        // kitty={
        //     name:""
        // }
        //Okay
        kitty.name = "Rory";
        /**
         * let vs. const
         * 最小特权原则，所有变量除了你计划去修改的都应该使用const。
         */

    }
    /**
     * 解构数组
     */
    private Exercise05() {
        //解构数组
        let input = [1, 2];
        let [first, second, third] = input;
        console.log(first);
        console.log(second);
        // console.log(third);  //Error
        [first, second] = [second, first];
        console.log(first);
        console.log(second);

        function f([first, second]: [number, string]) {
            console.log(first);
            console.log(second);
        }
        f([1, "first"]);

        let [num, ...rest] = [1, 2, 3, 4];
        console.log(num);//1
        console.log(rest);//234

        let [num1] = [1, 2, 3, 4];
        console.log(num1);//1

        let [, num2, , num3] = [1, 2, 3, 4];
        console.log(`\n${num2}`);//2
        console.log(`\n${num3}`);//4

    }
    /**
     * 对象解构
     */
    private Exercise06() {
        /**注意，我们需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块。 */
        let o = {
            a: "foo",
            b: 12,
            c: "bar",
        }
        let { a, c } = o;
        console.log("a=" + a);
        console.log("c=" + c);
        let name;
        let age;
        ({ name, age } = { name: "baz", age: 101, });

        let {a:newName1,c:newName2} =o;
        console.log(`\n${newName1}`+`   ${newName2}`);
        //默认值
        function keepWholeObject(wholeObject: { a: string, b?: number }) {
            let { a, b = 1001 } = wholeObject;
            console.log(a+" "+b);
        }
        keepWholeObject({a:"aaa"})
    }
    /**
     * 展开--反解构
     */
    private Exercise07(){
        let first = [1,2];
        let bothPlus = [0,...first];
        console.log(bothPlus);

        /**它是从左至右进行处理，但结果仍为对象。 这就意味着出现在展开对象后面的属性会覆盖前面的属性。 */
        let defaults = {food:"spicy",price:50};
        let search ={...defaults,food:"rich"};
        console.log(search);
        search ={food:"rich",...defaults};
        console.log(search);
        /**对象展开仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法： */
        class C {
            p = 12;
            m() {
            }
          }
          let c = new C();
          let clone = { ...c };
          clone.p; // ok
        //   clone.m(); // error!
    }
    public Exercise() {
        super.Exercise();
        // console.log("--------------------------exercise02 start------------------------");
        this.Exercise07();
    }

}