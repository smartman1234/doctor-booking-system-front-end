import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Review from './Review';
import Reviews from './Reviews';
import TimeTable from './TimeTable';
import DoctorInfo from './DoctorInfo';
// import "bootstrap/dist/css/bootstrap.css";

function DoctorCard(props) {
    const [feedback, setFeedback] = useState(false);

    const changeState = () => {
        setFeedback(true);
        setFeedback(false);
    };

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
            <TimeTable id={id} changestate={props.changestate} user={props.user}  />
            <Reviews id={id} feedback={feedback}/>
            <Review show={show} id={id} changeState={changeState} />
        </React.Fragment>
    )
}
export default DoctorCard;