class AnimationEditor {
    constructor(state, key) {

        // init may var
        this.state = state;
        this.key   = key;

        // load editor
        this.load(this.state.animate[this.key]);
    }

    load(object) {
        // add object
        this.object = object;

        // calc
        this.frame = this.object.second * this.object.fps;

        // add css
        this.addStyle();

        // init element
        this.editor = document.createElement("div");
        this.editor.setAttribute("id", "animationEditor");
        document.getElementsByTagName("body")[0].appendChild(this.editor);

        // run
        this.run();
    }

    run() {
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
            }
            cell.appendChild(span);
        }

        // add row and cell
        this.object.forEach((v, index) => {
            v[1].forEach((_v, _i) => {
                let row = that.table.insertRow();
                for (let i = -1; i <= this.frame; i++) {
                    let cell = row.insertCell();
                    if (i === -1) {
                        if (_i === 0) {
                            let span       = document.createElement("span");
                            span.innerText = v[1];
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
                        input.setAttribute("class", `frame_${i}`);
                        input.setAttribute("id", `frame_${i}_${v[0]}_${_v}`);
                        input.type  = "number";
                        input.step  = "0.01";
                        input.value = Math.floor(that.state.target[v[0]][_v] * 100) / 100;
                        input.addEventListener("focus", () => {
                            that.setFrame(i);
                        });
                        input.addEventListener("change", () => {
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
        this.object.forEach((v, i) => {
            v[1].forEach((_v, _i) => {
                that.state.target[v[0]][_v] = document.getElementById(`frame_${index}_${v[0]}_${_v}`).value;
            });
        })
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
        table tr td:first-child {
            text-align: left;
        }
        td {
            text-align: center;
            vertical-align: middle;
        }
        .break {
            display: inline-block;
        }
        `;
    }
}

module.exports = AnimationEditor;