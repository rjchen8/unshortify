import axios from "axios";

export const createLink = async (shortUrl: string) => {
    try {
        const response = await axios.post("http://localhost:5000/api/links", { shortLink: shortUrl });
        const data = response.data;
        return data;
    }

    catch(error) {
        console.error(error);
    }
}