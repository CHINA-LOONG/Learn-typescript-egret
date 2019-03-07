/**
 * 类型推论
 */
class TSLang_Exercise08 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 基础
     */
    private Exercise01() {
        //变量x的类型被推断为数字。
        let x1 = 3;
        //为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
        let x2 = [0, 1, null];
        // 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]
        // let zoo = [new Rhino(), new Elephant(), new Snake()];

        //TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。
        window.onmousedown = function(mouseEvent) {console.log(mouseEvent.button); };
        console.log("1234321");

        /**最佳通用类型有4个候选者：Animal，Rhino，Elephant和Snake。 当然， Animal会被做为最佳通用类型。 */
    }
    public Exercise() {
        super.Exercise();
        this.Exercise01();
    }
}