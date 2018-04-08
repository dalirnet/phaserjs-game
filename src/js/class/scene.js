const Notify     = require("./notify");
const DragEffect = require("./dragEffect");
const Animation  = require("./animation");
const helper     = require("../helper");

class Scene {

    constructor(game) {
        // init may var
        this.game                  = game;
        this.coverCoinsUpAnimation = 20;
        this.padding               = 7;

        // load notify instance
        this.notify = new Notify(this);

        // load dragEffect instance
        this.dragEffect = new DragEffect(this);

        // load animation instance
        this.animation = new Animation(this);
    }

    preload(loadAssets = true, loadPlayer = true) {

        // init my var
        let that                  = this;
        this.imgObj               = {};
        this.isPopupOpen          = false;
        this.saveCoins            = 0;
        this.coinAmountUpdateNeed = false;
        if (this.game.player.saveCoins > this.coverCoinsUpAnimation) {
            this.saveCoins = this.game.player.saveCoins - this.coverCoinsUpAnimation;
        }
        this.stateBounds = {
            radius: 30,
            width : {
                size: this.game.world.width,
                one : 0,
                two : this.game.world.width
            },
            height: {
                size: this.game.world.height,
                one : 0,
                two : this.game.world.height
            }
        };

        // clear all notification
        this.notify.clear();

        this.game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.backgroundColor       = "#000623";
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVeritcally   = true;

        // fullScreen request
        //this.input.onTap.add(this.startFullScreen, this);

        // assets load
        if (loadAssets) {
            this.game.load.image("backgroundStar", "dist/image/star.png");
            this.game.load.image("background", "dist/image/background.png");
            this.game.load.image("popupFrame", "dist/image/popupFrame.png");
            this.game.load.image("coinBox_1", "dist/image/coinBox_1.png");
            this.game.load.image("coinBox_2", "dist/image/coinBox_2.png");
            this.game.load.image("coinWithStroke", "dist/image/coinWithStroke.png");
            this.game.load.atlasJSONHash("btn", "dist/image/btn.png", "dist/json/btn.json");
        }

        // load player
        if (loadPlayer) {
            this.game.player.preload();
        }

        // calc scale for all image loaded
        this.game.load.onFileComplete.add(function (e, r) {
            helper.loadingProcess(e);
            let thisObject   = that.game.cache.getItem(r, Phaser.Cache.IMAGE);
            that.imgObj[r]   = {
                s: Math.round(((Math.round((1 / ((thisObject.base.width / thisObject.base.height) / that.game.screenScale)) * 100) / 100) / thisObject.frameData._frames.length) * 100) / 100,
                w: thisObject.base.width,
                h: thisObject.base.height,
            };
            thisObject.scale = that.imgObj[r].s;
        });
    }

    create(isPopupType = false) {
        var that = this;
        this.backGroundGradientCreator();

        // add background star
        this.backgroundStar = {};
        this.backgroundStar = this.game.add.tileSprite(this.game.world.centerX, 0, this.game.width / (this.game.screenScale * 0.2), (this.game.height * 0.8) / (this.game.screenScale * 0.2), "backgroundStar");
        this.backgroundStar.anchor.set(0.5, 0);
        this.backgroundStar.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);

        // add background
        this.background = this.game.add.tileSprite(this.game.world.centerX, 0, this.game.width / (this.game.screenScale * 0.2), this.imgObj["background"].h, "background");
        this.background.anchor.set(0.5, 1);
        this.background.y        = this.game.height * 0.88;
        this.game.groundPosition = this.background.y - (15 * this.game.screenScale);
        this.background.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);

        // load space for drag effect
        this.dragEffect.loadSpace();

        if (isPopupType) {
            // add popup back
            this.addPopUpStage();

            // save coins box
            this.addPlayerSaveCoinsBox(this.game.world.centerX, this.stateBounds.height.two);
        }
        else {
            // player name box
            this.addPlayerNameBox();

            // save coins box
            this.addPlayerSaveCoinsBox(this.padding * this.game.screenScale, (this.playerNameBox.height + this.playerNameBox.y) + (this.padding * this.game.screenScale), {x: 0, y: 0});
        }

        // update save coins value
        this.updatePlayerSaveCoins(this.game.player.saveCoins);
    }

    addMainBtn() {
        var that = this;

        // add shop scene btn
        this.shopSceneBtn = this.game.add.button(this.game.width - (7 * this.game.screenScale), this.game.height - (7 * this.game.screenScale), "btn", () => {
            that.startState("Shop");
        }, null, "_01_0", "_01_1", "_01_0", "_01_1");
        this.shopSceneBtn.anchor.set(1, 1);
        this.shopSceneBtn.input.pixelPerfectClick = true;
        this.shopSceneBtn.input.pixelPerfectOver  = true;
        this.shopSceneBtn.input.priorityID        = 200;
        this.shopSceneBtn.scale.setTo(this.game.screenScale * 0.4, this.game.screenScale * 0.4);

        // add select level scene btn
        this.levelSceneBtn = this.game.add.button((8 * this.game.screenScale), this.game.height - (7 * this.game.screenScale), "btn", () => {
            that.startState("Level");
        }, null, "_03_0", "_03_1", "_03_0", "_03_1");
        this.levelSceneBtn.anchor.set(0, 1);
        this.levelSceneBtn.input.pixelPerfectClick = true;
        this.levelSceneBtn.input.pixelPerfectOver  = true;
        this.levelSceneBtn.input.priorityID        = 200;
        this.levelSceneBtn.scale.setTo(this.game.screenScale * 0.4, this.game.screenScale * 0.4);
    }

    addPopUpStage() {
        // init var
        this.isPopupOpen = true;

        // calc state height bounds
        this.stateBounds.height.size = this.game.world.height * 0.8;
        this.stateBounds.height.one  = this.game.world.height * 0.1;
        this.stateBounds.height.two  = this.game.world.height * 0.9;

        // calc state width bounds
        this.stateBounds.width.size = this.stateBounds.height.size;
        this.stateBounds.width.one  = (this.game.world.width - this.stateBounds.height.size) / 2;
        this.stateBounds.width.two  = this.stateBounds.width.one + this.stateBounds.width.size;

        // calc responsive
        if (!this.game.scale.isGameLandscape) {
            this.stateBounds.width.size = this.game.world.width * 0.8;
            this.stateBounds.width.one  = this.game.world.width * 0.1;
            this.stateBounds.width.two  = this.game.world.width * 0.9;
        } else if (!this.game.device.desktop) {
            this.stateBounds.width.size = this.game.world.width * 0.6;
            this.stateBounds.width.one  = this.game.world.width * 0.2;
            this.stateBounds.width.two  = this.game.world.width * 0.8;
        }

        this.popupBackground         = this.game.add.graphics(0, 0);
        this.popupBackground.hitArea = 0;
        this.popupBackground.beginFill(helper.intColor("#010a26"), 0.8);
        this.popupBackground.moveTo(0, 0);
        this.popupBackground.lineTo(this.game.world.width, 0);
        this.popupBackground.lineTo(this.game.world.width, this.game.world.height);
        this.popupBackground.lineTo(0, this.game.world.height);
        this.popupBackground.lineTo(0, this.stateBounds.height.size / 2);
        this.popupBackground.lineTo(this.stateBounds.width.one, this.stateBounds.height.size / 2);
        this.popupBackground.lineTo(this.stateBounds.width.one, this.stateBounds.height.two - this.stateBounds.radius);
        this.popupBackground.quadraticCurveTo(this.stateBounds.width.one, this.stateBounds.height.two, this.stateBounds.width.one + this.stateBounds.radius, this.stateBounds.height.two);
        this.popupBackground.lineTo(this.stateBounds.width.two - this.stateBounds.radius, this.stateBounds.height.two);
        this.popupBackground.quadraticCurveTo(this.stateBounds.width.two, this.stateBounds.height.two, this.stateBounds.width.two, this.stateBounds.height.two - this.stateBounds.radius);
        this.popupBackground.lineTo(this.stateBounds.width.two, this.stateBounds.height.one + this.stateBounds.radius);
        this.popupBackground.quadraticCurveTo(this.stateBounds.width.two, this.stateBounds.height.one, this.stateBounds.width.two - this.stateBounds.radius, this.stateBounds.height.one);
        this.popupBackground.lineTo(this.stateBounds.width.one + this.stateBounds.radius, this.stateBounds.height.one);
        this.popupBackground.quadraticCurveTo(this.stateBounds.width.one, this.stateBounds.height.one, this.stateBounds.width.one, this.stateBounds.height.one + this.stateBounds.radius);
        this.popupBackground.lineTo(this.stateBounds.width.one, this.stateBounds.height.size / 2);
        this.popupBackground.lineTo(0, this.stateBounds.height.size / 2);
        this.popupBackground.endFill();

        // popup frame set
        this.popupFrameTop = this.game.add.image(this.game.world.centerX, this.stateBounds.height.one - this.game.screenScale, "popupFrame");
        this.popupFrameTop.anchor.set(0.5, 1);
        this.popupFrameTop.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);
        this.popupFrameBottom = this.game.add.image(this.game.world.centerX, this.stateBounds.height.two + this.game.screenScale, "popupFrame");
        this.popupFrameBottom.anchor.set(0.5, 1);
        this.popupFrameBottom.angle = 180;
        this.popupFrameBottom.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);
        this.popupFrameLeft = this.game.add.image(this.stateBounds.width.one - this.game.screenScale, this.game.world.centerY, "popupFrame");
        this.popupFrameLeft.anchor.set(0.5, 1);
        this.popupFrameLeft.angle = -90;
        this.popupFrameLeft.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);
        this.popupFrameRight = this.game.add.image(this.stateBounds.width.two + this.game.screenScale, this.game.world.centerY, "popupFrame");
        this.popupFrameRight.anchor.set(0.5, 1);
        this.popupFrameRight.angle = 90;
        this.popupFrameRight.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);

        // popup coinBox set
        this.popupCoinBox = this.game.add.image(this.stateBounds.width.one, this.stateBounds.height.two, "coinBox_1");
        this.popupCoinBox.anchor.set(0.3, 0.8);
        this.popupCoinBox.scale.setTo(this.game.screenScale * 0.2, this.game.screenScale * 0.2);

        // rewrite bounds for responsive size
        this.stateBounds.width._size  = this.stateBounds.width.size;
        this.stateBounds.width._one   = this.stateBounds.width.one;
        this.stateBounds.width._two   = this.stateBounds.width.two;
        this.stateBounds.height._size = this.stateBounds.height.size;
        this.stateBounds.height._one  = this.stateBounds.height.one;
        this.stateBounds.height._two  = this.stateBounds.height.two;
        if (!this.game.device.desktop) {
            if (this.game.scale.isGameLandscape) {
                this.stateBounds.width._size = this.stateBounds.height.size;
                this.stateBounds.width._one  = (this.game.world.width - this.stateBounds.height.size) / 2;
                this.stateBounds.width._two  = this.stateBounds.width._one + this.stateBounds.width._size;
            }
            else {
                this.stateBounds.height._size = this.stateBounds.width.size;
                this.stateBounds.height._one  = (this.game.world.height - this.stateBounds.width.size) / 2;
                this.stateBounds.height._two  = this.stateBounds.height._one + this.stateBounds.height._size;
            }
        }

    }

    addPlayerNameBox() {
        let textWidth       = 60 * this.game.screenScale;
        let textHeight      = 25 * this.game.screenScale;
        let padding         = this.padding * this.game.screenScale;
        this.playerNameBox  = this.game.add.graphics(0, 0);
        this.playerNameText = this.game.make.text(0, 0, this.game.player.name, this.textStyle(12));
        if (this.playerNameText.width > textWidth) {
            textWidth = this.playerNameText.width * 1.2;
        }
        if (this.playerNameText.height > textHeight) {
            textHeight = this.playerNameText.height * 1.1;
        }
        this.playerNameBox.beginFill(helper.intColor("#040a21"), 1);
        this.playerNameBox.drawRoundedRect(0, 0, textWidth, textHeight, 10);
        this.playerNameBox.endFill();
        this.playerNameBox.addChild(this.playerNameText);
        this.playerNameBox.x = padding;
        this.playerNameBox.y = padding;
        this.playerNameText.setTextBounds(0, 2 * this.game.screenScale, textWidth, textHeight);
    }

    // update player save coin
    updatePlayerSaveCoins(value, type = true) {
        // true for + || false for -
        if (type) {
            this.saveCoins += value;
        }
        else {
            this.saveCoins -= value;
        }
        if (this.saveCoinsText) {
            this.coinAmountUpdateNeed = true;
        }
    }


    addPlayerSaveCoinsBox(x = 0, y = 0, anchor = {x: 0.5, y: 0.5}) {
        let padding       = this.padding * this.game.screenScale;
        this.saveCoinsBox = this.game.add.graphics(0, 0);
        this.saveCoinsBox.anchor.set(anchor.x, anchor.y);
        this.coinAmountImage = this.game.make.image(0, 0, "coinWithStroke");
        this.coinAmountImage.anchor.set(0.5, 0.5);
        this.saveCoinsBox.addChild(this.coinAmountImage);
        this.saveCoinsText = this.game.make.text(0, 0, this.saveCoins, this.textStyle(10));
        this.saveCoinsBox.beginFill(helper.intColor("#040a21"), 1);
        this.saveCoinsBox.drawRoundedRect(0, 0, this.saveCoinsText.width + (padding * 4), this.saveCoinsText.height + (padding * 1.7), 10);
        this.saveCoinsBox.endFill();
        this.saveCoinsText.setTextBounds(0, 2 * this.game.screenScale, this.saveCoinsBox.width, this.saveCoinsBox.height * 0.95);
        this.saveCoinsBox.addChild(this.saveCoinsText);
        this.saveCoinsBox.x    = x - (this.saveCoinsBox.width * anchor.x);
        this.saveCoinsBox.y    = y - (this.saveCoinsBox.height * anchor.y);
        this.coinAmountImage.x = this.saveCoinsBox.width * 0.5;
        this.coinAmountImage.y = this.saveCoinsBox.height;
        this.coinAmountImage.scale.setTo(this.game.screenScale * 0.3, this.game.screenScale * 0.3);
    }

    backGroundGradientCreator() {
        let bitmap   = this.game.add.bitmapData(this.game.width, this.game.height);
        let gradient = bitmap.context.createLinearGradient(0, 0, 0, this.game.height);
        gradient.addColorStop(0, "#020723");
        //gradient.addColorStop(0, "#030f4b");
        gradient.addColorStop(0.48, "#1d58aa");
        gradient.addColorStop(0.56, "#1d58aa");
        gradient.addColorStop(0.8, "#0d337b");
        gradient.addColorStop(1, "#000623");
        bitmap.context.fillStyle = gradient;
        bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
        this.backgroundGradient               = this.game.add.sprite(0, 0, bitmap);
        this.backgroundGradient.fixedToCamera = true;
    }

    startFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (!this.game.scale.isFullScreen && this.game.scale.isGameLandscape) {
            this.game.scale.startFullScreen(false);
        }
    }

    startState(stateName) {
        if (this.game.state.current === stateName) {
            return;
        }
        helper.domObject("loading", true, "display", false);
        let that = this;
        setTimeout(function () {
            that.game.state.start(stateName);
        }, 500);
    }

    showState(renderMainBtn = true) {
        if (renderMainBtn) {
            this.addMainBtn();
        }
        helper.domObject("loading", false, "display", false);
        helper.domObject("game", true);
    }

    textStyle(size = 20, color = "#fff") {
        return {
            fill        : color,
            font        : size * this.game.screenScale + "px gameWebFont",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        }
    }

    coinsValueUpdate() {
        if (this.coinAmountUpdateNeed) {
            let value = Number(this.saveCoinsText.text);
            if (value < this.game.player.saveCoins) {
                this.saveCoinsText.setText(value + 1);
            }
            else if (value > this.game.player.saveCoins) {
                this.saveCoinsText.setText(value - 1);
            }
            else {
                this.coinAmountUpdateNeed = false
            }
        }
    }

    update() {
        this.backgroundStar.tilePosition.y -= 1;
        this.backgroundStar.tilePosition.x += 1;
        this.background.tilePosition.x -= 0.8;
        this.coinsValueUpdate();
    }
}

module.exports = Scene;