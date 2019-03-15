/**
 *
 * @author 
 * 发送HTTP请求 HttpCommand.getInstance().dispatchEvent(HttpEvent.XXXX)
 *
 */
class HttpCommand extends egret.EventDispatcher {
    public constructor() {
        super();
    }

    private static instance: HttpCommand;
    public static getInstance(): HttpCommand {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    }

    /** 登录
     * @param code 登录code
     */
    public getToken(code) {
        let url = "GetWXOpenId.ashx";
        let data = { RequestCode: code }
        this.sendRequest(HttpEvent.getToken, url, data, 1);
    }

	/** 
     * 
     */
    public postUser(user: UserInfo) {
        let url = "SaveUserData.ashx";
        let data = user;
        this.sendRequest(HttpEvent.postUser, url, data, 1);
    }

	/** 
     * 
     */
    public getUser(OpenId: string) {
        let url = "GetUserData.ashx";
        let data = { OpenId: OpenId }
        this.sendRequest(HttpEvent.getUser, url, data, 0);
    }

	/** 
     * 
     */
    public sign() {
        let url = "UserSign.ashx";
        let data = null;
        this.sendRequest(HttpEvent.getToken, url, data, 1);
    }

	/** 
     * 
     */
    public saveRank(OpenId: string, ListType: string, HighScore: number) {
        let url = "SaveList.ashx";
        let data = { OpenId: OpenId, ListType: ListType, HighScore: HighScore }
        this.sendRequest(HttpEvent.saveRank, url, data, 1);
    }

	/** 
     * @param OpenId 
     * @param ListType
     * @param SortType aes 升序，des降序
     */
    public getRank(OpenId: string, ListType: string, SortType: string = "aes") {
        let url = "GetList.ashx";
        let data = { OpenId: OpenId, ListType: ListType, SortType: SortType }
        this.sendRequest(HttpEvent.getRank, url, data, 1);
    }

	/** 
     * 
     */
    public saveUserData(OpenId: string, FieldName: string, FieldValue: string) {
        let url = "SaveUserEnternal.ashx";
        let data = { OpenId: OpenId, FieldName: FieldName, FieldValue: FieldValue }
        this.sendRequest(HttpEvent.saveUserData, url, data, 1);
    }

	/** 
     * @param KeyName”:”1001”,
     * @param KeyValue”:”{….}”   json数组
      *@param KeyType”:”Array”,
     */
    public saveList(KeyName: string, KeyValue: string[], KeyType: string = "Array") {
        let url = "SaveApplicationValue.ashx";
        let data = { KeyType: KeyType,KeyName:KeyName,KeyValue:KeyValue }
        this.sendRequest(HttpEvent.saveList, url, data, 1);
    }

	/** 
     * 
     */
    public getList(KeyName:string) {
        let url = "GetApplicationValue.ashx";
        let data = { RequestCode: KeyName }
        this.sendRequest(HttpEvent.getList, url, data, 1);
    }

	/** 
     * 
     */
    public saveBingAn(data:any) {
        let url = "SaveApplicationCase.ashx";
        this.sendRequest(HttpEvent.saveBingAn, url, data, 1);
    }

	/** 
     * 
     */
    public getBingAn(Name:string,Tag:string) {
        let url = "GetApplicationCase.ashx";
        let data = { Name:Name,Tag:Tag }
        this.sendRequest(HttpEvent.getBingAn, url, data, 1);
    }



    /** 通用接口
     * 所有header有2个
     * @param interf    接口编号 
     * @param url       链接
     * @param data      数据
     * @param method    0get 1post
     */
    private sendRequest(interf, url, data = null, method = 0) {
        url = HttpEvent.httpApi + url;
        let header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        let header1 = { type: "AppId", value: HttpEvent.appid };
        HttpManager.getInstance().sendRequest(interf, url, [header, header1], data, method == 0 ? egret.HttpMethod.GET : egret.HttpMethod.POST);
    }
}
