class Pol2D {
	/**多边形的中心->向重心移动可以优化 */
	public centerPoint: Point2D;	//在创建多边形时使用创建三角形的点赋值了，修改这个点会修改三角形的点
	/**多边形的顶点 */
	public vertex: Array<Point2D>;
	/**是否最外圈的多边形 */
	public isos: boolean = false;	//通过是否有边框外部的点来判断

	public constructor(points: Array<Point2D>) {
		this.vertex = points;
	}

	/**
	 * 向重心点移动
	 */
	public moveToFocus(p: egret.Point): void {
		this.centerPoint.x = p.x;
		this.centerPoint.y = p.y;
	}

	/**
	 * 根据容器外框大小进行自裁切
	 * @param w
	 * @param h 
	 */
	public cutself(w: number, h: number): void {
		let key: any;
		let point: Point2D;
		/**准备删除的点列表 */
		let delList: Array<Point2D> = [];
		for (key in this.vertex) {
			point = this.vertex[key];
			//检测顶点是否在地图外侧
			if (this.isOutside(w, h, point)) {
				if (this.isOutside(w, h, this.getPrePoint(point)) && this.isOutside(w, h, this.getNextPoint(point)))
					delList.push(point);
			}
		}
		while (delList.length > 0) {
			point = delList.pop();
			this.vertex.splice(this.vertex.indexOf(point), 1);
		}
		let outsideCount: number = 0;
		for (key in this.vertex) {
			point = this.vertex[key];
			if (this.isOutside(w, h, point)) {
				delList.push(point);
				outsideCount++;
			}
		}
		if (outsideCount == 0) {
			return;
		}
		this.isos = outsideCount > 0;
		if (outsideCount > 2) {
			LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
		}
		let p1: Point2D;
		let p2: Point2D;
		let pIndex: number;
		let nIndex: number;
		if (outsideCount == 1) {
			//插入 前一个点连线与边界的交点
			p1 = this.getIntersect(w, h, delList[0], this.getPrePoint(delList[0]));
			pIndex = this.vertex.indexOf(this.getPrePoint(delList[0]));//插在前一个点的后面+
			this.vertex.splice(pIndex + 1, 0, p1);
			//插入 后一个点连线与边界的交点
			p2 = this.getIntersect(w, h, delList[0], this.getNextPoint(delList[0]));
			nIndex = this.vertex.indexOf(this.getNextPoint(delList[0]));//插在后一个点的前面
			this.vertex.splice(nIndex - 1, 0, p2);

			while (delList.length > 0) {
				point = delList.pop();
				this.vertex.splice(this.vertex.indexOf(point), 1);
			}
		} else if (outsideCount == 2) {
			if (!this.isOutside(w, h, this.getPrePoint(delList[0]))) 			//前一个点不在外部  [0]-(d0-1)(d1-2)-[3]
			{
				//删除点为[当前点]和[当前点的后一个点]
				if (!this.isOutside(w, h, this.getNextPoint(delList[0])))
					LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
				//取前一个删除点和更前一个点的边界交点，替换删除点
				p1 = this.getIntersect(w, h, delList[0], this.getPrePoint(delList[0]));
				pIndex = this.vertex.indexOf(delList[0]);
				this.vertex[pIndex] = p1;
				//取后一个删除点和更后一个点的边界交点，替换删除点
				p2 = this.getIntersect(w, h, delList[1], this.getNextPoint(delList[1]));
				nIndex = this.vertex.indexOf(delList[1]);
				this.vertex[nIndex] = p2;
			}
			else 																//后一个点不在外部	[0]-(d1-1)(d0-2)-[3]
			{
				//删除点为[当前点]和[当前点的前一个点]
				if (!this.isOutside(w, h, this.getPrePoint(delList[0])))
					LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
				p1 = this.getIntersect(w, h, delList[0], this.getNextPoint(delList[0]));
				pIndex = this.vertex.indexOf(delList[0]);
				this.vertex[pIndex] = p1;
				p2 = this.getIntersect(w, h, delList[1], this.getPrePoint(delList[1]));
				nIndex = this.vertex.indexOf(delList[1]);
				this.vertex[nIndex] = p2;
			}

			let list: Array<Object> = [];
			let key: any;
			for (key in list) {
				let ele = list[key];
			}
			for (key in list) {
				var ele = list[key];
			}

			//------------------检查是否同边-------------------
			if (p1.x == p2.x || p1.y == p2.y) {
				return;
			}
			//------------------不同边需要插入角点--------------
			let px: number = 0;
			let py: number = 0;

			//不同边计算角点x
			if (p1.x == 0 || p1.x == w)
				px = p1.x;
			else if (p2.x == 0 || p2.x == w)
				px = p2.x;
			else
				LogTrace.log("数据异常：裁切以后边不在边框上");//点很少是会出现问题，点在边框两边

			//不同边计算角点y
			if (p1.y == 0 || p1.y == h)
				py = p1.y;
			else if (p2.y == 0 || p2.y == h)
				py = p2.y;
			else
				LogTrace.log("数据异常：裁切以后边不在边框上");//点很少是会出现问题，点在边框两边

			//根据两个边界点的前后计算插入角点的位置
			if (this.getPrePoint(p1) == p2)		//p2在前
				this.vertex.splice(this.vertex.indexOf(p2) + 1, 0, new Point2D(px, py));
			else if (this.getPrePoint(p2) == p1)
				this.vertex.splice(this.vertex.indexOf(p1) + 1, 0, new Point2D(px, py));
			else
				LogTrace.log("数据异常：插入点有问题");
		}
		//2.如果有两个点，则分别向他们的真实点移动。
		//3.经过上面的处理之后，都会有2个点与边框贴近，我们称为虚拟点。
		//4.如果虚拟点在同一个边上，不做处理。如果他们不在同一条边上，则计算他们所在边的焦点，以此点为终点，新生成一个虚拟点。插入在他们之间。
		//5.经过上面的处理之后。得到的就是一个大小可控的范围。再做重心移动操作就不会出现异常出界的问题。
		//注意：上面所有移动的点都是虚拟替换点，需要删除原有的点。经过这个处理之后，所有的中心点都不会偏移出界。那么三角形的顶点自然也就不会出界。生成的多边形会更平滑
	}

	/**
	 * 是否在边界外
	 * @param w
	 * @param h
	 * @param target
	 * @return
	 */
	private isOutside(w: number, h: number, target: Point2D): boolean {
		return target.x < 0 || target.y < 0 || target.x > w || target.y > h;
	}
	
	/**
	 * 根据ID获取一个Point
	 * @param pid
	 * @return
	 */
	public getPointByID(pid: number): Point2D {
		var target: Point2D;
		var key: any;
		var pp: Point2D;
		for (key in this.vertex) {
			pp = this.vertex[key];
			if (pp.id == pid) {
				target = pp;
				break;
			}
		}
		return target;
	}

	/**
	 * 获取他的上一个
	 * @param target
	 * @return
	 */
	public getPrePoint(target: Point2D): Point2D {
		let returnPoint: Point2D;
		let index: number = this.vertex.indexOf(target);
		if (index < 0) {
			return null;
		}
		if (index == 0) {
			returnPoint = this.vertex[this.vertex.length - 1];
		}
		else {
			returnPoint = this.vertex[index - 1];
		}
		if (returnPoint == target) {
			LogTrace.log("数据异常：这个四边形只有两个点");
		}
		return returnPoint;
	}

	/**
	 * 获取他的下一个点
	 * @param target
	 * @return
	 */
	public getNextPoint(target: Point2D): Point2D {
		var returnPoint: Point2D;
		var index: number = this.vertex.indexOf(target);
		if (index < 0)
			return null;
		if (index == this.vertex.length - 1)
			returnPoint = this.vertex[0];
		else
			returnPoint = this.vertex[index + 1];
		if (returnPoint == target)
			LogTrace.log("数据异常：这个四边形只有两个点");
		return returnPoint;
	}
	/**
	 * 获取一个和外边框相交的点
	 * @param w
	 * @param h
	 * @param fromP 在框外的点
	 * @param toP 在框内的点
	 * @return
	 */
	private getIntersect(w: number, h: number, fromP: Point2D, toP: Point2D): Point2D {
		let dis1: number;
		let dis2: number;
		//坐标系左上为原点  
		/**
		 *  ● │   │ ●
		 * ───┼───┼───
		 *    │   │   
		 * ───┼───┼───
		 *  ● │   │ ●
		 */
		if ((fromP.x < 0 || fromP.x > w) && (fromP.y < 0 || fromP.y > h)) {
			//根据比值计算交点
			let xbz: number;	//x的偏移比值
			let ybz: number;	//y的偏移比值
			if (fromP.y < 0) {	//左侧
				ybz = (toP.y - fromP.y) / toP.y;
				if (fromP.x < 0)	//左上
					xbz = (toP.x - fromP.x) / toP.x;
				else				//左下
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			else {				//右侧
				ybz = (fromP.y - toP.y) / (h - toP.y);
				if (fromP.x < 0)	//右上
					xbz = (toP.x - fromP.x) / toP.x;
				else				//右下
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			if (xbz > ybz) //交点在左边
			{
				if (fromP.x < 0) {
					dis1 = toP.x - fromP.x;
					dis2 = toP.x;
				}
				else {
					dis1 = fromP.x - toP.x;
					dis2 = w - toP.x;
				}
			}
			else {
				if (fromP.y < 0) {
					dis1 = toP.y - fromP.y;
					dis2 = toP.y;
				}
				else {
					dis1 = fromP.y - toP.y;
					dis2 = h - toP.y;
				}
			}
		}
		/**
		 *    │   │ 
		 * ───┼───┼───
		 *  ● │   │ ● 
		 * ───┼───┼───
		 *    │   │ 
		 */
		else if (fromP.x < 0 || fromP.x > w) {
			if (fromP.x < 0) {
				dis1 = toP.x - fromP.x;
				dis2 = toP.x;
			}
			else {
				dis1 = fromP.x - toP.x;
				dis2 = w - toP.x;
			}
		}
		/**
		 *    │ ● │ 
		 * ───┼───┼───
		 *    │   │   
		 * ───┼───┼───
		 *    │ ● │ 
		 */
		else {
			if (fromP.y < 0) {
				dis1 = toP.y - fromP.y;
				dis2 = toP.y;
			}
			else {
				dis1 = fromP.y - toP.y;
				dis2 = h - toP.y;
			}
		}
		let p: egret.Point = egret.Point.interpolate(fromP, toP, dis2 / dis1);
		//对点的位置坐一个近似取整，防止浮点型计算把一个点计算成多个
		if (Math.abs(p.x) < 2)
			p.x = 0;
		else if (Math.abs(w - p.x) < 2)
			p.x = w;
		if (Math.abs(p.y) < 2)
			p.y = 0;
		else if (Math.abs(p.y - h) < 2)
			p.y = h;
		return new Point2D(p.x, p.y);
	}
}