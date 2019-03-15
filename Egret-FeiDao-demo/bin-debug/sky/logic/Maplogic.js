var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Maplogic = (function () {
    function Maplogic() {
        this.players = {};
        this.knifes = {};
        this.scale = 1;
        this.canchange = true;
    }
    Maplogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Maplogic();
        }
        return this.instance;
    };
    Maplogic.prototype.openUI = function (con, _ui, arg) {
        if (arg === void 0) { arg = null; }
        if (this.ui == null) {
            this.ui = _ui;
            this.args = arg;
            con.addChildAt(this.ui, 0);
            this.ui.logic = this;
            this.init();
        }
    };
    Maplogic.prototype.init = function () {
        this.initBg();
        this.initKnifes();
        this.initPlayers();
        this.updateMapCrood();
    };
    Maplogic.prototype.initBg = function () {
        this.bgs = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var bg = Maplogic.getInstance().getMapBg(DesignConst.mapwidth / 3, DesignConst.mapheight / 3);
                bg.x = j * DesignConst.mapwidth / 3;
                bg.y = i * DesignConst.mapheight / 3;
                this.ui.addChild(bg);
            }
        }
    };
    /** ------------------------------- players ------------------------- */
    Maplogic.prototype.initPlayers = function () {
        //ai球
        for (var i = 0; i < DesignConst.ai_num; i++) {
            this.addPlayer(i + 1);
        }
        //玩家球
        var myvo = this.getRolePlayerVO();
        this.role = new RolePlayer(myvo);
        this.players[myvo.id] = this.role;
        this.ui.addChild(this.role);
        RockerLogic.getInstance().setControlPlayer(this.role);
    };
    Maplogic.prototype.addPlayer = function (id) {
        var vo = this.getAIPlayerVO(id);
        var ai = ObjectPool.getObject("AIPlayer");
        ai.updateVO(vo);
        this.ui.addChild(ai);
        this.players[vo.id] = ai;
    };
    Maplogic.prototype.removePlayer = function (id) {
        if (id == 0) {
            GameLogic.getInstance().gameover();
            return;
        }
        var player = this.players[id];
        if (player != null) {
            player.clear();
            if (player.parent != null) {
                player.parent.removeChild(player);
            }
            delete this.players[id];
        }
    };
    Maplogic.prototype.clearPlayers = function () {
        for (var id in this.players) {
            this.removePlayer(id);
        }
    };
    /** ------------------------------ knifes ----------------- */
    /** 检测吃球 */
    Maplogic.prototype.dealEatKnifes = function (x, y, r) {
        var p1 = new egret.Point(x, y);
        var n = 0;
        for (var id in this.knifes) {
            var knife = this.knifes[id];
            if (knife != null && knife.state == KNIFESTATE.NORMAL) {
                var p2 = new egret.Point(knife.x, knife.y);
                var dis = egret.Point.distance(p1, p2);
                if (dis <= r) {
                    n++;
                    this.removeKnife(id);
                }
            }
        }
        return n;
    };
    Maplogic.prototype.initKnifes = function () {
        this.knife_num = 0;
        this.knife_hash = 0;
        for (var i = 0; i < DesignConst.knife_max; i++) {
            this.addKnife(this.knife_hash);
        }
    };
    Maplogic.prototype.checkKnifes = function () {
        if (this.knife_num < DesignConst.knife_max) {
            this.addKnife(this.knife_hash);
        }
    };
    Maplogic.prototype.flyToMap = function (id, srcx, srcy) {
        if (this.ui == null) {
            return;
        }
        var knife = ObjectPool.getObject("KnifePlayer");
        knife.init(id, false);
        this.ui.addChild(knife);
        this.knifes[knife.id] = knife;
        this.knife_num++;
        this.knife_hash++;
        knife.x = srcx;
        knife.y = srcy;
        var x = srcx + Math.random() * 1200 - 600;
        var y = srcy + Math.random() * 1200 - 600;
        var p = this.checkBound(x, y, 30);
        egret.Tween.get(knife, { loop: true }).to({ rotation: 360 }, 300);
        egret.Tween.get(knife).to({ x: p.x, y: p.y }, 1200).call(function () {
            knife.state = KNIFESTATE.NORMAL;
            egret.Tween.removeTweens(knife);
        }, this);
    };
    Maplogic.prototype.checkBound = function (x, y, dis) {
        if (x < dis) {
            x = dis;
        }
        else if (x > DesignConst.mapwidth - dis) {
            x = DesignConst.mapwidth - dis;
        }
        if (y < dis) {
            y = dis;
        }
        else if (y > DesignConst.mapheight - dis) {
            y = DesignConst.mapheight - dis;
        }
        return new egret.Point(x, y);
    };
    Maplogic.prototype.addKnife = function (id) {
        if (this.ui == null) {
            return;
        }
        var knife = ObjectPool.getObject("KnifePlayer");
        knife.init(id);
        this.ui.addChild(knife);
        this.knifes[knife.id] = knife;
        this.knife_num++;
        this.knife_hash++;
    };
    Maplogic.prototype.removeKnife = function (id) {
        var knife = this.knifes[id];
        if (knife != null) {
            knife.clear();
            if (knife.parent != null) {
                knife.parent.removeChild(knife);
            }
            delete this.knifes[id];
            this.knife_num--;
        }
    };
    Maplogic.prototype.clearKnifes = function () {
        for (var id in this.knifes) {
            this.removeKnife(id);
        }
        this.knife_num = 0;
        this.knife_hash = 0;
    };
    /** ----------------------------------------------------------------------- */
    Maplogic.prototype.start = function () {
        var _this = this;
        this.enter_count = 0;
        egret.setTimeout(function () {
            for (var id in _this.players) {
                var p = _this.players[id];
                if (p.vo.id != 0) {
                    p.state = PLAYERSTATE.MOVE;
                }
            }
        }, this, 1000);
    };
    Maplogic.prototype.stop = function () {
        for (var id in this.players) {
            var p = this.players[id];
            p.clear();
        }
    };
    Maplogic.prototype.getBeginPlayerVO = function () {
        var vo = ObjectPool.getObject("PlayerVO");
        vo.bg_id = "1";
        vo.knife_num = 4;
        vo.circleRadius = 48;
        vo.turn_speed = 4;
        vo.dis_from_circle = -16;
        vo.name = "玩家";
        vo.skinvo = SkinLogic.getInstance().getSkinVOByID(3);
        return vo;
    };
    Maplogic.prototype.getRolePlayerVO = function () {
        var vo = ObjectPool.getObject("PlayerVO");
        vo.id = 0;
        vo.bg_id = this.args.bgId;
        vo.knife_num = this.args.num;
        vo.skinvo = SkinLogic.getInstance().getSkinVOByID(this.args.skinId);
        vo.circleRadius = 32;
        vo.turn_speed = DesignConst.role_turn_speed;
        vo.move_speed = DesignConst.role_move_speed;
        vo.name = WxApi.getInstance().userInfo.nickname;
        return vo;
    };
    Maplogic.prototype.getAIPlayerVO = function (id) {
        var vo = ObjectPool.getObject("PlayerVO");
        vo.id = id;
        vo.bg_id = GameUtil.between(1, 5) + "";
        vo.knife_num = 4;
        vo.skinvo = SkinLogic.getInstance().getSkinVOByID(GameUtil.between(1, 5));
        vo.circleRadius = 32;
        vo.turn_speed = DesignConst.ai_turn_speed;
        vo.move_speed = DesignConst.ai_move_speed;
        vo.name = "电脑" + vo.id;
        return vo;
    };
    /**玩家球位置改变时 地图跟着改变 */
    Maplogic.prototype.updateMapCrood = function () {
        if (this.ui == null) {
            return;
        }
        this.ui.scaleX = this.ui.scaleY = this.scale;
        var tarx = -(this.role.x) * this.scale + GameData.stageWidth / 2;
        var tary = -(this.role.y) * this.scale + GameData.stageHeight / 2;
        this.ui.x = tarx;
        this.ui.y = tary;
    };
    Maplogic.prototype.enterframe = function () {
        this.updatePlayerBalls();
        if (this.enter_count % DesignConst.knife_frest_rate == 0) {
            this.checkKnifes();
        }
        this.enter_count++;
    };
    Maplogic.prototype.sortPlayers = function (a, b) {
        if (a.vo.knife_num > b.vo.knife_num) {
            return -1;
        }
        else {
            return 1;
        }
    };
    /**更新玩家球状态 */
    Maplogic.prototype.updatePlayerBalls = function () {
        var arr = [];
        for (var id in this.players) {
            var player = this.players[id];
            arr.push(player);
        }
        //排序 并刷新排行榜
        arr.sort(this.sortPlayers);
        GameLogic.getInstance().updateRank(arr);
        this.updatePlayerBallsState(arr);
    };
    /**更新玩家状态  坐标-->吞噬-->逃逸-->追击-->block */
    Maplogic.prototype.updatePlayerBallsState = function (arr) {
        while (arr.length > 0) {
            var p = arr.shift();
            p.update();
            this.setPlayerBallsState(p, arr);
        }
    };
    Maplogic.prototype.setPlayerBallsState = function (srcplayer, tarplayers) {
        var eated = false;
        for (var i = 0; i < tarplayers.length; i++) {
            var tarplayer = tarplayers[i];
            eated = this.dealHit(srcplayer, tarplayer);
            //srcplayer被吃掉了 return
            if (eated) {
                return;
            }
        }
    };
    Maplogic.prototype.dealHit = function (srcplayer, tarplayer) {
        var dis = srcplayer.vo.radius + tarplayer.vo.radius;
        if (srcplayer.state == PLAYERSTATE.DEFENCE || tarplayer.state == PLAYERSTATE.DEFENCE) {
            dis += 30;
        }
        var p1 = new egret.Point(srcplayer.x, srcplayer.y);
        var p2 = new egret.Point(tarplayer.x, tarplayer.y);
        var b1 = egret.Point.distance(p1, p2) < dis;
        if (b1) {
            var src_kill = void 0;
            var tar_kill = void 0;
            var p3 = void 0;
            var p4 = void 0; //knife在地图中的坐标
            var p5 = void 0;
            var p6 = void 0; //tarknife在地图中的坐标
            // if (tarplayer.state != PLAYERSTATE.DEFENCE) {
            for (var i = 0; i < srcplayer.knifes.length; i++) {
                var knife = srcplayer.knifes[i];
                if (srcplayer.state == PLAYERSTATE.DEFENCE) {
                    p3 = knife.localToGlobal(knife.width / 2, knife.height);
                }
                else {
                    p3 = knife.localToGlobal(knife.width / 2, knife.height / 2);
                }
                p4 = this.ui.globalToLocal(p3.x, p3.y); //knife在地图中的坐标
                //先检测tar圆心，优先击杀
                var d2 = egret.Point.distance(p4, p2);
                if (d2 < tarplayer.vo.circleRadius) {
                    if (tarplayer.vo.id == 0) {
                        platform.vibrate(true);
                    }
                    this.removePlayer(tarplayer.vo.id);
                    return;
                }
                //遍历飞刀
                for (var j = 0; j < tarplayer.knifes.length; j++) {
                    var tarknife = tarplayer.knifes[j];
                    if (tarplayer.state == PLAYERSTATE.DEFENCE) {
                        p5 = tarknife.localToGlobal(tarknife.width / 2, tarknife.height);
                    }
                    else {
                        p5 = tarknife.localToGlobal(tarknife.width / 2, tarknife.height / 2);
                    }
                    p6 = this.ui.globalToLocal(p5.x, p5.y); //tarknife在地图中的坐标
                    //先检测src圆心，优先击杀
                    d2 = egret.Point.distance(p6, p1);
                    if (d2 < srcplayer.vo.circleRadius) {
                        if (srcplayer.vo.id == 0) {
                            platform.vibrate(true);
                        }
                        this.removePlayer(srcplayer.vo.id);
                        return;
                    }
                    d2 = egret.Point.distance(p4, p6);
                    var b2 = d2 < tarknife.height / 2;
                    var ss = false;
                    if (b2) {
                        if (srcplayer.state == PLAYERSTATE.DEFENCE && tarplayer.state != PLAYERSTATE.DEFENCE) {
                            if (Math.random() < 0.3) {
                                srcplayer.removeKnife(i);
                                if (srcplayer.vo.id == 0) {
                                    ss = true;
                                }
                                this.flyToMap(this.knife_hash, p4.x, p4.y);
                            }
                            tarplayer.removeKnife(j);
                            if (tarplayer.vo.id == 0) {
                                ss = true;
                            }
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                            if (ss) {
                                platform.vibrate(true);
                            }
                            return;
                        }
                        if (tarplayer.state == PLAYERSTATE.DEFENCE && srcplayer.state != PLAYERSTATE.DEFENCE) {
                            if (Math.random() < 0.3) {
                                tarplayer.removeKnife(i);
                                if (tarplayer.vo.id == 0) {
                                    ss = true;
                                }
                                this.flyToMap(this.knife_hash, p4.x, p4.y);
                            }
                            if (srcplayer.vo.id == 0) {
                                ss = true;
                            }
                            srcplayer.removeKnife(j);
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                            if (ss) {
                                platform.vibrate(true);
                            }
                            return;
                        }
                        if (tarplayer.state == PLAYERSTATE.DEFENCE && srcplayer.state == PLAYERSTATE.DEFENCE) {
                            srcplayer.removeKnife(i);
                            this.flyToMap(this.knife_hash, p4.x, p4.y);
                            tarplayer.removeKnife(j);
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                            if (srcplayer.vo.id == 0 || tarplayer.vo.id == 0) {
                                ss = true;
                            }
                            if (ss) {
                                platform.vibrate(true);
                            }
                            return;
                        }
                        //都不在防御状态
                        if (srcplayer.knifes.length > tarplayer.knifes.length) {
                            if (Math.random() < 0.8) {
                                srcplayer.removeKnife(i);
                                if (srcplayer.vo.id == 0) {
                                    ss = true;
                                }
                                this.flyToMap(this.knife_hash, p4.x, p4.y);
                            }
                            tarplayer.removeKnife(j);
                            if (tarplayer.vo.id == 0) {
                                ss = true;
                            }
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                        }
                        else if (srcplayer.knifes.length < tarplayer.knifes.length) {
                            if (Math.random() < 0.8) {
                                tarplayer.removeKnife(i);
                                if (tarplayer.vo.id == 0) {
                                    ss = true;
                                }
                                this.flyToMap(this.knife_hash, p4.x, p4.y);
                            }
                            if (srcplayer.vo.id == 0) {
                                ss = true;
                            }
                            srcplayer.removeKnife(j);
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                        }
                        else {
                            srcplayer.removeKnife(i);
                            this.flyToMap(this.knife_hash, p4.x, p4.y);
                            tarplayer.removeKnife(j);
                            this.flyToMap(this.knife_hash, p6.x, p6.y);
                            if (srcplayer.vo.id == 0 || tarplayer.vo.id == 0) {
                                ss = true;
                            }
                        }
                        if (ss) {
                            platform.vibrate(true);
                        }
                        return;
                    }
                }
            }
            // }
        }
        return false;
    };
    Maplogic.prototype.clear = function () {
        this.clearKnifes();
        this.clearPlayers();
        if (this.ui != null && this.ui.parent != null) {
            this.ui.parent.removeChild(this.ui);
        }
        this.ui = null;
    };
    /** ------------------------------------------------------------------------------------ */
    Maplogic.prototype.getMapBg = function (w, h) {
        var unit = 68;
        var w1 = Math.ceil(w / unit);
        var h1 = Math.ceil(h / unit);
        var con = new egret.DisplayObjectContainer();
        for (var i = 0; i < h1; i++) {
            for (var j = 0; j < w1; j++) {
                var r = Math.random();
                var src = r < 0.9 ? 2 : (r < 0.95 ? 1 : 3);
                var bmp = new egret.Bitmap(RES.getRes("game_json.di_" + src));
                bmp.x = j * unit;
                bmp.y = i * unit;
                con.addChild(bmp);
            }
        }
        return GameUtil.drawBitmapFromDisObject(con, new egret.Rectangle(0, 0, w, h), 1);
    };
    return Maplogic;
}());
__reflect(Maplogic.prototype, "Maplogic");
//# sourceMappingURL=Maplogic.js.map