import React from 'react';
import "./style/Paper.css";

type Props = {
    className?: string
    color?: "primary" | "second"
}

const Paper: React.FC<Props> = (props) => {
    const { color } = props;

    let className: string = "";
    switch (color) {
        case "second":
            className += "gray "
            break;
    }
    className += props.className ? props.className : "";

    return (
        <div className={"paper " + className}>{props.children}</div>
    )
}

export default Paper;