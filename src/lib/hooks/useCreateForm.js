import { useState, useEffect } from 'react';
import { validateName, validateUsername } from '../helpers/usersValidations.js';

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	let validationError; // error que se devuelve

	try {
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{
				signal,
			}
		);

		if (res.ok) {
			const data = await res.json();

			// Error
			if (data.length) validationError = 'Nombre de usuario ya existe';
		} else {
			// Error en la petición

			validationError = 'Error al validar';
		}
	} catch (error) {
		if (error.name === 'AbortError') return;
		validationError = 'Error al validar';
	}

	setUsernameError(validationError);
};

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
		if (formValues.username.loading) {
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
		}
	}, [formValues.username.loading, formValues.username.value]);

	return {
		...formValues,
		setName,
		setUsername,
	};
};

export default useCreateForm;
