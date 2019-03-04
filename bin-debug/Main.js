//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._pauseTime = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**
     * 测试声音播放
     */
    Main.prototype.playSoundTest = function () {
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            sound.play();
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
            console.log("loaded error!");
        }, this);
        sound.load("resource/sound/click1.ogg");
    };
    Main.prototype.playSoundTest2 = function () {
        //需要先加载资源
        var sound = RES.getRes("click1_ogg");
        sound.play();
    };
    /**
     * 测试事件系统
     */
    Main.prototype.listenerEventTest = function () {
        var boy = new Boy();
        var girl = new Girl();
        boy.addEventListener(BoyDateEvent.DATE, girl.getDate, girl);
        boy.order();
        boy.removeEventListener(BoyDateEvent.DATE, girl.getDate, girl);
    };
    /**
     * 测试绘制矢量图加事件
     */
    Main.prototype.touchEventTest = function () {
        var _myGrid = new MyGrid();
        this.addChild(_myGrid);
        var offsetX;
        var offsetY;
        _myGrid.touchEnabled = true;
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        function startMove(e) {
            offsetX = e.stageX - _myGrid.x;
            offsetY = e.stageY - _myGrid.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
            console.log("start:" + this.name);
        }
        function onMove(e) {
            _myGrid.x = e.stageX - offsetX;
            _myGrid.y = e.stageY - offsetY;
        }
        function stopMove(e) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
    };
    /**
     * 渲染过滤器效果测试
     */
    Main.prototype.filterTest = function () {
        var container = new egret.DisplayObjectContainer();
        container.x = 200;
        container.y = 200;
        this.addChild(container);
        var _myGrid = new MyGrid();
        container.addChild(_myGrid);
        _myGrid.touchEnabled = true;
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, this);
        function onClick() {
            _myGrid.x = _myGrid.x + 20;
        }
        var container = new egret.DisplayObjectContainer();
        container.x = 200;
        container.y = 500;
        this.addChild(container);
        var bmp = new egret.Bitmap();
        container.addChild(bmp);
        var renderTexture1 = new egret.RenderTexture();
        var renderTexture2 = new egret.RenderTexture();
        renderTexture1.drawToTexture(_myGrid, new egret.Rectangle(0, 0, 150, 100));
        bmp.texture = renderTexture1;
        bmp.blendMode = egret.BlendMode.NORMAL;
        var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        var blurFliter = new egret.BlurFilter(10, 10);
        bmp.filters = [glowFilter, colorFlilter, blurFliter];
    };
    /**
     * 文本以及效果点击测试
     */
    Main.prototype.textFieldTest = function () {
        var text = new egret.TextField();
        text.textFlow = new Array({ text: "This is a hyperlink", style: { "href": "event:text event triggered" } }, { text: "\n This is a hyperlink", style: { "href": "http://www.egret.com/" } }, { text: "\n This is just a text", style: {} });
        text.addEventListener(egret.TextEvent.LINK, function (evt) {
            console.log(evt.text);
        }, this);
        text.touchEnabled = true;
        this.addChild(text);
    };
    /**
     * 网页调试日志测试
     */
    Main.prototype.egretLogTest = function () {
        egret.log(".........---");
    };
    Main.prototype.loadVideo = function () {
        this._video = new egret.Video();
        this._video.x = 0; //设置视频坐标x
        this._video.y = 0; //设置视频坐标y
        this._video.width = 640; //设置视频宽
        this._video.height = 320; //设置视频高
        this._video.fullscreen = false; //设置是否全屏（暂不支持移动设备）
        this._video.poster = "resource/assets/egret_icon.png"; //设置loding图
        // this._video.load("http://media.w3.org/2010/05/sintel/trailer.mp4");
        this._video.load("http://www.w3school.com.cn/example/html5/mov_bbb.ogg");
        //http://www.w3school.com.cn/example/html5/mov_bbb.ogg
        this.addChild(this._video); //将视频添加到舞台
        this._video.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log("complete");
        }, this);
        // //监听视频加载完成
        // this._video.once(egret.Event.COMPLETE,this.onLoad,this);
        // //监听视频加载失败
        // this._video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
    };
    //播放
    Main.prototype.play = function () {
        this.stop();
        this._video.play(this._pauseTime, false);
        this._video.addEventListener(egret.Event.ENDED, this.onComplete, this);
    };
    //停止
    Main.prototype.stop = function () {
        this._video.pause();
    };
    //播放完成
    Main.prototype.onComplete = function (e) {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
        this.setAllAbled(false);
    };
    Main.prototype.changeScreen = function () {
        if (!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    };
    Main.prototype.initCtr = function () {
        var _video = this._video;
        var rap = this._video.width / 4 + 5;
        var rapH = 100;
        //play
        var playTxt = this._playTxt = new egret.TextField();
        playTxt.text = "播放";
        playTxt.size = 40;
        playTxt.x = this._video.x;
        playTxt.y = 400 + rapH;
        playTxt.touchEnabled = true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.play(this._pauseTime, false);
            this.setAllAbled(true);
        }, this);
        this.addChild(playTxt);
        //stop
        var stopTxt = this._stopTxt = new egret.TextField();
        stopTxt.text = "停止";
        stopTxt.size = 40;
        stopTxt.x = playTxt.x + rap * 1;
        stopTxt.y = 400 + rapH;
        stopTxt.touchEnabled = true;
        stopTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this._pauseTime = 0;
            _video.pause();
            this.setAllAbled(false);
        }, this);
        this.addChild(stopTxt);
        //pause 
        var pauseTxt = this._pauseTxt = new egret.TextField();
        pauseTxt.text = "暂停";
        pauseTxt.size = 40;
        pauseTxt.x = playTxt.x + rap * 2;
        pauseTxt.y = 400 + rapH;
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this._pauseTime = _video.position;
            _video.pause();
            this.setAllAbled(false);
        }, this);
        this.addChild(pauseTxt);
        //fullscreen 
        var fullTxt = this._fullTxt = new egret.TextField();
        fullTxt.text = "全屏";
        fullTxt.size = 40;
        fullTxt.x = playTxt.x + rap * 3;
        fullTxt.y = 400 + rapH;
        fullTxt.touchEnabled = true;
        fullTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.changeScreen();
        }, this);
        this.addChild(fullTxt);
        this.setAllAbled(false);
    };
    Main.prototype.setAllAbled = function (isPlaying) {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
        this.setTextAbled(this._fullTxt, isPlaying);
    };
    Main.prototype.setTextAbled = function (text, touchEnabled) {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    };
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        // this.playSoundTest();
        // this.listenerEventTest();
        // this.touchEventTest();
        // this.filterTest();
        // this.textFieldTest();
        // this.egretLogTest();
        //  this.loadVideo();//有bug播放加载失败
        //  this.initCtr();
        // this.runGame().catch(e => {
        //     console.log(e);
        // })
        // console.log(dragonBones.DragonBones.VERSION);
        var exercise;
        exercise = new TSLang_Exercise01();
        // exercise = new TSLang_Exercise02();
        exercise.Exercise();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("startTime:" + egret.getTimer());
                        return [4 /*yield*/, this.loadResource()
                            // this.createGameScene();
                            // const result = await RES.getResAsync("description_json")
                            // this.startAnimation(result);
                            // await platform.login();
                            // const userInfo = await platform.getUserInfo();
                            // console.log(userInfo);
                            // console.log("endTime:" + egret.getTimer());
                            // this.dragonBonesTest(0.5);
                            // this.dragonBonesTest(1);
                        ];
                    case 1:
                        _a.sent();
                        // this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        // await platform.login();
                        // const userInfo = await platform.getUserInfo();
                        // console.log(userInfo);
                        // console.log("endTime:" + egret.getTimer());
                        // this.dragonBonesTest(0.5);
                        // this.dragonBonesTest(1);
                        this.spineXiaoChuanTest();
                        return [2 /*return*/];
                }
            });
        });
    };
    // private dragonBonesTest(timeScale:number) {
    //     var dragonBonesData = RES.getRes("Robot_json");
    //     var textureData = RES.getRes("texture_json");
    //     var texture = RES.getRes("texture_png");
    //     let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
    //     egretFactory.parseDragonBonesData(dragonBonesData);
    //     egretFactory.parseTextureAtlasData(textureData, texture);
    //     let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("robot");
    //     this.addChild(armatureDisplay);
    //     armatureDisplay.x = 200;
    //     armatureDisplay.y = 500;
    //     armatureDisplay.animation.timeScale = timeScale;
    //     // armatureDisplay.scaleX = 0.5;
    //     // armatureDisplay.scaleY = 0.5;
    //     armatureDisplay.animation.play("Run",0);
    // }
    Main.prototype.spineXiaoChuanTest = function () {
        var dragonBonesData = RES.getRes("xiaochuan_ske_json");
        var textureData = RES.getRes("xiaochuan_tex_json");
        var texture = RES.getRes("xiaochuan_tex_png");
        var egretFactory = dragonBones.EgretFactory.factory;
        // let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        egretFactory.parseDragonBonesData(dragonBonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);
        var armatureDisplay = egretFactory.buildArmatureDisplay("armatureName");
        this.addChild(armatureDisplay);
        armatureDisplay.x = 200;
        armatureDisplay.y = 1500;
        // armatureDisplay.scaleX = 0.5;
        // armatureDisplay.scaleY = 0.5;
        armatureDisplay.animation.play("animation", 0);
    };
    Main.prototype.waitTime = function (delay) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setTimeout('dragonBonesTest()', 2000);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("sounds", 1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("robot", 2)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("xiaochuan", 3)];
                    case 5:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW + 200;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map