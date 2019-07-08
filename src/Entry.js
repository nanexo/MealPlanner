import React, { useState } from 'react';
import './Entry.css';


function Entry(props) {
	const [value, setValue] = useState(props.value);
	const handleValueChanged = (event) => {
		setValue(event.target.value);
		props.onValueChanged(props.field, event.target.value);
	}

	let style = null;
	if(props.autoWidth) {
		style = {width: (''+(value||1)).length + 'ch'};
	}

	return (
		<>
			{!!props.label ? <span>{props.label}</span> : null}
			<input type="text" placeholder={props.placeholder} className={props.appearance} style={style} value={value} onChange={handleValueChanged} size={props.size || 3} />
		</>
	);
}

export default Entry;