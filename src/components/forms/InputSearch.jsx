import style from './InputSearch.module.css';
import SearchIcon from '../icons/SearchIcon.jsx';
/* Recomendación: no pasar funciones para el evento onChange al input 
	para evitar acoplarse al enfoque controlado, permitir reutilizacion


	No hay que ser limitante al momento de pasar propiedades

*/
const InputSearch = ({ className, ...props }) => {
	return (
		<div className={`${style.wrapper} ${className || ''}`}>
			<SearchIcon className={style.inputIcon} />
			<input {...props} type="text" className={style.input} />
		</div>
	);
};

export default InputSearch;
