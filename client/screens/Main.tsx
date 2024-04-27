import React, { useEffect, useState } from "react";
import * as LinkApi from "../network/linkapi";
import * as UserApi from "../network/userapi";
import Link from "../components/Link";
import LinkType from "../models/LinkType";


interface MainProps {
    loggedIn: string | null;
    setLoggedIn: React.Dispatch<React.SetStateAction<string | null>>
}


const Main: React.FC<MainProps> = ({ loggedIn, setLoggedIn }) => {

    const [url, setUrl] = useState<string>("")
    const [links, setLinks] = useState<LinkType[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newLink = await LinkApi.createLink(url); // Elongate the shortened URL by calling link API
        setLinks([newLink, ...links]) // Add newLink to the start
        setUrl(""); // Clear the input box
    }

    const handleLogout = async () => {
        await UserApi.logoutUser();
        setLoggedIn(null);
    }


    useEffect(() => {
        const getAllLinks = async () => {
            const fetchedLinks = await LinkApi.getAllLinks();
            setLinks(fetchedLinks);
        }

        getAllLinks();
    }, [])

    return (
        <div className="app-container">
            <h1>Unshortify</h1>
            <h3>figure out where that weird URL actually goes.</h3>

            <span className="logout" onClick={handleLogout}>log out</span>

            <form className="urlForm" onSubmit={handleSubmit}>
                <input className="inputfield" placeholder="URL here and hit enter..." value={url} onChange={handleChange}/>
            </form>

            <h2>your URLs will appear below ⬇️:</h2>

            {links.map((link) => (
                <Link
                    key={link._id} 
                    id={link._id}
                    imageLink={link.imageLink}
                    title={link.title}
                    description={link.description}
                    longLink={link.longLink}
                    shortLink={link.shortLink}
                    links={links}
                    setLinks={setLinks}
                />
            ))}
        </div>
    );
}

export default Main;