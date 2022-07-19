import UserRow from './UserRow.jsx';

const UserListRows = ({ users, toggleUserActive }) => {
	if (users.length === 0) return <p>No hay usuarios registrados</p>;

	return users.map((user) => (
		<UserRow key={user.id} {...user} toggleUserActive={toggleUserActive} />
	));
};

export default UserListRows;
