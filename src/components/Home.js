import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Select } from "semantic-ui-react";
function Home(props) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [data, setData] = useState([]);
  const [current_page, setCurrent_page] = useState(0);
  const [per_page, setPer_page] = useState(0);
  const [total, setTotal] = useState(0);
  const sortOptions = [
    { key: "st", value: "session_time", text: "Session Time" },
    { key: "age", value: "age", text: "Age" },
    { key: "rate", value: "rate", text: "Rate" }
  ];

  useEffect(() => {
    // getData(1);
    init();
  });

  function getData(pageNumber) {
    fetch(`http://127.0.0.1:8000/api/doctors?page=${pageNumber}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res from home => ", res);
        setData(res.data);
        setCurrent_page(res.current_page);
        setPer_page(res.per_page);
        setTotal(res.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onChangeHandler = (e, data) => {
    if(data.value == 'age'){
      props.user.data.sort((item1,item2)=>item1.age - item2.age);
      forceUpdate();
    }else if(data.value == 'session_time'){
      props.user.data.sort((item1,item2)=>item1.session_time - item2.session_time);
      forceUpdate();
    }else if(data.value == 'rate'){
      props.user.data.sort((item1,item2)=>item2.total_rate - item1.total_rate);
      forceUpdate();
    }
    };
  function init() {
    console.log("res from home => ", props.user.data);
    console.log("searchPrams from home => ", props.searchParams);
    setData(props.user.data);
    setCurrent_page(props.user.current_page);
    setPer_page(props.user.per_page);
    setTotal(props.user.total);
  }

  const alert = useAlert();

  var doctorCard;

  if (props.user.data) {
    doctorCard = props.user.data.map((doctor) => {
      return (
        <React.Fragment key={doctor.id}>
          {doctor.addresses.map(address => {
            return (
              <React.Fragment key={address.id}>
                <div className="search-result mb-4" >
                  <div className="row m-0">
                    <div className="col-sm-3 py-4 px-4">
                      <img
                        className="img-thumbnail"
                        src={"http://127.0.0.1:8000/storage/" + doctor.image}
                      />
                    </div>
                    <div className="col-md-7 col-sm-9 py-4 px-0 data">
                      <h2>{doctor.name_en}</h2>
                      <h6><i className="fa fa-graduation-cap"></i>{doctor.degree.name_en}</h6>
                      <h6><i className="fa fa-stethoscope"></i>{doctor.specialist.name_en}</h6>
                      <h6><i className="fa fa-stethoscope"></i>
                        {doctor.subspecialists.map(subspecialist => {
                            return (<span key={subspecialist.id}>{subspecialist.name_en}</span>); 
                          })}
                      </h6>
                      <h6>
                        <i className="fa fa-search-location"></i>
                        {address.district.city.name_en} - 
                        {address.district.name_en} - 
                        {address.address_en}
                      </h6>
                      <h6>
                        <i className="fa fa-money-bill-wave"></i>
                        {address.fees}
                      </h6>
                    </div>

                    <div className="col-md-2 py-4 px-4">
                      <div className="rating-and-booking">
                        <div>
                          <div className="rating mb-3 text-center">
                            <i className="fas fa-star fa-3x">
                              <span>{doctor.total_rate}</span>
                            </i>
                          </div>
                          <div className="booking">
                            <div className="text-center">
                              <a href="" className="btn">
                                Book
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    });
  } else {
    doctorCard = <div className="alert alert-danger">No doctors</div>;
  }
  return (
    <React.Fragment>
  
      <div className="search-control container">
        <div className="row">
          <div className="col-md-3 my-3">
            <div className="search-filter">
              <div className="search-filter-header px-3 py-2">
                <div className="row">
                  <div className="col-10 my-1">
                    <i className="fa fa-filter"></i> Filters
                  </div>
                  <div className="col-2 text-right">
                    <button
                      className="btn d-lg-none p-0"
                      data-toggle="collapse"
                      data-target="#search-filter-body"
                      aria-expanded="false"
                      aria-controls="search-filter-body"
                    >
                      <i className="fa fa-plus pull-right"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div
                id="search-filter-body"
                className="collapse search-filter-body px-3 py-2"
              >
                <p className="my-2 cat">
                  <i className="fa fa-venus-mars"></i> Gender
                </p>
                <div class="cat-data ml-4 pl-2">links here</div>

                <hr />

                <p class="my-2 cat">
                  <i class="fa fa-graduation-cap"></i> Degree
                </p>
                <div class="cat-data ml-4 pl-2">links here</div>

                <hr />

                <p class="my-2 cat">
                  <i class="fa fa-stethoscope"></i> SubDepartment
                </p>
                <div class="cat-data ml-4 pl-2">links here</div>
              </div>
            </div>
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