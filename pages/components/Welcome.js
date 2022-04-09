import AuthContext from '../../store/auth-context';
import { useEffect, useContext, useState } from 'react';
import CarouselPage from './CarouselPage';

function Welcome() {

    const authCtx = useContext(AuthContext);
    const [name, setName] = useState();


    useEffect(() => {
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ",
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => {
        return res.json();

    }).then(data => {
        const checkName = data.users[0].displayName;

        if (checkName != undefined) {
            setName(data.users[0].displayName);
        } else {
            setName('No Display Name Set, Manage Account To Set A Name');
        }
        
        
    })
    })


    return (
        <div className='container'>
            <h1 className='center'>Hello {name} </h1>
            <p className='center'>Ready to track your golf rounds? Or perhaps check how your fellow golfers have played?</p>
            <CarouselPage/>
        </div>
    );
}


export default Welcome;
