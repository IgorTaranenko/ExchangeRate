 
import React from 'react';
import '../ExchangeRate.css'

function SwitchButtons (props) {
	const { rateSwitch } = props;
	let toButtonStyle = "rates-button";
	let forButtonStyle = "rates-button";
	if (rateSwitch === "to") {
		toButtonStyle = "rates-button rates-button-selected";
	}
	if (rateSwitch === "from") {
		forButtonStyle = "rates-button rates-button-selected";
	}
	

	return(
		<div className="wrapper wrapper-button">
		   <button onClick={props.switchClick} id={"to"} className={toButtonStyle}>Конвертировать валюту в UAH</button>
		   <button onClick={props.switchClick} id={"from"} className={forButtonStyle}>Конвертировать UAH в валюту</button>
		</div>
	)
}

export default SwitchButtons