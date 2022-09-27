import style from './PageSelector.module.css';
import IconButton from '../buttons/IconButton.jsx';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.jsx';
import ArrowRightIcon from '../icons/ArrowRightIcon.jsx';

const PageSelector = ({ page, setPage, totalPages }) => {
	const isFirstPage = page === 1;

	const isLastPage = page === totalPages || totalPages === 0;

	return (
		<div className={style.wrapper}>
			<IconButton
				filled
				disabled={isFirstPage}
				icon={ArrowLeftIcon}
				onClick={() => setPage(page - 1)}
			/>
			<span>
				Página {page} de {totalPages || 1}
			</span>
			<IconButton
				filled
				disabled={isLastPage}
				icon={ArrowRightIcon}
				onClick={() => setPage(page + 1)}
			/>
		</div>
	);
};

export default PageSelector;
