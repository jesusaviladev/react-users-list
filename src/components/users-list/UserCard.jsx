import { useContext } from 'react';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import UserStatus from '../user/UserStatus.jsx';
import UserRole from '../user/UserRole.jsx';
import UserDisplay from '../user/UserDisplay.jsx';
import IconButton from '../buttons/IconButton.jsx';
import PencilIcon from '../icons/PencilIcon.jsx';
import TrashIcon from '../icons/TrashIcon.jsx';
import style from './UserCard.module.css';

const UserCard = ({ id, username, name, active, role }) => {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);

	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay username={username} name={name} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
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
			</div>
		</div>
	);
};

export default UserCard;
