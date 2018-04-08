class Animation {
    constructor(scene) {
        // init may var
        this.scene  = scene;
        this.target = {};

        // init animation object
        this.animate = {};
    }

    addAnimate(key, frame = {}, second = 1, fps = 5, loop = 1, delay = 0, config = []) {
        // init var
        let that = this;

        // create animate key
        this.animate[key] = {
            second    : second,
            fps       : fps,
            loop      : loop,
            delay     : (delay > 0 ? (delay + (second * 1000)) : 0),
            frame     : frame,
            config    : config,
            timer     : {},
            delayTimer: {},
            isRun     : false,
            lastFrame : 1,
            runTime   : 0
        };

        // init empty array for reset frame
        that.animate[key].frame[0] = [];

        // add reset frame
        config.forEach((v, i) => {
            v[1].forEach((_v, _i) => {
                that.animate[key].frame[0].push([v[0], _v, that.target[v[0]][_v]]);
            });
        });
    }

    start(key, resetFrame = true) {
        if (!this.animate[key].isRun) {
            //reset lastFrame
            this.animate[key].lastFrame = 1;

            // reset runTime
            this.animate[key].runTime = 0;

            // flag status animation
            this.animate[key].isRun = true;

            // reset frame
            if (resetFrame) {
                this.resetFrame(key);
            }

            // loop frame
            if (this.animate[key].delay > 0) {
                this.loopFrame(key, true);
                this.animate[key].delayTimet = this.scene.game.time.create();
                this.animate[key].delayTimet.loop(this.animate[key].delay, () => {
                    this.loopFrame(key, true);
                }, this);
                // start delay timer
                this.animate[key].delayTimet.start();
            }
            else {
                this.loopFrame(key);
            }
        }
    }

    stop(key, resetFrame = false) {
        if (this.animate[key].isRun) {

            // flag status animation
            this.animate[key].isRun = false;

            // reset frame
            if (resetFrame) {
                this.resetFrame(key);
            }

            // delay loop stop
            if (this.animate[key].delay > 0) {
                // delay loop stop
                this.animate[key].delayTimet.stop();
            }

            // loop frame stop
            this.animate[key].timer.stop();
        }
    }

    resetFrame(key) {
        this.setFrame(key, 0);
    }

    loopFrame(key, forceStop = false) {
        // reset lastFrame
        this.animate[key].lastFrame = 1;

        // create timer key
        this.animate[key].timer = this.scene.game.time.create();
        this.animate[key].timer.loop(Math.floor((this.animate[key].second * 1000) / this.animate[key].fps), () => {
            this.setFrame(key, this.animate[key].lastFrame);
            if (this.animate[key].lastFrame < (this.animate[key].second * this.animate[key].fps)) {
                this.animate[key].lastFrame++;
            }
            else {
                this.animate[key].runTime++;
                this.animate[key].lastFrame = 1;
                if (this.animate[key].loop > 0) {
                    if (this.animate[key].runTime >= this.animate[key].loop) {
                        this.stop(key, true);
                    }
                }
                if (forceStop) {
                    this.resetFrame(key);
                    this.animate[key].timer.stop();
                }
            }
        }, this);

        // start timer
        this.animate[key].timer.start();
    }

    setFrame(key, index) {
        this.animate[key].frame[index].forEach((v) => {
            this.target[v[0]][v[1]] = v[2];
        });
    }
}

module.exports = Animation;