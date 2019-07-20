export default function Theme(theme) {

	const appDimensions = {
		width: '100vw',
		maxWidth: 968
	};

	return {
		appBar: {
			borderBottom: `1px solid ${theme.palette.divider}`,
			alignItems: 'center'
		},

		bottomBar: {
			borderTop: `1px solid ${theme.palette.divider}`
		},

		toolbar: {
			...appDimensions
		},

		toolbarContent: {
			flexGrow: 1
		},

		fab: {
			position: 'absolute',
			bottom: '1em',
			right: '1em'
		},

		contentWrapper: {
			flexGrow: 1,
			position: 'relative'
		},

		scrollContainer: {
			overflow: 'auto',
			height: '100%'
		},

		tabContent: {
			...appDimensions,
			padding: '1em 0',
			height: '100%',
			margin: 'auto'
		},
		dialogRoot: {
			maxHeight: 600
		},
		mealEntryCard: {
			width: '160px',
		},
		mealEntryCardSelected: {
			backgroundColor: 'rgba(0, 191, 255, 0.05)'
		},
		mealEntryCardHeader: {
			padding: theme.spacing(1),
			width: '100%'
		},
		mealEntryCardHeaderText: {
			flexGrow: 1
		},
		mealEntryCardBody: {
			padding: theme.spacing(1)
		},
		mealCardActionArea: {
			padding: '0.5em'
		},
		mealCardPadding: {
			padding: '1rem'
		}
	};
}