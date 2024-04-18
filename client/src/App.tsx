import { useState } from "react";
import * as LinkApi from "../network/linkapi";
import Link from "../components/Link";

interface Link {
    title: string,
    description: string,
    imageLink: string,
    longLink: string,
    shortLink: string,
    _id: string,
}

const App = () => {
    const [url, setUrl] = useState<string>("")
    const [links, setLinks] = useState<Link[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newLink = await LinkApi.createLink(url); // Elongate the shortened URL by calling link API
        setLinks([newLink, ...links]) // Add newLink to the start
        setUrl(""); // Clear the input box
    }

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
                    imageLink={link.imageLink}
                    title={link.title}
                    description={link.description}
                    longLink={link.longLink}
                    shortLink={link.shortLink}
                />
            ))}
        </div>
    );
}

export default App;