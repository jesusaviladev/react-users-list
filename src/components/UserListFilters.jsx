import style from './UserListFilters.module.css';
import InputSearch from './forms/InputSearch.jsx';
import InputCheckbox from './forms/InputCheckbox.jsx';
import SelectInput from './forms/SelectInput.jsx';

const UserListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy,
}) => {
	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch // Componente al que le pasamos las props destructuradas
					placeholder="Buscar..."
					autoComplete="off"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
				<SelectInput
					value={sortBy}
					onChange={(e) => {
						setSortBy(Number(e.target.value));
					}}
				>
					<option value={0}>Por defecto</option>
					<option value={1}>Por nombre</option>
					<option value={2}>Por rol</option>
					{!onlyActive && <option value={3}>Por activo</option>}
				</SelectInput>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						className={style.checkbox}
						checked={onlyActive}
						onChange={(e) => setOnlyActive(!onlyActive)}
					/>
					<span>Mostrar sólo activos</span>
				</div>
			</div>
		</div>
	);
};

export default UserListFilters;
