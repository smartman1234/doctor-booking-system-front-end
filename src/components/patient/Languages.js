import React from 'react'
import { Select } from 'semantic-ui-react'



const Languages = (props) => {

  const onChangeHandler = (e, data) => {
    console.log("lang = ",data.value);
    props.sendLangToParent(data.value);
  };

  const langs = [
    { key: 'en', value: 'en', text: props.t('Navbar.english') },
    { key: 'ar', value: 'ar', text: props.t('Navbar.arabic') }
  ];
  
  return (
    <Select 
    placeholder={props.t('Navbar.languages')}
    style={{ border: "none" }} 
    options={langs} 
    onChange={onChangeHandler}
    />
  );
}

export default Languages
