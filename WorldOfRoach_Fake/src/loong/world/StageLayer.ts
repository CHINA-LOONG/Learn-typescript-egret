/**
 * 舞台层级,包括一切地标以上的物件与角色
 * 主要包括人物,npc,生物,敌人,植被,矿物
 * 植被:循环计数法创建植被
 * @author loong
 * @version 1.0
 */
class StageLayer extends egret.DisplayObjectContainer {

	public static self: StageLayer;
	public static __xGridCount: number;//世界横向格子总数
	public static __yGridCount: number;//世界纵向格子总数
	private static _hitRound: number[] = [0, 0, 0, -1, 0, 1, 1, 0, -1, 0, -1, -1, 1, -1, -1, 1, 1, 1];


	private _maxRollW: number;
	private _maxRollH: number;
	private _wCount: number;
	private _hCount: number;
	// private _roomMaker: RoomMaker;
	private _wordW: number;
	private _wordH: number;
	private _startX: number = -100000;
	private _startY: number = -100000;
	private _rollPx: number;
	private _rollPy: number;
	//----------------当前显示的格子范围------------------
	private _gridX_from: number = -1;
	private _gridX_to: number = -1;
	private _gridY_from: number = -1;
	private _gridY_to: number = -1;
	//----------------显示对象的维护---------------
	private _step:number = -1;
	private _roleLink: LinkArray;
	private _roleGirds: Map<string, Array<IRole>> = new Map<string, Array<IRole>>();//用于碰撞检测的grids
	private _hitTestArray: string[] = [];//最近一次碰撞检测的数组
	private _hitTestPoint: egret.Point = new egret.Point(-1, -1);//最近一次碰撞检测的核心点

	public constructor(worldW: number, worldH: number) {
		super();
		StageLayer.self = this;

		this._wordW = worldW;
		this._wordH = worldH;

	}

	/**
	 * 将一个对象添加到显示链表中 
	 * @param 添加的对象
	 * @param 添加到的区域Id
	 */
	public addRoleToLink(lk:egret.DisplayObject,areaKey:string = null):void{
		let index:number = this._roleLink.put(lk);
		this.addChildAt(lk,index);
		let irole:IRole = lk as any;
		irole.setAreaKey(areaKey);
		irole.added();
		if(areaKey==null)
			return;
		//添加到区域对象列表
		if(this._roleGirds.get(areaKey)==null)					 
			this._roleGirds.set(areaKey,new Array<IRole>());	
		this._roleGirds.get(areaKey).push(irole);
	}

}