import { useState } from 'react';
import style from './UserDeleteForm.module.css';
import Button from '../buttons/Button.jsx';
import { deleteUserById } from '../../lib/services/users.services.js';

const UserDeleteForm = ({ onSuccess, onCancel, user }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			onSubmit={(ev) => handleSubmit(ev, user.id, setIsSubmitting, onSuccess)}
		>
			<p className={style.text}>
				¿Estás seguro de que quieres eliminar al usuario &quot;{user.name}
				&quot;?
			</p>
			<div className={style.row}>
				<Button type="button" kind="secondary" onClick={onCancel}>
					{isSubmitting ? 'Cargando...' : 'Cancelar'}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (e, userId, setIsSubmitting, onSuccess) => {
	e.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUserById(userId);

	if (success) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UserDeleteForm;
