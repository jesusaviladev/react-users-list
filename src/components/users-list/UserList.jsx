import UserFormContainer from '../user-forms/UserFormContainer.jsx';
import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../../lib/hooks/useFilters.js';
import useUsers from '../../lib/hooks/useUsers.js';
import style from './UserList.module.css';
import { getUsersToDisplay } from '../../lib/helpers/usersFilters.js';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';

const UserList = () => {
	// Recuperamos funcionalidad de filtros y paginación desde el hook
	const {
		filters,
		pagination,
		filtersSetters,
		paginationSetters,
		resetFilters,
	} = useFilters();

	// Recuperamos los usuarios
	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	// Lógica de paginacion y filtrado

	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserFormsProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UserListFilters
					{...filters}
					// Pasamos los handlers desde el hook
					{...filtersSetters}
				/>
				<UserFormContainer />
				<UserListRows
					users={paginatedUsers}
					error={usersError}
					isLoading={usersLoading}
				/>
			</UserFormsProvider>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UserList;
