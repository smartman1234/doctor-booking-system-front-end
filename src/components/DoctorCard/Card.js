import React, { useEffect, useState } from "react";
import Review from './Review';
import Reviews from './Reviews';
import TimeTable from './TimeTable';
import DoctorInfo from './DoctorInfo';
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function DoctorCard(props) {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        show? setShow(false): setShow(true)
    }
    return (  
        <React.Fragment>
            <DoctorInfo/>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ratingModal" onClick={handleShow}>Launch demo modal</button>   
            <Review show={show} />
            <TimeTable/>
            <Reviews/>
        </React.Fragment>
    )
}
export default DoctorCard;