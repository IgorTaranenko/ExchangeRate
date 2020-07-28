import React from 'react';
import '../ExchangeRate.css'
import { Container, Col, Row } from 'react-bootstrap'
import InputSum from './InputSum.js'
import SwitchButtons from './SwitchButtons.js'
import Result from './Result.js'

class Converter extends React.Component {

 	constructor(props) {
 	 	super(props);
 	 	this.state = {
 	 		rates: this.props.rates,
 	 		value: null,
         convertValue: null,
         radioChange: [false, false, false],
         activeRate: null,
         rateSwitch: null,
 	 	}
   }

// Ввод суммы 

 	inputChange = (event) => { 
      const { activeRate, rates, rateSwitch } = this.state; 
      const value = event.target.value; 
      if (activeRate && rateSwitch) {
         if (rateSwitch == "to") {
            let rate = rates[activeRate].buy;
            let convertValue = this.convertMethod(rate, value);
            this.setState({value: value, convertValue: convertValue});
         } 
         if (rateSwitch == "from") {
            let rate = rates[activeRate].sale;
            let convertValue = this.convertMethod(rate, value);
            this.setState({value: value, convertValue: convertValue});
         }           
      } else {
         this.setState({value: NaN});         
         alert("Выберете курс и способ конвертации!");
      }      
   }

// Замыкание

   convertTo = (rate) => {
      return function convert(sum) {
         return rate * sum;
      }
   }

   convertFrom = (rate) => {
      return function convert(sum) {
         return sum / rate;
      }
   }

// Конвертация валюты

   convertMethod = (rate, value) => {
      const { rateSwitch } = this.state;
      let rateMethod;
      if (rateSwitch == "to") {
         rateMethod = this.convertTo(rate);
      }
      if (rateSwitch == "from") {
         rateMethod = this.convertFrom(rate);   
      }      
      let convertValue = parseInt(rateMethod(value) * 100) / 100;
      return convertValue;
   }

// Радио кнопки

   radioClick = (event) => {
      const { rates, radioChange, activeRate, value } = this.state;
      const index = event.target.id;
      let rate = rates[index].buy;
      if (activeRate) {
         let newConvertValue = this.convertMethod(rate, value);
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

// Переключатель кнопок

   switchClick = (event) => {
      console.log(this.state.rateSwitch)
      const buttonId = event.target.id;
      this.setState({rateSwitch: buttonId});
      console.log(this.state.rateSwitch)
   }

// Список названий валют

   ccyList = () => {
      const { rates } = this.state;
      const result = rates.map(item => {
         return item.ccy;
      });
      return result;
   }

   render() {
      const { value, convertValue, radioChange, rateSwitch, activeRate } = this.state;
      return(
         <Container>
            <Row>
               <Col md={12}>
                  <SwitchButtons switchClick={this.switchClick} rateSwitch={rateSwitch}/>
               </Col>
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
 	 	 	 		<Col md={6}>
                  <Result result={convertValue} rateSwitch={rateSwitch} activeRate={activeRate} ccyList={this.ccyList}/>
               </Col>
 	 	 	 		<Col md={3} />
 	 	 	 	</Row>
 	 	 	</Container>
       
 	 	 	); 	 
 	 }

 }

 export default Converter