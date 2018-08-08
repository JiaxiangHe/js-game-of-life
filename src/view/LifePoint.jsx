import * as React from "react";

import { SizeContext } from "../index.jsx";

export default function LifePoint(props) {
    return (
        <SizeContext.Consumer>
            {value => <div style={{ height: `${value}px`, width: `${value}px`}} onClick={props.onClick} className={'life__point' + (props.active ? ' life__point--active' : '')}></div>}
        </SizeContext.Consumer>
    )
}