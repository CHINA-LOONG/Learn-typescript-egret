class HttpEvent extends egret.Event {
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }

    public data: any = null;

	/** rubbish */
	public static s1:string = "25ac";
	public static s2:string = "21baadc6fbd";

	/**与服务端通信地址 */
    public static httpApi: string = "https://www.remvd.com/WXGAPI/";

    /**游戏的appid */
    public static appid: string = "wxe608ae48fcc1cb6c";

    /** api接口版本 */
    public static version: string = "1.0";





    /** ---------------------------- 接口协议 --------------------------------------- */

    /** 获取Token */
    public static getToken: string = "getToken";

    /**  */
    public static postUser:string = "postUser";

    /**  */
    public static getUser:string = "getUser";

    /**  */
    public static sign:string = "sign";

    /**  */
    public static saveRank:string = "saveRank";

    /**  */
    public static getRank:string = "getRank";

    /**  */
    public static saveUserData:string = "saveUserData";

    /**  */
    public static saveList:string = "saveList";

    /**  */
    public static getList:string = "getList";

    /**  */
    public static saveBingAn:string = "saveBingAn";

    /**  */
    public static getBingAn:string = "getBingAn";
}