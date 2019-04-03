/**
 * 地表容器
 * 采用均衡帧的方式来创建地砖,删除不做控制
 * @author loong
 * @version 1.0
 */
class FloorLayer extends egret.DisplayObjectContainer {


	//----------------初始化------------------
	public static floorSelf: FloorLayer;
	/**格子宽度 */
	public _gridW: number;//一个单位的景物,占1/2,这是在6plus的分辨率下  ????
	/**格子高度 */
	public _gridH: number;//格子高度
	/**半个格子的宽度 */
	public _gridW_HALF: number;
	/**半个格子的高度 */
	public _gridH_HALF: number;
	/**左右预加载数量(距离非格子) 额外加载*/
	private _offsetW: number;
	/**上下预加载数量(距离非格子) 额外加载*/
	private _offsetH: number;
	/**场景显示开始坐标 */
	private _startX: number = -10000;//当前显示的矩形框体x坐标
	/**场景显示开始坐标 */
	private _startY: number = -10000;//当前显示的矩形框体y坐标
	/**需要加载的横向格子数量 */
	private _wCount: number;
	/**需要加载的纵向格子数量 */
	private _hCount: number;
	/**横向最大格子数 */
	private _maxGridW: number;
	/**纵向最大格子数 */
	private _maxGridH: number;

	//----------------当前显示的格子范围------------------
	private _gridX_from: number = -1;
	private _gridX_to: number = -1;
	private _gridY_from: number = -1;
	private _gridY_to: number = -1;

	//----------------均衡负载相关---------------
	private _balance: number = 5;//均衡创建
	private _addCount: number = 0;//每帧创建计数器

	// //-----------------地板--------------------
	// private _floorMap: Map<string, IFloor> = new Map<string, IFloor>();//已创建的地板
	// private _errorFloor: Array<IFloor> = new Array<IFloor>();//具有错误地表的地板
	// private _preAddFloors: number[] = [];//均衡用预加载地表
	// private _errorFloorDic:Map<string,number> = new Map<string,number>();
	// private _changeDrawCount:number = 0;
	// private _standOn:IFloor;

	public constructor(worldW: number, worldH: number) {
		super();
		FloorLayer.floorSelf = this;
		this._offsetW = GameConfig.OFFSET_W;
		this._offsetH = GameConfig.OFFSET_H;

		this._gridW = GameConfig.GRID_W;
		this._gridH = GameConfig.GRID_H;

		this._gridW_HALF = this._gridW / 2;
		this._gridH_HALF = this._gridH / 2;

		//计算得到在当前屏幕尺寸下,横向需要展现的格子数量，纵向需要展现的格子数量
		//((先计算需要显示的地图距离➕预加载地图距离✖️2)➗格子宽高)➕固定多加载格子数
		this._wCount = Math.round((WindowsMgr.instance.gameStage().stageWidth / WindowsMgr.scaleX + this._offsetW * 2) / this._gridW) + 2;
		this._hCount = Math.round((WindowsMgr.instance.gameStage().stageHeight / WindowsMgr.scaleY + this._offsetH * 2) / this._gridH) + 3;
		this._hCount = this._hCount * 2;//?????

		this._maxGridW = Math.floor(worldW / this._gridW);
		this._maxGridH = Math.floor(worldH / this._gridH * 2);//???

		TiledFloorBase.GW = this._gridW;
		TiledFloorBase.GH = this._gridH;
		TiledFloorBase.GW_HALF = this._gridW / 2;
		TiledFloorBase.GH_HALF = this._gridH / 2;
	}

	/**初始化地面格子
	 * @param sx左上开始的X坐标
	 * @param sy左上开始的Y坐标
	 */
	private initTileds(sx: number, sy: number): void {
		let grixX_1: number = Math.floor(sx / this._gridW) - 1;
		let gridX_2: number = grixX_1 + this._wCount;





		
	}

	/**初始化场景地面
	 * 初始化这个显示区域的地面
	 * @param toX显示区域X轴
	 * @param toY显示区域Y轴 
	 * 注意：从这个点往右下是显示区域
	 */
	public initPosition(toX: number, toY: number): void {
		this._startX = toX;
		this._startY = toY;
		this.initTileds(this._startX - this._offsetW, this._startY - this._offsetH);
	}

}