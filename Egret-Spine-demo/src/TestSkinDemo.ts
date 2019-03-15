class TestDemoSkin extends eui.Component {

    public testDemoBtn:eui.Button;
    constructor(){
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete,this);
        this.skinName = "xx.TestDemoSkin";
    }
    protected createChildren(){
        super.createChildren();
    }
    private onComplete():void{

    }
}