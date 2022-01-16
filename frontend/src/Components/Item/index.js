import React from 'react';
import './item.css';


export const Item = (props) => {
    const image = props.item.avatar.split('/revision')
    return (
        props && <div className="card-container">
            <img className="card-image" src={image[0]} alt={props.item.name} />
            <div className="paragraph-container">
                <h1 className="card-title">{props.item.name}</h1>
                <button className="button"><a href={props.item.wiki} target="_blank" rel="noopener noreferrer">Learn more</a></button>
            </div>

        </div>
    );
}
