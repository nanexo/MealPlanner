import React from 'react';

export default function ScrollContainer(props) {
	const style = {overflow: 'hidden auto', ...props.style};
	return <div style={style}>{props.children}</div>
}

