import UserStatus from './UserStatus.jsx';
import UserRole from './UserRole.jsx';
import style from './UserRow.module.css';

const UserRow = ({ name, active, role }) => {
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
		</div>
	);
};

export default UserRow;
