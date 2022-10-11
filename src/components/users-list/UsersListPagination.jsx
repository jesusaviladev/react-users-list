import SelectInput from '../forms/SelectInput.jsx';
import style from './UsersListPagination.module.css';
import PageSelector from '../forms/PageSelector.jsx';
import { PAGINATION } from '../../constants/pagination.js';

const UsersListPagination = ({
	page,
	itemsPerPage,
	totalUsers,
	dispatchFilters,
}) => (
	<div className={style.wrapper}>
		<div className={style.itemsPerPage}>
			<SelectInput
				className={style.select}
				value={itemsPerPage}
				onChange={(e) => {
					/* Anotación: NO tiene sentido actualizar la pagina aqui
						debe ser en el hook... */
					dispatchFilters({
						type: 'items_per_page_changed',
						value: Number(e.target.value),
					});
				}}
			>
				{PAGINATION.ITEMS_PER_PAGE_VALUES.map((value, index) => (
					<option key={index} value={value}>
						{value}
					</option>
				))}
			</SelectInput>
			<p>Elementos por página</p>
		</div>
		<PageSelector
			page={page}
			setPage={(newPage) =>
				dispatchFilters({ type: 'page_changed', value: newPage })
			}
			totalPages={Math.ceil(totalUsers / itemsPerPage)}
		/>
	</div>
);

export default UsersListPagination;
