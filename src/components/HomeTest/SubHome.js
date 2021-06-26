import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Select } from "semantic-ui-react";
import Search from "../patient/Search";
import { Link } from 'react-router-dom';

function SubHome(props) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [data, setData] = useState([]);
  const [degree, setDegree] = useState([]);
  const [subSpecialist, setSubSpecialist] = useState([]);

  const [searchPrams, setSearchParams] = useState([]);
  const [current_page, setCurrent_page] = useState(0);
  const [per_page, setPer_page] = useState(0);
  const [total, setTotal] = useState(0);
  const sortOptions = [
    { key: "st", value: "session_time", text: "Session Time" },
    { key: "age", value: "age", text: "Age" },
    { key: "rate", value: "rate", text: "Rate" },
  ];

  const genderOptions = [
    { key: "g", value: "null", text: "Gender" },
    { key: "m", value: "male", text: "Male" },
    { key: "f", value: "female", text: "Female" },
  ];

  let testOptions = [{ key: "deg", value: "null", text: "Degree" }];

  useEffect(() => {
    console.log("useEffect ...");

    console.log("doctor -> ", props.data.data);
    getDoctorDegreeAPI();
    // if(props.searchPrams)
    // getDoctorSubSpecialistAPI(props.searchPrams);
    init();
  }, []);

  function getDoctorSubSpecialistAPI(s) {
    console.log("getDoctorSubSpecialistAPI -> search",s)
    fetch(`http://127.0.0.1:8000/api/sub-specialist`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Res => ", res);
        var subspecialist = [
          { key: "sus", value: "null", text: "Sub Department" },
        ];
        let _subspecialist = res.map((subspecialist) => {
          return {
            key: subspecialist["id"],
            value: subspecialist["id"],
            text: subspecialist["name_en"],
          };
        });
        _subspecialist.forEach((i) => subspecialist.push(i));

        setSubSpecialist(subspecialist);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  function getDoctorDegreeAPI() {
    fetch(`http://127.0.0.1:8000/api/doctor-degree`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Res => ", res);
        var degree = [{ key: "deg", value: "null", text: "Degree" }];

        let deg = res.map((degree) => {
          return {
            key: degree["id"],
            value: degree["id"],
            text: degree["name_en"],
          };
        });

        deg.forEach((i) => degree.push(i));
        setDegree(degree);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const onChangeHandler = (e, data) => {
    if (data.value == "age") {
      props.data.data.sort((item1, item2) => item1.age - item2.age);
      forceUpdate();
    } else if (data.value == "session_time") {
      props.data.data.sort(
        (item1, item2) => item1.session_time - item2.session_time
      );
      forceUpdate();
    } else if (data.value == "rate") {
      props.data.data.sort(
        (item1, item2) => item2.total_rate - item1.total_rate
      );
      forceUpdate();
    }
  };
  const getData = (data, path) => {
    console.log("page . => ", data);
    console.log("page . path => ", path);
    props.getDataForPagination(data, path);
  };

  const onChangeHandlerGender = (e, data) => {
    props.genderFilterSearch(data.value);
    if (data.value == "male") {
      console.log("Male ...");
    } else if (data.value == "female") {
      console.log("female ...");
    }
  };

  const onChangeHandlerSubSpecialist = (e, data) => {
    props.sebSpecFilterSearch(data.value);
    console.log("subSpecialist ...", data.value);
  };
  const onChangeHandlerDegree = (e, data) => {
    props.degreeFilterSearch(data.value);
    console.log("Degree ...", data.value);
  };
  function init() {
    console.log("res from subhome => ", props.data);
    console.log("searchPrams from subhome => ", props.searchPrams);
 
    setData(props.data.data);
    setCurrent_page(props.data.current_page);
    setPer_page(props.data.per_page);
    setTotal(props.data.total);
    setSearchParams(props.searchPrams);
    forceUpdate();
  }

  const alert = useAlert();

  var doctorCard;
  const card = (cardData) => {
    return cardData.map((doctor) => {
      return (
        <React.Fragment>

          {doctor.addresses.map((address) => {
            return (
              <React.Fragment>
                <div className="search-result mb-4">
                  <div className="row m-0">
                    <div className="col-sm-3 py-4 px-4">
                      <img
                        className="img-thumbnail"
                        src={"http://127.0.0.1:8000/storage/" + doctor.image}
                      />
                    </div>
                    <div class="col-md-7 col-sm-9 py-4 px-0 data">
                      <h2>{doctor.name_en}</h2>
                      <h6>
                        <i class="fa fa-graduation-cap"></i>
                        {doctor.degree.name_en}
                      </h6>
                      <h6>
                        <i class="fa fa-stethoscope"></i>
                        {doctor.specialist.name_en}
                      </h6>
                      <h6>
                        <i class="fa fa-stethoscope"></i>
                        {doctor.subspecialists.map((subspecialist) => {
                          return <span>{subspecialist.name_en}</span>;
                        })}
                      </h6>
                      <h6>
                        <i class="fa fa-search-location"></i>
                        {address.district.city.name_en} -
                        {address.district.name_en} -{address.address_en}
                      </h6>
                      <h6>
                        <i class="fa fa-money-bill-wave"></i>
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
                              <Link to={"doctors/" + doctor.id} className="btn">
                                Book
                              </Link>
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
  };
  if (props.data.data !== undefined) {
    if (props.data.data.length > 0){
      doctorCard = card(props.data.data);
    } 

    // else if(data){
    //   console.log("Data ...")
    //   doctorCard = card(data);
    // }
    else {
      doctorCard = (
        <div className="alert alert-danger text-center">No doctors</div>
      );
    }
  }else {
    if(localStorage.getItem("data"))
    {
      if(JSON.parse(localStorage.getItem("data")).data.length > 0){
        doctorCard = card(JSON.parse(localStorage.getItem("data")).data);
      }else{
  
        doctorCard = (
          <div className="alert alert-danger text-center">No doctors</div>
          );
      }
    }
    
  }

  // const myComponentStyle = {  marginTop: 15, marginBottom: '-4px !important' }

  return (
    <React.Fragment>

      {/* <Search  style={{  marginTop: 15, marginBottom: '-4px !important' }}/> */}
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
                <Select
                  className="w-100 text-center"
                  placeholder="Gender"
                  style={{ border: "solid 1px" }}
                  options={genderOptions}
                  onChange={onChangeHandlerGender}
                />

                <hr />

                <p class="my-2 cat">
                  <i class="fa fa-graduation-cap"></i> Degree
                </p>
                <Select
                  className="w-100 text-center"
                  placeholder="Degree"
                  style={{ border: "solid 1px" }}
                  options={degree}
                  onChange={onChangeHandlerDegree}
                />
                <hr />

                <p class="my-2 cat">
                  <i class="fa fa-stethoscope"></i> SubDepartment
                </p>
                <Select
                  className="w-100 text-center"
                  placeholder="Sub Department"
                  style={{ border: "solid 1px" }}
                  options={props.subSpecialist}
                  onChange={onChangeHandlerSubSpecialist}
                />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <label>Sort by:</label>
            <Select
              className="m-4"
              title="sort"
              placeholder="Sort by :"
              style={{ border: "solid 1px" }}
              options={sortOptions}
              onChange={onChangeHandler}
            />
            {doctorCard}
            <div className="mt-3">
              <Pagination
                activePage={props.data.current_page}
                itemsCountPerPage={props.data.per_page}
                totalItemsCount={props.data.total}
                onChange={(pageNumber) => getData(pageNumber, props.data.path)}
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

export default SubHome;
