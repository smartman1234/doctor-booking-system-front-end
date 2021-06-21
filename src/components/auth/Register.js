import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

function Register() {
    const options = ['male','female'];
    const [name_en,setName_en] = useState("");
    const [name_ar,setName_ar] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [mobile,setMobile] = useState("");
    const [date_of_birth,setDate] = useState("");
    const [gender,setGender] = useState(options[0]);
    const [image,setImage] = useState("");
    const [redirect,setRedirect] = useState(false);


    const submit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:8000/sanctum/csrf-cookie',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => {

            var formdata = new FormData();
            formdata.append('name_en',name_en);
            formdata.append('name_ar',name_ar);
            formdata.append('email',email);
            formdata.append('password',password);
            formdata.append('password_confirm',passwordConfirm);
            formdata.append('mobile',mobile);
            formdata.append('date_of_birth',date_of_birth);
            formdata.append('gender',gender);
            formdata.append('image',image);
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            // headers: {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest'},
            body: formdata
        }).then( response => {
                    console.log(response);
                    setRedirect(true);
        }).catch(error => {
                    console.log(error)
                });
        }).catch(error => {
            console.log(error)
        });
        
    }

    if(redirect) {
        return <Redirect to="/login" />
    }

    return (
        <React.Fragment>
            <div className="login-box">
                <div className="login-logo">
                    <span>
                        <b>Book</b>Doc
                    </span>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign up to enjoy our services</p>
                    <form className="form-signin" onSubmit={submit}>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Name in English" required
                                onChange={(e) => setName_en(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Name in Arabic" required
                                onChange={(e) => setName_ar(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

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

                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Confirm Password" required
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="test" className="form-control" placeholder="Phonr Number" required
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="date" className="form-control" placeholder="Date Of Birth" required
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <select className="form-control" required
                                onChange={(e) => setGender(e.target.value)} >
                                {options.map(o => (
                                    <option key={o} value={o}> {o} </option>
                                ))}
                            </select>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="file" className="form-control-file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <button className="btn btn-primary btn-block btn-flat" type="submit">Sign Up</button>

                    </form>
                    <Link to="/login" className="login">Have an account <i class="fa fa-arrow-right"></i></Link>

                </div>
            </div>

        </React.Fragment>
    );
}

export default Register;