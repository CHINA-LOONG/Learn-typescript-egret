class SceneManager {

	public _stage: egret.DisplayObjectContainer;
	public mainScene: MainScene;
	public playerScene: PlayerScene;
	public heroScene: HeroScene;


	public constructor() {
		this.mainScene = new MainScene();
		this.playerScene = new PlayerScene();
		this.heroScene = new HeroScene();
	}

	static sceneManager: SceneManager;
	static get instance() {
		if (!this.sceneManager) {
			this.sceneManager = new SceneManager();
		}
		return this.sceneManager;
	}
	/**
 	* 设置根场景
 	*/
	public setStage(s: egret.DisplayObjectContainer) {
		this._stage = s
	}

	public toMainScene() {
		if (!this.mainScene.parent) {
			this._stage.addChild(this.mainScene);
		}
		this.removeOther(null);
	}

	private removeOther(scene?) {
		let arr = [this.playerScene, this.heroScene]
		arr.forEach((item) => {
			if (scene === item) {
				return;
			}
			if (item.parent) {
				this.mainScene.removeChild(item);
			}
		})
	}

	public toPlayerScene() {
		this.removeOther();
		this.mainScene.addChild(this.playerScene);
	}
	public toHeroScene() {
		this.removeOther();
		this.mainScene.addChild(this.heroScene);
	}
	public toGoodsScene() {
		this.removeOther();
	}
	public toAboutScene() {
		this.removeOther();
	}


	public showInfo(arr: string[]) {
		let text: string = '你选择了: ';
		if (arr.length === 0) {
			text = '厉害了什么都不选';
		} else {
			text += arr.toString();
		}

		let img: egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes('toast-bg_png');
		this.mainScene.addChild(img);

		img.x = this.mainScene.width / 2 - img.width / 2;
		img.y = 500;
		img.height = 40;

        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        SceneManager.instance.mainScene.addChild(label)
        label.x = SceneManager.instance.mainScene.width / 2 - label.width / 2
        label.y = 510
        label.height = 40

        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(1000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.mainScene.removeChild(label)
            SceneManager.instance.mainScene.removeChild(img)
        }, this)
	}
}