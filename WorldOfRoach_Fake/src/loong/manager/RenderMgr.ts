/**
 * 游戏主循环控制器 -- 包含所有的更新帧
 * @author loong
 * @version 1.0
 */
class RenderMgr {
	private static _ins: RenderMgr;
	static get instance() {
		if (!this._ins)
			this._ins = new RenderMgr();
		return this._ins;
	}

	private _stage: egret.Stage;
	private _lastTime: number = 0;
	private _renderList: Array<IRender>;//所有包含帧更新的列表

	public constructor() {
		this._renderList = new Array();
	}

	/**
	 * 启动这个render
	 */
	public startRender(stage: egret.Stage): void {
		this._stage = stage;
		this._lastTime = egret.getTimer();
		this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
	}


	/**
	 * 游戏主循环
	 */
	private enterFrameHandler(evt: egret.Event): void {
		let key: any;
		let t: number = egret.getTimer();
		let interval: number = t - this._lastTime;
		this._lastTime = t;
		for (key in this._renderList) {
			this._renderList[key].renderUpdate(interval);
		}
	}
	/**
	 * 注册render
	 */
	public registRender(render: IRender): void {
		this._renderList.push(render);
	}
	/**
	 * 移除一个render
	 */
	public unregistRender(render: IRender): void {
		let indexN: number = this._renderList.indexOf(render);
		if (indexN >= 0) {
			this._renderList.splice(indexN, 1);
		}
	}
}