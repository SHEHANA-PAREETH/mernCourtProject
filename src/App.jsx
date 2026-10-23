import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import Loader from './componets/Loader';
import NotFound from './pages/NotFound';
import Toast from './componets/Toast';
import ForgotPassword from './componets/ForgotPassword';
import { VendorAuthorization, LoginPageAuth, UserAuthorization, HomeAuthorization, AdminAuthorization } from './authorization/Authorization';

// everything except login and home loads on demand, so players never download the admin pages or the chart library
const RegisterCourt = lazy(() => import('./pages/RegisterCourt'));
const MyCourts = lazy(() => import('./pages/MyCourts'));
const SinglecardDetails = lazy(() => import('./pages/SinglecardDetails'));
const UserAllCourts = lazy(() => import('./pages/UserAllCourts'));
const SINglecourtUserDetails = lazy(() => import('./pages/SINglecourtUserDetails'));
const UserBooking = lazy(() => import('./pages/UserBooking'));
const CancelledBookings = lazy(() => import('./pages/CancelledBookings'));
const UploadProfilePic = lazy(() => import('./componets/UploadProfilePic'));
const AdminHome = lazy(() => import('./pages/AdminHome'));
const UserData = lazy(() => import('./componets/admin/UserData'));
const VendorData = lazy(() => import('./componets/admin/VendorData'));
const BookedCourts = lazy(() => import('./componets/admin/BookedCourts'));
const CancelledCourts = lazy(() => import('./componets/admin/CancelledCourts'));

function App() {
  const {openLoader} = useSelector((state)=>state.user)

  return (
    <>
      <Toast />
      {openLoader ? <Loader/> : ''}
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<LoginPageAuth/>}>
              <Route path='/' element={<Login />}/>
              <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            </Route>

            {/* players and vendors */}
            <Route element={<HomeAuthorization/>}>
              <Route path='/home' element={<Home/>}/>
              <Route path='/uploadprofilepic' element={<UploadProfilePic />}/>
            </Route>

            <Route element={<VendorAuthorization/>}>
              <Route path='/registercourt' element={<RegisterCourt/>}/>
              <Route path='/mycourts' element={<MyCourts/>}/>
              <Route path='/openCourtEdit/:id' element={<SinglecardDetails/>}/>
            </Route>

            <Route element={<UserAuthorization/>}>
              <Route path='/userBookings' element={<UserBooking/>}/>
              <Route path='/userallcourts' element={<UserAllCourts/>}/>
              <Route path='/openUserCourtEdit/:id' element={<SINglecourtUserDetails/>}/>
              <Route path='/getCancelledUserBookings' element={<CancelledBookings />}/>
            </Route>

            <Route element={<AdminAuthorization/>}>
              <Route path='/adminhome' element={<AdminHome/>}/>
              <Route path='/cancelledcourts' element={<CancelledCourts/>}/>
              <Route path='/Bookedcourts' element={<BookedCourts/>}/>
              <Route path='/userdetailsforadmin' element={<UserData/>}/>
              <Route path='/vendordetails' element={<VendorData/>}/>
            </Route>

            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}
export default App;
