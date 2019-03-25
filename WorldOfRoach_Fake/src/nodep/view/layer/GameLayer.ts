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

    private _popCount: number = 0;
    private _popShape: egret.Shape;

    /**
     * 添加一个界面到舞台
     */
    public addWindow(win: GameWindow): void {
        this.addChild(win);
    }

    /**
     * 移除一个界面
     */
    public removeWindow(win: GameWindow): void {
    }

    /**
     * 刷新阻挡层
     */
    private updateModel(): void {

    }

    /**
     * 界面大小变化
     */
    public resize(): void {
		
    }
}