/**植被基础类 */
class Plant extends egret.DisplayObjectContainer implements ILink, IRole {

	private static _optRound: number = 20;
	/**植被的数据信息 */
	private _data: Object;
	/**链表前一个角色 */
	private _preLink: ILink;
	/**链表后一个角色 */
	private _nextLink: ILink;
	private _ak: string;
	private _rectX: number;
	private _rectY: number;
	private _rectW: number;
	private _rectH: number;
	/**碰撞检测框x */
	private _gx: number;//碰撞检测框x
	/**碰撞检测框y */
	private _gy: number;//碰撞检测框y

	public constructor() {
		super();
	}
	
	public setData(data: Object):void{
		this._data =data;
	}


	public getPre(): ILink {
		return this._preLink;
	}
	public setPre(target: ILink): void {
		this._preLink = target;
	}
	public getNext(): ILink {
		return this._nextLink;
	}
	public setNext(target: ILink): void {
		this._nextLink = target;
	}


	public setAreaKey(ak: string): void {
		this._ak = ak;

	}
	public getAreaKey(): string {
		return this._ak;

	}
	public removed(): void {

	}
	public added(): void {
		this._gx = this.x + this._rectX;
		this._gy = this.y + this._rectY;
	}
	/**
	 * 检测是否属于操作范围内
	 * @returns 在操作范围内返回正数,否则返回负数.正数越小距离越近
	 */
	public tryOption(px: number, py: number): number {
		if ((px >= this._gx - Plant._optRound && px <= this._gx + this._rectW + Plant._optRound) && (py >= this._gy - Plant._optRound && py <= this._gy + this._rectH + Plant._optRound))
			return Math.abs(Math.min(px - (this._gx - Plant._optRound), this._gx + this._rectW + Plant._optRound - px));
		return -1;
	}
	/**
	 * 碰撞检测
	 */
	public hitTestArea(px: number, py: number): boolean {
		return (px >= this._gx && px <= this._gx + this._rectW) && (py >= this._gy && py <= this._gy + this._rectH);
	}
	/**
	 * 获取操作类型
	 */
	public getOptType(): string {
		return RoleType.POLE_PLANT;
	}
}