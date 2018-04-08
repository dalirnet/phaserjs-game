class AnimationEditor {
    constructor(state, key) {
        // init may var
        this.state = state;
        this.key   = key;

        // load editor
        this.load(this.state.animate[this.key]);
    }

    load(object) {
        // init may var
        let that     = this;
        this.frameTd = [];

        // add object
        this.object       = object;
        this.defualtFrame = this.object.frame;

        // calc
        this.frame = this.object.second * this.object.fps;

        // add css
        this.addStyle();

        // init element
        this.editor = document.createElement("div");
        this.editor.setAttribute("id", "animationEditor");
        document.getElementsByTagName("body")[0].appendChild(this.editor);

        // start editor ui
        this.start();

        // add run btn
        this.runBtn = document.createElement("button");
        this.runBtn.setAttribute("id", "runBtn");
        this.runBtn.innerText = "start";

        this.renderBtn = document.createElement("button");
        this.renderBtn.setAttribute("id", "renderBtn");
        this.renderBtn.innerText = "render";

        // var init
        this.timeLineIsRun = false;
        this.timer         = 0;
        this.setFrameIndex = 1;

        // add event
        this.runBtn.addEventListener("click", () => {
            if (this.timeLineIsRun) {
                clearInterval(this.timer);
                this.timeLineIsRun    = false;
                this.runBtn.innerText = "start";
            }
            else {
                this.timeLineIsRun    = true;
                this.runBtn.innerText = "stop";
                this.timer            = setInterval(() => {
                    if (this.setFrameIndex > this.frame) {
                        clearInterval(this.timer);
                        this.timeLineIsRun    = false;
                        this.runBtn.innerText = "start";
                        this.setFrameIndex    = 1;
                    }
                    else {
                        that.setFrame(this.setFrameIndex);
                        this.setFrameIndex++;
                    }
                }, ((this.object.second * 1000) / this.frame));
            }
        });
        this.renderBtn.addEventListener("click", () => {
            that.getRender();
        });

        // add btn to dom
        this.editor.appendChild(this.runBtn);
        this.editor.appendChild(this.renderBtn);
    }

    start() {
        // init var
        let that = this;

        // create table
        this.table = document.createElement("table");

        // add head row
        let headRow = this.table.insertRow();
        for (let i = -1; i <= this.frame; i++) {
            let cell = headRow.insertCell();
            let span = document.createElement("span");
            if (i === -1) {
                span.innerText = "object";
            }
            else if (i === 0) {
                span.innerText = "property";
            }
            else {
                span.innerText = `F ${i}`;
                this.frameTd.push(cell);
            }
            cell.appendChild(span);
        }

        // add row and cell
        this.object.config.forEach((v, index) => {
            v[1].forEach((_v, _i) => {
                let row = that.table.insertRow();
                for (let i = -1; i <= this.frame; i++) {
                    let cell = row.insertCell();
                    if (i === -1) {
                        if (_i === 0) {
                            let span       = document.createElement("span");
                            span.innerText = v[0];
                            cell.appendChild(span);
                        }
                    }
                    else if (i === 0) {
                        let span       = document.createElement("span");
                        span.innerText = _v;
                        cell.appendChild(span);
                    }
                    else {
                        let input = document.createElement("input");
                        input.setAttribute("id", `frame_${i}__${v[0]}_${_v}`);
                        input.type = "number";
                        if (_v === "rotation") {
                            input.step  = "0.01";
                            input.value = Math.floor(that.state.target[v[0]][_v] * 100) / 100;
                            if (that.defualtFrame.hasOwnProperty(i)) {
                                if (that.defualtFrame.hasOwnProperty(i)) {
                                    that.defualtFrame[i].forEach((frameValue, frameIndex) => {
                                        if ((frameValue[0] === v[0]) && (frameValue[1] === _v)) {
                                            input.value = Math.floor(frameValue[2] * 100) / 100;
                                            input.setAttribute("class", "change");
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            input.step  = "1";
                            input.value = Math.floor(that.state.target[v[0]][_v]);
                            if (that.defualtFrame.hasOwnProperty(i)) {
                                if (that.defualtFrame.hasOwnProperty(i)) {
                                    that.defualtFrame[i].forEach((frameValue, frameIndex) => {
                                        if ((frameValue[0] === v[0]) && (frameValue[1] === _v)) {
                                            input.value = Math.floor(frameValue[2]);
                                            input.setAttribute("class", "change");
                                        }
                                    });
                                }
                            }
                        }
                        input.addEventListener("focus", () => {
                            that.setFrame(i);
                        });
                        input.addEventListener("change", () => {
                            input.setAttribute("class", "change");
                            that.state.target[v[0]][_v] = input.value;
                        });
                        cell.appendChild(input);
                    }
                }
            });
            let row = that.table.insertRow();
            row.setAttribute("class", "break");
        });

        // add table to editor
        this.editor.appendChild(this.table);
    }

    setFrame(index) {
        let that = this;
        this.object.config.forEach((v, i) => {
            v[1].forEach((_v, _i) => {
                that.state.target[v[0]][_v] = document.getElementById(`frame_${index}__${v[0]}_${_v}`).value;
            });
        })
        this.activeFrame(index);
    }

    activeFrame(frame = 1) {
        this.frameTd.forEach((v, i) => {
            if ((frame - 1) === i) {
                v.setAttribute("class", "active");
            }
            else {
                v.setAttribute("class", "");
            }
        });
    }

    getRender() {
        let that   = this;
        let object = {};

        // init object structure
        for (let i = 1; i <= this.frame; i++) {
            object[i] = [];
        }

        // fill object
        this.object.config.forEach((v, i) => {
            v[1].forEach((_v, _i) => {
                for (let index = 1; index <= this.frame; index++) {
                    let el = document.getElementById(`frame_${index}__${v[0]}_${_v}`);
                    if (el.hasAttribute("class")) {
                        if (el.getAttribute("class") === "change") {
                            object[index].push([v[0], _v, el.value]);
                        }
                    }
                }
            });
        });

        // alert json object
        alert(object.toSource());
    }

    addStyle() {
        this.style();
        let head   = document.head || document.getElementsByTagName("head")[0];
        let style  = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(this.css));
        head.appendChild(style);
    }

    style() {
        this.css = `
        #animationEditor {
            position: absolute;
            width: 100%;
            max-height: 40%;
            left: 0;
            top: 0;
            box-sizing: border-box;
            overflow: auto;
            font-family: tahoma;
            font-size: 10px;
            text-align: center;
            background: rgba(255,255,255,0.7);
            padding: 10px;
        }
        #runBtn {
            position: absolute;
            width: 100px;
            bottom:0;
            left: 50%;
            margin-left: -105px;
        }
        #renderBtn {
            position: absolute;
            width: 100px;
            bottom:0;
            left: 50%;
            margin-left: 5px;
        }
        input {
            direction: ltr;
            width: 70px;
            border: none;
            font-family: tahoma;
            font-size: 10px;
            text-align: center;
            background: none;
        }
        table {
            display: inline-block;
        }
        table tr:first-child {
            background: #242424;
            color: #fff;
        }
        td {
            text-align: center;
            vertical-align: middle;
        }
        td.active {
            background: #a22222;
        }
        .break {
            display: inline-block;
        }
        `;
    }
}

module.exports = AnimationEditor;