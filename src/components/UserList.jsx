import UserListFilters from './UserListFilters.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../lib/hooks/useFilters.js';
import useUsers from '../lib/hooks/useUsers.js';
import style from './UserList.module.css';
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers,
} from '../lib/helpers/usersFilters.js';

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

export default UserList;
