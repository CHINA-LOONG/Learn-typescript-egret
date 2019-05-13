/**
 * 舞台层级,包括一切地标以上的物件与角色
 * 主要包括人物,npc,生物,敌人,植被,矿物
 * 植被:循环计数法创建植被
 * @author loong
 * @version 1.0
 */
class StageLayer extends egret.DisplayObjectContainer {

	public static self: StageLayer;
	/**世界横向小区格子总数 */
	public static __xGridCount: number;//世界横向格子总数
	/**世界纵向小区格子总数 */
	public static __yGridCount: number;//世界纵向格子总数
	/**碰撞检测的周边索引 */
	private static _hitRound: number[] = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, -1, -1, 1, -1, -1, 1, 1, 1];

	/**横向植被单元格子总数 */
	private _maxRollW: number;
	/**纵向植被单元格子总数 */
	private _maxRollH: number;
	/**横向显示向需要加载的植被单元格子数量 */
	private _wCount: number;
	/**纵向显示向需要加载的植被单元格子数量 */
	private _hCount: number;
	/**大区构建器 */
	private _roomMaker: RoomMaker;
	/**场景宽度 200000 */
	private _wordW: number;
	/**场景高度 100000 */
	private _wordH: number;
	/**场景显示开始坐标 */
	private _startX: number = -100000;
	/**场景显示开始坐标 */
	private _startY: number = -100000;
	/**加载区域左上角点坐标 */
	private _rollPx: number;
	/**加载区域左上角点坐标 */
	private _rollPy: number;
	//----------------当前显示的格子范围------------------
	private _gridX_from: number = -1;
	private _gridX_to: number = -1;
	private _gridY_from: number = -1;
	private _gridY_to: number = -1;
	//----------------显示对象的维护---------------
	private _step: number = -1;
	/**角色链表 */
	private _roleLink: LinkArray;
	/**用于碰撞检测的grids 存储植被单元格-->单元格内植被列表*/
	private _roleGirds: Map<string, Array<IRole>> = new Map<string, Array<IRole>>();//用于碰撞检测的grids
	/**最近一次碰撞检测的数组 */
	private _hitTestArray: string[] = [];//最近一次碰撞检测的数组
	/**最近一次碰撞检测的核心点 */
	private _hitTestPoint: egret.Point = new egret.Point(-1, -1);//最近一次碰撞检测的核心点

	public constructor(worldW: number, worldH: number) {
		super();
		StageLayer.self = this;
		//
		this._roleLink = new LinkArray();
		this._roomMaker = new RoomMaker();
		//场景宽度200000
		this._wordW = worldW;
		//场景高度100000
		this._wordH = worldH;
		//计算得到在当前屏幕尺寸下,横向需要展现的格子数量，纵向需要展现的格子数量
		//((先计算需要显示的地图距离➕植被格子大小✖️2)➗植被格子大小)➕固定植被格子大小
		this._wCount = Math.round((WindowsMgr.instance.gameStage().stageWidth / WindowsMgr.scaleX + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE);
		this._hCount = Math.round((WindowsMgr.instance.gameStage().stageHeight / WindowsMgr.scaleY + GameConfig.ROOM_GRID_SIZE * 2) / GameConfig.ROOM_GRID_SIZE) + 1;
		//计算纵向横向植被格子总数
		this._maxRollW = Math.floor(GameConfig.WORD_W / GameConfig.ROOM_GRID_SIZE);
		this._maxRollH = Math.floor(GameConfig.WORD_H / GameConfig.ROOM_GRID_SIZE);
		//计算纵向横向总共的地面格子数量 1000*2000
		StageLayer.__xGridCount = Math.floor(this._wordW / FloorLayer.floorSelf._gridW);
		StageLayer.__yGridCount = Math.floor(this._wordH / FloorLayer.floorSelf._gridH) * 2;///？？*2
	}


	/**强制初始化一个植被区域的显示
	 * @param px植被单元格的x索引
	 * @param py植被单元格的y索引
	 */
	private addAreaInit(px: number, py: number): void {
		let areaKey: string = px + "_" + py;
		//获取植被单元格内的植被列表
		let plants: Array<Object> = GameData.plantData.getAreaPlants(areaKey);
		//将plants中的所有对象都构建为对应的植物,并添加到链表对象中
		let key: any;
		let obj: Object;
		let plant: Plant;
		for (key in plants) {
			obj = plants[key];
			plant = PlantMaker.getPlant(obj);
			this.addRoleToLink(plant, areaKey);
		}
	}

	/**
	 * 删除整个区域的显示(数据不在这里维护,只是删除显示)
	 * 通过数据中的ID来进行删除
	 */
	private delArea(areaKey: string): void {
		var delLst: Array<IRole> = this._roleGirds.get(areaKey);
		if (delLst != null) {
			while (delLst.length > 0) {
				this.removeRoleFromLink(delLst.pop());
			}
		}
		this._roleGirds.delete(areaKey);
	}

	/**
	 * 预加载并显示区域
	 */
	private preAddArea(px: number, py: number): void {
		// var plants: Array<Object> = GameData.plantData.getAreaPlants(px + "_" + py);
		// if (plants == null)
		// 	LogTrace.log("植被显示速度超过了植被数据的生成速度");
		var areaKey: string = px + "_" + py;
		var plants: Array<Object> = GameData.plantData.getAreaPlants(areaKey);
		//将plants中的所有对象都构建为对应的植物,并添加到链表对象中
		var key: any;
		var obj: Object;
		var plant: Plant;
		for (key in plants) {
			obj = plants[key];
			plant = PlantMaker.getPlant(obj);
			this.addRoleToLink(plant, areaKey);
		}
	}

	/**
	 * 将一个对象添加到显示链表中 
	 * @param 添加的对象
	 * @param 添加到的区域Id
	 */
	public addRoleToLink(lk: egret.DisplayObject, areaKey: string = null): void {
		let index: number = this._roleLink.put(lk);
		this.addChildAt(lk, index);
		let irole: IRole = lk as any;
		irole.setAreaKey(areaKey);
		irole.added();
		if (areaKey == null)
			return;
		//添加到区域对象列表
		if (this._roleGirds.get(areaKey) == null)
			this._roleGirds.set(areaKey, new Array<IRole>());
		this._roleGirds.get(areaKey).push(irole);
	}

	/**尝试初始化当前屏幕区域
	 * 屏幕左上角坐标
	 * @param toX显示区域X轴 左上角的点坐标
	 * @param toY显示区域Y轴 左上角的点坐标
	 * 注意：从这个点往右下是显示区域
	 */
	public initSynArea(sx: number, sy: number): void {
		//设置当前要加载的左上角的点坐标
		this._rollPx = sx;
		this._rollPy = sy;
		//获取植被大区所在的索引坐标
		let p: egret.Point = MapUtil.getRoomPosByPosition(sx, sy);
		//记录大区的开始索引坐标
		this._startX = p.x;
		this._startY = p.y;
		//创建大区的植被
		this._roomMaker.initCreate(this._startX, this._startY);
		//计算植被单元格索引
		let gridX_1: number = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
		let gridX_2: number = gridX_1 + this._wCount;
		let gridY_1: number = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
		let gridY_2: number = gridY_1 + this._hCount;
		//检测植被单元格是否在有效范围
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxRollW)
			gridX_2 = this._maxRollW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxRollH)
			gridY_2 = this._maxRollH;
		this.initCreate(gridX_1, gridX_2, gridY_1, gridY_2);
		FogForGrid.instance.updateFogs();
	}


	public trySynArea(sx: number, sy: number): void {
		let p: egret.Point = MapUtil.getRoomPosByPosition(sx, sy);
		if (p.x != this._startX || p.y != this._startY) {
			this._startX = p.x;
			this._startY = p.y;
			this._roomMaker.synCreate(this._startX, this._startY);
			return;//由于这一步操作运算量很大,所以这一步不再做任何操作
		}
		//检查是否要滚动
		if (Math.abs(sx - this._rollPx) > GameConfig.ROOM_GRID_SIZE || Math.abs(sy - this._rollPy) > GameConfig.ROOM_GRID_SIZE) {
			this._rollPx = sx;
			this._rollPy = sy;
			this.rollOver();
		}
		if (this._step == 1)//刷新迷雾
		{
			FogForGrid.instance.updateFogs();
			this._step = -1;
		}
	}
	/**
	 * 检查需要隐藏哪些,显示哪些
	 * 以gameConfig中的room_size为基础,求的当前屏幕显示范围,上下左右各扩展一格
	 */
	private rollOver(): void {
		var gridX_1: number = Math.floor(this._rollPx / GameConfig.ROOM_GRID_SIZE) - 1;
		var gridX_2: number = gridX_1 + this._wCount;
		var gridY_1: number = (Math.floor(this._rollPy / GameConfig.ROOM_GRID_SIZE) - 1);
		var gridY_2: number = gridY_1 + this._hCount;
		if (gridX_1 < 0)
			gridX_1 = 0;
		if (gridX_2 > this._maxRollW)
			gridX_2 = this._maxRollW;
		if (gridY_1 < 0)
			gridY_1 = 0;
		if (gridY_2 > this._maxRollH)
			gridY_2 = this._maxRollH;
		this.changeDeleteAndCreate(gridX_1, gridX_2, gridY_1, gridY_2);
		this._step = 1;
	}
	/**通过坐标获取当前所在房间的Key 
	 *@return 返回坐标所在的植被单元格 
	 */
	private getRoomKey(px: number, py: number): egret.Point {
		//计算坐标所在的植被单元格
		let gridX: number = Math.floor(px / GameConfig.ROOM_GRID_SIZE);
		let gridY: number = Math.floor(py / GameConfig.ROOM_GRID_SIZE);
		//植被单元格的有效处理
		if (gridX < 0)
			gridX = 0;
		else if (gridX > this._maxRollW)
			gridX = this._maxRollW;
		if (gridY < 0)
			gridY = 0;
		else if (gridY > this._maxRollH)
			gridY = this._maxRollH;

		return new egret.Point(gridX, gridY);
	}

	/**重置当前碰撞检测区域 */
	private resetHitTestArray(): void {
		let i: number = 0;
		let len: number = StageLayer._hitRound.length;
		this._hitTestArray = [];
		for (i; i < len; i += 2)
			this._hitTestArray.push((this._hitTestPoint.x + StageLayer._hitRound[i]) + "_" + (this._hitTestPoint.y + StageLayer._hitRound[i + 1]));
	}


	/**初始化树显示结构
		 * 初始化的树显示队列具有排序链表的数据结构,这样可以最大限度的减少后期的排序,只需要自排动态对象
		 * @param x1植被单元格x开始
		 * @param x2植被单元格x结束
		 * @param y1植被单元格y开始
		 * @param y2植被单元格y结束
		 */
	private initCreate(x1: number, x2: number, y1: number, y2: number): void {
		let px: number = x1;
		let py: number = y1;
		//遍历向地面对象中插入植被
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.addAreaInit(px, py);
			}
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
		//使所有场景角色按照Y坐标进行排序
		this._roleLink.buildLink("y");
		this.sortAllChildren();
	}

	/**更改删除和添加列表 */
	private changeDeleteAndCreate(x1: number, x2: number, y1: number, y2: number): void {
		var px: number = this._gridX_from;
		var py: number = this._gridY_from;
		//删除不需要的
		for (px; px <= this._gridX_to; px++) {
			for (py = this._gridY_from; py <= this._gridY_to; py++) {
				if ((px < x1 || px > x2) || (py < y1 || py > y2))//不符合现在的区域条件进行删除
				{
					this.delArea(px + "_" + py);
				}
			}
		}
		px = x1;
		py = y1;
		for (px; px <= x2; px++) {
			for (py = y1; py <= y2; py++) {
				this.preAddArea(px, py);
			}
		}
		this._gridX_from = x1;
		this._gridX_to = x2;
		this._gridY_from = y1;
		this._gridY_to = y2;
	}

	/**初始化排序【遮挡关系】 */
	private sortAllChildren(): void {
		//重置迭代器
		this._roleLink.resetIteration();
		let role: any;
		let index: number = 0;
		do {
			role = this._roleLink.next();
			if (role != null)
				this.addChildAt(role, index++);
		} while (role != null)
	}


	/**删除一个显示对象 */
	public removeRoleFromLink(lk: any, onlySelf: boolean = false): void {
		this.removeChild(lk);
		this._roleLink.remove(lk);
		var irole: IRole = lk;
		irole.removed();
		if (!onlySelf)//如果属于独自删除动作,还需要从维护列表中进行删除
			return;
		var ak: string = irole.getAreaKey();
		var rlst: Array<IRole> = this._roleGirds.get(ak);
		if (rlst == null)
			return;
		var index: number = rlst.indexOf(lk);
		if (index >= 0)
			rlst.splice(index, 1);
	}
	/**在链表中上移一个 */
	public gotoPre(lk: any): void {
		var lkIndex: number = this.getChildIndex(lk);
		this.swapChildrenAt(lkIndex - 1, lkIndex);
		this._roleLink.swapNear(lk, -1);
	}

	/**在链表中下移一个 */
	public gotoNext(lk: any): void {
		var lkIndex: number = this.getChildIndex(lk);
		this.swapChildrenAt(lkIndex, lkIndex + 1);
		this._roleLink.swapNear(lk, 1);
	}
	
	/**碰撞检测与互动检测
	 * @param px场景坐标
	 * @param py场景坐标
	 * 设置可操作的对象
	 * @return 返回是否与某对象碰撞
	 */
	public hitTestRole(px: number, py: number): boolean {
		let p: egret.Point = this.getRoomKey(px, py);
		//重新设置要检测的植被单元格列表
		if (this._hitTestPoint.x != p.x || this._hitTestPoint.y != p.y) {
			this._hitTestPoint = p;
			this.resetHitTestArray();
		}
		let hit: boolean = false;
		let key: any;
		let roles: Array<IRole>;
		let role: IRole;
		let optNum: number;
		let maxOptdist: number = 100000;
		let optRole: IRole;
		for (key in this._hitTestArray) {
			roles = this._roleGirds.get(this._hitTestArray[key]);
			if (roles == null)
				continue;
			for (key in roles) {
				role = roles[key];
				//检测坐标是否在此角色操作范围内
				optNum = role.tryOption(px, py);
				if (optNum > 0) {
					//当前操作值最小企鹅大于0的角色
					if (optNum < maxOptdist)
						optRole = role;
					//检测此坐标是否在此角色的碰撞范围内
					if (!hit && role.hitTestArea(px, py))
						hit = true;
				}
			}
		}
		WorldManager.instance.setOptionRole(optRole);
		return hit;
	}

}