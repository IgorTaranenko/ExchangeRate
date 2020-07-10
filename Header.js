import React from 'react';
import './ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'

export default function Header (props) {
	return(

		<header className="rates-header">
			<Container>
				<Row>
				  <Col md={3}>			  	
				  </Col>
				  <Col md={6}>			  	
								  <h2>Курсы валют на сегодня:</h2>
								  <h2>...</h2>
				  </Col>
				  <Col md={3}>			  	
				  </Col>
				</Row>
			</Container>
		</header>
		)
}	

