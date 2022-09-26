import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';

/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT,
	});

	const setSearch = (search) => setFilters({ ...filters, search });

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

		setFilters({ ...filters, sortBy: newSortBy, onlyActive });
	};

	const setSortBy = (sortBy) => setFilters({ ...filters, sortBy });

	return {
		...filters,
		setSearch,
		setOnlyActive,
		setSortBy,
	};
};

export default useFilters;
