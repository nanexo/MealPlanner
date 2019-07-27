import { useMediaQuery, useTheme } from '@material-ui/core';

export default function useCheckMobile() {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down('xs'));
}
