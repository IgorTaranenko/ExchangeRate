 
import React from 'react';
import '../ExchangeRate.css'

function Result (props) {
	const { result, rateSwitch, activeRate } = props;
	let resultShow = result;
	const ccyList = props.ccyList();
	if (!result) {
		resultShow = "";
	}
	if (rateSwitch == "to") {
		if (!result) {
			resultShow = "";
		} else {
			resultShow = `${result} UAH`;
		}		
	}
	if (rateSwitch == "from") {
		if (!result) {
			resultShow = "";
		} else {
			resultShow = `${result} ${ccyList[activeRate]}`;
		}
	}
	return(
		<h2 className="center-block">{resultShow}</h2>
	)
}

export default Result