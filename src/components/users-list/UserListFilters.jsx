import style from './UserListFilters.module.css';
import { useState } from 'react';
import InputSearch from '../forms/InputSearch.jsx';
import InputCheckbox from '../forms/InputCheckbox.jsx';
import SelectInput from '../forms/SelectInput.jsx';
import Modal from '../modal/Modal.jsx';
import Button from '../buttons/Button.jsx';
import UserCreateForm from '../user-forms/UserCreateForm.jsx';
import { SORT_OPTIONS } from '../../constants/sortOptions.js';
import {
	onlyActiveChanged,
	searchChanged,
	sortByChanged,
} from '../../lib/actions/filtersActionsBuilders';

const UserListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className={style.form}>
			<Modal closeModal={() => setShowModal(!showModal)}>
				{showModal && (
					<UserCreateForm closeModal={() => setShowModal(!showModal)} />
				)}
			</Modal>
			<div className={style.row}>
				<InputSearch // Componente al que le pasamos las props destructuradas
					placeholder="Buscar..."
					autoComplete="off"
					value={search}
					onChange={(e) => {
						dispatchFilters(searchChanged(e.target.value));
					}}
				/>
				<SelectInput
					value={sortBy}
					onChange={(e) => {
						dispatchFilters(sortByChanged(Number(e.target.value)));
					}}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activo</option>
					)}
				</SelectInput>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						className={style.checkbox}
						checked={onlyActive}
						onChange={(e) =>
							dispatchFilters(onlyActiveChanged(e.target.checked))
						}
					/>
					<span>Mostrar sólo activos</span>
				</div>
				<Button onClick={() => setShowModal(!showModal)}>Añadir usuario</Button>
			</div>
		</div>
	);
};

export default UserListFilters;
