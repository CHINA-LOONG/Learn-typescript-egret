/**
 * 基于三角形和多边形的随机地图生成类
 * @author loong
 * @version 1.0
 */
class LloydUtil {
	/**辅助顶点列表 */
	private _assistPoints: Array<Point2D>;
	/**所有顶点列表 */
	private _points: Array<Point2D>;
	/**生成三角形列表 */
	private _tris: Array<Tri2D>;
	/**构建多边形列表 */
	private _polgons: Array<Pol2D>;
	/**图形宽 */
	private _maxW: number;
	/**图形高 */
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
		//三角形中插入点，并重构三角形
		while (index < this._points.length) {
			p2d = this._points[index];
			this.insertPoint(p2d);
			index++;
		}
	}

	/**像图形中插入一个点*/
	private insertPoint(p: Point2D): void {
		//检查外接圆包含此点的三角形--包含该点的三角面列表
		let tris: Array<Tri2D> = this.findInsideTri(p);
		//排除公共边之后剩余的边
		let edges: Array<Edge2D> = this.delEdgeInCommon(tris);
		//删除包含此点三角形
		while (tris.length > 0) {
			this.delTri(tris.pop());
		}
		//用插入的点和之前的边生成新的三角形
		while (edges.length > 0) {
			let edge: Edge2D = edges.pop();
			let tri: Tri2D = this.addTri([p, edge.startPoint, edge.endPoint]);
		}
	}

	/**查询所在三角形,返回所有外接圆范围内的三角形,这个步骤很耗时,可以从设计上进行优化*/
	private findInsideTri(p: Point2D): Array<Tri2D> {
		let key: any;
		let tri: Tri2D;
		let list: Array<Tri2D> = [];
		for (key in this._tris) {
			tri = this._tris[key];
			if (TriangleUtil.isInCircumcircle(p, tri)) {
				list.push(tri);
			}
		}
		return list;
	}
	/**
	 * 删除这些三角形的公共边,并返回他们剩下的边--获取公共边之外的边
	 * @param tris
	 */
	private delEdgeInCommon(tris: Array<Tri2D>): Array<Edge2D> {
		let key: any;
		//边的id是字符串类型  p1id_p2id
		let lastEdges: Array<string> = [];
		let sameEdges: Array<string> = [];
		let returnEdgs: Array<Edge2D> = [];
		let tri: Tri2D;
		//遍历外接圆包含改点的三角面
		for (key in tris) {
			tri = tris[key];
			let edge: Edge2D;
			//遍历三角面的三条边
			for (key in tri.edges) {
				edge = tri.edges[key];
				if (lastEdges.indexOf(edge.id) < 0) {
					lastEdges.push(edge.id);
					returnEdgs.push(edge);
				}
				else {
					sameEdges.push(edge.id);
				}
			}
		}
		let i: number = returnEdgs.length - 1;
		for (i; i >= 0; i--) {
			if (sameEdges.indexOf((returnEdgs[i] as Edge2D).id) >= 0)
				returnEdgs.splice(i, 1);
		}
		return returnEdgs;
	}
	/**
	 * 项列表中添加一个三角形
	 * @param points
	 * @return
	 */
	private addTri(points: Array<Point2D>): Tri2D {
		let v: Array<Point2D> = new Array<Point2D>(3);
		v[0] = points[0];
		v[1] = points[1];
		v[2] = points[2];
		let tri: Tri2D = new Tri2D(v);
		this._tris.push(tri);
		return tri;
	}
	/**
	 * 从列表中删除一个三角形
	 * @param tri
	 */
	private delTri(tri: Tri2D): void {
		//从三角面列表中删除三角面
		this._tris.splice(this._tris.indexOf(tri), 1);
		//销毁三角面--删除点所在的三角面列表中此三角面
		tri.del();
	}

	/**通过voronoi算法算出多边形*/
	public voronoi(): void {
		this._polgons = new Array<Pol2D>();
		let key: any;
		let p2d: Point2D;
		for (key in this._points) {
			p2d = this._points[key];
			let pol: Pol2D = this.createPolygon(p2d);
			pol.cutself(this._maxW, this._maxH);
			if (pol.vertex.length >= 3) {
				this._polgons.push(pol);
			}
			else {
				LogTrace.log("数据异常：四边形的边的数量异常");
			}
		}
	}
	/**
	 * 泰森多边形也称为Voronoi图
	 * 因为三角形的顶点，就是多边形的中心点
	 * 通过这个顶点可以找到拥有这个顶点的三角形
	 * 按照相邻连接的方法将这些三角形的外接圆圆心点连接起来，就是一个多边形
	 */
	private createPolygon(p2d: Point2D): Pol2D {
		let tris: Array<Tri2D> = p2d.tris;
		let startTri: Tri2D = tris[0];
		let pcList: Array<Tri2D> = [startTri];
		//有一种特殊情况，那就是如果三角形的循环无法有效的回归，则说明这个多边形需要进行补充。
		//在无法衔接的这两个三角形里，非共同边但拥有p2d端点的那个线段，就是需要进行补充的线段。而当前的这个三角形的外接圆心到这条边中线的延长线，就是边界焦点。
		//将焦点连接中心点，形成一个新的三角形。
		//之后在反向查询一次，如果无法连同，则再次执行上两步
		//两边都执行一次之后，这个三角形百分百的与外边框相连接。这个时候判断新生成大的两个三角形的焦点是否在同一条边框上，如果在，用他们两个和中心点构成新的三角形。
		//如果不在，以他们两个点外加边框边缘，形成2个是三角形加入数组。再执行通路检测
		let xlTri: Tri2D = this.findAdjacent(startTri, pcList, tris);
		let lastTri: Tri2D = xlTri;
		let tCount: number = 2;
		while (xlTri != null) {
			pcList.push(xlTri);
			lastTri = xlTri;
			xlTri = this.findAdjacent(xlTri, pcList, tris);
			tCount++;
		}
		if (!(TriangleUtil.isAdjacent(lastTri, startTri)) && tCount >= 3) {
			LogTrace.log("存在无法构造的多边形");
		}
		let points: Array<Point2D> = new Array<Point2D>();
		for (let i: number = 0; i < pcList.length; i++) {
			points.push((pcList[i] as Tri2D).center);
		}
		let polygon: Pol2D = new Pol2D(points);
		polygon.centerPoint = p2d;
		return polygon;
	}

	/**
	 * 寻找一个相邻的三角形
	 * @param fromTri 查询的对象
	 * @param exclude 排除的三角对象--已经检测过省略计算
	 * @param all 查询的范围
	 * @return
	 */
	private findAdjacent(fromTri: Tri2D, exclude: Array<Tri2D>, all: Array<Tri2D>): Tri2D {
		let target: Tri2D = null;
		let key: any;
		let tri: Tri2D;
		for (key in all) {
			tri = all[key];
			if (exclude.indexOf(tri) >= 0) {
				continue;
			}
			if (TriangleUtil.isAdjacent(fromTri, tri)) {
				target = tri;
				break;
			}
		}
		return target;
	}
}