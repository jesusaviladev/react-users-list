import { useState, useEffect } from 'react';
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers,
	paginateUsers,
} from '../helpers/usersFilters.js';

const getUsers = async (setData, setError, signal) => {
	try {
		// signal para abortar la peticion
		const res = await fetch('http://localhost:4000/users', {
			signal,
		});
		if (res.ok) {
			const data = await res.json();
			setData(data);
		} else {
			setError();
		}
	} catch (error) {
		// error
		console.log(error);
		setError();
	}
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy, page, itemsPerPage }
) => {
	// filtramos los usuarios

	let filteredUsers = filterActiveUsers(users, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	// Hacemos la paginación y retornamos los usuarios ya paginados,
	// y el total de paginas

	const { paginatedUsers, totalPages } = paginateUsers(
		filteredUsers,
		page,
		itemsPerPage
	);

	return {
		paginatedUsers,
		totalPages,
	};
};

const useUsers = (filters) => {
	// Inicializamos el estado desde el hook y proporcionamos
	// un medio para actualizarlo

	// Manejamos errores y estado de carga

	const [users, setUsers] = useState({
		data: [],
		error: false,
		loading: true,
	});

	// Exponemos metodos para actualizar el estado

	const setData = (newData) =>
		setUsers({ data: newData, loading: false, error: false });

	const setError = () => setUsers({ data: [], error: true, loading: false });

	// recuperamos usuarios de la api

	useEffect(() => {
		// Evitar memory leaks, abortando la llamada fetch

		const controller = new AbortController();

		getUsers(setData, setError, controller.signal);

		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		isLoading: users.loading,
	};
};

export default useUsers;
