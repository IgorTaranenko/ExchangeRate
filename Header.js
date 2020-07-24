import React from 'react';
import './ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'

 function Header (props) {

 const { rates } = props;
 const ratesShow = rates.map((rate) => {
   return <span className="rates-Exchange">{rate.ccy}: {parseInt(rate.buy * 100) / 100} / {parseInt(rate.sale * 100) / 100}</span>
	})
 return(

		<header className="rates-header">
			<Container>
				<Row>
				  <Col md={1}/>
				  <Col md={10}>			  	
						<h2>Курсы валют на сегодня:</h2>
						<div className="center-block">{ratesShow}</div>
				  </Col>
				  <Col md={1}/>
				</Row>
			</Container>
		</header>
		)
}	

export default Header