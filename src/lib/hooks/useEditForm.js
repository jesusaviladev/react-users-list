import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import {
	editFormReducer,
	getEditFormInitialState,
} from '../reducers/editFormReducer.js';
import {
	usernameErrorChanged,
	replace,
} from '../actions/editFormActionsBuilders.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useEditForm = (user) => {
	// Estado para el formulario

	const [formValues, dispatchFormValues] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	);

	// Cada vez que cambie el usuario, reiniciamos el estado

	useEffect(() => {
		dispatchFormValues(replace(getEditFormInitialState(user)));
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

	let errorMessage;

	if (error) errorMessage = 'Error al validar';
	else if (user) errorMessage = 'Nombre de usuario ya existe';

	dispatchFormValues(usernameErrorChanged(errorMessage));
};

export default useEditForm;
