
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import RegisterCourt from './pages/RegisterCourt';
import UploadProfilePic from './componets/UploadProfilePic';
import MyCourts from './pages/MyCourts';
import SinglecardDetails from './pages/SinglecardDetails';
import UserAllCourts from './pages/UserAllCourts';
import SINglecourtUserDetails from './pages/SINglecourtUserDetails';
import Loader from './componets/Loader';
import { Suspense } from 'react';
import { VendorAuthorization ,LoginPageAuth, UserAuthorization, HomeAuthorization} from './authorization/Authorization';
import Toast from './componets/Toast';
import UserBooking from './pages/UserBooking';
import CancelledBookings from './pages/CancelledBookings';



function App() {

  return (
    <> 
   <Toast />
     <BrowserRouter>
        <Routes>  
        <Route element={<LoginPageAuth/>}>
          <Route path='/' element={< Login />}/> 
          
               </Route> 
<Route element={<HomeAuthorization/>}>
<Route  path='/home' element={<Suspense fallback={<Loader />}>
  < Home/>
</Suspense>}/>
</Route>
  
          <Route element={<VendorAuthorization/> }>
   
        <Route  path='/registercourt' element={< RegisterCourt />}/>
        <Route  path='/uploadprofilepic' element={< UploadProfilePic />}/>
        <Route  path='/mycourts' element={< MyCourts />}></Route>
        <Route  path='/openCourtEdit/:id' element={< SinglecardDetails/>}/>
        </Route>
<Route element={<UserAuthorization/>} >
<Route path="/userBookings" element={<UserBooking/>}/>
<Route  path='/userallcourts' element={< UserAllCourts/>}/>
<Route  path='/openUserCourtEdit/:id' element={< SINglecourtUserDetails/>}/>
<Route path='/getCancelledUserBookings' element={< CancelledBookings />}/>
</Route>
   
       
  
       
     
   </Routes>
  </BrowserRouter>
      </>
   

  
  )
  }
export default App;
