import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms.js';
import Button from './buttons/Button.jsx';
import UserCreateForm from './user-forms/UserCreateForm.jsx';

import UserListFilters from './UserListFilters.jsx';
import UserListPagination from './UsersListPagination.jsx';
import UserListRows from './UserListRows.jsx';
import useFilters from '../lib/hooks/useFilters.js';
import useUsers from '../lib/hooks/useUsers.js';
import style from './UserList.module.css';

const UserList = () => {
	// Recuperamos funcionalidad de filtros y paginación desde el hook
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage,
	} = useFilters();

	// Recuperamos los usuarios
	const { users, totalPages, error, isLoading } = useUsers(filters);

	// Lógica para renderizar los distintos formularios

	const { currentForm, setCreateForm, setFiltersForm } = useForms();

	return (
		<div className={style.list}>
			<h1 className={style.title}>Listado de Usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UserListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					// Pasamos los handlers desde el hook
					setSearch={setSearch}
					setOnlyActive={setOnlyActive}
					setSortBy={setSortBy}
					// Añadimos slot para renderizar un componente
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserCreateForm onClose={setFiltersForm} />
			)}
			<UserListRows users={users} error={error} isLoading={isLoading} />
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
