/**
 *
 * 资源加载类
 * @author
 *
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        _super.call(this);
    }
    var __egretProto__ = Loader.prototype;
    /*
     * 获取对象实例
     */
    Loader.getInstance = function () {
        if (Loader.instance == null) {
            var loader = new Loader();
            Loader.instance = loader;
        }
        return Loader.instance;
    };
    /*
     * 加载配置文件
     */
    __egretProto__.init = function () {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
    * 资源组加载出错
    */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
    * preload资源组加载进度
    */
    __egretProto__.onResourceProgress = function (event) {
        this.loadevent = new LoadEvent(LoadEvent.GROUP_PROGRESS);
        this.loadevent.groupName = event.groupName;
        this.loadevent.itemsLoaded = event.itemsLoaded;
        this.loadevent.itemsTotal = event.itemsTotal;
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    };
    /**
    * preload资源组加载完成
    */
    __egretProto__.onResourceLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //派发完成事件
        //Main.instance.dispatchEvent(new LoadEvent(LoadEvent.LOADCOMP,event.groupName));
        //this.dispatchEvent(new LoadEvent(LoadEvent.GROUP_COMPLETE,event.groupName));
        this.loadevent = new LoadEvent(LoadEvent.GROUP_COMPLETE);
        this.loadevent.groupName = event.groupName;
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    };
    /**
    * 加载preload资源组。
    */
    __egretProto__.load = function (group) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(group);
    };
    return Loader;
})(egret.EventDispatcher);
Loader.prototype.__class__ = "Loader";
