import { useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../store/auth-context';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';


function AuthForm() {
    const router = useRouter();
    const enteredEmail = useRef();
    const enteredPassword = useRef();
    const enteredName = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandlerCreate = (e) => {
        e.preventDefault();

        const userEmail = enteredEmail.current.value;
        const userPassword = enteredPassword.current.value;
        const userName = enteredName.current.value;

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ';
        }
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    displayName: userName,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = data.error.message
                    console.log(data.error.message);
                    //alert(errorMessage);
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            authCtx.login(data.idToken);
            console.log("user logged in");
            router.replace('/');
        })
            .catch(err => {
                alert(err.message)
            });
    }


    const submitHandlerLogin = (e) => {
        e.preventDefault();

        const userEmail = enteredEmail.current.value;
        const userPassword = enteredPassword.current.value;

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ';
        }
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = data.error.message
                    console.log(data.error.message);
                    //alert(errorMessage);
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            authCtx.login(data.idToken);
            console.log("user logged in");
            router.replace('/');
        })
            .catch(err => {
                alert(err.message)
            });
    }
    return (

        <div className='container'>
            <h2>Log In</h2>

            {(!isLogin && (
                <Form onSubmit={submitHandlerCreate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name.." required ref={enteredName} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email.." required ref={enteredEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={enteredPassword} placeholder="Password.." />
                    </Form.Group>
                    <div className='centered'>
                        <Button variant="primary" type="submit">
                            {isLogin ? 'Login' : 'Create Account'}
                        </Button>
                    </div>
                    <div className='centered'>
                        <Button variant="primary" onClick={switchAuthModeHandler}>
                            {isLogin ? 'Create new account' : 'Login with existing account'}
                        </Button>
                    </div>
                </Form>
            ))}

            {(isLogin && (
                <Form onSubmit={submitHandlerLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email.." required ref={enteredEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={enteredPassword} placeholder="Password.." />
                    </Form.Group>
                    <div className='centered'>
                        <Button variant="primary" type="submit" className="button">
                            {isLogin ? 'Login' : 'Create Account'}
                        </Button>
                    </div>

                    <div className='centered'>
                        <Button variant="primary" onClick={switchAuthModeHandler} className="button">
                            {isLogin ? 'Create new account' : 'Login with existing account'}
                        </Button>
                    </div>
                </Form>
            ))}



        </div>
    );
}

export default AuthForm;