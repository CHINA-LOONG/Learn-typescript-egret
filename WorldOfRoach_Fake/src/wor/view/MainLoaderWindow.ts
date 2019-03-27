class MainLoaderWindow extends GameWindow {
	
	private _bgShape: egret.Shape;
	public message:eui.Label;
	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WindowType.MAIN_LOADING;
	}


	protected childrenCreated():void
	{
		this._bgShape = new egret.Shape();
		this._bgShape.graphics.beginFill(0x000000, 1);
		this._bgShape.graphics.drawRect(0, 0, 1, 1);
		this._bgShape.graphics.endFill();
		this.addChildAt(this._bgShape, 0);
		super.childrenCreated();
	}

	public resize():void{
		super.resize();
		if (this._bgShape == null)
			return;
		this._bgShape.scaleX = WindowsMgr.stageWidth;
		this._bgShape.scaleY = WindowsMgr.stageHeight;
	}

	/**
     * 捕获到对应的通知
     */
	public update(updateType: number, updateObject: any): void {
		switch(updateType){
			case UpdateType.MAIN_LOADING_SET:
			this.message.text = updateObject;
			break;
		}
	}
	
}