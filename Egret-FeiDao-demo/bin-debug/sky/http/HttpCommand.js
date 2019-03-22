var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 * 发送HTTP请求 HttpCommand.getInstance().dispatchEvent(HttpEvent.XXXX)
 *
 */
var HttpCommand = (function (_super) {
    __extends(HttpCommand, _super);
    function HttpCommand() {
        return _super.call(this) || this;
    }
    HttpCommand.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    };
    /** 登录
     * @param code 登录code
     */
    HttpCommand.prototype.getToken = function (code) {
        var url = "GetWXOpenId.ashx";
        var data = { RequestCode: code };
        this.sendRequest(HttpEvent.getToken, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.postUser = function (user) {
        var url = "SaveUserData.ashx";
        var data = user;
        this.sendRequest(HttpEvent.postUser, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.getUser = function (OpenId) {
        var url = "GetUserData.ashx";
        var data = { OpenId: OpenId };
        this.sendRequest(HttpEvent.getUser, url, data, 0);
    };
    /**
     *
     */
    HttpCommand.prototype.sign = function () {
        var url = "UserSign.ashx";
        var data = null;
        this.sendRequest(HttpEvent.getToken, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.saveRank = function (OpenId, ListType, HighScore) {
        var url = "SaveList.ashx";
        var data = { OpenId: OpenId, ListType: ListType, HighScore: HighScore };
        this.sendRequest(HttpEvent.saveRank, url, data, 1);
    };
    /**
     * @param OpenId
     * @param ListType
     * @param SortType aes 升序，des降序
     */
    HttpCommand.prototype.getRank = function (OpenId, ListType, SortType) {
        if (SortType === void 0) { SortType = "aes"; }
        var url = "GetList.ashx";
        var data = { OpenId: OpenId, ListType: ListType, SortType: SortType };
        this.sendRequest(HttpEvent.getRank, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.saveUserData = function (OpenId, FieldName, FieldValue) {
        var url = "SaveUserEnternal.ashx";
        var data = { OpenId: OpenId, FieldName: FieldName, FieldValue: FieldValue };
        this.sendRequest(HttpEvent.saveUserData, url, data, 1);
    };
    /**
     * @param KeyName”:”1001”,
     * @param KeyValue”:”{….}”   json数组
      *@param KeyType”:”Array”,
     */
    HttpCommand.prototype.saveList = function (KeyName, KeyValue, KeyType) {
        if (KeyType === void 0) { KeyType = "Array"; }
        var url = "SaveApplicationValue.ashx";
        var data = { KeyType: KeyType, KeyName: KeyName, KeyValue: KeyValue };
        this.sendRequest(HttpEvent.saveList, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.getList = function (KeyName) {
        var url = "GetApplicationValue.ashx";
        var data = { RequestCode: KeyName };
        this.sendRequest(HttpEvent.getList, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.saveBingAn = function (data) {
        var url = "SaveApplicationCase.ashx";
        this.sendRequest(HttpEvent.saveBingAn, url, data, 1);
    };
    /**
     *
     */
    HttpCommand.prototype.getBingAn = function (Name, Tag) {
        var url = "GetApplicationCase.ashx";
        var data = { Name: Name, Tag: Tag };
        this.sendRequest(HttpEvent.getBingAn, url, data, 1);
    };
    /** 通用接口
     * 所有header有2个
     * @param interf    接口编号
     * @param url       链接
     * @param data      数据
     * @param method    0get 1post
     */
    HttpCommand.prototype.sendRequest = function (interf, url, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = 0; }
        url = HttpEvent.httpApi + url;
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        var header1 = { type: "AppId", value: HttpEvent.appid };
        HttpManager.getInstance().sendRequest(interf, url, [header, header1], data, method == 0 ? egret.HttpMethod.GET : egret.HttpMethod.POST);
    };
    return HttpCommand;
}(egret.EventDispatcher));
__reflect(HttpCommand.prototype, "HttpCommand");
