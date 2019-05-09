/**
 * 基础数据表
 * @author loong
 * @version 1.0
 */
class LocalDataTable {
	public name: string;
	public datas: Array<any>;
	public constructor() {
		this.datas = new Array<any>();
	}


	public initTable(file: string, values: Array<Object>): void {
		this.name = file;
		let obj: Object;
		let cls = egret.getDefinitionByName(file);
		let value: any;
		while (values.length > 0) {
			obj = values.pop();
			value = new cls();
			ObjectUtil.copyTo(obj, value);
			this.datas.push(value);
		}
	}

	public getObject(args: any): any {
		let value: any;
		let key: any;
		let flag: boolean = false;
		for (value of this.datas) {
			flag = true;
			for (key in args) {
				if (args[key] != value[key]) {
					flag = false;
					break;
				}
			}
			if (flag)
				return value;
		}
		return null;
	}

}