import style from './InputText.module.css';

const InputText = ({ label, error, className, ...props }) => {
	return (
		<label className={`${className || ''}`}>
			<span className={style.label}>{label}</span>
			<input
				{...props}
				type="text"
				className={`${style.input} ${error ? style.errorBorder : ''}`}
			/>
			{error && <span className={style.error}>{error}</span>}
		</label>
	);
};

export default InputText;
