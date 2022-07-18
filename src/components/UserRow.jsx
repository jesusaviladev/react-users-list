import { useState } from 'react';
import UserStatus from './UserStatus.jsx';
import UserRole from './UserRole.jsx';
import style from './UserRow.module.css';

const UserRow = ({ name, active, role }) => {
	const [isActive, setIsActive] = useState(active);

	return (
		<div className={style.user}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={isActive} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button
					onClick={() => {
						setIsActive(!isActive);
					}}
				>
					{isActive ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
