var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
class TestDemoSkin extends eui.Component {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "xx.TestDemoSkin";
    }
    createChildren() {
        super.createChildren();
    }
    onComplete() {
    }
}
__reflect(TestDemoSkin.prototype, "TestDemoSkin");
//# sourceMappingURL=TestSkinDemo.js.map