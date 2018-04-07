const Scene  = require("../class/scene");
const helper = require("../helper");


class Boot extends Scene {
    preload() {
        super.preload();

        // load background audio
        this.game.load.audio("background", [
            "dist/audio/background.mp3",
            "dist/audio/background.ogg",
        ]);
    }

    create() {
        // start background audio
        if (!this.backgroundAudio) {
            this.backgroundAudio = this.game.add.audio("background", 0.5, true);
            //this.backgroundAudio.play();
        }

        // call super method
        super.create(false);

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "بوت", this.textStyle(20));
        this.text.anchor.set(0.5, 0.5);

        //this.input.onTap.add(this.startState.bind(this, "level1"), this);

        // show state
        this.showState();
    }

    update() {
        super.update();
    }

}

module.exports = Boot;