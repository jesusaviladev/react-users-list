import { useState } from 'react';
import style from './UserCreateForm.module.css';
import InputText from '../forms/InputText.jsx';
import InputTextAsync from '../forms/InputTextAsync.jsx';
import SelectInput from '../forms/SelectInput.jsx';
import InputCheckbox from '../forms/InputCheckbox.jsx';
import Button from '../buttons/Button.jsx';
import { USER_ROLES } from '../../constants/userRoles.js';
import useCreateForm from '../../lib/hooks/useCreateForm.js';
import { createUser } from '../../lib/services/users.services.js';

const UserCreateForm = ({ onSuccess }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, username, setName, setUsername, isFormValid } = useCreateForm();

	return (
		<form
			onSubmit={(ev) =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess)
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
					success={username.value && !username.loading && !username.error}
				/>
			</div>
			<div className={style.row}>
				<SelectInput name="role">
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</SelectInput>
				<div className={style.active}>
					<InputCheckbox name="active" />
					<span>¿Activo?</span>
				</div>
				<Button type="submit" disabled={isSubmitting || isFormValid}>
					{isSubmitting ? 'Enviando...' : 'Crear usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (e, name, username, setIsSubmitting, onSuccess) => {
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
	} else {
		setIsSubmitting(false);
	}
};

export default UserCreateForm;
