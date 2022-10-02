import ListIcon from '../icons/ListIcon.jsx';
import GridIcon from '../icons/GridIcon.jsx';
import style from './UsersListViewSelector.module.css';
import { USER_VIEW_OPTIONS } from '../../constants/userViewOptions.js';

const UsersListViewSelector = ({ view, setView }) => (
	<div className={style.wrapper}>
		<button
			className={style.button}
			onClick={() => setView(USER_VIEW_OPTIONS.GRID)}
			disabled={view}
		>
			<GridIcon className={style.icon} />
		</button>
		<div className={style.divider} />
		<button
			className={style.button}
			onClick={() => setView(USER_VIEW_OPTIONS.ROW)}
			disabled={!view}
		>
			<ListIcon className={style.icon} />
		</button>
	</div>
);

export default UsersListViewSelector;
