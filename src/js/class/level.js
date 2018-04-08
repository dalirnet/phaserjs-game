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
        this.gameTile       = {};
        this.tileBaseIndex  = 0;
        this.tileLeftMargin = 10 * this.game.screenScale;
        this.leftSpace      = this.tileLeftMargin * 4;
    }

    create() {
        super.create();

        // create player
        this.game.player.create(this);
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
            that.movePlayer(thisIndex);
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
        this.movePlayer(tileIndex);

        // call player animation class
        this.game.player.initAnimation();
    }

    jumpPlayer(id = 0) {

        let tilePos = this.gameTile[`tileBase${id}`];


        // this.game.player.idle(false);
        this.game.add.tween(this.game.player.headGroup).to({rotation: 0.1}, 200, "Linear", true);

        this.game.add.tween(this.game.player.leftFootGroup).to({rotation: -0.2}, 200, "Linear", true);
        this.game.add.tween(this.game.player.rightFootGroup).to({rotation: -0.2}, 200, "Linear", true);

        this.game.add.tween(this.game.player.leftFootBottom).to({rotation: 0.4}, 200, "Linear", true);
        this.game.add.tween(this.game.player.rightFootBottom).to({rotation: 0.4}, 200, "Linear", true);

        this.game.add.tween(this.game.player.upperBodyGroup).to({
            rotation: 0.03,
            y       : this.game.player.upperBodyGroup.y + 20
        }, 200, "Linear", true);

        this.game.add.tween(this.game.player.leftHandGroup).to({rotation: 0.3}, 200, "Linear", true);
        this.game.add.tween(this.game.player.rightHandGroup).to({rotation: 0.3}, 200, "Linear", true);

        this.game.add.tween(this.game.player.leftHandBottom).to({rotation: -0.4}, 200, "Linear", true);
        this.game.add.tween(this.game.player.rightHandBottom).to({rotation: -0.4}, 200, "Linear", true);

        let pos = {
            x: this.game.player.bodyGroup.x + 150,
            y: this.game.player.bodyGroup.y - 80
        };

        this.game.add.tween(this.game.player.bodyGroup).to({
            rotation: 0,
            x       : pos.x,
            y       : pos.y
        }, 300, "Linear", true, 300);


        // this.game.add.tween(this.game.player.bodyGroup).to({y: this.game.player.bodyGroup.y - 80}, 200, "Linear", true);

    }

    movePlayer(id = 0) {
        let tilePos                  = this.gameTile[`tileBase${id}`];
        this.game.player.bodyGroup.x = tilePos.x + (tilePos.width * 0.4);
        this.game.player.bodyGroup.y = tilePos.y - (tilePos.height * 0.5);
    }

    update() {
        super.update();
    }
}

module.exports = Level;