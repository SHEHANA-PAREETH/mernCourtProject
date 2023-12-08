
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
import { VendorAuthorization ,LoginPageAuth, UserAuthorization, HomeAuthorization, AdminAuthorization, AdminLoginPageAuth} from './authorization/Authorization';
import Toast from './componets/Toast';
import UserBooking from './pages/UserBooking';
import CancelledBookings from './pages/CancelledBookings';
import ForgotPassword from './componets/ForgotPassword';
import AdminHome from './pages/AdminHome';
import UserData from './componets/admin/UserData';
import VendorData from './componets/admin/VendorData';
import BookedCourts from './componets/admin/BookedCourts';
import CancelledCourts from './componets/admin/CancelledCourts';



function App() {

  return (
    <> 
   <Toast />
     <BrowserRouter>
        <Routes>  
        <Route element={<LoginPageAuth/>}>
          <Route path='/' element={< Login />}/> 
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>               </Route> 
<Route element={<HomeAuthorization/>}>
<Route  path='/home' element={<Suspense fallback={<Loader />}>
  < Home/>
</Suspense>}/>
</Route>
  
          <Route element={<VendorAuthorization/> }>
   
        <Route  path='/registercourt' element={<RegisterCourt/>}/>

        <Route  path='/mycourts' element={<MyCourts/>}></Route>
        <Route  path='/openCourtEdit/:id' element={<SinglecardDetails/>}/>
        </Route>
<Route element={<UserAuthorization/>} >
<Route path="/userBookings" element={<UserBooking/>}/>
<Route  path='/userallcourts' element={<UserAllCourts/>}/>
<Route  path='/openUserCourtEdit/:id' element={<SINglecourtUserDetails/>}/>
<Route path='/getCancelledUserBookings' element={<CancelledBookings />}/>
<Route  path='/uploadprofilepic' element={<UploadProfilePic />}/>
</Route>
<Route element={<AdminLoginPageAuth/>}>
<Route path="/adminhome" element={<AdminHome/>}/>
</Route>
       <Route element={<AdminAuthorization/>}>
        <Route path="/cancelledcourts" element={<CancelledCourts/>}/>
<Route path="/Bookedcourts" element={<BookedCourts/>}/>
<Route path="/userdetailsforadmin" element={<UserData/>}/>
<Route path="/vendordetails" element={<VendorData/>}/>
       </Route>
  
       
     
   </Routes>
  </BrowserRouter>
      </>
   

  
  )
  }
export default App;
