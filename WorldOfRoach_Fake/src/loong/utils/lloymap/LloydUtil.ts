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
		let index :number = 0;
		let p2d:Point2D;
		while(index<points.length){
			//连续的两个点事一个对象
			p2d = new Point2D(points[index],points[index+1]);
			this._points.push(p2d);
			index+=2;
		}
		this._maxW = maxW;
		this._maxH = maxH;
	}
	
	/**
	 * 构造三角形
	 */
	public delaunay():void{
		this._tris = new Array<Tri2D>();

		//辅助三角形干啥的一定要搞明白
		this._assistPoints = [new Point2D(this._maxW/2,-10000),new Point2D(this._maxW+10000,this._maxH),new Point2D(-10000,this._maxH)];
	}

}