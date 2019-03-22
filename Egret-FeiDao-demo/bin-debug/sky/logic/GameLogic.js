var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic() {
    }
    GameLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameLogic();
        }
        return this.instance;
    };
    GameLogic.prototype.openUI = function (con, _ui, arg) {
        if (arg === void 0) { arg = null; }
        if (this.ui == null) {
            this.ui = _ui;
            this.args = arg;
            con.addChild(this.ui);
            this.ui.logic = this;
            if (this.ui.inited) {
                this.init();
            }
        }
    };
    GameLogic.prototype.init = function () {
        console.log("GameLogic.init", this.ui.inited, this.ui.logic);
        this.checkFit();
        this.initData();
        this.initView();
        this.initEvent();
    };
    GameLogic.prototype.checkFit = function () {
    };
    GameLogic.prototype.initData = function () {
    };
    GameLogic.prototype.initView = function () {
        //地图
        Maplogic.getInstance().openUI(this.ui, new MapCon(), this.args);
        //操作的摇杆
        RockerLogic.getInstance().openUI(this.ui, new Rocker());
        this.initRank();
        this.startGame();
    };
    /** --------------------------------- rank --------------------------- */
    GameLogic.prototype.initRank = function () {
        for (var i = 1; i <= 5; i++) {
            this.ui['lbl_rank' + i + '_name'].text = "";
            this.ui['lbl_rank' + i + '_num'].text = "";
            this.ui['lbl_rank' + i + '_src'].texture = null;
        }
    };
    GameLogic.prototype.updateRank = function (arr) {
        this.myrank = 1;
        for (var i = 1; i <= 5; i++) {
            var player = arr[i - 1];
            if (player != null) {
                if (player.vo.id == 0) {
                    this.myrank = i;
                }
                this.ui['lbl_rank' + i + '_name'].text = player.vo.name;
                this.ui['lbl_rank' + i + '_num'].text = player.vo.knife_num + "";
                this.ui['lbl_rank' + i + '_src'].texture = RES.getRes("yuan_" + player.vo.bg_id);
            }
            else {
                this.ui['lbl_rank' + i + '_name'].text = "";
                this.ui['lbl_rank' + i + '_num'].text = "";
                this.ui['lbl_rank' + i + '_src'].texture = null;
            }
        }
        if (this.myrank == 1 && arr.length == 1) {
            this.gameover();
        }
    };
    /**开始游戏 */
    GameLogic.prototype.startGame = function () {
        platform.bannershow(GameConst.bannerAdId, GameData.stageHeight);
        this.ui.gp_over.x = -this.ui.gp_over.width;
        this.ui.gp_over.visible = false;
        this.gamestate = GAMESTATE.START;
        RockerLogic.getInstance().start(); //摇杆逻辑启动
        Maplogic.getInstance().start(); //地图逻辑启动
        this.lefttime = DesignConst.gametime;
        this.game_countId = egret.setInterval(this.countDown, this, 1000);
    };
    GameLogic.prototype.countDown = function () {
        this.lefttime--;
        this.ui.lbl_count.text = TimeUtil.ParseTime2Format(this.lefttime, "m:s");
        if (this.lefttime <= 0) {
            this.gameover();
        }
    };
    GameLogic.prototype.gameover = function () {
        this.ui.lbl_rank.text = "第" + this.myrank + "名";
        this.ui.gp_over.visible = true;
        egret.Tween.get(this.ui.gp_over).to({ x: 0 }, 600);
        this.gamestate = GAMESTATE.OVER;
        egret.clearInterval(this.game_countId);
        this.openHit();
        RockerLogic.getInstance().clear();
        Maplogic.getInstance().stop();
    };
    GameLogic.prototype.initEvent = function () {
        GameData.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.ui.lbl_showoff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShowoff, this);
        this.ui.lbl_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    GameLogic.prototype.clickShowoff = function () {
        WxApi.getInstance().share(SHARETYPE.SHOWOFF);
    };
    GameLogic.prototype.clickBack = function () {
        BeginLogic.getInstance().openUI(GameData.main, new BeginUI());
        this.clear();
    };
    GameLogic.prototype.enterframe = function () {
        if (this.gamestate == GAMESTATE.START) {
            Maplogic.getInstance().enterframe();
        }
    };
    GameLogic.prototype.clearEvent = function () {
        GameData.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.ui.lbl_showoff.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShowoff, this);
        this.ui.lbl_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    GameLogic.prototype.clickStart = function () {
        if (this.ui != null && this.ui.parent != null) {
            this.ui.parent.removeChild(this.ui);
        }
    };
    GameLogic.prototype.clear = function () {
        Maplogic.getInstance().clear();
        RockerLogic.getInstance().clear();
        this.clearEvent();
        if (this.ui != null && this.ui.parent != null) {
            this.ui.parent.removeChild(this.ui);
        }
        this.ui = null;
    };
    /** 恢复碰撞 */
    GameLogic.prototype.openHit = function () {
        GameData.GameStage.$hitTest = egret.DisplayObjectContainer.prototype.$hitTest;
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
