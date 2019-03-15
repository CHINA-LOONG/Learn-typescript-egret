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
var HeroScene = (function (_super) {
    __extends(HeroScene, _super);
    function HeroScene() {
        return _super.call(this) || this;
    }
    HeroScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HeroScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 原始数组
        var dataArr = [
            { image: 'resource/art/heros_goods/heros01.png', name: '1亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false },
            { image: 'resource/art/heros_goods/heros02.png', name: '2亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false },
            { image: 'resource/art/heros_goods/heros03.png', name: '3亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: true },
            { image: 'resource/art/heros_goods/heros04.png', name: '4亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false },
            { image: 'resource/art/heros_goods/heros05.png', name: '5亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false },
            { image: 'resource/art/heros_goods/heros06.png', name: '6亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false },
            { image: 'resource/art/heros_goods/heros07.png', name: '7亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false }
        ];
        // 转成EUI数组
        var euiArr = new eui.ArrayCollection(dataArr);
        // 把list_hero数据源设置成EUIArr
        this.heroList.dataProvider = euiArr;
        this.heroList.itemRenderer = HeroList_Item;
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnMain, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSelect, this);
    };
    HeroScene.prototype.returnMain = function () {
        SceneManager.instance.toMainScene();
        SceneManager.instance.mainScene.toggleBtn();
    };
    HeroScene.prototype.onClickSelect = function (e) {
        SceneManager.instance.toMainScene();
        SceneManager.instance.mainScene.toggleBtn();
        var dataProvider = this.heroList.dataProvider;
        var arr = [];
        for (var i = 0; i < dataProvider.length; i++) {
            var item = dataProvider.getItemAt(i);
            if (item.isSelected) {
                arr.push(item.name);
                console.log(item.name + "   " + item.isSelected);
            }
        }
        SceneManager.instance.showInfo(arr);
    };
    return HeroScene;
}(eui.Component));
__reflect(HeroScene.prototype, "HeroScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HeroScene.js.map