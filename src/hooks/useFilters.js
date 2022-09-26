import { useState } from 'react';

/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: 0,
	});

	const setSearch = (search) => setFilters({ ...filters, search });

	const setOnlyActive = (onlyActive) => {
		/* Requerimiento funcional: 
		Si esta activo el filtro por estado de usuario, al activar la opcion de¡
		solo usuarios activos entonces volver a setear el orden por defecto
		Funciona porque el formulario es controlado
		*/
		if (onlyActive && filters.sortBy === 3)
			setFilters({ ...filters, sortBy: 0, onlyActive });
		else setFilters({ ...filters, onlyActive });
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
