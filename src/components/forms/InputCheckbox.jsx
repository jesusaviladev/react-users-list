import style from './InputCheckbox.module.css';
import CheckIcon from '../icons/CheckIcon.jsx';

const InputCheckbox = ({ className, ...props }) => {
	return (
		<label className={`${style.label} ${className || ''}`}>
			<input {...props} type="checkbox" className={style.input} />
			<CheckIcon className={style.check} />
		</label>
	);
};

export default InputCheckbox;
