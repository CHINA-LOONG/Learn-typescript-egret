/**
 * 房间创建器
 * 经过测试得出结论,房间的创建要在地图创建之初就初始化好并且写到本地
 * @author loong
 * @version 1.0
 */
class RoomMaker implements IRender {

	private static _grids: number[] = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, 1, -1, 1, 1, -1, 1, -1, -1];
	private static _ins: RoomMaker;
	private _id: number = 1;

	/**横向场景内的栅格数 */
	private _maxWPos: number;
	/**纵向场景内的栅格数 */
	private _maxHPos: number;

	/**一个横向大区栅格内的格子数量 */
	private _sgWCount: number;
	/**一个纵向大区栅格内的格子数量 */
	private _sgHCount: number;
	/*-------------地形计数器--------------*/
	/**(临时存储，通类型遍历到第几个方格)非水域地形类型的计数 */
	private _counter: Map<number, number> = new Map<number, number>();
	/**不同类型多少个方格随机一个植被配置 */
	private _plantCounter: Map<number, Object> = new Map<number, Object>();
	/**(随机坐标临时存储)非水域地形类型的区域记录 每个区域x,y两个元素*/
	private _plantRandomArea: Map<number, number[]> = new Map<number, number[]>();
	private _waitForDelPlants: string[] = [];
	private _focusPlants: string[] = [];


	public static get instance(): RoomMaker {
		if (RoomMaker._ins == null)
			RoomMaker._ins = new RoomMaker();
		return RoomMaker._ins;
	}


	public constructor() {
		//植被存储的大区数量计算
		//100
		this._maxWPos = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_CHECK_W);
		//100
		this._maxHPos = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_CHECK_H);
		//每个大区中小区的数量
		//10
		this._sgWCount = Math.floor(GameConfig.ROOM_CHECK_W / GameConfig.GRID_W);
		//20   为何*2？？？
		this._sgHCount = Math.floor(GameConfig.ROOM_CHECK_H / GameConfig.GRID_H) * 2;
		//计算地图的比例  200000/801  100000/801
		GameConfig.map_cfx = GameConfig.WORD_W / GameData.mapData.baseMap.$bitmapWidth;
		GameConfig.map_cfy = GameConfig.WORD_H / GameData.mapData.baseMap.$bitmapHeight;
	}

	/**根据大区位置进行初始化创建
	 * @param fromX大区的位置index
	 * @param fromY大区的位置index
	 */
	public initCreate(fromX: number, fromY: number): void {
		let initLst: string[] = [];
		let tox: number;
		let toy: number;
		let key: string;
		//遍历当前大区的周围以及自身位置
		for (let i: number = 0; i < RoomMaker._grids.length; i += 2) {
			tox = fromX + RoomMaker._grids[i];
			toy = fromY + RoomMaker._grids[i + 1];
			//检测是否是合法的大区index
			if (tox < 0 || toy < 0 || tox >= this._maxWPos || toy > this._maxHPos) {
				LogTrace.log("出现了某种问题");
				continue;
			}
			key = tox + "_" + toy;
			//是否拥有这块区域的植被数据
			if (GameData.plantData.hasPlantArea(key)) {
				GameData.plantData.loadArea(key);
			}
			else {
				//记录大区植被的标致
				GameData.plantData.createArea(key);
				//创建大区植被
				this.createArea(tox, toy);
			}
			initLst.push(key);
		}
		this.delArea(initLst);
	}

	/**过滤区域,方便维护(在玩家比较空闲的时候来做删除操作) */
	private delArea(newLst: string[]): void {
		let key:any;
		let keyStr:string;
		
		//从待删除列表删除新价值的，保留准备删除的
		for(key in newLst){
			keyStr = newLst[key];
			let index:number = this._waitForDelPlants.indexOf(keyStr);
			if(index>=0)
				this._waitForDelPlants.splice(index,1);
		}

		for(key in this._focusPlants){
			keyStr = this._focusPlants[key];
			//加入待删除列表
			if(newLst.indexOf(keyStr)<0&&this._waitForDelPlants.indexOf(keyStr)<0)
				this._waitForDelPlants.push(keyStr);
		}
		this._focusPlants = newLst;
	}

	/**立即创建某个区域的数据 */
	public createArea(fromX: number, fromY: number): void {
		let key: any;
		let ft: number;
		//遍历所有类型的地形
		for (key in LloydMapData._fixFloorTypes) {
			ft = LloydMapData._fixFloorTypes[key];
			//跳过大海和湖泊类型-不创建对象
			if (ft == LloydMapData.SEA || ft == LloydMapData.LAKE)
				continue;

			this._counter.set(ft, 0);
			this._plantRandomArea.set(ft,[]);
		}
		//植被存储列表
		let lst:Array<Object> = new Array<Object>();
		//计算小格子的开始和结束索引
		let x1:number = fromX*this._sgWCount;
		let x2: number = x1 + this._sgWCount;
		let y1: number = fromY * this._sgHCount;
		let y2: number = y1 + this._sgHCount;


		let pos:egret.Point;
		//遍历大区内的所有小方格区域
		for(let i:number=x1;i<x2;i+=1){
			for(let j:number = y1;j<y2;j+=2){
				//获取方格的坐标
				pos = MapUtil.getPosByGrid(i,j);
				//获取方格位置的地形类型
				ft = GameData.mapData.getFloorTypeByPx(pos.x,pos.y);
				if(ft<=0)//非法地图无视
					continue;
				else if(ft == LloydMapData.SEA||ft == LloydMapData.LAKE)
					continue;
				let c:number = this._counter.get(ft);
				c++;
				this._plantRandomArea.get(ft).push(i);
				this._plantRandomArea.get(ft).push(j);
				if(c==1)//获取一个植物
					this._plantCounter.set(ft,this.getRandomPlantType(ft));
				else if(c>=this._plantCounter.get(ft)["count"]){
					c = 0;
					//植被数据加入到植被列表
					lst.push(this.getPlant(this._plantCounter.get(ft),this._plantRandomArea.get(ft)));
					this._plantRandomArea.set(ft,[]);
				}
				this._counter.set(ft,c);
			}
		}
		//根据大区的植被列表创建植被
		GameData.plantData.initArea(fromX+"_"+fromY,lst);
		//存储指定大区的植被列表
		SaveManager.instance.savePlants(fromX+"_"+fromY,JSON.stringify(lst));
	}


	/**通过模版文件和范围获取一个植物数据对象 */
	private getPlant(target:Object,pxes:number[]):Object{
		let obj:Object = new Object();
		obj["id"]=this._id++;
		//从固定的方格数量中随机出一个
		let ridx:number = Math.floor(Math.random()*(pxes.length/2))*2;
		let gx:number = pxes[ridx];
		let gy:number = pxes[ridx+1];
		//获取随机到的方格中心点
		let centerPoint:egret.Point = MapUtil.getPosByGrid(gx,gy);
		obj["x"] = Math.floor(centerPoint.x -GameConfig.GRID_W/4+Math.random()*GameConfig.GRID_W/2);
		obj["y"] = Math.floor(centerPoint.y -GameConfig.GRID_H/4+Math.random()*GameConfig.GRID_H/2);
		//小方格的坐标作为key
		obj["key"] = Math.floor(centerPoint.x/GameConfig.ROOM_GRID_SIZE)+"_"+Math.floor(centerPoint.y/GameConfig.ROOM_GRID_SIZE);
		//这里还缺少配置文件中的一些其他数据,比如生长等
		return obj;
	}

	private getRandomPlantType(ft:number):Object{
		return JSON.parse("{\"count\":8}");
	}

	public renderUpdate(interval: number): void {

	}
}