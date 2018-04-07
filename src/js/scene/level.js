const Scene  = require("../class/scene");
const helper = require("../helper");


class Level extends Scene {
    preload() {
        super.preload();

        // load image
        this.game.load.atlasJSONHash("tile", "dist/image/tile.png", "dist/json/tile.json");
    }

    create() {
        // call super method
        super.create(true);

        this.frameGroup  = this.game.add.group();
        this.levelFrame  = {};
        this.levelImage  = {};
        this.levelLock   = {};
        let framePadding = 25 * this.game.screenScale;

        // calc responsive
        if (this.game.isMobile) {
            framePadding = 10 * this.game.screenScale;
            if (this.game.scale.isGameLandscape) {
                framePadding = 7 * this.game.screenScale;
            }
        }

        // add group bounds
        this.frameGroup._width  = this.stateBounds.width._size - ((framePadding * 2) * this.game.screenScale);
        this.frameGroup._height = this.stateBounds.height._size - ((framePadding * 2) * this.game.screenScale);
        this.frameGroup.x       = this.stateBounds.width._one + (framePadding * this.game.screenScale);
        this.frameGroup.y       = this.stateBounds.height._one + (framePadding * this.game.screenScale);

        // add level item
        for (let i = 1; i <= 9; i++) {
            this.addLevelItem(i);
        }

        // show state
        this.showState(false);
    }

    addLevelItem(id) {
        let activeLevel   = false;
        this.currentScale = (this.game.screenScale * 0.22);
        let that          = this;

        // calc responsive
        if (this.game.isMobile) {
            if (this.game.scale.isGameLandscape) {
                this.currentScale = this.game.screenScale * 0.16;
            }
            else {
                this.currentScale = this.game.screenScale * 0.2;
            }
        }

        if (id <= this.game.player.activeLevel) {
            activeLevel = true;
        }
        let sort   = {
            x: (id % 3 == 0 ? 2 : (id % 3) - 1),
            y: Math.ceil(id / 3) - 1
        };
        let bounds = {
            width : this.frameGroup._width * 0.3,
            height: this.frameGroup._height * 0.3,
            x     : (sort.x * (this.frameGroup._width * 0.05)) + (sort.x * (this.frameGroup._width * 0.3)),
            y     : (sort.y * (this.frameGroup._height * 0.05)) + (sort.y * (this.frameGroup._height * 0.3))
        };

        this.levelFrame[id] = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
        this.levelImage[id] = this.game.add.sprite(0, 0, "tile", `_${id}_00`);
        this.levelImage[id].anchor.setTo(0.5, 1);
        this.levelImage[id].scale.setTo(this.currentScale, this.currentScale);
        this.levelImage[id].alignIn(this.levelFrame[id], Phaser.BOTTOM_CENTER);
        this.levelImage[id].inputEnabled            = true;
        this.levelImage[id].input.pixelPerfectClick = true;
        this.levelImage[id].input.pixelPerfectOver  = true;
        this.levelImage[id].input.useHandCursor     = true;
        this.frameGroup.add(this.levelImage[id]);

        // add lock button over image
        if (!activeLevel) {
            this.levelImage[id].alpha = 0.7;
            let btnImage              = "_05_1";
            if (id % 2 === 0) {
                btnImage = "_06_1";
            }
            this.levelLock[id] = this.game.add.image(0, 0, "btn", btnImage);
            this.levelLock[id].anchor.set(0.5, 0.5);
            this.levelLock[id].scale.setTo(this.currentScale, this.currentScale);
            this.levelLock[id].alignIn(this.levelImage[id], Phaser.CENTER, 10 * this.currentScale, 40 * this.currentScale);
            this.frameGroup.add(this.levelLock[id]);
            this.levelImage[id].events.onInputDown.add(this.alertInactiveLevel, this);
        }
        else {
            this.levelImage[id].events.onInputDown.add(this.startState.bind(this, `Level_${id}`), this);
            if (id == this.game.player.activeLevel) {
                this.game.add.tween(this.levelImage[id].scale).to({
                    x: this.currentScale + (0.025 * this.currentScale),
                    y: this.currentScale + (0.025 * this.currentScale)
                }, 200, "Linear", true).loop(true);
            }
            else {
                this.levelImage[id].alpha = 0.7;
            }
        }
    }

    alertInactiveLevel() {
        this.notify.load("شما مجوز ورود به این مرحله را ندارید!", false);
    }
}

module.exports = Level;