import React, { useState, useEffect, useCallback } from "react";
import { Select } from "semantic-ui-react";

const Districts = ({ _dis,sendDistrictIDToParent,t}) => {

  const onChangeHandler = (e, data) => {
    console.log(data.value);
    sendDistrictIDToParent(data.value);
  };
  const [districts, setData] = useState([]);
  
  useEffect(() => {
    setData(_dis);
  });
  return (
    <Select
      placeholder={t('Districts.districtName')}
      style={{ border: "none" }}
      options={districts}
      onChange={onChangeHandler}
    />
  );
};

export default Districts;
