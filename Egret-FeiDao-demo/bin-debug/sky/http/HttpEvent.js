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
var HttpEvent = (function (_super) {
    __extends(HttpEvent, _super);
    function HttpEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    /** rubbish */
    HttpEvent.s1 = "25ac";
    HttpEvent.s2 = "21baadc6fbd";
    /**与服务端通信地址 */
    HttpEvent.httpApi = "https://www.remvd.com/WXGAPI/";
    /**游戏的appid */
    HttpEvent.appid = "wxe608ae48fcc1cb6c";
    /** api接口版本 */
    HttpEvent.version = "1.0";
    /** ---------------------------- 接口协议 --------------------------------------- */
    /** 获取Token */
    HttpEvent.getToken = "getToken";
    /**  */
    HttpEvent.postUser = "postUser";
    /**  */
    HttpEvent.getUser = "getUser";
    /**  */
    HttpEvent.sign = "sign";
    /**  */
    HttpEvent.saveRank = "saveRank";
    /**  */
    HttpEvent.getRank = "getRank";
    /**  */
    HttpEvent.saveUserData = "saveUserData";
    /**  */
    HttpEvent.saveList = "saveList";
    /**  */
    HttpEvent.getList = "getList";
    /**  */
    HttpEvent.saveBingAn = "saveBingAn";
    /**  */
    HttpEvent.getBingAn = "getBingAn";
    return HttpEvent;
}(egret.Event));
__reflect(HttpEvent.prototype, "HttpEvent");
//# sourceMappingURL=HttpEvent.js.map