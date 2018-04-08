const helper = require("../helper");

class Animation {
    constructor(scene) {
        // init may var
        this.scene  = scene;
        this.target = {};

        // init animation object
        this.animate = {};
    }

    addAnimate(key, second = 1, fps = 5, loop = 1, config = []) {
        let that          = this;
        this.animate[key] = {
            second: second,
            fps   : fps,
            loop  : loop,
            config: config,
            reset : []
        };

        // add reset frame
        config.forEach((v, i) => {
            v[1].forEach((_v, _i) => {
                that.animate[key].reset.push([v[0], _v, that.target[v[0]][_v]]);
            });
        });
    }

    start(key) {

    }
}

module.exports = Animation;