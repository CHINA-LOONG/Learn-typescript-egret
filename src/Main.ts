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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    /**
     * 测试声音播放
     */
    private playSoundTest() {
        var sound: egret.Sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
            sound.play();
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
            console.log("loaded error!");
        }, this);
        sound.load("resource/sound/click1.ogg");
    }

    private playSoundTest2() {
        //需要先加载资源
        var sound: egret.Sound = RES.getRes("click1_ogg");
        sound.play();
    }

    /**
     * 测试事件系统
     */
    private listenerEventTest() {
        var boy: Boy = new Boy();
        var girl: Girl = new Girl();
        boy.addEventListener(BoyDateEvent.DATE, girl.getDate, girl);
        boy.order();

        boy.removeEventListener(BoyDateEvent.DATE, girl.getDate, girl);
    }
    /**
     * 测试绘制矢量图加事件
     */
    private touchEventTest() {
        var _myGrid = new MyGrid();
        this.addChild(_myGrid);
        var offsetX: number;
        var offsetY: number;

        _myGrid.touchEnabled = true;
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);

        function startMove(e: egret.TouchEvent): void {

            offsetX = e.stageX - _myGrid.x;
            offsetY = e.stageY - _myGrid.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
            console.log("start:" + this.name);
        }
        function onMove(e: egret.TouchEvent): void {
            _myGrid.x = e.stageX - offsetX;
            _myGrid.y = e.stageY - offsetY;
        }
        function stopMove(e: egret.TouchEvent): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
    }

    /**
     * 渲染过滤器效果测试
     */
    private filterTest() {
        var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        container.x = 200;
        container.y = 200;
        this.addChild(container);
        var _myGrid = new MyGrid();
        container.addChild(_myGrid);

        _myGrid.touchEnabled = true;
        _myGrid.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, this);

        function onClick(): void {
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

        var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
            strength, quality, inner, knockout);

        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ]
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);

        var blurFliter = new egret.BlurFilter(10, 10);

        bmp.filters = [glowFilter, colorFlilter, blurFliter];
    }
    /**
     * 文本以及效果点击测试
     */
    private textFieldTest() {
        var text: egret.TextField = new egret.TextField();

        text.textFlow = new Array<egret.ITextElement>(
            { text: "This is a hyperlink", style: { "href": "event:text event triggered" } },
            { text: "\n This is a hyperlink", style: { "href": "http://www.egret.com/" } }
            , { text: "\n This is just a text", style: {} }
        );
        text.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
            console.log(evt.text);
        }, this);

        text.touchEnabled = true;

        this.addChild(text);
    }
    /**
     * 网页调试日志测试
     */
    private egretLogTest() {

        egret.log(".........---");
    }

    private _video: egret.Video;
    private _pauseTime: number = 0;
    private loadVideo() {
        this._video = new egret.Video();
        this._video.x = 0;                       //设置视频坐标x
        this._video.y = 0;                       //设置视频坐标y
        this._video.width = 640;                 //设置视频宽
        this._video.height = 320;                //设置视频高
        this._video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        this._video.poster = "resource/assets/egret_icon.png"; //设置loding图
        // this._video.load("http://media.w3.org/2010/05/sintel/trailer.mp4");
        this._video.load("http://www.w3school.com.cn/example/html5/mov_bbb.ogg");
        //http://www.w3school.com.cn/example/html5/mov_bbb.ogg
        this.addChild(this._video);              //将视频添加到舞台


        this._video.addEventListener(egret.Event.COMPLETE, function (e) {
            console.log("complete");
        }, this);
        // //监听视频加载完成
        // this._video.once(egret.Event.COMPLETE,this.onLoad,this);
        // //监听视频加载失败
        // this._video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
    }
    //播放
    private play(): void {
        this.stop();

        this._video.play(this._pauseTime, false);
        this._video.addEventListener(egret.Event.ENDED, this.onComplete, this);
    }
    //停止
    private stop(): void {
        this._video.pause();
    }
    //播放完成
    private onComplete(e: egret.Event): void {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);

        this.setAllAbled(false);
    }

    private changeScreen(): void {
        if (!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    }
    /*** 本示例关键代码段结束 ***/

    /** 以下为 UI 代码 **/
    private _playTxt: egret.TextField;
    private _pauseTxt: egret.TextField;
    private _stopTxt: egret.TextField;
    private _fullTxt: egret.TextField;

    private initCtr(): void {
        var _video: egret.Video = this._video;
        var rap: number = this._video.width / 4 + 5;
        var rapH: number = 100;

        //play
        var playTxt: egret.TextField = this._playTxt = new egret.TextField();
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
        var stopTxt: egret.TextField = this._stopTxt = new egret.TextField();
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
        var pauseTxt: egret.TextField = this._pauseTxt = new egret.TextField();
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
        var fullTxt: egret.TextField = this._fullTxt = new egret.TextField();
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
    }

    private setAllAbled(isPlaying: boolean): void {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
        this.setTextAbled(this._fullTxt, isPlaying);
    }

    private setTextAbled(text: egret.TextField, touchEnabled: boolean): void {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

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

        let exercise;
        exercise = new TSLang_Exercise01();
        // exercise = new TSLang_Exercise02();
        exercise.Exercise();
    }

    private async runGame() {
        console.log("startTime:" + egret.getTimer());
        await this.loadResource()
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
    }


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

    private spineXiaoChuanTest() {
        var dragonBonesData = RES.getRes("xiaochuan_ske_json");
        var textureData = RES.getRes("xiaochuan_tex_json");
        var texture = RES.getRes("xiaochuan_tex_png");

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
        // let egretFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        egretFactory.parseDragonBonesData(dragonBonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);

        let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("armatureName");

        this.addChild(armatureDisplay);
        armatureDisplay.x = 200;
        armatureDisplay.y = 1500;
        // armatureDisplay.scaleX = 0.5;
        // armatureDisplay.scaleY = 0.5;
        armatureDisplay.animation.play("animation", 0);
    }

    private async waitTime(delay: number) {
        setTimeout('dragonBonesTest()', 2000);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            await RES.loadGroup("sounds", 1);
            await RES.loadGroup("robot", 2);
            await RES.loadGroup("xiaochuan", 3);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW + 200;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }


}