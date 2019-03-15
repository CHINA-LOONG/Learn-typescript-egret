class BaseTextField extends egret.TextField implements IPool {
	public constructor() {
		super();
	}

	public clear() {
		
	}

	public reset() {
		this.text = "";
		this.width = null;
		this.height = null;
		this.anchorOffsetX = 0;
		this.anchorOffsetY = 0;
	}

	public destroy() {

	}
}
window['BaseTextField'] = BaseTextField;