/**
 * 关于随机点的应用函数
 * @author loong
 * @version 1.0
 */
class RandomUtil {
	/**
	 * 获取一定数量在某个范围内的随机数，元素数量为随机数×2(x1,y1,x2,y2,...,xn,yn)
	 */
	public static getRandomPoints(sizeW: number, sizeH: number, border: number, num: number): Array<number> {
		let pointsStr: Array<string> = new Array<string>();
		let points: Array<number> = new Array<number>();
		let rx: number;
		let ry: number;
		let str: string;
		while (num > 0) {
			rx = Math.floor(Math.random() * (sizeW - border * 2) + border);//减去两侧border的随机值
			ry = Math.floor(Math.random() * (sizeW - border * 2) + border);
			str = rx + "_" + ry;
			if (pointsStr.indexOf(str) >= 0){
				continue;//去重
			}
			else{
				pointsStr.push(str);
				num--;
				points.push(rx);
				points.push(ry);
			}
		}
		pointsStr = null;
		return points;
	}
}