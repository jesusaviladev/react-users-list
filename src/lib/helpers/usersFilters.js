import { SORT_OPTIONS } from '../../constants/sortOptions';
import { USER_ROLES } from '../../constants/userRoles';

/* FUNCIONES PURAS */
export const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase(); // Pasamos el valor a minuscula

	// Filtramos segun el valor de busqueda
	return users.filter((user) =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	);
};

export const filterActiveUsers = (users, active) => {
	if (!active) return [...users];
	// Filtramos segun el valor de busqueda
	return users.filter((user) => user.active);
};

export const sortUsers = (users, sortBy) => {
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

export const paginateUsers = (users, page, itemsPerPage) => {
	// Metodo silce
	const startIndex = (page - 1) * itemsPerPage;

	const endIndex = startIndex + itemsPerPage;

	return users.slice(startIndex, endIndex);
};
