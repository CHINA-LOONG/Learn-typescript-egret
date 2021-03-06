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
var HttpManager = (function (_super) {
    __extends(HttpManager, _super);
    function HttpManager() {
        return _super.call(this) || this;
    }
    HttpManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpManager();
        }
        return this.instance;
    };
    /**发送http请求
     * @param interf 接口编号
     * @param url   接口链接
     * @param headers 协议头
     * @param data 携带参数
     * @param method 请求类型 仅支持egret.HttpMethod.GET / egret.HttpMethod.POST
     */
    HttpManager.prototype.sendRequest = function (interf, url, headers, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "GET"; }
        console.log("发送消息:", interf, url, data);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, method);
        for (var i = 0; i < headers.length; i++) {
            var o = headers[i];
            request.setRequestHeader(o['type'], o['value']);
        }
        request.once(egret.IOErrorEvent.IO_ERROR, function (e) {
            console.log("IOERROR:", interf, e.currentTarget);
            var event = new HttpEvent(interf);
            event.data = "ioerror";
            HttpCommand.getInstance().dispatchEvent(event);
        }, this);
        request.once(egret.ProgressEvent.PROGRESS, function (e) { }, this);
        request.once(egret.Event.COMPLETE, function (e) {
            var response = JSON.parse(e.currentTarget.response);
            var code = response['code'];
            if (code != 0) {
                console.log("请求--" + interf + "--失败:", response);
                var event_1 = new HttpEvent(interf);
                event_1.data = "fail";
                HttpCommand.getInstance().dispatchEvent(event_1);
            }
            else {
                console.log("收到消息:", interf, response);
                var event_2 = new HttpEvent(interf);
                event_2.data = response.data;
                HttpCommand.getInstance().dispatchEvent(event_2);
            }
        }, this);
        request.send(data);
    };
    return HttpManager;
}(egret.EventDispatcher));
__reflect(HttpManager.prototype, "HttpManager");
