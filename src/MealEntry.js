import React from 'react';
import './MealEntry.css';

class MealEntry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: props.amount};

		this.handleAmountChange = this.handleAmountChange.bind(this);
	}

	handleAmountChange(event) {
		this.setState({value: event.target.value});
		this.props.onAmountChanged(this.props.id, event.target.value);
		
	}

	render() {
		return (
			<>
				<span>{this.props.title}</span>
				<input type="text" value={this.state.value} onChange={this.handleAmountChange} />
			</>
		);
		
	};
}

export default MealEntry;