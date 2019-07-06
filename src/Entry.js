import React, { useState } from 'react';
import './Entry.css';


function Entry(props) {
	const [value, setValue] = useState(props.value);
	const handleValueChanged = (event) => {
		setValue(event.target.value);
		props.onValueChanged(props.field, event.target.value);
	}

	return (
		<>
			<span>{props.label}</span>
			<input type="text" value={value} onChange={handleValueChanged} />
		</>
	);
}

// class Entry extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {value: props.amount};

// 		this.handleAmountChange = this.handleAmountChange.bind(this);
// 	}

// 	handleAmountChange(event) {
// 		this.setState({value: event.target.value});
// 		this.props.onAmountChanged(this.props.id, event.target.value);
		
// 	}

// 	render() {
// 		return (
// 			<>
// 				<span>{this.props.title}</span>
// 				<input type="text" value={this.state.value} onChange={this.handleAmountChange} />
// 			</>
// 		);
		
// 	};
// }

export default Entry;