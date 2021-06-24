import React, { useEffect, useState } from "react";

function DoctorInfo (props) { 
    const [doctor_info,setDoctorInfo] = useState([{}]);
    useEffect(() => {
        getDoctorInfo(1);
    }, []);

    //Get Doctor Info
    function getDoctorInfo(docID) {    
        fetch(`http://localhost:8000/api/doctors/${docID}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((res) => {
            setDoctorInfo(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    var doctorInfo;
    var data;
    if(doctor_info) {
        data = 
        <React.Fragment>
                <div className="search-result mb-4">
                    <div className="row m-0">
                        <div className="col-sm-3 py-4 px-4">
                            <img className="img-thumbnail" src={"http://127.0.0.1:8000/storage/" + doctor_info[0].image}/>
                        </div>
                        <div class="col-md-7 col-sm-9 py-4 px-0 data">
                            <h3>{doctor_info[0].name_en}</h3>
                            <h6><i class="fa fa-graduation-cap"></i>{doctor_info[0].degree? doctor_info[0].degree.name_en : " "}</h6>
                            <h6><i class="fa fa-stethoscope"></i>{doctor_info[0].specialist? doctor_info[0].specialist.name_en : " "}</h6>
                            <h6><i class="fa fa-stethoscope"></i>
                                { 
                                    doctor_info[0].subspecialists ?  
                                    doctor_info[0].subspecialists.map(subspecialist => {
                                        return (
                                            <span>{subspecialist.name_en}</span>
                                        );
                                    })
                                    :
                                    ' '
                                }
                            </h6>
                                {
                                    doctor_info[0].addresses ?
                                    doctor_info[0].addresses.map(address => {
                                        return (
                                            <React.Fragment>
                                                <h6>
                                                    <i class="fa fa-search-location"></i>
                                                    {address.district.city.name_en} - 
                                                    {address.district.name_en} - 
                                                    {address.address_en}
                                                </h6>
                                                <h6>
                                                    <i class="fa fa-money-bill-wave"></i>
                                                    {address.fees}
                                                </h6>
                                            </React.Fragment>
                                        ); 
                                    })
                                    :
                                    " "
                                }
                        </div>
            
                        <div className="col-md-2 py-4 px-4">
                            <div className="rating-and-booking">
                                <div>
                                    <div className="rating mb-3 text-center">
                                        <i className="fas fa-star fa-3x">
                                            <span>{doctor_info[0].total_rate}</span>
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

    } else {
        return (
            <p>No Doctor Info Available</p>
        )
    }
    return (
        <React.Fragment>
            <section class="booking-doctor-info py-5">
                <div class="container">
                    <div class="doctor-info">
                        <div class="row m-0">
                            <div class="col-lg-2 col-md-3 col-sm-4 py-4 px-4">
                                {data}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default DoctorInfo;