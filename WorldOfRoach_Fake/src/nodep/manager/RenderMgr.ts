class RenderMgr {
	private static _ins: RenderMgr;
	static get instance() {
		if (!this._ins)
			this._ins = new RenderMgr();
		return this._ins;
	}

	private _stage:egret.Stage;
	public constructor() {
	}

public startRender(stage:egret.Stage):void{
	this._stage = stage;
	
}
	
}