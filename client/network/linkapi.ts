import axios from "axios";

export const getAllLinks = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/links");
        const data = response.data;
        return data;
    }

    catch(error) {
        console.error(error)
    }
}

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

export const deleteLink = async (id: string) => {
    try {
        await axios.delete(`http://localhost:5000/api/links/${id}`)
    }

    catch(error) {
        console.error(error);
    }
}