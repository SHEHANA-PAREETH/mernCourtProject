import './Testimonials.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Col, Container,Row } from 'react-bootstrap';

function Testimonials()  {
 
    return (
        <Container className='my-5'>
            <Row>
                <Col>
                <h3 className='my-4 text-center' >What our customers say!....</h3>
                <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--0SCWkYwS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9dhr4cw2s0skgfig8qnw.png" />
          <div className="myCarousel">
            <h3>Shirley Fultz</h3>
            <h4>Designer</h4>
            <p>
            I love using this app. Very convenient to book courts for the weekends. Also the notification about upcoming events is also a cool feature
            </p>
          </div>
        </div>

        <div>
          <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nSI8V6RE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/81co8nilff5r9eer3xga.png" />
          <div className="myCarousel">
            <h3>Daniel Keystone</h3>
            <h4>Designer</h4>
            <p>
            Amazing App. It's a nice idea. I had badminton courts nearby but didn't able to find players. The app helped me to find within 10mins!!
            </p>
          </div>
        </div>

        <div>
          <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--gRFMHqWs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1xwiaya5i7wweic3pz96.png
          " />
          <div className="myCarousel">
            <h3>Theo Sorel</h3>
            <h4>Designer</h4>
            <p>
            Useful app In the midst of nonsense app making and backup. ----- is a comfortable one. It's here to stay. Need more speed. Kudos.
            </p>
          </div>
        </div>
      </Carousel>
      </Col>
            </Row>

        </Container>
               
            
     
    );
  }
export default Testimonials