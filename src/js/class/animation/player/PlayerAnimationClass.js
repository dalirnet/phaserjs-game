const Animation = require("../../animation");
const idle      = require("./object/idle");

class PlayerAnimationClass extends Animation {
    constructor(scene) {
        // call super
        super(scene);

        // init may var
        this.target = this.scene.game.player;

        // call animation creator
        this.idleCreate();

        /* comment after debug animation */
        this.addAnimationEditor("idle");
        /* _____________________________ */
    }

    idleCreate() {
        let config = [
            ["headGroup", ["rotation"]],
            ["upperBodyGroup", ["rotation"]],
            ["leftHandBottom", ["rotation"]],
            ["rightHandBottom", ["rotation"]]
        ];

        // add this animation
        this.addAnimate("idle", idle, 1, 10, -1, 1000, config);
    }

    /* comment after debug animation */
    addAnimationEditor(key) {
        const AnimationEditor = require("../../animationEditor");
        this.editor           = new AnimationEditor(this, key);
    }

    /* _____________________________ */
}

module.exports = PlayerAnimationClass;