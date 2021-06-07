import React, {useState} from 'react';

function Forgot() {

    const [email,setEmail] = useState("");
    const [notify, setNotify]= useState({
        show : false,
        error : false,
        message : ''
    });

    const submit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/forgot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
            })
        }).then( response => {
                    console.log(response);
                    
                    setNotify({
                        show: true,
                        error: false,
                        message :'Email was sent!'
                    });
                    
        }).catch(error => {
                    console.log(error);

                    setNotify({
                        show: true,
                        error: true,
                        message :'Email does not exist!'
                    });
            });
    }

    let info;

        if(notify.show) {
            info = (
                <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role="alert">
                    {notify.message}
                </div>
            );
    }

    return (
        <React.Fragment>
            <form className="form-signin" onSubmit={submit}>

                {info}

                <h1 className="h3 mb-3 font-weight-normal">Please set your email</h1>
                
                <input type="email" className="form-control mb-3" placeholder="Email address" required
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Send Email</button>
            </form>
        </React.Fragment>
    );
}

export default Forgot;