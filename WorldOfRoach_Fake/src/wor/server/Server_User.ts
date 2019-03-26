/**
 * 玩家数据模拟服务器
 */
class Server_User {
	
	public static T_USER_HISTORY:string = "T_USER_HISTORY";
	public static T_USER_DATA:string = "T_USER_DATA";

	public constructor() {
		ServerVirtual.registHandlerTest(ModuleType.USER,ProxyType.USER_GETHISTORY,this.getUserHistory,this);
	}

	/**
	 * 获取玩家历史数据
	 */
	private getUserHistory(mess:string):string
	{
		var bs:string = localStorage.getItem(Server_User.T_USER_HISTORY);
		if(!bs||bs=="")
			return "{\"has\":0}";
		else
			return bs;
	}
}