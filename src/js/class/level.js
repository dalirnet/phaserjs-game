const Scene  = require("./scene");
const helper = require("../helper");

class Level extends Scene {
    preload() {
        // call super
        super.preload();

        // load image
        this.game.load.atlasJSONHash("tile", "dist/image/tile.png", "dist/json/tile.json");
        this.game.load.atlasJSONHash("tileBase", "dist/image/tileBase.png", "dist/json/tileBase.json");

        // init my var
        this.gameTile          = {};
        this.tileBaseIndex     = 0;
        this.tileLeftMargin    = 10 * this.game.screenScale;
        this.leftSpace         = this.tileLeftMargin * 4;
        this.enterTile         = -1;
        this.longJumpTileIndex = [];
        this.moving            = false;
    }

    create() {
        super.create();

        // create player
        this.game.player.create(this);

        // add key control
        let movePlayerToLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        movePlayerToLeft.onDown.add(() => {
            this.movePlayer((this.enterTile - 1), true);
        }, this);

        let movePlayerToRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        movePlayerToRight.onDown.add(() => {
            this.movePlayer((this.enterTile + 1), true);
        }, this);
    }

    initGameSpace() {

        // set default current scale
        this.currentScale = {
            main: this.game.screenScale * 0.3,
            base: this.game.screenScale * 0.45
        };

        // calc responsive
        if (this.game.isMobile) {
            this.currentScale.main = this.game.screenScale * 0.25;
            if (this.game.scale.isGameLandscape) {

            }
        }

        // add game space for transform on x alias
        this.gameSpace = this.game.add.graphics(0, 0);

        // add game play space
        this.gamePlayeSpace   = this.game.add.group();
        this.gamePlayeSpace.y = this.game.groundPosition;
        this.gameSpace.addChild(this.gamePlayeSpace);
    }

    gameSpaceDraggable() {
        // init my var
        let that = this;

        // draw drag space
        this.gameSpace.beginFill(helper.intColor("#000"), 0);
        this.gameSpace.drawRect(0, 0, helper.limitValue(this.gamePlayeSpace.width + (this.tileLeftMargin * 8), this.game.width), this.game.height, 50);
        this.gameSpace.endFill();

        // gameSpace init
        this.gameSpace.inputEnabled            = true;
        this.gameSpace.input.allowVerticalDrag = false;
        this.gameSpace.input.priorityID        = 1;
        this.gameSpace.input.enableDrag();
        this.gameSpace.events.onDragStart.add(function (sprite, pointer) {
            that.dragEffect.onDragStart(pointer.x, pointer.y);
        });
        this.gameSpace.events.onDragUpdate.add(function () {
            if (that.gameSpace.x >= 0) {
                that.dragEffect.curveUpdateStart(that.gameSpace.x);
            }
            else if (Math.abs(that.gameSpace.x) > (that.gameSpace.width - that.game.width)) {
                that.dragEffect.curveUpdateEnd((that.gameSpace.width - that.game.width) - Math.abs(that.gameSpace.x));
            }
        });
        this.gameSpace.events.onDragStop.add(function () {
            that.dragEffect.resetCurve();
            if (that.gameSpace.x >= 0) {
                that.game.add.tween(that.gameSpace).to({x: 0}, 200, "Linear", true);
            }
            else if (Math.abs(that.gameSpace.x) > (that.gameSpace.width - that.game.width)) {
                that.game.add.tween(that.gameSpace).to({x: (that.gameSpace.width - that.game.width) * -1}, 200, "Linear", true);
            }
        });
    }

    addMainTile(id, func = false) {
        let tile = this.game.add.sprite(this.leftSpace, 0, "tile", id);
        tile.anchor.setTo(0, 1);
        tile.scale.setTo(this.currentScale.main, this.currentScale.main);
        tile.inputEnabled            = true;
        tile.input.pixelPerfectClick = true;
        tile.input.pixelPerfectOver  = true;
        tile.input.useHandCursor     = true;
        tile.input.priorityID        = 10;
        tile.events.onInputDown.add(function () {
            if (typeof func === "function") {
                func();
            }
        });

        // add
        this.gamePlayeSpace.add(tile);
        this.gameTile[id] = tile;
        this.longJumpTileIndex.push(this.tileBaseIndex);

        // renew left space
        this.leftSpace += tile.width + this.tileLeftMargin;
    }

    addBaseTile(id = true, func = false) {
        let that      = this;
        let thisIndex = this.tileBaseIndex;

        // default base tile texture
        if (id === true) {
            id = "_0_12";
        }

        let tile = this.game.add.sprite(this.leftSpace, (this.game.rnd.integerInRange(1, 25) * this.game.screenScale) * -1, "tileBase", id);
        tile.anchor.setTo(0, 1);
        tile.scale.setTo(this.currentScale.base, this.currentScale.base);
        tile.inputEnabled            = true;
        tile.input.pixelPerfectClick = true;
        tile.input.pixelPerfectOver  = true;
        tile.input.useHandCursor     = true;
        tile.input.priorityID        = 10;
        tile.events.onInputDown.add(function () {
            if (typeof func === "function") {
                func();
            }
            that.movePlayer(thisIndex, true);
        });

        // add
        this.gamePlayeSpace.add(tile);
        this.gameTile[`tileBase${this.tileBaseIndex}`] = tile;
        this.tileBaseIndex++;

        // renew left space
        this.leftSpace += tile.width + this.tileLeftMargin;
    }

    addPlayer(tileIndex = 0) {
        this.gamePlayeSpace.add(this.game.player.bodyGroup);
        this.movePlayer(tileIndex, false);

        // call player animation class
        this.game.player.initAnimation();

        // run idle animate
        this.game.player.idle();
    }

    jumpPlayer(targetPos, longJump = false) {
        let jumpTime = (longJump ? 600 : 500);
        this.game.player.idle(false, true);
        this.game.player.jump(longJump);
        let currentPos = this.gameTile[`tileBase${this.enterTile}`];
        let startTween = this.game.add.tween(this.game.player.bodyGroup).to({
            x: currentPos.x + ((targetPos.x + (targetPos.width * 0.4) - currentPos.x + (currentPos.width * 0.4)) * 0.5),
            y: targetPos.y - (longJump ? targetPos.height * 1.4 : targetPos.height * 0.8)
        }, (jumpTime * 0.4), Phaser.Easing.Linear.None, true);
        startTween.onComplete.add(() => {
            let endTween = this.game.add.tween(this.game.player.bodyGroup).to({
                x: targetPos.x + (targetPos.width * 0.5),
                y: targetPos.y - (targetPos.height * 0.5)
            }, (jumpTime * 0.6), Phaser.Easing.Linear.None, true);
            endTween.onComplete.add(() => {
                this.game.time.events.add(Phaser.Timer.SECOND / 20, () => {
                    this.game.player.idle();
                    this.moving = false;
                }, this).autoDestroy = true;
            }, this);
        }, this);
    }

    movePlayer(id = 0, jump = true) {
        if (!this.moving) {
            if (id < 0 || id >= this.tileBaseIndex) {
                this.movePlayerWarning();
                return;
            }
            this.moving = true;
            if (Math.abs(id - this.enterTile) === 1) {
                this.game.player.changeDirection((this.enterTile < id ? "toRight" : "toLeft"));
                let targetPos = this.gameTile[`tileBase${id}`];
                if (jump) {
                    this.game.player.changeFaceType(1);
                    this.jumpPlayer(targetPos, (this.enterTile < id ? this.longJumpTileIndex.indexOf(id) !== -1 : this.longJumpTileIndex.indexOf(this.enterTile) !== -1));
                }
                else {
                    this.game.player.bodyGroup.x = targetPos.x + (targetPos.width * 0.5);
                    this.game.player.bodyGroup.y = targetPos.y - (targetPos.height * 0.5);
                    this.moving                  = false;
                }
                this.enterTile = id;
            }
            else {
                this.movePlayerWarning();
            }
        }
    }

    movePlayerWarning() {
        this.game.player.changeFaceType(3);
        this.moving = false;
    }

    update() {
        super.update();
    }
}

module.exports = Level;