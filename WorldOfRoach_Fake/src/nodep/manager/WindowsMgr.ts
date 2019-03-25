class WindowsMgr {
	/**
     * 获取实例
     */
	static _ins: WindowsMgr
	static get instance() {
		if (!this._ins) {
			this._ins = new WindowsMgr()
		}
		return this._ins
	}
	/**显示根节点的控制 */
	public static stageWidth: number = 0;
	public static stageHeight: number = 0;
	public static scaleX: number = 1;
	public static scaleY: number = 1;

	private _baseUI: eui.UILayer;
	private _layerMap: Map<string, GameLayerInterface>;
	private _windowMap: Map<any, GameWindow>;

	public constructor() {
		if (WindowsMgr._ins != null) {
			throw (new Error("单例"));
		}
		LogTrace.log("create WinsManager!");
	}


	public initGame(ui: eui.UILayer): void {
		this._baseUI = ui;
		this._baseUI.addEventListener(egret.Event.RESIZE, this.stageResizeHandler, this);
		this.stageResizeHandler(null);
	}

	public addLayer(layerName: string, layer: GameLayerInterface): void {
		this._layerMap.set(layerName, layer);
		this._baseUI.addChild(layer as GameLayer);
		LogTrace.log("add layer:" + layerName);
	}

	public openWindow(cls: any): void {
		if (!this._windowMap.has(cls))
			this._windowMap.set(cls, new cls());
		let win: GameWindow = this._windowMap.get(cls);
		if (!win.stage) {
			if (this._layerMap.has(win.layerType)) {
				this._layerMap.get(win.layerType).addWindow(win);
				LogTrace.log("openWindow->" + win.typeName);
			}
			else{

				throw (new Error("NodepErrorType.LAYER_NO_EXISTENT"));
			}
		}
	}
	private stageResizeHandler(evt: egret.Event): void {
		WindowsMgr.stageWidth = this._baseUI.stage.stageWidth;
		WindowsMgr.stageHeight = this._baseUI.stage.stageHeight;

		LogTrace.log("stageReszie!");
	}
}