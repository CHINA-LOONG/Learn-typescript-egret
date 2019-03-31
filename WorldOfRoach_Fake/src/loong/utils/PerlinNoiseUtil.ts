/**
 * 柏林噪声图2维测试
 * @author loong
 * @version 1.0
 */
class PerlinNoiseUtil {
	/**地图随机种子 */
	public static seed: number = 0;

	/**
	 * 产生一个噪声图的二维数据
	 * @param w 噪声图的宽度
	 * @param h 噪声图的高度
	 */
	public static noise2D(w: number, h: number): any {
		let btd: any = [];
		PerlinNoiseUtil.seed = Math.floor(Math.random() * 1376312589);
		//网格大小
		let bs: number = 10;
		/**W方向网格数量 --列*/
		let gridW: number = Math.floor(w / bs);
		/**H方向网格数量 --行*/
		let gridH: number = Math.floor(h / bs);

		/**计算时使用的一个种子 */
		let startX: number = Math.floor(Math.random() * 5);
		let startY: number = Math.floor(Math.random() * 5);

		/**遍历每一列像素 */
		for (let i: number = 0; i < w; i++) {
			btd[i] = new Array<number>();
			/**遍历每一行像素 */
			for (let j: number = 0; j < h; j++) {
				let f: number = PerlinNoiseUtil.insertNum_2D(i / gridW + startX, j / gridH + startY);
				let color: number = Math.floor(0X0000FF * f);
				btd[i][j] = color;
			}
		}
		return btd;
	}

	/**
	 * 获取平滑的2D噪声点
	 * 通过边角的占比不同来计算此点的随机值
	 * @param x
	 * @param y
	 * @return
	 */
	private static getSmoothNoise2D(x: number, y: number): number {
		let cut: number = 1;
		let corners: number = (PerlinNoiseUtil.getNoise2D(x - cut, y - cut) + PerlinNoiseUtil.getNoise2D(x + cut, y - cut) + PerlinNoiseUtil.getNoise2D(x - cut, y + cut) + PerlinNoiseUtil.getNoise2D(x + cut, y + cut)) / 16;
		let sides: number = (PerlinNoiseUtil.getNoise2D(x - cut, y) + PerlinNoiseUtil.getNoise2D(x + cut, y) + PerlinNoiseUtil.getNoise2D(x, y - cut) + PerlinNoiseUtil.getNoise2D(x, y + cut)) / 8;
		let center: number = PerlinNoiseUtil.getNoise2D(x, y) / 4;
		return corners + sides + center;
	}

	private static getNoise2D(x: number, y: number): number {
		var n: number = x + y * 57
		n = (n << 13) ^ n;
		n = (1.0 - ((n * (n * n * 15731 + 789221) + PerlinNoiseUtil.seed) & 0x7fffffff) / 1073741824.0);
		n = Math.abs(n);
		return n;
	}

	/**
	 * 插入二维图
	 * @param x
	 * @param y
	 * @return
	 */
	private static insertNum_2D(x: number, y: number): number {
		let integer_X: number = Math.floor(x);
		let fractional_X: number = x - integer_X;
		
		let integer_Y: number = Math.floor(y);
		let fractional_Y: number = y - integer_Y;

		var v1: number = PerlinNoiseUtil.getSmoothNoise2D(integer_X, integer_Y);//第一象限
		var v2: number = PerlinNoiseUtil.getSmoothNoise2D(integer_X + 1, integer_Y);//第二象限
		var v3: number = PerlinNoiseUtil.getSmoothNoise2D(integer_X, integer_Y + 1);//第四象限
		var v4: number = PerlinNoiseUtil.getSmoothNoise2D(integer_X + 1, integer_Y + 1);//第三象限
		//计算四个顶点距离中心点的距离来做差值
		var i1: number = PerlinNoiseUtil.insertNum_2(v1, v2, fractional_X);
		var i2: number = PerlinNoiseUtil.insertNum_2(v3, v4, fractional_X);
		return PerlinNoiseUtil.insertNum_2(i1, i2, fractional_Y);
	}
	/**
	 * 余玄插入函数
	 * @param a
	 * @param b
	 * @param x
	 * @return
	 */
	private static insertNum_2(a: number, b: number, x: number): number {
		var ft: number = x * 3.1415927
		var f: number = (1 - Math.cos(ft)) * 0.5
		return a * (1 - f) + b * f;
	}
}