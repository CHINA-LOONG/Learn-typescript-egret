/**
 * 用于地图创建的点
 * @author loong
 * @version 1.0
 */
class Point2D extends egret.Point {
	//生成地图点的计数
	private static _tid: number = 0;

	//点ID
	public id: number;
	//三角面
	public tris: Array<Tri2D> = [];

	public constructor(tx: number = 0, ty: number = 0) {
		super(tx, ty);
		this.id = ++Point2D._tid;
	}
}