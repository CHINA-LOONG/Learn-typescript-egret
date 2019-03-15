class PlayerScene extends eui.Component implements  eui.UIComponent {
	
	public btnReturn:eui.Button;
	public btnEquip:eui.Button;
	public btnStreng:eui.Button;
	public equipScroller:eui.Scroller;
	public equipList:eui.List;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		     // 数组数据
        let dataArr:any[] = [
            {image:"resource/art/profile/skillIcon01.png",name:"旋龙幻杀"},
            {image:"resource/art/profile/skillIcon02.png",name:"魔魂天咒"},
            {image:"resource/art/profile/skillIcon03.png",name:"天魔舞"},
            {image:"resource/art/profile/skillIcon04.png",name:"痴情咒"},
            {image:"resource/art/profile/skillIcon05.png",name:"无间寂"},
            {image:"resource/art/profile/skillIcon06.png",name:"霸天戮杀"},
            {image:"resource/art/profile/skillIcon07.png",name:"灭魂狂飙"}
        ]

		let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr);
		this.equipList.dataProvider = euiArr;
		
		this.equipScroller.horizontalScrollBar.autoVisibility = false;

		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMain,this);

	}

	private returnMain(){
		SceneManager.instance.toMainScene();
		SceneManager.instance.mainScene.toggleBtn();
	}
	
}