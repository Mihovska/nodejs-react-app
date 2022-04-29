import React from "react";

export default function Main(props) {
    return (
        <>
            <div
                className="box"
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
            </div>
        </>
    )
}