import { SORT_OPTIONS } from '../../constants/sortOptions';
import { USER_ROLES } from '../../constants/userRoles';

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
		case SORT_OPTIONS.NAME:
			return sorteredUsers.sort((a, b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		case SORT_OPTIONS.ROLE:
			return sorteredUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === USER_ROLES.TEACHER) return -1;
				if (a.role === USER_ROLES.STUDENT && b.role === USER_ROLES.OTHER)
					return -1;
				return 1;
			});
		case SORT_OPTIONS.ACTIVE:
			return sorteredUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sorteredUsers;
	}
};

const paginateUsers = (users, page, itemsPerPage) => {
	// Metodo silce
	const startIndex = (page - 1) * itemsPerPage;

	const endIndex = startIndex + itemsPerPage;

	// Calculamos el total de paginas

	const totalPages = Math.ceil(users.length / itemsPerPage);

	const paginatedUsers = users.slice(startIndex, endIndex);

	return {
		paginatedUsers,
		totalPages,
	};
};

export const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, itemsPerPage }
) => {
	// filtramos los usuarios

	let filteredUsers = filterActiveUsers(users, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	// Hacemos la paginación y retornamos los usuarios ya paginados,
	// y el total de paginas

	const { paginatedUsers, totalPages } = paginateUsers(
		filteredUsers,
		page,
		itemsPerPage
	);

	return {
		paginatedUsers,
		totalPages,
	};
};
