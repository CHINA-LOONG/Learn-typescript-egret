/**
 * 游戏登陆
 */
class StartWindow extends GameWindow implements eui.UIComponent {
	
	public newGame:eui.Button;
	public oldGame:eui.Button;
	public constructor() {
		super();
		this.typeName = WindowType.START_WINDOW;
		this.layerType = LayerType.LAYER_UI;
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.newGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.optionHandler,this);
	}

	private optionHandler(evt:egret.TouchEvent):void{
		if(evt.target == this.newGame)
			LogTrace.log("new game start");
		if(evt.target == this.oldGame)
			LogTrace.log("old game start");
	}

}