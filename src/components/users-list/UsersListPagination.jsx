import SelectInput from '../forms/SelectInput.jsx';
import style from './UsersListPagination.module.css';
import PageSelector from '../forms/PageSelector.jsx';

const UsersListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	totalPages,
}) => (
	<div className={style.wrapper}>
		<div className={style.itemsPerPage}>
			<SelectInput
				className={style.select}
				value={itemsPerPage}
				onChange={(e) => {
					/* Anotación: NO tiene sentido actualizar la pagina aqui
						debe ser en el hook... */
					setItemsPerPage(Number(e.target.value));
				}}
			>
				<option value={4}>4</option>
				<option value={6}>6</option>
				<option value={8}>8</option>
			</SelectInput>
			<p>Elementos por página</p>
		</div>
		<PageSelector page={page} setPage={setPage} totalPages={totalPages} />
	</div>
);

export default UsersListPagination;
