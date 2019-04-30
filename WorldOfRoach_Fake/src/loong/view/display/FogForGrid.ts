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
		//迷雾图片容器
		this._con = new egret.DisplayObjectContainer();
		this._con.addChild(this._bgSh);
		//遮罩剔除层级容器
		this._fogLayer = new egret.DisplayObjectContainer();
		this._con.addChild(this._fogLayer);
		//遮罩剔除层级图片
		this._fogLayerShape = new egret.Shape();
		this._fogLayer.addChild(this._fogLayerShape);
		this._fogLayer.blendMode = egret.BlendMode.ERASE;//记录删除背景色的图

	}

	/**加载迷雾 */
	public rebuild(w: number, h: number): void {
		this.initBase(w, h);
		//加载之前的迷雾图并添加到fogLayer中
		let base64Str: string = localStorage.getItem(Server_Map.T_MAP_MINI);
		//反序列化成位图数据
		let btd: egret.BitmapData = egret.BitmapData.create("base64", base64Str);
		let bmt: egret.Bitmap = new egret.Bitmap();
		bmt.$bitmapData = btd;
		this._fogLayer.addChild(bmt);
		this.reDraw();
	}

	/**创建迷雾 */
	public init(w: number, h: number): void {
		this.initBase(w, h);
		//保存迷雾图
		this.saveMiniMap();
	}

	public updateFogs(): void {
		//计算当前绘制的坐标
		this._fogLayerShape.graphics.beginFill(0x000000, 1);
		//计算绘制圆圈的位置和半径
		this._fogLayerShape.graphics.drawCircle(this._w * PlayerRole.self.x / GameConfig.WORD_W, this._h * PlayerRole.self.y / GameConfig.WORD_H, this._fw);
		this._fogLayerShape.graphics.endFill();
		if (this.autoDraw)
			this.reDraw();
	}

	/**重新绘制绘制的迷雾地图 */
	public reDraw(): void {
		let renderTexture: egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(this._con);
		if (this._bitmap.texture) {
			this._bitmap.texture.dispose();
		}
		this._bitmap.texture = renderTexture;
	}

	/**保存迷雾数据图 */
	public saveMiniMap(): void {
		this._fogLayer.blendMode = egret.BlendMode.NORMAL;
		let renderTexture: egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(this._fogLayer);
		let base64Str: string = renderTexture.toDataURL("image/png");	//存储迷雾的数据
		if (base64Str.indexOf(",") >= 0)
			base64Str = base64Str.split(",")[1];
		localStorage.setItem(Server_Map.T_MAP_MINI, base64Str);	//本地存储迷雾数据
		renderTexture.dispose();	//清理掉地缓存的临时变量
		this._fogLayer.blendMode = egret.BlendMode.ERASE;
	}

}