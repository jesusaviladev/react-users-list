import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';
import { PAGINATION } from '../../constants/pagination.js';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
};

/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_STATE);

	// Siempre que filtro por busqueda o solo activo, vuelvo a la pagina 1

	const setSearch = (search) =>
		setFilters({ ...filters, search, page: PAGINATION.DEFAULT_PAGE });

	const setOnlyActive = (onlyActive) => {
		/* Requerimiento funcional: 
		Si esta activo el filtro por estado de usuario, al activar la opcion de¡
		solo usuarios activos entonces volver a setear el orden por defecto
		Funciona porque el formulario es controlado
		*/

		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;

		/* Refactor: Si el filtro activo está activo, entonces el valor del filtro
		es el orden por defecto, si no entonces devuelve el valor de sortBy */

		setFilters({
			...filters,
			sortBy: newSortBy,
			onlyActive,
			page: PAGINATION.DEFAULT_PAGE,
		});
	};

	const setSortBy = (sortBy) =>
		setFilters({ ...filters, sortBy, page: PAGINATION.DEFAULT_PAGE });

	const setPage = (newPage) => setFilters({ ...filters, page: newPage });

	/* Al setear el numero de items por pagina es necesario reiniciar la
	paginacion a 1 (página por defecto) */

	const setItemsPerPage = (newItemsPerPage) =>
		setFilters({
			...filters,
			itemsPerPage: newItemsPerPage,
			page: PAGINATION.DEFAULT_PAGE,
		});

	const resetFilters = () => setFilters({ ...INITIAL_STATE });

	return {
		filters,
		filtersSetters: {
			setSearch,
			setOnlyActive,
			setSortBy,
		},
		paginationSetters: {
			setPage,
			setItemsPerPage,
		},
		resetFilters,
	};
};

export default useFilters;
