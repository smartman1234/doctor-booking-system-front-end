import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Select } from "semantic-ui-react";
import SubHome from "./SubHome";
import Search from "../patient/Search";
import bg2 from '../patient/design/medi/img/slider-2.jpg';

import './MainHome.css';
function MainHome(props) {
  const [data, setData] = useState([]);
  const [searchPrams, setSearchParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [genderFilter, setGenderFilter] = useState('null');
  const [degreeFilter, setDegreeFilter] = useState('null');
  const [subSpecFilter, setSubSpecFilter] = useState('null');
  const [subSpecialist, setSubSpecialist] = useState([]);
  const [doctorData, setDoctorData] = useState([]); // the lifted state

  const sendDoctorDataParent = (index, searchParams) => {
    // the callback. Use a better name
    console.log("Parent | sendDoctorDataParent => ", index);
    console.log("Parent | sendSearchParamsParent => ", searchParams['specialty']);

    setData(index);
    setSearchParams(searchParams);
    let s = {
      specialty : searchParams['specialty'],
      city      : searchParams["city"] ,
      district  : searchParams["district"] ,
      name      : searchParams["name"] 
    }
    localStorage['Params'] = JSON.stringify(s);
    getDoctorSubSpecialistAPI(JSON.parse(localStorage.getItem('Params')).specialty);
  };

  const getDataForPagination = (pageNumber,path) => {
    console.log("Parent Home | getDataForPagination => ", pageNumber);
    console.log("Parent Home | getDataForPagination_path => ", path);
    setPageNumber(pageNumber,path);
    pagination(pageNumber,path,searchPrams,genderFilter,degreeFilter,subSpecFilter);
  }
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
    console.log("Main Home useEffect....");
    console.log("Main Home props.user =>",props.user);
    console.log("Main Home props.searchParams =>",props.searchParams);
    
    setSearchParams(props.searchParams);
    setData(props.user);

    getDoctorSubSpecialistAPI(localStorage.getItem("searchParams"));

    
  },[]);

  function getDoctorSubSpecialistAPI(s) {
    // console.log("getDoctorSubSpecialistAPI -> search",s['specialty']);
    fetch(`http://127.0.0.1:8000/api/sub-specialist/${s}`, {
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

  const filterSearch = (key,gender_Filter,degree_Filter,subSpec_Filter) => {
    fetch(
        `http://127.0.0.1:8000/api/filter?name=${key["name"]!==undefined?key["name"]:JSON.parse(localStorage.getItem("Params")).name}&specialty=${key["specialty"]!==undefined?key["specialty"]:JSON.parse(localStorage.getItem("Params")).specialty}&city=${key["city"]!==undefined?key["city"]:JSON.parse(localStorage.getItem("Params")).city}&district=${key["district"]!==undefined?key["district"]:JSON.parse(localStorage.getItem("Params")).district}&gender=${gender_Filter}&degree=${degree_Filter}&sub_department=${subSpec_Filter}`,
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

  const pagination = (pNumber,path,key,gender_Filter,degree_Filter,subSpec_Filter) => {
    fetch(
      `${path}?name=${key["name"]!==undefined?key["name"]:JSON.parse(localStorage.getItem("Params")).name}&specialty=${key["specialty"]!==undefined?key["specialty"]:JSON.parse(localStorage.getItem("Params")).specialty}&city=${key["city"]!==undefined?key["city"]:JSON.parse(localStorage.getItem("Params")).city}&district=${key["district"]!==undefined?key["district"]:JSON.parse(localStorage.getItem("Params")).district}&gender=${gender_Filter}&degree=${degree_Filter}&sub_department=${subSpec_Filter}&page=${pNumber}`,
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
    <React.Fragment >
      <title>Home</title>
      {/* backgroundImage: `url(${bg2})`, borderRadius: '85px' */}
      <div className="search-bar"  style={{ }}><Search sendDoctorDataParent={sendDoctorDataParent} t={props.t}/></div>  
      <SubHome data={data} searchPrams={searchPrams} subSpecialist={subSpecialist} genderFilterSearch={genderFilterSearch}
      degreeFilterSearch={degreeFilterSearch} sebSpecFilterSearch={sebSpecFilterSearch}
      getDataForPagination={getDataForPagination} t={props.t}/>
    </React.Fragment>
  );
}

export default MainHome;
