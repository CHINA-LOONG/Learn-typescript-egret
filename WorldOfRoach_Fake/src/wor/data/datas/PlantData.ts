/**
 * 植物数据,可通过Grid的统计来计算,也可以通过三角形范围内的随机来运算
 * @author loong
 * @version 1.0
 */
class PlantData {

	/**标志了数据库是否拥有这个植被区 */
	private _localAreaDic: Object = new Object();

	/**标志了当前是否已加载了这个植被区 */
	private _areaData: Map<string, boolean> = new Map<string, boolean>();

	/**存放植被的树形结构[使用植被单元格],此结构比区域更小 小方格的植被列表*/
	private _plantsGrids: Map<string, Array<Object>> = new Map<string, Array<Object>>();

	/**保存当前存档 存储是否拥有植被去数据*/
	public resetConfig(): void {
		localStorage.setItem(Server_Map.T_MAP_PLANTS, JSON.stringify(this._localAreaDic));
	}

	/**加载存档 */
	public loadConfig(): void {
		let str: string = localStorage.getItem(Server_Map.T_MAP_PLANTS);
		this._localAreaDic = JSON.parse(str);
	}


	/**创建一个区域数据 */
	public createArea(key: string): void {
		//设置标示拥有大区数据
		this._localAreaDic[key] = true;
		//设置标示已经加载大区
		this._areaData.set(key,true);
		this.resetConfig();
	}

	/**是否拥有某个区域的数据 */
	public hasPlantArea(key: string): boolean {
		if (this._localAreaDic[key] == null)
			return false;
		else
			return true;
	}

	/**初始化植被区
	 * 将这些植物初始化到指定的树形结构中
	 * @param key大区的ID
	 * @param lst大区内的植被列表
	 */
	public initArea(key: string, lst: Array<Object>): void {
		let strs: string[] = key.split("_");
		let gx: number = Number(strs[0]);
		let gy: number = Number(strs[1]);
		//上面的数据其实是用不到的
		this.insertPlants(gx, gy, lst);
	}

	/**加载某个区域的数据,如果没有加载的话 */
	public loadArea(key: string): void {
		//检测是否已经加载过数据
		if (this._areaData.get(key) != null)
			return;
		this._areaData.set(key, true);
		let jsonStr: string = localStorage.getItem(Server_Map.T_MAP_PLANTS + key);
		let o: any = JSON.parse(jsonStr);
		this.initArea(key, o);
	}

	/**获取植被单元格区域植被 */
	public getAreaPlants(key:string):Array<Object>{
		return this._plantsGrids.get(key);
	}

	/**插入一个区域的植物
	 * @param px大区坐标
	 * @param py大区坐标
	 * @param lst ???
	 */
	private insertPlants(px: number, py: number, lst: Array<Object>): void {
		//px,py为大的区域编号,转换为小的删格编号
		let obj: Object;
		let gx: number;
		let gy: number;
		//获取大区左上角的x坐标
		let fromx: number = px * GameConfig.ROOM_CHECK_W;
		//获取大区左上角的y坐标
		let fromy: number = py * GameConfig.ROOM_CHECK_H;
		//获取大区右下角的x坐标
		let tox: number = fromx + GameConfig.ROOM_CHECK_W;
		//获取大区右下角的y坐标
		let toy: number = fromy + GameConfig.ROOM_CHECK_H;
		for (fromx; fromx < tox; fromx += GameConfig.ROOM_GRID_SIZE) {
			//fromy的值不能被修改所以单独赋值j
			for (let j: number = fromy; j < toy; j += GameConfig.ROOM_GRID_SIZE) {
				gx = Math.floor(fromx / GameConfig.ROOM_GRID_SIZE);
				gy = Math.floor(j / GameConfig.ROOM_GRID_SIZE);
				//插入每个植被区域的植被
				this._plantsGrids.set(gx + "_" + gy, new Array<Object>());
			}
		}

		let key: any;
		for (key in lst) {
			obj = lst[key];
			this._plantsGrids.get(obj["key"]).push(obj);
		}
	}

}