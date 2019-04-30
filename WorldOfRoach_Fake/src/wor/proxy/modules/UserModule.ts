class UserModule extends ModuleBase {
	public constructor(id: number) {
		super(id);
		this.registHandler(ProxyType.USER_GETHISTORY, this.userHistoryHandler);
		this.registHandler(ProxyType.USER_ENTERGAME,this.userEnterGame);
		this.registHandler(ProxyType.USER_CREATE, this.createUser);
	}

	/**
	 * 网络请求返回处理
	 * 数据处理
	 * 界面更新
	 */
	private userHistoryHandler(type: number, msg: string): string {
		if (type == UserModule.TYPE_RQ)
			return msg;
		else {
			let obj: Object = JSON.parse(msg);
			GameData.historyData.initHistoryData(obj);
			WindowsMgr.instance.updateWindow(UpdateType.USER_HISTORY_BACLL, [WindowType.START_WINDOW], null);
		}
		return null;
	}

	/**创建游戏角色 */
	private createUser(type: number, mess: string): string {
		if (type == UserModule.TYPE_RQ)
			return mess;
		else {
			LogTrace.log("create new player completed!!");
			GameManager.instance.startOldGame();			//创建角色成功后均已游戏记录方式进入游戏
		}
		return null;
	}
	/**进入游戏 */
	private userEnterGame(type: number, msg: string): string {
		if (type == UserModule.TYPE_RQ)
			return msg;
		else {
			let obj:Object = JSON.parse(msg);
			//赋值角色数据到游戏缓存玩家数据
			ObjectUtil.copyTo(obj,GameData.playerData);
			GameManager.instance.enterGame();
		}
		return null;
	}
}