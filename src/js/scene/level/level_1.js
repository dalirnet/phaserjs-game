const Level  = require("../../class/level");
const helper = require("../../helper");

class Level_1 extends Level {
    preload() {
        super.preload();
    }

    create() {
        // call super
        super.create();

        // init var
        let that = this;


        // init game Space
        this.initGameSpace();

        // add tile
        this.addBaseTile("_0_11");
        this.addBaseTile();
        this.addBaseTile();
        this.addMainTile("_1_00", () => {

        });
        this.addBaseTile();
        this.addBaseTile();
        this.addBaseTile();

        this.addMainTile("_2_00", () => {


        });

        // add player to game space
        this.addPlayer(0);

        // draggable game space
        this.gameSpaceDraggable();

        // show state
        this.showState();

        //this.animation.loadEditor();
    }

    update() {
        super.update();
        // this.parent.rotation += 0.05;

        // this.game.player.bodyGroup.x += 0.5;
    }

}

module.exports = Level_1;