import axios from 'axios';
import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

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
    const [redirect,setRedirect] = useState(false);


    const submit = (e) => {
        e.preventDefault();
        // axios.get('http://localhost:8000/sanctum/csrf-cookie').then(res => {

        //     axios.post('register',{
        //     name_en: name_en,
        //     name_ar: name_ar,
        //     email : email,
        //     password : password,
        //     password_confirm : passwordConfirm,
        //     mobile : mobile,
        //     date_of_birth : date_of_birth,
        //     gender : gender,
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
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => {
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest'},
            body: JSON.stringify({
                name_en: name_en,
                name_ar: name_ar,
                email : email,
                password : password,
                password_confirm : passwordConfirm,
                mobile : mobile,
                date_of_birth : date_of_birth,
                gender : gender,
            })
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
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Please Sign up</h1>
                
                <input type="text"  className="form-control" placeholder="name_en" required
                    onChange={(e) => setName_en(e.target.value)}
                />

                <input type="text"  className="form-control" placeholder="name_ar" required
                    onChange={(e) => setName_ar(e.target.value)}
                />

                <input type="email" className="form-control" placeholder="email" required
                    onChange={(e) => setEmail(e.target.value)}
                />
  
                <input type="password"  className="form-control" placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="password"  className="form-control" placeholder="Confirm Password" required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />

            <input type="text" className="form-control" placeholder="mobile" required
                onChange={(e) => setMobile(e.target.value)} 
            />
            <input type="date"  className="form-control" required
                onChange={(e) => setDate(e.target.value)}
            />
            <select  className="form-control" required
                onChange={(e) => setGender(e.target.value)}
            >
                    {options.map(o => (
                        <option key={o} value={o}> {o} </option>
                    ))}
            </select>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            </form>
        </React.Fragment>
    );
}

export default Register;