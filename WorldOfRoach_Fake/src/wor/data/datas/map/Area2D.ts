/**
 * 地图多边形
 */
class Area2D {

	//id编号
	public id: number = 0;
	//多边形的中心点，对应三角形的一个角点（而这个点关联着很多个三角形,而非相同的角就是一个多边形）
	public centerPoint: egret.Point;
	/** 是否属于辅助 -- 是否在边界*/
	public isOutside: boolean = false;
	/** 地形类型*/
	public type: number;
	/** 是否是水*/
	public isWater: boolean = false;
	//相邻的多边形
	public neighbor: Array<Area2D> = new Array<Area2D>();
	//顶点
	public vertex: Array<AreaPoint> = new Array<AreaPoint>();
	//湿度
	public humidity: number = 1;

	/**获取区域海拔 */
	public getElevation():number{
		return this.vertex[0].elevation;
	}

}