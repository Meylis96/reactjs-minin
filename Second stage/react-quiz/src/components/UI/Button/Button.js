import React from 'react';
import './Button.scss';

const Button = props => {
    const cls = [
        'button',
        [props.type]
    ]

    return (
        <button
        className={cls.join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}>
            {props.children}
        </button>
    )
};

export default Button;