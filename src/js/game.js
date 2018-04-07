const Player        = require("./class/player");
const BootScene     = require("./scene/boot");
const ShopScene     = require("./scene/shop");
const LevelScene    = require("./scene/level");
const Level_1_Scene = require("./scene/level/level_1");
const helper        = require("./helper");
const dpr           = window.devicePixelRatio;


const noSleep = new NoSleep();
let endEvent;

class Game extends Phaser.Game {
    constructor(width = window.innerWidth, height = window.innerHeight) {

        let screenObject = helper.screenObject(width, height);
        super({
            width      : screenObject.width,
            height     : screenObject.height,
            renderer   : Phaser.AUTO,
            parent     : "game",
            transparent: true,
            antialias  : true
        });

        // init may var
        this.isMobile       = helper.isMobile();
        this.screenScale    = screenObject.scale;
        this.pixelRatio     = 1 + ((window.devicePixelRatio - 1) / 2);
        this.groundPosition = 0;

        // create player
        this.player = new Player(this);
        this.player.setName("امیر رضا");
        this.player.setSaveCoins(50);
        this.player.setActiveLevel(1);

        // create class instance
        const bootSceneInstance     = new BootScene(this);
        const shopSceneInstance     = new ShopScene(this);
        const levelSceneInstance    = new LevelScene(this);
        const level_1_SceneInstance = new Level_1_Scene(this);

        // add state
        this.state.add("Boot", bootSceneInstance, false);
        this.state.add("Shop", shopSceneInstance, false);
        this.state.add("Level", levelSceneInstance, false);
        this.state.add("Level_1", level_1_SceneInstance, false);
    }
}


window.addEventListener("load", function () {
    let width        = window.innerWidth;
    let height       = window.innerHeight;
    const gameObject = new Game(width, height);
    WebFont.load({
        active: function () {
            gameObject.state.start("Level_1");
        },
        custom: {
            families: ["gameWebFont"],
            urls    : ["/dist/css/font.css"]
        }
    });
    let redrawAction  = () => {
        helper.domObject("loading", true, "display", false);
        helper.domObject("game", false, "visibility", false);
        clearTimeout(endEvent);
        endEvent = setTimeout(function () {
            let screenObject       = helper.screenObject();
            gameObject.screenScale = screenObject.scale;
            gameObject.scale.setGameSize(screenObject.width, screenObject.height);
            gameObject.scale.refresh();
            gameObject.state.restart(true, false);
            helper.domObject("game", true);
            helper.domObject("loading", false, "display", false);
        }, 500);
    }
    let enableNoSleep = () => {
        noSleep.enable();
        window.removeEventListener("click", enableNoSleep, false);
    }

    window.addEventListener("orientationchange", redrawAction);
    window.addEventListener("resize", redrawAction);
    window.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    })
    window.addEventListener("click", enableNoSleep, false);
});









