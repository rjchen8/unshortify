import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../screens/Login";
import Signup from "../screens/Signup"
import Main from "../screens/Main"

const App = () => {
    const [loggedIn, setLoggedIn] = useState<string | null>(null);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={loggedIn ? <Main loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn}/>} />
                <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>} />
                <Route path="/main" element={loggedIn ? <Main loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn}/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default App;