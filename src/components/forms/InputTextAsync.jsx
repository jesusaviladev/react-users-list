import style from './InputTextAsync.module.css';
import CheckCircleIcon from '../icons/CheckCircleIcon.jsx';
import CrossCircleIcon from '../icons/CrossCircleIcon.jsx';
import UpdateIcon from '../icons/UpdateIcon.jsx';

const InputTextAsync = ({
	label,
	error,
	loading,
	success,
	className,
	...props
}) => {
	const icon = getIcon(loading, success, error);

	return (
		<label className={`${style.wrapper} ${className || ''}`}>
			<span className={style.label}>{label}</span>
			<input
				{...props}
				type="text"
				className={`${style.input} ${error ? style.errorBorder : ''}`}
			/>
			{icon}
			{error && <span className={style.error}>{error}</span>}
		</label>
	);
};

const getIcon = (loading, success, error) => {
	if (loading) return <UpdateIcon className={style.loadingIcon} />;
	if (success) return <CheckCircleIcon className={style.successIcon} />;
	if (error) return <CrossCircleIcon className={style.errorIcon} />;

	return null;
};

export default InputTextAsync;
