class BaseBitmap extends egret.Bitmap implements IPool {
	public constructor() {
		super();
	}

	public clear() {
		
	}

	public reset() {
		this.texture = null;
		this.width = 0;
		this.height = 0;
		this.alpha = 1;
		this.rotation = 0;
		this.anchorOffsetX = 0;
		this.anchorOffsetY = 0;
		this.scaleX = 1;
		this.scaleY = 1;
	}

	public destroy() {

	}
}
window['BaseBitmap'] = BaseBitmap;