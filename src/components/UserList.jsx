import UserListFilters from './UserListFilters.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../hooks/useFilters.js';
import useUsers from '../hooks/useUsers.js';
import style from './UserList.module.css';

const UserList = ({ initialUsers }) => {
	// Recuperamos funcionalidad de filtros desde el hook
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = useFilters();

	// Inicializamos el estado desde el hook y proporcionamso un medio para
	// actualizarlo
	const { users } = useUsers(initialUsers);

	let filteredUsers = filterActiveUsers(users, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions} // Pasamos los handlers desde el hook
			/>
			<UserListRows users={filteredUsers} />
		</div>
	);
};
/* FUNCIONES PURAS */
const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase(); // Pasamos el valor a minuscula

	// Filtramos segun el valor de busqueda
	return users.filter((user) =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	);
};

const filterActiveUsers = (users, active) => {
	if (!active) return [...users];
	// Filtramos segun el valor de busqueda
	return users.filter((user) => user.active);
};

const sortUsers = (users, sortBy) => {
	// Usar tablas de verdad para el sort

	const sorteredUsers = [...users]; // Spread operator para crear nuevo obj
	switch (sortBy) {
		case 1:
			return sorteredUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		case 2:
			return sorteredUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === 'teacher') return -1;
				if (a.role === 'student' && b.role === 'other') return -1;
				return 1;
			});
		case 3:
			return sorteredUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sorteredUsers;
	}
};

export default UserList;
