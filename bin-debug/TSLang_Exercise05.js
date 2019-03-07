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
 * 函数
 */
var TSLang_Exercise05 = (function (_super) {
    __extends(TSLang_Exercise05, _super);
    function TSLang_Exercise05() {
        return _super.call(this) || this;
    }
    /**
     * 函数介绍
     */
    TSLang_Exercise05.prototype.Exercise01 = function () {
        /**介绍
         * 函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。
         * 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 行为的
         * 地方。 TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。
         */
        /**和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 */
        function add(x, y) {
            return x + y;
        }
        var myAdd = function (x, y) { return x + y; };
        /**函数可以使用函数体外部的变量。 */
        var z = 100;
        function addToZ(x, y) {
            return x + y + z;
        }
    };
    /**
     * 函数类型
     */
    TSLang_Exercise05.prototype.Exercise02 = function () {
        /**为函数定义类型 --返回值类型 */
        /**TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。 */
        function add(x, y) {
            return x + y;
        }
        var myAdd1 = function (x, y) { return x + y; };
        /**书写完整函数类型 */ /**函数类型包含两部分：参数类型和返回值类型。 */
        var myAdd2 = function (x, y) { return x + y; };
        /**推断类型 */ /**TypeScript编译器会自动识别出类型 */
        var myAdd3 = function (x, y) { return x + y; };
    };
    /**
     * 可选参数和默认参数
     */
    TSLang_Exercise05.prototype.Exercise03 = function () {
        /**
         * JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。
         * 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。 */
        /**可选参数必须跟在必须参数后面。 */
        function buildName1(firstName, lastName) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }
        var result11 = buildName1("Bob"); // works correctly now
        // let result21 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
        var result31 = buildName1("Bob", "Adams"); // ah, just right
        /**
         * 在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。
         * 它们叫做有默认初始化值的参数。 */
        /**与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参
         * 数前面，用户必须明确的传入 undefined值来获得默认值。 */
        function buildName2(firstName, lastName) {
            if (firstName === void 0) { firstName = "Will"; }
            return firstName + " " + lastName;
        }
        // let result12 = buildName2("Bob");                  // error, too few parameters
        // let result22 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
        var result32 = buildName2("Bob", "Adams"); // okay and returns "Bob Adams"
        var result42 = buildName2(undefined, "Adams"); // okay and returns "Will Adams"
    };
    /**
     * 剩余参数
     */
    TSLang_Exercise05.prototype.Exercise04 = function () {
        /**必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时
         * 操作多个参数，或者你并不知道会有多少参数传递进来。 */
        /**在TypeScript里，你可以把所有参数收集到一个变量里 */
        function buildName(firstName) {
            var restOfName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restOfName[_i - 1] = arguments[_i];
            }
            console.log(firstName); //Joseph
            console.log(restOfName); //Array(3) ["Samuel", "Lucas", "MacKinzie"]
            return firstName + " " + restOfName.join(" ");
        }
        var employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
    };
    /**
     * this
     */
    TSLang_Exercise05.prototype.Exercise05 = function () {
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
        var deck2 = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // createCardPicker: function () {
            //     return () => {
            //         let pickedCard = Math.floor(Math.random() * 52);
            //         let pickedSuit = Math.floor(pickedCard / 13);
            //         return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            //     }
            // }
            createCardPicker: function () {
                var _this = this;
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
                };
            }
        };
        var cardPicker2 = deck2.createCardPicker();
        var pickedCard2 = cardPicker2();
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
        var uiElement;
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
        var Handler = (function () {
            function Handler() {
                var _this = this;
                this.onClickGood = function (e) { _this.info = e.type; };
            }
            return Handler;
        }());
        /**因为箭头函数不会捕获this，所以你总是可以把它们传给期望this: void的函数。 缺点是每个 Handler
         * 对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不
         * 同 Handler对象间是共享的。 */
    };
    /**
     * 重载
     */
    TSLang_Exercise05.prototype.Exercise06 = function () {
        /**JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据 */
        var suits = ["hearts", "spades", "clubs", "diamonds"];
        /**一下两个属于重载 */
        // function pickCard(x: {suit: string; card: number; }[]): number;
        // function pickCard(x: number): {suit: string; card: number; };
        function pickCard(x) {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                var pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            else if (typeof x == "number") {
                var pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }
        var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        var pickedCard1 = myDeck[pickCard(myDeck)];
        alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
        var pickedCard2 = pickCard(15);
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
        var pickedCard3 = pickCard("aaaa"); // error不使用重载不会限制输入；
    };
    TSLang_Exercise05.prototype.Exercise = function () {
        _super.prototype.Exercise.call(this);
        this.Exercise05();
    };
    return TSLang_Exercise05;
}(TSLang_ExerciseBase));
__reflect(TSLang_Exercise05.prototype, "TSLang_Exercise05");
//# sourceMappingURL=TSLang_Exercise05.js.map