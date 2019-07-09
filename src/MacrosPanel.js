import React from 'react';
import Entry from './Entry';
import CalorieDisplay from './CalorieDisplay';
import './MacrosPanel.css';

function MacrosPanel(props) {
	const editableMacros = !!props.onMacroChanged;

	const getMacroElement = (macro) => editableMacros ?
		<Entry field={macro} value={props.data[macro]} appearance="foodentry" autoWidth={true} onValueChanged={props.onMacroChanged} /> :
		<span>{props.data[macro]}</span>;

	return (
		<div className="macros-panel-wrapper">
			<div className="macros-panel-cals-display"><CalorieDisplay data={props.data} size={160} /></div>
			<div className="macros-panel-protein-input">
				{getMacroElement('protein')}
				<span>g</span>
			</div>
			<div className="macros-panel-protein-label">Protein</div>
			<div className="macros-panel-carbs-input">
				{getMacroElement('carbs')}
				<span>g</span>
			</div>
			<div className="macros-panel-carbs-label">Carbs</div>
			<div className="macros-panel-fat-input">
				{getMacroElement('fat')}
				
				<span>g</span>
			</div>
			<div className="macros-panel-fat-label">Fat</div>
		</div>
	)
}

export default MacrosPanel;
