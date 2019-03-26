class AlertWindow extends GameWindow {
	
	private static _message:string;
	private static _callBack:Function;
	private static _thisObject:any;
	private static _labels:Array<string>;

	public static alertShow(message:string,callBack:Function,thisObject:any,btnLabels:Array<string> = null):void{
		
		AlertWindow._message = message;
		AlertWindow._callBack = callBack;
		AlertWindow._thisObject = thisObject;
		AlertWindow._labels = btnLabels;
		WindowsMgr.instance.openWindow(AlertWindow);
	}


	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WindowType.ALERT_WIN;
		this.pop = true;
	}


	public okBtn:eui.Button;
	public cancelBtn:eui.Button;
	public infoTxt:eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handler,this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handler,this);
		this.reOpen();
	}

	public reOpen():void{
		super.reOpen();
		this.infoTxt.text = AlertWindow._message;
	}

	private handler(evt:egret.TouchEvent):void{
		if(AlertWindow._callBack!=null)
			AlertWindow._callBack.apply(AlertWindow._thisObject,[evt.target == this.okBtn]);
		WindowsMgr.instance.closeWindow(this);
	}
}