import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserApi from "../network/userapi";

interface LoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<string | null>>
}

const Login: React.FC<LoginProps> = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const user = await UserApi.loginUser(username, password);
        setLoggedIn(user._id);
        navigate("/");
    }


    return (
        <div className="app-container">
            <h1>Unshortify</h1>
            <h3>figure out where that weird URL actually goes.</h3>

            <form className="loginForm" onSubmit={handleSubmit}>
                <input className="inputfield" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="inputfield" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </form>

            <button className="loginButton" onClick={handleSubmit}>Log in</button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            
        </div>
    )
}

export default Login;