import * as React from "react";

import LifePoint from "./LifePoint.jsx";

export default function LifeSquare(props) {
    return (<div className="life__square">
        {props.life.map((lifeLine, i) => <div key={i} className="clearfix">
            {lifeLine.map((life, j) => <LifePoint key={`${i},${j}`} active={life} onClick={() => props.onClick(i, j)}/>)}
        </div>)}
    </div>)
}