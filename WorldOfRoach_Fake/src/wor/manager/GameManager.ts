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
	/**一.  创建新游戏 */
	public startNewGame(): void {
		WindowsMgr.instance.openWindow(MainLoaderWindow);	//打开创建地图的loading
		setTimeout(() => { this.buildEnter() }, 1000);		
	}
	/**三. 游戏记录进入 统一入口 */
	public startOldGame(): void {
		WindowsMgr.instance.closeWindow(StartWindow);
		WindowsMgr.instance.gcWindowAll();
		WindowsMgr.instance.openWindow(MainLoaderWindow);//打开游戏主加载界面
		setTimeout(() => { this.createEnter() }, 1000);
	}
	/**二. 游戏记录数据创建，创建后走统一流程 */
	private buildEnter(): void {
		WorldMakerManager.instance.createWorld();	//开始创建地图
		//请求创建角色 使用创建地图产生的角色坐标posX/posY
		ProxyMgr.instance.request(ModuleType.USER, ProxyType.USER_CREATE, `{\"posX\":${GameData.playerData.posX},\"posY\":${GameData.playerData.posY}}`);
	}

	/**四. 读取游戏地图数据，进入游戏请求 */
	private createEnter(): void {
		//加载游戏地图数据
		if (!this.isNewGame) {
			let str:string = localStorage.getItem(Server_Map.T_MAP_BASE);	//读取存储的地图数据
			WorldMakerManager.instance.rebuildWorld(str);
			LogTrace.log("loadBaseMap.len="+str.length);
		}
		ProxyMgr.instance.request(ModuleType.USER,ProxyType.USER_ENTERGAME);
	}

	/*五. 进入游戏 */
	public enterGame():void{
		//添加地图到舞台
		WindowsMgr.instance.gameStage().addChildAt(Tiled_Ground.instance,0);
		//加载植被的数据
		GameData.plantData.loadConfig();

		//初始化游戏界面->实际开发中需要加入初始化进度条//初始化世界的宽度和高度200000*100000
		Tiled_Ground.instance.initWorld(GameConfig.WORD_W,GameConfig.WORD_H);
		//游戏时间开始进行
		GameData.timeData.play();
		//初始化摇杆
		WindowsMgr.instance.openWindow(RockerBar);
		//初始化顶部导航

		//关闭加载
		WindowsMgr.instance.closeWindow(MainLoaderWindow);
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