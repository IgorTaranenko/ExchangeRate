 
 import React from 'react';
 import ReactDOM from 'react-dom';
 

 class ExchangeRate extends React.Component{
 
 gettingWeather = async () => {
   const api_url = await
   fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`);  
   const data = await api_url.json();
   alert(data[0].buy);

 }
 
 render() {
  return(
   <div className="weather">
  	  <button onClick={this.gettingWeather} type="button" className="btn btn-primary">get</button>

   </div>
  );
 }

 }

 export default ExchangeRate