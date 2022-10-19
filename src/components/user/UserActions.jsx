import { useState } from 'react';
import Modal from '../modal/Modal.jsx';
import IconButton from '../buttons/IconButton.jsx';
import PencilIcon from '../icons/PencilIcon.jsx';
import TrashIcon from '../icons/TrashIcon.jsx';
import PictureIcon from '../icons/PictureIcon.jsx';
import DotsIcon from '../icons/DotsIcon.jsx';
import UserEditForm from '../user-forms/UserEditForm.jsx';
import UserDeleteForm from '../user-forms/UserDeleteForm.jsx';
import UserPicForm from '../user-forms/UserPicForm.jsx';
import useDropdown from '../../lib/hooks/useDropdown.js';
import style from './UserActions.module.css';

const UserActions = ({ user }) => {
	const {
		modalContent,
		closeModal,
		openEditModal,
		openDeleteModal,
		openPicModal,
	} = useModal(user);

	const { dropdownOpened, dropdownRef, openDropdown, closeDropdown } =
		useDropdown();

	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={openDropdown} />
			{dropdownOpened && (
				<ul
					className={style.dropdown}
					onClick={closeDropdown}
					ref={dropdownRef}
				>
					<li className={style.dropdownElement} onClick={openEditModal}>
						<PencilIcon className={style.icon} />
						<span>Editar</span>
					</li>
					<li className={style.dropdownElement} onClick={openPicModal}>
						<PictureIcon className={style.icon} />
						<span>Cambiar foto</span>
					</li>
					<li className={style.dropdownElement} onClick={openDeleteModal}>
						<TrashIcon className={style.icon} />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = (user) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () =>
		setModalContent(
			<UserEditForm currentUser={user} closeModal={closeModal} />
		);

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm currentUser={user} closeModal={closeModal} />
		);

	const openPicModal = () => {
		setModalContent(<UserPicForm currentUser={user} closeModal={closeModal} />);
	};

	return {
		modalContent,
		closeModal,
		openEditModal,
		openDeleteModal,
		openPicModal,
	};
};

export default UserActions;
