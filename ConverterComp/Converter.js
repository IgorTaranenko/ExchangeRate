import React from 'react';
import '../ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'
import InputSum from './InputSum.js'

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

// Ввод суммы 

 	inputChange = (event) => { 
      const { activeRate, rates } = this.state; 
      const value = event.target.value; 
      if(event.keyCode == 27) {
            alert("Hello");
         }
      if (activeRate) {
         let rate = rates[activeRate].buy;
         let convertValue = this.convertMethod(rate, value);
         this.setState({value: value, convertValue: convertValue});   
      } else {
         this.setState({value: NaN});         
         alert("Выберете курс!");
      }      
   }

// Замыкание

   convertTo = (rate) => {
      return function convert(sum) {
         return rate * sum;
      }
   }

// Конвертация валюты

   convertMethod = (rate, value) => {
      let rateMethod = this.convertTo(rate);
      let convertValue = parseInt(rateMethod(value) * 100) / 100;
      return convertValue;
   }

// Радио кнопки

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

// Кнопка удалить

   deleteClick = () => {
      this.setState({value: NaN, convertValue: NaN});
   }

   render() {
      const { rates, value, convertValue, radioChange } = this.state;    
      console.log(rates[0].sale);
      return(
         <Container>
            <Row>
               <Col md={12}><h2 className="mt-3 mb-3 center-block">Конвертировать валюту в UAH</h2></Col>
            </Row>
 	 	 	 	<Row>
 	 	 	 	   <Col md={2}/>
 	 	 	 		<Col md={4}>
                  <div className="wrapper wrapper-col">
                     <label className="rates-radio">
                        {radioChange[0] ? <span className="rates-mark"></span> : ''}
                        <input onClick={(e) => this.radioClick(e)} id={0} type="radio" checked={radioChange[0]}/>
                        {radioChange[0] ? <span className="td-u blue-color">Доллары</span> : 'Доллары'}
                     </label>
                     <label className="rates-radio">
                        {radioChange[1] ? <span className="rates-mark"></span> : ''}
                        <input onClick={(e) => this.radioClick(e)} id={1} type="radio" checked={radioChange[1]}/>
                        {radioChange[1] ? <span className="td-u blue-color">Евро</span> : 'Евро'}
                     </label>
                     <label className="rates-radio">
                        {radioChange[2] ? <span className="rates-mark"></span> : ''}              
                        <input onClick={(e) => this.radioClick(e)} id={2} type="radio" checked={radioChange[2]}/>
                        {radioChange[2] ? <span className="td-u blue-color">Рубли</span> : 'Рубли'}
                     </label>
                  </div>
               </Col>
 	 	 	 		<Col md={4}>
                  <InputSum deleteClick={this.deleteClick} value={value} onChange={(e) => {this.inputChange(e)}}/>
               </Col>
 	 	 	 		<Col md={2}/>
 	 	 	 	</Row>
 	 	 	 	<Row>
 	 	 	 		<Col md={3} />
 	 	 	 		<Col md={6}>{convertValue ? <h2 className="center-block">{convertValue} UAH</h2> : ''}</Col>
 	 	 	 		<Col md={3} />
 	 	 	 	</Row>
 	 	 	</Container>
       
 	 	 	); 	 
 	 }

 }

 export default Converter