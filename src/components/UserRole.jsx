import style from './UserRole.module.css';

const UserRole = ({ role = 'student' }) => {
	/* Creamos objeto diccionario para el nombre del rol y su estilo css */

	const ROLE_STYLES = {
		teacher: ['Profesor', style.teacher],
		student: ['Alumno', style.student],
		other: ['Otro', style.other],
	};

	/* Desestructuramos el array del diccionario en función al rol que llega por prop */

	const [roleName, roleClassName] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return (
		<span className={`${style.userRole} ${roleClassName}`}>{roleName}</span>
	);
};

export default UserRole;
