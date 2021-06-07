import axios from 'axios';
import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';



function Login(props) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // axios.get('http://localhost:8000/sanctum/csrf-cookie').then(res => {

        //     axios.post('login',{
        //     email : email,
        //     password : password,
        //     },{
        //         withCredentials: true 
        //     }).then( response => {
        //         console.log(response);
        //         setRedirect(true);
        //     }).catch(error => {
        //         console.log(error)
        //     });

        // }).catch(err => {
        //     console.log(err)
        // });
        fetch('http://localhost:8000/sanctum/csrf-cookie',{
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => {
                fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        email,
                        password
                    })
                }).then( response => response.json())
                .then( user => {
                            console.log(user);
                            setRedirect(true);
                            props.setUser(user.name_en);
                            props.setLogin();
                }).catch(error => {
                            console.log(error);
                            props.setUser('');
                        });
            }).catch(error => {
                console.log(error)
            });
    }

    if(redirect) {
        return <Redirect to="/" />
    }

    return (
        <React.Fragment>
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                
                <input type="email" className="form-control" placeholder="Email address" required
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <div className="mb-3">
                    <Link to="/forgot">Forgot Password?</Link>
                </div>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </React.Fragment>
    );
}

export default Login;