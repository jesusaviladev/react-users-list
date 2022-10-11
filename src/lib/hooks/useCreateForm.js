import { useReducer, useEffect } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import { validateName, validateUsername } from '../helpers/usersValidations.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useCreateForm = () => {
	// Estado para el formulario
	const [formValues, dispatchFormValues] = useReducer(formValuesReducer, {
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
				dispatchFormValues,
				controller.signal
			);
		}, 500);

		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [formValues.username.loading, formValues.username.value]);

	const isFormInvalid =
		!formValues.name.value ||
		formValues.name.error ||
		!formValues.username.value ||
		formValues.username.error ||
		formValues.username.loading;

	return {
		...formValues,
		dispatchFormValues,
		isFormInvalid,
	};
};

const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validateName(action.value);

			return {
				...state,
				name: { value: action.value, error },
			};
		}

		case 'username_changed': {
			const error = validateUsername(action.value);

			return {
				...state,
				username: { value: action.value, loading: !error, error },
			}; // loading depende de si no está cargando
		}

		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false,
				},
			};

		default:
			throw new Error('Invalid action type');
	}
};

const validateUsernameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, error, aborted } = await findUserByUsername(username, signal);

	if (aborted) return;

	if (error)
		return dispatchFormValues({
			type: 'username_error_changed',
			value: 'Error al validar',
		});

	dispatchFormValues({
		type: 'username_error_changed',
		value: user ? 'Nombre de usuario ya existe' : undefined,
	});
};

export default useCreateForm;
