import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Review from './Review';
import Reviews from './Reviews';
import TimeTable from './TimeTable';
import DoctorInfo from './DoctorInfo';
// import "bootstrap/dist/css/bootstrap.css";

function DoctorCard(props) {
    // const [user, setUser] = useState({});


    // useEffect(() => {
    //     setUser(props.user);
    // },[]);

    const [show, setShow] = useState(false);
    const { id } = useParams();

    console.log('---------card user-------')

    console.log(props.user);   //obj
    
    console.log('---------card user-------')

    const handleShow = () => {
        show? setShow(false): setShow(true)
    }
    return (  
        <React.Fragment>
            <title>Doctors</title>
            <DoctorInfo id={id}/>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ratingModal" onClick={handleShow}>Launch demo modal</button>   
            <Review show={show} id={id}/>
            <TimeTable id={id} setAppointment={props.setAppointment} user={props.user}  />
            <Reviews id={id}/>
        </React.Fragment>
    )
}
export default DoctorCard;