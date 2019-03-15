class ObjectPool
{
	public constructor() {
	}

	 //dictionary
        private static pools:Object=new Object();
 
        public static returnItem(classType:string,item:IPool):void
        {
			if(item == null)
				return;
				
			var list :IPool[] ;
            if(!this.pools.hasOwnProperty(classType))
            {
				list = [];
				this.pools[classType] = list; 
            } else
			{
				list = this.pools[classType];
			}
            item.reset(); 
			
			if(list.indexOf(item)>=0)
			{
				console.warn("return objcet error: have same object type "+ classType +"?");
				return;
			}
            list.push(item);
        }
        /**
         *Get one item from pool 
         * @param classType：
         * @return 
         * 
         */        
        public static getObject(classType:string):IPool
        {
			var poolList:IPool[];
            if(!this.pools.hasOwnProperty(classType))
            {
				poolList = [];
				this.pools[classType] =poolList;
            }else
			{
				poolList = this.pools[classType];
			}

			if(poolList.length>0)
			{
				return poolList.shift();
			}

     		var obj_class:any = egret.getDefinitionByName(classType);
				
			if(obj_class == null)
			{
				console.error("ObjectPool:"+ "\""+classType +"\""+" not found please check!!!");
				return;
			}  
      
			var obj:IPool = new obj_class() as IPool; 

			if(obj == null)
			{
				console.error("getObject:"+ "\""+classType +"\""+" is  not a IPool  children!! please check!!!");
				return;
			}

			
			return obj ;
        }
}

