import { useState, useEffect } from 'react';
import { findAllUsers } from '../services/users.services.js';

const useUsers = () => {
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
		setUsers({ data: newData, error: false, loading: false });

	const setError = () => setUsers({ data: [], error: true, loading: false });

	const reloadUsers = () => setUsers({ data: [], error: false, loading: true });

	// recuperamos usuarios de la api

	useEffect(() => {
		if (!users.loading) return;

		// Evitar memory leaks, abortando la llamada fetch

		const controller = new AbortController();

		loadUsers(setData, setError, controller.signal);

		return () => controller.abort();
	}, [users.loading]);

	return {
		users: users.data,
		usersError: users.error,
		usersLoading: users.loading,
		reloadUsers,
	};
};

const loadUsers = async (setData, setError, signal) => {
	const { users, aborted } = await findAllUsers(signal);

	if (aborted) return;

	if (users) setData(users);
	else setError();
};

export default useUsers;
