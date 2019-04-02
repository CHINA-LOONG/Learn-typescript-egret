/**
 * 焦点目标,一旦被设置为场景焦点后可以控制场景摄像机位置
 * @author loog
 * @version 1.0
 */
class FocusRole extends egret.DisplayObjectContainer implements IRender {

	private static _addId: number = 0;

	/**当前是否被跟踪 */
	public __isFocus: boolean = false;
	public id: number = 0;
	public type: string;
	public speedX: number;
	public speedY: number;
	private _preLink: any;
	private _nextLink: any;
	private _ak: string;

	public constructor() {
		super();
		FocusRole._addId++;
		this.id = FocusRole._addId;
	}

	/**IRender 帧循环刷新 */
	public renderUpdate(interval: number): void {

	}

	/**增加到世界 */
	public addToWorld():void{
		RenderMgr.instance.registRender(this);
	}

	/**设置当前焦点 */
	public setFocus(flag:boolean):FocusRole{
		this.__isFocus = flag;
		return this;
	}

}