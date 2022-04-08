import AuthForm from "./AuthForm";
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import Welcome from "./Welcome";

function Dashboard(){

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <div>
        {(!isLoggedIn && (
            <AuthForm></AuthForm>
        ))}
        {(isLoggedIn && (
            <Welcome></Welcome>
        ))}
        </div>
    );
}

export default Dashboard;