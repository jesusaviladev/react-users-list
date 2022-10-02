import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms.js';
import Button from './buttons/Button.jsx';
import UserCreateForm from './user-forms/UserCreateForm.jsx';
import UserEditForm from './user-forms/UserEditForm.jsx';
import UserDeleteForm from './user-forms/UserDeleteForm.jsx';
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

	const {
		currentForm,
		currentUser,
		setCreateForm,
		setFiltersForm,
		setEditForm,
		setDeleteForm,
	} = useForms();

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
					{currentForm === USER_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USER_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							onCancel={setFiltersForm}
							user={currentUser}
						/>
					)}
				</UserFormLayout>
			)}
			<UserListRows
				users={paginatedUsers}
				error={usersError}
				isLoading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
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
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTERS });

	// Importante: recordar crear setters

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	const setEditForm = (user) => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = (user) =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
	};
};

export default UserList;
