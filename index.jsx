import * as React from "react";
import * as ReactDOM from "react-dom";

import GameOfLife from "./src/index.jsx";

import "./src/style.scss";

ReactDOM.render(
    <GameOfLife />,
    document.getElementById('app')
);