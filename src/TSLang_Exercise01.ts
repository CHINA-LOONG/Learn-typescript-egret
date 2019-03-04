/**
 * 基础类型
 */
class TSLang_Exercise01 extends TSLang_ExerciseBase {
	public constructor() {
		super();
	}
	public Exercise() {
		super.Exercise();
		//boolean
		let isDone: boolean = false;
		console.log(isDone);
		//number
		let decLiteral: number = 6;
		let hexLiteral: number = 0x00d;
		let binaryLiteral: number = 0b1010;
		let octalLiteral: number = 0o744;
		console.log(decLiteral + "\n" + hexLiteral + "\n" + binaryLiteral + "\n" + octalLiteral);
		//string
		let name: string = 'loong';
		name = "smith";
		let age: number = 28;
		let sentence1: string = `Hello,my name is ${name}.\n\nI'll be ${age + 4} years old next next year.`;

		let sentence2: string = "Hello,my name is " + name +
			'.\n\n' +
			`I'll be ${age + 5} years old next next year.`;
		console.log(sentence1);
		console.log(sentence2);
		//数组
		let list1: number[] = [1, 2, 3];
		let list2: Array<number> = [1, 2, 3];
		console.log(list1);
		console.log(list2);
		//元组Tuple
		let x: [string, number];	//类型范围
		x = ["Hello", 10];			//初始化
		x[3] = 'world';			//赋值
		console.log(x);
		console.log(x[0].substr(1));
		console.log(x[2]);
		//枚举
		enum Color { Red = 1, Green = 3, Blue }
		let c: Color = Color.Blue;
		let cName: string = Color[3];
		console.log(c);
		console.log(c.toString());
		console.log(cName);//Green

		//跳过类型检查Any
		let notSure: any = 4;
		notSure = "maybe a string instead";
		notSure = false;
		let anyList: any[] = [1, false, "test"];
		anyList[1] = 3.14;
		console.log(anyList);
		//Void 
		function warnUser2(): void { }	//没有返回值的函数
		let unusable1: void = undefined;  //没有意义的变量
		let unusable2: void = null;
		//Null--undefined
		let n: null = null;			//当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
		let u: undefined = undefined;	//可以把 null和undefined赋值给number类型的变量。
		// Never
		/**never类型表示的是那些永不存在的值的类型。例如， never类型是那些总是会抛出异常或根
		 * 本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，
		 * 当它们被永不为真的类型保护所约束时。 
		 * never类型是任何类型的子类型，也可以赋值给任何类型；*/
		// 返回never的函数必须存在无法达到的终点
		function error(message: string): never {
			throw new Error(message);
		}
		// 推断的返回值类型为never
		function fail() {
			return error("Something failed");
		}
		// 返回never的函数必须存在无法达到的终点
		function infiniteLoop(): never {
			while (true) {
			}
		}
		//Object
		/**object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之
		 * 外的类型。使用object类型，就可以更好的表示像Object.create这样的API。以及自定义类型*/
		//此处的Object类型不同于讲解的object类型--需要替换object或string测试报错
		function create1(o: Object | null): void { console.log(o); };
		function create2(o: Object | null) { console.log(o); };
		create1({ prop: 0 }); // OK
		create1(null); // OK

		create1(42); // Error
		create1("string"); // Error
		create1(false); // Error
		create1(undefined); // Error

		//类型断言---强制类型转换
		/** 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，
		 * 只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。 */
		let someValue1: any = "this is a string";
		let strLength1: number = (<string>someValue1).length;
		console.log(someValue1 + `的字符串长度是:${strLength1}`);
		let someValue2: any = "this is a long string";
		let strLength2: number = (someValue2 as string).length;

		/**可能地使用let来代替var */
	}
}