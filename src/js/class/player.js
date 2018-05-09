const PlayerAnimationClass = require("./animation/player/PlayerAnimationClass");
const helper               = require("../helper");

class Player {
    constructor(game) {
        this.game        = game;
        this.name        = "";
        this.saveCoins   = 0;
        this.activeLevel = 1;
        this.bodyType    = 1;
        this.faceType    = 1;
        this.beardType   = 4;
        this.eyesType    = 1;
        this.optic       = 0;
        this.idleAnimate = [];

        // animation handel
        this.animationHandel = false;
    }

    preload() {
        // load player spriteSheet
        this.game.load.atlasJSONHash("player", "dist/image/player.png", "dist/json/player.json");
    }

    create(state) {
        this.state     = state;
        // player object
        this.bodyGroup = this.game.add.sprite(0, 0, "player", "group_body");
        this.bodyGroup.anchor.setTo(0.5, 1);

        this.lowerBodyGroup  = this.game.make.sprite(28, 375, "player", "group_lowerBody");
        this.rightFootGroup  = this.game.make.sprite(60, 5, "player", "group_rightFoot");
        this.rightFootBottom = this.game.make.sprite(0, 132, "player", `body_${this.bodyType}_foot_right_bottom`);
        this.rightFootTop    = this.game.make.sprite(0, 0, "player", `body_${this.bodyType}_foot_right_top`);
        this.leftFootGroup   = this.game.make.sprite(0, 0, "player", "group_leftFoot");
        this.leftFootBottom  = this.game.make.sprite(3, 142, "player", `body_${this.bodyType}_foot_left_bottom`);
        this.leftFootTop     = this.game.make.sprite(0, 0, "player", `body_${this.bodyType}_foot_left_top`);
        this.upperBodyGroup  = this.game.make.sprite(0, 0, "player", "group_upperBody");
        this.rightHandGroup  = this.game.make.sprite(137, 205, "player", "group_rightHand");
        this.rightHandBottom = this.game.make.sprite(9, 104, "player", `body_${this.bodyType}_hand_right_bottom`);
        this.rightHandTop    = this.game.make.sprite(0, 0, "player", `body_${this.bodyType}_hand_right_top`);
        this.body            = this.game.make.sprite(0, 144, "player", `body_${this.bodyType}_body`);
        this.headGroup       = this.game.make.sprite(27, 0, "player", "group_head");
        this.face            = this.game.make.sprite(24, 29, "player", `face_${this.faceType}_${this.beardType}_${this.eyesType}`);
        this.opticOver       = this.game.make.sprite(24, 29, "player", `face_optic`);
        if (this.optic !== 1) {
            this.opticOver.alpha = 0;
        }
        this.headOver       = this.game.make.sprite(0, 0, "player", `body_${this.bodyType}_head_over`);
        this.leftHandGroup  = this.game.make.sprite(0, 193, "player", "group_leftHand");
        this.leftHandBottom = this.game.make.sprite(2, 107, "player", `body_${this.bodyType}_hand_left_bottom`);
        this.leftHandTop    = this.game.make.sprite(0, 0, "player", `body_${this.bodyType}_hand_left_top`);


        this.addToParent(this.lowerBodyGroup, this.bodyGroup, 72, 28);
        this.addToParent(this.rightFootGroup, this.lowerBodyGroup, 32, 31);
        this.addToParent(this.rightFootBottom, this.rightFootGroup, 30, 23);
        this.addToParent(this.rightFootTop, this.rightFootGroup, 0, 0);
        this.addToParent(this.leftFootGroup, this.lowerBodyGroup, 40, 30);
        this.addToParent(this.leftFootBottom, this.leftFootGroup, 38, 23);
        this.addToParent(this.leftFootTop, this.leftFootGroup, 0, 0);
        this.addToParent(this.upperBodyGroup, this.bodyGroup, 100, 400);
        this.addToParent(this.rightHandGroup, this.upperBodyGroup, 23, 30);
        this.addToParent(this.rightHandBottom, this.rightHandGroup, 13, 18);
        this.addToParent(this.rightHandTop, this.rightHandGroup, 0, 0);
        this.addToParent(this.body, this.upperBodyGroup, 100, 261);
        this.addToParent(this.leftHandGroup, this.upperBodyGroup, 40, 27);
        this.addToParent(this.headGroup, this.upperBodyGroup, 83, 170);
        this.addToParent(this.face, this.headGroup, 0, 0);
        this.addToParent(this.opticOver, this.headGroup, 0, 0);
        this.addToParent(this.headOver, this.headGroup, 0, 0);
        this.addToParent(this.leftHandBottom, this.leftHandGroup, 28, 15);
        this.addToParent(this.leftHandTop, this.leftHandGroup, 0, 0);

        // scale player object
        this.bodyGroup.scale.setTo(this.game.screenScale * 0.16, this.game.screenScale * 0.16);
    }

    initAnimation() {
        // add animation class
        this.animation = new PlayerAnimationClass(this.state);

        // handel animation object
        this.animationHandel = true;
    }

    checkForAnimationHandel() {
        if (!this.animationHandel) {
            this.initAnimation();
        }
    }

    idle(status = true, resetFrame = false) {
        this.checkForAnimationHandel();
        if (status) {
            this.animation.start("idle");
        }
        else {
            this.animation.stop("idle", resetFrame);
        }
    }

    jump(status = true, resetFrame = false) {
        this.checkForAnimationHandel();
        if (status) {
            this.animation.start("jump");
        }
        else {
            this.animation.stop("jump", resetFrame);
        }
    }

    addToParent(sprite, parent, anchorX, anchorY) {
        parent.addChild(sprite);
        sprite.anchor.setTo(anchorX / sprite.width, anchorY / sprite.height);
        sprite.x = ((parent.width * parent.anchor.x) * -1) + (sprite.x + (sprite.width * sprite.anchor.x));
        sprite.y = ((parent.height * parent.anchor.y) * -1) + (sprite.y + (sprite.height * sprite.anchor.y));
    }

    setName(name) {
        this.name = name;
    }

    setSaveCoins(coins) {
        this.saveCoins = coins;
    }

    setActiveLevel(level) {
        this.activeLevel = level;
    }
}

module.exports = Player;