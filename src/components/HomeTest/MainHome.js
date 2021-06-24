import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Select } from "semantic-ui-react";
import SubHome from "./SubHome";
import Search from "../patient/Search";
function MainHome(props) {
  const [data, setData] = useState([]);
  const [searchPrams, setSearchParams] = useState([]);
  const [genderFilter, setGenderFilter] = useState('null');
  const [degreeFilter, setDegreeFilter] = useState('null');
  const [subSpecFilter, setSubSpecFilter] = useState('null');

  const [doctorData, setDoctorData] = useState([]); // the lifted state
  const sendDoctorDataParent = (index, searchParams) => {
    // the callback. Use a better name
    console.log("Parent | sendDoctorDataParent => ", index);
    console.log("Parent | sendSearchParamsParent => ", searchParams);

    setDoctorData(index);
    setSearchParams(searchParams);
  };


  const genderFilterSearch = (_genderFilter) => {
 
    console.log("Parent Home | genderFilter => ", _genderFilter);
    setGenderFilter(_genderFilter);
    filterSearch(searchPrams,_genderFilter,degreeFilter,subSpecFilter);
  };
  const degreeFilterSearch = (_degreeFilter) => {
 
    console.log("Parent Home | degreeFilter => ", _degreeFilter);
    setDegreeFilter(_degreeFilter);
    filterSearch(searchPrams,genderFilter,_degreeFilter,subSpecFilter);
  };
  const sebSpecFilterSearch = (_sebSpecFilter) => {
 
    console.log("Parent Home | sebSpecFilter => ", _sebSpecFilter);
    setSubSpecFilter(_sebSpecFilter);
    filterSearch(searchPrams,genderFilter,degreeFilter,_sebSpecFilter);
  };
  useEffect(() => {
    setData(props.user);
    setSearchParams(props.searchParams);
  },[]);


  const filterSearch = (key,gender_Filter,degree_Filter,subSpec_Filter) => {
    fetch(
      `http://127.0.0.1:8000/api/filter?name=${key["name"]}&specialty=${key["specialty"]}&city=${key["city"]}&district=${key["district"]}&gender=${gender_Filter}&degree=${degree_Filter}&sub_department=${subSpec_Filter}`,
      {
        method: "GET",
        
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res from server .. filter .. => ",res);
        setData(res);

        
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <React.Fragment>
      {/* <React.Fragment> */}
        {/* <Search sendDoctorDataParent={sendDoctorDataParent} /> */}
      {/* </React.Fragment> */}
      <SubHome data={data} searchPrams={searchPrams}  genderFilterSearch={genderFilterSearch}
      degreeFilterSearch={degreeFilterSearch} sebSpecFilterSearch={sebSpecFilterSearch}/>
    </React.Fragment>
  );
}

export default MainHome;
