import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';

/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 6,
	});

	// Siempre que filtro por busqueda o solo activo, vuelvo a la pagina 1

	const setSearch = (search) => setFilters({ ...filters, search, page: 1 });

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

		setFilters({ ...filters, sortBy: newSortBy, onlyActive, page: 1 });
	};

	const setSortBy = (sortBy) => setFilters({ ...filters, sortBy, page: 1 });

	const setPage = (newPage) => setFilters({ ...filters, page: newPage });

	/* Al setear el numero de items por pagina es necesario reiniciar la
	paginacion a 1 */

	const setItemsPerPage = (newItemsPerPage) =>
		setFilters({ ...filters, itemsPerPage: newItemsPerPage, page: 1 });

	return {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage,
	};
};

export default useFilters;
