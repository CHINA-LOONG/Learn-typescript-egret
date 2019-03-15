class MyGrid extends egret.Shape{
	public constructor() {
		super();
		this.drawGrid();
	}

	private drawGrid(){
		this.graphics.beginFill(0x0000ff);
		this.graphics.drawRect(0,0,50,50);
		this.graphics.drawCircle(50,50,20);
		this.graphics.endFill();
		
		this.width = 200;
		this.height = 100;

		this.graphics.lineStyle(5,0x00ff00,0.3);
		this.graphics.drawArc(50,50,50,0,70,false);
		this.graphics.endFill();
	}
	
}