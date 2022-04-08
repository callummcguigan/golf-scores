import Navbar from "../components/Navbar";
import ScoreInput from "../components/ScoreInput";
import AuthContext from "../../store/auth-context";
import {useContext } from 'react';

function AddScore(){

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn

    return(
        <div>
            <Navbar/>

            {(isLoggedIn && (
            <ScoreInput/>
            ))}
            
        </div>
    );
}

export default AddScore;