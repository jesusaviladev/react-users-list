import UserStatus from '../user/UserStatus.jsx';
import UserRole from '../user/UserRole.jsx';
import UserDisplay from '../user/UserDisplay.jsx';
import UserActions from '../user/UserActions.jsx';
import style from './UserCard.module.css';

const UserCard = ({ user }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay
						username={user.username}
						name={user.name}
						picture={user.picture}
					/>
				</div>
				<div className={style.info}>
					<UserRole role={user.role} />
					<UserStatus active={user.active} />
					<div className={style.actions}>
						<UserActions user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
