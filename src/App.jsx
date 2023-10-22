
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Navcomponent from "./componets/Navcomponent"
import Newproduct from './pages/Newproduct';
import RegisterCourt from './pages/RegisterCourt';
import UploadProfilePic from './componets/UploadProfilePic';
import MyCourts from './pages/MyCourts';
import SinglecardDetails from './pages/SinglecardDetails';




function App() {
  return (
    <div>
      
< Navcomponent />
     
<BrowserRouter>
   <Routes>
    
   <Route path='/' element={< Login />}></Route>
   <Route  path='/home' element={< Home />}></Route>
   <Route  path='/newproduct' element={< Newproduct />}></Route>
   <Route  path='/registercourt' element={< RegisterCourt />}></Route>
   <Route  path='/uploadprofilepic' element={< UploadProfilePic />}></Route>
   <Route  path='/mycourts' element={< MyCourts />}></Route>
   <Route  path='/openCourtEdit/:id' element={< SinglecardDetails/>}></Route>
   </Routes>
   
   </BrowserRouter>
    </div>
   

  
  )
  }
export default App;
