class KnifePlayer extends egret.DisplayObjectContainer implements IPool {
	public constructor() {
		super();
	}

	private bg: BaseBitmap;
	public id: number;

	public init(id: number, b: boolean = true) {
		this.id = id;
		if (this.bg == null) {
			this.bg = ObjectPool.getObject("BaseBitmap") as BaseBitmap;
		}
		this.bg.texture = RES.getRes("dao_1");
		this.bg.scaleX = this.bg.scaleY = DesignConst.knifescale;
		this.bg.rotation = Math.random() * 360;
		this.bg.anchorOffsetX = this.bg.width / 2;
		this.bg.anchorOffsetY = this.bg.height / 2;
		this.addChild(this.bg);

		if (b) {
			this.state = KNIFESTATE.NORMAL;
			this.birth();
		}
		else{
			this.state = KNIFESTATE.FLYING;
		}
	}

	private _state:number;
	public get state():number{
		return this._state;
	}
	public set state(v:number){
		this._state = v;
	}

	public birth() {
		this.x = Math.random() * DesignConst.mapwidth;
		this.y = Math.random() * DesignConst.mapheight;
	}

	public clear() {
		this._state = KNIFESTATE.NORMAL;
	}

	public reset() {
		this._state = KNIFESTATE.NORMAL;
	}

	public destroy() {

	}
}

window['KnifePlayer'] = KnifePlayer;