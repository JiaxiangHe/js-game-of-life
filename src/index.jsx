import React from "react";

import LifeSquare, { LifeSquareWithLog } from "./view/LifeSquare.jsx";
import { SizeContext } from "./context/index.jsx";
import ErrorBoundary from "./errorHandler/index.jsx";
import { list as defaultList } from "./data/list";

export default class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: 0, // 0: end, 1: setting, 2: start, 3: end
            setting: {
                height: 50,
                width: 50,
                duration: 500,
                size: 8
            },
            life: []
        }

        this.testRef = React.createRef();

        this.pattern = props.pattern || 'Gliner';
        this.hasChange = false;
        this.aroundLife = [{ i: -1, j: -1 }, { i: -1, j: 0 }, { i: -1, j: 1 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: -1 }, { i: 1, j: 0 }, { i: 1, j: 1 }]

        this.setting = this.setting.bind(this);
        this.setLife = this.setLife.bind(this);
        this.getLife = this.getLife.bind(this);
        this.gameStart = this.gameStart.bind(this);
    }
    setting(event) {
        const setting = this.state.setting;
        setting[event.target.id] = parseInt(event.target.value);
        this.setState({
            setting
        });
    }
    setLife(i, j) {
        if (this.state.gameState < 2) {
            let life = this.state.life;
            life[i][j] = 1 - life[i][j];
            this.setState({
                life
            });
        }
    }
    getLifePattern(list) {
        const ci = this.state.setting.height / 2;
        const cj = this.state.setting.width / 2;
        let life = [];
        for (let i = 0; i < this.state.setting.height; i++) {
            life.push(new Array(this.state.setting.width).fill(0))
        }
        list.map(point => { life[ci + point.i][cj + point.j] = 1; });
        return life;
    }
    gameState(index) {
        const nextState = index || index === 0 ? index : this.state.gameState + 1;
        let life = this.state.life;
        switch (nextState) {
            case 0:
                life = [];
                this.setState({
                    gameState: nextState,
                    life
                });
                break;
            case 1:
                life = this.getLifePattern(defaultList[this.pattern])
                this.setState({
                    gameState: nextState,
                    life
                }, () => {
                    console.log(this.testRef);
                });
                break;
            case 2:
                this.setState({
                    gameState: nextState
                }, () => {
                    this.gameStart();
                });
                break;
            default:
                this.setState({
                    gameState: nextState
                });
                break;
        }
    }
    getLife(i, j) {
        let alive = 0;
        this.aroundLife.forEach((p) => {
            if (this.state.life[i + p.i] && this.state.life[i + p.i][j + p.j]) {
                alive += 1;
            }
        });
        if (this.state.life[i][j]) {
            if (alive === 2 || alive === 3) {
                return 1
            } else {
                this.hasChange = true;
            }
        } else {
            if (alive === 3) {
                this.hasChange = true;
                return 1
            }
        }
        return 0;
    }
    gameStart() {
        function game() {
            this.hasChange = false;
            const newLife = this.state.life.map((lifeLine, i) => lifeLine.map((life, j) => this.getLife(i, j)));
            this.setState({
                life: newLife
            });
            if (this.hasChange && this.state.gameState === 2) {
                setTimeout(() => {
                    game.call(this);
                }, this.state.setting.duration);
            } else if (this.state.gameState === 2) {
                this.setState({
                    gameState: 3
                });
            }
        };
        game.call(this);
    }
    gameInfo() {
        let info = '';
        switch (this.state.gameState) {
            case 1:
                info = 'Put some original life, or select a pattern we have'
                break;
            case 2:
                info = 'Life is continue'
                break;
            case 3:
                info = 'Life is stable or end'
                break;
            default:
                break;
        }
        return info;
    }
    render() {
        return (
            <div className="life">
                <form className="life__setting">
                    <fieldset className="life__fieldset">
                        <legend>Set the life play ground</legend>
                        <label className="life__label" htmlFor="height">
                            Height: <input id="height" type="text" defaultValue={this.state.setting.height} onChange={this.setting} />
                        </label>
                        <label className="life__label" htmlFor="width">
                            Width: <input id="width" type="text" defaultValue={this.state.setting.width} onChange={this.setting} />
                        </label>
                        <label className="life__label" htmlFor="duration">
                            Duration: <input id="duration" type="text" defaultValue={this.state.setting.duration} onChange={this.setting} />
                        </label>
                        <label className="life__label" htmlFor="duration">
                            Size: <input id="size" type="text" defaultValue={this.state.setting.size} onChange={this.setting} />
                        </label>
                    </fieldset>
                </form>
                {this.state.gameState > 0 ? <div className="life__palyground">
                    <p>{this.gameInfo()}</p>
                    <select className="pattern" onChange={event => {
                        this.pattern = event.target.value;
                        this.setState({
                            life: this.getLifePattern(defaultList[event.target.value])
                        });
                    }} >
                        {Object.keys(defaultList).map(key => <option selected={this.defaultPattern === 'key'} value={key}>{key}</option>)}
                    </select>
                    <SizeContext.Provider value={this.state.setting.size}>
                        <ErrorBoundary>
                            <LifeSquareWithLog ref={this.testRef} life={this.state.life} height={this.state.setting.height} onClick={this.setLife} /> 
                        </ErrorBoundary>
                    </SizeContext.Provider>
                </div> : null}
                {this.state.gameState > 0 ? <button onClick={() => this.gameState(0)}>Rest</button> : null}
                {this.state.gameState < 2 ? <button onClick={() => this.gameState()}>Next</button> : null}
            </div>
        )
    }
}