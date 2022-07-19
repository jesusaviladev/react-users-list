import style from './UserListFilters.module.css';

const UserListFilters = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy,
}) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className={style.form}
		>
			<input
				type="text"
				placeholder="Buscar por nombre..."
				autoComplete="off"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<div className={style.active}>
				<input
					type="checkbox"
					id="active"
					checked={onlyActive}
					onChange={(e) => setOnlyActive(!onlyActive)}
				/>
				<label htmlFor="active">Solo Activos</label>
			</div>
			<select
				value={sortBy}
				onChange={(e) => {
					setSortBy(Number(e.target.value));
				}}
			>
				<option value={0}>Por defecto</option>
				<option value={1}>Por nombre</option>
			</select>
		</form>
	);
};

export default UserListFilters;
