import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../lib/hooks/useFilters.js';
import getUsers from '../lib/hooks/useUsers.js';
import style from './UserList.module.css';

const UserList = ({ initialUsers }) => {
	// Recuperamos funcionalidad de filtros y paginación desde el hook
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage,
	} = useFilters();

	const { users, totalPages } = getUsers(initialUsers, filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserListFilters
				search={filters.search}
				onlyActive={filters.onlyActive}
				sortBy={filters.sortBy}
				// Pasamos los handlers desde el hook
				setSearch={setSearch}
				setOnlyActive={setOnlyActive}
				setSortBy={setSortBy}
			/>
			<UserListRows users={users} />
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				setPage={setPage}
				setItemsPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UserList;
