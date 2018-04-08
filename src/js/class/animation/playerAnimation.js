const Animation = require("../animation");
const helper    = require("../../helper");

class PlayerAnimation extends Animation {
    constructor(scene) {
        // call super
        super(scene);

        // init may var
        this.target = this.scene.game.player;

        // call animation creator
        this.idleCreate();

        // load editor for debug
        this.addAnimationEditor("idle");
    }

    idleCreate() {
        let config = [
            ["bodyGroup", ["rotation", "x", "y"]]
        ];

        // add this animation
        this.addAnimate("idle", 2, 5, -1, config);
    }

    // comment this method for protected build
    addAnimationEditor(key) {
        const AnimationEditor = require("./animationEditor");
        this.editor           = new AnimationEditor(this, key);
    }
}

module.exports = PlayerAnimation;