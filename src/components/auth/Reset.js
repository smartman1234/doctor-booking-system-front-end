import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

function Reset(props) {

    const [password,setPassword] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [redirect,setRedirect] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        const token = props.match.params.token;

        fetch('http://localhost:8000/api/reset', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                token : token,
                password : password,
                password_confirm : passwordConfirm,

            })
        }).then( response => {
                    console.log(response);
                    setRedirect(true);
        }).catch(error => {
                    console.log(error);

            });
    }

    if(redirect) {
        return <Redirect to="/login" />
    }

    return (
        <React.Fragment>
            <form className="form-signin" onSubmit={submit}>


                <h1 className="h3 mb-3 font-weight-normal">Please reset your password</h1>
                
                <input type="password"  className="form-control" placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="password"  className="form-control" placeholder="Confirm Password" required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Reset password</button>
            </form>
        </React.Fragment>
    );
}

export default Reset;