import React, {useState} from 'react';

import loading from './design/medi/img/loading.gif'; 

function MyAppointments(props) {

  props.setAppointment();

  const cancelAppointment = (book_id) =>(e)=> {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/cancelAppointment/${book_id}`, {
        method: 'GET',
        credentials: 'include',
    }).then( response => {
        console.log("response",response);
    }).catch(error => {
        console.log("error",error);
    });
}

  let books_rows =  props.user.books? props.user.books.map((item, index) =>  {
    return ( <tr>
              <th scope="row">{ index + 1 }</th>
              <td>{item.address? item.address.address_en : ''}</td>
              <td>{item.doctor.name_en}</td>
              <td>{item.date}</td>
              <td>{item.day}</td>
              <td>{item.time}</td>
              <td>{item.fees}</td>
              <td>{item.confirm? <span className="badge badge-success">Confirmed</span> :<span className="badge badge-warning">Pending</span>  }</td>
              <td> <i className="fa fa-trash text-danger" style={{ fontSize: '22px' }} onClick={cancelAppointment(item.id)}></i> </td>
            </tr> )}) : '';

  return (
        <React.Fragment>
          {
            books_rows.length > 0 ? 
              <section className="section custom-tabs" >
            <div className="container">
              <table className="table table-test">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Address</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Date</th>
                    <th scope="col">day</th>
                    <th scope="col">Time</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Status</th>
                    <th scope="col"> Cancel </th>
                  </tr>
                </thead>
                  <tbody>
                  {books_rows}
                </tbody>
              </table>
            </div>
          </section> :  books_rows == undefined ?
          <img src={loading} style={{ marginLeft: '530px' }} width="150" alt="doctor-booking" /> :
          <div className="alert alert-danger text-center">There is no appointments!</div>
}

        </React.Fragment>
);
}

export default MyAppointments;