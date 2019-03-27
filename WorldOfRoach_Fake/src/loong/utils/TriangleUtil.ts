/**
 * 三角函数
 * @author nodep
 * @version 1.0
 */
class TriangleUtil {

	/**
	 * 检查一个点是否在一个三角形的外接圆内。
	 * @param point
	 * @param tri
	 * @return
	 */
	public static isInCircumcircle(point: egret.Point, tri: Tri2D): boolean {
		let xd: number = (point.x - tri.center.x);
		let yd: number = (point.y - tri.center.y);
		//检测距离是否小于外接圆半径
		return Math.sqrt(xd * xd + yd * yd) <= tri.circumR;
	}

	
}