import React, { createContext, useState } from 'react'
import Logincard from '../componets/Logincard'
import { Container ,Row, Col} from 'react-bootstrap'
import Signupcard from '../componets/Signupcard'
import './login.css'


export const loginContext=createContext()
function Login() {
  const[login,setLogin]=useState(true)
  return (
    <Container fluid className='frontpage' style={{ height:'681px'}}>
      <Row className='' >
<Col className=' d-flex justify-content-center  align-items-center'>
<loginContext.Provider value={{login , setLogin}}>
        {login?<Logincard />: <Signupcard/>}
        </loginContext.Provider>
</Col> 
      </Row>
 
    </Container>

  )
}

export default Login