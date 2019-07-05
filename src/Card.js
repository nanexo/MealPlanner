import React from 'react';
import './Card.css';


function Card(props) {
	return (
		<div className="card">
			<div className="card-header">{props.title}</div>
			{props.children}
		</div>
	);
}

export default Card;
