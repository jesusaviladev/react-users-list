import UserRow from './UserRow.jsx';

const UserListRows = ({
	users,
	error,
	isLoading,
	setEditForm,
	setDeleteForm,
}) => {
	if (isLoading) return <p>Cargando...</p>;

	if (error) return <p>Error al cargar usuarios.</p>;

	if (users.length === 0) return <p>No hay usuarios registrados</p>;

	return users.map((user) => (
		<UserRow
			key={user.id}
			{...user}
			setEditForm={setEditForm}
			setDeleteForm={setDeleteForm}
		/>
	));
};

export default UserListRows;
