import UserRow from './UserRow.jsx';
import style from './UserList.module.css';

const UserList = ({ children, users }) => {
	const renderedUsers =
		users.length > 0 ? (
			users.map((user) => <UserRow key={user.name} {...user} />)
		) : (
			<p>No hay usuarios registrados</p>
		);

	return (
		<div className={style.list}>
			{children}
			{renderedUsers}
		</div>
	);
};

export default UserList;
