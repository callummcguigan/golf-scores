import Navbar from "../components/Navbar";
import AuthContext from "../../store/auth-context";
import {useContext } from 'react';
import Hamburger from "../components/Hamburger";
import FullScoreInput from "../components/FullScoreInput";

function AddFullScore(){

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn

    return(
        <div>
            <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Navbar/>

            {(isLoggedIn && (
            <FullScoreInput/>
            ))}
            
        </div>
    );
}

export default AddFullScore;