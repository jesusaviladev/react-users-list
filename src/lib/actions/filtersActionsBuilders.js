import { FILTER_ACTIONS } from '../../constants/filtersActions';

export const searchChanged = (search) => ({
	type: FILTER_ACTIONS.SEARCH,
	payload: search,
});

export const onlyActiveChanged = (onlyActive) => ({
	type: FILTER_ACTIONS.ONLY_ACTIVE,
	payload: onlyActive,
});

export const sortByChanged = (sortBy) => ({
	type: FILTER_ACTIONS.SORT_BY,
	payload: sortBy,
});

export const pageChanged = (page) => ({
	type: FILTER_ACTIONS.PAGE,
	payload: page,
});

export const itemsPerPageChanged = (itemsPerPage) => ({
	type: FILTER_ACTIONS.ITEMS_PER_PAGE,
	payload: itemsPerPage,
});

export const reset = () => ({
	type: FILTER_ACTIONS.RESET,
});
