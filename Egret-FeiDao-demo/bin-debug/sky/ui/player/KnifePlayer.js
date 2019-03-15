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
var KnifePlayer = (function (_super) {
    __extends(KnifePlayer, _super);
    function KnifePlayer() {
        return _super.call(this) || this;
    }
    KnifePlayer.prototype.init = function (id, b) {
        if (b === void 0) { b = true; }
        this.id = id;
        if (this.bg == null) {
            this.bg = ObjectPool.getObject("BaseBitmap");
        }
        this.bg.texture = RES.getRes("dao_1");
        this.bg.scaleX = this.bg.scaleY = DesignConst.knifescale;
        this.bg.rotation = Math.random() * 360;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        this.addChild(this.bg);
        if (b) {
            this.state = KNIFESTATE.NORMAL;
            this.birth();
        }
        else {
            this.state = KNIFESTATE.FLYING;
        }
    };
    Object.defineProperty(KnifePlayer.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (v) {
            this._state = v;
        },
        enumerable: true,
        configurable: true
    });
    KnifePlayer.prototype.birth = function () {
        this.x = Math.random() * DesignConst.mapwidth;
        this.y = Math.random() * DesignConst.mapheight;
    };
    KnifePlayer.prototype.clear = function () {
        this._state = KNIFESTATE.NORMAL;
    };
    KnifePlayer.prototype.reset = function () {
        this._state = KNIFESTATE.NORMAL;
    };
    KnifePlayer.prototype.destroy = function () {
    };
    return KnifePlayer;
}(egret.DisplayObjectContainer));
__reflect(KnifePlayer.prototype, "KnifePlayer", ["IPool"]);
window['KnifePlayer'] = KnifePlayer;
//# sourceMappingURL=KnifePlayer.js.map