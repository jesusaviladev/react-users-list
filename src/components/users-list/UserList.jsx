import { useState } from 'react';
import UserFormContainer from '../user-forms/UserFormContainer.jsx';
import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UsersListViewSelector from './UsersListViewSelector.jsx';
import UsersListRows from './UsersListRows.jsx';
import useFilters from '../../lib/hooks/useFilters.js';
import useUsers from '../../lib/hooks/useUsers.js';
import style from './UserList.module.css';
import UserFormsProvider from '../providers/UserFormsProvider.jsx';
import { USER_VIEW_OPTIONS } from '../../constants/userViewOptions.js';

const UserList = () => {
	const [showRowsFormat, setshowRowsFormat] = useState(USER_VIEW_OPTIONS.ROW);

	// Recuperamos funcionalidad de filtros y paginación desde el hook
	const { filters, filtersSetters, paginationSetters, resetFilters } =
		useFilters();

	// Recuperamos los usuarios
	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<UserFormsProvider resetFilters={resetFilters}>
				<UserListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					// Pasamos los handlers desde el hook
					{...filtersSetters}
				/>
				<UserFormContainer />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setshowRowsFormat={setshowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					isLoading={usersLoading}
					view={showRowsFormat}
				/>
			</UserFormsProvider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UserList;
