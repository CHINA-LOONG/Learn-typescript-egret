/**
 * nodep
 * 游戏等待界面
 */
class GameMainLoaderWindow extends GameWindow implements eui.UIComponent {

	private _bgShape: egret.Shape;
	private _infoLabel: eui.Label;

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WorWindowType.MAIN_LOADING;
		this.align(AlignType.TOP_LEFT);
	}

	protected childrenCreated(): void {
		this._bgShape = new egret.Shape();
		this._bgShape.graphics.beginFill(0x000000, 1);
		this._bgShape.graphics.drawRect(0, 0, 1, 1);
		this._bgShape.graphics.endFill();
		this.addChildAt(this._bgShape, 0);
		this._infoLabel = this.getChildByName("message") as eui.Label;
		this._infoLabel.text = "";
		super.childrenCreated();
	}

	public resize(): void {
		super.resize();
		if (this._bgShape == null)
			return;
		this._bgShape.scaleX = WinsManager.stageWidth;
		this._bgShape.scaleY = WinsManager.stageHeight;
		this._infoLabel.x = (WinsManager.stageWidth - this._infoLabel.width) / 2;
		this._infoLabel.y = (WinsManager.stageHeight - this._infoLabel.height) / 2;
	}

	/**
     * 捕获到对应的通知
     */
	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.MAIN_LOADING_SET:
				this._infoLabel.text = updateObject;
				break;
			case UpdateType.MAIN_LOADING_MAP:
				this.updateDrawMap(updateObject as LloydUtil);
				break;
		}
	}


	private polgonTimes: number = 0;
	private updateDrawMap(lloy: LloydUtil): void {
		if (!lloy)
			return;

		// this.drawTriangle(lloy);
		if (this.polgonTimes <= 0) {
			this.drawBackground();
			this.drawMap(lloy);
			this.drawPolgon(lloy);
			this.polgonTimes++;
		}
		else {
			this.drawPolgon2(lloy);
		}
	}

	private _drawBG: egret.Shape;
	private drawBackground() {
		if (!this._drawBG) {
			this._drawBG = new egret.Shape();
		}
		this._drawBG.graphics.clear();
		let bg = this._drawBG;

		bg.graphics.beginFill(0xffffff, 1);
		bg.graphics.drawRect(0, 0, WinsManager.stageWidth, WinsManager.stageHeight);
		bg.graphics.endFill();

		this.addChild(bg);
	}

	private _drawMap: egret.Shape;
	private drawMap(lloy: LloydUtil) {
		if (!this._drawMap) {
			this._drawMap = new egret.Shape();
		}
		this._drawMap.graphics.clear();
		let map = this._drawMap;

		let point = this.rePoint(new Point2D(0, 0));
		map.graphics.beginFill(0x0000ff, 0.2);
		map.graphics.drawRect(point.x, point.y, this.reDistance(800), this.reDistance(800));
		map.graphics.endFill();

		this.addChild(map);
	}

	private _drawTri: egret.Shape;
	private drawTriangle(lloy: LloydUtil) {
		if (!this._drawTri) {
			this._drawTri = new egret.Shape();
		}
		this._drawTri.graphics.clear();
		let line = this._drawTri;

		let key: any;
		let tri: Tri2D;
		line.graphics.lineStyle(1, 0xff0000);

		let drawList: Array<Edge2D> = new Array<Edge2D>();
		let edge: Edge2D;
		// let temp = 0;
		for (key in lloy.tris) {
			tri = lloy.tris[key];
			// if(temp == 0){
			// 	++temp;
			// 	continue;
			// }
			for (let i = 0; i < tri.edges.length; i++) {
				edge = tri.edges[i];
				if (drawList.indexOf(edge) < 0) {
					drawList.push(edge);
					let p1 = this.rePoint(edge.startPoint);
					let p2 = this.rePoint(edge.endPoint);
					line.graphics.moveTo(p1.x, p1.y);
					line.graphics.lineTo(p2.x, p2.y);
				}
			}

		}
		this.addChild(line);
	}

	private _drawPol: egret.Shape;
	private drawPolgon(lloy: LloydUtil) {
		if (!this._drawPol) {
			this._drawPol = new egret.Shape();
		}
		this._drawPol.graphics.clear();
		let line = this._drawPol;

		let key: any;
		let pol: Pol2D;
		line.graphics.lineStyle(1, 0x888888);
		for (key in lloy.polgons) {
			pol = lloy.polgons[key];
			let start = pol.vertex[0];
			let p1 = this.rePoint(start);
			line.graphics.moveTo(p1.x, p1.y);
			let temp = pol.getNextPoint(start);
			while (start != temp) {
				let p2 = this.rePoint(temp);
				line.graphics.lineTo(p2.x, p2.y);
				temp = pol.getNextPoint(temp);
			}
			line.graphics.lineTo(p1.x, p1.y);

			// for (let i = 1; i < pol.vertex.length; i++) {
			// 	let p2 = this.rePoint(pol.vertex[i]);
			// 	line.graphics.lineTo(p2.x, p2.y);
			// }
		}
		this.addChild(line);
	}

	private _drawPol2: egret.Shape;
	private drawPolgon2(lloy: LloydUtil) {
		if (!this._drawPol2) {
			this._drawPol2 = new egret.Shape();
		}
		this._drawPol2.graphics.clear();
		let line = this._drawPol2;

		let key: any;
		let pol: Pol2D;
		line.graphics.lineStyle(1, 0xffffff);
		for (key in lloy.polgons) {
			pol = lloy.polgons[key];
			let start = pol.vertex[0];
			let p1 = this.rePoint(start);
			line.graphics.moveTo(p1.x, p1.y);
			let temp = pol.getNextPoint(start);
			while (start != temp) {
				let p2 = this.rePoint(temp);
				line.graphics.lineTo(p2.x, p2.y);
				temp = pol.getNextPoint(temp);
			}
			line.graphics.lineTo(p1.x, p1.y);

			// for (let i = 1; i < pol.vertex.length; i++) {
			// 	let p2 = this.rePoint(pol.vertex[i]);
			// 	line.graphics.lineTo(p2.x, p2.y);
			// }
		}
		this.addChild(line);
	}

	private scale: number = 1.5;
	private rePoint(p: Point2D): egret.Point {
		let returnP: egret.Point = new egret.Point(p.x / this.scale + this.scale * 40, p.y / this.scale + this.scale * 40);
		return returnP;
	}
	private reDistance(d: number): number {
		return d / this.scale;
	}
}