/**
 * 植物数据,可通过Grid的统计来计算,也可以通过三角形范围内的随机来运算
 * @author loong
 * @version 1.0
 */
class PlantData {

	//标志了数据库是否拥有这个植被区
	private _localAreaDic: Object = new Object();

	public resetConfig():void{
		localStorage.setItem(Server_Map.T_MAP_PLANTS,JSON.stringify(this._localAreaDic));
	}


}