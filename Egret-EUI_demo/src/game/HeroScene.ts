class HeroScene extends eui.Component implements  eui.UIComponent {
	
	public btnReturn:eui.Button;
	public btnConfirm:eui.Button;
	public heroList:eui.List;

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
        // 原始数组
        let dataArr:any[] = [
            {image: 'resource/art/heros_goods/heros01.png', name: '1亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
            {image: 'resource/art/heros_goods/heros02.png', name: '2亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
            {image: 'resource/art/heros_goods/heros03.png', name: '3亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: true},
            {image: 'resource/art/heros_goods/heros04.png', name: '4亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
            {image: 'resource/art/heros_goods/heros05.png', name: '5亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
            {image: 'resource/art/heros_goods/heros06.png', name: '6亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
            {image: 'resource/art/heros_goods/heros07.png', name: '7亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false}
        ]

        // 转成EUI数组
        let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr)
        // 把list_hero数据源设置成EUIArr
        this.heroList.dataProvider = euiArr;
		this.heroList.itemRenderer = HeroList_Item;

		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMain,this);
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickSelect,this);
	}

	private returnMain(){
		SceneManager.instance.toMainScene();
		SceneManager.instance.mainScene.toggleBtn();
	}

	private onClickSelect(e){
		SceneManager.instance.toMainScene();
		SceneManager.instance.mainScene.toggleBtn();

		let dataProvider = this.heroList.dataProvider;
		let arr:string[] = [];

		for(let i = 0;i<dataProvider.length;i++){
			let item = dataProvider.getItemAt(i);
			
			if(item.isSelected){
				arr.push(item.name);
				console.log(item.name+"   "+item.isSelected);
			}
		}
		SceneManager.instance.showInfo(arr);
	}
}