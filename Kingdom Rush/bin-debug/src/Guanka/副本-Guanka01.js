/**
 *
 * 关卡一
 * @author
 *
 */
var Guanka01 = (function (_super) {
    __extends(Guanka01, _super);
    function Guanka01() {
        _super.call(this);
        /**建造队列*/
        this.buildQuene = [];
        /**怪物行走路径点数组*/
        this.roadArr1 = [[812, 241], [584, 241], [484, 141], [304, 141], [214, 241], [24, 241]];
        this.roadArr2 = [[812, 263], [584, 263], [484, 363], [304, 363], [214, 263], [24, 263]];
        /**时间差*/
        this.otime = 0;
        /**怪物产生间隔*/
        this.mtime = 2000;
        //初始化各种数据
        this.enemyArr = [];
        //背景地图
        this.bm = Utils.createBitmapByName("map0");
        this.addChild(this.bm);
        this.bm.touchEnabled = true;
        this.bm.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bgckH, this);
        //范围层
        this.areaLayer = new egret.Sprite();
        this.addChild(this.areaLayer);
        //NPC层
        this.npcLayer = new egret.Sprite();
        this.addChild(this.npcLayer);
        //地基、塔层
        this.baseLayer = new egret.Sprite();
        this.addChild(this.baseLayer);
        this.createBase();
        //添加武器层
        this.weaponLayer = new egret.Sprite();
        this.addChild(this.weaponLayer);
        //心跳控制器启动
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    var __egretProto__ = Guanka01.prototype;
    /**背景地图被点击*/
    __egretProto__.bgckH = function (e) {
        //console.log("背景地图被点击");
        this.removeTool();
    };
    __egretProto__.init = function () {
    };
    /**地基*/
    __egretProto__.createBase = function () {
        //"生成空地基01"
        //484 244    354 184   436 184    314 244    354 294    436  294
        this.baseArr = [];
        this.base = new Base01();
        this.base.x = 484;
        this.base.y = 244;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        this.base = new Base01();
        this.base.x = 354;
        this.base.y = 184;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        this.base = new Base01();
        this.base.x = 436;
        this.base.y = 184;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        this.base = new Base01();
        this.base.x = 314;
        this.base.y = 244;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        this.base = new Base01();
        this.base.x = 354;
        this.base.y = 294;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        this.base = new Base01();
        this.base.x = 436;
        this.base.y = 294;
        this.baseLayer.addChild(this.base);
        this.baseArr.push(this.base);
        for (var i in this.baseArr) {
            var base = this.baseArr[i];
            base.touchEnabled = true;
            base.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        }
    };
    /**地基、塔 被点击*/
    __egretProto__.baseTouch = function (e) {
        //同一目标再次点击直接返回
        var obj = e.currentTarget;
        if (this.oldSelect == obj && this.tool != null) {
            this.removeTool();
            this.oldSelect = null;
            return;
        }
        //移除上一个工具 若存在的话
        this.removeTool();
        this.oldSelect = obj;
        //移除上一个绘制区域 若存在的话
        //根据选择对象建立区域(添加到地图层以上，其他层以下)base除外
        //根据选择对象建立工具
        this.tool = new BuildTool(obj);
        this.tool.x = obj.x;
        this.tool.y = obj.y;
        this.addChild(this.tool);
        //侦听该工具选项被点击
        this.tool.addEventListener(ToolEvent.BUILD_START, this.buildStart, this);
    };
    /**开始建筑(修建 升级 sell)*/
    __egretProto__.buildStart = function (e) {
        //记录坐标
        this.curX = this.oldSelect.x;
        this.curY = this.oldSelect.y;
        //显示建造等待动画 若等于第一级则新建
        var name = e.className;
        if (name == "ArrowTower01" || name == "ShieldTower01" || name == "MagicTower01" || name == "ExploTower01") {
            //修建动画
            var buildWait = new BuildWait(name);
            buildWait.x = this.curX;
            buildWait.y = this.curY;
            this.baseLayer.addChild(buildWait);
            buildWait.addEventListener(ToolEvent.BUILD_COMP, this.buildComp, this);
            //减掉金钱e.price
            //加入建造队列
            var obj = {};
            obj.className = e.className;
            obj.x = this.curX;
            obj.y = this.curY;
            this.buildQuene.push(obj);
        }
        else if (name == "SellTower") {
            //获得金钱
            //加钱特效
            //恢复地基
            this.base = new Base01();
            this.base.x = this.curX;
            this.base.y = this.curY;
            this.baseLayer.addChild(this.base);
            this.baseArr.push(this.base);
            this.base.touchEnabled = true;
            this.base.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        }
        else if (name == "LockTower") {
            //锁定 do nothing
            return;
        }
        else {
        }
        //移除工具 移除上一个塔或者地基 移除侦听 并从数组中删除
        this.removeTool();
        this.baseLayer.removeChild(this.oldSelect);
        this.oldSelect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        var index = this.baseArr.indexOf(this.oldSelect);
        if (index != -1) {
            this.baseArr.splice(index, 1);
        }
        //从对象池中删除oldSelect中的soldiers
        this.oldSelect = null;
    };
    /**修建建筑完成*/
    __egretProto__.buildComp = function (e) {
        //从舞台删除修建动画
        var ta = e.currentTarget;
        ta.removeEventListener(ToolEvent.BUILD_COMP, this.buildComp, this);
        this.baseLayer.removeChild(ta);
        ta = null;
        //反射 className
        var obj = this.buildQuene.shift();
        //反射 建立新塔 加入数组 添加侦听
        var objClass = egret.getDefinitionByName(obj.className);
        var newta = new objClass();
        ////塔基于舞台的坐标 武器层或对象层 赋值敌人数组
        newta.sx = newta.x = obj.x;
        newta.sy = newta.y = obj.y;
        newta.targets = this.enemyArr;
        //根据塔的基类来分配其子对象层
        var parentName = egret.getQualifiedSuperclassName(newta);
        if (parentName == "ArrowTowerBase" || parentName == "ExploTowerBase" || parentName == "MagicTowerBase")
            newta.contentLayer = this.weaponLayer;
        else if (parentName == "ShieldTowerBase")
            newta.contentLayer = this.npcLayer;
        this.baseLayer.addChild(newta);
        this.baseArr.push(newta);
        newta.touchEnabled = true;
        newta.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        newta.init();
        //测试对象(红圈)
        /*
        var sp: egret.Shape = new egret.Shape();
        sp.graphics.lineStyle(1,0xFF0000);
        sp.graphics.drawEllipse(0,0,280,200);
        sp.graphics.endFill();
        sp.x = newta.x-140;
        sp.y = newta.y-100;
        this.addChild(sp);
        */
        //加入本方数组
        //this.oursArr.push(newta);
    };
    /**实时刷新*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        //判断敌人是否死亡或逃脱，更新敌人数组
        this.removeEnemies();
        //实时刷新本方塔
        this.updateOurs(advancedTime);
        //实时刷新敌人
        this.addEnemys(advancedTime);
    };
    /**回收敌方*/
    __egretProto__.removeEnemies = function () {
        for (var i = 0; i < this.enemyArr.length; i++) {
            var tar = this.enemyArr[i];
            if (tar.canClear) {
                this.enemyArr.splice(i, 1);
            }
        }
    };
    /**实时刷新本方塔*/
    __egretProto__.updateOurs = function (advancedTime) {
        var len = this.baseArr.length;
        var obj;
        for (var i = 0; i < len; i++) {
            obj = this.baseArr[i];
            obj.onEnterFrame(advancedTime);
        }
    };
    /**实时刷新敌人*/
    __egretProto__.addEnemys = function (advancedTime) {
        //产生敌人
        this.otime += advancedTime;
        if (this.otime < this.mtime)
            return;
        this.otime = 0;
        var sp = ObjectPool.getInstance().createObject(Monster01);
        sp.x = this.roadArr1[0][0];
        sp.y = this.roadArr1[0][1];
        sp.init(this.roadArr1);
        this.npcLayer.addChild(sp);
        this.enemyArr.push(sp);
        var sp = ObjectPool.getInstance().createObject(Monster01);
        sp.x = this.roadArr2[0][0];
        sp.y = this.roadArr2[0][1];
        sp.init(this.roadArr2);
        this.npcLayer.addChild(sp);
        this.enemyArr.push(sp);
    };
    /**卖掉建筑*/
    __egretProto__.sell = function () {
    };
    /**取消建造工具*/
    __egretProto__.removeTool = function () {
        if (this.tool == null)
            return;
        this.tool.removeEventListener(ToolEvent.BUILD_START, this.buildStart, this);
        this.tool.hide();
        this.tool = null;
    };
    /**销毁关卡场景*/
    __egretProto__.destory = function () {
        //关闭心跳控制器
    };
    return Guanka01;
})(egret.Sprite);
Guanka01.prototype.__class__ = "Guanka01";
