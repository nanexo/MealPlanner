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
			<input type="text" value={value} onChange={handleValueChanged} size={props.size || 3} />
		</>
	);
}

export default Entry;