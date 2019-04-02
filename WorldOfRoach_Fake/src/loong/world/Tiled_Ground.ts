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


	public stageW: number;//舞台宽度
	public stageH: number;//舞台高度
	public worldWidth: number;//世界宽度
	public worldHeight: number;//世界高度
	public cf_X: number;//x系数
	public cf_Y: number;//y系数
	/**玩家角色 */
	private _self: PlayerRole;
	/**当前摄像机跟踪的对象 */
	private _focus: FocusRole;
	/**可摄像机跟踪对象列表 */
	public roleMap: Map<number, FocusRole>//场景中可跟踪受管理的角色对象
	private _groud: GroundLayer;


	public constructor() {
		super();
	}

	/**刷新函数 */
	public renderUpdate(interval: number) {

	}

	/**设置当前焦点对象 */
	public setFocus(roleId:number):void
	{
		if(this._focus!=null)
			this._focus.__isFocus = false;
		this._focus = this.roleMap.get(roleId);
		this._focus.__isFocus = true;
	}
	/**添加一个焦点显示对象 */
	public addFocusRole(role: FocusRole): void {
		this.roleMap.set(role.id,role);
		this._groud.addRole(role);
		role.addToWorld();
	}


	/**初始化地图 */
	public initWorld(worldW: number, worldH: number): void {
		this.roleMap = new Map<number, FocusRole>();
		this.stageW = WindowsMgr.instance.gameStage().stageWidth;
		this.stageH = WindowsMgr.instance.gameStage().stageHeight;
		this.worldWidth = worldW;
		this.worldHeight = worldH;
		this.cf_X = this.worldWidth / GameData.mapData.baseMap.$bitmapWidth;//.bitmapData.width;
		this.cf_Y = this.worldHeight / GameData.mapData.baseMap.$bitmapHeight;//.bitmapData.height;
		this._groud = new GroundLayer(this.stageW, this.stageH, this.worldWidth, this.worldHeight);
		this.addChild(this._groud);
		this.createSelf();
		RenderMgr.instance.registRender(this);
	}


	/**将自己添加到场景*/
	private createSelf(): void {
		this._self = new PlayerRole();
		this._self.x = GameData.playerData.posX * this.cf_X;
		this._self.y = GameData.playerData.posY * this.cf_Y;
		this._groud.initPosition(this._self.x, this._self.y);
		this.addFocusRole(this._self);
		this.setFocus(this._self.id);
		this._self.amendPosition();
	}

}