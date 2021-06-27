import React, { useEffect, useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))


function DoctorInfo (props) { 
    console.log(props.id);
    const [doctor_info,setDoctorInfo] = useState([{}]);
    useEffect(() => {
        getDoctorInfo(props.id);
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
            <div className="col-lg-2 col-md-3 col-sm-4 py-4 px-4">

                <img className="img-thumbnail photo" src={"http://127.0.0.1:8000/storage/" + doctor_info[0].image}/>

                <div className="rating mt-4 text-center">
                    <i className="fas fa-star fa-3x">
                        <span>{doctor_info[0].total_rate|0}</span>
                    </i>
                </div>

            </div>

            <div className="col-lg-5 col-md-9 col-sm-8 py-4 px-0 data">
                <h3>{doctor_info[0].name_en}</h3>
                <h6><i className="fa fa-graduation-cap"></i>{doctor_info[0].degree? doctor_info[0].degree.name_en : " "}</h6>
                <h6><i className="fa fa-stethoscope"></i>{doctor_info[0].specialist? doctor_info[0].specialist.name_en : " "}</h6>
                <h6><i className="fa fa-stethoscope"></i>
                    { 
                        doctor_info[0].subspecialists ?  
                        doctor_info[0].subspecialists.map(subspecialist => {
                            return (
                                <span>{subspecialist.name_en}</span>
                            );
                        })
                        :
                        ''
                    }
                </h6>
                {
                    doctor_info[0].addresses ?
                    doctor_info[0].addresses.map(address => {
                        return (
                            <React.Fragment>
                                <h6>
                                    <i className="fa fa-search-location"></i>
                                    {address.district? address.district.city.name_en : ''} - 
                                    {address.district? address.district.name_en : ''} - 
                                    {address.address_en}
                                </h6>
                                <h6>
                                    <i className="fa fa-money-bill-wave"></i>
                                    {address.fees}
                                </h6>
                            </React.Fragment>
                        ); 
                    })
                    :
                    " "
                }
            </div>
            <div className="col-lg-5 col-sm-12 py-4 px-4">
                    <div className="location">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `300px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
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
            <section className="booking-doctor-info py-5">
                <div className="container">
                    <div className="doctor-info">
                        <div className="row m-0">
                            {data}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default DoctorInfo;