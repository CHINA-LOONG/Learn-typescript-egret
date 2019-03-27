/**
 * 基于三角形和多边形的随机地图生成类
 * @author loong
 * @version 1.0
 */
class LloydUtil {

	private _assistPoints: Array<Point2D>;
	private _points: Array<Point2D>;
	private _tris: Array<Tri2D>;
	private _polgons: Array<Pol2D>;
	private _maxW: number;
	private _maxH: number;

	public constructor(points: Array<number>, maxW: number, maxH: number) {
		this._points = new Array<Point2D>();
		let index: number = 0;
		let p2d: Point2D;
		while (index < points.length) {
			//连续的两个点事一个对象
			p2d = new Point2D(points[index], points[index + 1]);
			this._points.push(p2d);
			index += 2;
		}
		this._maxW = maxW;
		this._maxH = maxH;
	}

	/**
	 * 构造三角形
	 */
	public delaunay(): void {
		this._tris = new Array<Tri2D>();

		//辅助三角形干啥的一定要搞明白  难道只是想要一个覆盖地图的三角形
		this._assistPoints = [new Point2D(this._maxW / 2, -10000), new Point2D(this._maxW + 10000, this._maxH), new Point2D(-10000, this._maxH)];
		this.addTri([this._assistPoints[0], this._assistPoints[1], this._assistPoints[2]]);
		let index: number = 0;
		let p2d: Point2D;

		while (index < this._points.length) {
			p2d = this._points[index];
			this.insertPoint(p2d);
			index++;
		}
	}

	/**像图形中插入一个点*/
	private insertPoint(p: Point2D): void {
		let tri:Array<Tri2D> = this.findInsideTri(p);
	}

	/**查询所在三角形,返回所有外接圆范围内的三角形,这个步骤很耗时,可以从设计上进行优化*/
	private findInsideTri(p:Point2D):Array<Tri2D>{
		let key:any;
		let tri:Tri2D;
		let list:Array<Tri2D> = [];
		for(key in this._tris){
			tri = this._tris[key];
			if()
		}

		return null;
	}

	private addTri(points: Array<Point2D>): Tri2D {
		let v: Array<Point2D> = new Array<Point2D>();
		v[0] = points[0];
		v[1] = points[1];
		v[2] = points[3];
		let tri: Tri2D = new Tri2D(v);
		this._tris.push(tri);
		return tri;
	}

}