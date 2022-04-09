import Scores from "../components/Scores";
import Navbar from "../components/Navbar";
import AuthContext from "../../store/auth-context";
import {useContext } from 'react';

function ViewScores(props) {

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn

    return (

        <div>
            <Navbar />

            {(isLoggedIn && (
            <Scores/>
            ))}
            
        </div>
    );
}


export default ViewScores;