import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Register from './components/auth/Register';
import Nav from './components/navbar/Nav';
import { useEffect, useState } from 'react';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';

function App() {
  let [user, setUser] = useState('');
  let [login, setLogin] = useState(false);
  
  useEffect(() => {
    
    fetch('http://localhost:8000/api/patientUser', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'http://localhost:3000','Access-Control-Allow-Credentials':'true'},
        credentials: 'include',
    }).then( response => response.json())
    .then(user => {
        console.log(user);
        setUser(user.name_en);
    }
    )
    .catch(error => {
                console.log(error);
                setUser('');
    });
    

},[login]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setUser={setUser} setLogin={() => setLogin(false)}/>  
        
        <Route path="/" exact component={() => <Home user={user}/>}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)}/>}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
