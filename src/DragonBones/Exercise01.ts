module DragonBonesExercise {
	export class Exercise01 extends egret.DisplayObjectContainer {


		public static instance: Exercise01 = null;
		public constructor() {
			super();
			Exercise01.instance = this;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(): void {
			this.runGame().catch(e => {
				console.log(e);
			});
		}

		private async runGame() {
			console.log("startTime:" + egret.getTimer());
			this.createGameScene();
		}

		public factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
		private _player: Actor = null;

		protected createGameScene(): void {

			this.factory.parseDragonBonesData(RES.getRes("yuanchangye_ske_json"));
			this.factory.parseTextureAtlasData(RES.getRes("yuanchangye_tex_json"), RES.getRes("yuanchangye_tex_png"));

			this.stage.addEventListener(egret.Event.ENTER_FRAME,this._enterFrameHandler,this);

			this._player = new Actor();

		}
        private _enterFrameHandler(event: dragonBones.EgretEvent): void {
            this._player.update();
            dragonBones.WorldClock.clock.advanceTime(-1);
        }

	}


	class Actor {

		private _armature: dragonBones.Armature = null;
		private _armatureDisplay: dragonBones.EgretArmatureDisplay = null;
		private _head: dragonBones.Armature = null;

		public constructor() {
			this._armature = Exercise01.instance.factory.buildArmature("armatureName");
			this._armatureDisplay = <dragonBones.EgretArmatureDisplay>this._armature.display;

			this._armatureDisplay.x = 200;
			this._armatureDisplay.y = 1000;
			// Exercise01.instance.addChild(this._armatureDisplay);

			this._head = this._armature.getSlot("head").childArmature;

			dragonBones.WorldClock.clock.add(this._armature);
            this._armature.invalidUpdate();
			this._armature.animation.play("animation", 0);
		}

        public update(): void {
            // this._updatePosition();
            // this._updateAim();
            // this._updateAttack();
            this._armature.invalidUpdate();
        }
	}

}