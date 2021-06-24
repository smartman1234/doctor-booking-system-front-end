import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
function Home(props) {
  const [data, setData] = useState([]);
  const [current_page, setCurrent_page] = useState(0);
  const [per_page, setPer_page] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getData(1);
  }, []);

  function getData(pageNumber) {
    fetch(`http://127.0.0.1:8000/api/doctors?page=${pageNumber}`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      setData(res.data);
      setCurrent_page(res.current_page);
      setPer_page(res.per_page);
      setTotal(res.total);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const alert = useAlert();
  const notify = () => {
    
    alert.error("Wait The Admin To Accept You");
  };
  var doctorCard;

  if (data) {
    doctorCard = data.map((doctor) => {
      return (
        <div className="search-result mb-4">
      <div className="row m-0">
        <div className="col-sm-3 py-4 px-4">
          <img className="img-thumbnail" src={"http://127.0.0.1:8000/storage/" + doctor.image}/>
        </div>
        <div class="col-md-7 col-sm-9 py-4 px-0 data">
          <h3>{doctor.name_en}</h3>
          <h6><i class="fa fa-graduation-cap"></i>{doctor.degree.name_en}</h6>
          <h6><i class="fa fa-stethoscope"></i>{doctor.specialist.name_en}</h6>
          <h6><i class="fa fa-stethoscope"></i>
            {doctor.subspecialists.map(subspecialist => {
                return (<span>{subspecialist.name_en}</span>); 
              })}
          </h6>
          {doctor.addresses.map(address => {
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
          })}
        </div>

        <div className="col-md-2 py-4 px-4">
          <div className="rating-and-booking">
              <div>
                <div className="rating mb-3 text-center">
                    <i className="fas fa-star fa-3x">
                        <span>{doctor.rate}</span>
                    </i>

                </div>
                <div className="booking">
                    <div className="text-center">
                        <a href="" className="btn">Book</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
      );
    });

  } else {
    doctorCard = <div className="alert alert-danger">No doctors</div>;
  }
  return (
    <React.Fragment>
      {props.user ? "Hi " + props.user.name_en : "You are not logged in"}

      <button onClick={notify}>Notify!</button> <br />
      <div className="search-control container">
          <div className="row">
            <div className="col-md-3">
              filter
            </div>
            <div className="col-md-9">
              {doctorCard}
              <div className="mt-3">
              <Pagination
                activePage={current_page}
                itemsCountPerPage={per_page}
                totalItemsCount={total}
                onChange={(pageNumber) => getData(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
              />
              </div>
            </div>
          </div>
        </div>

    </React.Fragment>
  );
}

export default Home;