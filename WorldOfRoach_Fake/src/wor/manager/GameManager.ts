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

	public isNewGame: boolean = false;

	public startNewGame(): void {
		WindowsMgr.instance.openWindow(MainLoaderWindow);
		setTimeout(() => { this.buildEnter() }, 1000);
	}

	public startOldGame(): void {
		WindowsMgr.instance.closeWindow(StartWindow);
		WindowsMgr.instance.gcWindowAll();
		WindowsMgr.instance.openWindow(MainLoaderWindow);//打开游戏主加载界面
		setTimeout(() => { this.createEnter() }, 1000);
	}

	private buildEnter(): void {
		WorldMakerManager.instance.createWorld();
		ProxyMgr.instance.request(ModuleType.USER, ProxyType.USER_CREATE, `{\"posX\":${GameData.playerData.posX},\"posY\":${GameData.playerData.posY}}`);
	}

	private createEnter(): void {
		// //加载游戏地图数据
		// if (!this.isNewGame) {
		// 	let str:string = localStorage.getItem(Server_Map.T_MAP_BASE);
		// 	WorldMakerManager.instance.
		// }

		ProxyMgr.instance.request(ModuleType.USER,ProxyType.USER_ENTERGAME);
	}

	/**进入游戏 */
	public enterGame():void{
		WindowsMgr.instance.gameStage().addChildAt(Tiled_Ground.instance,0);
		GameData.plantData.loadConfig();

		//初始化游戏界面->实际开发中需要加入初始化进度条
		Tiled_Ground.instance.initWorld(GameConfig.WORD_W,GameConfig.WORD_H);

	}


	/**
	 * 改变主加载界面的文本
	 */
	public setMainLoadingInfo(infoStr: string): void {
		WindowsMgr.instance.updateWindow(UpdateType.MAIN_LOADING_SET, [WindowType.MAIN_LOADING], infoStr);
	}

	public setMainLoadinglloy(lloy: LloydUtil): void {
		WindowsMgr.instance.updateWindow(UpdateType.MAIN_LOADING_MAP, [WindowType.MAIN_LOADING], lloy);
	}
	public setMainLoadingMap(lloy: any): void {
		WindowsMgr.instance.updateWindow(UpdateType.MAIN_LOADING_MAP, [WindowType.MAIN_LOADING], lloy);
	}

}