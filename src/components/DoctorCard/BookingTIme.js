// import React, {useEffect, useState} from "react";
// import BookingTime from './BookingTIme';


// function BookingTime(props) {

//     const [booking_time, setBookingTime] = useState([]);
    
//     useEffect(() => {
//         getBookingTime(1);
//     }, []);
    
//     //Return All Feedback on Doctor
//     function getBookingTime(docID) {    
//         fetch(`http://localhost:8000/api/booking-time/${docID}`,{
//             method: 'GET',
//         })
//         .then((response) => response.json())
//         .then((res) => {
//             console.log(res);
//             setReviews(res);
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }

//     var bookingTime;
//     if(booking_time) {
//         bookingTime = booking_time.map( (time) => {
//         return (
//         // @foreach($newTimesTable as $table)


//         //     @php
//         //         $numberOfBooked = checkTableTime($address->doctor->id,$address->id,$table->date);
//         //     @endphp
            
//         //     {{-- check if the all the time for spacific time is booked or not --}}
//         //     @if($numberOfBooked != $table->session_number)
//         //         @include('patient.commonUsedCode.booking',['timeTable' => $table])
//         //     @endif
//         // @endforeach
//             <h1>Hello World</h1>
//         )});
//     } else {
//         bookingTime = () => {
//         return (
//             <p>No Booking Time Avialble for This Address</p>
//         )};
//     }

//     return (
//         <React.Fragment>
//             <section class="booking-time">
//                 <div class="container">
//                     <div class="card mb-5">
//                         <div class="card-header">
//                             <h5 class="card-title mb-0"><i class="fa fa-calendar-alt"></i> @lang('admin.Time Slots')</h5>
//                         </div>
//                         <div class="card-body">
//                             <div class="booking-slider owl-carousel">
//                                 {bookingTime}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </React.Fragment>
//     )
// }

// export default BookingTime;