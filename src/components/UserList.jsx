import { useState } from 'react';
import UserListFilters from './UserListFilters.jsx';
import UserListRows from './UserListRows.jsx';
import { UserContext } from '../lib/context/UserContext.js';
import style from './UserList.module.css';

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFiltersFunctions } = useFilters();

	const { users, toggleUserActive } = useUsers(initialUsers);

	let filteredUsers = filterActiveUsers(users, onlyActive);
	filteredUsers = filterUsersByName(filteredUsers, search);
	filteredUsers = sortUsers(filteredUsers, sortBy);

	return (
		<div className={style.list}>
			<h1>Listado de Usuarios</h1>
			<UserListFilters
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFiltersFunctions} // Recuperamos handlers desde el hook
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
/* CUSTOM HOOK */
const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: 0,
	});

	const setSearch = (search) => setFilters({ ...filters, search });

	const setOnlyActive = (onlyActive) => setFilters({ ...filters, onlyActive });

	const setSortBy = (sortBy) => setFilters({ ...filters, sortBy });

	return {
		...filters,
		setSearch,
		setOnlyActive,
		setSortBy,
	};
};

const useUsers = (initialUsers) => {
	const [users, setUsers] = useState(initialUsers);

	const toggleUserActive = (userId) => {
		const newUsers = [...users];

		const userIndex = newUsers.findIndex((user) => user.id === userId);

		if (userIndex === -1) return;

		newUsers[userIndex].active = !newUsers[userIndex].active;

		setUsers(newUsers);
	};

	return {
		users,
		toggleUserActive,
	};
};

export default UserList;
