const helper = require("../helper");

class Notify {
    constructor(scene) {
        // init may var
        this.scene         = scene;
        this.index         = 0;
        this.notifications = [];
        this.toTopTween    = null;
    }

    load(message, status = true, time = 5000) {
        let that = this;
        if (this.notifications.length > 3) {
            return;
        }
        if (status) {
            status = "#072104"
        } else {
            status = "#210804";
        }
        this.index += 1;
        let notify              = {
            id   : helper.randId(),
            index: this.index
        };
        let textWidth           = 150 * this.scene.game.screenScale;
        let textHeight          = 25 * this.scene.game.screenScale;
        let padding             = this.scene.padding * this.scene.game.screenScale;
        notify.background       = this.scene.game.add.graphics(0, 0);
        notify.background.alpha = 0;
        notify.margin           = padding;
        notify.text             = this.scene.game.make.text(0, 0, message, this.scene.textStyle(10));
        if (notify.text.width > textWidth) {
            textWidth = notify.text.width * 1.2;
        }
        if (notify.text.height > textHeight) {
            textHeight = notify.text.height * 1.1;
        }
        notify.background.beginFill(helper.intColor(status), 1);
        notify.background.drawRoundedRect(0, 0, textWidth, textHeight, 10);
        notify.background.endFill();
        notify.background.addChild(notify.text);
        notify.text.setTextBounds(0, 2 * this.scene.game.screenScale, textWidth, textHeight);
        notify.background.x = (this.scene.game.width - textWidth) - padding;
        notify.background.y = padding + ((textHeight + padding) * this.notifications.length);

        // add to notification array
        this.notifications.push(notify);

        // tween action
        this.notificationTween = this.scene.game.add.tween(notify.background).to({alpha: 1}, 400, "Linear", true);
        this.notificationTween.onComplete.add(() => {
            setTimeout(() => {
                that.clear(notify.id);
            }, time);
        }, this);
    }

    clear(id = 0) {
        clearTimeout(this.toTopTween);
        var that      = this;
        var clearItem = [];
        this.notifications.forEach(function (v, i) {
            if (id == 0) {
                v.background.destroy();
            }
            else {
                if (v.id == id) {
                    clearItem.push([
                        v.index,
                        (v.background.height + v.margin)
                    ]);
                    v.background.destroy();
                    that.notifications.splice(i, 1);
                }
            }
        });
        if (id == 0) {
            this.notifications = [];
        }
        else if (that.notifications.length > 0) {
            this.notifications.forEach(function (v, i) {
                let clearItemSpace = 0;
                clearItem.forEach(function (_v, _i) {
                    if (v.index > _v[0]) {
                        clearItemSpace += _v[1];
                    }
                });
                that.toTopTween = setTimeout(function () {
                    that.scene.game.add.tween(v.background).to({y: (v.background.y - clearItemSpace)}, 200, "Linear", true);
                }, 500);
            });
        }
    }
}

module.exports = Notify;