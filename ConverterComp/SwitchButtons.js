 
import React from 'react';
import '../ExchangeRate.css'
import { Col } from 'react-bootstrap'

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
			<React.Fragment>
				<Col lg={2}/>
				<Col lg={4} md={6} sm={12}>
					<div className="left">
						<button onClick={(event) => {this.switchClick(event)}} id={"to"} className={toButtonStyle}>Конвертировать валюту в UAH</button>
					</div>
				</Col>
				<Col lg={4} md={6} sm={12}>
					<div className="right">
						<button onClick={(event) => {this.switchClick(event)}} id={"from"} className={forButtonStyle}>Конвертировать UAH в валюту</button>
					</div>
				</Col>
				<Col lg={2}/>
			</React.Fragment>
		)
	}
}

export default SwitchButtons