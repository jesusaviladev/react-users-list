import { useState, useEffect } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import { validateName, validateUsername } from '../helpers/usersValidations.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useCreateForm = () => {
	// Estado para el formulario
	const [formValues, setFormValues] = useState({
		name: {
			value: '',
			error: undefined,
		},
		username: {
			value: '',
			loading: false, // variable para determinar si está cargando
			error: undefined,
		},
	});

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

		setFormValues({
			...formValues,
			username: { value: newUsername, loading: !error, error },
		}); // loading depende de si no está cargando
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

	const isFormValid =
		!formValues.name.value ||
		formValues.name.error ||
		!formValues.username.value ||
		formValues.username.error ||
		formValues.username.loading;

	return {
		...formValues,
		setName,
		setUsername,
		isFormValid,
	};
};

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

export default useCreateForm;
