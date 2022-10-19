import { useReducer, useState } from 'react';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UsersListViewSelector from './UsersListViewSelector.jsx';
import UsersListRows from './UsersListRows.jsx';
import useUsers from '../../lib/hooks/useUsers.js';
import AlertBox from '../alerts/AlertBox.jsx';
import { USER_VIEW_OPTIONS } from '../../constants/userViewOptions.js';
import style from './UserList.module.css';
import { reset } from '../../lib/actions/filtersActionsBuilders.js';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE,
} from '../../lib/reducers/filtersReducer.js';

const UserList = () => {
	const [showRowsFormat, setshowRowsFormat] = useState(USER_VIEW_OPTIONS.ROW);

	// Recuperamos funcionalidad de filtros y paginación desde el hook
	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	// Recuperamos los usuarios
	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			<AlertBox />
			<UserFormsContext.Provider
				value={{ onSuccess: () => dispatchFilters(reset()) }}
			>
				<UserListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					// Pasamos los handlers desde el hook
					dispatchFilters={dispatchFilters}
				/>
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
			</UserFormsContext.Provider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				dispatchFilters={dispatchFilters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UserList;
