import { useContext } from 'react';
import { UserFormsContext } from '../lib/context/UserFormsContext.js';
import UserStatus from './UserStatus.jsx';
import UserRole from './UserRole.jsx';
import UserDisplay from './UserDisplay.jsx';
import IconButton from './buttons/IconButton.jsx';
import PencilIcon from './icons/PencilIcon.jsx';
import TrashIcon from './icons/TrashIcon.jsx';
import style from './UserRow.module.css';

const UserRow = ({ id, username, name, active, role }) => {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);

	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay username={username} name={name} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<IconButton
					icon={PencilIcon}
					onClick={() => setEditForm({ id, username, name, active, role })}
				/>
				<IconButton
					icon={TrashIcon}
					kind="red"
					onClick={() => setDeleteForm({ id, name })}
				/>
			</div>
		</div>
	);
};

export default UserRow;
