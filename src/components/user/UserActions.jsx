import { useState } from 'react';
import Modal from '../modal/Modal.jsx';
import IconButton from '../buttons/IconButton.jsx';
import PencilIcon from '../icons/PencilIcon.jsx';
import TrashIcon from '../icons/TrashIcon.jsx';
import UserEditForm from '../user-forms/UserEditForm.jsx';
import UserDeleteForm from '../user-forms/UserDeleteForm.jsx';

const UserActions = ({ user }) => {
	const [modalContent, setModalContent] = useState();

	return (
		<>
			<Modal closeModal={() => setModalContent()}>{modalContent}</Modal>
			<IconButton
				icon={PencilIcon}
				onClick={() =>
					setModalContent(
						<UserEditForm
							currentUser={user}
							closeModal={() => setModalContent()}
						/>
					)
				}
			/>
			<IconButton
				icon={TrashIcon}
				kind="red"
				onClick={() =>
					setModalContent(
						<UserDeleteForm
							currentUser={user}
							closeModal={() => setModalContent()}
						/>
					)
				}
			/>
		</>
	);
};

export default UserActions;
