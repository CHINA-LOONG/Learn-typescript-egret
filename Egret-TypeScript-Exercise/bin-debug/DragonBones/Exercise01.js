var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DragonBonesExercise;
(function (DragonBonesExercise) {
    var Exercise01 = (function (_super) {
        __extends(Exercise01, _super);
        function Exercise01() {
            var _this = _super.call(this) || this;
            _this.factory = new dragonBones.EgretFactory();
            _this._player = null;
            Exercise01.instance = _this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Exercise01.prototype.onAddToStage = function () {
            this.runGame().catch(function (e) {
                console.log(e);
            });
        };
        Exercise01.prototype.runGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("startTime:" + egret.getTimer());
                    this.createGameScene();
                    return [2 /*return*/];
                });
            });
        };
        Exercise01.prototype.createGameScene = function () {
            this.factory.parseDragonBonesData(RES.getRes("yuanchangye_ske_json"));
            this.factory.parseTextureAtlasData(RES.getRes("yuanchangye_tex_json"), RES.getRes("yuanchangye_tex_png"));
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandler, this);
            this._player = new Actor();
        };
        Exercise01.prototype._enterFrameHandler = function (event) {
            this._player.update();
            dragonBones.WorldClock.clock.advanceTime(-1);
        };
        Exercise01.instance = null;
        return Exercise01;
    }(egret.DisplayObjectContainer));
    DragonBonesExercise.Exercise01 = Exercise01;
    __reflect(Exercise01.prototype, "DragonBonesExercise.Exercise01");
    var Actor = (function () {
        function Actor() {
            this._armature = null;
            this._armatureDisplay = null;
            this._head = null;
            this._armature = Exercise01.instance.factory.buildArmature("armatureName");
            this._armatureDisplay = this._armature.display;
            this._armatureDisplay.x = 200;
            this._armatureDisplay.y = 1000;
            // Exercise01.instance.addChild(this._armatureDisplay);
            this._head = this._armature.getSlot("head").childArmature;
            dragonBones.WorldClock.clock.add(this._armature);
            this._armature.invalidUpdate();
            this._armature.animation.play("animation", 0);
        }
        Actor.prototype.update = function () {
            // this._updatePosition();
            // this._updateAim();
            // this._updateAttack();
            this._armature.invalidUpdate();
        };
        return Actor;
    }());
    __reflect(Actor.prototype, "Actor");
})(DragonBonesExercise || (DragonBonesExercise = {}));
//# sourceMappingURL=Exercise01.js.map