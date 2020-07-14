 import React from 'react';
 import './ExchangeRate.css'
 import { Container, Col, Row } from 'react-bootstrap'

 class Converter extends React.Component {

 	 constructor(props) {
 	 	super(props);
 	 	this.state = {
 	 		 rates: this.props.rates,
 	 		 value: null,
						radioChange: [false, false, false]
 	 	}
 	 }

 	 inputChange = event => {
 	 	 this.setState({value: event.target.value});
 	 }

 	 convertTo = (rate) => {
 	 	 return function convert(sum) {
							return rate * sum;
 	 	 }
 	 }
			
   radioClick = (event, int) => {
   	 let index = event.target.id;
   	 let { radioChange } = this.state;
   	 let newR = radioChange.map((item) => {
   	 	 return item = false
   	 });
   	 newR[index] = true;
   	 this.setState({radioChange: newR});
   	 alert(int);
   }

 	 render() {
 	 	 const { rates, value } = this.state;
 	 	 const toUS = this.convertTo(rates[0].sale);
 	 	 const toEUR = this.convertTo(rates[1].sale);
 	 	 const toRUR = this.convertTo(rates[2].sale);
 	 	 return(
 	 	 	 <Container>
 	 	 	 	<Row>
 	 	 	 	  <Col md={2}/>
 	 	 	 		 <Col md={4}>
 	 	 	 		 <label className="block">
 	 	 	 		 	<input onClick={(event) => this.radioClick(event, toUS(2))} id={0} type="radio" checked={this.state.radioChange[0]}/>
 	 	 	 		 	Доллары
 	 	 	 		 </label>
 	 	 	 		 <label className="block">
 	 	 	 		 	<input onClick={(event) => this.radioClick(event, toEUR(2))} id={1} type="radio" checked={this.state.radioChange[1]}/>
 	 	 	 		 	Евро
 	 	 	 		 </label>
 	 	 	 		 <label className="block">
 	 	 	 		 	<input onClick={(event) => this.radioClick(event, toRUR(2))} id={2} type="radio" checked={this.state.radioChange[2]}/>
 	 	 	 		 	Рубли
 	 	 	 		 </label>
 	 	 	 		 </Col>
 	 	 	 		 <Col md={4}><input onChange={this.inputChange} type="text" value={this.state.value}/></Col>
 	 	 	 		 <Col md={2}/>
 	 	 	 	</Row>
 	 	 	 	<Row>
 	 	 	 		 <Col md={5} />
 	 	 	 		 <Col md={2}><h2>{}</h2></Col>
 	 	 	 		 <Col md={5} />
 	 	 	 	</Row>
 	 	 	 </Container>
       
 	 	 	); 	 
 	 }

 }

 export default Converter