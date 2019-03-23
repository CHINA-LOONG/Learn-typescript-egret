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
        //背景地图
        this.bm = Utils.createBitmapByName("map0");
        this.addChild(this.bm);
        this.bm.touchEnabled = true;
        this.bm.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bgckH, this);
        //添加地基
        this.baseLayer = new egret.Sprite();
        this.addChild(this.baseLayer);
        this.createBase();
        //测试对象
        this.bm = Utils.createBitmapByName("building");
        this.bm.x = 100;
        this.bm.y = 100;
        this.addChild(this.bm);
        this.bm.touchEnabled = true;
        this.bm.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ceshiH, this);
        //舞台侦听
    }
    var __egretProto__ = Guanka01.prototype;
    __egretProto__.ceshiH = function (e) {
        this.removeTool();
    };
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
        //移除上一个工具 若存在的话
        this.removeTool();
        //同一目标再次点击直接返回
        var obj = e.currentTarget;
        if (this.oldSelect == obj) {
            this.oldSelect = null;
            return;
        }
        this.oldSelect = obj;
        //根据选择对象建立工具
        this.tool = new BuildTool(obj);
        this.tool.x = obj.x;
        this.tool.y = obj.y;
        this.addChild(this.tool);
        //侦听该工具选项被点击
        this.tool.addEventListener(ToolEvent.CHANGE_BUILD, this.changeBuild, this);
    };
    /**改变建筑(修建 升级 sell)*/
    __egretProto__.changeBuild = function (e) {
        //console.log(e.className + "    " + e.price);
        //记录坐标
        this.curX = this.oldSelect.x;
        this.curY = this.oldSelect.y;
        //移除工具 移除上一个塔或者地基 移除侦听 并从数组中删除
        this.removeTool();
        this.baseLayer.removeChild(this.oldSelect);
        this.oldSelect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        var index = this.baseArr.indexOf(this.oldSelect);
        if (index != -1) {
            this.baseArr.splice(index, 1);
        }
        this.oldSelect = null;
        //if className == ArrowTower01 ShieldTower01 若等于第一级则新建
        //显示建造等待动画
        var name = e.className;
        if (name == "ArrowTower01" || name == "ShieldTower01" || name == "MagicTower01" || name == "ExploTower01") {
            //修建动画
            var buildWait = new BuildWait(name);
            buildWait.x = this.curX;
            buildWait.y = this.curY;
            this.baseLayer.addChild(buildWait);
            buildWait.addEventListener(ToolEvent.BUILD_COMP, this.buildComp, this);
            //减掉金钱
            //加入建造队列
            var obj = {};
            obj.className = e.className;
            obj.x = this.curX;
            obj.y = this.curY;
            this.buildQuene.push(obj);
        }
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
        newta.x = obj.x;
        newta.y = obj.y;
        this.baseLayer.addChild(newta);
        this.baseArr.push(newta);
        newta.touchEnabled = true;
        newta.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.baseTouch, this);
        //ta.init();
    };
    /**卖掉建筑*/
    __egretProto__.sell = function () {
    };
    /**取消建造工具*/
    __egretProto__.removeTool = function () {
        if (this.tool != null) {
            this.tool.hide();
        }
    };
    __egretProto__.destory = function () {
    };
    return Guanka01;
})(egret.Sprite);
Guanka01.prototype.__class__ = "Guanka01";
