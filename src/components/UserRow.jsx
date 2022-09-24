import UserStatus from './UserStatus.jsx';
import UserRole from './UserRole.jsx';
import UserDisplay from './UserDisplay.jsx';
import style from './UserRow.module.css';

const UserRow = ({ username, name, active, role }) => {
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
			<div className={style.action}></div>
		</div>
	);
};

export default UserRow;
