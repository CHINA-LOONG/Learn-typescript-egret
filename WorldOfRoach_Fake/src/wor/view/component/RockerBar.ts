class RockerBar extends GameWindow implements eui.UIComponent {
	/**控制器对象 */
	private _controller: RockBarController;
	/**背景圆圈图 */
	private _bgShape: egret.Shape;


	/**UI操作按钮 */
	public barBtn:eui.Button;

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_UI;
		this.typeName = WindowType.ROCKER_LEFT;
		this.align(AlignType.BOTTOM_LEFT, 150, -150);
	}



	protected childrenCreated(): void {
		super.childrenCreated();
		this._controller = new RockBarController(this.barBtn,this.x,this.y);
		this.drawC();
	}
	
	/**绘制摇杆的背景 */
	private drawC():void{
		if(!this._bgShape){
			this._bgShape = new egret.Shape();
			this.addChildAt(this._bgShape, 0);
			this._bgShape.touchEnabled = false;
		}
		this._bgShape.graphics.clear();
		this._bgShape.graphics.beginFill(0xFFFFFF,0.5);
		this._bgShape.graphics.drawCircle(this.barBtn.anchorOffsetX,this.barBtn.anchorOffsetY,GameConfig.rocker_bar_sensitivity);
		this._bgShape.graphics.endFill();
	}

}