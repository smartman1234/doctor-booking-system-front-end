import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAlert } from 'react-alert';
function Login(props) {
    const alert = useAlert();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);
    const [errors,setErrors] = useState({});
    const submit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/sanctum/csrf-cookie',{
            method: 'GET',
            headers: {'X-Requested-With':'XMLHttpRequest'},
            credentials: 'include'
        }).then(res => {
                var formdata = new FormData();
                formdata.append('email',email);
                formdata.append('password',password);
                fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    headers: {'X-Requested-With':'XMLHttpRequest'},
                    credentials: 'include',
                    body: formdata
                }).then( response => response.json())
                .then( response => {
                            console.log("response",response);
                            if(response.status === 200){
                                setErrors({});
                                setRedirect(true);
                                props.setLogin();
                                props.setUser(response);
                            }else if(response.status === 401){
                                alert.error(response.message);
                                props.setUser([]);
                            }else{
                                setErrors(response.errors);
                                alert.error(response.message); 
                                //props.setUser([]);
                            }
                }).catch(error => {
                            //console.log(error);
                            props.setUser([]);
                        });
            }).catch(error => {
                //console.log(error)
            });
    }

    if(redirect) {
        return <Redirect to="/" />
    }

    var validationErrors;
    if(JSON.stringify(errors) != JSON.stringify({}))
    {
        //console.log("errors",errors)
        validationErrors = (<ul className="alert alert-danger">
        {Object.keys(errors).map(function(key) { return <li key={errors[key]}>{errors[key][0]}</li>})}
        </ul>);
    }

    return (
        <React.Fragment>
            <div className="login-box">
                <div className="login-logo">
                    <a>
                        <b>Book</b>Doc
                    </a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    {validationErrors}
                    <form className="form-signin" onSubmit={submit}>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" name="rememberme" value="1" />
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block btn-flat" type="submit">Sign in</button>

                    </form>

                    <div className="mb-3">
                        <Link to="/forgot" className="forget">Forgot Password?</Link>
                    </div>

                    <div className="hr-container">
                        <hr/>
                        <label>Or</label>
                    </div>
                
                    <div className="social row">
                        <div className="col-sm-12">
                            <a href="" className="btn-google m-b-10">
                                <i className="fab fa-google-plus-square"></i>
                                Continue With Google
                            </a>
                        </div>
                    </div>

                    <Link to="/register" className="register">Create new account <i class="fa fa-arrow-right"></i></Link>

                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;