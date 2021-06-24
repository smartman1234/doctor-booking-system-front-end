import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAlert } from 'react-alert';

function Profile(props) {

    const alert = useAlert();
    
    const [profileImg,setProfileImg] = useState('');

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
    const [errors,setErrors] = useState({});

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setProfileImg(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
      };

    const submit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        if(name_en != "")
        {
            formdata.append('name_en',name_en);
        }else{
            formdata.append('name_en',props.user.name_en);
        }

        if(name_ar != "")
        {
            formdata.append('name_ar',name_ar);
        }else{
            formdata.append('name_ar',props.user.name_ar);
        }

        if(email != "")
        {
            formdata.append('email',email);
        }else{
            formdata.append('email',props.user.email);
        }

        if(mobile != "")
        {
            formdata.append('mobile',mobile);
        }else{
            formdata.append('mobile',props.user.mobile);
        }

        if(date_of_birth != "")
        {
            formdata.append('date_of_birth',date_of_birth);
        }else{
            formdata.append('date_of_birth',props.user.date_of_birth);
        }

        if(image != "")
        {
            formdata.append('image',image);
        }else{
            formdata.append('image',props.user.image);
        }
        
        formdata.append('password',password);
        formdata.append('password_confirm',passwordConfirm);
        formdata.append('gender',gender);
        
        fetch(`http://127.0.0.1:8000/api/update/${props.user.id}?_method=PUT`, {
            method: 'POST',
            headers: {'X-Requested-With':'XMLHttpRequest'},
            body: formdata
        }).then((response) => response.json())
        .then( response => {
            console.log("response.errors",response.errors);
            if(response.status === 200){
                setErrors({});
                alert.success(response.message);
                props.setprofile();
            }else{
                setErrors(response.errors);
                alert.error(response.message); 
            }
        }).catch(error => {
            console.log("error",error);
            alert.error(error);
            });
        
    }
    var profileImage;
    if(profileImg === ''){
        profileImage = (
            <img style={{width:100}} src={"http://127.0.0.1:8000/storage/patients/" + props.user.image}/>
            );
    }else{
        profileImage = (
            <img style={{width:100}} src={profileImg}/>
            );
    }
    

    var validationErrors;
    if(JSON.stringify(errors) != JSON.stringify({}))
    {
        console.log("errors",errors)
        validationErrors = (<ul className="alert alert-danger">
        {Object.keys(errors).map(function(key) { return <li key={errors[key]}>{errors[key][0]}</li>})}
        </ul>);
    }
    
    if (props.user) {
    return (
        <React.Fragment>
                <div className="container my-4 profile">
                    <h3 className="mb-4 font-weight-normal">Manage Profile</h3>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0"><i className="fa fa-user-edit"></i> Edit Info</h5>
                        </div>
                        <div className="card-body">
                            {validationErrors}
                            <form className="form-signin" onSubmit={submit}>

                                <div className="row">

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Name in English</label>
                                        <input type="text" className="form-control" required
                                            onChange={(e) => setName_en(e.target.value)}
                                            defaultValue={props.user.name_en}
                                            
                                        />
                                        
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Name in Arabic</label>
                                        <input type="text" className="form-control" required
                                            onChange={(e) => setName_ar(e.target.value)}
                                            defaultValue={props.user.name_ar}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Email</label>
                                        <input type="email" className="form-control" required
                                            defaultValue={props.user.email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Password</label>
                                        <input type="password"  className="form-control" autoComplete="on" required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Confirm Password</label>
                                        <input type="password"  className="form-control" autoComplete="on" required
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Mobile</label>
                                        <input type="text" className="form-control" required
                                            onChange={(e) => setMobile(e.target.value)} 
                                            defaultValue={props.user.mobile}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Date of brith</label>
                                        <input type="date" className="form-control" required
                                            onChange={(e) => setDate(e.target.value)}
                                            defaultValue={props.user.date_of_birth}
                                        />
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Gender</label>
                                        <select className="form-control" required
                                            onChange={(e) => setGender(e.target.value)}
                                            defaultValue={props.user.gender}
                                        >
                                            {options.map(o => (
                                                <option key={o} value={o}> {o} </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group col-lg-4 col-md-6">
                                        <label>Image</label>
                                        <input type="file" className="form-control-file"
                                            onChange={imageHandler}
                                        />
                                    </div>

                                </div>
                                
                                
                                {profileImage}
                                <br/>

                                <button className="btn btn-lg btn-primary btn-block" >Update Profile</button>
                            </form>
                        </div>
                    </div>
                </div>
        
                
        </React.Fragment>        
    )
    }
    else 
    {
        return (
        
            <React.Fragment>
                Loading...
            </React.Fragment>
                     
        )
    }
}

export default Profile;