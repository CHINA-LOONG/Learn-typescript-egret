/**
 * 游戏可记录的迷雾
 */
class FogForGrid extends egret.DisplayObjectContainer {

	private static _ins: FogForGrid;
	public static get instance(): FogForGrid {
		if (FogForGrid._ins == null)
			FogForGrid._ins = new FogForGrid();
		return FogForGrid._ins;
	}

	private _bitmap: egret.Bitmap;
	private _bgSh: egret.Shape;
	private _fogLayer: egret.DisplayObjectContainer;
	private _con: egret.DisplayObjectContainer;
	private _fogLayerShape: egret.Shape;
	private _fw: number;
	private _fh: number;
	private _w: number;
	private _h: number;
	public autoDraw: boolean = false;



	private initBase(w: number, h: number): void {
		this._w = w;
		this._h = h;
		this._fw = 50;
		this._bitmap = new egret.Bitmap();
		this.addChild(this._bitmap);
		//  创建黑色遮罩覆盖战场
		this._bgSh = new egret.Shape();
		this._bgSh.graphics.beginFill(0x000000, 1.0);
		this._bgSh.graphics.drawRect(0, 0, w, h);     //  创建黑色遮罩覆盖战场
		this._bgSh.graphics.endFill();
		this._con = new egret.DisplayObjectContainer();
		this._con.addChild(this._bgSh);
		this._fogLayer = new egret.DisplayObjectContainer();
		this._con.addChild(this._fogLayer);
		this._fogLayerShape = new egret.Shape();
		this._fogLayer.addChild(this._fogLayerShape);
		this._fogLayer.blendMode = egret.BlendMode.ERASE;

	}

	/**创建迷雾 */
	public init(w: number, h: number): void {
		this.initBase(w, h);
		//保存迷雾图
		this.saveMiniMap();
	}


	public saveMiniMap(): void {
		this._fogLayer.blendMode = egret.BlendMode.NORMAL;
		let renderTexture: egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(this._fogLayer);
		let base64Str: string = renderTexture.toDataURL("image/png");
		if (base64Str.indexOf(",") >= 0)
			base64Str = base64Str.split(",")[1];
		localStorage.setItem(Server_Map.T_MAP_MINI, base64Str);
		renderTexture.dispose();
		this._fogLayer.blendMode = egret.BlendMode.ERASE;
	}

}