class TestSpine extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);
	}


	public stageCanvas: HTMLCanvasElement;
	public canvas: HTMLCanvasElement;
	public context: spine.webgl.ManagedWebGLRenderingContext;
	public renderer: spine.webgl.SceneRenderer;
	public time: spine.TimeKeeper;
	public loadingScreen: spine.webgl.LoadingScreen;
	public assetManager: spine.webgl.AssetManager;

	public stagetContext: CanvasRenderingContext2D;
	public spineBody: spine.SpineBody;

	public renderTexture: egret.RenderTexture;
	public bmp: egret.Bitmap;

	private AddToStage(e: egret.Event) {
		this.renderTexture = new egret.RenderTexture();
		this.bmp = new egret.Bitmap();
		this.addChild(this.bmp);
		this.testSpineInit();
	}

	private testSpineInit(): void {
		this.stageCanvas = document.getElementById("rootDiv").getElementsByTagName("canvas")[0];

		this.canvas = this.stageCanvas.cloneNode(true) as HTMLCanvasElement;
		this.canvas.setAttribute("id", "canvas");
		this.canvas.setAttribute("hidden", "hidden");
		document.getElementById("rootDiv").appendChild(this.canvas);
		this.context = new spine.webgl.ManagedWebGLRenderingContext(this.canvas);
		this.renderer = new spine.webgl.SceneRenderer(this.canvas, this.context);
		this.time = new spine.TimeKeeper();

		this.assetManager = new spine.webgl.AssetManager(this.context, "../resource/assets/yuanchangye/");
		this.assetManager.loadText("yuanchangye.json");
		this.assetManager.loadTextureAtlas("yuanchangye.atlas");
		console.log("******* " + this.assetManager);

		setTimeout(() => { this.loadSkeleton() }, 1000);
	}

	private loadSkeleton() {
		console.log("loadSkeleton ===>>>");
		let atlas = this.assetManager.get("yuanchangye.atlas");
		let json = this.assetManager.get("yuanchangye.json");

		let skeletonJson = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas));
		// skeletonJson.scale = 1;
		let skeletonData = skeletonJson.readSkeletonData(json);
		let skeleton: spine.Skeleton = new spine.Skeleton(skeletonData);

		let animationStateData = new spine.AnimationStateData(skeletonData);
		let animationState = new spine.AnimationState(animationStateData);

		this.spineBody = { skeleton: skeleton, animationState: animationState };
		let offset = new spine.Vector2();
		let size = new spine.Vector2();
		this.spineBody.skeleton.updateWorldTransform();
		this.spineBody.skeleton.getBounds(offset, size, []);

		this.renderer.camera.position.x = 0;
		this.renderer.camera.position.y = offset.y + size.y / 2;
		this.renderer.camera.zoom = size.x > size.y ? size.x / this.canvas.width : size.y / this.canvas.height;

		// 需要获取全部skin后遍历验证当前要设置的skin
		this.spineBody.animationState.setAnimation(0, "animation", true);
		this.spineBody.skeleton.setSkinByName("normal");
		for (let i = 0; i < skeletonData.skins.length; i++) {
			let skin: spine.Skin = skeletonData.skins[i];
			console.log("skin name:" + skin.name);
			if (i > 0) {
				setTimeout(() => {
					this.spineBody.skeleton.setSkinByName(skin.name);
				}, 3000 * i);
			}
		}

		requestAnimationFrame(() => { this.renderStart() });

	}

	public renderStart(): any {

		this.context.gl.clear(this.context.gl.COLOR_BUFFER_BIT);

		this.time.update();

		this.spineBody.animationState.update(this.time.delta * 1);
		this.spineBody.animationState.apply(this.spineBody.skeleton);
		this.spineBody.skeleton.updateWorldTransform();

		this.renderer.begin();
		this.renderer.drawSkeleton(this.spineBody.skeleton, true);
		this.renderer.end();
		requestAnimationFrame(() => { this.renderStart() });

		this.bmp.texture = null;
		this.renderTexture.bitmapData = new egret.BitmapData(this.canvas);
		this.bmp.texture = this.renderTexture;
	}
}