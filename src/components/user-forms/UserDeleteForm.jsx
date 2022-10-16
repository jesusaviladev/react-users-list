import { useState, useContext } from 'react';
import style from './UserDeleteForm.module.css';
import Button from '../buttons/Button.jsx';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import { deleteUserById } from '../../lib/services/users.services.js';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			className={style.form}
			onSubmit={(ev) =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p>
				¿Estás seguro de que quieres eliminar al usuario &quot;
				{currentUser.name}
				&quot;?
			</p>
			<Button type="button" kind="secondary" onClick={() => closeModal()}>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	e,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	e.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUserById(userId);

	if (success) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserDeleteForm;
