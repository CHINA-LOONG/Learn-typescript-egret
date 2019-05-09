class WindowsMgr {
	/**获取实例 */
	static _ins: WindowsMgr
	static get instance() {
		if (!this._ins) {
			this._ins = new WindowsMgr()
		}
		return this._ins
	}
	/**屏幕显示的宽度 */
	public static stageWidth: number = 0;
	/**屏幕显示的高度 */
	public static stageHeight: number = 0;

	/**保证不同分辨率显示区域相同比例 W÷1254*/
	public static scaleX: number = 1;
	/**保证不同分辨率显示区域相同比例 W÷1254*/
	public static scaleY: number = 1;

	/**游戏的根层级 */
	private _baseUI: eui.UILayer;
	/**游戏层级列表 */
	private _layerMap: Map<string, GameLayerInterface>;
	/**游戏界面列表 */
	private _windowMap: Map<any, GameWindow>;

	public constructor() {
		if (WindowsMgr._ins != null) {
			throw (new Error("单例"));
		}
		this._layerMap = new Map<string, GameLayerInterface>();
		this._windowMap = new Map<any, GameWindow>();
		LogTrace.log("create WinsManager!");
	}
	private initScale(): void {
		LogTrace.log(WindowsMgr.stageWidth + "_" + WindowsMgr.stageHeight);
		WindowsMgr.scaleX = WindowsMgr.stageWidth / 1254;
		WindowsMgr.scaleY = WindowsMgr.scaleX;
	}

	/**初始化 */
	public initGame(ui: eui.UILayer): void {
		this._baseUI = ui;
		this._baseUI.stage.addEventListener(egret.Event.RESIZE, this.stageResizeHandler, this);
		WindowsMgr.stageWidth = this._baseUI.stage.stageWidth;
		WindowsMgr.stageHeight = this._baseUI.stage.stageHeight;
		this.initScale();
	}
	/**添加一个层级 */
	public addLayer(layerName: string, layer: GameLayerInterface): void {
		this._layerMap.set(layerName, layer);
		this._baseUI.addChild(layer as GameLayer);
		LogTrace.log("add layer:" + layerName);
	}

	/**开启一个窗口 */
	public openWindow(cls: any): void {
		if (!this._windowMap.has(cls))
			this._windowMap.set(cls, new cls());
		let win: GameWindow = this._windowMap.get(cls);
		if (!win.stage) {
			if (this._layerMap.has(win.layerType)) //如果有對應層級可以打開
			{
				this._layerMap.get(win.layerType).addWindow(win);
				LogTrace.log("openWindow->" + win.typeName);
			}
			else {
				throw (new Error(NodepErrorType.LAYER_NO_EXISTENT));
			}
		}
	}
	public closeWindow(target: any): void {
		if (!target)
			return;
		let win: GameWindow = null;
		switch (typeof target) {
			case "object":
				win = target as GameWindow;
				break;
			case "string":
				break;
			case "function":
				win = this._windowMap.get(target);
				break;
		}
		if (!win || !win.parent)
			return;
		if (win.beforeClose())
			(win.parent as GameLayer).removeWindow(win);
	}
	/**
	 * 刷新指定的界面,只会更新在显示列表中的
	 */
	public updateWindow(updateType: number, typeName: Array<string>, updateData: any = null): void {
		this._windowMap.forEach(function (win) {
			if (typeName.indexOf(win.typeName) >= 0 && win.stage != null)
				win.update(updateType, updateData);
		}, this);
	}
	/**
	 * 屏幕尺寸变化
	 */
	private stageResizeHandler(evt: egret.Event): void {
		WindowsMgr.stageWidth = this._baseUI.stage.stageWidth;
		WindowsMgr.stageHeight = this._baseUI.stage.stageHeight;
		this.initScale();
		LogTrace.log("stageReszie!");

		this._layerMap.forEach(function (layer) {
			layer.resize();
		}, this);
	}

	/**
	 * 指定回收
	 */
	public gcWindow(key: any): void {

	}

	/**
	 * 回收所有没有在显示列表中的界面
	 */
	public gcWindowAll(): void {

	}

	/**
 * 快速获取游戏舞台
 */
	public gameStage(): egret.Stage {
		if (this._baseUI != null)
			return this._baseUI.stage;
		else
			return null;
	}
}