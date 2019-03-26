/**
 * 基础层级容器的实现
 * @author nodep
 * @version 1.0
 */
class GameLayer extends egret.DisplayObjectContainer implements GameLayerInterface {
    /**
     * 层级的唯一名称
     */
    public layerType: string;

    private _wins: Array<GameWindow> = [];

    /**
     * 遮挡层的计数器
     */
    private _popCount: number = 0;
    /**
     * 遮挡层对象
     */
    private _popShape: egret.Shape;

    /**
     * 添加一个界面到舞台
     */
    public addWindow(win: GameWindow): void {
        win.visible = false;
        this.addChild(win);
        this._wins.push(win);
        if(win.pop)
            this._popCount++;
        this.updateModel();
        if(win.__inited)
            win.reOpen();
        win.__inited = true;
    }

    /**
     * 移除一个界面
     */
    public removeWindow(win: GameWindow): void {
        if(win.pop)
            this._popCount--;
        this.updateModel();
        this.removeChild(win);
        //删除数组中的元素
        this._wins.splice(this._wins.indexOf(win),1);
    }

    /**
     * 刷新阻挡层
     */
    private updateModel(): void {
        if(this._popCount>0&&(!this._popShape||!this._popShape.parent)){
            if(!this._popShape)
                this._popShape = new egret.Shape();
            this._popShape.graphics.clear();
            this._popShape.graphics.beginFill(0x000000,0.7);
            this._popShape.graphics.drawRect(0,0,WindowsMgr.stageWidth,WindowsMgr.stageHeight);
            this._popShape.graphics.endFill();
            this._popShape.touchEnabled = true;
            this.addChildAt(this._popShape,0);
        }
        else if(this._popCount<=0&&(this._popShape&&this._popShape.parent)){
            this.removeChild(this._popShape);
            this._popShape.graphics.clear();
            this._popShape = null;
        }
    }

    /**
     * 界面大小变化
     */
    public resize(): void {
		let key:any;
        for(key in this._wins){
            this._wins[key].resize();
        }
    }
}