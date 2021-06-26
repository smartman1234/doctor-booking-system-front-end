import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slider from "react-slick";
import Moment from 'moment';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import { useAlert } from 'react-alert';

import bg from './auth-background.png'; 

function TimeTable(props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 5 
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 ,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const cookies = new Cookies();
    const isAuthenticated = cookies.get("jwt");
    const alert = useAlert();
    //Submit form to Book a Doctor
    const submit = (index) =>(e)=> {
        e.preventDefault();
        let formdata = {};
        formdata.address_id = document.getElementById("address_id"+index).value;
        formdata.doctor_id  = document.getElementById("doctor_id"+index).value;
        formdata.patient_id = props.user.id
        formdata.day        = document.getElementById("day"+index).value;
        formdata.time       = document.getElementById("time"+index).value;
        formdata.fees       = document.getElementById("fees"+index).value;
        fetch(`http://127.0.0.1:8000/api/book/store`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        }).then((response) => response.json())
        .then( response => {
            setIsRendered(false);
            props.changestate(); 
            alert.success('Reserve Appointment sucessfully');
            setIsRendered(true)
        }).catch(error => {
            alert.error('Fail to reserve appointment');
            console.log("error",error);
            });
    }

    //Get Time Tables of Specified Doctor
    function getTimeTables(docID, addressID) {   
        fetch(`http://localhost:8000/api/available-time/${docID}/${addressID}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then((response) => {
            return response.json();
          })
        .then((data) => {
            console.log(data);
            setTimes(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [times, setTimes] = useState([{}]);
    const [is_rendered, setIsRendered] = useState(false);
    useEffect(() => {
        getTimeTables(props.id,1);  
    }, [is_rendered]);  
    let times_table = times;
    let cards =  times_table.map((item) =>  {
        return (    
            <div class="flex-wrap p-4">
        <div class="px-lg-5 ">
            <div class="" style={{  borderRadius: '10px', border: '1px solid rgb(43, 113, 205)', textAlign: 'center', padding: '10px',    background: 'rgb(43 113 205)', 'margin' : '0px 0px' }}>
                <b style={{ width:'100%', background: '#2b71cd', color: 'white', borderRadius: '4px', padding: '2px' }}> {item.day} </b><br/> 
            {
            item.time_slot ? 
                item.time_slot.map((i, index) => { 
                    if(!item.blocked_times.includes(i.starts)){

                        return ( 
                        
                        <div className="time">
                            <form className="" onSubmit={submit(index+item.day)}>
                                <input type="hidden" id="index"  name="index" value={index+item.day} />
                                <input type="hidden" id={"doctor_id"+index+item.day}  name="doctor_id" value={props.id} />
                                <input type="hidden" id={"address_id"+index+item.day} name="address_id" value={item.doctor_address_id} />
                                <input type="hidden" id={"time"+index+item.day}       name="time" value={i.starts} />
                                <input type="hidden" id={"day"+index+item.day}        name="day" value={item.day} />
                                <input type="hidden" id={"fees"+index+item.day}       name="fees" value={item.fees} />
                                
                                {
                                    (isAuthenticated === undefined) ? <Link to="/login" className="btn mb-3 btn-sm"
                                    style={{ color: 'white', fontWeight: 'bold',
                                        border: '2px solid #ffffff',
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        background: '#a99ba7',
                                        }} >
                                        {Moment(i.starts, "HH:mm").format("hh:mm A")}
                                    </Link> : 
                                    <button className="btn mb-3 btn-sm" 
                                    style={{ color: 'white', fontWeight: 'bold',
                                        border: '2px solid #ffffff',
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        background: '#a99ba7',
                                        }} >{Moment(i.starts, "HH:mm").format("hh:mm A")}</button>
                                }
                            </form>
                        </div>

                        )  } ;
                    })      
                :''      
            }
            </div>
        </div>
        </div>
        
    )});
    return (
        
        <section className="booking-time" style={{ backgroundImage: `url(${bg})` }}>
            <div className="container">
                <div className="card mb-5">
                    <div className="card-header">
                        <h5 className="card-title mb-0"><i className="fa fa-calendar-alt"></i> Time Slots</h5>
                    </div>
                    <div className="card-body ">
                    <Carousel  style={{   maxWidth: '230px', minWidth: '230px' }}
                        cards={cards}
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        >
                            {cards}
                    </Carousel>

                {/* <Slider {...settings} focusOnSelect={true}>
                    {cards}
                </Slider> */}

                    </div>
                </div>
            </div>


            

        </section>
    );
}

export default TimeTable;