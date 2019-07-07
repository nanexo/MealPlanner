import React from 'react';
import Entry from './Entry';
import './Card.css';


function Card(props) {
	let header = props.editableTitle ?
		<Entry appearance="card-header" value={props.title} placeholder="Title" onValueChanged={props.onHeaderChanged} /> :
		<span className="card-header">{props.title}</span>


	return (
		<div className="card" onClick={props.onClickHandler}>
			{header}
			{props.children}
		</div>
	);
}

export default Card;
