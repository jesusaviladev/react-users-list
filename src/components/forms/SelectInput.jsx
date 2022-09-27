import style from './SelectInput.module.css';
import ArrowDownIcon from '../icons/ArrowDownIcon.jsx';

// TODO: dudas...

const SelectInput = ({ className, ...props }) => (
	<div className={`${style.wrapper} ${className || ''}`}>
		<select {...props} className={style.select}></select>
		<ArrowDownIcon className={style.icon} />
	</div>
);

export default SelectInput;
