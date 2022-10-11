import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import { validateName, validateUsername } from '../helpers/usersValidations.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useEditForm = (user) => {
	// Estado para el formulario

	const [formValues, dispatchFormValues] = useReducer(
		formValuesReducer,
		user,
		getInitialState
	);

	// Cada vez que cambie el usuario, reiniciamos el estado

	useEffect(() => {
		dispatchFormValues({ type: 'replace', value: getInitialState(user) });
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
		areInitialValues(formValues, user) ||
		formValues.name.error ||
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
			const isInitial = action.value === action.currentUsername;

			return {
				...state,
				username: {
					value: action.value,
					loading: !error && !isInitial,
					error,
				},
			}; // loading depende de si no está cargando
		}

		case 'role_changed':
			return {
				...state,
				role: action.value,
			};

		case 'active_changed':
			return {
				...state,
				active: action.value,
			};
		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false,
				},
			};
		case 'replace': {
			return action.value;
		}

		default:
			throw new Error('Invalid action type');
	}
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

export default useEditForm;
