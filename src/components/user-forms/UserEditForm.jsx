import { useState, useContext } from 'react';
import style from './UserEditForm.module.css';
import InputText from '../forms/InputText.jsx';
import InputTextAsync from '../forms/InputTextAsync.jsx';
import SelectInput from '../forms/SelectInput.jsx';
import InputCheckbox from '../forms/InputCheckbox.jsx';
import Button from '../buttons/Button.jsx';
import { USER_ROLES } from '../../constants/userRoles.js';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import useEditForm from '../../lib/hooks/useEditForm.js';
import { updateUser } from '../../lib/services/users.services.js';
import {
	activeChanged,
	nameChanged,
	roleChanged,
	usernameChanged,
} from '../../lib/actions/editFormActionsBuilders';

const UserEditForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { name, username, role, active, dispatchFormValues, isFormInvalid } =
		useEditForm(currentUser);

	return (
		<form
			className={style.form}
			onSubmit={(ev) =>
				handleSubmit(
					ev,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						active,
						role,
					},
					setIsSubmitting,
					onSuccess,
					closeModal
				)
			}
		>
			<InputText
				className={style.input}
				label="Nombre"
				placeholder="John Doe..."
				value={name.value}
				onChange={(e) => dispatchFormValues(nameChanged(e.target.value))}
				error={name.error}
			/>
			<InputTextAsync
				className={style.input}
				label="Username"
				placeholder="johndoe..."
				value={username.value}
				onChange={(e) =>
					dispatchFormValues(
						usernameChanged(e.target.value, currentUser.username)
					)
				}
				loading={username.loading}
				error={username.error}
				success={
					username.value !== currentUser.username &&
					!username.loading &&
					!username.error
				}
			/>
			<SelectInput
				value={role}
				onChange={(e) => dispatchFormValues(roleChanged(e.target.value))}
			>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</SelectInput>
			<div className={style.active}>
				<InputCheckbox
					checked={active}
					onChange={(e) => dispatchFormValues(activeChanged(e.target.checked))}
				/>
				<span>¿Activo?</span>
			</div>
			<Button type="submit" disabled={isSubmitting || isFormInvalid}>
				{isSubmitting ? 'Enviando...' : 'Editar usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	e,
	user,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	e.preventDefault();

	setIsSubmitting(true);

	const editedUser = {
		id: user.id,
		name: user.name,
		username: user.username,
		role: user.role,
		active: user.active,
	};

	const success = await updateUser(editedUser);

	if (success) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserEditForm;
