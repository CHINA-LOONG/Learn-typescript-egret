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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WxApi = (function (_super) {
    __extends(WxApi, _super);
    function WxApi() {
        return _super.call(this) || this;
    }
    WxApi.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WxApi();
        }
        return this._instance;
    };
    WxApi.prototype.onShow = function () {
        if (platform.isdebug()) {
            return;
        }
    };
    WxApi.prototype.offShow = function () {
        if (platform.isdebug()) {
            return;
        }
    };
    WxApi.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, userinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inited = false;
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        res = _a.sent();
                        this.logincode = res.code;
                        console.log("logincode:", res.code);
                        platform.checkUpdate();
                        this.onShare();
                        this.initRewardVideoAd();
                        userinfo = new UserInfo();
                        userinfo.avatarUrl = "";
                        userinfo.city = "";
                        userinfo.country = "";
                        userinfo.gender = 2;
                        userinfo.language = "";
                        userinfo.nickname = "玩家";
                        userinfo.province = "";
                        userinfo.auth = false;
                        this.userInfo = userinfo;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 二，得到token以后把微信的用户信息以后发给服务器 */
    WxApi.prototype.getTokenResponse = function (e) {
        if (e.data == "ioerror") {
            GameConst.save_server = false;
        }
        else if (e.data == "fail") {
            GameConst.save_server = false;
        }
        else {
            GameConst.save_server = true;
            this.userInfo.token = e.data.token;
        }
        // HttpCommand.getInstance().once(HttpEvent.getUser, this.getUserResponse, this);
        // HttpCommand.getInstance().getUser();
    };
    /** 预加载激励视频 */
    WxApi.prototype.initRewardVideoAd = function () {
        var _this = this;
        if (platform.isdebug()) {
            return;
        }
        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: GameConst.rewardAdId });
        this.rewardAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        this.rewardAd.onError(function (err) {
            console.log("rewardAderror:", err);
        });
        this.rewardAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            var state;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                state = 0;
                _this.rewardAdCDStart();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                state = 1;
            }
            _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
        });
    };
    /** 观看视频 关闭视频监听GameEvent.REWARDAD_CLOSE_EVENT
     * @param type 观看视频来源类型 WATCHTYPE.XXXX
     */
    WxApi.prototype.showRewardAd = function (type) {
        this.adtype = type;
        if (this.rewardAd != null) {
            try {
                this.rewardAd.show()
                    .catch(function (err) {
                    console.log("showRewardAd:", err);
                });
            }
            catch (e) {
                console.log("rewardAd:", e);
            }
        }
    };
    WxApi.prototype.rewardAdCDStart = function () {
        this.starttime = new Date().getTime();
        this.setLocalDataByString("rewardcd", this.starttime + "");
    };
    WxApi.prototype.getRewardCD = function () {
        var nowtime = new Date().getTime();
        if (this.starttime == null) {
            return 0;
        }
        else {
            return 180 - Math.floor((nowtime - this.starttime) / 1000);
        }
    };
    WxApi.prototype.dispatchGameEvent = function (eventname, data, logstr) {
        if (logstr === void 0) { logstr = "暂无视频可观看"; }
        console.log("dispatchGameEvent:", eventname, this.adtype, data);
        if (eventname == GameEvent.REWARDAD_CLOSE_EVENT && (data == 2 || data == 3)) {
            this.toast(logstr);
        }
        var event = new GameEvent(eventname);
        event.data = { type: this.adtype, data: data };
        this.dispatchEvent(event);
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalDataByObject = function (key, obj) {
        var value = JSON.stringify(obj);
        this.setLocalDataByString(key, value);
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalDataByString = function (key, value) {
        if (platform.isdebug()) {
            return null;
        }
        try {
            wx.setStorageSync(key, value);
        }
        catch (e) {
            return null;
        }
    };
    /**读取本地数据 */
    WxApi.prototype.getLocalData = function (key) {
        if (platform.isdebug()) {
            return null;
        }
        try {
            return wx.getStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    /**删除缓存指定 */
    WxApi.prototype.clearLocalData = function (key) {
        if (platform.isdebug()) {
            return null;
        }
        try {
            return wx.removeStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    WxApi.prototype.toast = function (str) {
        if (platform.isdebug()) {
            return null;
        }
        wx.showToast({
            title: str,
            icon: 'none',
            duration: 3000
        });
    };
    WxApi.prototype.share = function (type, data) {
        if (type === void 0) { type = 1; }
        if (data === void 0) { data = null; }
        if (platform.isdebug()) {
            return;
        }
        var title = "";
        var r = Math.floor(Math.random() * 3 + 1);
        var img = "resource/assets/share/share" + r + ".jpg";
        var query = "";
        switch (type) {
            case SHARETYPE.SHARE:
                title = "我飞刀玩的贼6，快来击败我";
                img = img;
                break;
            case SHARETYPE.SHOWOFF:
                title = "小李飞刀，弹无虚发";
                img = img;
                break;
        }
        wx.shareAppMessage({
            title: title,
            imageUrl: img,
            query: query
        });
    };
    /**监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
     */
    WxApi.prototype.onShare = function (query) {
        if (query === void 0) { query = "rightup=1"; }
        if (platform.isdebug()) {
            return;
        }
        wx.showShareMenu();
        this.updateShareMenu(true);
        wx.onShareAppMessage(function () {
            return {
                title: "小李飞刀，弹无虚发",
                imageUrl: "resource/assets/share/share1.jpg",
                query: ""
            };
        });
    };
    /**转发参数 */
    WxApi.prototype.updateShareMenu = function (withShareTicket) {
        wx.updateShareMenu({
            withShareTicket: withShareTicket,
            success: function (res) {
                console.log("updateShareMenu:success:", res);
            },
            fail: function (res) {
                console.log("updateShareMenu:fail:", res);
            },
            complete: function () {
                console.log("updateShareMenu:complete:");
            }
        });
    };
    return WxApi;
}(egret.EventDispatcher));
__reflect(WxApi.prototype, "WxApi");
//# sourceMappingURL=WxApi.js.map