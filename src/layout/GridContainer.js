import React from 'react';
import './GridContainer.css';

function GridContainer(props) {
	const style = {
		gridTemplateColumns: props.columns
	};
	return <div className="grid-container" style={style}>{props.children}</div>
}

export default GridContainer;