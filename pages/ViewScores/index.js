import Scores from "../components/Scores";
import Navbar from "../components/Navbar";
import AuthContext from "../../store/auth-context";
import {useContext } from 'react';
import Hamburger from "../components/Hamburger";

function ViewScores(props) {

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn

    return (

        <div>
            <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Navbar />

            {(isLoggedIn && (
            <Scores/>
            ))}
            
        </div>
    );
}


export default ViewScores;