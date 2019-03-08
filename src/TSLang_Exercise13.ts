/**
 * 模块   --未完成
 */
class TSLang_Exercise13 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 介绍
     */
    private Exercise01() {
        /**
         * “内部模块”现在称做“命名空间”。 
         * “外部模块”现在则简称为“模块”
         */
        /**
         * 模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，
         * 除非你明确地使用export形式之一导出它们。 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它
         * 们，可以使用 import形式之一。
         */
        /**
         * 任何包含顶级import或者export的文件都被当成一个模块。相反地，
         * 如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。
         */
    }
    /**
     * 导出
     */
    private Exercise02() {
        /* 变量，函数，类，类型别名或接口 */
        // export interface StringValidator {
        //     isAcceptable(s: string): boolean;
        // }
        // export const numberRegexp = /^[0-9]+$/;

        // export class ZipCodeValidator implements StringValidator {
        //     isAcceptable(s: string) {
        //         return s.length === 5 && numberRegexp.test(s);
        //     }
        // }

        /* 导出的部分重命名 */
        // class ZipCodeValidator implements StringValidator {
        //     isAcceptable(s: string) {
        //         return s.length === 5 && numberRegexp.test(s);
        //     }
        // }
        // export { ZipCodeValidator };
        // export { ZipCodeValidator as mainValidator };

        /* 我们经常会去扩展其它模块，并且只导出那个模块的部分内容。 重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量。 */
        // export class ParseIntBasedZipCodeValidator {
        //     isAcceptable(s: string) {
        //         return s.length === 5 && parseInt(s).toString() === s;
        //     }
        // }

        // // 导出原先的验证器但做了重命名  --假设在新文件里面对类型进行了修改，可以修改名字导出。使用时使用此次导出的内容
        // export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";


        /* 一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。 */
        // export * from "./StringValidator"; // exports interface StringValidator
        // export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
        // export * from "./ZipCodeValidator";  // exports class ZipCodeValidator
    }
    /**
     * 导入
     */
    private Exercise03() {
        /* 导入一个模块中的某个导出内容 */
        // import { ZipCodeValidator } from "./ZipCodeValidator";
        // let myValidator = new ZipCodeValidator();

        /* 对导入内容重命名 */
        // import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
        // let myValidator = new ZCV();

        /* 将整个模块导入到一个变量，并通过它来访问模块的导出部分 */
        // import * as validator from "./ZipCodeValidator";
        // let myValidator = new validator.ZipCodeValidator();

        /* 直接强制导入文件内容 */
        // import "./my-module.js";
    }
    /**
     * 默认导出
     */
    private Exercise04() {
        /**每个模块都可以有一个default导出。 默认导出使用 default关键字标记；
         * 并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出。 */
        // declare let $: JQuery;
        // export default $;

        /*应用*/
        // import $ from "JQuery";
        // $("button.continue").html("Next Step...");

        /* 标记为默认导出的类和函数的名字是可以省略的。 */  /* 可导出任何可以导出的内容 */
        // export default class ZipCodeValidator {
        //     static numberRegexp = /^[0-9]+$/;
        //     isAcceptable(s: string) {
        //         return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
        //     }
        // }
        /*应用*/
        // import validator from "./ZipCodeValidator";
        // let myValidator = new validator();
    }
    /**
     * export = 和 import = require()
     */
    private Exercise05() {
        /**CommonJS和AMD的环境里都有一个exports变量，这个变量包含了一个模块的所有导出内容。 */
        /**为了支持CommonJS和AMD的exports, TypeScript提供了export =语法。 */

        /**若使用export =导出一个模块，则必须
         * 使用TypeScript的特定语法import module = require("module")来导入此模块。 */
        /* 导出 */
        // let numberRegexp = /^[0-9]+$/;
        // class ZipCodeValidator {
        //     isAcceptable(s: string) {
        //         return s.length === 5 && numberRegexp.test(s);
        //     }
        // }
        // export = ZipCodeValidator;
        /* 导入 */
        // import zip = require("./ZipCodeValidator");

        // // Some samples to try
        // let strings = ["Hello", "98052", "101"];

        // // Validators to use
        // let validator = new zip();

        // // Show whether each string passed each validator
        // strings.forEach(s => {
        //     console.log(`"${s}" - ${validator.isAcceptable(s) ? "matches" : "does not match"}`);
        // });




    }
    public Exercise() {
        super.Exercise();
        this.Exercise01();
    }
}