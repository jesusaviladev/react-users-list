import { useReducer } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';
import { PAGINATION } from '../../constants/pagination.js';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
};

const filtersReducer = (state, action) => {
	switch (action.type) {
		case 'search_changed':
			// Siempre que filtro por busqueda o solo activo, vuelvo a la pagina 1
			return { ...state, search: action.value, page: PAGINATION.DEFAULT_PAGE };

		case 'only_active_changed':
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
					action.value && state.sortBy === SORT_OPTIONS.ACTIVE
						? SORT_OPTIONS.DEFAULT
						: state.sortBy,
				onlyActive: action.value,
				page: PAGINATION.DEFAULT_PAGE,
			};

		case 'sort_by_changed':
			return { ...state, sortBy: action.value, page: PAGINATION.DEFAULT_PAGE };

		case 'page_changed':
			return { ...state, page: action.value };

		case 'items_per_page_changed':
			/* Al setear el numero de items por pagina es necesario reiniciar la
			paginacion a 1 (página por defecto) */

			return {
				...state,
				itemsPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE,
			};

		case 'reset_filters':
			return { ...INITIAL_STATE };

		default:
			throw new Error('Invalid action type');
	}
};

/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_STATE);

	return {
		filters,
		dispatchFilters,
	};
};

export default useFilters;
