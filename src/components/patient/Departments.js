import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

const departments = [
  { key: "gg", value: "gg", text: "Dept1" },
  { key: "hh", value: "hh", text: "Dept2" },
];

const Departments = ({sendDepartmentIDToParent,t}) => {
  const onChangeHandler = (e, data) => {
    console.log(data.value);
    sendDepartmentIDToParent(data.value)
  };
  const [departments, setData] = useState([]);
  useEffect(() => {
    getDepartmentsAPI();
  }, []);

  function getDepartmentsAPI() {
    fetch(`http://127.0.0.1:8000/api/specialists`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Res => ", res);
        let departments = res.map((department) => {
          return {
            key: department["id"],
            value: department["id"],
            text: department["name_en"],
          };
        });
        setData(departments);
      })

      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Select
      placeholder={t('Departments.departmentName')}
      style={{ border: "none" }}
      options={departments}
      onChange={onChangeHandler}
    />
  );
};

export default Departments;
