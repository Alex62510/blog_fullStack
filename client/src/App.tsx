import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Projects} from "./pages/Projects.tsx";


export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/sign-in'} element={<SignIn/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/sign-up'} element={<SignUp/>}/>
                <Route path={'/dashboard'} element={<Dashboard/>}/>
                <Route path={'/projects'} element={<Projects/>}/>
            </Routes>
        </BrowserRouter>
    );
};

