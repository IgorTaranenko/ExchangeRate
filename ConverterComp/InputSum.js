import React from 'react';
import '../ExchangeRate.css';

class InputSum extends React.Component {
	constructor(props) {
		super(props);
		const withAnim = "rates-sum rates-sum-anim";
		const withoutAnim = "rates-sum";
		this.state = {
			value: null,
			inputClass: withoutAnim,
		};
	}

	delay = () => {
		return new Promise(resolve => setTimeout(resolve, 500));
	}

	animateInput = () => {
		const { value } = this.props;
		const withAnim = "rates-sum rates-sum-anim";
		const withoutAnim = "rates-sum";
		if (value) {
			this.setState({inputClass: withAnim});
			this.delay().then(() => {
				this.props.deleteClick();
				this.delay().then(() => {
					this.setState({inputClass: withoutAnim});
				});
			});
		} else {
			this.props.deleteClick();
		}		
	}
	

	render() {
		const { value } = this.props;
		const { inputClass } = this.state;
		return(
			<div className="wrapper">
				<input className={inputClass} onChange={this.props.onChange} type="Number" min="1" value={value}/>
				<span onClick={this.animateInput} className="clear"></span>
			</div>
		)
	}
}

export default InputSum