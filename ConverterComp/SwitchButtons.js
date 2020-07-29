 
import React from 'react';
import '../ExchangeRate.css'

class SwitchButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rateSwitch: this.props,
			toButtonStyle: "rates-button",
			forButtonStyle: "rates-button",
		};
	}

	switchClick = (event) => {
		const notCheckedButton = "rates-button";
		const checkedButton = "rates-button rates-button-selected";
		const buttonId = event.target.id;
		if (buttonId == "to") {
			this.setState({toButtonStyle: checkedButton, forButtonStyle: notCheckedButton});
		}
		if (buttonId == "from") {
			this.setState({toButtonStyle: notCheckedButton, forButtonStyle: checkedButton});
		}
		this.props.switchMethod(buttonId);
	}

	render() {
		const { rateSwitch, toButtonStyle, forButtonStyle } = this.state;
		return(
			<div className="wrapper wrapper-button">
			   <button onClick={(event) => {this.switchClick(event)}} id={"to"} className={toButtonStyle}>Конвертировать валюту в UAH</button>
			   <button onClick={(event) => {this.switchClick(event)}} id={"from"} className={forButtonStyle}>Конвертировать UAH в валюту</button>
			</div>
		)
	}
}

export default SwitchButtons