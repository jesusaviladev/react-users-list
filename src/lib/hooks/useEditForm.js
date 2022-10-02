import { useState, useEffect } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import { validateName, validateUsername } from '../helpers/usersValidations.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useEditForm = (user) => {
	// Estado para el formulario
	const [formValues, setFormValues] = useState(() => getInitialState(user));

	// Setters del estado

	const setName = (newName) => {
		const error = validateName(newName);

		setFormValues({
			...formValues,
			name: { value: newName, error },
		});
	};

	const setUsername = (newUsername) => {
		const error = validateUsername(newUsername);
		const isInitial = newUsername === user.username;

		setFormValues({
			...formValues,
			username: { value: newUsername, loading: !error && !isInitial, error },
		}); // loading depende de si no está cargando
	};

	const setRole = (newRole) => {
		setFormValues({
			...formValues,
			role: newRole,
		});
	};

	const setActive = (newActive) => {
		setFormValues({
			...formValues,
			active: newActive,
		});
	};

	const setUsernameError = (error) =>
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				error,
				loading: false,
			},
		}));

	// Cada vez que cambie el usuario, reiniciamos el estado

	useEffect(() => {
		setFormValues(getInitialState(user));
	}, [user]);

	// UseEffect que llama a la API si hay un nombre de usuario válido
	// Depende de la variable loading

	useEffect(() => {
		if (!formValues.username.loading) return;
		// Evitar memory leaks, abortando la llamada fetch

		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			// Timeout para el debounce
			validateUsernameIsAvailable(
				formValues.username.value,
				setUsernameError,
				controller.signal
			);
		}, 500);

		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [formValues.username.loading, formValues.username.value]);

	const isFormInvalid =
		areInitialValues(formValues, user) ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading;

	return {
		...formValues,
		setName,
		setUsername,
		setRole,
		setActive,
		isFormInvalid,
	};
};

const getInitialState = (user) => {
	return {
		name: {
			value: user.name,
			error: undefined,
		},
		username: {
			value: user.username,
			loading: false, // variable para determinar si está cargando
			error: undefined,
		},
		role: user.role,
		active: user.active,
	};
};

const areInitialValues = (formValues, user) =>
	formValues.name.value === user.name &&
	formValues.username.value === user.username &&
	formValues.role === user.role &&
	formValues.active === user.active;

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;

	if (error) return setUsernameError('Error al validar');

	setUsernameError(user ? 'Nombre de usuario ya existe' : undefined);
};

export default useEditForm;
