import { useState } from 'react';
import style from './UserEditForm.module.css';
import InputText from '../forms/InputText.jsx';
import InputTextAsync from '../forms/InputTextAsync.jsx';
import SelectInput from '../forms/SelectInput.jsx';
import InputCheckbox from '../forms/InputCheckbox.jsx';
import Button from '../buttons/Button.jsx';
import { USER_ROLES } from '../../constants/userRoles.js';
import useEditForm from '../../lib/hooks/useEditForm.js';
import { updateUser } from '../../lib/services/users.services.js';

const UserEditForm = ({ onSuccess, user }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		name,
		username,
		role,
		active,
		setName,
		setUsername,
		setRole,
		setActive,
		isFormInvalid,
	} = useEditForm(user);

	return (
		<form
			onSubmit={(ev) =>
				handleSubmit(
					ev,
					{
						id: user.id,
						name: name.value,
						username: username.value,
						active,
						role,
					},
					setIsSubmitting,
					onSuccess
				)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label="Nombre"
					placeholder="John Doe..."
					value={name.value}
					onChange={(e) => setName(e.target.value)}
					error={name.error}
				/>
				<InputTextAsync
					className={style.input}
					label="Username"
					placeholder="johndoe..."
					value={username.value}
					onChange={(e) => setUsername(e.target.value)}
					loading={username.loading}
					error={username.error}
					success={
						username.value !== user.username &&
						!username.loading &&
						!username.error
					}
				/>
			</div>
			<div className={style.row}>
				<SelectInput value={role} onChange={(e) => setRole(e.target.value)}>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</SelectInput>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={(e) => setActive(e.target.checked)}
					/>
					<span>¿Activo?</span>
				</div>
				<Button type="submit" disabled={isSubmitting || isFormInvalid}>
					{isSubmitting ? 'Enviando...' : 'Editar usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (e, user, setIsSubmitting, onSuccess) => {
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
	} else {
		setIsSubmitting(false);
	}
};

export default UserEditForm;