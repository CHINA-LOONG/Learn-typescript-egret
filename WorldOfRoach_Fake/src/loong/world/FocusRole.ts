/**
 * 焦点目标,一旦被设置为场景焦点后可以控制场景摄像机位置
 * @author loog
 * @version 1.0
 */
class FocusRole extends egret.DisplayObjectContainer implements IFocus, IRender,ILink,IRole {

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

	/**增加到世界 */
	public addToWorld():void{
		RenderMgr.instance.registRender(this);
	}

	/**IFocus 设置当前焦点 */
	public setFocus(flag:boolean):FocusRole{
		this.__isFocus = flag;
		return this;
	}

	/**IRender 帧循环刷新 */
	public renderUpdate(interval: number): void {

	}

	/**ILink */
	public getPre():ILink{
		return this._preLink;
	}
	public setPre(target:ILink):void{
		this._preLink = target;
	}
	public getNext():ILink{
		return this._nextLink;
	}
	public setNext(target:ILink):void{
		this._nextLink = target;
	}


	/**IRole */
	public setAreaKey(ak:string):void{
		this._ak = ak;
	}
	public getAreaKey():string{
		return this._ak;
	}
	public removed():void{

	}
	public added():void{

	}
	/**
	 * 检测是否属于操作范围内
	 * @returns 在操作范围内返回正数,否则返回负数.正数越小距离越近
	 */
	public tryOption(px:number,py:number):number{
		return 0;
	}
	/**
	 * 碰撞检测
	 */
	public hitTestArea(px:number,py:number):boolean{
		return false;
	}
	/**
	 * 获取操作类型
	 */
	public getOptType():string{
		return this.type;
	}
}