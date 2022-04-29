import React from 'react';

export default function Sidebar(props) {
    return (
        <li>
            <span style={{color: props.color}}>{props.name}</span> : <span>{props.number}</span>
        </li>
    )
}