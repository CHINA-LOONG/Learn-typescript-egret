class MainScene extends eui.Component implements eui.UIComponent {

	public Group_mbtn: eui.Group;
	public mbtnPlayer: eui.ToggleButton;
	public mbtnHero: eui.ToggleButton;
	public mbtnGoods: eui.ToggleButton;
	public mbtnAbout: eui.ToggleButton;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.Group_mbtn.touchEnabled = true;
		this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
			if(<eui.Group>e.target === this.Group_mbtn){
				console.log("點擊空白的位置");
				return;
			}
			let theBtn = <eui.ToggleButton>e.target
			// 在点击触发这个事件的时候,点击的那个btn已经变成了选中状态
			// 判断theBtn是否存在theBtn.selected属性且为true
			if (theBtn.selected && theBtn.selected != undefined) {
				this.toggleBtn(theBtn)
			} else {
				// 当selected为false的时候,说明按钮在点击之前就是选中状态
				// 点击后变成了false,所以这里改回选中状态
				theBtn.selected = true
			}
		}, this)
	}
	/**
 * 切换按钮
 */
	public toggleBtn(btn?: eui.ToggleButton) {
		// 先把所有的按钮都设置为不选中
		for (let i = 0; i < this.Group_mbtn.numChildren; i++) {
			let theBtn = <eui.ToggleButton>this.Group_mbtn.getChildAt(i)
			theBtn.selected = false
		}
		if(!btn){
			return ;
		}
		// 把传进来的btn设置为选中状态
		btn.selected = true

		let index = this.Group_mbtn.getChildIndex(<eui.ToggleButton>btn);
		switch(index){
			case 0:
			SceneManager.instance.toPlayerScene();
			this.setChildIndex(this.Group_mbtn,this.numChildren);	//这是提到开启界面的上层
			break;
			case 1:
			SceneManager.instance.toHeroScene();
			this.setChildIndex(this.Group_mbtn,this.numChildren);
			break;
			case 2:
			// SceneManager.instance.toPlayerScene();
			this.setChildIndex(this.Group_mbtn,this.numChildren);
			break;
			case 3:
			// SceneManager.instance.toPlayerScene();
			this.setChildIndex(this.Group_mbtn,this.numChildren);
			break;
			default:
			break;
		}
	}
}