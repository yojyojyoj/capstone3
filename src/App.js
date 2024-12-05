// import AppNavBar.js
import AppNavBar from './components/AppNavBar';
// import Banner from  './components/Banner';
// import Highlights from './components/Highlights';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ProductsCatalog from './pages/ProductsCatalog';
import ProductView from './pages/ProductView';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import {useState, useEffect} from 'react';

function App() {
    
    const [user, setUser] = useState({
      id: null,
      isAdmin: null
    })

    function unsetUser(){
      localStorage.clear();
    }


    /*useEffect(() => {
      console.log(user);
      console.log(localStorage);
      
    }, [user])*/

    // This fetch the user details to set as its user state.
    useEffect(()=> {
        //fetch to retrieve the user details
      
      if(localStorage.getItem('token')){
          fetch('http://localhost:4004/b4/users/details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {
              // console.log(data);

              if(data._id === undefined){
                setUser({
                  id:null,
                  isAdmin: null
                })
              }else{
                setUser({
                  id: data._id,
                  isAdmin: data.isAdmin
                })
              }
          })

      }else{
        setUser({
          id: null,
          isAdmin:null
        })
        
      }

    }, [])



  return (
    <>
        <UserProvider value = {{user, setUser, unsetUser}}>
            <Router>
              <AppNavBar/>
              <Container>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/products" element={<ProductsCatalog />} />
                  <Route path="/products/:productId" element={<ProductView />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Container>
            </Router>
        </UserProvider>
    </>
  );
}

export default App;
