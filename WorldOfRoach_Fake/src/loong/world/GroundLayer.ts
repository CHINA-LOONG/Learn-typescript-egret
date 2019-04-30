/**
 * 地图基础容器
 * @author loong
 * @version 1.0
 */
class GroundLayer extends egret.DisplayObjectContainer {

	/**显示场景的最大宽度 --通过比例控制*/
	private _maxW: number;
	/**显示场景的最大高度 --通过比例控制*/
	private _maxH: number;

	/**场景宽度 */
	private _worldW: number;
	/**场景高度 */
	private _worldH: number;

	/**半屏场景的宽 */
	private _hafX: number;
	/**半屏场景的高 */
	private _hafY: number;

	/**场景最大的偏移X坐标 --定值显示右下角 --坐标极限*/
	private _maxOffsetX: number;
	/**场景最大的偏移Y坐标 --定值显示右下角 --坐标极限*/
	private _maxOffsetY: number;

	/**场景显示时的X坐标 */
	private _toX: number;
	/**场景显示时的X坐标 */
	private _toY: number;

	//地表
	private _floor: FloorLayer;
	private _stage: StageLayer;

	/**创建地图的容器 舞台宽度,舞台高度,世界宽度,世界高度 */
	public constructor(maxW: number, maxH: number, worldW: number, worldH: number) {
		super();
		//计算舞台显示的最大宽度--高度
		this._maxW = maxW / WindowsMgr.scaleX;
		this._maxH = maxH / WindowsMgr.scaleY;
		//场景的宽度--高度
		this._worldW = worldW;
		this._worldH = worldH;
		//舞台显示宽度的一半--高度的一半
		this._hafX = this._maxW / 2;
		this._hafY = this._maxH / 2;

		/**小框的左上角的偏移值
		 * ┌──────────────────┐
		 * │                  │
		 * │                  │
		 * │          ┌───────┤
		 * │          │   ·   │
		 * └──────────┴───────┘
		 */
		this._maxOffsetX = -this._worldW + this._maxW + GameConfig.GRID_W / 2;
		this._maxOffsetY = -this._worldH + this._maxH;
		//地面的容器
		this._floor = new FloorLayer(worldW, worldH);
		this.addChild(this._floor);
		//植被的容器
		this._stage = new StageLayer(worldW, worldH);
		this.addChild(this._stage);
	}

	/**
	 * 初始化当前位置 
	 * @param 在世界中的X坐标舞台中间
	 * @param 在世界中的Y坐标舞台中间
	 * ┌──────────────────────┐
	 * │                      │
	 * │                      │
	 * │          ┌───────┐   │
	 * │          │   ·   │   │
	 * │          └───────┘   │
	 * └──────────────────────┘
	 * [场景]相对于[显示]左上角的坐标
	 */
	public initPosition(cx: number, cy: number): void {
		//左上范围  舞台中间加上半屏的像素
		this._toX = -cx + this._hafX;
		this._toY = -cy + this._hafY;
		//检测左上和右下是否超出场景
		if (this._toX > 0)
			this._toX = 0;
		else if (this._toX < this._maxOffsetX)
			this._toX = this._maxOffsetX;
		if (this._toY > 0)
			this._toY = 0;
		else if (this._toY < this._maxOffsetY)
			this._toY = this._maxOffsetY;
		//设置当前的场景坐标
		this.x = this._toX;
		this.y = this._toY;
		//初始化地面坐标相应的数据  
		this._floor.initPosition(-this.x, -this.y);
		//初始化舞台元素相应的数据
		this._stage.initSynArea(-this.x, -this.y);
	}


	public synPositionTo(cx:number,cy:number):void{
		this._toX = -cx+this._hafX;
		this._toY = -cy+this._hafY;
		if(this._toX>0)
			this._toX=0;
		else if(this._toX<this._maxOffsetX)
			this._toX=this._maxOffsetX;
		if(this._toY>0)
			this._toY=0;
		else if(this._toY<this._maxOffsetY)
			this._toY=this._maxOffsetY;
		this.x = this._toX;
		this.y = this._toY;
		if(this._floor.synPosition(-this.x,-this.y))
			this._stage.trySynArea(-this.x,-this.y);
	}

	/**添加一个演员角色 */
	public addRole(dis: egret.DisplayObject): void {
		this._stage.addRoleToLink(dis);
	}
}