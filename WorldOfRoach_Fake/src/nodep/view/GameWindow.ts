class GameWindow extends eui.Component {
	
    /**
     *所屬層級,需要在業務中自定義
     */
    public layerType: string = "";
    /**
     *界面的唯一命名
     */
    public typeName: string;


    	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}