// TypeScript file

interface GameLayerInterface {
    /**
    * 添加並顯示一個window
    */
    addWindow(win: GameWindow): void;
    /**
     * 舞台大小变化导致
     */
    resize(): void;
}