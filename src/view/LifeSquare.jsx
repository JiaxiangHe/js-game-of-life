import * as React from "react";

import LifePoint from "./LifePoint.jsx";
import logWrapper from "../HOC/logWrapper.jsx";

// export default function LifeSquare(props) {
//     return (<div className="life__square">
//         {props.life.map((lifeLine, i) => <div key={i} className="clearfix">
//             {lifeLine.map((life, j) => <LifePoint key={`${i},${j}`} active={life} onClick={() => props.onClick(i, j)}/>)}
//         </div>)}
//     </div>)
// }

export default class LifeSquare extends React.Component {
    constructor() {
        super();
        this.wrapper = React.createRef();
    }
    componentDidMount() {
        console.log(this.wrapper);
    }
    render() {
        return (<div ref={this.wrapper} className="life__square">
            {this.props.life.map((lifeLine, i) => <div key={i} className="clearfix">
                {lifeLine.map((life, j) => <LifePoint key={`${i},${j}`} active={life} onClick={() => this.props.onClick(i, j)} />)}
            </div>)}
        </div>)
    }
}

export const LifeSquareWithLog = logWrapper(LifeSquare);