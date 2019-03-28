class MainLoaderWindow extends GameWindow {

	private _bgShape: egret.Shape;
	public message: eui.Label;

	private _drawMap: egret.Shape;
	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WindowType.MAIN_LOADING;
	}


	protected childrenCreated(): void {
		this._bgShape = new egret.Shape();
		this._bgShape.graphics.beginFill(0x000000, 1);
		this._bgShape.graphics.drawRect(0, 0, 1, 1);
		this._bgShape.graphics.endFill();
		this.addChildAt(this._bgShape, 0);
		super.childrenCreated();
	}

	public resize(): void {
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
		switch (updateType) {
			case UpdateType.MAIN_LOADING_SET:
				this.message.text = updateObject;
			case UpdateType.MAIN_LOADING_MAP:
				this.updateDrawMap(updateObject as LloydUtil);
				break;
		}
	}

	private updateDrawMap(lloy: LloydUtil): void {
		if (!lloy)
			return;
		if (!this._drawMap) {
			this._drawMap = new egret.Shape();
			this.addChild(this._drawMap);
		}
		this._drawMap.width = WindowsMgr.stageWidth;
		this._drawMap.height = WindowsMgr.stageHeight;
		this._drawMap.graphics.clear();

		this._drawMap.graphics.beginFill(0xffffff, 1);
		this._drawMap.graphics.drawRect(0, 0, this._drawMap.width,this._drawMap.height);
		this._drawMap.graphics.endFill();

		// let point = this.rePoint(new Point2D(0, 0));
		
		this._drawMap.graphics.beginFill(0xff0000, 0.3);
		this._drawMap.graphics.drawRect(10,10, 80, 80);
		this._drawMap.graphics.endFill();


		this._drawMap.graphics.beginFill(0x00ff00, 0.3);
		this._drawMap.graphics.drawRect(50,50, 80, 80);
		this._drawMap.graphics.endFill();

		this._drawMap.graphics.beginFill(0x0000ff, 0.3);
		this._drawMap.graphics.drawRect(500,100, 80, 80);
		this._drawMap.graphics.endFill();


	}

	private rePoint(p: Point2D): egret.Point {
		let returnP: egret.Point = new egret.Point(p.x / 10 + this.stage.stageWidth / 2, p.y / 10 + this.stage.stageHeight / 2);
		return returnP;
	}
}