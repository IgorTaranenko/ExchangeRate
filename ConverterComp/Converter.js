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
      const { activeRate, rateSwitch } = this.state; 
      const value = event.target.value; 
      let rate;
      if (activeRate && rateSwitch) {
         rate = this.switchCheck(activeRate, rateSwitch);
         let convertValue = this.convertMethod(rate, value);
         this.setState({value: value, convertValue: convertValue});      
      } else {
         this.setState({value: NaN});         
         alert("Выберете курс и способ конвертации!");
      }      
   }

// Замыкания

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

   convertMethod = (rate, value, switchValue) => {
      if (!switchValue) {
         const { rateSwitch } = this.state;
         switchValue = rateSwitch;
      }      
      let rateMethod;
      if (switchValue == "to") {
         rateMethod = this.convertTo(rate);
      }
      if (switchValue == "from") {
         rateMethod = this.convertFrom(rate);   
      }      
      let convertValue = parseInt(rateMethod(value) * 100) / 100;
      return convertValue;
   }

// Радио кнопки

   radioClick = (event) => {
      const { radioChange, activeRate, value, rateSwitch } = this.state;
      const index = event.target.id;
      let rate = this.switchCheck(index, rateSwitch);
      if (value) {
         let newConvertValue = this.convertMethod(rate, value);
         this.setState({convertValue: newConvertValue});  
      }
      let newRadioChange = radioChange.map((item) => {
         return item = false
      });
      newRadioChange[index] = true;
      this.setState({radioChange: newRadioChange, activeRate: index});
   }

// Кнопка удалить

   deleteClick = () => {
      this.setState({value: NaN, convertValue: NaN});
   }

// Переключатель кнопок

   switchMethod = (switchValue) => {
      const { value, activeRate } = this.state;
      this.setState({rateSwitch: switchValue});
      if (value) {
         let rate = this.switchCheck(activeRate, switchValue);
         const convertValue = this.convertMethod(rate, value, switchValue);
         this.setState({convertValue: convertValue});
      }      
   }

// Список названий валют

   ccyList = () => {
      const { rates } = this.state;
      const result = rates.map(item => {
         return item.ccy;
      });
      return result;
   }

// Проверка свича
   
   switchCheck = (index, activeSwitch) => {
      const { rates } = this.state;
      let rate;
      if (activeSwitch == "to") {
         rate = rates[index].buy;
      }
      if (activeSwitch == "from") {
         rate = rates[index].sale;
      }
      return rate;
   }

   render() {
      const { value, convertValue, radioChange, rateSwitch, activeRate } = this.state;
      return(
         <Container>
            <Row>
               <SwitchButtons switchMethod={this.switchMethod} rateSwitch={rateSwitch}/>
            </Row>
 	 	 	 	<Row>
 	 	 	 	   <Col lg={2} sm={0}/>
 	 	 	 		<Col lg={4} md={6} sm={12}>
                  <div className="wrapper wrapper-col sm-cent">
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
 	 	 	 		<Col lg={4} md={6} sm={12}>
                   <InputSum deleteClick={this.deleteClick} value={value} onChange={(e) => {this.inputChange(e)}}/>  
               </Col>
 	 	 	 		<Col lg={2} sm={0}/>
 	 	 	 	</Row>
 	 	 	 	<Row>
 	 	 	 		<Col lg={3} />
 	 	 	 		<Col lg={6}>
                  <Result result={convertValue} rateSwitch={rateSwitch} activeRate={activeRate} ccyList={this.ccyList}/>
               </Col>
 	 	 	 		<Col lg={3} />
 	 	 	 	</Row>
 	 	 	</Container>
       
 	 	 	); 	 
 	 }

 }

 export default Converter