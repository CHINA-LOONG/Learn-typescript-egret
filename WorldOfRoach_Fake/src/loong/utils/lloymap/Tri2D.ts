/**
 * 业务用三角形
 * @author loong
 * @version 1.0
 */
class Tri2D {

	/**是否已初始化三角函数 */
	public inited: boolean = false;
	/**顶点列表 */
	public vertex:Array<Point2D>;
	/**外接圆心 */
	public center: Point2D;
	/**外接圆半径 */
	public circumR:number = 0;
	/**三边列表 */
	public edges: Array<Edge2D> = new Array<Edge2D>(3);


	public constructor(points: Array<Point2D>, autoBuild: boolean = true) {
		this.vertex = points;
		this.vertex[0].tris.push(this);
		this.vertex[1].tris.push(this);
		this.vertex[2].tris.push(this);
		this.inited = autoBuild;
		this.edges[0] = new Edge2D(points[0],points[1]);
		this.edges[0] = new Edge2D(points[0],points[1]);
		this.edges[0] = new Edge2D(points[0],points[1]);
		if(!this.inited){
			this.flush();
		}
	}

	/**刷新三角形的重要属性 */
	public flush():void{
		this.inited = true;
		this.center = TriangleUtil
	}

	/**三角形被销毁*/
	public del(): void {
		//从每个顶点的三角形列表中删除自身
		this.vertex[0].tris.splice(this.vertex[0].tris.indexOf(this), 1);
		this.vertex[1].tris.splice(this.vertex[1].tris.indexOf(this), 1);
		this.vertex[2].tris.splice(this.vertex[2].tris.indexOf(this), 1);
	}
}