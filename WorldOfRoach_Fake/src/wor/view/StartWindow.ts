/**
 * 游戏登陆
 */
class StartWindow extends GameWindow {

	public newGame: eui.Button;
	public oldGame: eui.Button;
	public constructor() {
		super();
		this.typeName = WindowType.START_WINDOW;
		this.layerType = LayerType.LAYER_UI;
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.newGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);
		this.oldGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);

		this.reOpen();
	}

	public reOpen(): void {
		super.reOpen();
		this.newGame.visible = false;
		this.oldGame.visible = false;

		ProxyMgr.instance.request(ModuleType.USER, ProxyType.USER_GETHISTORY);
	}

	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.USER_HISTORY_BACLL:
				this.newGame.visible = true;
				this.oldGame.visible = GameData.historyData.hasData;
				break;
		}
	}

	private optionHandler(evt: egret.TouchEvent): void {
		if (evt.target == this.newGame) {
			LogTrace.log("new game start");
			AlertWindow.alertShow("确定要开始新的冒险吗？这将覆盖原有的存档！", null, this);
		}
		if (evt.target == this.oldGame) {
			LogTrace.log("old game start");
		}
	}

	private startNewGame(flag: boolean): void {
		LogTrace.log("startGame for new!");
		
	}
	private startOldGame(): void {
		LogTrace.log("startGame for old");
	}

}