import { useEffect, useState } from "react";
import * as LinkApi from "../network/linkapi";
import Link from "../components/Link";
import LinkType from "../models/LinkType"


const App = () => {

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

    const getAllLinks = async () => {
        const fetchedLinks = await LinkApi.getAllLinks();
        setLinks(fetchedLinks);
    }

    useEffect(() => {
        getAllLinks();
    }, [])

    return (
        <div className="app-container">
            <h1>Unshortify</h1>
            <h3>figure out where that weird URL actually goes.</h3>

            <form onSubmit={handleSubmit}>
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

export default App;