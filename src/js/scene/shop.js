const Scene  = require("../class/scene");
const helper = require("../helper");


class Shop extends Scene {
    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "فروشگاه", this.textStyle(20));
        this.text.anchor.set(0.5, 0.5);

        // show state
        this.showState();
    }

}

module.exports = Shop;