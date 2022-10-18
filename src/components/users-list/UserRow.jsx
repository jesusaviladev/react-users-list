import UserStatus from '../user/UserStatus.jsx';
import UserActions from '../user/UserActions.jsx';
import UserRole from '../user/UserRole.jsx';
import UserDisplay from '../user/UserDisplay.jsx';
import style from './UserRow.module.css';

const UserRow = ({ user }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay
					username={user.username}
					name={user.name}
					picture={user.picture}
				/>
			</div>
			<div className={style.status}>
				<UserStatus active={user.active} />
			</div>
			<div className={style.role}>
				<UserRole role={user.role} />
			</div>
			<div className={style.action}>
				<UserActions user={user} />
			</div>
		</div>
	);
};

export default UserRow;
