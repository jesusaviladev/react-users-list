import { useState, useContext } from 'react';
import style from './UserCreateForm.module.css';
import InputText from '../forms/InputText.jsx';
import InputTextAsync from '../forms/InputTextAsync.jsx';
import SelectInput from '../forms/SelectInput.jsx';
import InputCheckbox from '../forms/InputCheckbox.jsx';
import Button from '../buttons/Button.jsx';
import { USER_ROLES } from '../../constants/userRoles.js';
import { alertBox } from '../../lib/events/alertEvents.js';
import useCreateForm from '../../lib/hooks/useCreateForm.js';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import { createUser } from '../../lib/services/users.services.js';
import {
	nameChanged,
	usernameChanged,
} from '../../lib/actions/createFormActionsBuilders';

const UserCreateForm = ({ closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, dispatchFormValues, isFormInvalid } = useCreateForm();

	return (
		<form
			className={style.form}
			onSubmit={(ev) =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<InputText
				label="Nombre"
				placeholder="John Doe..."
				value={name.value}
				onChange={(e) => dispatchFormValues(nameChanged(e.target.value))}
				error={name.error}
			/>
			<InputTextAsync
				label="Username"
				placeholder="johndoe..."
				value={username.value}
				onChange={(e) => dispatchFormValues(usernameChanged(e.target.value))}
				loading={username.loading}
				error={username.error}
				success={username.value && !username.loading && !username.error}
			/>
			<SelectInput name="role">
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</SelectInput>
			<div className={style.active}>
				<InputCheckbox name="active" />
				<span>¿Activo?</span>
			</div>
			<Button type="submit" disabled={isSubmitting || isFormInvalid}>
				{isSubmitting ? 'Enviando...' : 'Crear usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	e,
	name,
	username,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	e.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: e.target.role.value,
		active: e.target.active.checked,
	};

	const success = await createUser(user);

	if (success) {
		// TODO : Actualizar los usuarios
		onSuccess();
		alertBox.success('Usuario creado exitosamente');
	} else {
		alertBox.error('Error al crear usuario');
	}
	closeModal();
};

export default UserCreateForm;
