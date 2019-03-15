class MapCon extends egret.DisplayObjectContainer{
	public constructor() {
		super();
	}


	public logic:any;


	public clear() {
		if(this.logic != null){
			this.logic.clear();
		}
		this.logic = null;
	}
}