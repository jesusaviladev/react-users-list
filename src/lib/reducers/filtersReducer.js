import { FILTER_ACTIONS } from '../../constants/filtersActions';
import { PAGINATION } from '../../constants/pagination';
import { SORT_OPTIONS } from '../../constants/sortOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
};

export const filtersReducer = (state, { type, payload }) => {
	switch (type) {
		case FILTER_ACTIONS.SEARCH:
			// Siempre que filtro por busqueda o solo activo, vuelvo a la pagina 1
			return { ...state, search: payload, page: PAGINATION.DEFAULT_PAGE };

		case FILTER_ACTIONS.ONLY_ACTIVE:
			/* Requerimiento funcional: 
		Si esta activo el filtro por estado de usuario, al activar la opcion de¡
		solo usuarios activos entonces volver a setear el orden por defecto
		Funciona porque el formulario es controlado
		*/

			/* Refactor: Si el filtro activo está activo, entonces el valor del filtro
		es el orden por defecto, si no entonces devuelve el valor de sortBy */

			return {
				...state,
				sortBy:
					payload && state.sortBy === SORT_OPTIONS.ACTIVE
						? SORT_OPTIONS.DEFAULT
						: state.sortBy,
				onlyActive: payload,
				page: PAGINATION.DEFAULT_PAGE,
			};

		case FILTER_ACTIONS.SORT_BY:
			return { ...state, sortBy: payload, page: PAGINATION.DEFAULT_PAGE };

		case FILTER_ACTIONS.PAGE:
			return { ...state, page: payload };

		case FILTER_ACTIONS.ITEMS_PER_PAGE:
			/* Al setear el numero de items por pagina es necesario reiniciar la
			paginacion a 1 (página por defecto) */

			return {
				...state,
				itemsPerPage: payload,
				page: PAGINATION.DEFAULT_PAGE,
			};

		case FILTER_ACTIONS.RESET:
			return { ...FILTERS_INITIAL_STATE };

		default:
			throw new Error('Invalid action type');
	}
};
