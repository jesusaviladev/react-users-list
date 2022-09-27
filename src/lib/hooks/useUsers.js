import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers,
	paginateUsers,
} from '../helpers/usersFilters.js';

const getUsers = (
	initialUsers,
	{ search, onlyActive, sortBy, page, itemsPerPage }
) => {
	// filtramos los usuarios

	let filteredUsers = filterActiveUsers(initialUsers, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	// Calculamos el total de paginas

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

	// Hacemos la paginación

	filteredUsers = paginateUsers(filteredUsers, page, itemsPerPage);

	// Inicializamos el estado desde el hook y proporcionamos
	// un medio para actualizarlo

	// const [users, setUsers] = useState(initialUsers);

	return {
		users: filteredUsers,
		totalPages,
	};
};

export default getUsers;
