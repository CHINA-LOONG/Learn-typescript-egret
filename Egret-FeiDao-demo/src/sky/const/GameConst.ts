class GameConst {
	public constructor() {
	}

	public static rewardAdId: string = "";
	public static bannerAdId: string = "";

	/** rubbish */
	public static s1:string = "adunit-";

	/** 是否使用服务器存储 */
	public static save_server:boolean = false;

	public static version:number = 4;

	public static localversion:string = "localversion";
	
	
}

enum KNIFESTATE{
	NORMAL = 0,
	FLYING = 1,
}

enum GAMESTATE{
	/**游戏开始 */
	START = 1,
	/**游戏结束 */
	OVER = 2,
}

enum PLAYERSTATE{
	/**等待 */
	WAIT = 1,
	/**移动 */
	MOVE = 2,
	/**防御 */
	DEFENCE = 3,
	/**死亡 */
	DEAD = 4,
}

enum SKINSTATE{
	UNLOCK = 0,//已激活
	LOCK = 1,//未激活
}

enum BEGINSTATE{
	NORMAL = 0,//正常
	LOCK = 1,//未解锁
	/**看视频试玩 */
	TRYPLAY = 2,
	SHAREADD = 3,//分享增加
	WATCHADD = 4,//看视频增加
}

enum SHARETYPE{
	SHARE = 0,
	SHOWOFF = 1,
}

enum WATCHTYPE{
	ADDKNIFE = 0,
	TRYPLAY = 1,
}