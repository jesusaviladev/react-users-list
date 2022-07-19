import UserStatus from './UserStatus.jsx';
import UserRole from './UserRole.jsx';
import style from './UserRow.module.css';

const UserRow = ({ id, name, active, role, toggleUserActive }) => {
	return (
		<div className={style.user}>
			<div className={style.name}>
				<span>{name}</span>
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<button onClick={() => toggleUserActive(id)}>
					{active ? 'Desactivar' : 'Activar'}
				</button>
			</div>
		</div>
	);
};

export default UserRow;
