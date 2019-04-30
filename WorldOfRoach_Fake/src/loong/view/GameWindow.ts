class GameWindow extends eui.Component {

    /**
     *所屬層級,需要在業務中自定義
     */
    public layerType: string = "";
    /**界面的唯一命名 */
    public typeName: string;
    /**非初次加入舞台 */
    public __inited: boolean = false;
    /**是否有遮罩 */
    public pop: boolean = false;
    /**界面布局方式 */
    private __align:string = "NONE";
    private __offsetX:number = 0;
    private __offsetY:number = 0;

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.visible = true;
        this.resize();
    }
    /**
     * 再次打开界面
     */
    public reOpen():void{
        this.visible = true;
    }

    /**
     * 捕获到对应的通知
     */
    public update(updateType:number,updateObject:any):void{

    }

    /**
     * 关闭界面之前
     * 如果要添加关闭动画则在实现中返回false,并实现自己的关闭动画。则关闭动画完成后彻底移除。
     */
    public beforeClose(): boolean {
        return true;
    }

    /**
     * 舞台大小发生变化
     */
    public resize():void{

    }

public align(alignType:string,offsetX:number =0,offsetY:number = 0):void{
    this.__align = alignType;
    this.__offsetX = offsetX*this.scaleX;
    this.__offsetY = offsetY*this.scaleY;
    if(this.stage!=null){
        this.resize();
    }
}

}