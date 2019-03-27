/**
 * 玩家数据模拟服务器
 */
class Server_User {

	public static T_USER_HISTORY: string = "T_USER_HISTORY";
	public static T_USER_DATA: string = "T_USER_DATA";

	public constructor() {
		ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_GETHISTORY, this.getUserHistory, this);
		ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_ENTERGAME, this.userEnterGame, this);
		ServerVirtual.registHandlerTest(ModuleType.USER, ProxyType.USER_CREATE, this.userCreate, this);
	}

	/**
	 * 获取玩家历史数据
	 */
	private getUserHistory(mess: string): string {
		var bs: string = localStorage.getItem(Server_User.T_USER_HISTORY);
		if (!bs || bs == "")
			return "{\"has\":0}";
		else
			return bs;
	}


	/**
	 * 进入游戏
	 * 需要在逻辑服务器读取玩家当前存档,生成tiled地图数据等
	 */
	private userEnterGame(msg: string): string {
		return null;
	}
	/**
	 * 创建角色
	 * 创建角色并且写本地
	 */
	private userCreate(msg: string): string {
		let posJson:Object = JSON.parse(msg);
		let tempUser:UserConfig = LocalData.getObjectByKv("UserConfig","{id:1}");
		return null;
	}
}