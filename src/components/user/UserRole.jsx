import style from './UserRole.module.css';
import { USER_ROLES } from '../../constants/userRoles.js';

/* Creamos objeto diccionario para el nombre del rol y su estilo css */
const ROLE_STYLES = {
	[USER_ROLES.TEACHER]: ['Profesor', style.teacher],
	[USER_ROLES.STUDENT]: ['Alumno', style.student],
	[USER_ROLES.OTHER]: ['Otro', style.other],
};

const UserRole = ({ role = USER_ROLES.STUDENT }) => {
	/* Desestructuramos el array del diccionario en función 
	al rol que llega por prop */

	const [roleName, roleClassName] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return (
		<span className={`${style.userRole} ${roleClassName}`}>{roleName}</span>
	);
};

export default UserRole;
