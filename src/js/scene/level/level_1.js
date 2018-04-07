const Level  = require("../../class/level");
const helper = require("../../helper");

class Level_1 extends Level {
    preload() {
        super.preload();
    }

    create() {
        super.create();

        // init player
        this.game.player.create(this);
        this.game.player.idle();
        

        // init game Space
        this.initGameSpace();

        // add tile
        this.addBaseTile();
        this.addBaseTile();
        this.addBaseTile();
        this.addMainTile("_1_00");
        this.addBaseTile();
        this.addBaseTile();
        this.addMainTile("_2_00");

        // add player to game space
        this.addPlayer();

        this.movePlayer();

        // draggable game space
        this.gameSpaceDraggable();

        // show state
        this.showState();
    }

    update() {
        super.update();
        // this.parent.rotation += 0.05;

        // this.game.player.bodyGroup.x += 0.5;
    }

}

module.exports = Level_1;