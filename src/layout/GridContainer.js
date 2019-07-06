import React from 'react';
import './GridContainer.css';

function GridContainer(props) {
	const style = {
		gridTemplateColumns: Array(props.columns).fill('1fr').join(' ')

	};
	return <div className="grid-container" style={style}>{props.children}</div>
}

export default GridContainer;