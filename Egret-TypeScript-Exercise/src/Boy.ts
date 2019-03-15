class Boy extends egret.Sprite{
	public constructor() {
		super();
	}

	public order(){
		var daterEvent:BoyDateEvent=new BoyDateEvent(BoyDateEvent.DATE);

		daterEvent._year = 1990;
		
		this.dispatchEvent(daterEvent);
	}
}