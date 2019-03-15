class BoyDateEvent extends egret.Event{
	public static DATE:string = "约会";

	public _year:number=0;


	public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
		super(type,bubbles,cancelable);
	}
}