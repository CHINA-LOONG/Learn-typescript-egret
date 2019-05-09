/**
 * 本地基础数据,主要针对json文件
 * 将以数组形式存在的JSON文件进行统一管理
 * 如下格式user.json=[{},{},{}]
 * 通过file=user来查询这个表格,可通过扩展来完善仿sql
 * 另外需要注意：这样做的主要目的是为了将JSON的配置放置到Excel中，并利用工具自动创建.json,.ts文件
 * @see LocalDataTable
 * @author loong
 * @version 1.1
 */
class LocalData {


	private static _dataMap: Map<string, LocalDataTable> = new Map();


	public static loadLocalData(file: string): void {
		// let jsonName = file.substr(0,file.length - 2);
		// let values: Array<Object> = RES.getRes(json + "_json");
		let dataClass = egret.getDefinitionByName(file);
		let jsonName = dataClass.file;
		let values: Array<Object> = RES.getRes(jsonName);
		LocalData.createTable(file, values);
	}

	private static createTable(file: string, result: Array<Object>): LocalDataTable {
		let table: LocalDataTable = new LocalDataTable();
		table.initTable(file, result);
		LocalData._dataMap.set(file,table);
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