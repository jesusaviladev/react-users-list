import UserRow from './UserRow.jsx';

const UserListRows = ({ users }) => {
	if (users.length === 0) return <p>No hay usuarios registrados</p>;

	return users.map((user) => <UserRow key={user.username} {...user} />);
};

export default UserListRows;
