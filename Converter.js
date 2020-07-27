import React from 'react';
import './ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'

class Converter extends React.Component {

 	constructor(props) {
 	 	super(props);
 	 	this.state = {
 	 		rates: this.props.rates,
 	 		value: null,
         convertValue: null,
         radioChange: [false, false, false],
         activeRate: null,
 	 	}
   }

 	inputChange = (event) => {
      const { activeRate, rates } = this.state;
      const value = event.target.value;
      let convertValue = value;
      let rate = rates[activeRate].sale;
      let rateMethod = this.convertTo(rate);
      convertValue = rateMethod(value);
      convertValue = parseInt(convertValue * 100) / 100;
      this.setState({value: value, convertValue: convertValue});
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
   	this.setState({radioChange: newR, activeRate: index});

   }

   render() {
      const { rates, value, convertValue, radioChange } = this.state;    
      console.log(rates[0].sale);
      return(
         <Container>
 	 	 	 	<Row>
 	 	 	 	   <Col md={2}/>
 	 	 	 		<Col md={4}>
                  <div className="wrapper wrapper-col">
                     <label className="rates-radio">
                        {radioChange[0] ? <span className="rates-mark"></span> : ''}
                        <input onClick={(e) => this.radioClick(e)} id={0} type="radio" checked={radioChange[0]}/>
                        {radioChange[0] ? <span className="td-u">Доллары</span> : 'Доллары'}
                     </label>
                     <label className="rates-radio">
                        {radioChange[1] ? <span className="rates-mark"></span> : ''}
                        <input onClick={(e) => this.radioClick(e)} id={1} type="radio" checked={radioChange[1]}/>
                        {radioChange[1] ? <span className="td-u">Евро</span> : 'Евро'}
                     </label>
                     <label className="rates-radio">
                        {radioChange[2] ? <span className="rates-mark"></span> : ''}              
                        <input onClick={(e) => this.radioClick(e)} id={2} type="radio" checked={radioChange[2]}/>
                        {radioChange[2] ? <span className="td-u">Рубли</span> : 'Рубли'}
                     </label>
                  </div>
               </Col>
 	 	 	 		<Col md={4}><div className="wrapper"><input className="rates-sum" onChange={(e) => this.inputChange(e)} type="Number" value={this.state.value}/></div></Col>
 	 	 	 		<Col md={2}/>
 	 	 	 	</Row>
 	 	 	 	<Row>
 	 	 	 		<Col md={5} />
 	 	 	 		<Col md={2}><h2>{convertValue}</h2></Col>
 	 	 	 		<Col md={5} />
 	 	 	 	</Row>
 	 	 	</Container>
       
 	 	 	); 	 
 	 }

 }

 export default Converter