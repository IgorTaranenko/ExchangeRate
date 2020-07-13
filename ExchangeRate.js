 
 import React from 'react';
 import './ExchangeRate.css'
 import Header from './Header.js'

 

 class ExchangeRate extends React.Component{
 

 constructor() {
 	super();
 	this.state = {
 		rates: [],
 	}
 }
 
 ratesToState = (json) => {
   const stateRates = json.map(json => {
     return(
      {ccy: json.ccy, buy: json.buy, sale: json.sale}
      )
   });
   this.setState({rates: stateRates});
 }

 async componentDidMount() { 
   const url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
   const response = await fetch(`${url}`);
   if (response.ok) {
    const json = await response.json();
   } else {
     alert("Ошибка HTTP: " + response.status)
   }
 }
 
 
 render() {
  const { rates } = this.state;
  return(
   <React.Fragment>
     <Header rates={rates}></Header>
     
   </React.Fragment>
  );
 }

 }

 export default ExchangeRate