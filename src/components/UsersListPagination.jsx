import SelectInput from './forms/SelectInput.jsx';
import style from './UsersListPagination.module.css';
import PageSelector from './forms/PageSelector.jsx';

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
					setItemsPerPage(Number(e.target.value));
					// setPage(1); // ??? TODO: dudas...
				}}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
			</SelectInput>
			<p>Elementos por página</p>
		</div>
		<PageSelector page={page} setPage={setPage} totalPages={totalPages} />
	</div>
);

export default UsersListPagination;
