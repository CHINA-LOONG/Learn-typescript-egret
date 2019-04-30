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
		let posJson:Object = JSON.parse(msg);		//解析角色的数据，当前包含角色出生坐标
		let tempUser:UserConfig = LocalData.getObjectByKv("UserConfig",{id:1});		//获取id=1的角色模板
		let obj:Object = new Object();
		ObjectUtil.copyTo(tempUser,obj);
		obj["posX"] = posJson["posX"];
		obj["posY"] = posJson["posY"];
		localStorage.setItem(Server_User.T_USER_DATA,JSON.stringify(obj));						//缓存角色的数据
		GameData.historyData.has =1;															//设置存在历史记录
		localStorage.setItem(Server_User.T_USER_HISTORY,JSON.stringify(GameData.historyData));	//缓存角色包含历史记录
		return null;
	}
}