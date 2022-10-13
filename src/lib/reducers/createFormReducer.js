import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';
import { validateName, validateUsername } from '../helpers/usersValidations';

export const CREATE_FORM_INITIAL_STATE = {
	name: {
		value: '',
		error: undefined,
	},
	username: {
		value: '',
		loading: false, // variable para determinar si está cargando
		error: undefined,
	},
};

export const createFormReducer = (state, { type, payload }) => {
	switch (type) {
		case CREATE_FORM_ACTIONS.NAME: {
			const error = validateName(payload);

			return {
				...state,
				name: { value: payload, error },
			};
		}

		case CREATE_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(payload);

			return {
				...state,
				username: { value: payload, loading: !error, error },
			}; // loading depende de si no está cargando
		}

		case CREATE_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					value: state.username.value,
					error: payload,
					loading: false,
				},
			};

		default:
			throw new Error('Invalid action type');
	}
};
