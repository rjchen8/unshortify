import React from "react";

interface LinkProps {
    imageLink: string,
    title: string,
    description: string,
    longLink: string,
    shortLink: string,
}

const Link: React.FC<LinkProps> = ({ imageLink, title, description, longLink, shortLink}) => {
    return (
        <div className="container">
            <img src={imageLink} className="preview"/>
            <div className="info">
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Unshortened link: {longLink}</p>
                <p>Original link: {shortLink}</p>
                <button className="delete">🗑️ Delete Link</button>
            </div>
        </div>
    )
}

export default Link;