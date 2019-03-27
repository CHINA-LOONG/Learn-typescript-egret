
class LocalData {


	private static _dataMap: Map<string, LocalDataTable> = new Map();


	public static loadLocalData(file: string): void {
		let jsonName = egret.getDefinitionByName(file);
		// let jsonName = file.substr(0,file.length - 2);
		let json = jsonName.file;
		let values: Array<Object> = RES.getRes(json + "_json");
		LocalData.createTable(file, values);
	}

	private static createTable(file: string, result: Array<Object>): LocalDataTable {
		let table: LocalDataTable = new LocalDataTable();
		table.initTable(file, result);
		return table;
	}

	/**
	 * 根据key-value获取一个对象，如果有多个对象将返回第一个.如果没有符合条件的对象，返回null
	 * @param file 要获取的JSON名称
	 * @param args 参数对
	 */
	public static getObjectByKv(file: string, args: any): any {
		if (LocalData._dataMap.get(file) == null) {
			LocalData.loadLocalData(file);
		}
		return LocalData._dataMap.get(file);
	}


}