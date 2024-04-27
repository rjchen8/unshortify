import axios from "axios";

export const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/users", {withCredentials: true});
        const data = await response.data
        return data;
    }

    catch(error) {
        console.error(error);
    }
}


export const createUser = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:5000/api/users/signup", { username: username, password: password }, {withCredentials: true});
        const data = await response.data;
        return data;
    }

    catch(error) {
        console.error(error)
    }
}

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:5000/api/users/login", { username: username, password: password }, {withCredentials: true})
        const data = await response.data
        return data;
    }

    catch(error) {
        console.error(error)
    }
}

export const logoutUser = async () => {
    try {
        await axios.post("http://localhost:5000/api/users/logout", {}, {withCredentials: true});
    }

    catch(error) {
        console.error(error);
    }
}