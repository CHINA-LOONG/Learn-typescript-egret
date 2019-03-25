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
	private _lastTime:number = 0;
	private _renderList:Array<IRender>;//所有包含帧更新的列表

	public constructor() {
	}

	/**
	 * 启动这个render
	 */
	public startRender(stage: egret.Stage): void {
		this._stage = stage;
		this._lastTime = egret.getTimer();
		this._stage.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}


	/**
	 * 游戏主循环
	 */
	private enterFrameHandler(evt:egret.Event):void{
		let key:any;
		let t:number = egret.getTimer();
		let interval:number = t - this._lastTime;
		this._lastTime = t;
		for(key in this._renderList){
			this._renderList[key].renderUpdate(interval);
		}
	}
}