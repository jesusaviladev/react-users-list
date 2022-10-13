import { useReducer, useEffect } from 'react';
import { findUserByUsername } from '../services/users.services.js';
import {
	createFormReducer,
	CREATE_FORM_INITIAL_STATE,
} from '../reducers/createFormReducer.js';
import { usernameErrorChanged } from '../actions/createFormActionsBuilders.js';

// EL ORDEN DE PRESENTACION DE LOS HOOKS IMPORTA!!!

/* 
Primero el hook, setters del estado, efectos
despues funciones auxiliares

*/

const useCreateForm = () => {
	// Estado para el formulario
	const [formValues, dispatchFormValues] = useReducer(
		createFormReducer,
		CREATE_FORM_INITIAL_STATE
	);

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

export default useCreateForm;
