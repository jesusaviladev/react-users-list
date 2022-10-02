import { useState } from 'react';
import UserFormContainer from '../user-forms/UserFormContainer.jsx';
import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UsersListViewSelector from './UsersListViewSelector.jsx';
import UsersListRows from './UsersListRows.jsx';
import useFilters from '../../lib/hooks/useFilters.js';
import useUsers from '../../lib/hooks/useUsers.js';
import style from './UserList.module.css';
import { getUsersToDisplay } from '../../lib/helpers/usersFilters.js';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import { USER_VIEW_OPTIONS } from '../../constants/userViewOptions.js';

const UserList = () => {
	const [view, setView] = useState(USER_VIEW_OPTIONS.ROW);

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
				<UsersListViewSelector view={view} setView={setView} />
				<UserFormContainer />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					isLoading={usersLoading}
					view={view}
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
