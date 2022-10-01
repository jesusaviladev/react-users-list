import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms.js';
import Button from './buttons/Button.jsx';
import UserCreateForm from './user-forms/UserCreateForm.jsx';
import UserFormLayout from './user-forms/UserFormLayout.jsx';
import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../lib/hooks/useFilters.js';
import useUsers from '../lib/hooks/useUsers.js';
import style from './UserList.module.css';
import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers,
	paginateUsers,
} from '../lib/helpers/usersFilters.js';

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

	// Lógica para renderizar los distintos formularios

	const { currentForm, setCreateForm, setFiltersForm } = useForms();

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UserListFilters
					{...filters}
					// Pasamos los handlers desde el hook
					{...filtersSetters}
					// Añadimos slot para renderizar un componente
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					<UserCreateForm onSuccess={onSuccess} />
				</UserFormLayout>
			)}
			<UserListRows
				users={paginatedUsers}
				error={usersError}
				isLoading={usersLoading}
			/>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsersToDisplay = (
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

const useForms = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTERS);

	// Importante: recordar crear setters

	const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTERS);
	const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USER_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE);

	return {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
	};
};

export default UserList;
