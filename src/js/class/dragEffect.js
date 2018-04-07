const helper = require("../helper");

class DragEffect {

    constructor(scene) {
        // init may var
        this.scene = scene;
        this.color = helper.intColor("#020723");
    }

    loadSpace() {
        this.dragXStart = this.scene.game.add.graphics(0, 0);
        this.dragXEnd   = this.scene.game.add.graphics(this.scene.game.width, 0);
    }

    onDragStart(x, y) {
        // right to left
        this.dragXStart.clear();
        this.dragXStart.beginFill(this.color, 0.7);
        this.dragXStart.moveTo(0, 0);
        this.dragXStart.quadraticCurveTo(x + 10, y, 0, this.scene.game.height);
        this.dragXStart.endFill();
        this.dragXStart.width = 0;
        this.dragXStart.alpha = 0;

        // left to right
        this.dragXEnd.clear();
        this.dragXEnd.beginFill(this.color, 0.7);
        this.dragXEnd.moveTo(0, 0);
        this.dragXEnd.quadraticCurveTo(((this.scene.game.width - x) + 10) * -1, y, 0, this.scene.game.height);
        this.dragXEnd.endFill();
        this.dragXEnd.width = 0;
        this.dragXEnd.alpha = 0;
    }

    curveUpdateStart(x) {
        this.dragXStart.width = ((Math.abs(x) * (this.scene.game.width * 0.05)) / this.scene.game.width) * (this.scene.game.screenScale / 2);
        this.dragXStart.alpha = Math.abs(x) / this.scene.game.width;
    }

    curveUpdateEnd(x) {
        this.dragXEnd.width = ((Math.abs(x) * (this.scene.game.width * 0.05)) / this.scene.game.width) * (this.scene.game.screenScale / 2);
        this.dragXEnd.alpha = Math.abs(x) / this.scene.game.width;
    }

    resetCurve() {
        this.scene.game.add.tween(this.dragXStart).to({width: 0, alpha: 0}, 100, "Linear", true);
        this.scene.game.add.tween(this.dragXEnd).to({width: 0, alpha: 0}, 100, "Linear", true);
    }

}

module.exports = DragEffect;