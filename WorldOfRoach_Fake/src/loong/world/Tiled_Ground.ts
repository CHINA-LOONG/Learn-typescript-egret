/**
 * 平铺世界的基础容器
 * @author loong
 * @version 1.0
 */
class Tiled_Ground extends egret.DisplayObjectContainer implements IRender {

	private static _ins: Tiled_Ground;
	static get instance(): Tiled_Ground {
		if (Tiled_Ground._ins == null)
			Tiled_Ground._ins = new Tiled_Ground();
		return Tiled_Ground._ins;
	}

	/**舞台可显示宽度 */
	public stageW: number;
	/**舞台可显示高度 */
	public stageH: number;
	/**场景实际宽度 */
	public worldWidth: number;
	/**场景实际高度 */
	public worldHeight: number;
	/**场景与地图的X比值 */
	public cf_X: number;
	/**场景与地图的Y比值 */
	public cf_Y: number;
	/**玩家角色引用 */
	private _self: PlayerRole;
	/**当前摄像机跟踪的对象 */
	private _focus: FocusRole;
	/**可摄像机跟踪对象列表 */
	public roleMap: Map<number, FocusRole>//场景中可跟踪受管理的角色对象
	/**场景容器根 */
	private _groud: GroundLayer;


	public constructor() {
		super();
		this.scaleX = WindowsMgr.scaleX;
		this.scaleY = WindowsMgr.scaleY;
	}

	/**刷新函数 */
	public renderUpdate(interval: number) {
		this._groud.synPositionTo(this._focus.x,this._focus.y);
	}
	/**通过地板实际像素获取小地图此位置的地面类型
	 * @param pxpy地板中心的场景像素
	 */
	public getFloorType(px:number,py:number):number{
		px = Math.floor(px/this.cf_X);
		//y坐标图片是在左下需要转换
		py = GameData.mapData.baseMap.$bitmapHeight - Math.floor(py/this.cf_Y);
		return GameData.mapData.getFloorType(px,py);
	}
	
	/**
	 * 根据坐标获取对应区域类型
	 */
	public getFloorTypeByArea(px:number,py:number):number
	{
		/**这地方有可能需要尽兴Y的坐标转换 */
		px = Math.floor(px/this.cf_X);
		py = Math.floor(py/this.cf_Y);
		// py = GameData.mapData.baseMap.$bitmapHeight - Math.floor(py/this.cf_Y);
		return GameData.mapData.getFloorTypeByArea(px,py);
	}

	/**设置当前焦点对象 */
	public setFocus(roleId:number):void
	{
		if(this._focus!=null)
			this._focus.__isFocus = false;
		//获取角色设置为焦点角色
		this._focus = this.roleMap.get(roleId);
		this._focus.__isFocus = true;
	}
	/**添加一个焦点显示对象 */
	public addFocusRole(role: FocusRole): void {
		this.roleMap.set(role.id,role);
		this._groud.addRole(role);
		role.addToWorld();
	}


	/**初始化地图 
	 * 200000 地图横向宽
	 * 100000 世界纵向高
	 */
	public initWorld(worldW: number, worldH: number): void {
		//初始化焦点角色Map
		this.roleMap = new Map<number, FocusRole>();
		//获取舞台的宽高
		this.stageW = WindowsMgr.instance.gameStage().stageWidth;
		this.stageH = WindowsMgr.instance.gameStage().stageHeight;
		//获取场景的宽高
		this.worldWidth = worldW;
		this.worldHeight = worldH;
		//200000/800
		this.cf_X = this.worldWidth / GameData.mapData.baseMap.$bitmapWidth;//.bitmapData.width;
		//100000/800
		this.cf_Y = this.worldHeight / GameData.mapData.baseMap.$bitmapHeight;//.bitmapData.height;
		//创建地面容器层
		this._groud = new GroundLayer(this.stageW, this.stageH, this.worldWidth, this.worldHeight);
		this.addChild(this._groud);
		this.createSelf();
		RenderMgr.instance.registRender(this);
	}


	/**将自己添加到场景*/
	private createSelf(): void {
		//创建玩家的角色
		this._self = new PlayerRole();
		//计算获取角色在世界中的实际坐标(地图中的坐标*世界与地图比值)
		this._self.x = GameData.playerData.posX * this.cf_X;
		this._self.y = GameData.playerData.posY * this.cf_Y;
		//通过玩家角色位置，设置地图在屏幕显示位置
		this._groud.initPosition(this._self.x, this._self.y);
		this.addFocusRole(this._self);	
		this.setFocus(this._self.id);
		this._self.amendPosition();
	}

}