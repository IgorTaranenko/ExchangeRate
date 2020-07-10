 
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
 

 async componentDidMount() { 
   const api_url = await
   fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
   const json = await api_url.json();
   this.setState({ rates: json });

  }
 
 
 render() {
  return(
   <React.Fragment>
     <Header></Header>
     
   </React.Fragment>
  );
 }

 }

 export default ExchangeRate