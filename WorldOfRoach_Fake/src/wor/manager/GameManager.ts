/**
 * 游戏总流程管理器
 */
class GameManager {

	public static _ins: GameManager;
	public static get instance(): GameManager {
		if (GameManager._ins == null)
			GameManager._ins = new GameManager();
		return GameManager._ins;
	}

	public startNewGame():void{
		WindowsMgr.instance.openWindow(MainLoaderWindow);
		setTimeout(()=>{this.buildEnter()},1000);
	}

	public startOldGame():void{
		WindowsMgr.instance.closeWindow(StartWindow);
		WindowsMgr.instance.gcWindowAll();
		WindowsMgr.instance.openWindow(MainLoaderWindow);//打开游戏主加载界面
		setTimeout(()=>{this.createEnter()},1000);
	}

	private buildEnter():void{
		WorldMakerManager.instance.createWorld();
		ProxyMgr.instance.request(ModuleType.USER,ProxyType.USER_CREATE, `{\"posX\":${GameData.playerData.posX},\"posY\":${GameData.playerData.posY}`);
	}

	private createEnter():void{

	}


	/**
	 * 改变主加载界面的文本
	 */
	public setMainLoadingInfo(infoStr:string):void{
		WindowsMgr.instance.updateWindow(UpdateType.MAIN_LOADING_SET,[WindowType.MAIN_LOADING],infoStr);
	}

}