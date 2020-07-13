import React from 'react';
import './ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'

 function Header (props) {

 const { rates } = props;
 console.log(rates[0]);
 return(

		<header className="rates-header">
			<Container>
				<Row>
				  <Col md={3}>			  	
				  </Col>
				  <Col md={6}>			  	
								  <h2>Курсы валют на сегодня:</h2>
								  
				  </Col>
				  <Col md={3}>			  	
				  </Col>
				</Row>
			</Container>
		</header>
		)
}	

export default Header