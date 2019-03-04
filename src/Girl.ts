class Girl extends egret.Sprite{
	public constructor() {
		super();
	}

	public getDate(evt:BoyDateEvent){
		console.log(evt._year);
	}

}