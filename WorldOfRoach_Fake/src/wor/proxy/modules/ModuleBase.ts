class ModuleBase {

	/**
	 * 请求
	 */
	protected static TYPE_RQ:number = 1;
	/**
	 * 返回
	 */
	protected static TYPE_RS:number = 2;

	/**
	 * 模块ID
	 */
	protected moduleType:number = 0;
	private _reqHandlerMap:Map<number,Function>;

	public constructor(mt:number) {
		this.moduleType = mt;
		this._reqHandlerMap= new Map();
	}

	/**
	 * 注册函数
	 */
	protected registHandler(pxy:number,req:Function):void{
		this._reqHandlerMap.set(pxy,req);
	}

	/**
	 * 向服务端发送请求,根据主动注册的函数的不同而调用不同的函数来预处理
	 */
	public requestToServer(pxy:number,msg:string):void{
		msg = this._reqHandlerMap.get(pxy).apply(this,[ModuleBase.TYPE_RQ,msg]);
		ServerVirtual.request(this.moduleType,pxy,msg);
	}

	/**
	 * 获取服务端返回的请求,根据主动注册的函数的不同而调用不同的函数来预处理
	 */
	public responseFromServer(pxy:number,msg:string):void{
		this._reqHandlerMap.get(pxy).apply(this,[ModuleBase.TYPE_RS,msg]);
	}

}