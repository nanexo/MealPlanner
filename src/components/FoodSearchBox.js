import React from 'react';
import { connect } from 'react-redux';
import { TextField, Popper, Paper, List, ListItem, ListItemText, ListSubheader, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ScrollContainer from './ScrollContainer';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles(theme => {
	return {
		databaseHeaders: {
			backgroundColor: theme.palette.background.paper
		}
	};
});


function FoodSearchBox(props) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchResults, setSearchResults] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();
	const popperRef = React.createRef();

	React.useEffect(() => {
		if(searchQuery) {
			const query = `query food($startsWith: String!) {
				food(startsWith: $startsWith) {
					id, title, kcal, protein, carbs, fat
				}
			}`;
			fetch(serverUrl + '/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({query, variables: {startsWith: searchQuery}})
			})
				.then(r => r.json())
				.then(data => setSearchResults(data.data.food));
		}
	}, [searchQuery]);

	const onChangeSearchQuery = event => {
		setAnchorEl(event.target);
		setSearchQuery(event.target.value);
	};

	const onBlur = event => {
		// losing focus to the popper is fine, because we want the items to be clickable
		if(!(popperRef.current && popperRef.current.contains(event.relatedTarget)))
			setSearchQuery('');
	}

	const createItemClickHandler = (food, source) => () => {
		props.onSelectFood(food, source);
		setSearchQuery('');
	}

	const open = Boolean(searchQuery);
	const id = open ? 'search-box-popper' : undefined;

	const foodToItemMapper = source => food => (
		<ListItem key={food.id} button onClick={createItemClickHandler(food, source)}>
			<ListItemText>{food.title}</ListItemText>
		</ListItem>);

	const sfcdDatabaseItems = searchResults === null ?
		<ListItem><CircularProgress /></ListItem> :
		searchResults.map(foodToItemMapper('sfcd'));

	return (
		<React.Fragment>
			<TextField
				fullWidth
				id="foodSearchBox"
				label="Search Food"
				value={searchQuery}
				onChange={onChangeSearchQuery}
				onBlur={onBlur}
			/>
			<Popper id={id} open={open} anchorEl={anchorEl} style={{zIndex: 5000}} ref={popperRef}>
				<Paper>
					<ScrollContainer style={{maxHeight: 400}}>
						<List style={{width: anchorEl ? anchorEl.clientWidth: undefined}}>
							<ListSubheader className={classes.databaseHeaders}>Local Database</ListSubheader>
							{props.localFoods.filter(food => food.title.toLowerCase().startsWith(searchQuery.toLowerCase())).map(foodToItemMapper('local'))}
							<ListSubheader className={classes.databaseHeaders}>SFCD</ListSubheader>
							{sfcdDatabaseItems}
						</List>
					</ScrollContainer>
				</Paper>
			</Popper>
		</React.Fragment>
	);

}

const mapStateToProps = state => {
	return {
		localFoods: state.foods.local
	};
};

export default connect(mapStateToProps)(FoodSearchBox);