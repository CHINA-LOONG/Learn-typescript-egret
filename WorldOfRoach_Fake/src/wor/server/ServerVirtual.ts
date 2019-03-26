/**
 * 这是一个虚拟的服务器入口,提供一切可提供的通信接口
 */
class ServerVirtual {

	private static _handlerMap:Map<string,Function>;
	private static _thisObjectMap:Map<number,Function>;

	public constructor() {
	}
	/**
	 * 初始化模拟服务器
	 */
	public static build():void{
		ServerVirtual._handlerMap = new Map();
		ServerVirtual._thisObjectMap = new Map();
		new Server_User();
	}

	public static registHandlerTest(mt:number,pxy:number,handler:Function,thisObject:any):void{
		ServerVirtual._handlerMap.set(mt+"_"+pxy,handler);
		ServerVirtual._thisObjectMap.set(mt,thisObject);
	}


	public static request(mt:number,pxy:number,msg:string):void{
		let returnMsg:string = ServerVirtual._handlerMap.get(mt+"_"+pxy).apply(ServerVirtual._thisObjectMap.get(mt),[msg]);
		ProxyMgr.instance.response(mt,pxy,returnMsg);
	}

}