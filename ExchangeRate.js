 
 import React from 'react';
 import './ExchangeRate.css'
 import { Spinner } from 'react-bootstrap'
 import Header from './Header.js'
 import Converter from './ConverterComp/Converter.js'

 

class ExchangeRate extends React.Component{
 

  constructor() {
    super();
    this.state = {
      rates: [
      // {ccy: "USA", buy: 26.8000, sale: 27.1000},
      // {ccy: "EUR", buy: 28.8000, sale: 29.1000},
      // {ccy: "RUR", buy: 0.3600, sale: 0.4000},
      ],
      isLoaded: false
    }
  }
 
ratesToState = (json) => {
  const stateRates = json.map(json => {
    return(
      {ccy: json.ccy, buy: Number(json.buy), sale: Number(json.sale)}
      )
  });
  this.setState({rates: stateRates});
 }

 async componentDidMount() { 
   const url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
   try {
     const response = await fetch(`${url}`);
     if (response.ok) {
      const json = await response.json();
      this.ratesToState(json);
      this.setState({isLoaded: true});
     } else {
       alert("Ошибка HTTP: " + response.status)
     }
   } catch(error) {
     console.log(error);
   }   
 }
 
 
render() {
  const { rates, isLoaded } = this.state;
  return(
    <React.Fragment>
      {isLoaded ? ( 
        <React.Fragment>
          <Header rates={rates} />
          <Converter rates={rates} />
        </React.Fragment>
        ) : <div className="center-block"><Spinner animation="border" /></div>}      
    </React.Fragment>
  );
}

}

 export default ExchangeRate