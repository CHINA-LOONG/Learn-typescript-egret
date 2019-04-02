/**
 * 地图基础容器
 * @author loong
 * @version 1.0
 */
class GroundLayer extends egret.DisplayObjectContainer {

	/**显示地图的最大宽度 */
	private _maxW: number;
	/**显示地图的最大高度 */
	private _maxH: number;

	/**地图实际宽度 */
	private _worldW: number;
	/**地图实际高度 */
	private _worldH: number;

	/**显示半屏的宽 */
	private _hafX: number;
	/**显示半屏的高 */
	private _hafY: number;

	/**实际地图最大的偏移X坐标 --定值显示右下角*/
	private _maxOffsetX: number;
	/**实际地图最大的偏移Y坐标 --定值显示右下角*/
	private _maxOffsetY: number;

	private _toX: number;
	private _toY: number;

	//地表
	private _floor: FloorLayer;
	private _stage: StageLayer;

	/**舞台宽度,舞台高度,世界宽度,世界高度 */
	public constructor(maxW: number, maxH: number, worldW: number, worldH: number) {
		super();
		this._maxW = maxW / WindowsMgr.scaleX;
		this._maxH = maxH / WindowsMgr.scaleY;

		this._worldW = worldW;
		this._worldH = worldH;

		this._hafX = this._maxW / 2;
		this._hafY = this._maxH / 2;

		this._maxOffsetX = -this._worldW + this._maxW + GameConfig.GRID_W / 2;
		this._maxOffsetY = -this._worldH + this._maxH;

		this._floor = new FloorLayer(worldW, worldH);
		this.addChild(this._floor);
		this._stage = new StageLayer(worldW, worldH);
		this.addChild(this._stage);
	}

	/**初始化当前位置 */
	public initPosition(cx: number, cy: number): void {
		this._toX = -cx + this._hafX;
		this._toY = -cy + this._hafY;
		if (this._toX > 0)
			this._toX = 0;
		else if (this._toX < this._maxOffsetX)
			this._toX = this._maxOffsetX;
		if (this._toY > 0)
			this._toY = 0;
		else if (this._toY < this._maxOffsetY)
			this._toY = this._maxOffsetY;
		this.x = this._toX;
		this.y = this._toY;
		// this._floor.initPosition()
	}

	public addRole(dis: egret.DisplayObject): void {
		// this.
	}
}