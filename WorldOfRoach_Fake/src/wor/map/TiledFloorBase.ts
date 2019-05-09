/**
 * 基于位图的地砖
 * @author loong
 * @version 1.0
 */
class TiledFloorBase extends egret.Bitmap implements IFloor {

	/**地砖格子的宽度 */
	public static GW: number;
	/**地砖格子的高度 */
	public static GH: number;
	/**地砖格子的一半宽度 */
	public static GW_HALF: number;
	/**地砖格子的一半高度 */
	public static GH_HALF: number;
	/**缓存的所有类型的地板位图数据 */
	private static _floorDic: Map<number, egret.Texture> = new Map<number, egret.Texture>();

	/**地板类型 */
	public fType: number;
	/**地板格子坐标X */
	public posx: number;
	/**地板格子坐标Y */
	public posy: number;

	public constructor() {
		super();
	}

	/**根据格子索引坐标设置地板的实际坐标 ？？？*/
	public setPosition(px: number, py: number): void {
		//设置格子索引坐标
		this.posx = px;
		this.posy = py;
		//设置格子的实际像素坐标,左上角的坐标
		if (py % 2 == 0) {
			this.x = px * TiledFloorBase.GW - TiledFloorBase.GW / 2;
			this.y = py / 2 * TiledFloorBase.GH - TiledFloorBase.GH / 2;
		}
		else {
			this.x = px * TiledFloorBase.GW;
			this.y = (py - 1) / 2 * TiledFloorBase.GH;
		}
	}

	/**创建当前地板 */
	public createFloor(p: egret.DisplayObjectContainer, px: number, py: number): void {
		this.setPosition(px,py);
		//使用地板中心点坐标来检测地板的类型
		this.fType = Tiled_Ground.instance.getFloorType(this.x+TiledFloorBase.GW_HALF,this.y+TiledFloorBase.GH_HALF);
		
		this.texture = TiledFloorBase.getBitmapData(this.fType);
		p.addChild(this);
		// this.x=100;
		// this.y=100;
		// this.stage.addChild(this);
	}
	/**移除当前地板 */
	public removeFloor(): IFloor {
		return this;
	}
	/**获取当前地板的类型 */
	public getType(): number {
		return this.fType;
	}
	/**当前焦点对象站上时调用 */
	public standOn(): void {

	}


	/**重新构建地板 */
	public reCreate(ct:number):void{
		this.fType = ct;
		this.texture = TiledFloorBase.getBitmapData(this.fType);
	}


	private static getBitmapData(cType:number):egret.Texture{
		if(cType<0)
			return null;
		//检测此类型地板是否已经创建过
		if(this._floorDic.get(cType)==null){
			//绘制菱形的地板
			let tx:egret.RenderTexture = new egret.RenderTexture();
			let shape: egret.Shape = new egret.Shape();
			shape.graphics.beginFill(cType);
			shape.graphics.lineStyle(1,cType,1);
			shape.graphics.moveTo(GameConfig.GRID_W / 2, 0);
			shape.graphics.lineTo(GameConfig.GRID_W, GameConfig.GRID_H / 2);
			shape.graphics.lineTo(GameConfig.GRID_W / 2, GameConfig.GRID_W / 2);
			shape.graphics.lineTo(0, GameConfig.GRID_H / 2);
			shape.graphics.lineTo(GameConfig.GRID_W / 2, 0);
			shape.graphics.endFill();
			tx.drawToTexture(shape);

			this._floorDic.set(cType,tx);
		}
		return this._floorDic.get(cType);
	}

}