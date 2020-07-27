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
      const { activeRate, rates } = this.state; // стейты
      const value = event.target.value; // sum
      if (activeRate) {
         let rate = rates[activeRate].buy;
         let convertValue = this.convertMethod(rate, value);
         this.setState({value: value, convertValue: convertValue});   
      } else {
         this.setState({value: null});         
         alert("Выберете курс!");
      }      
   }

   convertTo = (rate) => {
      return function convert(sum) {
         return rate * sum;
      }
   }

   convertMethod = (rate, value) => {
      let rateMethod = this.convertTo(rate);
      let convertValue = parseInt(rateMethod(value) * 100) / 100;
      return convertValue;
   }
         
   radioClick = (event) => {
      let { rates, radioChange, activeRate, value, convertValue } = this.state;
      let index = event.target.id;
      if (activeRate) {
         let rateMethod = this.convertTo(rates[index].buy);
         let newConvertValue = (convertValue / rates[activeRate].buy);
         newConvertValue = parseInt(rateMethod(value) * 100) / 100;
         this.setState({convertValue: newConvertValue});  
      }
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