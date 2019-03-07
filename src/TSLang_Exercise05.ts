/**
 * 函数
 */
class TSLang_Exercise05 extends TSLang_ExerciseBase {
    public constructor() {
        super();
    }
    /**
     * 函数介绍
     */
    private Exercise01() {
        /**介绍
         * 函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 
         * 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的
         * 地方。 TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。
         */

        /**和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 */
        function add(x, y) {
            return x + y;
        }
        let myAdd = function (x, y) { return x + y; };
        /**函数可以使用函数体外部的变量。 */
        let z = 100;
        function addToZ(x, y) {
            return x + y + z;
        }
    }
    /**
     * 函数类型
     */
    private Exercise02() {
        /**为函数定义类型 --返回值类型 */
        /**TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。 */
        function add(x: number, y: number): number {
            return x + y;
        }
        let myAdd1 = function (x: number, y: number): number { return x + y; };
        /**书写完整函数类型 *//**函数类型包含两部分：参数类型和返回值类型。 */
        let myAdd2: (x: number, y: number) => number = function (x: number, y: number): number { return x + y; };
        /**推断类型 *//**TypeScript编译器会自动识别出类型 */
        let myAdd3: (baseValue: number, increment: number) => number = function (x, y) { return x + y; };

    }
    /**
     * 可选参数和默认参数
     */
    private Exercise03() {
        /**
         * JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 
         * 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。 */

        /**可选参数必须跟在必须参数后面。 */
        function buildName1(firstName: string, lastName?: string) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }
        let result11 = buildName1("Bob");  // works correctly now
        // let result21 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
        let result31 = buildName1("Bob", "Adams");  // ah, just right

        /**
         * 在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 
         * 它们叫做有默认初始化值的参数。 */
        /**与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参
         * 数前面，用户必须明确的传入 undefined值来获得默认值。 */
        function buildName2(firstName = "Will", lastName: string) {
            return firstName + " " + lastName;
        }
        // let result12 = buildName2("Bob");                  // error, too few parameters
        // let result22 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
        let result32 = buildName2("Bob", "Adams");         // okay and returns "Bob Adams"
        let result42 = buildName2(undefined, "Adams");     // okay and returns "Will Adams"
    }
    /**
     * 剩余参数
     */
    private Exercise04() {
        /**必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时
         * 操作多个参数，或者你并不知道会有多少参数传递进来。 */
        /**在TypeScript里，你可以把所有参数收集到一个变量里 */
        function buildName(firstName: string, ...restOfName: string[]) {
            console.log(firstName);//Joseph
            console.log(restOfName);//Array(3) ["Samuel", "Lucas", "MacKinzie"]
            return firstName + " " + restOfName.join(" ");
        }
        let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
    }
    /**
     * this
     */
    private Exercise05() {
        /**TypeScript能通知你错误地使用了 this的地方。 如果你想了解JavaScript里的 this
         * 是如何工作的，那么首先阅读Yehuda Katz写的Understanding JavaScript Function 
         * Invocation and "this"。 */
        // let deck = {
        //     suits: ["hearts", "spades", "clubs", "diamonds"],
        //     cards: Array(52),
        //     createCardPicker: function () {
        //         return function () {
        //             let pickedCard = Math.floor(Math.random() * 52);
        //             let pickedSuit = Math.floor(pickedCard / 13);

        //             return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        //         }
        //     }
        // }

        // let cardPicker = deck.createCardPicker();
        // let pickedCard = cardPicker();
        // alert("card: " + pickedCard.card + " of " + pickedCard.suit);

        /**可以看到createCardPicker是个函数，并且它又返回了一个函数。 如果我们尝试运行这个程序，
         * 会发现它并没有弹出对话框而是报错了。 因为 createCardPicker返回的函数里的this被设置成
         * 了window而不是deck对象。 因为我们只是独立的调用了 cardPicker()。 顶级的非方法式调用
         * 会将 this视为window。 （注意：在严格模式下， this为undefined而不是window）。 */

        /**箭头函数能保存函数创建时的 this值，而不是调用时的值： */
        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            //返回值是一个方法，方法的返回值是Card
            createCardPicker(this: Deck): () => Card;
        }
        let deck2 = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // createCardPicker: function () {
            //     return () => {
            //         let pickedCard = Math.floor(Math.random() * 52);
            //         let pickedSuit = Math.floor(pickedCard / 13);

            //         return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            //     }
            // }
            createCardPicker: function (this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
                }
            }
        }

        let cardPicker2 = deck2.createCardPicker();
        let pickedCard2 = cardPicker2();
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);



        /**this参数在回调函数里 */
        interface UIElement {
            addClickListener(onclick: (this: void, e: Event) => void): void;
        }
        let uiElement: UIElement;

        // class Handler {
        //     info: string;
        //     onClickBad(this: Handler, e: Event) {
        //         // oops, used this here. using this callback would crash at runtime
        //         this.info = e.type;
        //     }
        // }
        // let h = new Handler();
        // uiElement.addClickListener(h.onClickBad); // error!这里的This已经是UIElement实例
        /**指定了this类型后，你显式声明onClickBad必须在Handler的实例上调用。 然后TypeScript会检
         * 测到 addClickListener要求函数带有this: void。 */

        // class Handler {
        //     info: string;
        //     onClickGood(this: void, e: Event) {
        //         // can't use this here because it's of type void!
        //         console.log('clicked!');
        //         // this.info = e.type;//error:这里的this已经是传入的对象
        //     }
        // }
        // let h = new Handler();
        // uiElement.addClickListener(h.onClickGood);
        /**因为onClickGood指定了this类型为void，因此传递addClickListener是合法的。 当然了，这也意味
         * 着不能使用 this.info.  */

        class Handler {
            info: string;
            onClickGood = (e: Event) => { this.info = e.type; }
        }
        /**因为箭头函数不会捕获this，所以你总是可以把它们传给期望this: void的函数。 缺点是每个 Handler
         * 对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不
         * 同 Handler对象间是共享的。 */
    }
    /**
     * 重载
     */
    private Exercise06() {
        /**JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据 */
        let suits = ["hearts", "spades", "clubs", "diamonds"];
        /**一下两个属于重载 */
        // function pickCard(x: {suit: string; card: number; }[]): number;
        // function pickCard(x: number): {suit: string; card: number; };
        function pickCard(x): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }
        

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

        let pickedCard3 = pickCard("aaaa");// error不使用重载不会限制输入；
    }
    public Exercise() {
        super.Exercise();

        this.Exercise05();
    }
}