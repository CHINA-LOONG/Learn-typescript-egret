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
var BeginPlayer = (function (_super) {
    __extends(BeginPlayer, _super);
    function BeginPlayer(vo) {
        var _this = _super.call(this, vo) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    /** 每一帧执行 */
    BeginPlayer.prototype.update = function () {
        this.con.rotation += this.vo.turn_speed;
    };
    BeginPlayer.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.state = PLAYERSTATE.DEFENCE;
        this.lbl_name.text = "+2"; //覆盖了本来的名字
        this.icon = new egret.Bitmap();
        this.addChild(this.icon);
    };
    BeginPlayer.prototype.updateKnifes = function () {
        if (this.knifes == null || this.knifes.length == 0) {
            _super.prototype.updateKnifes.call(this);
            return;
        }
        var n = this.vo.knife_num;
        if (n >= DesignConst.player_knife_max) {
            n = DesignConst.player_knife_max;
        }
        for (var i = 0; i < this.knifes.length; i++) {
            var knife = this.knifes[i];
            knife.texture = RES.getRes("dao_" + this.vo.skinvo.id);
            knife.scaleX = knife.scaleY = 1;
            knife.anchorOffsetX = knife.width / 2;
            knife.anchorOffsetY = -this.vo.radius;
            knife.rotation = 360 * i / n;
        }
    };
    BeginPlayer.prototype.updateCenter = function (s) {
        this.beginstate = s;
        switch (s) {
            case BEGINSTATE.NORMAL:
                this.lbl_name.text = "玩家";
                this.lbl_name.width = this.bg_diameter;
                this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
                this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
                this.lbl_name.y = 0;
                this.lbl_name.visible = true;
                this.icon.visible = false;
                break;
            case BEGINSTATE.WATCHADD:
                this.icon.texture = RES.getRes("game_json.video");
                this.icon.anchorOffsetX = this.icon.width / 2;
                this.icon.anchorOffsetY = this.icon.height / 2;
                this.icon.y = -10;
                this.icon.visible = true;
                this.lbl_name.text = "+3";
                this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
                this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
                this.lbl_name.y = this.icon.height / 2 + 2;
                break;
            case BEGINSTATE.SHAREADD:
                this.icon.texture = RES.getRes("game_json.share");
                this.icon.anchorOffsetX = this.icon.width / 2;
                this.icon.anchorOffsetY = this.icon.height / 2;
                this.icon.y = -10;
                this.icon.visible = true;
                this.lbl_name.text = "+2";
                this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
                this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
                this.lbl_name.y = this.icon.height / 2 + 2;
                break;
        }
    };
    BeginPlayer.prototype.updateLblName = function () {
    };
    BeginPlayer.prototype.clear = function () {
    };
    BeginPlayer.prototype.reset = function () {
    };
    BeginPlayer.prototype.destroy = function () {
    };
    return BeginPlayer;
}(Player));
__reflect(BeginPlayer.prototype, "BeginPlayer");
