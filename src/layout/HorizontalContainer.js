import React from 'react';
import './HorizontalContainer.css';

function HorizontalContainer(props) {
	let className = 'h-container';
	if(props.wrap) {
		className += ' wrap';
	}

	return (
		<div className={className}>
			{props.children}
		</div>
	);
}

export default HorizontalContainer;