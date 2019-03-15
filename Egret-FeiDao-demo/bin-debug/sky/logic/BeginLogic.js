var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BeginLogic = (function () {
    function BeginLogic() {
        this.max = 5;
        this.crt = 1;
        this.addknife = 0;
    }
    BeginLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new BeginLogic();
        }
        return this.instance;
    };
    BeginLogic.prototype.openUI = function (con, _ui, arg) {
        if (arg === void 0) { arg = null; }
        if (this.ui == null) {
            this.ui = _ui;
            con.addChild(this.ui);
            this.ui.logic = this;
            if (this.ui.inited) {
                this.init();
            }
        }
    };
    BeginLogic.prototype.init = function () {
        console.log("BeginLogic.init", this.ui.inited, this.ui.logic);
        this.checkFit();
        this.initData();
        this.initView();
        this.initEvent();
    };
    BeginLogic.prototype.checkFit = function () {
        this.ui.gp_bg.height = this.ui.rect_bg.height = this.ui.img_bg.height = GameData.stageHeight;
    };
    BeginLogic.prototype.initData = function () {
        this.ui.lbl_cast_title.text = "2019.2.23更新公告";
        this.ui.lbl_cast.text = "1.优化防御状态；\n" +
            "2.修复飞刀被击飞后的所有都有震动效果的bug\n" +
            "\n" +
            "\n" +
            "\n" +
            "下次更新预告：\n" +
            "1.增加皮肤\n" +
            "2.增加击杀效果\n" +
            "";
    };
    BeginLogic.prototype.initView = function () {
        this.bmp_bg = Maplogic.getInstance().getMapBg(GameData.stageWidth, GameData.stageHeight);
        this.ui.gp_bg.addChild(this.bmp_bg);
        this.cast_bg = Maplogic.getInstance().getMapBg(640, 780);
        this.cast_bg.x = 55;
        this.cast_bg.y = 287;
        this.ui.gp_cast.addChildAt(this.cast_bg, 1);
        this.crtVO = Maplogic.getInstance().getBeginPlayerVO();
        this.beginplayer = new BeginPlayer(this.crtVO);
        if (this.checkVersion()) {
            this.beginplayer.updateCenter(BEGINSTATE.NORMAL);
            this.ui.img_logo.visible = false;
        }
        else {
            // this.ui.img_logo.visible = true;
            this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
        }
        this.beginplayer.x = this.ui.width / 2;
        this.beginplayer.y = this.ui.img_left.y + this.ui.img_left.height / 2;
        this.ui.addChildAt(this.beginplayer, 2);
        this.ui.gp_cast.visible = this.checkCast();
        platform.bannershow(GameConst.bannerAdId, GameData.stageHeight);
        platform.createGameClubButton(12.5, this.ui.lbl_quan.y - 52, GameData.stageWidth, GameData.stageHeight);
    };
    BeginLogic.prototype.checkVersion = function () {
        var time = new Date().getTime();
        console.log(time);
        var vtime = 1551083540959 + 1000 * 3600 * 24;
        return time < vtime;
    };
    BeginLogic.prototype.checkCast = function () {
        var localversion = WxApi.getInstance().getLocalData(GameConst.localversion);
        var v = parseInt(localversion);
        if (localversion == null || localversion == "") {
            v = 0;
        }
        WxApi.getInstance().setLocalDataByString(GameConst.localversion, GameConst.version + "");
        return v < GameConst.version;
    };
    BeginLogic.prototype.initEvent = function () {
        this.ui.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.ui.img_closecast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
        this.ui.img_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
        this.ui.lbl_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.ui.lbl_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickAdd, this);
        this.ui.img_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        this.ui.img_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        this.beginplayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBeginPlayer, this);
        WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        GameData.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
    };
    BeginLogic.prototype.clickBeginPlayer = function () {
        var _this = this;
        if (this.beginplayer != null && this.beginplayer.vo != null) {
            switch (this.beginplayer.beginstate) {
                case BEGINSTATE.LOCK:
                case BEGINSTATE.NORMAL:
                    return;
                case BEGINSTATE.SHAREADD:
                    WxApi.getInstance().share(SHARETYPE.SHARE);
                    egret.lifecycle.onPause = function () {
                        _this.pause();
                    };
                    egret.lifecycle.onResume = function () {
                        _this.resume();
                    };
                    break;
                case BEGINSTATE.TRYPLAY:
                    WxApi.getInstance().showRewardAd(WATCHTYPE.TRYPLAY);
                    break;
                case BEGINSTATE.WATCHADD:
                    WxApi.getInstance().showRewardAd(WATCHTYPE.ADDKNIFE);
                    break;
            }
        }
    };
    BeginLogic.prototype.clickLeft = function () {
        if (this.crt <= 1) {
            return;
        }
        this.crt--;
        this.ui.img_left.visible = this.crt > 1;
        this.ui.img_right.visible = this.crt < this.max;
        this.initSkin();
    };
    BeginLogic.prototype.clickRight = function () {
        if (this.crt >= this.max) {
            return;
        }
        this.crt++;
        this.ui.img_left.visible = this.crt > 1;
        this.ui.img_right.visible = this.crt < this.max;
        this.initSkin();
    };
    BeginLogic.prototype.initSkin = function () {
        var vo = SkinLogic.getInstance().getSkinVOByID(this.crt);
        if (vo != null) {
            this.crtVO.skinvo = vo;
            this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
            this.beginplayer.updateVO(this.crtVO);
        }
    };
    BeginLogic.prototype.clickAdd = function () {
        WxApi.getInstance().showRewardAd(WATCHTYPE.ADDKNIFE);
    };
    BeginLogic.prototype.watchReward = function (e) {
        if (e.data.data == 0) {
            if (e.data.type == WATCHTYPE.ADDKNIFE) {
                this.addknife = 5;
                WxApi.getInstance().toast("飞刀+3");
                this.beginplayer.updateCenter(BEGINSTATE.NORMAL);
            }
            else if (e.data.type == WATCHTYPE.TRYPLAY) {
                this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
                this.clickStart();
            }
        }
    };
    BeginLogic.prototype.closeCast = function () {
        this.ui.gp_cast.visible = false;
    };
    BeginLogic.prototype.enterframe = function () {
        if (this.beginplayer != null) {
            this.beginplayer.update();
        }
    };
    BeginLogic.prototype.clearEvent = function () {
        this.ui.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.ui.img_closecast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
        this.ui.img_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
        this.ui.lbl_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.ui.lbl_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickAdd, this);
        this.ui.img_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        this.ui.img_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        this.beginplayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBeginPlayer, this);
        WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        GameData.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
    };
    BeginLogic.prototype.clickShare = function () {
        WxApi.getInstance().share(SHARETYPE.SHARE);
    };
    BeginLogic.prototype.pause = function () {
        var _this = this;
        console.log("beinglogic:pause");
        this.shareId = egret.setTimeout(function () {
            _this.addknife = 2;
            if (_this.beginplayer != null) {
                _this.beginplayer.updateCenter(BEGINSTATE.WATCHADD);
            }
        }, this, 2500);
    };
    BeginLogic.prototype.resume = function () {
        console.log("beginloic:resume");
        egret.clearTimeout(this.shareId);
    };
    BeginLogic.prototype.clickStart = function () {
        if (this.beginplayer.state == BEGINSTATE.TRYPLAY || this.beginplayer.state == BEGINSTATE.LOCK) {
            return;
        }
        var obj = {
            bgId: this.crtVO.bg_id,
            skinId: this.crtVO.skinvo.id,
            num: this.crtVO.knife_num + this.addknife
        };
        GameLogic.getInstance().openUI(GameData.main, new GameUI(), obj);
        if (this.ui != null && this.ui.parent != null) {
            this.ui.parent.removeChild(this.ui);
        }
    };
    BeginLogic.prototype.clear = function () {
        this.clearEvent();
        if (this.ui != null && this.ui.parent != null) {
            this.ui.parent.removeChild(this.ui);
        }
        this.ui = null;
        this.addknife = 0;
        this.beginplayer.clear();
        this.crtVO.clear();
        this.crtVO = null;
        this.beginplayer = null;
    };
    return BeginLogic;
}());
__reflect(BeginLogic.prototype, "BeginLogic");
//# sourceMappingURL=BeginLogic.js.map