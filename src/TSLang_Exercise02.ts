/**
 * 变量声明
 */
class TSLang_Exercise02 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }

    public Exercise() {
        super.Exercise();
        // console.log("--------------------------exercise02 start------------------------");
        //变量声明
        /**let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 
         * const是对let的一个增强，它能阻止对一个变量再次赋值。 */
        var a = 10;
        function f1() { var msg = "Hello,World!"; return msg; }
        function f2() {
            var a = 5;
            return function g(){
                var b=a+1;
                return b;
            }
        }
        var g = f2();
        console.log(g());
        console.log(a);
    }

}