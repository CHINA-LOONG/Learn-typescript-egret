/**
 * 类型兼容性
 */
class TSLang_Exercise09 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**TypeScript里的类型兼容性是基于结构子类型的。     --相对的（名义类型系统）
     * 它是基于类型的组成结构，且不要求明确地声明。
     */
    private Exercise01() {
        /**子结构类型兼容 */
        interface Named {
            name: string;
        }
        class Person {
            name: string;
        }
        let p: Named;
        // OK, because of structural typing
        p = new Person();

        /**TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。 */
        /**这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 */
        let x: Named;
        // y's inferred type is { name: string; location: string; }
        let y = { name: 'Alice', location: 'Seattle' };
        x = y;
        /**检查函数参数时使用相同的规则： */
        function greet(n: Named) {
            console.log('Hello, ' + n.name);
        }
        greet(y); // OK



    }

    /**
     * 比较两个函数
     */
    private Exercise02() {
        let x = (a: number) => 0;
        let y = (b: number, s: string) => 0;

        y = x; // OK
        // x = y; // Error


        /**是忽略额外的参数在JavaScript里是很常见的。  */
        let items = [1, 2, 3];
        // Don't force these extra arguments
        items.forEach((item, index, array) => console.log(item));
        // Should be OK!
        items.forEach((item) => console.log(item));

        /**类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。 */
        /**注意此处只是函数类型的声明 */
        let x1 = () => ({ name: 'Alice' });
        let y1 = () => ({ name: 'Alice', location: 'Seattle' });

        x1 = y1; // OK
        // y1 = x1; // Error, because x() lacks a location property


    }

    public Exercise() {
        super.Exercise();
        this.Exercise01();
    }
}