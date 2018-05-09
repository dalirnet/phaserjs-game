const Animation = require("../../animation");
const idle      = require("./object/idle");
const jump      = require("./object/jump");

class PlayerAnimationClass extends Animation {
    constructor(scene) {
        // call super
        super(scene);

        // init may var
        this.target = this.scene.game.player;

        // call animation creator
        this.idleCreate();
        this.jumpCreate();

        /* comment after debug animation */
        this.addAnimationEditor("idle");
        /* _____________________________ */
    }

    idleCreate() {
        let config = [
            ["headGroup", ["rotation", "y"]],
            ["upperBodyGroup", ["y"]],
            ["leftHandGroup", ["rotation"]],
            ["rightHandGroup", ["rotation"]],
            ["leftFootGroup", ["rotation"]],
            ["rightFootGroup", ["rotation"]],
            ["leftFootBottom", ["rotation"]],
            ["rightFootBottom", ["rotation"]]
        ];

        // add this animation
        // {animateKey:string,animateFrame:object,animateTime:int,AnimateLoop:int,animateDelay:int,animateConfig:array}
        this.addAnimate("idle", idle, 1000, 8, -1, 200, config);
    }

    jumpCreate() {
        let config = [
            ["headGroup", ["rotation"]],
            ["upperBodyGroup", ["rotation"]],
            ["leftHandBottom", ["rotation"]],
            ["rightHandBottom", ["rotation"]]
        ];

        // add this animation
        // {animateKey:string,animateFrame:object,animateTime:int,AnimateLoop:int,animateDelay:int,animateConfig:array}
        this.addAnimate("jump", jump, 1000, 6, -1, 1000, config);
    }

    /* comment after debug animation */
    addAnimationEditor(key) {
        const AnimationEditor = require("../../animationEditor");
        this.editor           = new AnimationEditor(this, key);
    }

    /* _____________________________ */
}

module.exports = PlayerAnimationClass;