import style from './UserStatus.module.css';
import CheckCircleIcon from '../icons/CheckCircleIcon.jsx';
import CrossCircleIcon from '../icons/CrossCircleIcon.jsx';

const UserStatus = ({ active = true }) => {
	const activeClassName = active ? style.active : style.inactive;

	const Icon = active ? CheckCircleIcon : CrossCircleIcon;

	// Creamos patron de toggle entre componentes

	return (
		<div className={activeClassName}>
			<Icon className={style.statusIcon} />
			<span>{active ? 'Activo' : 'Inactivo'}</span>
		</div>
	);
};

export default UserStatus;
