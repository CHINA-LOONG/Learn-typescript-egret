/**
 *
 * 加载进度条
 * @author
 *
 */
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar() {
        _super.call(this);
        this.init();
    }
    var __egretProto__ = LoadBar.prototype;
    /*
     * 初始化
     */
    __egretProto__.init = function () {
        this.leftP = new egret.DisplayObjectContainer();
        this.rightP = new egret.DisplayObjectContainer();
        //this.leftP.anchorX = 1;
        this.addChild(this.leftP);
        this.addChild(this.rightP);
        this.bm = Utils.createBitmapByName("loadbg");
        this.leftP.addChild(this.bm);
        this.bm = Utils.createBitmapByName("loadl");
        this.leftP.addChild(this.bm);
        this.bm = Utils.createBitmapByName("loadbg");
        this.bm.anchorX = 1;
        this.bm.scaleX = -1;
        this.rightP.addChild(this.bm);
        this.bm = Utils.createBitmapByName("loadr");
        this.rightP.addChild(this.bm);
        this.leftP.x = -400;
        this.rightP.x = 800;
        //左边进度条
        this.prol = new egret.Sprite();
        this.prol.x = 400 - 99;
        this.prol.y = 340;
        this.leftP.addChild(this.prol);
        //
        this.bm = Utils.createBitmapByName("probarbg");
        this.prol.addChild(this.bm);
        //182 18
        this.barl = Utils.createBitmapByName("probartop");
        this.barl.x = 9;
        this.barl.y = 9;
        this.barl.width = 1;
        this.prol.addChild(this.barl);
        //mask
        var rect = new egret.Rectangle(0, 0, 99, 36);
        this.prol.mask = rect;
        //右边进度条
        this.pror = new egret.Sprite();
        this.pror.x = -99;
        this.pror.y = 340;
        this.rightP.addChild(this.pror);
        //
        this.bm = Utils.createBitmapByName("probarbg");
        this.pror.addChild(this.bm);
        //182 18
        this.barr = Utils.createBitmapByName("probartop");
        this.barr.x = 9;
        this.barr.y = 9;
        this.barr.width = 1;
        this.pror.addChild(this.barr);
        //mask
        var rect = new egret.Rectangle(99, 0, 99, 36);
        this.pror.mask = rect;
        this.showLoadBar();
    };
    /*
     * 设置加载进度
     */
    __egretProto__.setProgress = function (current, total) {
        this.barl.width = current / total * 182;
        this.barr.width = current / total * 182;
    };
    /*
     * 开始加载 合拢动画完毕
     */
    __egretProto__.showLoadBar = function () {
        TweenMax.to(this.leftP, 0.3, { x: 0, ease: Cubic.easeOut });
        TweenMax.to(this.rightP, 0.3, { x: 400, ease: Cubic.easeOut, onComplete: function () {
            Main.instance.dispatchEvent(new MainEvent(MainEvent.REMOVE));
        } });
        //合拢音效
        SoundManager.playEffect("loaderClose");
    };
    /*
     * 加载完毕 展开动画完毕
     */
    __egretProto__.hideLoadBar = function () {
        var that = this;
        TweenMax.to(this.leftP, 0.3, { delay: 0.6, x: -400, ease: Cubic.easeOut });
        TweenMax.to(this.rightP, 0.3, { delay: 0.6, x: 800, ease: Cubic.easeOut, onComplete: function () {
            if (that.parent != null) {
                that.parent.removeChild(that);
            }
            //展开音效
            SoundManager.playEffect("loaderOpen");
        } });
    };
    return LoadBar;
})(egret.DisplayObjectContainer);
LoadBar.prototype.__class__ = "LoadBar";
