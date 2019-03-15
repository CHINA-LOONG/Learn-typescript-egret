/**
 * 迭代器和生成器
 */
class TSLang_Exercise12 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 
     */
    private Exercise01() {
        /**可迭代性 */
        /**当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 */
        /**
         * for..of和for..in均可迭代一个列表；但是用于迭代的值却不同
         * for..in迭代的是对象的 键 的列表
         * for..of则迭代对象的键对应的值
         */
        let list = [4, 5, 6];

        for (let i in list) {
            console.log(i); // "0", "1", "2",
        }

        for (let i of list) {
            console.log(i); // "4", "5", "6"
        }


        /**
         * for..in可以操作任何对象；它提供了查看对象属性的一种方法。 
         * for..of关注于迭代对象的值。
        */
        //es6才拥有的
        // let pets = new Set(["Cat", "Dog", "Hamster"]);
        // pets["species"] = "mammals";
        // for (let pet in pets) {
        //     console.log(pet); // "species"
        // }
        // for (let pet of pets) {
        //     console.log(pet); // "Cat", "Dog", "Hamster"
        // }

        // 当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。 在非数组值上使用 for..of语句会得到一个错误
    }
    public Exercise() {
        super.Exercise();
        this.Exercise01();
    }
}