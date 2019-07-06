import React from 'react';
import './DockContainer.css';

function DockContainer(props) {

	const prepareContent = (name) => {
		return (!!props[name] ? <div key={name} className={name + '-content'}>{props[name]}</div> : null)
	};

	const content = ['top', 'left', 'center', 'right', 'bottom'].map(prepareContent);

	return (
		<div className="wrapper">
			{content}
		</div>
	);
}

export default DockContainer;
