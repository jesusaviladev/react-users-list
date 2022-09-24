import UserListFilters from './UserListFilters.jsx';
import UserListRows from './UserListRows.jsx';
import { UserContext } from '../lib/context/UserContext.js';
import useFilters from '../hooks/useFilters.js';
import useUsers from '../hooks/useUsers.js';
import style from './UserList.module.css';

const UserList = ({ initialUsers }) => {
	// Recuperamos funcionalidad de filtros desde el hook
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = useFilters();

	// Inicializamos el estado desde el hook y proporcionamso un medio para
	// actualizarlo
	const { users, toggleUserActive } = useUsers(initialUsers);

	let filteredUsers = filterActiveUsers(users, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	return (
		// Creamos un contexto para pasar la acción a los nietos
		<div className={style.list}>
			<h1>Listado de Usuarios</h1>
			<UserListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions} // Pasamos los handlers desde el hook
			/>
			<UserContext.Provider value={{ toggleUserActive }}>
				<UserListRows users={filteredUsers} />
			</UserContext.Provider>
		</div>
	);
};
/* FUNCIONES PURAS */
const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase(); // Pasamos el valor a minuscula

	// Filtramos segun el valor de busqueda
	return users.filter((user) =>
		user.name.toLowerCase().startsWith(lowerCasedSearch)
	);
};

const filterActiveUsers = (users, active) => {
	if (!active) return [...users];
	// Filtramos segun el valor de busqueda
	return users.filter((user) => user.active);
};

const sortUsers = (users, sortBy) => {
	const sorteredUsers = [...users]; // Spread operator para crear nuevo obj
	switch (sortBy) {
		case 1:
			return sorteredUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		default:
			return sorteredUsers;
	}
};

export default UserList;
