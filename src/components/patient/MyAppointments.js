import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';



function MyAppointments(props) {

  console.log('======my appointment user')
  console.log(props.user);
  console.log('======my appointment user')

  props.setAppointment();

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
                  </tr>
                </thead>
                  <tbody>
                  {books_rows}
                </tbody>
              </table>
            </div>
          </section> : <div className="alert alert-danger text-center mt-5 container">There is no appointments!</div>
}

          
        </React.Fragment>
);
}

export default MyAppointments;