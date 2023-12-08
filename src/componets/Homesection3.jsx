import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

function Homesection3() {
  return (
  <Container fluid>
        <Row className='' style={{padding:'40px 0',lineHeight:'2em'}}>
            <h4 className='text-center my-5'>Automate your tennis club or sports hall</h4>
           <Col className='d-flex flex-column justify-content-center align-items-center mb-5' sm={12} md={6} lg={3}>
<img src="https://static.supersaas.net/img/icons/icn_payment.png" alt=""  style={{width:'250px'}}/>
<h5 className='my-3'>Online payment options </h5>
<p className='mb-3 text-center'>Free integrated payment processing possible via PayPal, credit card and more</p>
</Col> 
           <Col className='d-flex flex-column justify-content-center align-items-center' sm={12} md={6} lg={3}>
<img src="https://static.supersaas.net/img/icons/icn_users.png" alt="" style={{width:'250px'}}/>
<h5 className='my-3'>User roles & management</h5> 
<p className='mb-5 text-center'>Set rules for members and non-members and provide users with additional rights.</p>
</Col> 
           <Col className='d-flex flex-column justify-content-center align-items-center' sm={12} md={6} lg={3} >
<img src="https://static.supersaas.net/img/icons/icn_stats.png" alt=""  style={{width:'250px'}}/>
<h5 className='my-3'>Keep an overview </h5>

<p className='mb-5 text-center'>With reports and analyzes you always keep an overview of the occupation and turnover.</p>
</Col> 
<Col className='d-flex flex-column justify-content-center align-items-center' sm={12} md={6} lg={3}>
<img src="https://static.supersaas.net/img/icons/icn_budget.png" alt=""  style={{width:'250px'}}/>
<h5 className='my-3'>Matches any budget </h5>
<p className='mb-5 text-center'>Free version for small users, subscriptions start at only $9 a month</p></Col>
        </Row>
        </Container>
      
  )
}

export default Homesection3