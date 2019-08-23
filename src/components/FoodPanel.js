import React from 'react';
import FoodList from './FoodList';

import { Typography, Link } from '@material-ui/core';

function FoodPanel(props) {
	return (
		<React.Fragment>
			<Typography variant="h4" paragraph>Swiss food composition database</Typography>
			<Typography gutterBottom>You have access to the <Link href="https://www.naehrwertdaten.ch/en/">Swiss food composition database</Link> through the MealPlanner.</Typography>
			<Typography paragraph>Below is a complementary local database, in case you need to add foods not found in the database mentioned above.</Typography>
			<FoodList />
		</React.Fragment>
	);
}

export default FoodPanel;