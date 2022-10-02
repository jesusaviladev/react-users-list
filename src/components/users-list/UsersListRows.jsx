import UserRow from './UserRow.jsx';
import UserCard from './UserCard.jsx';
import style from './UsersListRows.module.css';

const UsersListRows = ({ users, error, isLoading, view }) => {
	if (isLoading) return <p>Cargando...</p>;

	if (error) return <p>Error al cargar usuarios.</p>;

	if (users.length === 0) return <p>No hay usuarios registrados</p>;

	const UserComponent = view ? UserCard : UserRow;

	return (
		<div className={style.container}>
			{users.map((user) => (
				<UserComponent key={user.id} {...user} />
			))}
		</div>
	);
};

export default UsersListRows;
