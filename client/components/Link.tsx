import React from "react";
import LinkType from "../models/LinkType";
import * as LinkApi from "../network/linkapi";

interface LinkProps {
    id: string,
    imageLink: string,
    title: string,
    description: string,
    longLink: string,
    shortLink: string,
    links: LinkType[],
    setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>
}

const Link: React.FC<LinkProps> = ({ id, imageLink, title, description, longLink, shortLink, links, setLinks }) => {
    const handleDelete = () => {
        LinkApi.deleteLink(id);
        setLinks(links.filter(link => link._id !== id ));
    }

    return (
        <div className="container">
            <img src={imageLink} className="preview"/>
            <div className="info">
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Unshortened link: {longLink}</p>
                <p>Original link: {shortLink}</p>
                <button className="delete" onClick={handleDelete}>🗑️ Delete Link</button>
            </div>
        </div>
    )
}

export default Link;