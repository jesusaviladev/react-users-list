import { useState, useEffect } from 'react';
import { findAllUsers } from '../services/users.services.js';

const useUsers = (filters) => {
	// Inicializamos el estado desde el hook y proporcionamos
	// un medio para actualizarlo

	// Manejamos errores y estado de carga

	const [users, setUsers] = useState({
		data: [],
		count: 0, // contador de usuarios totales
		error: false,
		loading: true,
	});

	// Exponemos metodos para actualizar el estado

	const setData = (newData, newCount) =>
		setUsers({ data: newData, count: newCount, error: false, loading: false });

	const setError = () =>
		setUsers({ data: [], count: 0, error: true, loading: false });

	// recuperamos usuarios de la api

	useEffect(() => {
		// Evitar memory leaks, abortando la llamada fetch

		const controller = new AbortController();

		loadUsers(setData, setError, controller.signal, filters);

		return () => controller.abort();
	}, [filters]);

	return {
		users: users.data,
		totalUsers: users.count,
		usersError: users.error,
		usersLoading: users.loading,
	};
};

const loadUsers = async (setData, setError, signal, filters) => {
	const { users, aborted, count } = await findAllUsers(signal, filters);

	if (aborted) return;

	if (users) setData(users, count);
	else setError();
};

export default useUsers;
